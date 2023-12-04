import json
import os
import time
from uuid import uuid4
from termcolor import colored
import datetime

path = "./json/"

authors = {"__collections__": {"author": {}}}
books = {"__collections__": {"book": {}}}
genres = {"__collections__": {"genre": {}}}

# Designed to be run ONCE on /json-v3/ files
# This post processing script handles the relationship between AUTHOR-BOOK and GENRE-BOOK
# Changes made to the jsons:
#   renamed genresID to genreID
#   genreID and authorID are now lists instead strings
#   book.json "genreID" is one-to-one relationship with "name" genre.json
#   book.json "authorID" is one-to-one relationship with "name" author.json
# Known effects:
#   since you cannot rename JSON key, and only del old key & add new key, genreID now is at the bottom of each book

def main():
    # os.system("cls" if os.name == "nt" else "clear")
    global authors
    readAuthorJson()  # load author data
    readBookJson()
    readGenreJson()
    processBookAndAuthor()
    processBookAndGenre()
    flush()
    finalize()

def readAuthorJson():
    with open(path + "author.json", "r", encoding="utf-8") as json_file:
        # load the json file
        data = json.load(json_file)

        # for every author in the json file
        for key, value in data["__collections__"]["author"].items():
            authors["__collections__"]["author"][key] = value
            # print(
            #     "Key: {0} \n\ttitle: {1}\n\tdescription: {2}\n".format(
            #         key, value["name"], value["description"]
            #     )
            # )
        return authors


def readBookJson():
    with open(path + "book.json", "r", encoding="utf-8") as json_file:
        # load the json file
        data = json.load(json_file)

        # for every book in the json file
        for key, value in data["__collections__"]["book"].items():
            books["__collections__"]["book"][key] = value
            # print(
            #     "Key: {0} \n\ttitle: {1}\n\tgenresID: {2}\n\tauthorID: {3}\n".format(
            #         key, value["title"], value["genreID"], value["authorID"]
            #     )
            # )
        return books


def readGenreJson():
    with open(path + "genre.json", "r", encoding="utf-8") as json_file:
        # load the json file
        data = json.load(json_file)

        # for every book in the json file
        for key, value in data["__collections__"]["genre"].items():
            genres["__collections__"]["genre"][key] = value
            print(
                "Key: {0} \n\tname: {1}\n\tdescription: {2}\n".format(
                    key, value["name"], value["description"]
                )
            )
        return genres


def processBookAndAuthor():
    print("processBookAndAuthor() running...")
    print("Total books: {0}".format(len(books["__collections__"]["book"])))
    for key, bookAttr in books["__collections__"]["book"].items():
        # print("Processing book: {0}".format(bookAttr))

        # STEP 1: IF TWO OR MORE AUTHORS, BREAK THEM DOWN TO LIST
        if (" - ") in bookAttr["authorID"]:
            bookAttr["authorID"] = bookAttr["authorID"].split(" - ")

        # STEP 1.5: IF ANY REMAINING AUTHOR IS STR TYPE, CONVERT THEM TO LIST TYPE
        if isinstance(bookAttr["authorID"], str):  # if authorID is a string
            print(colored("\tNot a list ", "red"), end="")
            bookAttr["authorID"] = [bookAttr["authorID"]]
        else:
            print(colored("\tIs list ", "green"), end="")
        print(colored("bookAttr[authorID]: {0}".format(bookAttr["authorID"]), "cyan"))

        # STEP 2: FOR EVERY BOOK: AUTHORID IN BOOK.JSON, FIND MATCHING AUTHOR: NAME IN AUTHOR.JSON
        # range is (0, 0) or (0, 1)
        for i in range(0, len(bookAttr["authorID"])):
            found = findAuthor(bookAttr["authorID"][i])

            # STEP 2.5: IF NOT FOUND, CREATE NEW AUTHOR
            if found == "-1":
                TEMPAUTHORID = str(uuid4())
                TEMPAUTHORNAME = bookAttr["authorID"][i]

                # update in author.json
                authors["__collections__"]["author"][TEMPAUTHORID] = {
                    "name": TEMPAUTHORNAME,
                    "description": "Author " + TEMPAUTHORNAME + " description",
                }

                # update in book.json
                books["__collections__"]["book"][key]["authorID"][i] = TEMPAUTHORID
            else:
                # if found
                # update in book.json
                books["__collections__"]["book"][key]["authorID"][i] = found


def processBookAndGenre():
    print("processBookAndGenre() running...")
    print("Total books: {0}".format(len(books["__collections__"]["book"])))
    for key, bookAttr in books["__collections__"]["book"].items():
        # print("Processing book: {0}".format(bookAttr))

        # STEP 1.5: IF ANY REMAINING GENRE IS STR TYPE, CONVERT THEM TO LIST TYPE
        if isinstance(bookAttr["genresID"], str):  # if genreID is a string
            print(colored("\tNot a list ", "red"), end="")
            bookAttr["genreID"] = [bookAttr["genresID"]]
            del bookAttr["genresID"]
        else:
            print(colored("\tIs list ", "green"), end="")
        print(colored("bookAttr[genreID]: {0}".format(bookAttr["genreID"]), "cyan"))

        # STEP 2: FOR EVERY BOOK: GENREID IN BOOK.JSON, FIND MATCHING GENRE: NAME IN GENRE.JSON
        # range is (0, 0) or (0, 1)
        for i in range(0, len(bookAttr["genreID"])):
            found = findGenre(bookAttr["genreID"][i])

            # STEP 2.5: IF NOT FOUND, CREATE NEW GENRE
            if found == "-1":
                TEMPGENREID = str(uuid4())
                TEMPGENRENAME = bookAttr["genreID"][i]

                # update in genre.json
                genres["__collections__"]["genre"][TEMPGENREID] = {
                    "name": TEMPGENRENAME,
                    "description": "Genre " + TEMPGENRENAME + " description",
                }

                # update in book.json
                books["__collections__"]["book"][key]["genreID"][i] = TEMPGENREID
            else:
                # if found
                # update in book.json
                books["__collections__"]["book"][key]["genreID"][i] = found

def findGenre(genreId):
    # search for genreID in genres dict
    for key, value in genres["__collections__"]["genre"].items():
        if value["name"] == genreId:
            print(
                colored("\tFound genre: {0}\n".format(value["name"]), "yellow"), end=""
            )

            # return key
            return key

    return "-1"

def findAuthor(authorId):
    # search for authorID in authors dict
    for key, value in authors["__collections__"]["author"].items():
        if value["name"] == authorId:
            print(
                colored("\tFound author: {0}\n".format(value["name"]), "yellow"), end=""
            )

            # return key
            return key

    return "-1"


def flush():
    with open(path + "author.json", "w", encoding="utf-8") as json_file:
        json.dump(authors, json_file, ensure_ascii=False, indent=4)

    with open(path + "book.json", "w", encoding="utf-8") as json_file:
        json.dump(books, json_file, ensure_ascii=False, indent=4)

    with open(path + "genre.json", "w", encoding="utf-8") as json_file:
        json.dump(genres, json_file, ensure_ascii=False, indent=4)


def finalize():
    print(("Len author: {}").format(len(authors["__collections__"]["author"])))
    print(("Len book: {}").format(len(books["__collections__"]["book"])))
    print(("Len genre: {}").format(len(genres["__collections__"]["genre"])))
    # Seed full run
    # Len author: 1545
    # Len book: 1912
    # Len genre: 22

    # Seed test run
    # Len author: 62
    # Len book: 67
    # Len genre: 3

try:
    main()
except KeyboardInterrupt:
    print("KeyboardInterrupt has been caught.")
    exit()

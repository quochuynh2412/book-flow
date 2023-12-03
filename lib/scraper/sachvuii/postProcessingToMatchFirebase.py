import json
import os
import time
from uuid import uuid4
from termcolor import colored
import datetime

path = "./json/"

authors = {
    "__collections__": {
        "author": {

        }
    }
}
books = {
    "__collections__": {
        "book": {

        }
    }
}
genres = {
    "__collections__": {
        "genre": {

        }
    }
}


def main():
    # os.system("cls" if os.name == "nt" else "clear")
    global authors
    readAuthorJson() # load author data
    readBookJson()
    readGenreJson()
    processBookAndAuthor()
    flush()

def readAuthorJson():
    with open(path + "author.json", "r", encoding="utf-8") as json_file:
        # load the json file
        data = json.load(json_file)

        # for every author in the json file
        for key, value in data['__collections__']['author'].items():
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
        for key, value in data['__collections__']['genre'].items():
            genres['__collections__']['genre'] = value
        return genres

def processBookAndAuthor():
    print("processBookAndAuthor() running...")
    print("Total books: {0}".format(len(books["__collections__"]["book"])))
    for key, bookAttr in books["__collections__"]["book"].items():
        print("Processing book: {0}".format(bookAttr))

        # STEP 1: IF TWO OR MORE AUTHORS, BREAK THEM DOWN TO LIST
        if (" - ") in bookAttr["authorID"]:
            bookAttr["authorID"] = bookAttr["authorID"].split(" - ")

        # STEP 1.5: IF ANY REMAINING AUTHOR IS STR TYPE, CONVERT THEM TO LIST TYPE
        if (isinstance(bookAttr["authorID"], str)): # if authorID is a string
            print(colored("\tNot a list ", 'red'), end="")
            bookAttr["authorID"] = [bookAttr["authorID"]]
        else:
            print(colored("\tIs list ", 'green'), end="")
        print(colored("bookAttr[authorID]: {0}".format(bookAttr["authorID"]), 'cyan'))

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
                    "description": "Author " + TEMPAUTHORNAME + " description"
                }

                # update in book.json
                books["__collections__"]["book"][key]["authorID"][i] = TEMPAUTHORID
            else:
                # if found
                # update in book.json
                books["__collections__"]["book"][key]["authorID"][i] = found

def findAuthor(authorId):
    # search for authorID in authors dict
    for key, value in authors["__collections__"]["author"].items():
        if value["name"] == authorId:
            print(colored("\tFound author: {0}\n".format(value["name"]), "yellow"), end="")
            
            # return key
            return key

    return "-1"

def flush():
    with open(path + "author.json", "w", encoding="utf-8") as json_file:
        json.dump(authors, json_file, ensure_ascii=False, indent=4)

    with open(path + "book.json", "w", encoding="utf-8") as json_file:
        json.dump(books, json_file, ensure_ascii=False, indent=4)

try:
    main()
except KeyboardInterrupt:
    print("KeyboardInterrupt has been caught.")
    exit()
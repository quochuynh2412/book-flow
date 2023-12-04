import json # for read and write json file
import os # clear terminal command
import time
from uuid import uuid4 # for generating random uuid
from termcolor import colored # for printing colors in the terminal
import datetime
from bs4 import BeautifulSoup # parse HTML
import requests # make HTTP requests and feed it to BeautifulSoup
import urllib.parse # parse the string to url safe
import langid # language identification
import re # regex


path = "./json/"

authors = {"__collections__": {"author": {}}}
books = {"__collections__": {"book": {}}}
genres = {"__collections__": {"genre": {}}}

# Designed to be run ONCE on /json-v3/ files
# This post processing script handles the relationship between AUTHOR-BOOK and GENRE-BOOK
# Changes made to the jsons:
#   renamed genresID to genreID
#   genreID and authorID are now lists instead strings
#   book.json "genreID" is linked with with "name" genre.json
#   book.json "authorID" is linked with with "name" author.json
#   if author is foreign, we will look them up on Wikipedia, and get their profile (if exists)
# Known effects:
#   since you cannot rename JSON key, and only del old key & add new key, genreID now is at the bottom of each book


def main():
    # os.system("cls" if os.name == "nt" else "clear")
    # time
    start_time = datetime.datetime.now()
    global authors
    readAuthorJson()  # load author data
    readBookJson()
    readGenreJson()
    processBookAndAuthor()
    processBookAndGenre()
    updateAuthorDescription()
    flush()
    finalize()
    print("Time elapsed: {0}".format(datetime.datetime.now() - start_time))


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
            # print(
            #     "Key: {0} \n\tname: {1}\n\tdescription: {2}\n".format(
            #         key, value["name"], value["description"]
            #     )
            # )
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


def updateAuthorDescription():
    # search for authorID in authors dict
    for key, value in authors["__collections__"]["author"].items():

        # if name is Vietnamese
        tempName = value["name"]
        classificationResult = langid.classify(value["name"]) # ('en', -54.41310358047485)

        if classificationResult[1] >= 0.01 and classificationResult[0] != "vi":
            print("{0:25s} is {1}".format(tempName, colored(classificationResult, 'green') ))
            result = findAuthorWikipedia(tempName)
            if result != "-1":
                print()
                value["description"] = extractAuthorDescription(result)
            else:
                # not found any matching wikipedia page
                continue
        else:
            print("{0:25s} is {1}".format(tempName, colored(classificationResult, 'red') ))


def findAuthorWikipedia(name):

    # sleep for 1 second
    time.sleep(1)

    # process input param to URL
    safe_string = urllib.parse.quote_plus(name)
    # print("https://www.google.com/search?q=" + safe_string) # https://www.google.com/search?q=Lep+T%C3%B4nxtoi

    # set `request` headers
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}
    response = requests.get("https://en.wikipedia.org/w/index.php?search=" + safe_string, headers=headers, timeout=10, allow_redirects=True)
    # print(response.request.headers["User-Agent"])

    # case 1: found or (case 2: no matching query || case 3: found some but not close enough)
    soup = BeautifulSoup(response.content, 'html.parser')
    result1 = soup.find("p", {"class": "mw-search-nonefound"}) # case 2
    result2 = soup.find("div", {"class": "searchdidyoumean"}) # case 3

    if result1 is None and result2 is None:
        # case 1: found or case 4: too many people with the same name
        personMayReferTo = soup.find("div", {"class": "mw-content-ltr mw-parser-output"}).find("p")

        # case 4
        if personMayReferTo is not None:
            possibleCases = []
            # keywords related to an author
            keywords = "(author|novel|liter|book|journal)(es|s|ist|ary|ature)?"
            if "may refer to" in personMayReferTo.getText():
                print("\tCase 3, " + personMayReferTo.getText())

                # changed root to search
                personMayReferTo = soup.find("div", {"class": "mw-content-ltr mw-parser-output"})

                # search for list of people
                for element in personMayReferTo.find_all("ul"):
                    for subelement in element.find_all("li"):
                        possibleCases.append(subelement) # subelement.getText()

                # if any of the people contained keywords, print them
                bestMatchCase = ["", 0]
                for person in possibleCases:
                    result = re.findall(keywords, person.getText())
                    if result is not None:
                        print("\t\t" + colored(person, "dark_grey") + " with " + colored(str(len(result)), 'yellow') + " matches: " + colored(result, "yellow"))
                        
                        # for each search, get the highest match
                        if len(result) >= bestMatchCase[1]:
                            bestMatchCase[0] = person
                            bestMatchCase[1] = len(result)

                print("\tCase 4, found: " + colored(bestMatchCase[0], "green") + " with " + str(bestMatchCase[1]) + " matches")

                # get link href
                return "https://en.wikipedia.org" + bestMatchCase[0].find("a")["href"]

            # case 1
            else:
                print("\tCase 4, found: " + colored("https://en.wikipedia.org/w/index.php?search=" + safe_string, "green"))
                return "https://en.wikipedia.org/w/index.php?search=" + safe_string 

    elif result1 is None:
        print("\tCase 2: " + result2.getText())
        return "-1"
    elif result2 is None:
        print("\tCase 1: " + result1.getText())
        return "-1"
    else:
        print("\tWHAT YOU DO MEAN, THIS CASE WILL NEVER BE REACHED")
        return "-1"

def extractAuthorDescription(link):

    print(colored("\tFetching: " + link, 'cyan'))

    # set `request` headers
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}
    response = requests.get(link, headers=headers, timeout=10, allow_redirects=True)

    soup = BeautifulSoup(response.content, 'html.parser')
    body = soup.find("div", {"class": "mw-content-ltr mw-parser-output"}) # the body of the page

    # if body is None:
    #     print("\t\tNo body found")
    # else:
    #     print("\t\tBody found")

    # keep adding <p> tags to the description, stop if we hit the <meta> tag
    description = ""
    for element in body.find_all("p"):
        # if element.find("meta") is None:
        if description.count(" ") < 1000:
            description += element.getText()
        else:
            break

    regexCitation = re.compile(r"\[\d+\]|\bcitation\b \bneeded\b")
    description = re.sub(regexCitation, "", description)
    print("\t\t" + colored(description, 'cyan'))
    return description

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

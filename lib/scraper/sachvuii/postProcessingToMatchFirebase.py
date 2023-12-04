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
import logging # log error


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
    print("Time elapsed: {0} or {1} per book".format(colored(datetime.datetime.now() - start_time, "magenta"), colored((datetime.datetime.now() - start_time)/len(books["__collections__"]["book"]), 'magenta')))


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
    print("\n\n\nprocessBookAndAuthor() running...")
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
            print("\t{:<20}".format(colored("Is list", "green")), end="")
        print("bookAttr[authorID]: " + colored(bookAttr["authorID"], 'cyan'), end="")

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

        print() # to signify that this is the end of the book


def processBookAndGenre():
    print("\n\n\nprocessBookAndGenre() running...")
    print("Total books: {0}".format(len(books["__collections__"]["book"])))
    for key, bookAttr in books["__collections__"]["book"].items():
        # print("Processing book: {0}".format(bookAttr))

        # STEP 1.5: IF ANY REMAINING GENRE IS STR TYPE, CONVERT THEM TO LIST TYPE
        if isinstance(bookAttr["genresID"], str):  # if genreID is a string
            print(colored("\tNot a list ", "red"), end="")
            bookAttr["genreID"] = [bookAttr["genresID"]]
            del bookAttr["genresID"]
        else:
            print("\t{:<20}".format(colored("Is list", "green")), end="")
        print("bookAttr[genreID]: " + colored(bookAttr["genreID"], "cyan"), end="")


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

        print() # to signify that this is the end of the book


def findGenre(genreId):
    # search for genreID in genres dict
    for key, value in genres["__collections__"]["genre"].items():
        if value["name"] == genreId:
            print(
                "\tFound genre: {0}".format(colored(value["name"], "yellow")), end=""
            )

            # return key
            return key

    return "-1"


def findAuthor(authorId):
    # search for authorID in authors dict
    for key, value in authors["__collections__"]["author"].items():
        if value["name"] == authorId:
            print(
                colored("\tFound author: {0}".format(value["name"]), "yellow"), end=""
            )

            # return key
            return key

    return "-1"


def updateAuthorDescription():
    print("\n\n\nupdateAuthorDescription() running...")

    # search for authorID in authors dict
    for key, value in authors["__collections__"]["author"].items():

        # if name is Vietnamese
        tempName = value["name"]
        classificationResult = langid.classify(value["name"]) # ('en', -54.41310358047485)

        if True:
        # if classificationResult[1] >= 0.01 and classificationResult[0] != "vi":
            print("{0}/{1}, {2} is {3}".format(colored(list(authors["__collections__"]["author"].keys()).index(key), "dark_grey"), len(books["__collections__"]["book"]), tempName, colored(classificationResult, 'green') ))

            # try to get the language based on the classfied language
            result = "-1"
            # result = findAuthorWikipedia(tempName, classificationResult[0])

            # if fails, try brute force
            wikipediaLanguages = ["vi", "en", classificationResult[0], "de", "fr"]

            # if it's foreign language but not in our list, add it after english
            if classificationResult[0] not in wikipediaLanguages:
                midpoint = len(classificationResult) / 2  # for 7 items, after the 3th
                wikipediaLanguages = wikipediaLanguages[0:midpoint] + [classificationResult[0]] + wikipediaLanguages[midpoint:]  

            if result == "-1":
                for lang in wikipediaLanguages:
                    # if lang == classificationResult[0]: # we searched this already
                    #     continue
                    result = findAuthorWikipedia(tempName, lang)
                    if result != "-1": # we found the page
                        break

            if result != "-1":
                print()
                value["description"] = extractAuthorDescription(result)
            else:
                # we tried at least four to five wikipedia languages, and still failed
                continue
        else:
            print("{0:25s} is {1}".format(tempName, colored(classificationResult, 'red') ))


def findAuthorWikipedia(name, lang):

    # sleep for 1 second
    time.sleep(1)

    # process input param to URL
    safe_string = urllib.parse.quote_plus(name)
    # print("https://www.google.com/search?q=" + safe_string) # https://www.google.com/search?q=Lep+T%C3%B4nxtoi

    # set `request` headers
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}
    response = requests.get("https://" + lang + ".wikipedia.org/w/index.php?search=" + safe_string, headers=headers, timeout=20, allow_redirects=True)
    # print(response.request.headers["User-Agent"])
    print("\tChecking: " + colored("https://" + lang + ".wikipedia.org/w/index.php?search=" + safe_string, "cyan"))

    # case 1: wikipedia page not found
    # case 2: no matching query
    # case 3: found some but not close enough
    # case 4: you can create a draft and submit it for review
    # case 5: found
    soup = BeautifulSoup(response.content, 'html.parser')

    # get url of redirected page
    redirectedURL = response.url
    if "&ns0=1" in redirectedURL:
        print("\tRedirected to: " + colored(redirectedURL, "red"))
        return "-1"

    # case 1
    vietnameseNotFound = "Bạn có thể tạo trang .*?" # You can create a page
    englishNotFound = "The page .*? does not exist. You can create a draft"
    frenchNotFound = "Aucun résultat trouvé pour .*?" # No results found for
    germanNotFound = "Keine Ergebnisse für .*? gefunden" # No results for
    regexNotFound = re.compile(r"(" + vietnameseNotFound + ")|(" + englishNotFound + ")|(" + frenchNotFound + ")|(" + germanNotFound + ")")
    resultOfRegexNotFound = re.findall(regexNotFound, soup.text)
    if len(resultOfRegexNotFound) > 0:
        print("\tCase 1, regex found page not exist: " + colored(str(resultOfRegexNotFound), 'red'))
        return "-1"

    case2 = soup.find("p", {"class": "mw-search-nonefound"}) # case 2
    case3 = soup.find("div", {"class": "searchdidyoumean"}) # case 3
    case4 = soup.find("p", {"class": "mw-search-createlink"}) # case 4

    if case2 is None and case3 is None and case4 is None:
        # case 1: found or case 4: too many people with the same name
        personMayReferTo = soup.find("div", {"class": "mw-content-ltr mw-parser-output"}).find("p")

        # case 3 and case 5
        if personMayReferTo is not None:
            possibleCases = []
            # keywords related to an author
            vietnameseKeywords = "(tác (giả|phẩm)|nhà (văn|thơ)|văn sĩ|viết (sách|thơ|văn)|sáng (tác|tạo)|đầu sách|vở (diễn|kịch))"
            englishKeywords = "(author|novel|liter|book|journal)(es|s|ist|ary|ature)?"
            frenchKeywords = "(auteur|écrivain|romancier|poète|littéraire|livre|journal|journaliste)"
            germanKeywords = "(autor|schriftsteller|dichter|literarisch|buch|journal|journalist)"

            keywords = re.compile(r"" + vietnameseKeywords + "|" + englishKeywords + "|" + frenchKeywords + "|" + germanKeywords + "", re.IGNORECASE)
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

                print("\tCase 5, regex found: " + colored(bestMatchCase[0], "green") + " with " + str(bestMatchCase[1]) + " matches", end="")

                # if case 3 still can't find any match, return -1
                if bestMatchCase[0] == "":
                    return "-1"

                # get link href
                return "https://" + lang + ".wikipedia.org" + bestMatchCase[0].find("a")["href"]

            # case 1
            else:
                print("\tCase 5, first hit found: " + colored("https://" + lang + ".wikipedia.org/w/index.php?search=" + safe_string, "green"), end="")
                return "https://" + lang + ".wikipedia.org/w/index.php?search=" + safe_string 

    elif case2 is not None:
        print("\tCase 2: query not found")
        return "-1"
    elif case3 is not None:
        print("\tCase 3: too many with similar names")
        return "-1"
    elif case4 is not None:
        print("\tCase 4: you can try to create a new link")
        return "-1"
    else:
        print("\tWHAT YOU DO MEAN, THIS CASE WILL NEVER BE REACHED")
        return "-1"


def extractAuthorDescription(link):

    print("\tFetching: " + colored(link, 'cyan'))

    # set `request` headers
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}
    response = requests.get(link, headers=headers, timeout=20, allow_redirects=True)

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
        if description.count(" ") < 500:
            description += element.getText()
        else:
            break

    regexCitation = re.compile(r"\[\d+\]|\bcitation\b \bneeded\b")
    description = re.sub(regexCitation, "", description)
    print("\t\t" + colored(description[:100] + "...", 'cyan'))
    return description


def flush():
    with open(path + "author.json", "w", encoding="utf-8") as json_file:
        json.dump(authors, json_file, ensure_ascii=False, indent=4)

    with open(path + "book.json", "w", encoding="utf-8") as json_file:
        json.dump(books, json_file, ensure_ascii=False, indent=4)

    with open(path + "genre.json", "w", encoding="utf-8") as json_file:
        json.dump(genres, json_file, ensure_ascii=False, indent=4)


def finalize():
    print(("Author length : {0}").format(colored(str(len(authors["__collections__"]["author"])))))
    print(("Book length : {0}").format(colored(str(len(books["__collections__"]["book"])))))
    print(("Genre length : {0}").format(colored(str(len(genres["__collections__"]["genre"])))))
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
# request read timeout
except requests.exceptions.Timeout:
    logging.exception("error")
    print("Timeout has been caught.")
    exit()
# user cancel
except KeyboardInterrupt:
    print("KeyboardInterrupt has been caught.")
    exit()
# except everything else
except:
    logging.exception("error")
    print("An error has been caught.")
    exit()

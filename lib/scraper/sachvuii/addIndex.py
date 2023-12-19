import json  # for read and write json file
from termcolor import colored  # for printing colors in the terminal

authors = {"__collections__": {"author": {}}}
books = {"__collections__": {"book": {}}}
genres = {"__collections__": {"genre": {}}}


# Description: designed to be run on /json-v4/ all three files author book and genre
# Effect: gives each record an index starting from 0
# Index: type of int/number


def readAuthorJson():

    with open("author.json", "r", encoding="utf-8") as json_file:
        # load the json file
        data = json.load(json_file)
        count = 0


        # for every author in the json file
        for key, value in data["__collections__"]["author"].items():
            authors["__collections__"]["author"][key] = value
            value["index"] = count
            count += 1

        print(("Author length: {0}").format(colored(str(len(authors["__collections__"]["author"])))))


def readBookJson():
    with open("book.json", "r", encoding="utf-8") as json_file:
        # load the json file
        data = json.load(json_file)
        count = 0


        # for every book in the json file
        for key, value in data["__collections__"]["book"].items():
            books["__collections__"]["book"][key] = value
            value["index"] = count
            count += 1

    print(("Book length : {0}").format(colored(str(len(books["__collections__"]["book"])))))


def readGenreJson():
    with open("genre.json", "r", encoding="utf-8") as json_file:
        # load the json file
        data = json.load(json_file)
        count = 0


        # for every book in the json file
        for key, value in data["__collections__"]["genre"].items():
            genres["__collections__"]["genre"][key] = value
            value["index"] = count
            count += 1

    print(("Genre length : {0}").format(colored(str(len(genres["__collections__"]["genre"])))))


def flush():

    # take user input
    name = input(colored("Write to file (Yes/n): ", "yellow"))
    if name == "n":
        print(colored("Input: n => Not saving.", "red"))
        return
    elif name == "Yes":
        print(colored("Input: " + name + " => Saving.", "green"))
        with open("author.json", "w", encoding="utf-8") as json_file:
            json.dump(authors, json_file, ensure_ascii=False, indent=4)
        with open("book.json", "w", encoding="utf-8") as json_file:
            json.dump(books, json_file, ensure_ascii=False, indent=4)
        with open("genre.json", "w", encoding="utf-8") as json_file:
            json.dump(genres, json_file, ensure_ascii=False, indent=4)
    else:
        print(colored("Input: " + name + " => Not saving.", "red"))
        return


readAuthorJson()
readBookJson()
readGenreJson()
flush()
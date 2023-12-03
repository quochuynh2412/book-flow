import json
import os
import time
from termcolor import colored
import datetime

path = "./json/"

def main():
    os.system("cls" if os.name == "nt" else "clear")
    readBookJson()


def readAuthorJson():
    with open(path + "author.json", "r", encoding="utf-8") as json_file:
        data = json.load(json_file)
        # for key, value in data['__collections__']['author'].items():
        #     print(key, "\n", value)
        return data


# def readGenreJson():
#     with open(path + "genre.json", "r", encoding="utf-8") as json_file:
#         data = json.load(json_file)
#         # for key, value in data['__collections__']['genre'].items():
#         #     print(key, "\n", value)
#         return data


def readBookJson():
    with open(path + "book.json", "r", encoding="utf-8") as json_file:
        # load the json file
        data = json.load(json_file)
        count = 0

        # for every book in the json file
        for key, value in data["__collections__"]["book"].items():
            print(
                "Key: {0} \n\tTitle: {1}\n\tValue: {2}\n\tValue: {3}\n".format(
                    key, value["title"], value["genresID"], value["authorID"]
                )
            )
            count += 1
            if count > 10:
                exit()

            # get the authorID
            # authorId = value['authorID']

            # for key, value in authorJson['__collections__']['author'].items():
            #     name = value['name']
            #     if authorId == name:
            #         print("Book:", authorId, " = ", "Author:", name)
            #         break
            #     else:
            #         print("Author json is missing `name`", authorId)

        return data

try:
    main()
except KeyboardInterrupt:
    print("KeyboardInterrupt has been caught.")
    exit()

import json
import os
import time
from termcolor import colored
import datetime

pathToJsonFiles = "./json/"


def countBooksInJson():
    count = 1
    grandTotal = 0

    print(os.listdir)
    # Get all JSON file names as a list
    json_file_names = [filename for filename in os.listdir(pathToJsonFiles) if filename.endswith('.json')]

    print("%-3s %-30s %s" % ("##", "File name", "Number of books"))
    for json_file_name in json_file_names:
        with open(os.path.join(pathToJsonFiles, json_file_name), "r", encoding="utf-8") as json_file:
            print("%-3d %-30s %s" % (count, json_file_name, colored(str(countBooksInJsonDetailed(json_file_name.split(".")[0])), 'red')))
            count += 1
            grandTotal += countBooksInJsonDetailed(json_file_name.split(".")[0])
    print("%-3s %-30s %s" % ("", "", colored(grandTotal, attrs=["bold"])))

def countBooksInJsonDetailed(fileName):
    count = 0
    with open("./json/"+fileName+".json", "r", encoding="utf-8") as json_file:
        data = json.load(json_file)
        count = count + len(data)
    return count

def main():
    os.system('cls' if os.name == 'nt' else 'clear')
    countBooksInJson()
    # print("Total books: " + str(countBooksInJson()))

try:
    main()
except KeyboardInterrupt:
    print("KeyboardInterrupt has been caught.")
    exit()

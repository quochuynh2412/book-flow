import json
import os
import time
from termcolor import colored
import datetime

pathToJsonFiles = "./json/"


def countBooksInJson():
    count = 1
    grandTotal = 0
    grandTotalCovers = 0

    # Get all JSON file names as a list
    json_file_names = [filename for filename in os.listdir(pathToJsonFiles) if filename.endswith('.json')]

    print("%-3s %-30s %-12s %-12s" % ("##", "File name", "Books count", "Covers count"))
    for json_file_name in json_file_names:
        with open(os.path.join(pathToJsonFiles, json_file_name), "r", encoding="utf-8") as json_file:
            print("%-3d %-30s %-21s %-12s" % (
                count,
                json_file_name,
                colored(str(countBooksInJsonDetailed(json_file_name.split(".")[0])), 'red'),
                colored(str(countCovers(json_file_name.split(".")[0])), 'red')
            ))
            count += 1
            grandTotal += countBooksInJsonDetailed(json_file_name.split(".")[0])
            grandTotalCovers += countCovers(json_file_name.split(".")[0])
            
    print("%-3s %-30s %-20s %-12s" % (
        "",
        "",
        colored(str(grandTotal), attrs=["bold"]),
        colored(str(grandTotalCovers), attrs=["bold"])
        ))

def countBooksInJsonDetailed(fileName):
    count = 0
    with open("./json/"+fileName+".json", "r", encoding="utf-8") as json_file:
        data = json.load(json_file)
        count = count + len(data)
    return count

def countCovers(categoryName):

    tempFileName = pathToJsonFiles+categoryName+"/"
    # print(tempFileName)
    jpg = [tempFileName for filename in os.listdir(tempFileName) if filename.endswith('.jpg')]
    jpeg = [tempFileName for filename in os.listdir(tempFileName) if filename.endswith('.jpeg')]
    png = [tempFileName for filename in os.listdir(tempFileName) if filename.endswith('.png')]
    gif = [tempFileName for filename in os.listdir(tempFileName) if filename.endswith('.gif')]
    
    countImages = 0
    for image_file_name in jpg:
        countImages += 1
    for image_file_name in jpeg:
        countImages += 1
    for image_file_name in png:
        countImages += 1
    for image_file_name in gif:
        countImages += 1
    return countImages

def main():
    os.system('cls' if os.name == 'nt' else 'clear')
    countBooksInJson()

try:
    main()
except KeyboardInterrupt:
    print("KeyboardInterrupt has been caught.")
    exit()

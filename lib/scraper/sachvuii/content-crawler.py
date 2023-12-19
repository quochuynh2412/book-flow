import json
from bs4 import BeautifulSoup
import requests
import os
import time
from termcolor import colored
import datetime
import uuid

countBooksSiteWide = 0 # site-wide
jsonOfBooks = {
    "__collections__": {
        "book": {

        }
    }
}
writeToFolder = ""
hostURL = "https://sachvuii.com/"
categoriesURL = [
    "https://sachvuii.com/am-thuc-nau-an/",
    "https://sachvuii.com/co-tich-than-thoai/",
    "https://sachvuii.com/cong-nghe-thong-tin/",
    "https://sachvuii.com/hoc-ngoai-ngu/",
    "https://sachvuii.com/hoi-ky-tuy-but/",
    "https://sachvuii.com/khac/",
    "https://sachvuii.com/khoa-hoc-ky-thuat/",
    "https://sachvuii.com/kien-truc-xay-dung/",
    "https://sachvuii.com/kinh-te-quan-ly/",
    "https://sachvuii.com/lich-su-chinh-tri/",
    "https://sachvuii.com/marketing-ban-hang/",
    "https://sachvuii.com/nong-lam-ngu/",
    "https://sachvuii.com/phieu-luu-mao-hiem/",
    "https://sachvuii.com/tai-lieu-hoc-tap/",
    "https://sachvuii.com/tam-ly-ky-nang-song/",
    "https://sachvuii.com/the-thao-nghe-thuat/",
    "https://sachvuii.com/tieu-thuyet-trung-quoc/",
    "https://sachvuii.com/triet-hoc/",
    "https://sachvuii.com/truyen-cuoi-tieu-lam/",
    "https://sachvuii.com/van-hoa-ton-giao/",
    "https://sachvuii.com/van-hoc-viet-nam/",
    "https://sachvuii.com/y-hoc-suc-khoe/"
]

# read all json files and count the number of books
# def countBooksInJson():
#     count = 0
#     for categoryURL in categoriesURLDone:
#         with open("./json/" + categoryURL.split("/")[3] + ".json", "r", encoding="utf-8") as json_file:
#             data = json.load(json_file)
#             count = count + len(data)
#     return count

def react_to_status_code(URL):
    page = requests.get(URL, timeout=10, allow_redirects=True)
    if page.status_code == 200:
        print(colored("OK 200: " + URL, 'green'))
        return page
    # if status code starts with 4 or 5, then do something
    elif int(str(page.status_code)[:1]) == 4:
        if int(str(page.status_code)[:3]) == 429:
            print(colored("ERROR 429: Too many requests", 'red'))
            # stop the program
            exit()
    elif int(str(page.status_code)[:1]) == 5:
        if int(str(page.status_code)[:3]) == 500:
            print(colored("ERROR 500: Internal Server Error", 'red'))
            # stop the program
            exit()
        elif int(str(page.status_code)[:3]) == 502:
            print(colored("ERROR 502: Bad Gateway", 'red'))
            # stop the program
            exit()
        elif int(str(page.status_code)[:3]) == 503:
            print(colored("ERROR 503: Service Unavailable", 'red'))
            # stop the program
            exit()
    else:
        print(colored("CODE " + str(page.status_code) + ": " + URL, 'light_yellow'))
        # stop the program
        exit()

def get_page(categoryURL):

    page = react_to_status_code(categoryURL)

    soup = BeautifulSoup(page.content, 'html.parser')

    # create folder for the covers
    global writeToFolder
    writeToFolder = categoryURL.split("/")[3]
    if not os.path.exists("./json/" + writeToFolder):
        os.makedirs("./json/" + writeToFolder)

    pagination = soup.find("div", {"class": "pagination"})

    # get current page
    current_page = pagination.find("a", {"class": "current"}).getText()
    print("Page " + colored(current_page, 'red') + " at " + colored(categoryURL, 'cyan'), end="")

    # get next page
    next_page = pagination.find("a", {"class": "current"}).find_next_sibling("a")

    # process current page
    parsed = soup.find_all("div", {"class": "col-xs-6 col-md-3 col-sm-3 ebook"})
    print(" found " + colored(str(len(parsed)), 'red') + " books")
    
    ## 3. for every books found, do...
    for i in range(0, len(parsed)):

        # get the book's url
        parsed[i] = parsed[i].find("h5", {"class": "tieude text-center"}).find("a").get("href")

        # measure time taken for EACH book
        start = time.time()
        print("\n\n", end="")
        get_book_content(parsed[i])
        end = time.time()

        # print format
        global countBooksSiteWide
        countBooksSiteWide = countBooksSiteWide + 1
        print(str(countBooksSiteWide) + " (" + str(round(end-start, 2)) + "s) " + parsed[i], end="")

        if (i == len(parsed) - 1 and not next_page):
            print(colored(" (last page)\n", 'red'))
        else:
            print("\n", end="")

    if next_page:
        print("\n", end="")
        get_page(next_page.get("href"))
    else:
        writeToJson(jsonOfBooks, writeToFolder)
        print("\n\n\n\n" + "=" * 150 + "\n\n\n\n")

# 3.5 get the book content
def get_book_content(bookURL):

    # establish connection
    page = react_to_status_code(bookURL)
    soup = BeautifulSoup(page.content, 'html.parser')

    title = soup.find("h1", {"class": "ebook_title"}).getText()
    author = soup.find("h1", {"class": "ebook_title"}).find_next_sibling("h5").getText().split(":")[1].strip()
    genre = soup.find("h1", {"class": "ebook_title"}).find_next_sibling("h5").find_next_sibling("h5").getText().split(":")[1].strip()

    # cover processing
    cover = soup.find("div", {"class": "cover"}).find("img").get("src")
    # download the cover
    r = react_to_status_code(cover)

    # new method
    coverName = cover.split("/")[-1]

    # store at a subfolder
    global writeToFolder
    open("./json/" + writeToFolder + "/" + coverName, 'wb').write(r.content)
    cover = cover.split("/")[-1]

    description = soup.find("div", {"class": "gioi_thieu_sach"}).getText().strip()

    # store to json
    jsonOfBooks["__collections__"]["book"][str(uuid.uuid4())] = {
        "title": title,
        "authorID": author,
        "genresID": genre,
        "imageID": coverName,
        "description": description
    }

# 4. handle what you want with the content
# writes to json file format
def writeToJson(parsed, category):
    with open("./json/" + category + ".json", "w", encoding="utf-8") as outfile:
           json.dump(parsed, outfile, ensure_ascii=False, indent=4)
           outfile.write("\n")
    jsonOfBooks = {
    "__collections__": {
        "book": {
            
            }
        }
    }

def main():
    os.system('cls' if os.name == 'nt' else 'clear')

    # global countBooksSiteWide
    # countBooksSiteWide = countBooksInJson()

    start = time.time()
    for categoryURL in categoriesURL:
        get_page(categoryURL)
        for i in range(0, 60):
            print("Sleep between category: " + colored("" + str(60-i) + "s", 'yellow'), end="\n")
            time.sleep(1) # sleep for 60 second
    end = time.time()

    # convert seconds to HH:MM:SS but round to 2 decimal places
    totalTime = str(datetime.timedelta(seconds=round(end-start, 0)))

    print("STATISTICS: " + colored(str(len(categoriesURL)), 'red') + " categories, " + colored(str(countBooksSiteWide), 'red') + " books.")
    print("STATISTICS: Total time " + colored(totalTime, 'red') + ". Average time per book: " + colored(str(round((end-start)/countBooksSiteWide, 2)) + "s", 'red'))

# if KeyboardInterrupt then do something
try:
    main()
except KeyboardInterrupt:
    try:
        print(colored('InterruptedError','red'))
    except SystemExit:
        print(colored('InterruptedError','red'))
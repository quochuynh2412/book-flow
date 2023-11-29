from bs4 import BeautifulSoup
import requests
import json
import time
import os # clear terminal
from termcolor import colored

os.system('cls' if os.name == 'nt' else 'clear')

# init parsed
jsonOfBooks = []
countBooks = 0

## 1. get the url
urls = ["https://sachvuii.com/am-thuc-nau-an/",
"https://sachvuii.com/co-tich-than-thoai/"]

# urls = ["https://sachvuii.com/am-thuc-nau-an/",
# "https://sachvuii.com/co-tich-than-thoai/",
# "https://sachvuii.com/cong-nghe-thong-tin/",
# "https://sachvuii.com/hoc-ngoai-ngu/",
# "https://sachvuii.com/hoi-ky-tuy-but/",
# "https://sachvuii.com/khac/",
# "https://sachvuii.com/khoa-hoc-ky-thuat/",
# "https://sachvuii.com/kien-truc-xay-dung/",
# "https://sachvuii.com/kinh-te-quan-ly/",
# "https://sachvuii.com/lich-su-chinh-tri/",
# "https://sachvuii.com/marketing-ban-hang/",
# "https://sachvuii.com/nong-lam-ngu/",
# "https://sachvuii.com/phieu-luu-mao-hiem/",
# "https://sachvuii.com/tai-lieu-hoc-tap/",
# "https://sachvuii.com/tam-ly-ky-nang-song/",
# "https://sachvuii.com/the-thao-nghe-thuat/",
# "https://sachvuii.com/tieu-thuyet-trung-quoc/",
# "https://sachvuii.com/triet-hoc/",
# "https://sachvuii.com/truyen-cuoi-tieu-lam/",
# "https://sachvuii.com/van-hoa-ton-giao/",
# "https://sachvuii.com/van-hoc-viet-nam/",
# "https://sachvuii.com/y-hoc-suc-khoe/"]

host = urls[0].split("/")[2]

def spacing(text=""):
    if text:
        print("\n\n=====================" + text + "=====================\n\n")
    else:
        print("\n\n===============================================================\n\n")

def get_page_content(url):

    ## 2. connect to the url
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')

    # 3. get the parsed[]
    parsed = soup.find_all("div", {"class": "col-xs-6 col-md-3 col-sm-3 ebook"})
    spacing("find_all() found " + str(len(parsed)) + " books.")

    for i in range(0, len(parsed)):
        parsed[i] = parsed[i].find("h5", {"class": "tieude text-center"}).find("a").get("href") # get anchor tag

        # time
        start = time.time()
        get_book_content(parsed[i])
        end = time.time()

        # print format
        global countBooks
        print(str(countBooks) + " (" + str(round(end-start, 2)) + "s) " + parsed[i])
        countBooks = countBooks + 1

    # 4. if the pagination can be found, then go to the next page
    get_next_page(soup)

def get_next_page(soup):
    pagination = soup.find("div", {"class": "pagination"})
    # print("Pagination: " + str(pagination))
    if pagination:

        # get class "current"
        current_page = pagination.find("a", {"class": "current"}).getText()
        print("Current page: " + current_page)
        # get next sibling
        next_page = pagination.find("a", {"class": "current"}).find_next_sibling("a")

        if next_page:
            print("Next page: " + next_page.getText() + " at " + next_page.get("href"))
            spacing()
            get_page_content(next_page.get("href"))
        else:
            print("Last page.")
    else:
        print("Last page.")

# 3.5 get the book content
def get_book_content(url):
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')

    title = soup.find("h1", {"class": "ebook_title"}).getText()
    author = soup.find("h1", {"class": "ebook_title"}).find_next_sibling("h5").getText().split(":")[1].strip()
    genre = soup.find("h1", {"class": "ebook_title"}).find_next_sibling("h5").find_next_sibling("h5").getText().split(":")[1].strip()

    # cover processing
    cover = soup.find("div", {"class": "cover"}).find("img").get("src")
    # download the cover
    r = requests.get(cover, allow_redirects=True)

    # old method
    # convert whitespace to underscore and hyphenate
    # coverName = title.replace(" ", "_") + "-" + author.replace(" ", "_") + ".jpg"
    # convert Vietnamese to English
    # coverName = unicodedata.normalize('NFKD', coverName).encode('ascii', 'ignore').decode('utf-8', 'ignore')

    # new method
    coverName = cover.split("/")[-1]

    # store at a subfolder
    print(os.path.join("covers", coverName))
    open(os.path.join("covers", coverName), 'wb').write(r.content)
    cover = cover.split("/")[-1]

    description = soup.find("div", {"class": "gioi_thieu_sach"}).getText().strip()

    # clean description of invisible characters like U+00a0
    # description = unicodedata.normalize("NFKD", description)

    # note to self: U+2013 is endash, U+2014 is emdash, U+002d is hyphen-minus on the computer keyboard

    # print("Title: " + title)
    # print("Author: " + author)
    # print("Genre: " + genre)
    # print("Cover: " + cover)
    # print("Description: " + description)

    # store to json
    jsonOfBooks.append({
        "title": title,
        "authorID": author,
        "genresID": genre,
        "imageID": cover,
        "description": description
    })

# 4. handle what you want with the content
# writes to json file format
def writeToJson(parsed, category="none"):
    # file = open("result.json", 'w')
    # file.write(json.dumps(parsed, ensure_ascii=False).encode("utf-8"))

    global host
    with open(os.path.join(host, category) +".json", 'a', encoding='utf8') as f:
        json.dump(parsed, f, ensure_ascii=False)
        f.write("\n")

# for row in parsed:
#     file.write(row.encode("utf-8"))
# file.close()

def main():
    startProgram = time.time()
    global countBooks
    for url in urls:
        get_page_content(url)
        category = url.split("/")[-2]
        spacing("End of catergory: " + category + ". Total books: " + str(countBooks) + ".")
        writeToJson(jsonOfBooks, category)

    spacing("Books: " + str(countBooks))

    endProgram = time.time()
    spacing("Program ended in " + str(round(endProgram-startProgram, 2)) + "s")

# if KeyboardInterrupt then do something
try:
    main()
except KeyboardInterrupt:
    spacing("Interrupted. Force write to JSON file.")
    try:
        writeToJson(jsonOfBooks) # if user Ctrl-C then force write
    except SystemExit:
        writeToJson(jsonOfBooks) # if user Ctrl-C then force write





















# # 5. ouput
# university_names = {}

# file = open("result.txt", 'wb')

# for row in parsed:
#     university_team = row.find("span", {"class": "organization"}).text.strip()

#     if university_team in university_names:
#         university_names[university_team] += 1
#     else:
#         university_names[university_team] = 1

#     file.write(row.encode("utf-8"))
# file.close()

# # 6. write
# file = open("result.txt", 'w')

# university_names = {k: v for k, v in sorted(university_names.items(), key= lambda v: v[1])}

# for k, v in university_names.items():
#     file.write((str(k) + ": " + str(v) + "\n"))

# file.close()
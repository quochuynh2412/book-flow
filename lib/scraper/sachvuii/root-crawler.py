from bs4 import BeautifulSoup
import requests
import os # clear terminal
os.system('cls' if os.name == 'nt' else 'clear')
import time
from termcolor import colored

countInCategory = 0
countInCategories = 0
categoriesURL = []
# make dictionary
categoriesCountDict = {}

## 1. get the url
rootUrl = "https://sachvuii.com/"

## 2. connect to the url
def get_categories(url):
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')

    # 3. get the parsed[]
    parsed = soup.find_all("li", {"class": "cat-item"})
    print("find_all() got " + colored(str(len(parsed)), 'red') + " categories")

    for i in range(0, len(parsed)):
        # get anchor tag
        parsed[i] = parsed[i].find("a").get("href")
        print(parsed[i])
        categoriesURL.append(parsed[i])

    print("\n\n", end="")

    # categoriesURL.append("https://sachvuii.com/am-thuc-nau-an/")
    # categoriesURL.append("https://sachvuii.com/co-tich-than-thoai/")
    # categoriesURL.append("https://sachvuii.com/cong-nghe-thong-tin/")
    # categoriesURL.append("https://sachvuii.com/hoc-ngoai-ngu/")

def count_books_in_categories():
    if categoriesURL:
        for categoryURL in categoriesURL:
            print("===============================================================", end="")
            print("Category: " + colored(categoryURL, 'red'), end="")
            print("===============================================================", end="\n")
            count_books_in_category(categoryURL)

def count_books_in_category(categoryURL):
    ## 2. connect to the url
    page = requests.get(categoryURL)
    soup = BeautifulSoup(page.content, 'html.parser')

    # 3. get the parsed[]
    parsed = soup.find_all("div", {"class": "col-xs-6 col-md-3 col-sm-3 ebook"})
    global countInCategories
    countInCategories += len(parsed)

    global countInCategory
    countInCategory += len(parsed)

    get_next_page(soup, categoryURL)

def get_next_page(soup, categoryURL):
    pagination = soup.find("div", {"class": "pagination"})

    if pagination:
        # get class "current"
        current_page = pagination.find("a", {"class": "current"}).getText()
        print("Current page: " + colored(current_page, 'red') + " at " + categoryURL, end="")
        # get next sibling
        next_page = pagination.find("a", {"class": "current"}).find_next_sibling("a")

        if next_page:
            # print("Next page: " + next_page.getText() + " at " + next_page.get("href"))
            print("\n", end="")
            count_books_in_category(next_page.get("href"))
        else:
            print(colored(" (last page)", 'red'))
            global countInCategory
            print("Books in category: " + colored(str(countInCategory), 'red'))
            print("\n\n")

            # add countInCategory to dictionary
            global categoriesCountDict
            categoriesCountDict[categoryURL] = countInCategory

            countInCategory = 0
    else:
        print("Last page.")

# export categoriesCountDict content to txt file
def export_to_txt(total):
    print("EXPORTING: to txt file: " + colored("ongoing...", 'red'), end="")
    with open("categoriesCountDict.txt", "w") as f:
        for key in categoriesCountDict.keys():
            f.write("%s: %s\n" % (key, categoriesCountDict[key]))
        f.write("Total: %s\n" % total)
    print(colored("done", 'red'))

def main():
    start = time.time()
    ## 1. get the url
    get_categories(rootUrl)
    count_books_in_categories()
    print("STATISTICS: " + colored(str(len(categoriesURL)), 'red') + " categories, " + colored(str(countInCategories), 'red') + " books.")
    export_to_txt(countInCategories)
    end = time.time()
    print("STATISTICS: Total time " + colored(str(round(end-start, 2)) + "s", 'red') + ". Average time per book: " + colored(str(round((end-start)/countInCategories, 2)) + "s", 'red'))

# if KeyboardInterrupt then do something
try:
    main()
except KeyboardInterrupt:
    try:
        print("STATISTICS: Books in categories: " + colored(str(countInCategories), 'red'))
    except SystemExit:
        print("STATISTICS: Books in categories: " + colored(str(countInCategories), 'red'))

# https://sachvuii.com/am-thuc-nau-an/
# https://sachvuii.com/co-tich-than-thoai/
# https://sachvuii.com/cong-nghe-thong-tin/
# https://sachvuii.com/hoc-ngoai-ngu/
# https://sachvuii.com/hoi-ky-tuy-but/
# https://sachvuii.com/khac/
# https://sachvuii.com/khoa-hoc-ky-thuat/
# https://sachvuii.com/kien-truc-xay-dung/
# https://sachvuii.com/kinh-te-quan-ly/
# https://sachvuii.com/lich-su-chinh-tri/
# https://sachvuii.com/marketing-ban-hang/
# https://sachvuii.com/nong-lam-ngu/
# https://sachvuii.com/phieu-luu-mao-hiem/
# https://sachvuii.com/tai-lieu-hoc-tap/
# https://sachvuii.com/tam-ly-ky-nang-song/
# https://sachvuii.com/the-thao-nghe-thuat/
# https://sachvuii.com/tieu-thuyet-trung-quoc/
# https://sachvuii.com/triet-hoc/
# https://sachvuii.com/truyen-cuoi-tieu-lam/
# https://sachvuii.com/van-hoa-ton-giao/
# https://sachvuii.com/van-hoc-viet-nam/
# https://sachvuii.com/y-hoc-suc-khoe/
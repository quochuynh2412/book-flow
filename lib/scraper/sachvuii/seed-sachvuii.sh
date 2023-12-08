#!/bin/bash


# Windows
cd "C:\Users\quinn\Desktop\sepm\book-flow\lib"
# WSL2
cd "/mnt/c/Users/quinn/Desktop/sepm/book-flow/lib"


# v3 and v4
npx -p node-firestore-import-export firestore-import -a bookflow-e7dbd-firebase-adminsdk-vhk4z-87018ee525.json -b "C:\Users\quinn\Desktop\sepm\book-flow\lib\scraper\sachvuii\json\author.json" --yes && npx -p node-firestore-import-export firestore-import -a bookflow-e7dbd-firebase-adminsdk-vhk4z-87018ee525.json -b "C:\Users\quinn\Desktop\sepm\book-flow\lib\scraper\sachvuii\json\book.json" --yes && npx -p node-firestore-import-export firestore-import -a bookflow-e7dbd-firebase-adminsdk-vhk4z-87018ee525.json -b "C:\Users\quinn\Desktop\sepm\book-flow\lib\scraper\sachvuii\json\genre.json" --yes


# Export backup
npx -p node-firestore-import-export firestore-export -a bookflow-e7dbd-firebase-adminsdk-vhk4z-87018ee525.json -b "C:\Users\quinn\Desktop\sepm\json-v2\BACKUP-2023-12-03.json" --yes

# Import backup
npx -p node-firestore-import-export firestore-import -a bookflow-e7dbd-firebase-adminsdk-vhk4z-87018ee525.json -b "C:\Users\quinn\Desktop\sepm\json-v2\BACKUP-2023-11-30.json" --yes

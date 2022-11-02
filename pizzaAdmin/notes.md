I.
SZERVER OLDALI REQUEST HANDLEREK
PIZZA DB megjelenítéshez és kezeléshez

- serving: FRONTEND DIR, IMAGE DIR
- GET database (vmilyen req-re visszaadjuk a database.json-t)
- DELETE (picture + entry from databse)
- POST (save picture + push new entry into database)
- PUT (replace existing file + update existing entry in database)

II.
SZERVER OLDALI REQUEST HANDLEREK
ORDERS DB megjelenítéshez és kezeléshez

- GET (orders database (multiple files) + db with filter query param <<open / closed>>)
- PUT (set status in existing order (single file))

CSABA:
fileupload Q&A: 2022-10-18 38 perc

The res.json() function sends a JSON response. This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using the JSON.stringify() method.

/_ util functions _/
//read the user data from json file
const saveUserData = (data) => {
const stringifyData = JSON.stringify(data)
fs.writeFileSync('users.json', stringifyData)
}
//get the user data from json file
const getUserData = () => {
const jsonData = fs.readFileSync('users.json')
return JSON.parse(jsonData)  
}
/_ util functions ends _/

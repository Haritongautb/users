import sqlite3
conn = sqlite3.connect('./API/rest.db')
c = conn.cursor()

name = "Ehor"
password = "MyString"

users = c.execute("SELECT * FROM user")
conn.commit()

for i in users:
    print(i)
    
    
    
    
# import sqlite3
# conn = sqlite3.connect('./API/rest.db')
# c = conn.cursor()
# c.execute("CREATE TABLE user(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password TEXT)")




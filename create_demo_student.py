import pymongo
import bcrypt

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["udms"]
students = db["students"]

password = "password"
salt = bcrypt.gensalt()
hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)

student = {
    "full_name": "Demo Student",
    "email": "demo@example.com",
    "password": hashed_password,
    "registration_id": "DEMO-123",
    "registration_status": "Approved",
}

students.insert_one(student)

print("Demo student created successfully!")

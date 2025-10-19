import pymongo
import bcrypt
from bson.objectid import ObjectId

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["udms"]

# Clean up existing data
db["students"].delete_many({"email": "demo@example.com"})
db["departments"].delete_many({"name": "Computer Science"})
db["faculties"].delete_many({"email": "faculty@example.com"})
db["courses"].delete_many({})
db["timetables"].delete_many({})
db["notifications"].delete_many({})
db["results"].delete_many({})
db["fees"].delete_many({})
db["feepayments"].delete_many({})
db["attendances"].delete_many({})

# Create Department
department = {
    "name": "Computer Science"
}
department_id = db["departments"].insert_one(department).inserted_id

# Create Faculty
faculty = {
    "name": "Dr. Alan Turing",
    "email": "faculty@example.com",
    "department": department_id
}
faculty_id = db["faculties"].insert_one(faculty).inserted_id

# Create Courses
courses_data = [
    {"name": "Introduction to Programming", "code": "CS101", "credits": 3, "year": 1, "semester": 1},
    {"name": "Data Structures", "code": "CS201", "credits": 4, "year": 2, "semester": 3},
    {"name": "Algorithms", "code": "CS301", "credits": 4, "year": 3, "semester": 5},
    {"name": "Operating Systems", "code": "CS302", "credits": 4, "year": 3, "semester": 5},
    {"name": "Database Management Systems", "code": "CS303", "credits": 4, "year": 3, "semester": 5},
]

course_ids = []
for course in courses_data:
    course["department"] = department_id
    course["faculty"] = faculty_id
    course_ids.append(db["courses"].insert_one(course).inserted_id)

# Create Student
password = "password"
salt = bcrypt.gensalt()
hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)

student = {
    "full_name": "Demo Student",
    "email": "demo@example.com",
    "password": hashed_password,
    "registration_id": "DEMO-123",
    "registration_status": "Approved",
    "department": department_id,
    "course": course_ids,
    "year": 3,
    "semester": 5,
    "date_of_birth": "2002-01-01T00:00:00.000Z",
    "gender": "Male",
}
student_id = db["students"].insert_one(student).inserted_id

# Create Timetable
timetable_data = [
    {"day_of_week": "Monday", "start_time": "09:00", "end_time": "10:00", "subject_name": "Algorithms", "room_number": "101", "class_type": "Lecture"},
    {"day_of_week": "Monday", "start_time": "10:00", "end_time": "11:00", "subject_name": "Operating Systems", "room_number": "102", "class_type": "Lecture"},
    {"day_of_week": "Tuesday", "start_time": "09:00", "end_time": "10:00", "subject_name": "Database Management Systems", "room_number": "103", "class_type": "Lecture"},
]

for item in timetable_data:
    item["department"] = department_id
    item["course"] = course_ids[2] # Algorithms
    item["year"] = 3
    item["semester"] = 5
    item["faculty"] = faculty_id
    db["timetables"].insert_one(item)

# Create Notifications
notification_data = [
    {"title": "Mid-term exams", "message": "The mid-term exams will be held from next month.", "category": "Academic"},
    {"title": "Fee Payment Deadline", "message": "The deadline for fee payment is approaching.", "category": "Fees"},
]

for item in notification_data:
    item["student"] = student_id
    db["notifications"].insert_one(item)

# Create Results
results_data = [
    {"subject": "Data Structures", "grade": "A", "credits": 4, "semester": 3},
    {"subject": "Introduction to Programming", "grade": "B", "credits": 3, "semester": 1},
]

for item in results_data:
    item["student"] = student_id
    item["course"] = course_ids[1] # Data Structures
    db["results"].insert_one(item)

# Create Fees
fee_data = {
    "student": student_id,
    "semester": 5,
    "year": 3,
    "tuition_fee": 10000,
    "lab_fee": 2000,
    "library_fee": 500,
    "other_fees": 1000,
    "total_amount": 13500,
    "pending_amount": 13500,
}
db["fees"].insert_one(fee_data)

# Create Attendance
attendance_data = [
    {"date": "2025-10-17T00:00:00.000Z", "status": "Present"},
    {"date": "2025-10-16T00:00:00.000Z", "status": "Absent"},
]

for item in attendance_data:
    item["student"] = student_id
    item["course"] = course_ids[2] # Algorithms
    item["marked_by"] = faculty_id
    db["attendances"].insert_one(item)

print("Demo data created successfully!")

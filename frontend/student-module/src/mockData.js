export const studentInfo = {
  name: 'Sai Aravind',
  studentId: 'S123456',
  program: 'B.Tech in Computer Science',
  profilePicture: 'https://via.placeholder.com/150', // Placeholder image
};

export const courses = [
  {
    id: 1,
    code: 'CS101',
    name: 'Introduction to Programming',
    credits: 4,
    faculty: 'Dr. Smith',
    type: 'Core',
    syllabus: 'Introduction to programming concepts, variables, data types, control structures, functions, arrays, and pointers.',
    books: ['The C Programming Language by Dennis Ritchie', 'Programming in ANSI C by E. Balagurusamy'],
    objectives: ['To understand the basics of programming', 'To develop problem-solving skills'],
    outcomes: ['Students will be able to write C programs', 'Students will be able to solve problems using programming'],
  },
  {
    id: 2,
    code: 'CS102',
    name: 'Data Structures and Algorithms',
    credits: 4,
    faculty: 'Dr. Jones',
    type: 'Core',
    syllabus: 'Introduction to data structures, arrays, stacks, queues, linked lists, trees, graphs, and algorithms.',
    books: ['Data Structures and Algorithms Made Easy by Narasimha Karumanchi'],
    objectives: ['To understand fundamental data structures', 'To learn algorithm design techniques'],
    outcomes: ['Students will be able to implement data structures', 'Students will be able to analyze algorithm complexity'],
  },
  {
    id: 3,
    code: 'CS201',
    name: 'Database Management Systems',
    credits: 3,
    faculty: 'Dr. Williams',
    type: 'Core',
    syllabus: 'Introduction to database systems, relational model, SQL, database design, and transaction management.',
    books: ['Database System Concepts by Korth'],
    objectives: ['To understand database concepts', 'To learn SQL'],
    outcomes: ['Students will be able to design and query databases'],
  },
  {
    id: 4,
    code: 'CS202',
    name: 'Operating Systems',
    credits: 3,
    faculty: 'Dr. Brown',
    type: 'Core',
    syllabus: 'Introduction to operating systems, processes, threads, CPU scheduling, memory management, and file systems.',
    books: ['Operating System Concepts by Silberschatz'],
    objectives: ['To understand the principles of operating systems'],
    outcomes: ['Students will be able to understand how operating systems work'],
  },
];

export const grades = [
  { subject: 'Programming', grade: 'A' },
  { subject: 'Maths', grade: 'B' },
  { subject: 'Physics', grade: 'A-' },
  { subject: 'Chemistry', grade: 'C+' },
  { subject: 'English', grade: 'B+' },
];

export const dailyAttendance = [
  { date: '2025-10-01', status: 'Present', dailyPercentage: 100 },
  { date: '2025-10-02', status: 'Absent', dailyPercentage: 0 },
  { date: '2025-10-03', status: 'Present', dailyPercentage: 75 },
  { date: '2025-10-04', status: 'Present', dailyPercentage: 90 },
  { date: '2025-10-05', status: 'Absent', dailyPercentage: 0 },
  { date: '2025-10-06', status: 'Present', dailyPercentage: 80 },
  { date: '2025-10-07', status: 'Present', dailyPercentage: 100 },
  { date: '2025-10-08', status: 'Present', dailyPercentage: 60 },
  { date: '2025-10-09', status: 'Absent', dailyPercentage: 0 },
  { date: '2025-10-10', status: 'Present', dailyPercentage: 95 },
  { date: '2025-10-11', status: 'Present', dailyPercentage: 70 },
  { date: '2025-10-12', status: 'Present', dailyPercentage: 85 },
  { date: '2025-10-13', status: 'Present', dailyPercentage: 100 },
  { date: '2025-10-14', status: 'Absent', dailyPercentage: 0 },
  { date: '2025-10-15', status: 'Present', dailyPercentage: 90 },
  { date: '2025-10-16', status: 'Present', dailyPercentage: 50 },
  { date: '2025-10-17', status: 'Present', dailyPercentage: 100 },
  { date: '2025-10-18', status: 'Absent', dailyPercentage: 0 },
  { date: '2025-10-19', status: 'Present', dailyPercentage: 75 },
  { date: '2025-10-20', status: 'Present', dailyPercentage: 90 },
  { date: '2025-10-21', status: 'Present', dailyPercentage: 65 },
  { date: '2025-10-22', status: 'Absent', dailyPercentage: 0 },
  { date: '2025-10-23', status: 'Present', dailyPercentage: 80 },
  { date: '2025-10-24', status: 'Present', dailyPercentage: 100 },
  { date: '2025-10-25', status: 'Present', dailyPercentage: 70 },
  { date: '2025-10-26', status: 'Absent', dailyPercentage: 0 },
  { date: '2025-10-27', status: 'Present', dailyPercentage: 95 },
  { date: '2025-10-28', status: 'Present', dailyPercentage: 85 },
  { date: '2025-10-29', status: 'Present', dailyPercentage: 100 },
  { date: '2025-10-30', status: 'Absent', dailyPercentage: 0 },
  { date: '2025-10-31', status: 'Present', dailyPercentage: 75 },
];

export const upcomingDeadlines = [
  { id: 1, title: 'DSA Assignment 3', dueDate: '2025-10-20', course: 'Data Structures and Algorithms' },
  { id: 2, title: 'DBMS Mid-term Exam', dueDate: '2025-10-25', course: 'Database Management Systems' },
  { id: 3, title: 'OS Project Proposal', dueDate: '2025-11-01', course: 'Operating Systems' },
];

export const notifications = [
  { id: 1, title: 'Fee Payment Due', description: 'Your fee payment for the next semester is due on 2025-11-15.', date: '2025-10-15 10:30:00', read: false, category: 'Fees' },
  { id: 2, title: 'Exam Schedule Update', description: 'Mid-term exam schedule has been updated.', date: '2025-10-14 15:00:00', read: false, category: 'Academic' },
  { id: 3, title: 'New Course Announcement', description: 'A new announcement has been posted in the "Data Structures" course.', date: '2025-10-13 12:00:00', read: true, category: 'Academic' },
  { id: 4, title: 'Campus Event: Tech Fest', description: 'The annual tech fest "Innovate 2025" will be held from 2025-11-01 to 2025-11-03.', date: '2025-10-12 09:00:00', read: false, category: 'Events' },
  { id: 5, title: 'Library Maintenance', description: 'The library will be closed for maintenance on 2025-10-20.', date: '2025-10-11 18:00:00', read: true, category: 'General' },
];

export const resultsData = {
  '1': [
    { subject: 'Programming', code: 'CS101', credits: 4, grade: 'A', marks: 91 },
    { subject: 'Maths I', code: 'MA101', credits: 4, grade: 'B', marks: 85 },
    { subject: 'Physics', code: 'PH101', credits: 3, grade: 'A-', marks: 88 },
    { subject: 'Chemistry', code: 'CH101', credits: 3, grade: 'C+', marks: 76 },
  ],
  '2': [
    { subject: 'Data Structures', code: 'CS102', credits: 4, grade: 'A', marks: 92 },
    { subject: 'Maths II', code: 'MA102', credits: 4, grade: 'B+', marks: 88 },
    { subject: 'Electronics', code: 'EC101', credits: 3, grade: 'B', marks: 82 },
    { subject: 'Workshop', code: 'ME101', credits: 2, grade: 'A', marks: 95 },
  ],
};

export const cgpa = 8.8;

export const feeDetails = {
  totalAmount: 125000,
  dueDate: '2025-11-15',
  status: 'Due',
  breakdown: [
    { item: 'Tuition Fee', amount: 100000 },
    { item: 'Library Fee', amount: 5000 },
    { item: 'Lab Fee', amount: 10000 },
    { item: 'Exam Fee', amount: 5000 },
    { item: 'Other', amount: 5000 },
  ],
};

export const paymentHistory = [
  { transactionId: 'TXN123456', date: '2025-05-10', amount: 120000, status: 'Paid', semester: 5 },
  { transactionId: 'TXN789012', date: '2024-11-12', amount: 115000, status: 'Paid', semester: 4 },
  { transactionId: 'TXN345678', date: '2024-05-15', amount: 110000, status: 'Paid', semester: 3 },
];

export const timetableData = {
  '1': { // Semester 1
    Monday: [
      { time: '09:00-10:00', subject: 'CS101', faculty: 'Dr. Smith', room: 'L101', type: 'Lecture', color: '#FFADAD' },
      { time: '10:00-11:00', subject: 'MA101', faculty: 'Dr. Jones', room: 'L102', type: 'Lecture', color: '#FFD6A5' },
      { time: '11:00-12:00', subject: 'PH101', faculty: 'Dr. Williams', room: 'L103', type: 'Lecture', color: '#FDFFB6' },
    ],
    Tuesday: [
      { time: '09:00-10:00', subject: 'CS101', faculty: 'Dr. Smith', room: 'L101', type: 'Lecture', color: '#FFADAD' },
      { time: '10:00-11:00', subject: 'MA101', faculty: 'Dr. Jones', room: 'L102', type: 'Lecture', color: '#FFD6A5' },
      { time: '11:00-11:00', subject: 'PH101', faculty: 'Dr. Williams', room: 'L103', type: 'Lecture', color: '#FDFFB6' },
    ],
    Wednesday: [
      { time: '09:00-10:00', subject: 'CS101', faculty: 'Dr. Smith', room: 'L101', type: 'Lecture', color: '#FFADAD' },
      { time: '10:00-11:00', subject: 'MA101', faculty: 'Dr. Jones', room: 'L102', type: 'Lecture', color: '#FFD6A5' },
      { time: '11:00-12:00', subject: 'PH101', faculty: 'Dr. Williams', room: 'L103', type: 'Lecture', color: '#FDFFB6' },
    ],
    Thursday: [
      { time: '09:00-10:00', subject: 'CS101', faculty: 'Dr. Smith', room: 'L101', type: 'Lecture', color: '#FFADAD' },
      { time: '10:00-11:00', subject: 'MA101', faculty: 'Dr. Jones', room: 'L102', type: 'Lecture', color: '#FFD6A5' },
      { time: '11:00-12:00', subject: 'PH101', faculty: 'Dr. Williams', room: 'L103', type: 'Lecture', color: '#FDFFB6' },
    ],
    Friday: [
      { time: '09:00-10:00', subject: 'CS101', faculty: 'Dr. Smith', room: 'L101', type: 'Lecture', color: '#FFADAD' },
      { time: '10:00-11:00', subject: 'MA101', faculty: 'Dr. Jones', room: 'L102', type: 'Lecture', color: '#FFD6A5' },
      { time: '11:00-12:00', subject: 'PH101', faculty: 'Dr. Williams', room: 'L103', type: 'Lecture', color: '#FDFFB6' },
    ],
    Saturday: [],
  },
  '2': { // Semester 2
    Monday: [
      { time: '09:00-10:00', subject: 'CS102', faculty: 'Dr. Brown', room: 'L201', type: 'Lecture', color: '#CAFFBF' },
      { time: '10:00-11:00', subject: 'MA102', faculty: 'Dr. Green', room: 'L202', type: 'Lecture', color: '#BDB2FF' },
      { time: '11:00-12:00', subject: 'EC101', faculty: 'Dr. White', room: 'L203', type: 'Lecture', color: '#A0C4FF' },
    ],
    Tuesday: [
      { time: '09:00-10:00', subject: 'CS102', faculty: 'Dr. Brown', room: 'L201', type: 'Lecture', color: '#CAFFBF' },
      { time: '10:00-11:00', subject: 'MA102', faculty: 'Dr. Green', room: 'L202', type: 'Lecture', color: '#BDB2FF' },
      { time: '11:00-12:00', subject: 'EC101', faculty: 'Dr. White', room: 'L203', type: 'Lecture', color: '#A0C4FF' },
    ],
    Wednesday: [
      { time: '09:00-10:00', subject: 'CS102', faculty: 'Dr. Brown', room: 'L201', type: 'Lecture', color: '#CAFFBF' },
      { time: '10:00-11:00', subject: 'MA102', faculty: 'Dr. Green', room: 'L202', type: 'Lecture', color: '#BDB2FF' },
      { time: '11:00-12:00', subject: 'EC101', faculty: 'Dr. White', room: 'L203', type: 'Lecture', color: '#A0C4FF' },
    ],
    Thursday: [
      { time: '09:00-10:00', subject: 'CS102', faculty: 'Dr. Brown', room: 'L201', type: 'Lecture', color: '#CAFFBF' },
      { time: '10:00-11:00', subject: 'MA102', faculty: 'Dr. Green', room: 'L202', type: 'Lecture', color: '#BDB2FF' },
      { time: '11:00-12:00', subject: 'EC101', faculty: 'Dr. White', room: 'L203', type: 'Lecture', color: '#A0C4FF' },
    ],
    Friday: [
      { time: '09:00-10:00', subject: 'CS102', faculty: 'Dr. Brown', room: 'L201', type: 'Lecture', color: '#CAFFBF' },
      { time: '10:00-11:00', subject: 'MA102', faculty: 'Dr. Green', room: 'L202', type: 'Lecture', color: '#BDB2FF' },
      { time: '11:00-12:00', subject: 'EC101', faculty: 'Dr. White', room: 'L203', type: 'Lecture', color: '#A0C4FF' },
    ],
    Saturday: [],
  },
};

export const overallAttendance = 85;

export const subjectAttendance = [
  { subject: 'Introduction to Programming', attendedClasses: 30, totalClasses: 40, percentage: 75, status: 'Safe' },
  { subject: 'Data Structures and Algorithms', attendedClasses: 24, totalClasses: 40, percentage: 60, status: 'Risk' },
  { subject: 'Database Management Systems', attendedClasses: 18, totalClasses: 40, percentage: 45, status: 'Critical' },
  { subject: 'Operating Systems', attendedClasses: 12, totalClasses: 40, percentage: 30, status: 'Critical' },
];

export const attendance = [
  { month: 'Jan', percentage: 90 },
  { month: 'Feb', percentage: 85 },
  { month: 'Mar', percentage: 88 },
  { month: 'Apr', percentage: 92 },
  { month: 'May', percentage: 80 },
  { month: 'Jun', percentage: 78 },
];

export const profileCompletion = 80;

export const quickStats = {
  cgpa: 8.8,
  attendance: 85,
  pendingFees: 5000,
  upcomingExams: 2,
};

export const todaysTimetable = [
  { time: '09:00-10:00', subject: 'CS101', faculty: 'Dr. Smith', room: 'L101', type: 'Lecture' },
  { time: '10:00-11:00', subject: 'MA101', faculty: 'Dr. Jones', room: 'L102', type: 'Lecture' },
  { time: '11:00-12:00', subject: 'PH101', faculty: 'Dr. Williams', room: 'L103', type: 'Lecture' },
];


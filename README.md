DupCode is a plagiarism detection system designed specifically for programming assignments submitted by students in educational institutions. Its primary purpose is to assist instructors in assessing code submissions while detecting instances of plagiarism or unauthorized code similarity. 

The main functionalities of the system are:
**Profile Management**: The users will be able to manage their profile. They can edit, update and delete their accounts.
**Admin Portal:** The admin will be able to create, delete and update the information of users.
**Automatic Plagiarism Detection:** System will carry out the plagiarism detection of the submitted assignment automatically. The teacher can disable this feature from their portal. 
**Code Snippets Exclusion:** They system will exclude the allowed code which could be legitimate to copy from plagiarism checking and will provide accurate results.
**Pattern Matching:** The plagiarism detection algorithm used will be able to detect the pattern of the code and will detect if the code has been modified by changing the identifiers names.
**Assignment Management**: DupCode integrates the Assignment submission system along with plagiarism detection to provide both the facilities at one place.

** Modules**
	(Module 1): Admin Portal
The admin Portal will provide the centralized interface for managing the Code Plagiarism System. Admin can manage the user accounts, access control and system settings. 

FE-1: Admin Sign In
FE-2: Change Password
FE-2: Forget Password
FE-3: Manage students, classes, and teachers.
FE-4: Update Information
FE-5: Register student to class.
FE-6: Assign class to teacher.
FE-7: View Analytics

	(Module 2): Profiling Management
This module focuses on account management of Teachers and Students. Teachers can login to their portal and perform their allowed tasks while students can access their own portal.
FE-1: Users Registration.
FE-2: Generate Unique ID.
FE-3: Generate Captcha.
FE-4: Forget Password
FE-5: Students and Teachers can Sign In.
FE-6: Change Password
FE-7: View Profile.
FE-8: Change their profile info.
FE-9: Sign Out.


	(Module 3): Instructors Portal
This module allows the instructors to create classrooms and add students to it. Instructors can create and manage assignments.

FE-1: View Classes.
FE-2: Add assignments. 
FE-3: Edit assignments.
FE-4: Delete assignments.
FE-5: Initiate Plagiarism Checking
FE-6: Create Plagiarism Checking Configuration
FE-7: Perform Side-By-Side Comparison
FE-8: Get Plagiarism Report
FE-8: Manage Profile

	(Module 4): Student Portal
This module will provide an interface for the students to do their activities. It includes:
FE-1: View Classes.
FE-2: View Assignments.
FE-3: Attach files to assignment.
FE-4: Submit Assignment.
FE-5: View Assignment plagiarism Report.
FE-6: View profile.

	(Module 5): Report Management Module
This module handles plagiarism reports and stores and organizes the reports.

FE-1: Reports.
FE-2: Generate Report for Student.
FE-3: Generate Report of all Submitted assignments by students for teacher.
FE-4: Show Report.
FE-4: Draw Result Chart.
FE-5: Export Report.

	(Module 6): Plagiarism Detection Module
This module manages computational tasks and conducts analysis on uploaded files to prepare source code for comparison.
FE-1: Extracts and parses the uploaded code.
FE-2: Analyze syntax and structure.
FE-3: Compare similarity.
FE-4: Identifies patterns using pattern matching techniques.
FE-5: Stores analysis results in the database.
FE-6: Excludes specified code from matching based on the exclusion list.
FE-7: Generates and provides a plagiarism report.

(Module 7): Assignment Management Module
This module lists all assignments and enables teachers to create, modify, and oversee programming tasks.

FE-1: Allows assignment creation for specified classrooms and courses.
FE-2: Permits editing assignments and managing their deadlines.
FE-3: Facilitates student assignment uploads.
FE-4: Automatically saves assignments in the database.
FE-5: Enables automatic plagiarism checks for assignments.

(Module 8): Plagiarism Configuration Module

This module acts as a tool for parameter selection during code comparison, allowing teachers to set specific rules and parameters as per assignment requirements and student proficiency.

FE-1: Enables the selection of various plagiarism detection algorithms.
FE-2: Provides language selection options.
FE-3: Allows setting similarity thresholds.
FE-4: Defines code exemptions.
FE-5: Sets code filters or rules to exclude specific libraries or template codes.
FE-6: Saves configurations in the database for future use.

**Installation Guide: **

1.	Download Node JS
2.	Install the Nodejs in your machine.
3.	Download PostgreSQL database engine and install it.
4.	Configure and set up the database engine.
5.	Clone this repository: https://github.com/hexakaleem/dup-code
6.	Go to the main directory where the packages.json is present
7.	Change variables in .env file.
8.	Open command line and run:
npm install
This will install all the modules required by the software
9.	To setup database: run
	adonis migration:run
10.	To register admin run:
	node ace make:admin
11.	To start the server run:
node ace serve --watch

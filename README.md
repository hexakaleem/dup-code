# DupCode - Code Plagiarism Detection System

## Introduction

DupCode is a comprehensive plagiarism detection system tailored for programming assignments submitted by students in educational institutions. Its main goal is to support instructors in evaluating code submissions by detecting instances of plagiarism or unauthorized code similarity. The system comes equipped with a range of features to streamline the process of code assessment and enhance the overall integrity of academic assignments.

## Features

### 1. Profile Management

- **User Registration:** Users can easily register and manage their accounts.
- **Profile Editing:** Users can edit, update, and delete their profiles.
- **Password Management:** Change and reset password functionalities.
- **Role Management:** Admins can manage students, classes, and teachers.
- **Analytics:** Admins can view analytics for system usage and performance.

### 2. Admin Portal

- **Sign In:** Admins can securely sign in to the central portal.
- **Change Password:** Admins can update their passwords.
- **Forget Password:** Password recovery functionality.
- **User Management:** Admins can manage students, classes, and teachers.
- **Analytics:** View system analytics and usage.

### 3. Profiling Management

- **User Registration:** Teachers and students can register.
- **Unique ID Generation:** System generates unique IDs for users.
- **Captcha Generation:** Ensures secure user registration.
- **Profile Viewing and Editing:** Users can view and edit their profiles.
- **Sign Out:** Users can securely sign out.

### 4. Instructors Portal

- **Class Management:** Instructors can view and manage classes.
- **Assignment Management:** Create, edit, and delete assignments.
- **Plagiarism Checking:** Initiate plagiarism checking and view reports.
- **Profile Management:** Instructors can manage their profiles.

### 5. Student Portal

- **Class and Assignment Viewing:** Students can view classes and assignments.
- **File Attachment:** Attach files to assignments.
- **Assignment Submission:** Submit assignments securely.
- **Plagiarism Report Viewing:** View plagiarism reports for submitted assignments.
- **Profile Management:** Students can view and manage their profiles.

### 6. Report Management

- **Report Generation:** Generate plagiarism reports for students and teachers.
- **Result Chart:** Visual representation of plagiarism detection results.
- **Export Reports:** Export reports for further analysis.

### 7. Plagiarism Detection Module

- **Code Analysis:** Extracts, parses, and analyzes uploaded code.
- **Syntax and Structure Analysis:** Examines code syntax and structure.
- **Similarity Comparison:** Compares code similarity using various algorithms.
- **Pattern Matching:** Identifies patterns using advanced pattern matching techniques.
- **Result Storage:** Stores analysis results in the database.
- **Code Exclusion:** Excludes specified code from matching based on the exclusion list.
- **Plagiarism Report Generation:** Generates and provides detailed plagiarism reports.

### 8. Assignment Management Module

- **Assignment Creation:** Allows teachers to create assignments for specific classes and courses.
- **Deadline Management:** Permits editing assignments and managing their deadlines.
- **Student Uploads:** Facilitates student assignment uploads.
- **Automatic Plagiarism Checks:** Enables automatic plagiarism checks for assignments.

### 9. Plagiarism Configuration Module

- **Algorithm Selection:** Enables the selection of various plagiarism detection algorithms.
- **Language Options:** Provides language selection options.
- **Similarity Thresholds:** Allows setting similarity thresholds.
- **Code Exemptions:** Defines code exemptions for legitimate code.
- **Code Filters:** Sets code filters or rules to exclude specific libraries or template codes.
- **Configuration Saving:** Saves configurations in the database for future use.

## Installation Guide

1. Download and install Node JS.
2. Download and install PostgreSQL database engine.
3. Configure and set up the database engine.
4. Clone the repository: [DupCode Repository](https://github.com/hexakaleem/dup-code).
5. Navigate to the main directory with packages.json.
6. Change variables in the .env file.
7. Open the command line and run: `npm install` to install required modules.
8. Set up the database by running: `adonis migration:run`.
9. Register admin by running: `node ace make:admin`.
10. Start the server with: `node ace serve --watch`.

Ensure that the necessary dependencies and configurations are in place before running the system.

## Contributors

- Hexa Kaleem 

## License

This project is licensed under the [MIT License](LICENSE.md).

Feel free to contribute and make DupCode even better!

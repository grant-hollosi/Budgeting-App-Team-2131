# Budgeting-App-Team-2131
Jacob Porter |
Mathiew Tackitt |
Vinhky Nguyen |
Luis Bowen |
Grant Hollosi |
Sidarth Rajan
# Status of Funds App
- Problem: The leadership of the 75th Army Ranger Regiment do not have full access to GFEBS, a database that serves to keep track of their transaction history and budget. 
- Solution: An iOS app that allows those without access to GFEBS to view, but not modify, the transaction history, budget, and their various graphs of the 75th Army Ranger Regiment.
- App Info: The app will permit the user to view the Regiment’s financial data and history from the convenience of their smartphone. The user groups are those who can view the data, and those who can view and upload more data. <br /><br />
[Licensed under the Apache License](https://github.com/grant-hollosi/Budgeting-App-Team-2131/blob/master/LICENSE)
# Release Notes
## Version 0.5.0
### New Features
- Additional filter for 'Commodity'
- Users can select what graph type to display, and what category to group data by
- Users can now view and toggle flag status of fund from 'Fund Details' page
- The home page is now populated with 100 items per page
- Admins can change account passwords and upload data via the application
### Bug Fixes
- Data loads properly after scrolling on home screen and applying filters or sorts
### Known Problems
- The app is not very generalized. For communication with a database, it requires the database to be named specifically, among other things
## Version 0.4.0
### New Features
- Changed to a serverless approach to pull data from the database
- There is now a graphs page that holds appropriate charts depending on the data
- The home page is now populated with 50 items per page
- The fund details page displays the specific item's data if navigated to from the home page
- There is some more documentation in the settings page
- The login system is now based on a salt and hash system
- Admin users now have the capability to change passwords
### Bug Fixes
- The settings page is displayed correctly now even if not on the home screen
### Known Problems
- We do not have a way to upload to the database through the app yet
## Version 0.3.0
### New Features
- Back End Server is created and it has functionality to make signed requests to upload to the S3 bucket.
### Bug Fixes
- "Unauthorized access" modal that appears when trying to access the admin dashboard will take you back to the home screen if you are logged in as an appropriate user
### Known Problems
- Currently, the displayed list of transactions are hard coded into the app. In the future, we plan to try to implement some form of backend and frontend communication
- The settings page will not display after leaving and returning to the home page
## Version 0.2.0
### New Features
- Admin Dashboard page that is only accessable as an admin, with "change password" and "upload data" buttons
- Upload data screen that will in the future allow admins to upload a csv file
- Settings page that allows the user to log out, and will allow the user to view the liscence, view a help page, as well as change some other settings
- Ui feedback for an incorrect password entered
### Bug Fixes
- Users who refresh/exit the app will no longer be denied access as log as they originally logged in
- Upload page can now be accessed from the admin dashboard
### Known Problems
- "Unauthorized access" modal after clicking on admin dashboard as a regular user takes you back to the log in screen instead of the home screen
## Version 0.1.0
### New Features
- Login system with security features such as admin/user roles and guard against unregulated access to pages
- Implementation of the home screen and the ability to navigate to the different pages that connect to it
### Bug Fixes 
### Known Problems 
- The logins are currently hard coded into the app. We would need to establish a database going into sprint 2 to continue further developments
- No way to access the upload page
- Users who refresh the page will lose access to the screens past the login screen as they are immediately logged out

# Installation Guide
## Pre-Requisites
## Necessary Libraries
## Download Instructions
## Build Instructions
## Installation

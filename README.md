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

## Prerequisites

* In order to install this app, the following criteria must be met: 

* You must have a macOS device (e.g. MacBook or Mac desktop) 

* XCode must be installed onto the Mac device 

* To do this, you can go to the [App Store on your device and download the XCode app](https://apps.apple.com/us/app/xcode/id497799835?mt=12) 

* You must have an iPhone with the necessary cables to connect the iPhone to the Mac device 

* You need an Apple ID 

* You must have the application code downloaded from GitHub to your device 

> * To do this, you can go to the [GitHub repository here,](https://github.com/grant-hollosi/Budgeting-App-Team-2131) click on the green button that says code, click download zip, and then open the zip in the location of your choice (It is suggested not to have the folder “Budgeting-App-Team-2131-master” located in an iCloud synced place such as Desktop or Documents, else you may run into long wait times for some of the installation).

<img width="1440" alt="Screen Shot 2022-12-06 at 1 28 43 PM" src="https://user-images.githubusercontent.com/55679464/206074812-a572bfba-8af7-444b-b184-a3cf3c82b3a8.png">

<img width="1440" alt="Screen Shot 2022-12-06 at 1 29 24 PM" src="https://user-images.githubusercontent.com/55679464/206074837-99bae819-faae-4a43-997c-df6fc785db20.png">

<img width="1032" alt="Screen Shot 2022-12-06 at 1 29 59 PM" src="https://user-images.githubusercontent.com/55679464/206074877-b6775dd0-903e-471f-8a81-496f9b7e3ea1.png">

## Necessary Libraries

* Before beginning anything else, one thing that needs to be installed is node.js 

> * To do this, [go to their website here](https://nodejs.org/en/) and download the version that says LTS 

> * Once downloaded, run the installer and follow the step that it gives. Once done, you may need to restart your machine for everything to function properly.

<img width="1440" alt="Screen Shot 2022-12-06 at 1 36 03 PM" src="https://user-images.githubusercontent.com/55679464/206075099-cbd6008f-77fe-4751-83c4-20d0617d123a.png">

* It is necessary to install Homebrew. Search for the Terminal app on the Mac device and type in the command: 

> * /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" 

<img width="917" alt="Screen Shot 2022-12-06 at 9 31 02 PM" src="https://user-images.githubusercontent.com/55679464/206075303-005ffa7f-6aa2-46ba-ab0d-570a88091cde.png">

<img width="1158" alt="Screen Shot 2022-12-06 at 9 45 57 PM" src="https://user-images.githubusercontent.com/55679464/206075365-9b2b458f-f536-42a8-a18f-fe6f117a13df.png">

* From this, install cocoapods. In the terminal, type in the command: 

> * brew install cocoapods 

* If, at any point, it asks for the admin password, type it in. If there is a problem with typing in the password, contact your IT administrator for help. 

## Installation

1. The first step towards installation of the app requires opening the Terminal and going to the directory (file) of the app downloaded from GitHub. To begin, go to the search bar and open the Terminal app.  

2. In the finder, open the folder labeled “Budgeting-App-Team-2131-master” and right click on the folder in it labeled “Status-Of-Funds-App”. Hold down the option button on your keyboard and then select the choice: Copy “Status-Of-Funds-App" as Pathname. This will copy the full path of the file in your computer. 

<img width="917" alt="Screen Shot 2022-12-06 at 2 23 12 PM" src="https://user-images.githubusercontent.com/55679464/206075548-84bbf585-0c24-4259-a64c-d32a04c5b543.png">

3. Now, back to the terminal, type in the command “cd [pathname you copied]”.  It should look something like this: 

<img width="974" alt="Screen Shot 2022-12-06 at 2 30 31 PM" src="https://user-images.githubusercontent.com/55679464/206075609-e3b5c532-8083-459e-b8c3-587abdb63318.png">

4. Press enter. You should now be in the correct directory of the project code. To confirm this, type in the command “ls” in the terminal (lowercase L then s). 

<img width="1018" alt="Screen Shot 2022-12-06 at 2 32 02 PM" src="https://user-images.githubusercontent.com/55679464/206075695-43b36c47-63c2-4a7c-9082-18641418a93d.png">

5. Next, run the command “npm i”. This should install all the necessary packages that are part of the application. If an error appears that asks to run the command “npm audit fix”, then do so accordingly. 

6. The next step is to compile the app for XCode. To do this, run these commands in the order that they appear: 

> rm -r "./www" 

> rm -r "./ios" 

> ionic build 

> npx cap add ios 

> npx cap open ios

7. This process may take a few minutes. 

8. A screen should appear that looks like the one pictured below. This is the XCode application. 

<img width="1512" alt="Screen Shot 2022-12-06 at 6 21 48 PM" src="https://user-images.githubusercontent.com/55679464/206075863-603fc285-5fbf-4c9e-93a3-f31be02e4448.png">

9. Click on the “App” segment on the left-hand side. A new screen should appear:

<img width="1512" alt="Screen Shot 2022-12-06 at 6 34 37 PM" src="https://user-images.githubusercontent.com/55679464/206075919-70d5dbdc-67ce-488a-bdc3-0b51ebbcce9e.png">

10. Click on the tab labeled “Signing & Capabilities”, then click on the button labeled “Add Account...” Sign in with an Apple ID in order to add an account for deploying the app. Now, set the team to be the account that was just signed in with instead of “None”.

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/55679464/206077534-a3dc7b99-da3e-4bab-89c6-fdf2861a570b.png">

11. If an error appears with the message saying “There are no devices registered in your account on the developer website”, it is now time to plug in an iPhone device. 

12. Once plugged in, head to the top of the page and click on “Window”, then select the option “Devices and Simulators”. If a message appears saying that the iPhone is not paired with the computer, simply go to the iPhone and select Trust when a prompt appears to trust the computer. Wait a few minutes for XCode to install debugger support to the phone.

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/55679464/206076566-a6255cdd-e39f-44c4-9afd-4e34bcc69820.png">

13. Now, in the part labeled “Bundle Identifier”, type in a unique string for the application. An example can be “Status-Of-Funds-App" (If that does not work, try changing the string to something else). 

<img width="1440" alt="Screen Shot 2022-12-06 at 6 58 56 PM" src="https://user-images.githubusercontent.com/55679464/206076668-6e350f89-47cc-4b22-b3a9-fde94f6761b3.png">

14. After this, click on the devices next to the part labeled “App” on the top (From the screenshot, click on the part where “iPhone 14 Pro” is present). Then select the iOS device that will have the app downloaded to it.   

<img width="1440" alt="Screen Shot 2022-12-06 at 6 55 53 PM" src="https://user-images.githubusercontent.com/55679464/206076719-9a7e80dc-072c-4b40-96ef-699bd2b9f9b4.png">

15. Now it is time to click the run button in order to install the app to the phone. 

<img width="917" alt="Screen Shot 2022-12-06 at 7 14 47 PM" src="https://user-images.githubusercontent.com/55679464/206077827-e00df56f-c204-44fc-b7cf-6829effd293a.png">

16. Note, on the iPhone it may be necessary to enable developer mode. It is not possible to install the app without this setting enabled. To enable this on an iPhone, go to Settings > Privacy & Security and at the very bottom of the page a Developer Mode tab should be there. Open that and then select to enable it. 

17. A prompt on the Mac device may show up multiple times that looks like this the screen below. Just keep typing in the Mac device password in order to continue. 

<img width="502" alt="Screen Shot 2022-12-06 at 7 05 54 PM" src="https://user-images.githubusercontent.com/55679464/206076913-59e294ab-7c36-4ab8-b729-fd9f7b7f53ec.png">

## Conclusion

* The app should now be installed on the iPhone. Note, it is not necessary to do this whole process for every iPhone. Just begin from the step where the original iPhone was first plugged in. 

* If any problems arise, please send an email to [jporter74@gatech.edu](mailto:jporter74@gatech.edu) in order to troubleshoot.

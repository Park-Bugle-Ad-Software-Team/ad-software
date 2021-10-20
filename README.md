
(View Raw will give you the markdown that you can copy to your repos!)


![MIT LICENSE](https://img.shields.io/github/license/scottbromander/the_marketplace.svg?style=flat-square)
![REPO SIZE](https://img.shields.io/github/repo-size/scottbromander/the_marketplace.svg?style=flat-square)
![TOP_LANGUAGE](https://img.shields.io/github/languages/top/scottbromander/the_marketplace.svg?style=flat-square)
![FORKS](https://img.shields.io/github/forks/scottbromander/the_marketplace.svg?style=social)

# Park Bugle Ad Portal

## Project

_Duration: 2 Week Sprint_

Park Bugle wanted an application that would house all of the information about their advertisement contracts, from the ad image to the discussion surrounding the details of the app. Our project allows Park Bugle to invite new users, create and update contracts via a form, chat about each contract, display relevant contracts to each employee, and export .csv reports. 

To see the fully functional site, please visit: [DEPLOYED VERSION OF APP](www.heroku.com)

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [AWS Account](https://aws.amazon.com/)
- [Heroku Account](https://signup.heroku.com/)
- Email account

## Installation
1. Create a database named `park_bugle`,
2. The queries in the `database.inserts.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries, 
3. Download and install [Node.js](https://nodejs.org/en/download/)
4. Open up your editor of choice and run an `npm install`
5. To run the project locally:
	1. Create an .env file at the root of the project directory
	2.  Set the following variables:
		* SERVER_SESSION_SECRET
		* EMAIL
		* EMAIL_PASSWORD
		* AWS_ACCESS_KEY_ID
		* AWS_SECRET_ACCESS_KEY
		* AWS_S3_BUCKET
		* AWS_S3_REGION 
6. To run the project on Heroku
	* Set up a [node environment](https://devcenter.heroku.com/articles/deploying-nodejs)
	* Push the project to Heroku
	* In your project's settings click on Reveal Config Vars
	* Set the same variables as in step 5.2 
7. Run `npm run server` in your terminal
8. Run `npm run client` in your terminal
9. The `npm run client` command will open up a new browser tab for you!

# Usage

The Park Bugle Ad Portal application consists of the following page-views:

User Creation
Set Password
Login
Contracts 
Export
Ad Card
Pricing 
List of Users

## User Creation
<a href="https://imgur.com/0R7jIW7"><img src="https://i.imgur.com/0R7jIW7.png" title="source: imgur.com" /></a>

Admins are the only user types that have access to this screen. They will get here by clicking on the Users button in the Nav Bar. From the Users Page, they will click on the Invite User button to be brought to this screen.
When creating users that are Park Bugle employees, only the top three (Name, Email, and Privilege) should be inputted. When contracts are displayed, the company information comes from the advertiser linked to that contract, so only the advertiser users should have an associated company.
When the Send Invite button is pressed, the special link will automatically be sent to that email entered at the top.

## Set Password

<a href="https://imgur.com/jzEPl4T"><img src="https://i.imgur.com/jzEPl4T.png" title="source: imgur.com" /></a>
<a href="https://imgur.com/mdMNehM"><img src="https://i.imgur.com/mdMNehM.png" title="source: imgur.com" /></a>

The user is directed to the set password page with fields to establish the password and confirm it. They will be brought to the login page after successfully creating a password.

## Login Page

<a href="https://imgur.com/mESTRai"><img src="https://i.imgur.com/mESTRai.png" title="source: imgur.com" /></a>

After the user is created and password is set, the user will be taken to the Login page. That user can enter their email address and password, and submit by clicking the Log In button.
If the email address and password are correct, the user will be taken to their respective profile page.
If the user tries to submit without completing a required field, an error message pop-up will appear with instructions to complete all fields.
If the user enters the incorrect email address or password, an error message pop-up will appear informing them to try again.

If the user is not registered, they will need to have an account created for them by a Park Bugle admin, and use the email link they receive to create their password. That user will then be able to log in.

## Contracts Page

<a href="https://imgur.com/s8I8QDo"><img src="https://i.imgur.com/s8I8QDo.png" title="source: imgur.com" /></a>

Once the user is logged in they will see a table list of pending contracts, a table list of active contracts, and table list of closed contracts.  Pending contracts are those which have been submitted but are not yet approved; active contracts are those which have received approval and where the current month falls between the starting month and end of contract, and closed contracts are those which have expired.

## Export Page

<a href="https://imgur.com/i5Bx2Xe"><img src="https://i.imgur.com/i5Bx2Xe.png" title="source: imgur.com" /></a>
<a href="https://imgur.com/kh2Yxf2"><img src="https://i.imgur.com/kh2Yxf2.png" title="source: imgur.com" /></a>

In the export view, an admin can filter contracts according to the header categories.  The export button creates and downloads a CSV file with the formatted information.

## Ad Card

<a href="https://imgur.com/ewYLzd1"><img src="https://i.imgur.com/ewYLzd1.png" title="source: imgur.com" /></a>

Clicking the view button on a contract brings the user to a form with input fields for the different components of the contract.
Select Advertiser 
Select Ad Rep 
Select Designer
Start Month
Contract Length
Ad Type
Columns/Inches
Image Upload
Image Bank
Color Type
Notes
Commission Percentage
Final Adjusted Bill

The Select Size cards detail the available sizing options for ads.  An admin or ad representative may edit any of the available fields, then click the Save button to save the changes.   Clicking the approve box removes the contract from the “pending” table on the contracts page and re-routes it into the “active” table.  An advertiser may only upload an image to the image uploader. 

## Users Page

<a href="https://imgur.com/0gXxFya"><img src="https://i.imgur.com/0gXxFya.png" title="source: imgur.com" /></a>

This page shows a list view of all users and is updated when a new user is created.  Admins can edit the user’s type.  The Invite New User button leads to the account creation page.

## Edit Pricing View

An Admin will be able to alter the rates for each contract length. Once these updates are saved, all future contract rates will be auto-calculated in the contract view. 

<a href="https://imgur.com/DaHAzaw"><img src="https://i.imgur.com/DaHAzaw.png" title="source: imgur.com" /></a>

### Pending Contracts
Once the user is logged in they will see a table list of pending contracts, a table list of active contracts, and table list of closed contracts.  Pending contracts are those which have been submitted but are not yet approved; active contracts are those which have received approval and where the current month falls between the starting month and end of contract, and closed contracts are those which have expired.

For all non-admin users, the tables will be pre-filtered to show only contracts the logged in user is associated with.
Clicking any of the column headers will sort the information by that
The View button will bring the user to the Ad Card for that specific contract.
The Chat button will open a side panel to the right where all the prior messages will be shown. Users can type a new message into the chat and hit enter to send it.
The Export button will be available for all non-advertiser users. Clicking on it will bring the user to the Export view page.
The Create Contract button will be available for all non-advertiser users. Clicking on it will bring the user to the Ad Card page with no pre-filled information in it.

### Create Contract View

Clicking on the "Create Contract" button brings the user to a page which allows them to fill out necessary information for a contract. Not all the fields need to be filled out immediately, but in order for advertisers or other employees to view the contract their names must be selected from the dropdowns on the top left side of the form. 

<a href="https://imgur.com/ewYLzd1"><img src="https://i.imgur.com/ewYLzd1.png" title="source: imgur.com" /></a>

## Image Upload and Image Bank

<a href="https://imgur.com/fvvrDzP"><img src="https://i.imgur.com/fvvrDzP.png" title="source: imgur.com" /></a>

Users can drag an image or upload it from their computer. Once uploaded it will be displayed in a small portion of the image bank. Clicking on the image will open that image in a new window or tab depending on the user's browser.

## Chat
<a href="https://imgur.com/JDgkWaa"><img src="https://i.imgur.com/JDgkWaa.png" title="source: imgur.com" /></a>

Clicking on the chat button on the home page view of a contract will open a drawer on the right side of the screen. A chat can be entered and will be saved. All users associated with a contract, and any admins can communicate via the chat feature.


## Built With

* Javascript
* React
* Redux
* Redux-Saga
* Material UI
* Html
* CSS
* Axios
* dotenv
* Passport-Auth
* Node.js
* Express
* Nodemailer
* AWS-S3
* PostgreSQL

## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped us to make this application a reality. (Thank your people)

## Support
If you have suggestions or issues, please email me at [youremail@whatever.com](www.google.com)

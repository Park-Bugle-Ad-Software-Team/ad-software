
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

## Screen Shot

Include one or two screen shots of your project here (optional). Remove if unused.

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

## Usage
How does someone use this application? Tell a user story here.

1. 

## Admin Home Page

Users logged in with the authLevel of Admin will have a slightly different navigation bar. They have access to add new users and update the pricing schema. They are able to see all contracts that exist in the system on their home page as well sectioned out into Pending, Active, and Closed  contracts.

<a href="https://imgur.com/s8I8QDo"><img src="https://i.imgur.com/s8I8QDo.png" title="source: imgur.com" /></a>

## Pending Contracts
Explanation

## Active Contracts
Explanation

## Closed Contracts
Explanation

## Create Contract View

Clicking on the "Create Contract" button brings the user to a page which allows them to fill out necessary information for a contract. Not all the fields need to be filled out immediately, but in order for advertisers or other employees to view the contract their names must be selected from the dropdowns on the top left side of the form. 

<a href="https://imgur.com/ewYLzd1"><img src="https://i.imgur.com/ewYLzd1.png" title="source: imgur.com" /></a>

## Edit Pricing View

An Admin will be able to alter the rates for each contract length. Once these updates are saved, all future contract rates will be auto-calculated in the contract view. 

<a href="https://imgur.com/DaHAzaw"><img src="https://i.imgur.com/DaHAzaw.png" title="source: imgur.com" /></a>

## Users View
A list of all active users will be shown displaying their email and name Fields. Clicking the edit button or clicking on the list component will bring you to the Edit User Page.

<a href="https://imgur.com/0gXxFya"><img src="https://i.imgur.com/0gXxFya.png" title="source: imgur.com" /></a>

## Invite User View
All fields are editable on this view. When the privelege level is selcted as advertiser, two switches will populate for assigning whether they accept Ach Payments and their communication preferences.

<a href="https://imgur.com/0R7jIW7"><img src="https://i.imgur.com/0R7jIW7.png" title="source: imgur.com" /></a>

<a href="https://imgur.com/6PzktmZ"><img src="https://i.imgur.com/6PzktmZ.png" title="source: imgur.com" /></a>

## Edit User View
See Invite user view.

## Email Invite
<a href="https://imgur.com/jzEPl4T"><img src="https://i.imgur.com/jzEPl4T.png" title="source: imgur.com" /></a>

<a href="https://imgur.com/PKuifQk"><img src="https://i.imgur.com/PKuifQk.png" title="source: imgur.com" /></a>

<a href="https://imgur.com/mdMNehM"><img src="https://i.imgur.com/mdMNehM.png" title="source: imgur.com" /></a>

## Export CSV
<a href="https://imgur.com/33w5jLp"><img src="https://i.imgur.com/33w5jLp.png" title="source: imgur.com" /></a>
<a href="https://imgur.com/ChKOCuT"><img src="https://i.imgur.com/ChKOCuT.png" title="source: imgur.com" /></a>


## Image Upload and Image Bank

<a href="https://imgur.com/fvvrDzP"><img src="https://i.imgur.com/fvvrDzP.png" title="source: imgur.com" /></a>

## Chat
<a href="https://imgur.com/JDgkWaa"><img src="https://i.imgur.com/JDgkWaa.png" title="source: imgur.com" /></a>


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

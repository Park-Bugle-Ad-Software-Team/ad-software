
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
	6. Create an .env file at the root of the project directory
	7.  Set the following variables:
		8. SERVER_SESSION_SECRET
		9. EMAIL
		10. EMAIL_PASSWORD
		11. AWS_ACCESS_KEY_ID
		12. AWS_SECRET_ACCESS_KEY
		13. AWS_S3_BUCKET
		14. AWS_S3_REGION 
6. To run the project on Heroku
	7. Set up a [node environment](https://devcenter.heroku.com/articles/deploying-nodejs)
	8. Push the project to Heroku
	9. In your project's settings click on Reveal Config Vars
	10. Set the same variables as in step 5. 
7. Run `npm run server` in your terminal
8. Run `npm run client` in your terminal
9. The `npm run client` command will open up a new browser tab for you!

## Usage
How does someone use this application? Tell a user story here.

1. xxx
2. xxx
3. xxx
4. xxx
5. xxx
6. xxx

## Login

All users will be brought to the same login screen after account creation. Users will be able to login using their email and password. 
<a href="https://imgur.com/mESTRai"><img src="https://i.imgur.com/mESTRai.png" title="source: imgur.com" /></a>
## Admin Home Page

Users logged in with the authLevel of Admin will have a slightly different navigation bar. They have access to add new users and update the pricing schema. They are able to see all contracts that exist in the system on their home page as well sectioned out into Pending, Active, and Closed  contracts.

<a href="https://imgur.com/s8I8QDo"><img src="https://i.imgur.com/s8I8QDo.png" title="source: imgur.com" /></a>

## Create Contract View

Clicking on the "Create Contract" button brings the user to a page which allows them to fill out necessary information for a contract. Not all the fields need to be filled out immediately, but in order for advertisers or other employees to view the contract their names must be selected from the dropdowns on the top left side of the form. 

<a href="https://imgur.com/ewYLzd1"><img src="https://i.imgur.com/ewYLzd1.png" title="source: imgur.com" /></a>


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

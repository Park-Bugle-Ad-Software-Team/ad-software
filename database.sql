-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

----------- USERS -----------
CREATE TABLE "Users" (
   "id" serial PRIMARY KEY,
   "email" VARCHAR(255) NOT NULL,
   "phone" VARCHAR(50),
   "name" VARCHAR(255), -- should be NOT NULL in future
   "password" VARCHAR(255),
   "authLevel" VARCHAR(255) DEFAULT 'advertiser', -- should be NOT NULL in future
   "contactPreference" VARCHAR(255),
   "acceptAchPayment" BOOLEAN,
   "companyName" VARCHAR(255),
   "doNotDisturb" BOOLEAN,
   "isActive" BOOLEAN DEFAULT true,
   "advertiserUrl" VARCHAR(255),
   "address" VARCHAR(255),
   "primaryName" VARCHAR(255),
   "primaryTitle" VARCHAR(255),
   "primaryEmail" VARCHAR(255),
   "primaryDirectPhone" VARCHAR(50),
   "primaryMobilePhone" VARCHAR(50),
   "secondaryName" VARCHAR(255),
   "secondaryTitle" VARCHAR(255),
   "secondaryEmail" VARCHAR(255),
   "secondaryDirectPhone" VARCHAR(50),
   "secondaryMobilePhone" VARCHAR(50),
   "notes" VARCHAR(512),
   "inviteCode" VARCHAR(255)
);

INSERT INTO "Users" (
   "email",
   "phone",
   "name", -- should be NOT NULL in future
   "password",
   "authLevel", -- should be NOT NULL in future
   "contactPreference",
   "acceptAchPayment",
   "companyName",
   "doNotDisturb",
   "isActive",
   "advertiserUrl",
   "address",
   "primaryName",
   "primaryTitle",
   "primaryEmail",
   "primaryDirectPhone",
   "primaryMobilePhone",
   "secondaryName",
   "secondaryTitle",
   "secondaryEmail",
   "secondaryDirectPhone",
   "secondaryMobilePhone",
   "notes",
   "inviteCode"
)
VALUES 
   ----------- Admin account
   ('joshbecerra@parkbugle.com', -- email
   '612-524-0924', -- phone
   'Josh Becerra', -- name
   'Replace with a salted/hashed password',  --password
   'admin', -- authLevel
   'email', -- contactPreference
   false, -- acceptAchPayment
   NULL, -- companyName
   false, -- doNotDisturb
   true, -- isActive
   NULL, -- advertiserUrl
   NULL, -- address
   NULL, -- primaryName
   NULL, -- primaryTitle
   NULL, -- primaryEmail
   NULL, -- primaryDirectPhone
   NULL, -- primaryMobilePhone
   NULL, -- secondaryName
   NULL, -- secondaryTitle
   NULL, -- secondaryEmail
   NULL, -- secondaryDirectPhone
   NULL, -- secondaryMobilePhone
   NULL, -- notes
   NULL), -- inviteCode
   ----------- Ad Rep User
   ('sonia@parkbugle.com', -- email
   '612-524-0923', -- phone
   'Sonia', -- name
   'Replace with a salted/hashed password', -- password
   'ad rep', -- authLevel
   'email', -- contactPreference
   false, -- acceptAchPayment
   NULL, -- companyName
   false, -- doNotDisturb
   true, -- isActive
   NULL, -- advertiserUrl
   NULL, -- address
   NULL, -- primaryName
   NULL, -- primaryTitle
   NULL, -- primaryEmail
   NULL, -- primaryDirectPhone
   NULL, -- primaryMobilePhone
   NULL, -- secondaryName
   NULL, -- secondaryTitle
   NULL, -- secondaryEmail
   NULL, -- secondaryDirectPhone
   NULL, -- secondaryMobilePhone
   'Primary ad rep in charge of the south side of St. Anthony Park', -- notes
   'inviteCode'), -- inviteCode
   ----------- Print Designer
   ('kelly@parkbugle.com', -- email
   '612-524-0924', -- phone
   'Kelly Brooks', -- name
   'Replace with a salted/hashed password', -- password
   'designer', -- authLevel
   'phone', -- contactPreference
   false, -- acceptAchPayment
   NULL, -- companyName
   false, -- doNotDisturb
   true, -- isActive
   NULL, -- advertiserUrl
   NULL, -- address
   'Amy', -- primaryName
   'Print Designer', -- primaryTitle
   'amy@parkbugle.com', -- primaryEmail
   '612-343-3568', -- primaryDirectPhone
   '180-936-8365', -- primaryMobilePhone
   NULL, -- secondaryName
   NULL, -- secondaryTitle
   NULL, -- secondaryEmail
   NULL, -- secondaryDirectPhone
   NULL, -- secondaryMobilePhone
   'Primary print ad designer', -- notes
   'inviteCode'), -- inviteCode
   ----------- Web Designer
   ('mark@parkbugle.com', -- email
   '952-596-2835', -- phone
   'Mark Peter', -- name
   'Replace with a salted/hashed password', -- password
   'designer', -- authLevel
   'email', -- contactPreference
   false, -- acceptAchPayment
   NULL, -- companyName
   false, -- doNotDisturb
   true, -- isActive
   NULL, -- advertiserUrl
   NULL, -- address
   'Sonia', -- primaryName
   'Advertiser Representative', -- primaryTitle
   'arnold@parkbugle.com', -- primaryEmail
   '489-645-2389', -- primaryDirectPhone
   '333-444-2678', -- primaryMobilePhone
   NULL, -- secondaryName
   NULL, -- secondaryTitle
   NULL, -- secondaryEmail
   NULL, -- secondaryDirectPhone
   NULL, -- secondaryMobilePhone
   'Primary web ad designer', -- notes
   'inviteCode'), -- inviteCode
   ----------- Advertiser 1
   ('scotthanson@gmail.com', -- email
   NULL, -- phone
   'Scott Hanson', -- name
   'Replace with a salted/hashed password', -- password
   'advertiser', --authLevel
   'phone', -- contactPreference
   true, -- acceptAchPayment
   'Chroma Zone', -- companyName
   false, -- doNotDisturb
   true, -- isActive
   'chromazone.com', -- advertiserUrl
   '14252, 2334 University Ave W, St. Paul, MN 55114', -- address
   'Angela Casselton', -- primaryName
   'Executive Director', -- primaryTitle
   'angela@chromazone.com', -- primaryEmail
   '507-123-3298', -- primaryDirectPhone
   '333-444-6287', -- primaryMobilePhone
   'Renee Spillum', -- secondaryName
   'Board Chair', -- secondaryTitle
   'renee@chromazone.com', -- secondaryEmail
   '123-456-7890', -- secondaryDirectPhone
   '098-765-4321', -- secondaryMobilePhone
   'Please contact us when 2 months remain on any contract.', -- notes
   'inviteCode'), -- inviteCode
   ----------- Advertiser 2: Print
   ('courtneyfern@gmail.com', -- email
   NULL, -- phone
   'Courtney Fern',  -- name
   'Replace with a salted/hashed password', -- password
   'advertiser', -- authLevel
   'email', -- contactPreference
   true, -- acceptAchPayment
   'Parkway Pizza', -- companyName
   true, -- doNotDisturb
   true, -- isActive
   'parkwaypizza.com', -- advertiserUrl
   '1909 Lexington Ave North', -- address
   'Sam Janson', -- primaryName
   'CEO', -- primaryTitle
   'sam@parkwaypizza.com', -- primaryEmail
   '651-493-4360', -- primaryDirectPhone
   '612-788-1442', -- primaryMobilePhone
   'Jordan Schneider', -- secondaryName
   'Director of Marketing', -- SecondaryTitle
   'jschneider@parkwaypizza.com', -- secondaryEmail
   '612-729-9090', -- secondaryDirectPhone
   '952-929-0095', -- secondaryMobilePhone
   'Thinking about doing a web ad next.', -- notes
   'inviteCode'), -- inviteCode
   ----------- Advertiser 3: Web
   ('mikehanover@gmail.com', -- email
   NULL, -- phone
   'Mike Hanover',  -- name
   'Replace with a salted/hashed password', -- password
   'advertiser', -- authLevel
   'email', -- contactPreference
   true, -- acceptAchPayment
   'Bole Ethiopian Cuisine', -- companyName
   false, -- doNotDisturb
   true, -- isActive
   'boleethiopiancuisine.com', -- advertiserUrl
   '1341 Pascal St. N, St. Paul, MN 55108', -- address
   'Solomon Haile', -- primaryName
   'CEO', -- primaryTitle
   'solomon@boleethiopiancuisine.com', -- primaryEmail
   '651-330-2492', -- primaryDirectPhone
   '651-991-8675', -- primaryMobilePhone
   'Rekik Abaineh', -- secondaryName
   'CEO', -- SecondaryTitle
   'rekik@boleethipiancuisine.com', -- secondaryEmail
   '651-330-2494', -- secondaryDirectPhone
   '651-975-4392', -- secondaryMobilePhone
   'Thinking about doing a print ad next.', -- notes
   'inviteCode'), -- inviteCode
   ----------- Advertiser 4: Web
   ('lorrainechelle@gmail.com', -- email
   NULL, -- phone
   'Lorraine Chelle',  -- name
   'Replace with a salted/hashed password', -- password
   'advertiser', -- authLevel
   'email', -- contactPreference
   true, -- acceptAchPayment
   'Mims Cafe', -- companyName
   false, -- doNotDisturb
   true, -- isActive
   'mims-cafe.com', -- advertiserUrl
   '1435 Cleveland Ave N St Paul, Minnesota 55108', -- address
   'Yousef Shaheen', -- primaryName
   'CEO', -- primaryTitle
   'shaheensinc@gmail.com', -- primaryEmail
   '651-646-0456', -- primaryDirectPhone
   '651-320-8865', -- primaryMobilePhone
   'Abdi Mohammed', -- secondaryName
   'Manager', -- SecondaryTitle
   'abdi@mims-cafe.com', -- secondaryEmail
   '651-646-0456', -- secondaryDirectPhone
   '651-975-4392', -- secondaryMobilePhone
   'Thanks for the exposure.', -- notes
   'inviteCode'), -- inviteCode
   ----------- Advertiser 5
   ('waynefranklin@gmail.com', -- email
   '651-225-1960', -- phone
   'Wayne Franklin',  -- name
   'Replace with a salted/hashed password', -- password
   'advertiser', -- authLevel
   'email', -- contactPreference
   true, -- acceptAchPayment
   'MBs Cleaning Services', -- companyName
   false, -- doNotDisturb
   true, -- isActive
   'mbscleaning.com', -- advertiserUrl
   '1435 Cleveland Ave N St Paul, Minnesota 55108', -- address
   'Mary Beth Stevens', -- primaryName
   'CEO', -- primaryTitle
   'mbs@mbscleaning.com', -- primaryEmail
   '651-225-1960', -- primaryDirectPhone
   '651-320-8865', -- primaryMobilePhone
   'James Kittner', -- secondaryName
   'Cleaning Manager', -- SecondaryTitle
   'jk@mbscleaning.com', -- secondaryEmail
   '651-225-1961', -- secondaryDirectPhone
   '651-975-4392', -- secondaryMobilePhone
   'Thanks for the exposure.', -- notes
   'inviteCode'), -- inviteCode
   ----------- Advertiser 6
   ('angelinleigh@gmail.com', -- email
   '651-644-9660', -- phone
   'Angelina Leigh',  -- name
   'Replace with a salted/hashed password', -- password
   'advertiser', -- authLevel
   'email', -- contactPreference
   true, -- acceptAchPayment
   'Express Bike', -- companyName
   false, -- doNotDisturb
   true, -- isActive
   'exbike.com', -- advertiserUrl
   '1158 Selby Ave, St. Paul, 55104', -- address
   'Ryan Sheehan', -- primaryName
   'Managing Director', -- primaryTitle
   'ryan@exbike.com', -- primaryEmail
   '651-644-9660', -- primaryDirectPhone
   '651-296-4365', -- primaryMobilePhone
   'Mitzel Walburg', -- secondaryName
   'Chief of Sales', -- SecondaryTitle
   'mitzel@exbike.com', -- secondaryEmail
   '651-644-9661', -- secondaryDirectPhone
   '651-975-4392', -- secondaryMobilePhone
   'Thanks for the easy process, folks.', -- notes
   'inviteCode'), -- inviteCode
   ----------- Advertiser 7
   ('adamberg@gmail.com', -- email
   '651-644-9660', -- phone
   'Adam Berg',  -- name
   'Replace with a salted/hashed password', -- password
   'advertiser', -- authLevel
   'email', -- contactPreference
   true, -- acceptAchPayment
   'O’Shaughnessy Distilling Company', -- companyName
   false, -- doNotDisturb
   true, -- isActive
   'osdistilling.com', -- advertiserUrl
   '600 Malcolm Ave. SE Minneapolis, MN 55414', -- address
   'Brian Nation', -- primaryName
   'Master Brewer', -- primaryTitle
   'brian@osdistilling.com', -- primaryEmail
   '763-338-0914', -- primaryDirectPhone
   '651-745-3298', -- primaryMobilePhone
   'Pip Hanson', -- secondaryName
   'Bark Keep', -- SecondaryTitle
   'pip@osdistilling.com', -- secondaryEmail
   '651-644-9661', -- secondaryDirectPhone
   '651-887-6329', -- secondaryMobilePhone
   'Thanks for the easy process, folks.', -- notes
   'inviteCode'), -- inviteCode
   ----------- Advertiser 8
   ('dwyatt@nextchapter.com', -- email
   '651-282-5874', -- phone
   'Darleen Wyatt',  -- name
   'Replace with a salted/hashed password', -- password
   'advertiser', -- authLevel
   'email', -- contactPreference
   true, -- acceptAchPayment
   'Next Chapter Book Sellers', -- companyName
   false, -- doNotDisturb
   true, -- isActive
   'nextchapterbooksellers.com', -- advertiserUrl
   '38 Snelling Ave S, St. Paul, Minnesota, 55105', -- address
   'Darleen Wyatt', -- primaryName
   'Lead Sales Clerk', -- primaryTitle
   'dwyatt@nextchapter.com', -- primaryEmail
   '651-225-8989', -- primaryDirectPhone
   '651-745-3298', -- primaryMobilePhone
   'Evan Deeann', -- secondaryName
   'Lead Sales Clerk', -- SecondaryTitle
   'evan@nextchapter.com', -- secondaryEmail
   '651-225-8989', -- secondaryDirectPhone
   '651-988-2917', -- secondaryMobilePhone
   'Love reading your paper, cant wait to see our ad :)', -- notes
   'inviteCode'), -- inviteCode
   ----------- Advertiser 9
   ('drobin@outlook.com', -- email
   '651-225-8989', -- phone
   'Duncan Robin',  -- name
   'Replace with a salted/hashed password', -- password
   'advertiser', -- authLevel
   'email', -- contactPreference
   true, -- acceptAchPayment
   'Karta Thai', -- companyName
   false, -- doNotDisturb
   true, -- isActive
   'kartathai.com', -- advertiserUrl
   '2295 Como. Avenue ST Paul. Minnesota 55108', -- address
   'Kenton Marigold', -- primaryName
   'St. Paul Location Manager', -- primaryTitle
   'kenton.marigold@gmail.com', -- primaryEmail
   '651-330-6281', -- primaryDirectPhone
   '651-444-9675', -- primaryMobilePhone
   'Arthit Sunan', -- secondaryName
   'Minneapolis Location Manager', -- SecondaryTitle
   'SunanArthit@outlook.com', -- secondaryEmail
   '651-756-7173', -- secondaryDirectPhone
   '651-988-2917', -- secondaryMobilePhone
   'Thanks for the help setting up an ad. So easy!', -- notes
   'inviteCode'), -- inviteCode
   ----------- Advertiser 10
   ('aaronbergmeier@gmail.com', -- email
   '651-999-0123', -- phone
   'Aaron Bergmeier',  -- name
   'Replace with a salted/hashed password', -- password
   'advertiser', -- authLevel
   'email', -- contactPreference
   true, -- acceptAchPayment
   'Dan Bane CPA, LLC', -- companyName
   false, -- doNotDisturb
   true, -- isActive
   'https://www.danbanecpa.com/home', -- advertiserUrl
   '821 Raymond Avenue. St. Paul, MN 55114', -- address
   'Dan Bane', -- primaryName
   'CEO', -- primaryTitle
   'dan@danbanecpa.com', -- primaryEmail
   '952-429-4997', -- primaryDirectPhone
   '952-210-2501', -- primaryMobilePhone
   NULL, -- secondaryName
   NULL, -- SecondaryTitle
   NULL, -- secondaryEmail
   NULL, -- secondaryDirectPhone
   NULL, -- secondaryMobilePhone
   'Thanks for making everything so easy for me!', -- notes
   'inviteCode'), -- inviteCode
   ----------- Advertiser 11
   ('bertahoffman@yahoo.com', -- email
   '651-265-5600', -- phone
   'Berta Hoffman',  -- name
   'Replace with a salted/hashed password', -- password
   'advertiser', -- authLevel
   'email', -- contactPreference
   true, -- acceptAchPayment
   'Sunrise Banks', -- companyName
   false, -- doNotDisturb
   true, -- isActive
   'sunrisebanks.com', -- advertiserUrl
   '2100 Blaisdell Ave #2427, Minneapolis, MN 55404', -- address
   'Becca Hoeft', -- primaryName
   'Chief Brand Officer', -- primaryTitle
   'bhoeft@sunrisebanks.com', -- primaryEmail
   '651-207-5633', -- primaryDirectPhone
   '651-299-4453', -- primaryMobilePhone
   'David Reiling', -- secondaryName
   'CEO', -- SecondaryTitle
   'dreiling@sunrisebanks.com', -- secondaryEmail
   '763-221-4467', -- secondaryDirectPhone
   '763-477-6522', -- secondaryMobilePhone
   'The ad looks better than I could have ever imagined, thanks again!', -- notes
   'inviteCode'), -- inviteCode
   ----------- Advertiser 12
   ('annettekujawa@outlook.com', -- email
   '651-560-9900', -- phone
   'Annette Kujawa',  -- name
   'Replace with a salted/hashed password', -- password
   'advertiser', -- authLevel
   'email', -- contactPreference
   true, -- acceptAchPayment
   'Boreal Shopping', -- companyName
   false, -- doNotDisturb
   true, -- isActive
   'shop.boreal.life', -- advertiserUrl
   '', -- address
   'Annette Kujawa', -- primaryName
   'CEO', -- primaryTitle
   'annette@shop.boreal.life', -- primaryEmail
   '612-453-6678', -- primaryDirectPhone
   '612-312-9078', -- primaryMobilePhone
   'Curtis Kujawa', -- secondaryName
   'Chief Technical Officer', -- SecondaryTitle
   'curtis@shop.boreal.life', -- secondaryEmail
   '952-342-6475', -- secondaryDirectPhone
   '952-274-8944', -- secondaryMobilePhone
   'I am so happy you made this so easy for me!', -- notes
   'inviteCode'), -- inviteCode
   ----------- Advertiser 13
   ('paulmiller@gmail.com', -- email
   '651-644-3685', -- phone
   'Paul Miller',  -- name
   'Replace with a salted/hashed password', -- password
   'advertiser', -- authLevel
   'email', -- contactPreference
   true, -- acceptAchPayment
   'St. Anthony Park Dental Care', -- companyName
   false, -- doNotDisturb
   true, -- isActive
   'sapdentalcare.com', -- advertiserUrl
   '2278 Como Ave St. Paul, MN 55108', -- address
   'Paul Kling', -- primaryName
   'Doctor', -- primaryTitle
   'paul@sapdentalcare.com', -- primaryEmail
   '952-645-7900', -- primaryDirectPhone
   '952-214-5533', -- primaryMobilePhone
   'Nate Loomis', -- secondaryName
   'Doctor', -- SecondaryTitle
   'nate@sapdentalcare.com', -- secondaryEmail
   '952-688-7342', -- secondaryDirectPhone
   '952-433-9032', -- secondaryMobilePhone
   'I cannot believe how little I had to do, your process is amazing!', -- notes
   'inviteCode'), -- inviteCode
   ----------- Advertiser 14
   ('janeanderson@gmail.com', -- email
   '651-313-6888', -- phone
   'Jane Anderson',  -- name
   'Replace with a salted/hashed password', -- password
   'advertiser', -- authLevel
   'email', -- contactPreference
   true, -- acceptAchPayment
   'The Lab', -- companyName
   false, -- doNotDisturb
   true, -- isActive
   'thelabmn.com', -- advertiserUrl
   '767 N. Eustis St., Suite 115, Saint Paul, MN 55114', -- address
   'Janet Johanson', -- primaryName
   'CEO', -- primaryTitle
   'janet@thelabmn.com', -- primaryEmail
   '651-313-6888', -- primaryDirectPhone
   '651-213-6675', -- primaryMobilePhone
   'Matt Hall', -- secondaryName
   'Brew Master', -- SecondaryTitle
   'matt@thelabmn.com', -- secondaryEmail
   '763-243-5199', -- secondaryDirectPhone
   '763-745-1199', -- secondaryMobilePhone
   'The staff was so friendly and great to speak with, thank you!', -- notes
   'inviteCode'), -- inviteCode
   ----------- Ad Rep User2
   ('tom@parkbugle.com', -- email
   '612-524-0923', -- phone
   'Tom', -- name
   'Replace with a salted/hashed password', -- password
   'ad rep', -- authLevel
   'email', -- contactPreference
   false, -- acceptAchPayment
   NULL, -- companyName
   false, -- doNotDisturb
   true, -- isActive
   NULL, -- advertiserUrl
   NULL, -- address
   NULL, -- primaryName
   NULL, -- primaryTitle
   NULL, -- primaryEmail
   NULL, -- primaryDirectPhone
   NULL, -- primaryMobilePhone
   NULL, -- secondaryName
   NULL, -- secondaryTitle
   NULL, -- secondaryEmail
   NULL, -- secondaryDirectPhone
   NULL, -- secondaryMobilePhone
   'Primary ad rep in charge of the south side of St. Anthony Park', -- notes
   'inviteCode'); -- inviteCode
; -- end insert

-- INSERT INTO "Users" (
-- 	"email", "name", "password", "authLevel", "contactPreference", "acceptAchPayment", "companyName",
-- 	"doNotDisturb", "isActive", "advertiserUrl", "address", "primaryName", "primaryTitle", "primaryEmail",
-- 	"primaryDirectPhone", "primaryMobilePhone", "secondaryName", "secondaryEmail", "secondaryDirectPhone", 
-- 	"secondaryMobilePhone", "notes", "inviteCode"
-- )
-- VALUES (
-- 	'scott.hanson@excellentdesign.com', 'Scott Hanson', 'replace with encrypted password', 'print designer', null, false, 'Park Bugle', 
-- 	false, true, null, '6485 Island St., Brooklyn Park, Minneapolis, MN 55316', null, null, null, 
-- 	'672-383-4923', null, null, null, null,
-- 	null, 'Print designer for all Q4 ads. Prefers email invoicing. Works with black and white images only.', 'inviteCode'
-- ),
-- (
-- 	'kbrooks@stylenova.com', 'Kelly Brooks', 'replace with encrypted password', 'web designer', null, false, 'Park Bugle', 
-- 	false, true, null, '2415 Carter Ave, Saint Paul, MN, 55108', null, null, null, 
-- 	'(651) 454-6752', null, null, null, null,
-- 	null, 'Print designer for all Q4 ads. Prefers email invoicing. Works with black and white images only.', 'inviteCode'
-- ),
-- (
-- 	'cmfern24@gmail.com', 'Courtney Fern', 'replace with encrypted password', 'ad rep', null, false, 'Park Bugle', 
-- 	false, true, null, '1762 Canyon Ln, Saint Paul, Minnesota(MN), 55112', null, null, null, 
-- 	'(651) 631-1157', null, null, null, null,
-- 	null, 'Handles north side of St. Anthony Park.', 'inviteCode'
-- ),
-- (
-- 	'mikehanover@gmail.com', 'Mike Hanover', 'replace with encrypted password', 'advertiser', null, false, 'Ace Hardware', 
-- 	false, true, null, '24465 50th Rd, Saint Paul, MN, 55112', null, null, null, 
-- 	'(651) 493-1512', null, 'Jim Kroning', 'jkroning@outlook.com', null,
-- 	'(651) 644-4223', 'Mike is very responsive but you may have to reach out to their on-site manager Jim', 'inviteCode'
-- ),
-- (
-- 	'lorrainechell@madisonmarketing.net', 'Lorraine Chelle', 'replace with encrypted password', 'ad rep', null, false, 'Park Bugle', 
-- 	false, true, null, '1794 Taconite Trl, Saint Paul, Minnesota(MN), 55122', null, null, null, 
-- 	'(651) 454-6752', null, null, null, null,
-- 	null, 'Handles South side of St. Anthony Park.', 'inviteCode'
-- ),
-- (
-- 	'waynefranklyn@outlook.com', 'Wayne Franklin', 'replace with encrypted password', 'advertiser', null, false, 'Parkway Pizza', 
-- 	false, true, null, '245 N Oxford St, Saint Paul, Minnesota(MN), 55104', null, null, null, 
-- 	'(651) 493-1512', null, 'Kent Daisy', 'kdaisy@outlook.com', null,
-- 	'(651) 528-7412', null, 'inviteCode'
-- ),
-- (
-- 	'a.leigh@sunrisebanks.org', 'Angelina Leigh', 'replace with encrypted password', 'advertiser', null, false, 'Sunrise Banks', 
-- 	false, true, null, '2621 17th St NW, Saint Paul, Minnesota(MN), 55112', null, null, null, 
-- 	'(651) 493-1512', null, null, null, null,
-- 	null, null, 'inviteCode'
-- );

CREATE TABLE "AdSize" (
   "id" SERIAL PRIMARY KEY,
   "adType" VARCHAR(255) NOT NULL,
   "desc" VARCHAR(255) NOT NULL,
   "columns" INT NOT NULL,
   "inches" FLOAT NOT NULL,
   "image" VARCHAR(255) NOT NULL
);

INSERT INTO "AdSize" (
   "adType", 
   "desc",
   "columns", 
   "inches", 
   "image"
)  
VALUES 
   ('FULL PAGE', '5 columns x 15.66"', 5, 15.66, 'https://image.flaticon.com/icons/png/512/126/126249.png'),
   ('1/2 PAGE VERTICAL', '3 columns x 12.5"', 3, 12.5, 'https://image.flaticon.com/icons/png/512/126/126249.png'),
   ('1/2 PAGE HORIZONTAL', '5 columns x 7.5"', 5, 7.5, 'https://image.flaticon.com/icons/png/512/126/126249.png'),
   ('1/4 PAGE', 'Vertical: 2 columns x 10" Horizontal: 3 columns x 6.5"', 2, 10, 'https://image.flaticon.com/icons/png/512/126/126249.png'),
   ('1/8 PAGE', 'Vertical: 2 columns x 5" Horizontal: 3 columns x 3.5"', 5, 5, 'https://image.flaticon.com/icons/png/512/126/126249.png'),
   ('1 COLUMN x 8" or 2 COLUMN x 4"', '', 1, 8, 'https://image.flaticon.com/icons/png/512/126/126249.png'),
   ('BUSINESS CARD', '2 columns x 2"', 2, 2, 'https://image.flaticon.com/icons/png/512/126/126249.png'),
   ('FEATURE SPONSOR AD', 'Includes banner ad, 2 columns x 5" display ad, and web tile ad', 0, 0, 'https://image.flaticon.com/icons/png/512/126/126249.png')
; -- end insert

----------- COLOR -----------
CREATE TABLE "Color" (
   "id" SERIAL PRIMARY KEY,
   "colorType" VARCHAR(255) NOT NULL,
   "colorPrice" DECIMAL NOT NULL
);
   
INSERT INTO "Color" (
   "colorType", 
   "colorPrice"
)
VALUES 
   ('None', 0),
   ('Spot', 100),
   ('Full Color', 250)
; -- end insert

----------- RATES -----------
CREATE TABLE "Rates" (
   "id" SERIAL PRIMARY KEY,
   "rateName" VARCHAR(255) NOT NULL,
   "isLessThanEight" FLOAT,
   "isEightToTwelve" FLOAT,
   "isTwelveToTwenty" FLOAT,
   "isTwentyPlus" FLOAT,
   "minDuration" INT NOT NULL,
   "maxDuration" INT NOT NULL
);

INSERT INTO "Rates" (
   "rateName",
   "isLessThanEight",
   "isEightToTwelve",
   "isTwelveToTwenty",
   "isTwentyPlus",
   "minDuration",
   "maxDuration"
)
VALUES 
   ('Standard rate (noncontract)', 27.00, 26.00, 25.00, 24.00, 1, 3),
   ('4 to 11 month contract rate', 23.00, 22.00, 21.00, 20.00, 4, 11),
   ('12 month contract rate', 21.00, 20.00, 19.00, 18.00, 12, 12)
; -- end insert

----------- CONTRACTS -----------
CREATE TABLE "Contracts" (
   "id" SERIAL PRIMARY KEY,
   "adSizeId" INT REFERENCES "AdSize",
   -- "adInstructions" VARCHAR(255),
   -- "sponsorshipId" INT REFERENCES "Sponsorship",
   "notes" VARCHAR(512),
   "startMonth" DATE DEFAULT 'NOW',
   "commissionPercentage" INT,
   "colorId" INT REFERENCES "Color",
   "contractType" VARCHAR(255),
   "calculatedBill" DECIMAL,
   "actualBill" DECIMAL,
   "page" INT,
   -- "holidayGuide" DECIMAL, (stretch)
   "isApproved" BOOLEAN DEFAULT false,
   "pricingSchemaId" INT REFERENCES "Rates",
   "months" INT,
   "actualColumns" FLOAT DEFAULT NULL,
   "actualInches" FLOAT DEFAULT NULL
);

INSERT INTO "Contracts" (
   "adSizeId",
   "notes",
   "startMonth",
   "commissionPercentage",
   "colorId",
   "contractType",
   "calculatedBill",
   "actualBill",
   "page",
   "isApproved",
   "pricingSchemaId",
   "months",
   "actualColumns",
   "actualInches"
)
VALUES
   (1, '2 month contract', '2021-10-01', 20, 1, 'Print', 270, 240, 2, true, 2, 2, 5, 15.66),
   (2, '4 month contract', '2021-09-01', 25, 1, 'Print', 250, 300, 3, true, 1, 4, 3, 12.5),
   (3, '12 month contract', '2021-11-01', 15, 2, 'Print', 200, 320, 1, true, 3, 12, 5, 7.5),
   (4, '2 month contract', '2021-10-01', 20, 1, 'Print', 230, 400, 2, false, 2, 2, 2, 10),
   (5, '1 month contract', '2021-08-01', 15, 2, 'Web', 300, 250, NULL, true, 1, 1, 2, 5),
   (1, '12 month contract', '2021-10-01', 25, 3, 'Print', 275, 400, 1, false, 2, 12, 5, 15.66),
   (2, '1 month contract', '2021-08-01', 15, 2, 'Web', 300, 210, NULL, true, 1, 1, 3, 12.5),
   (3, '2 month contract', '2021-08-01', 20, 2, 'Print', 300, 180, 1, false, 1, 2, 5, 7.5),
   (4, '1 month contract', '2021-08-01', 15, 3, 'Print', 300, 220, 3, false, 1, 1, 2, 10),
   (5, '4 month contract', '2021-08-01', 15, 2, 'Print', 300, 250, 3, false, 1, 4, 2, 5),
   (6, '12 month contract', '2021-08-01', 15, 3, 'Print', 300, 510, 4, true, 1, 12, 1, 8),
   (1, '12 month contract', '2021-08-01', 15, 2, 'Web', 300, 610, NULL, true, 1, 12, 5, 15.66),
   (2, '4 month contract', '2021-08-01', 15, 1, 'Print', 300, 330, 5, true, 1, 4, 3, 12.5),
   (3, '4 month contract', '2021-08-01', 15, 2, 'Print', 300, 390, 1, true, 1, 4, 5, 7.5)
; -- end insert

----------- IMAGES -----------
CREATE TABLE "Images" (
   "id" SERIAL PRIMARY KEY,
   "imageUrl" VARCHAR(1024) NOT NULL,
   "contractId" INT REFERENCES "Contracts"
);

INSERT INTO "Images" (
   "imageUrl",
   "contractId"
)
VALUES 
   ('https://www.exploreminnesota.com/sites/default/files/listing_images/d7a892ca2cbad50ff169ab493d5fc9d7e5528bb7_4.jpg', 1),
   ('https://lh3.googleusercontent.com/proxy/CsQj5aaZnPr33jS2TNJmzoh32p6vOjxf2WZwAVg6_M6dRUQqqHgFQbsVzjtREwh77gcZPy3ngD3x3KArLJqyMWrqHVy_BQBjnLrzinqdw_x4UXKfQowVVIe2Rn9D5aW3xkKPlVcjxfut9zg2tQ1Uig', 2),
   ('https://www.twincities.com/wp-content/uploads/2021/01/stp-z-bole-01.jpg?w=525', 3),
   ('https://www.mims-cafe.com/assets/Hummus1.png', 4),
   ('https://www.mbscleaning.com/wp-content/uploads/2020/07/mbscleaning_services_v1.jpg', 5),
   ('https://images.squarespace-cdn.com/content/v1/59b09f05cd39c3450a1b88c5/1615500120635-C0GN9YF0NKQTDJF3SJNH/Express+Bike+Shop+Logo-01.png?format=1500w', 6),
   ('https://osdistilling.com/wp-content/uploads/elementor/thumbs/OSDC-logo-pbr937wozqvxdpw3b002rdgk7iwaychstinfebt7he.png', 7),
   ('https://www.nextchapterbooksellers.com/sites/nextchapterbooksellers.com/files/NC%20Horiz%204%20color_2.jpg', 8),
   ('http://kartathai.com/img/profile.png', 9),
   ('https://wellingtonmgt.com/dist/img/wellington-logo.svg', 10),
   ('https://2lkf5l1zkzbr35h8qxi5dprn-wpengine.netdna-ssl.com/wp-content/uploads/2019/04/logo.svg', 11),
   ('https://cdn.shoplightspeed.com/shops/635627/themes/11789/assets/logo.png?20200417191650', 12),
   ('https://scontent.ffcm1-2.fna.fbcdn.net/v/t1.6435-9/83214325_1050276208639578_5523025396569735168_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=oD8cJQFVYAsAX-Tnpw5&_nc_ht=scontent.ffcm1-2.fna&oh=875f7113f0cd5a1d54e2279d645ffcf7&oe=619296AF', 13),
   ('https://images.squarespace-cdn.com/content/v1/5c0917b3620b859b813a7cd6/1554781978615-WZOWPABDFNSSKQMZVN8D/The+Lab+logo+DP+white.png?format=1500w', 14)
; -- end insert

----------- CHAT -----------
CREATE TABLE "Chat" (
   "id" SERIAL PRIMARY KEY,
   "message" VARCHAR(5000) NOT NULL,
   "timeStamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   "userId" INT REFERENCES "Users",
   "contractId" INT REFERENCES "Contracts"
);

INSERT INTO "Chat" (
   "message",
   "timeStamp",
   "userId",
   "contractId"
)
VALUES 
   ('Hey, thanks for the help earlier! I would like the contract to start in December, black and white is just fine for the color, and our budget is $200.', '2021-10-16 11:16:29.727408', 5, 1),
   ('Hey, thanks for the help earlier! I would like the contract to start in December, black and white is just fine for the color, and our budget is $200.', '2021-10-16 11:16:29.727408', 6, 2),
   ('Hey, thanks for the help earlier! I would like the contract to start in December, black and white is just fine for the color, and our budget is $200.', '2021-10-16 11:16:29.727408', 7, 3),
   ('Hey, thanks for the help earlier! I would like the contract to start in December, black and white is just fine for the color, and our budget is $200.', '2021-10-16 11:16:29.727408', 8, 4),
   ('Hey, thanks for the help earlier! I would like the contract to start in December, black and white is just fine for the color, and our budget is $200.', '2021-10-16 11:16:29.727408', 9, 5),
   ('Hey, thanks for the help earlier! I would like the contract to start in December, black and white is just fine for the color, and our budget is $200.', '2021-10-16 11:16:29.727408', 10, 6),
   ('Hey, thanks for the help earlier! I would like the contract to start in December, black and white is just fine for the color, and our budget is $200.', '2021-10-16 11:16:29.727408', 11, 7),
   ('Hey, thanks for the help earlier! I would like the contract to start in December, black and white is just fine for the color, and our budget is $200.', '2021-10-16 11:16:29.727408', 12, 8),
   ('Hey, thanks for the help earlier! I would like the contract to start in December, black and white is just fine for the color, and our budget is $200.', '2021-10-16 11:16:29.727408', 13, 9),
   ('Hey, thanks for the help earlier! I would like the contract to start in December, black and white is just fine for the color, and our budget is $200.', '2021-10-16 11:16:29.727408', 14, 10),
   ('Hey, thanks for the help earlier! I would like the contract to start in December, black and white is just fine for the color, and our budget is $200.', '2021-10-16 11:16:29.727408', 15, 11),
   ('Hey, thanks for the help earlier! I would like the contract to start in December, black and white is just fine for the color, and our budget is $200.', '2021-10-16 11:16:29.727408', 16, 12),
   ('Hey, thanks for the help earlier! I would like the contract to start in December, black and white is just fine for the color, and our budget is $200.', '2021-10-16 11:16:29.727408', 17, 13),
   ('Hey, thanks for the help earlier! I would like the contract to start in December, black and white is just fine for the color, and our budget is $200.', '2021-10-16 11:16:29.727408', 18, 14)
; -- end insert

----------- CONTRACTS_USERS -----------
CREATE TABLE "Contracts_Users" (
   "id" SERIAL PRIMARY KEY,
   "contractId" INT REFERENCES "Contracts",
   "userId" INT REFERENCES "Users"
);

INSERT INTO "Contracts_Users" (
   "contractId",
   "userId"
)
VALUES 
   -- associates each contract with the advertiser
   (1, 5), (2, 6), (3, 7), (4, 8), (5, 9), (6, 10), (7, 11), (8, 12), (9, 13), (10, 14), (11, 15), (12, 16), (13, 17), (14, 18),
   -- associates each contract with an ad rep
   (1, 2), (2, 2), (3, 2), (4, 2), (5, 2), (6, 2), (7, 2), (8, 2), (9, 2), (10, 19), (11, 2), (12, 2), (13, 2), (14, 19),
   -- associates each contract with a designer
   (1, 3), (2, 3), (3, 3), (4, 3), (5, 4), (6, 3), (7, 4), (8, 3), (9, 3), (10, 3), (11, 3), (12, 3), (13, 4), (14, 3)
; -- end insert

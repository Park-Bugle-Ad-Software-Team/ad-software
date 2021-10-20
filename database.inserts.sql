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
   ----------- Super Admin
   ('PBSuperAdmin', -- email
   '', -- phone
   'Josh Becerra', -- name
   'Replace with a salted/hashed password',  --password
   'admin', -- authLevel
   NULL, -- contactPreference
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
   NULL) -- inviteCode
; -- end insert

----------- AD SIZE
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

----------- COLOR
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

----------- RATES
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

----------- CONTRACTS
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

----------- IMAGES
CREATE TABLE "Images" (
   "id" SERIAL PRIMARY KEY,
   "imageUrl" VARCHAR(1024) NOT NULL,
   "contractId" INT REFERENCES "Contracts"
);

----------- CHAT
CREATE TABLE "Chat" (
   "id" SERIAL PRIMARY KEY,
   "message" VARCHAR(5000) NOT NULL,
   "timeStamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   "userId" INT REFERENCES "Users",
   "contractId" INT REFERENCES "Contracts"
);

----------- CONTRACTS_USERS
CREATE TABLE "Contracts_Users" (
   "id" SERIAL PRIMARY KEY,
   "contractId" INT REFERENCES "Contracts",
   "userId" INT REFERENCES "Users"
);

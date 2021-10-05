-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "Users" (
   "id" serial PRIMARY KEY,
   "email" VARCHAR(255) NOT NULL,
   "name" VARCHAR(255), -- should be NOT NULL in future
   "password" VARCHAR(255) NOT NULL,
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
   "notes" VARCHAR(512)
);
 
CREATE TABLE "AdSize" (
   "id" SERIAL PRIMARY KEY,
   "type" VARCHAR(255) NOT NULL,
   "columns" INT NOT NULL,
   "inches" INT NOT NULL,
   "months" INT NOT NULL,
   "image" VARCHAR(255) NOT NULL
);
 
CREATE TABLE "Sponsorship" (
   "id" SERIAL PRIMARY KEY,
   "isSponsored" BOOLEAN NOT NULL,
   "price" DECIMAL NOT NULL
);
 
CREATE TABLE "Color" (
   "id" SERIAL PRIMARY KEY,
   "type" VARCHAR(255) NOT NULL,
   "price" DECIMAL NOT NULL
);
 
CREATE TABLE "Contracts" (
   "id" SERIAL PRIMARY KEY,
   "adSizeId" INT REFERENCES "AdSize",
   "adInstructions" VARCHAR(255),
   "sponsorshipId" INT REFERENCES "Sponsorship",
   "notes" VARCHAR(512),
   "startMonth" DATE,
   "commissionPercentage" INT,
   "colorId" INT REFERENCES "Color",
   "type" VARCHAR(255),
   "calculatedBill" DECIMAL,
   "actualBill" DECIMAL,
   "page" INT,
   "holidayGuide" DECIMAL, -- Stretch, probably just rate schema reference
   "isApproved" BOOLEAN,
   "pricingSchemaId" INT REFERENCES "Rates"
);
 
CREATE TABLE "Images" (
   "id" SERIAL PRIMARY KEY,
   "imageUrl" VARCHAR(1024) NOT NULL,
   "contract" INT REFERENCES "Contracts"
);
 
CREATE TABLE "Invites" (
   "id" SERIAL PRIMARY KEY,
   "email" VARCHAR(255) NOT NULL,
   "inviteCode" VARCHAR(255) NOT NULL,
   -- "authLevel" VARCHAR(255) NOT NULL,
   "userId" INT REFERENCES "Users"
);
 
CREATE TABLE "Chat" (
   "id" SERIAL PRIMARY KEY,
   "message" VARCHAR(5000) NOT NULL,
   "timeStamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   "userId" INT REFERENCES "Users",
   "contractId" INT REFERENCES "Contracts",
);
 
CREATE TABLE "Contracts_Users" (
   "id" SERIAL PRIMARY KEY,
   "contractId" INT REFERENCES "Contracts",
   "userId" INT REFERENCES "Users"
);
 
CREATE TABLE "Rates" (
   "id" SERIAL PRIMARY KEY,
   "name" VARCHAR(255) NOT NULL,
   "isLessThanEight" BOOLEAN,
   "isEightToTwelve" BOOLEAN,
   "isTwelveToTwenty" BOOLEAN,
   "isTwentyPlus" BOOLEAN,
   "minDuration" INT NOT NULL,
   "maxDuration" INT NOT NULL
);
 
CREATE TABLE "MiscRates" (
   "id" SERIAL PRIMARY KEY,
   "name" VARCHAR(255) NOT NULL,
   "price" DECIMAL NOT NULL
);

--Hi, Bugle Boys!---
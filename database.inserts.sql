-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "Users" (
   "id" serial PRIMARY KEY,
   "email" VARCHAR(255) NOT NULL,
   "name" VARCHAR(255) NOT NULL,
   "password" VARCHAR(255) NOT NULL,
   "authLevel" VARCHAR(255) NOT NULL,
   "contactPreference" VARCHAR(255),
   "acceptAchPayment" BOOLEAN,
   "companyName" VARCHAR(255),
   "doNotDisturb" BOOLEAN,
   "isActive" BOOLEAN NOT NULL,
);
 
-- Ad rep example
INSERT INTO "Users" ("email", "name", "password", "authLevel")
VALUES
   ('adrep@gmail.com', 'Ad Rep Example', 'abc123', 'Ad Rep'),
   ('admin@gmail.com', 'Admin Example', 'abc123', 'Admin'),
   ('webdesigner@gmail.com', 'Web Designer Example', 'abc123', 'Web Designer');
 
-- Advertiser example
INSERT INTO "Users" ("email", "name", "password", "authLevel", "contactPreference", "acceptAchPayment", "companyName", "doNotDisturb")
VALUES
   ('chromazone@gmail.com', 'Advertiser', 'abc123', 'Advertiser', 'email', true, 'Chroma Zone', false),
   ('acehardware@gmail.com', 'Advertiser', 'abc123', 'Advertiser', 'text', false, 'Ace Hardware', true);
 
CREATE TABLE "Contracts" (
   "id" PRIMARY serial KEY,
   "adSizeId" INT REFERENCES "AdSize",
   "adInstructions" VARCHAR(255),
   "isSponsored" INT REFERENCES "Sponsorship",
   "notes" VARCHAR(255),
   "startMonth" DATETIME,
   "commissionPercentage" INT,
   "colorId" INT REFERENCES "Color",
   "type" VARCHAR(255),
   "calculatedBill" DECIMAL,
   "actualBill" DECIMAL,
   "page" INT,
   "holidayGuide" DECIMAL,
   "isApproved" BOOLEAN,
);
 
CREATE TABLE "Color" (
   "id" SERIAL PRIMARY KEY,
   "type" VARCHAR(255) NOT NULL,
   "price" DECIMAL NOT NULL,
);
 
CREATE TABLE "Sponsorship" (
   "id" SERIAL PRIMARY KEY,
   "isSponsored" BOOLEAN NOT NULL,
   "price" DECIMAL NOT NULL,
);
 
CREATE TABLE "AdSize" (
   "id" SERIAL PRIMARY KEY,
   "type" VARCHAR(255) NOT NULL,
   "columns" INT NOT NULL,
   "inches" INT NOT NULL,
   "months" INT NOT NULL,
   "image" VARCHAR(255) NOT NULL,
);
 
CREATE TABLE "Images" (
   "id" SERIAL PRIMARY KEY,
   "image" VARCHAR(255) NOT NULL,
   "contract" BINARY NOT NULL,
);
 
CREATE TABLE "Invites" (
   "id" serial PRIMARY KEY,
   "email" VARCHAR(255) NOT NULL,
   "inviteCode" VARCHAR(255) NOT NULL,
   "authLevel" VARCHAR(255) NOT NULL,
   "userId" BINARY NOT NULL,
);
 
CREATE TABLE "Chat" (
   "id" serial PRIMARY KEY,
   "message" serial(255) NOT NULL,
   "timeStamp" serial NOT NULL,
   "userId" DATETIME NOT NULL,
   "contractId" INT NOT NULL,
);
 
CREATE TABLE "Contracts_users" (
   "id" serial NOT NULL,
   "contractId" serial NOT NULL,
   "userId" serial NOT NULL,
);
 
CREATE TABLE "Rates" (
   "id" serial NOT NULL,
   "name" serial(255) NOT NULL,
   "lessThanEight" INT NOT NULL,
   "eightToTwelve" INT NOT NULL,
   "twelvetoTwenty" INT NOT NULL,
   "twentyPlus" INT NOT NULL,
   "minDuration" INT NOT NULL,
   "maxDuration" INT NOT NULL,
);
 
CREATE TABLE "public.miscRates" (
   "id" serial NOT NULL,
   "name" serial(255) NOT NULL,
   "price" serial NOT NULL,
);
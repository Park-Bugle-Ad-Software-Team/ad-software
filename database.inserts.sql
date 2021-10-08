-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "Users" (
   "id" serial PRIMARY KEY,
   "email" VARCHAR(255) NOT NULL,
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
   -- admin user
   ('admin@gmail.com',
   'Admin', -- should be NOT NULL in future
   'password', -------------------------------------------------------------- TBD in a few
   'admin', -- should be NOT NULL in future
   'contactPreference',
   false,
   NULL,
   false,
   true,
   NULL,
   NULL,
   NULL,
   NULL,
   NULL,
   NULL,
   NULL,
   NULL,
   NULL,
   NULL,
   NULL,
   NULL,
   NULL,
   NULL),
   ('chromazone@gmail.com',
   'Chroma Zone', -- should be NOT NULL in future
   'password', -------------------------------------------------------------- TBD in a few
   'advertiser', -- should be NOT NULL in future
   'phone',
   true,
   'Chroma Zone',
   false,
   true,
   'chromazone.com',
   '123 Chrome Street Minneapolis',
   'Mark Elenburg',
   'Director of Marketing',
   'melenburg@chromazone.com',
   '507-646-3298',
   '333-444-6287',
   'Jim Phillips',
   'Deputy Director of Marketing',
   'jphillips@chromazone.com',
   '123-456-7890',
   '098-765-4321',
   'Please contact us when 2 months remain on any contract.',
   'inviteCode'),
   ('sonia@gmail.com',
      NULL, -- should be NOT NULL in future
   'password', -------------------------------------------------------------- TBD in a few
   'ad rep', -- should be NOT NULL in future
   'email',
   false,
   NULL,
   false,
   true,
   NULL,
   NULL,
   'Sonia',
   'Advertiser Representative',
   'sonia@gmail.com',
   '507-646-3298',
   '333-444-6287',
   NULL,
   NULL,
   NULL,
   NULL,
   NULL,
   'Primary ad rep in charge of the south side of St. Anthony Park',
   'inviteCode');

CREATE TABLE "AdSize" (
   "id" SERIAL PRIMARY KEY,
   "adType" VARCHAR(255) NOT NULL,
   "columns" INT NOT NULL,
   "inches" INT NOT NULL,
   "months" INT NOT NULL,
   "image" VARCHAR(255) NOT NULL
);

INSERT INTO "AdSize" 
("adType", 
"columns", 
"inches", 
"months", 
"image")  
VALUES 
('Full Page', 5, 5, 12, 'https://image.flaticon.com/icons/png/512/126/126249.png'),
('Quarter Page', 5, 5, 12, 'https://image.flaticon.com/icons/png/512/126/126249.png');

-- INSERT INTO "Sponsorship"
--    ("isSponsored", "sponsorshipPrice")
-- VALUES
--    (false, 0),
--    (true, 275);

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
   ('Full Color', 250);

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
VALUES (
   'Standard rate (noncontract)',
   27.00,
   26.00,
   25.00,
   24.00,
   1,
   3
),
('4 to 11 month contract rate', 23.00, 22.00, 21.00, 20.00, 4, 11),
('12 month contract rate', 21.00, 20.00, 19.00, 18.00, 12, 12),
('Holiday Rate 2021', 19.00, 18.00, 17.00, 16.00, 1, 3)
;

CREATE TABLE "Contracts" (
   "id" SERIAL PRIMARY KEY,
   "adSizeId" INT REFERENCES "AdSize",
   -- "adInstructions" VARCHAR(255),
   -- "sponsorshipId" INT REFERENCES "Sponsorship",
   "notes" VARCHAR(512),
   "startMonth" DATE,
   "commissionPercentage" INT,
   "colorId" INT REFERENCES "Color",
   "contractType" VARCHAR(255),
   "calculatedBill" DECIMAL,
   "actualBill" DECIMAL,
   "page" INT,
   -- "holidayGuide" DECIMAL, (stretch)
   "isApproved" BOOLEAN,
   "pricingSchemaId" INT REFERENCES "Rates"
);

INSERT INTO "Contracts" (
   "adSizeId",
   -- "adInstructions",
   -- "sponsorshipId",
   "notes",
   "startMonth",
   "commissionPercentage",
   "colorId",
   "contractType",
   "calculatedBill",
   "actualBill",
   "page",
   -- "holidayGuide", (stretch)
   "isApproved",
   "pricingSchemaId"
)
VALUES
   (1, '8 month contract', '2021-10-01', 20, 1, 'Print', 270, 270, 2, true, 2),
   (2, '4 month contract', '2021-09-01', 25, 1, 'Print', 250, 270, 3, true, 1),
   (2, '8 month contract', '2021-11-01', 15, 2, 'Web', 200, 270, 1, true, 3),
   (1, '2 month contract', '2021-10-01', 20, 1, 'Print', 230, 270, 2, false, 2),
   (1, '1 month contract', '2021-08-01', 15, 2, 'Web', 300, 270, 3, true, 1),
   (2, '12 month contract', '2021-10-01', 25, 3, 'Print', 275, 270, 1, false, 2);

CREATE TABLE "Images" (
   "id" SERIAL PRIMARY KEY,
   "imageUrl" VARCHAR(1024) NOT NULL,
   "contractId" INT REFERENCES "Contracts"
);

INSERT INTO "Images" (
   "imageUrl",
   "contractId"
)
VALUES ('https://image.flaticon.com/icons/png/512/126/126249.png', 1);

-- CREATE TABLE "Invites" (
--    "id" SERIAL PRIMARY KEY,
--    "email" VARCHAR(255) NOT NULL,
--    "inviteCode" VARCHAR(255) NOT NULL,
--    -- "authLevel" VARCHAR(255) NOT NULL,
--    "userId" INT REFERENCES "Users"
-- );

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
VALUES ('Hey this is the first chat for contract 1', '2021-10-01 20:16:29.727408', 2, 1),
('Hey this is the second chat for contract 1', '2021-10-01 20:20:30.834831', 1, 1),
('Hey this is the third chat for contract 1', '2021-10-01 20:16:29.727408', 3, 1),
('Hey this is the second chat for contract 2', '2021-10-01 20:20:30.834831', 1, 2);

CREATE TABLE "Contracts_Users" (
   "id" SERIAL PRIMARY KEY,
   "contractId" INT REFERENCES "Contracts",
   "userId" INT REFERENCES "Users"
);

INSERT INTO "Contracts_Users" (
   "contractId",
   "userId"
)
VALUES (
   1,
   2
);

CREATE TABLE "MiscRates" (
   "id" SERIAL PRIMARY KEY,
   "miscRateName" VARCHAR(255) NOT NULL,
   "ratePrice" DECIMAL NOT NULL
);

INSERT INTO "MiscRates" (
   "miscRateName",
   "ratePrice"
)
VALUES (
   'Sponsorship',
   275.00
);

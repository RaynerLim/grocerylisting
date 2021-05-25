 

--set extension
--create extension if not exists "uuid-ossp";

--create user tables
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255)NOT NULL
);

CREATE TABLE groceries(
    item_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_picture VARCHAR,
    item_name VARCHAR(255) NOT NULL,
    item_desc text,
    item_price numeric (10,2) NOT NULL,
    item_qty numeric NOT NULL,
    created_date timestamp,
    last_update timestamp
);

--Example Insert users
INSERT INTO users (user_name, user_email, user_password) 
VALUES ('admin', 'mgadmin@gmail.com', 'kthl8822');
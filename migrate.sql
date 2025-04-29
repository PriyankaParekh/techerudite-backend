CREATE TABLE IF NOT EXISTS registrationtable (
  id INT AUTO_INCREMENT PRIMARY KEY,    -- Auto-incremented ID as the primary key
  fname VARCHAR(255),                   -- First name of the user
  lname VARCHAR(255),                   -- Last name of the user
  email VARCHAR(255) UNIQUE,            -- Email of the user (unique constraint)
  password VARCHAR(255),                -- Hashed password of the user
  role VARCHAR(255)                     -- Role of the user (string value like 'admin' or 'customer')
);
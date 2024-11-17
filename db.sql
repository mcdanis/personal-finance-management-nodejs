buatkan query postgreesql untuk tabel seperti ini :

users
- id int primary key
- name varchar 20
- email varchar 100
- password varchar
- created_at timestamp
- updated_at timestamp nullable

transactions
- id int primary key
- user_id int
- account_id int
- type char 1
- sub_category int 
- date date
- name varchar 50
- description varchar nullable
- amount int 20
- created_at timestamp
- updated_at timestamp

categories
- id int primary key
- user_id int
- name varchar 50
- created_at timestamp
- updated_at timestamp nullable

sub_categories
- id int primary key
- user_id int
- name varchar 70
- created_at timestamp 
- updated_at timestamp nullable

accounts
- id int primary key
- user_id int
- name varchar 30
- ballance decimal
- type char 1 
- created_at timestamp
- updated_at timestamp nullable

CREATE TABLE users (
    id SERIAL PRIMARY KEY,                  -- id pengguna, tipe SERIAL untuk auto increment
    name VARCHAR(50) NOT NULL,               -- Nama pengguna dengan panjang maksimal 20 karakter
    email VARCHAR(100) NOT NULL UNIQUE,      -- Email, panjang maksimal 100 karakter, harus unik
    type CHAR(1),              -- 1 user, 0 admin
    password VARCHAR NOT NULL,              -- type
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Tanggal pembuatan
    updated_at TIMESTAMP
);
-- add column
ALTER TABLE public.users ADD "type" char NULL DEFAULT '1';

-- supaya id user auto increment
SELECT setval('users_id_seq', COALESCE((SELECT MAX(id) FROM users), 1), true);

-- grant id user ke user mdani
GRANT USAGE, SELECT, UPDATE ON SEQUENCE users_id_seq TO mcdani;




CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,                  -- id transaksi, tipe SERIAL untuk auto increment
    user_id INT NOT NULL,                    -- id pengguna (foreign key)
    account_id INT NOT NULL,                 -- id akun (foreign key)
    type CHAR(1) NOT NULL,                   -- Jenis transaksi, 1 karakter (misal 'I' untuk pemasukan, 'E' untuk pengeluaran)
    sub_category INT,                        -- subkategori transaksi (misal: ID subkategori)
    date DATE NOT NULL,                      -- Tanggal transaksi
    name VARCHAR(50) NOT NULL,               -- Nama transaksi
    description VARCHAR,                     -- Deskripsi transaksi, nullable
    amount INT CHECK (amount >= 0),          -- Jumlah transaksi, harus >= 0
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Tanggal pembuatan transaksi
    updated_at TIMESTAMP                   -- Tanggal update transaksi, nullable
);


CREATE TABLE categories (
    id SERIAL PRIMARY KEY,                  -- id kategori, tipe SERIAL untuk auto increment
    user_id INT NOT NULL,                    -- id pengguna (foreign key)
    name VARCHAR(50) NOT NULL,               -- Nama kategori
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Tanggal pembuatan kategori
    updated_at TIMESTAMP
);


CREATE TABLE sub_categories (
    id SERIAL PRIMARY KEY,                  -- id subkategori, tipe SERIAL untuk auto increment
    user_id INT NOT NULL,                    -- id pengguna (foreign key)
    name VARCHAR(70) NOT NULL,               -- Nama subkategori
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Tanggal pembuatan subkategori
    updated_at TIMESTAMP                    -- Tanggal update subkategori, nullable
);

CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,                  -- id akun, tipe SERIAL untuk auto increment
    user_id INT NOT NULL,                    -- id pengguna (foreign key)
    name VARCHAR(30) NOT NULL,               -- Nama akun
    balance DECIMAL(15, 2) DEFAULT 0.00,     -- Saldo akun, dengan dua digit desimal
    type CHAR(1) NOT NULL,                   -- Jenis akun ('S' untuk savings, 'C' untuk checking, dsb.)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Tanggal pembuatan akun
    updated_at TIMESTAMP
);


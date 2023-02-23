CREATE SCHEMA IF NOT EXISTS infopet;

CREATE TABLE IF NOT EXISTS infopet.animals
(
    id          SERIAL PRIMARY KEY,
    animal_name VARCHAR(25) UNIQUE NOT NULL
    );

CREATE TABLE IF NOT EXISTS infopet.filters
(
    id          SERIAL PRIMARY KEY,
    filter_name VARCHAR(40)
    );

CREATE TABLE IF NOT EXISTS infopet.breeds
(
    id          SERIAL PRIMARY KEY,
    animal_id INT REFERENCES infopet.animals (id)
    ON UPDATE CASCADE,
    breed_name  VARCHAR(50) UNIQUE NOT NULL,
    img_url     VARCHAR(150)       NOT NULL,
    subtitle    text      NOT NULL,
    character   text,
    training    text,
    diet        text,
    care        text,
    gallery_url varchar(255)
    );

CREATE TABLE IF NOT EXISTS infopet.breeds_parameters
(
    id serial PRIMARY KEY,
    breed_id  INT REFERENCES infopet.breeds (id),
    parameter VARCHAR(50) NOT NULL,
    value     VARCHAR(100) NOT NULL
    );


CREATE TABLE IF NOT EXISTS infopet.breed_filters
(
    breed_id   INT REFERENCES infopet.breeds (id),
    filters_id INT REFERENCES infopet.filters (id),
    PRIMARY KEY (breed_id, filters_id)
    );

CREATE TABLE IF NOT EXISTS infopet.animal_filters
(
    animal_id  INT REFERENCES infopet.animals (id),
    filters_id INT REFERENCES infopet.filters (id),
    PRIMARY KEY (animal_id, filters_id)
    );

INSERT INTO infopet.animals (animal_name)
VALUES ('Собаки');



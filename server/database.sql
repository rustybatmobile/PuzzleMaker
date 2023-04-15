CREATE DATABASE overmind;

CREATE TABLE users (
    username varchar, 
    hashedPassword varchar,
    puzzle1 INT, 
    puzzle2 INT
);

CREATE TABLE puzzles (
    pid SERIAL PRIMARY KEY, 
    puzzletype varchar,
    input text, 
    result varchar(255)
);


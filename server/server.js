import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "./db.js";

const app = express();

const PORT = process.env.PORT || 4000;


app.use(cors());

app.use(cookieParser());
app.use(express.json());

//logging a user in

app.post("/api/auth/login", async (req, res) => {
    const {username, password} = req.body;

    const response =  (await pool.query("SELECT * FROM users WHERE username = $1", [username]));
    const {rowCount, rows} = response || {};
    const isUserInDB = rowCount > 0;

    if(isUserInDB) {

        const {hashedpassword} = rows[0];

        const isPasswordCorrect = await bcrypt.compare(password, hashedpassword);

        if(!isPasswordCorrect) {
            res.status(400).send(JSON.stringify({
                error: "Incorrect password"
            }))
        } else {
            const maxAge = 3 * 24 * 60 * 60;
            const token = jwt.sign({ username }, "harish overmind secret", {
                expiresIn: maxAge
            })
    
            res.status(200).send(JSON.stringify({
                token
            }))
        }

    } else {
        res.status(404).send(JSON.stringify({
            error: "User not found"
        }))
    }
})


//registering a user in


app.post("/api/auth/register", async (req, res) => {

    const {username, password} = req.body;

    const isUserInDB =  (await pool.query("SELECT * FROM users WHERE username = $1", [username])).rowCount !== 0;

    if(isUserInDB) {
        res.status(409).send(JSON.stringify({
            error: "User exists already"
        }))

    } else {

        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(password, salt);

        await pool.query(`INSERT INTO users(username, hashedpassword) VALUES($1, $2)`, [username, hashedPassword])

        //error validation has to be done
        const maxAge = 3 * 24 * 60 * 60;
        const token = jwt.sign({ username }, "harish overmind secret", {
            expiresIn: maxAge
        })

        res.status(200).send(JSON.stringify({
            token
        }))

    }
    
})


 
//submit a puzzle 

app.post("/api/puzzles", async (req, res) => {

    const {username, input, result, puzzletype} = req.body;

    console.log(username, "username");
    console.log(input, "input");
    console.log(result, "result");
    console.log(puzzletype, "puzzletype")
    //it is assumed that the user is logged in if username is available

    if(!username) {
        res.json({
            error: "User must be logged in to submit"
        })
    } else {

            try{
                const response = (await pool.query("INSERT INTO puzzles (puzzletype, input, result) VALUES ($1, $2, $3) RETURNING *", [puzzletype, input, result])).rows[0];
                const {pid} = response;
                
                await pool.query(`UPDATE users SET puzzle${puzzletype} = $1 WHERE username = $2`, [pid, username]);
                //update the users table record with the new primary key
                
                res.status(200).json({
                    message: "successfully submitted"
                });
            } catch(error) {
                res.status(500).json({
                    error
                })
            }
    
        }
    
})

//fetching puzzles done by a user

app.get("/api/puzzles/:username", async (req, res) => {

    const {username} = req.params;
    const payload = {}

    const response =  (await pool.query("SELECT * FROM users WHERE username = $1", [username]));
    const {rowCount, rows} = response || {};
    const isUserInDB = rowCount > 0;

    if(isUserInDB) {

    const {puzzle1, puzzle2} = rows[0];

    if(puzzle1) {
        const puzzle1Info = (await pool.query("SELECT * FROM puzzles WHERE pid = $1", [puzzle1])).rows[0];
        const {input: inputA, result: resultA} = puzzle1Info;
        payload.inputA = inputA; 
        payload.resultA = resultA;
    }

    if(puzzle2) {
        const puzzle2Info = (await pool.query("SELECT * FROM puzzles WHERE pid = $1", [puzzle2])).rows[0];
        const {input: inputB, result: resultB} = puzzle2Info;
        payload.inputB = inputB;
        payload.resultB = resultB;
    }

    res.json(payload)

    } else {
        res.status(404).json({
            error: "User not found"
        })
    }



    
})


app.get("")

app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`)
})


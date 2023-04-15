import pg from "pg";
 
const Pool = pg.Pool;

const pool = new Pool({
    user: "postgres", 
    password: "guitarmylife", 
    host: "localhost",
    port: 5432, 
    database: "overmind" 
})

export default pool;
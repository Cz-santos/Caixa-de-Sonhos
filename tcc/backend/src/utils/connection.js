import mysql from "mysql2/promise";

const con = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: "caixadesonhos",
    password: "Pj26092009*"
});

console.log("mysql 100% conectado");

export { con };
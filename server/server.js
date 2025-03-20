const express = require("express");
const cors = require("cors");
const { Pool } = require("pg")

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))

const port = 3002;

const openDb = () => {
    const pool = new Pool ({
        user: 'postgres',
        host: 'localhost',
        database: 'todo', 
        password: 'root',
        port: 5432
    });
    return pool;
};

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});

app.get("/", (req, res) => {
    const pool = openDb()

    pool.query('SELECT * FROM task', (error, result) => {
        if (error) {
            return res.status(500).json({ error: error.message })
        }
        res.status(200).json(result.rows);
    })
});

app.post("/new", (req, res) => {
    const pool = openDb()
    console.log("New task:", req.body)

    pool.query('INSERT INTO task (description) VALUES ($1) RETURNING *',
        [req.body.description],
        (error, result) => {
            if(error) {
                console.error("Error adding the task", error.message)
                res.status(500).json({error: error.message})
            } else {
                res.status(200).json({id: result.rows[0].id})
            }
        })
}); 

app.delete('/delete/:id', async(req, res) => {
    const pool = openDb()
    const id = parseInt(req.params.id)
    pool.query('DELETE FROM task WHERE id = $1',
        [id],
        (error, result) => {
            if (error) {
                res.status(500).json({error: error.message})
            } else {
                res.status(200).json({id: id})
            }
        })
})


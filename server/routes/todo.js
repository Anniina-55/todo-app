
const express = require('express')
const { query } = require('../helpers/db.js')

const todoRouter = express.Router()


todoRouter.get('/', async (req, res) => {
    console.log('Fetching task from database:', query)
    try {
        const result = await query('SELECT * FROM task')
        const rows = result.rows ? result.rows : []
        res.status(200).json(rows)
    } catch(error) {
        console.log(error)
        res.statusMessage = error
        res.status(500).json({error: error})
    }
})  

todoRouter.post('/new', async (req, res) => {
    console.log('received POST request:', req.body)
    try {
    const result = await query('INSERT INTO task (description) VALUES ($1) RETURNING *', [req.body.description])
    console.log('result from query:', result)
    if (result.rows.length > 0) {
    res.status(200).json({
        id: result.rows[0].id,
        description: result.rows[0].description
    })
    } else {
        throw new Error('No rows returned after inserting task.')
    }
    } catch (error) {
        console.log('error in POST /new:', error)
        res.statusMessage = error
        res.status(500).json({error: error})
    }
})

todoRouter.delete('/delete/:id', async(req, res) => {
    const id = Number(req.params.id)
    try {
        const result = await query('DELETE FROM task WHERE id = $1', [id])
        res.status(200).json({id: id})
    } catch (error) {
        console.log(error)
        res.statusMessage = error
        res.status(500).json({error: error})
    }
})

module.exports = { todoRouter } 
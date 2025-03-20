const BACKEND_ROOT_URL = 'http://localhost:3002';
import { Todos } from "./Class/Todos.js"


const todos = new Todos(BACKEND_ROOT_URL)

const input = document.querySelector('input'); 
const taskList = document.querySelector('ul');

input.disabled = true;

const renderTask = (task) => {
    const li = document.createElement('li')
    li.setAttribute('class', 'list-group-item')
    li.setAttribute('data-key', task.getId().toString())
    //li.innerHTML = task.getText()
    renderSpan(li, task.getText())
    renderLink(li, task.getId())
    taskList.append(li)
}

const renderSpan = (taskList, text) => {
    const span = taskList.appendChild(document.createElement('span'))
    span.innerHTML = text
}

const renderLink = (taskList, id) => {
    const a = taskList.appendChild(document.createElement('a'))
    a.innerHTML = '<i class="bi bi-trash"></i>'
    a.setAttribute('style', 'float: right')
    
    a.addEventListener('click', (event) => {
        todos.removeTask(id).then((removed_id) => {
            const taskToRemove = document.querySelector(`[data-key='${removed_id}']`)
            console.log(taskToRemove)
            if (taskToRemove && taskList.contains(taskToRemove)) {
                taskList.removeChild(taskToRemove)
            }
        }).catch((error) => {
            alert(error)
        })
    })
}

const getTasks = () => {
    todos.getTasks().then((tasks) => {
        tasks.forEach(task => {
            renderTask(task)
        })
        input.disabled = false
    }).catch((error) => {
        alert(error)
    })

}
const saveTask = async (task) => {
    try {
        const json = JSON.stringify({description: task})
        const response = await fetch(BACKEND_ROOT_URL + '/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        })
        return response.json()
    } catch (error) {
        alert("Error saving task " + error.message)
        }
    }


input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        console.log("enter pressed")
        event.preventDefault()
        const task = input.value.trim()
    
        if (task !== '') {
            todos.addTask(task).then((task) => {
                renderTask(task)
                input.value = ''
                input.focus()
            })
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    getTasks();
});



/*const express = require("express");
const cors = require("cors");
const { Pool } = require("pg")

const app = express();
app.use(cors());
app.use(express.json());
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

    pool.query('INSERT INTO task (description) VALUES ($1) RETURNING *',
        [req.body.description],
        (error, result) => {
            if(error) {
                res.status(500).json({error: error.message})
            } else {
                res.status(200).json({id: result.rows[0].id})
            }
        })
}); 
*/

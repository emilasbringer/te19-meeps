const express = require('express');
const { response } = require('../app');
const router = express.Router();
const pool = require('../database');
/* 
    BASE URL /tasks
    GET / - Get all tasks
    POST / - Create a new task
    GET /:id - Get a task by id
    PUT /:id - Update a task by id
    DELETE /:id - Delete a task by id
*/
router.get('/', async (req, res, next) => {
    await pool.promise()
        .query('SELECT * FROM meeps ORDER BY id DESC')
        .then(([rows, fields]) => {
              res.render('meeps.njk', {
                meeps: rows,
                title: 'Tasks',
                layout: 'layout.njk',
                flash: 'Deleted'
              });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                tasks: {
                    error: 'Error getting tasks'
                }
            })
        });
});

router.post('/', async (req, res, next) => {
    const meep = req.body.meep;
    console.log("MEEP = "+meep);
    await pool.promise()
    .query('INSERT INTO meeps (body) VALUES (?)', [meep])
    .then((response) => {
        console.log(response);
        res.redirect("/meeps");
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            meep: {
                error: 'Error creating new task'
            }
        })
    });
});

router.get('/:id/delete', async (req, res, next) => {
    const id = req.params.id;
    await pool
        .promise()
        .query('DELETE FROM tasks WHERE id = ?', [id])
        .then((response) => {
            if (response[0].affectedRows === 1) {
                req.session.flash = 'Task deleted';
                res.redirect('/tasks');
            } else {
                req.session.flash = 'Task not found';
                res.status(400).redirect('/tasks');
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                task: {
                    error: 'Error getting tasks',
                },
            });
        });
});

module.exports = router;
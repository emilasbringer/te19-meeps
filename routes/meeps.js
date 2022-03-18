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
        .query('SELECT * FROM meeps')
        .then(([rows, fields]) => {
              res.send('showing meeps', {
                tasks: rows,
                title: 'Meeps',
                layout: 'layout.njk',
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

module.exports = router;
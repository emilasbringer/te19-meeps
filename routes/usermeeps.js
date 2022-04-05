const express = require('express');
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
    const name = req.session.loginToken
    await pool.promise()
        .query('SELECT * FROM meeps JOIN users WHERE user_id = users.id AND name = ? ORDER BY created_at DESC', [name])
        .then(([rows, fields]) => {
              res.render('usermeeps.njk', {
                meeps: rows,
                title: 'Meeper',
                layout: 'layout.njk',
                token: req.session.loginToken
              });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                tasks: {
                    error: 'Error getting meeps'
                }
            })
        });
});

router.get('/:id/delete', async (req, res, next) => {
    const id = req.params.id;
    await pool
        .promise()
        .query('DELETE FROM meeps WHERE id = ?', [id])
        .then((response) => {
            if (response[0].affectedRows === 1) {
                return res.redirect('/meeps');
            } else {
                req.session.flash = 'Meep not found';
                return res.status(400).redirect('/meeps');
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                meep: {
                    error: 'Error getting meeps',
                },
            });
        });
});


module.exports = router;
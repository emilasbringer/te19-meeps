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
    await pool.promise()
        .query('SELECT * FROM meeps ORDER BY id DESC')
        .then(([rows, fields]) => {
              res.render('meeps.njk', {
                meeps: rows,
                title: 'Meeper',
                layout: 'layout.njk'
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


router.post('/:id/update', async (req, res, next) => {
    const id = req.params.id;
    const content = req.body.body;

    res.json({id,content});
    console.log(req.body.body);

    /*
    await pool
    .promise()
    .query('UPDATE meeps SET body = "?" WHERE id = ?',[content,id])
    .then(response => {
        res.redirect('/meeps');
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            meep: {
                error: 'Error getting meeps',
            },
        });
    });
    */
});

module.exports = router;
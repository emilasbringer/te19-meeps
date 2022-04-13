const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', async (req, res, next) => {
    await pool.promise()
        .query('SELECT * FROM emlasr_meeps JOIN emlasr_users WHERE user_id = emlasr_users.id ORDER BY created_at DESC')
        .then(([rows, fields]) => {
            res.send(rows);
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

router.get('/body', async (req, res, next) => {
    await pool.promise()
        .query('SELECT * FROM emlasr_meeps JOIN emlasr_users WHERE user_id = emlasr_users.id ORDER BY created_at DESC')
        .then(([rows, fields]) => {
            res.send(rows.body);
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

router.get('/users', async (req, res, next) => {
    await pool.promise()
        .query('SELECT * FROM emlasr_meeps JOIN emlasr_users WHERE user_id = emlasr_users.id ORDER BY created_at DESC')
        .then(([rows, fields]) => {
            res.send(rows.name);
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

module.exports = router;
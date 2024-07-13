const express = require('express');
const pool = require('../server');

const router = express.Router();

// GET all movies
router.get('/movies', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM movies');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET all reviews with movie names
router.get('/movie-reviews', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT reviews.id, movies.name as movie_name, reviews.review
            FROM reviews
            JOIN movies ON reviews.movie_id = movies.id
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST a new movie
router.post('/add-movie', async (req, res) => {
    const { name } = req.body;
    try {
        const result = await pool.query('INSERT INTO movies (name) VALUES ($1) RETURNING *', [name]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE a movie
router.delete('/movie/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM reviews WHERE movie_id = $1', [id]); // Delete associated reviews
        const result = await pool.query('DELETE FROM movies WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

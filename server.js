const express = require('express');
const { Pool } = require('pg');
const movieRoutes = require('./routes/movies');

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'your-username',
    host: 'localhost',
    database: 'movie_db',
    password: 'your-password',
    port: 5432,
});

app.use(express.json());
app.use('/api', movieRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = pool;

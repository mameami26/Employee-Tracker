-- seed_data.sql

\c movie_db

INSERT INTO movies (name) VALUES 
('Inception'), 
('The Matrix'), 
('Interstellar'), 
('The Godfather');

INSERT INTO reviews (movie_id, review) VALUES 
(1, 'Amazing movie!'), 
(2, 'A classic.'), 
(3, 'Mind-blowing!'), 
(4, 'A masterpiece.');

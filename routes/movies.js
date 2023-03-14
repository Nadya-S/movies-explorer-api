const router = require('express').Router();
const { createMovieValidator, idValidator } = require('../validation/validation');
const {
  findAllMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

router.get('/', findAllMovies); // возвращает все сохранённые текущим  пользователем фильмы
router.post('/', createMovieValidator, createMovie); // создаёт фильм
router.delete('/:_id', idValidator, deleteMovieById); // удаляет сохранённый фильм по id

module.exports = router;

const router = require('express').Router();
const authRouter = require('./auth');
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');
const { NotFoundError } = require('../errors/Errors');

router.use('/', authRouter);

router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);
router.use('*', auth, () => {
  throw new NotFoundError('Путь не найден');
});

module.exports = router;

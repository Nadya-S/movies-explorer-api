const conflictMessage = 'Пользователеь с данным email уже существует';
const badRequestMessage = 'Переданы некорректные данные';
const notFoundMovieMessage = 'Фильм с указанным _id не найден';
const notFoundUserMessage = 'Запрашиваемый пользователь не найден';
const notFoundPath = 'Путь не найден';
const forbiddenMessage = 'Невозможно удалить чужой фильм';
const filmDeleted = 'Фильм удален';
const unauthorized = 'Необходима авторизация';
const unauthorizedWrong = 'Неправильные почта или пароль';
const serverErrMessage = 'На сервере произошла ошибка';

module.exports = {
  conflictMessage,
  badRequestMessage,
  notFoundMovieMessage,
  notFoundUserMessage,
  notFoundPath,
  forbiddenMessage,
  filmDeleted,
  unauthorized,
  unauthorizedWrong,
  serverErrMessage,
};

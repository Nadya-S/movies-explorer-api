const { MONGO_DB, JWT_SECRET } = process.env;

module.exports = {
  MONGO_URL: MONGO_DB || 'mongodb://localhost:27017/bitfilmsdb',
  JWT_SECRET_KEY: JWT_SECRET || 'some secret key',
};

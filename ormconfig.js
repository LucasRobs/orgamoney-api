console.log(process.env.DATABASE_URL);
module.exports = {
  type: 'postgres',
  url: HEROKU_POSTGRESQL_GOLD_URL,
  entities: ['dist/models/**/*.js'],
  migrations: ['dist/migrations/**/*.js'],
  cli: {
    migrationsDir: ['src/migrations/'],
    entitiesDir: 'src/models',
  },
};

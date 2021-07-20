module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['dist/models/**/*.js'],
  migrations: ['dist/migrations/**/*.js'],
  cli: {
    migrationsDir: ['src/migrations/'],
    entitiesDir: 'src/models',
  },
};

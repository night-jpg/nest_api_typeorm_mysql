const dotenv = require('dotenv');
const { DataSource } = require('typeorm');

dotenv.config({
    path: process.env.ENV === 'test' ? '.env.test' : '.env'
});

const dataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    migrations: [`${__dirname}/migrations/**/*.ts`]
};

const dataSource = new DataSource(dataSourceOptions);

module.exports = dataSource;
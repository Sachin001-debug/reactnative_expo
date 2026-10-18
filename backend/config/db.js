
const path = require('path');
const { Sequelize } = require('sequelize');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    dialect: 'mysql',
    logging: false,
    dialectOptions:
      process.env.DB_SSL === 'true'
        ? {
            ssl: {
              rejectUnauthorized: true,
            },
          }
        : {},
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL database connected successfully!');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    throw error;
  }
};

module.exports = { sequelize, connectDB };

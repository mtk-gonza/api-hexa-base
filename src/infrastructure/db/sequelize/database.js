import { Sequelize } from 'sequelize';
import settings from '../../../config/settings.js';

const sequelizeOptions = {
    dialect: settings.DB_DIALECT || 'sqlite',
    logging: false
};

if ((settings.DB_DIALECT || 'sqlite') === 'sqlite') {
    sequelizeOptions.storage = settings.DB_STORAGE;
}

export const sequelize = new Sequelize(settings.DATABASE_URL, sequelizeOptions);

export async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log(`✅ Conexión establecida correctamente con ${settings.DB_DIALECT}.`);
    } catch (error) {
        console.error('❌ Error al conectar con la base de datos:', error.message);
    }
}
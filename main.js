import express from 'express';
import cors from 'cors';

import settings from './src/config/settings.js';
import roleRouter from './src/infrastructure/api/routes/role_router.js';
import userRouter from './src/infrastructure/api/routes/user_router.js';
import authRouter from './src/infrastructure/api/routes/auth_router.js';

import { connectDB } from './src/infrastructure/db/sequelize/database.js';
// Inicialización de modelos y asociaciones (sin sync)
import './src/infrastructure/db/sequelize/models/role_model.js';
import './src/infrastructure/db/sequelize/models/user_model.js';
import './src/infrastructure/db/sequelize/models/user_roles_model.js';
import './src/infrastructure/db/sequelize/models/refresh_token_model.js';
import './src/infrastructure/db/sequelize/models/associations.js';

const app = express();

//Settings
app.set('port', settings.PORT);

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/roles', roleRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

const main = () => {
	app.listen(app.get('port'), async () => {
		await connectDB();
		console.log(`Server running http://${settings.HOST}:${settings.PORT}`);
	});  
};

main();
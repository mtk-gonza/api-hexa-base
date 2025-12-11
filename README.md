# API-HEXA-BASE
API de ejemplo para gestión de roles y usuarios. Usando express y sequelize en arquitectura hexagonal.
## 1️⃣ Clonar el proyecto y preparar dependencias
```bash
npm install
```
## 2️⃣ Crear la base de datos (si no existe)
Depende del motor que uses (sqlite, mysql ó postgres…).
MySQL / MariaDB:
```sql
CREATE DATABASE nombre_db;
```
SQLite: simplemente ejecutar la API.
Configurar variables de entorno (DB, usuario, contraseña, host, puerto, etc.)
DB_DIALECT opciones: 'sqlite', 'mysql' o 'postgres…' (sin comillas)
```bash
cp .env.example .env
nano .env
```
# Para tener datos iniciales
## 1️⃣ Ejecutar las migrations
Esto crea las tablas según tu estructura actual.
```bash
npm run migrate
```
Esto aplica todos los archivos en migrations/.
Si ya se aplicaron algunas, Sequelize ignora duplicados.

## 2️⃣ Ejecutar los seeders
Si querés poblar la DB con datos iniciales (roles y usuarios):
```bash
npm run seed
```
Esto corre todos los seeders de ./migrations/seeders/.

## 3️⃣ Verificar
Revisar que las tablas se crearon correctamente.
Revisar que los datos iniciales fueron insertados.

# Para futuros cambios
## 1️⃣ Nueva migration:
```bash
npx sequelize-cli migration:generate --name nombre_migration
```
## 2️⃣ Nuevo seeder:
```bash
npx sequelize-cli seed:generate --name nombre_seeder
```
## 3️⃣ Luego aplicarlos con:
```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

## Notas
- Asegúrate de tener una base de datos configurada y la variable de entorno correspondiente.
- La estructura sigue el patrón hexagonal para facilitar el mantenimiento y escalabilidad.
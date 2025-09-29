import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from './../controllers/user_controller.js'
import { requireAuth, requireRoles } from './../middlewares/auth_middleware.js';
import { RoleType } from './../../../utils/role_type.js';

const router = express.Router();

// Público: listar y obtener por id
router.get('/', getUsers);
router.get('/:id', getUserById);

// Protegido: crear/actualizar/eliminar
router.post('/', requireAuth, createUser);
router.put('/:id', requireAuth, updateUser);
router.delete('/:id', requireAuth, requireRoles('admin', RoleType.ROOT), deleteUser);

export default router;
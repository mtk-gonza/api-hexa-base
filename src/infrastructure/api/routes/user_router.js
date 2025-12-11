import { Router } from 'express';
import * as userController from './../controllers/user_controller.js'
import { requireAuth, requireRoles } from './../middlewares/auth_middleware.js';
import { RoleType } from './../../../utils/role_type.js';

const router = Router();

// Público: listar y obtener por id
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);

// Protegido: crear/actualizar/eliminar
router.post('/', requireAuth, userController.createUser);
router.put('/:id', requireAuth, userController.updateUser);
router.delete('/:id', requireAuth, requireRoles('admin', RoleType.ROOT), userController.deleteUser);

export default router;
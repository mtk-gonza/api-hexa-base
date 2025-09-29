import express from 'express';
import { createRole, getRoles, getRoleById, updateRole, deleteRole } from '../controllers/role_controller.js'
import { requireAuth, requireRoles } from './../middlewares/auth_middleware.js';
import { RoleType } from './../../../utils/role_type.js';


const router = express.Router();

// Público: listar y obtener por id
router.get('/', getRoles);
router.get('/:id', getRoleById);

// Protegido: crear/actualizar/eliminar
router.post('/', requireAuth, requireRoles(RoleType.ROOT, RoleType.ADMIN), createRole);
router.put('/:id', requireAuth, requireRoles(RoleType.ROOT, RoleType.ADMIN), updateRole);
router.delete('/:id', requireAuth, requireRoles(RoleType.ROOT, RoleType.ADMIN), deleteRole);

export default router;
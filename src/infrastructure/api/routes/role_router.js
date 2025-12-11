import { Router } from 'express';
import * as roleController from '../controllers/role_controller.js';
import { requireAuth, requireRoles } from './../middlewares/auth_middleware.js';
import { RoleType } from './../../../utils/role_type.js';

const router = Router();

// Público: listar y obtener por id
router.get('/', roleController.getRoles);
router.get('/:id', roleController.getRoleById);

// Protegido: crear/actualizar/eliminar
router.post('/', requireAuth, requireRoles(RoleType.ROOT, RoleType.ADMIN), roleController.createRole);
router.put('/:id', requireAuth, requireRoles(RoleType.ROOT, RoleType.ADMIN), roleController.updateRole);
router.delete('/:id', requireAuth, requireRoles(RoleType.ROOT, RoleType.ADMIN), roleController.deleteRole);

export default router;
export class UserRoles {
    constructor({ 
        user_id, 
        role_id, 
        created_at = null,
        updated_at = null, 
    }) {
        this.user_id = user_id;
        this.role_id = role_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
};
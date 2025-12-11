export class Role {
    constructor({ 
        id = null, 
        name,
        permission = null, 
        description = null,
        created_at = null,
        updated_at = null, 
    }) {
        this.id = id;
        this.name = name;
        this.permission = permission;
        this.description = description;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
};
export class Role {
    constructor({ 
        id = null, 
        name, 
        description = null,
        created_at = null,
        updated_at = null, 
    }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
};
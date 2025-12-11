export class User {
    constructor({ 
        id = null, 
        email,
        password,
        first_name,
        last_name,
        is_active,
        roles = [],
        created_at = null,
        updated_at = null, 
    }) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.is_active = is_active;
        this.roles = roles;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
};

export class UserView {
    constructor({
        id,
        email,
        first_name,
        last_name,
        roles,        
        created_at,
        updated_at,
    }) {
        this.id = id;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.roles = roles;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
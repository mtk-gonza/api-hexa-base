export class User {
    constructor({ 
        id = null, 
        username, 
        email,
        password,
        first_name,
        last_name,
        phone = null,
        is_active,
        roles = [],
        created_at = null,
        updated_at = null, 
    }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone = phone;
        this.is_active = is_active;
        this.roles = roles;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
};
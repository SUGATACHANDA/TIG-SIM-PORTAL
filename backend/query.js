const db = require('./api/index'); // Your DB connection file

// Create Roles Table
const createRolesTable = `
CREATE TABLE IF NOT EXISTS roles (
    master_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    features TEXT
)`;

// Add role_id to Users Table
const alterUsersTable = `
ALTER TABLE users ADD COLUMN role_id INT,
ADD FOREIGN KEY (role_id) REFERENCES roles(master_id)
`;

// Insert Roles
const insertRoles = `
INSERT INTO roles (role_name) VALUES
('Admin'),
('MD'),
('Principal'),
('Dean'),
('Hod'),
('Faculty')
`;

// Execute Queries
db.query(createRolesTable, (err) => {
    if (err) throw err;
    console.log('Roles Table Created');

    db.query(alterUsersTable, (err) => {
        if (err) console.log('Users Table already altered');
        else console.log('Users Table Altered');

        db.query(insertRoles, (err) => {
            if (err) console.log('Roles already inserted');
            else console.log('Roles Inserted');
        });
    });
});

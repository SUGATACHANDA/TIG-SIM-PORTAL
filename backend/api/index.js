require("dotenv").config();
const express = require('express');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const authenticateToken = require("../middleware/authemticateToken")
// const createRolesAndUsers = require('../query');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const corsOptions = {
    origin: 'https://tigsimportal.vercel.app',
    // origin: 'http://192.168.1.8:3000',
    // origin: 'http://172.30.192.1:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow cookies and credentials
    allowedHeaders: ['Content-Type', 'Authorization'], // explicitly allow headers
    optionsSuccessStatus: 204 // some legacy browsers choke on 204
};

const app = express();
app.use(cors(corsOptions));
app.options('*', cors(corsOptions))
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add fallback CORS headers
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "https://tigsimportal.vercel.app");
//     // res.header("Access-Control-Allow-Origin", "http://192.168.1.8:3000");
//     // res.header("Access-Control-Allow-Origin", "http://172.30.192.1:3000");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     if (req.method === "OPTIONS") {
//         res.sendStatus(204); // Respond to preflight requests
//     } else {
//         next();
//     }
// });

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 100000,
})

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(200) NOT NULL UNIQUE,
        otp VARCHAR(6),
        otpExpires DATETIME,
        otp_verified BOOLEAN DEFAULT FALSE
    )`;

// const predefineEmailAddress = [
//     ["scbabai2704@gmail.com"],
//     ["sugatachanda.cse2022@nsec.ac.in"],
//     ["kallol.bhattacharya@nsec.ac.in"]
// ]
db.query(createTableQuery, (err) => {
    if (err) {
        console.log("Error creating table:", err);
    }
    else {
        console.log("User table already exists or created successfully");

        // db.query("INSERT IGNORE INTO users (email) VALUES ?", [predefineEmailAddress], (err, result) => {
        //     if (err) {
        //         console.log("Error inserting predefined email addresses:", err);
        //     }
        //     else {
        //         console.log("Predefined email addresses inserted successfully");
        //     }
        // })
    }
})

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
INSERT INTO roles (master_id, role_name) VALUES
(NULL, 'Admin'),
(1, 'MD'),
(2, 'Principal'),
(3, 'Dean'),
(4, 'HOD'),
(5, 'Faculty');
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

const insertUsersQuery = `
INSERT IGNORE INTO users (name, email, mobile, role, role_id) VALUES
('sugata chanda', 'sugatachanda.cse2022@nsec.ac.in', '9748278005', 'user', 1),
('SUGATA CHANDA', 'scbabai2704@gmail.com', '8888888888', 'admin', 2),
('Kallol Bhattacharya', 'kallol.bhattacharya@nsec.ac.in', '7777777777', 'principal', 3),
('Sugata Chanda', 'sugatachanda27@gmail.com', '7777777777', 'hod', 4)
`;

db.query(insertUsersQuery, (err, result) => {
    if (err) {
        console.error("Error inserting predefined users:", err);
    } else {
        console.log("Predefined users inserted successfully.");
    }
});


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

app.post('/send-otp', (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });

        if (result.length === 0) {
            return res.status(404).json({ message: "Email not found" });
        }

        const otp = generateOTP()

        let template = fs.readFileSync(path.join(__dirname, 'otp_template.html'), 'utf-8');
        template = template.replace('{{OTP}}', otp, '{{email}}', email);

        const otpExpires = new Date(Date.now() + 5 * 60 * 1000)

        db.query("UPDATE users SET otp = ?, otp_expires = ?  WHERE email = ?", [otp, otpExpires, email], (err) => {
            if (err) return res.status(500).json({ message: err.message });
            const mailOptions = {
                from: `"Techno India Group" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: "OTP for Login",
                text: `Your OTP for login is ${otp}. It will expire in 5 minutes.`,
                html: template
            }

            transporter.sendMail(mailOptions, (err) => {
                if (err) return res.status(500).json({ message: err.message });
                res.json({ message: "OTP sent successfully" })
            })
        })
    })
})

app.post("/verify-otp", (req, res) => {
    const { email, otp } = req.body;

    if (!otp) {
        return res.status(400).json({ message: "Email and OTP are required" });
    }

    const query = `SELECT id, name, email, mobile, role_id, otp, otp_expires FROM users WHERE email = ?`;
    db.query(query, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }

        if (!results || results.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }

        const { otp: storedOTP, otp_expires } = results[0];

        if (!storedOTP) {
            return res.status(400).json({ message: "No OTP found. Request a new OTP." });
        }

        // if (otp_verified) {
        //     return res.status(400).json({ message: "OTP already verified. Please request a new OTP." });
        // }

        if (otp !== storedOTP) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (otp_expires && new Date() > new Date(otp_expires)) {
            return res.status(400).json({ message: "OTP expired. Request a new OTP." });
        }

        const userData = {
            id: results[0].id,
            name: results[0].name,
            email: results[0].email,
            mobile: results[0].mobile,
            role_id: results[0].role_id
        };

        const token = jwt.sign({ userData }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log("Fetched User Data:", userData);

        res.json({
            success: true, message: "OTP verified successfully", token: token
        });
    });
});

app.delete("/delete-user", (req, res) => {
    const { email } = req.body; // Get email from request body

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const query = `DELETE FROM users WHERE email = ?`;

    db.query(query, [email], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ success: true, message: "User deleted successfully" });
    });
});

app.post('/logout', (req, res) => {
    const { email } = req.body;

    console.log("Auto Logout Triggered for:", email);

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const sql = `UPDATE users 
                 SET otp = NULL, 
                     otp_verified = FALSE 
                 WHERE email = ?`;

    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error("DB Error:", err);
            return res.status(500).json({ message: "Database Error" });
        }

        res.json({ message: "User Logged Out Successfully. OTP Cleared." });
    });
});

app.post('/request-edit', (req, res) => {
    const { email, request } = req.body;

    if (!email || !request) {
        return res.status(400).json({ message: "Email and Request are required" });
    }

    let request_template = fs.readFileSync(path.join(__dirname, 'request_edit_template.html'), 'utf-8');

    // Replace placeholders in template
    request_template = request_template.replace('{{email}}', email).replace('{{request}}', request);

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, // Admin Email
        subject: 'Edit Profile Request',
        text: `Request from: ${email}\n\nRequest Details:\n${request}`,
        html: request_template
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Failed to send request" });
        }
        res.json({ message: "Request sent successfully" });
    });
});

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token Expired' });
        req.user = user;
        next();
    });
};

app.post("/verify-token", (req, res) => {
    const token = req.body.token;

    if (!token) {
        return res.status(401).json({ message: "Token is required" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid or Expired Token" });
        }

        const userId = decoded.userData.id;

        const query = `
            SELECT users.id, users.name, users.email, users.mobile, roles.role_name, roles.features
            FROM users 
            JOIN roles ON users.role_id = roles.master_id
            WHERE users.id = ?
        `;

        db.query(query, [userId], (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Database Error", error: err });
            }

            if (!results || results.length === 0) {
                return res.status(404).json({ message: "User Not Found" });
            }

            res.json({
                success: true,
                user: results[0]
            });
        });
    });
});

app.get("/", (req, res) => {
    res.send("TIG SIM PORTAL BACKEND");
});

app.get("/protected", authenticateToken, (req, res) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({ message: "No token provided" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Invalid token" });
        res.json({ message: "Protected data accessed", user: decoded.email });
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
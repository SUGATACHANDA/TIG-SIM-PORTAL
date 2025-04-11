FOR CORS OPTIONS CHANGE THE FOLLOWING IN BACKEND/API/INDEX.JS FILE:

const corsOptions = {
// origin: 'https://tigsimportal.vercel.app', --- THIS IS FOR LIVE URL
origin: 'http://192.168.1.8:3000',---- THIS IS FOR LOCALHOST(USE NETWORK ID IN CMD)
methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
credentials: true, // allow cookies and credentials
allowedHeaders: ['Content-Type', 'Authorization'], // explicitly allow headers
optionsSuccessStatus: 204 // some legacy browsers choke on 204
};

app.use((req, res, next) => {
// res.header("Access-Control-Allow-Origin", "https://tigsimportal.vercel.app");--- THIS IS FOR LIVE URL
res.header("Access-Control-Allow-Origin", "http://192.168.1.8:3000"); ---- THIS IS FOR LOCALHOST(USE NETWORK ID IN CMD)
res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
if (req.method === "OPTIONS") {
res.sendStatus(204); // Respond to preflight requests
} else {
next();
}
});

CHANGE THE FOLLOWING IN FRONTEND/SRC/API.JS FILE:
// const API_URL = "https://tig-sim-portal-backend.vercel.app"; --- THIS IS FOR LIVE BACKEND URL
const API_URL = "http://localhost:5000"; --- THIS IS FOR LOCALHOST DEVELOPMENT

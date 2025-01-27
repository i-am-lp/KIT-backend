import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import loginRouter from './routes/login-router.js'
import updateRouter from './routes/update-router.js'

dotenv.config();

const app = express();
const port = process.env.PORT || process.argv[2] || 8080;


app.use(cors()); 
app.use(express.json());

app.get('/', (_req, res) => {
    res.send('This is the home route');
});

app.get('/api', (_req, res) => {
    res.json({ message: 'Welcome to KIT' });
});
  
app.use("/api", loginRouter);

app.use("/api/update", updateRouter);

app.use("/uploads", express.static("uploads"));


app.listen(port, () => console.log(`Listening on ${port}`));
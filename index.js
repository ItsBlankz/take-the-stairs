// import supabase from './config/supabaseConfig.js';
import express, { urlencoded } from 'express';
import passport from './controllers/authController.js';
import session from 'express-session';
import dotenv from 'dotenv'

dotenv.config()

// Import Routes
import authRouter from './routes/authRoutes.js';
import landingRouter from './routes/landing.js';
import srnRouter from './routes/srnForm.js'
import profileRouter from './routes/profile.js'
import eventsRouter from './routes/events.js'

const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static("public"))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 48 * 60 * 60 * 1000,
        secure: false,
        httpOnly: true,
        sameSite: 'lax'
    }
}));

app.use(passport.initialize())
app.use(passport.session());

app.use('/api/auth/google', authRouter);
app.use('/', landingRouter);
app.use('/', srnRouter);
app.use('/', profileRouter);
app.use('/', eventsRouter)

app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.render("index")
    } else {
        res.redirect('/landing');
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running');
});

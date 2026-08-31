import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const ENV = (process.env.NODE_ENV || 'development').toLowerCase();

// Make environment globally accessible in all EJS templates
app.locals.env = ENV;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Root route
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Irena Website',
    env: ENV
  });
});

// Wildcard / catch-all route renders Irena Website
app.use((req, res) => {
  res.render('index', {
    title: 'Irena Website',
    env: ENV
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running in [${ENV}] mode on http://localhost:${PORT}`);
  });
}

export default app;

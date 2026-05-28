const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const { attachRequestContext, requireJsonBody } = require('./middleware/requestMiddleware');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const defaultOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:4173',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'http://127.0.0.1:5175',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:4173',
  'https://math-point-app.onrender.com',
  'https://mathspoint-client.onrender.com',
  'https://mathspoint-app.onrender.com',
  'https://mathspoint.onrender.com',
  'https://mathspoint-yqnv.onrender.com',
  'capacitor://localhost',
  'http://localhost',
  'https://localhost',
];

const effectiveOrigins = allowedOrigins.length === 0 ? defaultOrigins : [...new Set([...allowedOrigins, ...defaultOrigins])];

const isAllowedOrigin = (origin) => {
  if (!origin || effectiveOrigins.includes('*')) {
    return true;
  }

  if (effectiveOrigins.includes(origin)) {
    return true;
  }

  try {
    const parsed = new URL(origin);
    const hostname = parsed.hostname.toLowerCase();

    // Mobile WebViews and live-reload builds can use varying localhost ports.
    if (['localhost', '127.0.0.1'].includes(hostname)) {
      return ['http:', 'https:'].includes(parsed.protocol);
    }

    if (parsed.protocol === 'capacitor:') {
      return hostname === 'localhost';
    }
  } catch (_error) {
    return false;
  }

  return false;
};

const corsOptions = {
  origin(origin, callback) {
    // Allow tools like Postman and same-origin server requests.
    if (!origin) {
      return callback(null, true);
    }

    if (isAllowedOrigin(origin)) {
      return callback(null, true);
    }

    console.warn(`CORS blocked origin: ${origin}`);
    return callback(null, false);
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Session-Token', 'idempotency-key'],
};

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX) || 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: Number(process.env.AUTH_RATE_LIMIT_MAX) || 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many authentication attempts. Please try again later.' },
});

// Middleware
app.set('trust proxy', 1);
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://www.youtube.com", "https://s.ytimg.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "blob:", "https://i.ytimg.com", "https://img.youtube.com", "https://*.googleusercontent.com"],
      frameSrc: ["'self'", "https://www.youtube.com", "https://youtube.com", "https://www.youtube-nocookie.com"],
      frameAncestors: ["'self'", ...effectiveOrigins],
      childSrc: ["'self'", "https://www.youtube.com", "https://youtube.com", "https://www.youtube-nocookie.com"],
      connectSrc: ["'self'", "https://www.youtube.com", "https://*.googleapis.com"],
      mediaSrc: ["'self'", "https://www.youtube.com"],
    },
  },
  frameguard: false,
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));
app.use(cors(corsOptions));
app.use(express.json());
app.use(requireJsonBody);
app.use(attachRequestContext);
app.use(apiLimiter);
app.use('/uploads', express.static('uploads')); // For serving uploaded files

// Import Routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes');
const parentRoutes = require('./routes/parentRoutes');
const publicRoutes = require('./routes/publicRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const sessionRoutes = require('./routes/sessionRoutes');

// Mount Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/parent', parentRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api', lessonRoutes);
app.use('/api/session', sessionRoutes);

// Base Route
app.get('/', (req, res) => {
  res.send('Maths Point API is running...');
});

app.use(notFound);
app.use(errorHandler);

if (!MONGO_URI) {
  console.error('Missing MONGO_URI in environment variables.');
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error('Missing JWT_SECRET in environment variables.');
  process.exit(1);
}

if (!process.env.VIDEO_ENCRYPTION_KEY || process.env.VIDEO_ENCRYPTION_KEY.length !== 64) {
  console.warn('WARNING: VIDEO_ENCRYPTION_KEY is missing or invalid (must be 64 hex chars). Video lessons will not work.');
}

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Rate limit memory cleared on last restart

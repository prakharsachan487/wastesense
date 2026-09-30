const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));

// API Routes
app.use('/api', apiRoutes);

// Status check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'Smart Waste Intelligence Platform API',
    timestamp: new Date().toISOString()
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[SWIP-API] Backend server running on http://localhost:${PORT}`);
  });
}

module.exports = app;

const fs = require('fs');
const path = require('path');

const seedPath = path.join(__dirname, '../../database/seed_data.json');
let dataStore = JSON.parse(fs.readFileSync(seedPath, 'utf8'));

exports.getAllBins = (req, res) => {
  res.json({ success: true, count: dataStore.bins.length, data: dataStore.bins });
};

exports.getBinById = (req, res) => {
  const bin = dataStore.bins.find(b => b.id.toLowerCase() === req.params.id.toLowerCase());
  if (!bin) return res.status(404).json({ success: false, message: 'Bin not found' });
  res.json({ success: true, data: bin });
};

exports.updateTelemetry = (req, res) => {
  const { bin_id, fill_level, weight_kg, temperature_c } = req.body;
  const binIndex = dataStore.bins.findIndex(b => b.id.toLowerCase() === bin_id.toLowerCase());
  if (binIndex === -1) return res.status(404).json({ success: false, message: 'Bin not found' });

  const bin = dataStore.bins[binIndex];
  if (fill_level !== undefined) bin.fill_level = fill_level;
  if (weight_kg !== undefined) bin.weight_kg = weight_kg;
  if (temperature_c !== undefined) bin.temperature_c = temperature_c;

  // Re-evaluate status
  if (bin.fill_level >= 90 || bin.temperature_c >= 50) {
    bin.status = 'CRITICAL';
    bin.predicted_overflow = 'Critical overflow imminent (< 30 mins)';
  } else if (bin.fill_level >= 70) {
    bin.status = 'WARNING';
    bin.predicted_overflow = 'Moderate risk (< 3 hrs)';
  } else {
    bin.status = 'NORMAL';
    bin.predicted_overflow = 'Low risk (> 12 hrs)';
  }

  // Recalculate critical bins KPI
  dataStore.system_metrics.critical_bins_count = dataStore.bins.filter(b => b.status === 'CRITICAL').length;

  res.json({
    success: true,
    message: `Telemetry updated for ${bin.id}`,
    data: bin,
    metrics: dataStore.system_metrics
  });
};

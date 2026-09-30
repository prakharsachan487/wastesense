const fs = require('fs');
const path = require('path');

const seedPath = path.join(__dirname, '../../database/seed_data.json');
let dataStore = JSON.parse(fs.readFileSync(seedPath, 'utf8'));

exports.getAllComplaints = (req, res) => {
  res.json({ success: true, count: dataStore.complaints.length, data: dataStore.complaints });
};

exports.createComplaint = (req, res) => {
  const { category, description, location_name, latitude, longitude, photo_url } = req.body;
  const ticket_id = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;

  const newComplaint = {
    ticket_id,
    category: category || 'General waste report',
    description: description || 'Citizen reported issue',
    location_name: location_name || 'City Center Area',
    latitude: latitude || 28.6139,
    longitude: longitude || 77.2090,
    status: 'Submitted',
    assigned_to: 'Pending Dispatch Review',
    created_at: 'Just now'
  };

  dataStore.complaints.unshift(newComplaint);
  dataStore.system_metrics.open_complaints_count += 1;

  res.status(201).json({
    success: true,
    message: 'Complaint submitted successfully',
    ticket_id,
    data: newComplaint
  });
};

exports.trackComplaint = (req, res) => {
  const { ticket_id } = req.params;
  const complaint = dataStore.complaints.find(c => c.ticket_id.toUpperCase() === ticket_id.toUpperCase());
  if (!complaint) return res.status(404).json({ success: false, message: 'Ticket ID not found' });
  res.json({ success: true, data: complaint });
};

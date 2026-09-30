const fs = require('fs');
const path = require('path');

const seedPath = path.join(__dirname, '../../database/seed_data.json');
let dataStore = JSON.parse(fs.readFileSync(seedPath, 'utf8'));

let tasks = [
  {
    id: "TSK-301",
    bin_id: "B-102",
    title: "Urgent Collection: Bin B-102 (Central Market)",
    priority: "CRITICAL",
    priority_score: 94,
    worker_id: "W-01",
    worker_name: "Rahul Sharma",
    vehicle_id: "Truck #04",
    status: "Assigned",
    location: "Central Market, Sector 12",
    created_at: "10 mins ago"
  }
];

exports.getAllTasks = (req, res) => {
  res.json({ success: true, count: tasks.length, data: tasks });
};

exports.createTask = (req, res) => {
  const { bin_id, priority, priority_score, worker_id } = req.body;
  const taskId = `TSK-${Math.floor(100 + Math.random() * 900)}`;

  const newTask = {
    id: taskId,
    bin_id: bin_id || 'B-102',
    title: `Collection Order: Bin ${bin_id || 'B-102'}`,
    priority: priority || 'HIGH',
    priority_score: priority_score || 85,
    worker_id: worker_id || 'W-01',
    worker_name: 'Rahul Sharma',
    vehicle_id: 'Truck #04',
    status: 'Assigned',
    location: 'Central Market, Sector 12',
    created_at: 'Just now'
  };

  tasks.unshift(newTask);
  res.status(201).json({ success: true, data: newTask });
};

exports.completeTask = (req, res) => {
  const { id } = req.params;
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

  task.status = 'Completed';
  task.completed_at = new Date().toISOString();
  task.proof_submitted = true;

  // Flush associated bin back to normal fill level (e.g. 18%)
  const bin = dataStore.bins.find(b => b.id.toLowerCase() === task.bin_id.toLowerCase());
  if (bin) {
    bin.fill_level = 18;
    bin.weight_kg = 1.4;
    bin.status = 'NORMAL';
    bin.predicted_overflow = 'Normal capacity';
    bin.last_collection = 'Just now';
  }

  // Update System metrics
  dataStore.system_metrics.pickups_today_count += 1;
  dataStore.system_metrics.critical_bins_count = dataStore.bins.filter(b => b.status === 'CRITICAL').length;

  res.json({
    success: true,
    message: `Task ${id} completed and Bin ${task.bin_id} flushed to baseline.`,
    task,
    bin,
    metrics: dataStore.system_metrics
  });
};

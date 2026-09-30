/**
 * Smart Waste Intelligence Platform (SWIP)
 * Core Application Controller
 */

class SmartWasteApp {
  constructor() {
    this.data = SWIP_DATA;
    this.map = null;
    this.mapMarkers = [];
    this.activeSimBin = "B-102";
    this.selectedClassifier = "plastic_bottle";
    this.init();
  }

  init() {
    this.bindNavigation();
    this.initMap();
    this.renderKPIs();
    this.renderBins();
    this.renderActivityStream();
    this.renderComplaints();
    this.renderTimeline("TKT-8901");
    this.renderPickupRequests();
    this.renderAIPriority();
    this.testClassifier(this.selectedClassifier);
    this.renderWorkerPortal();
    this.renderAdminFleet();
    this.populateSimBinSelect();
  }

  // 1. NAVIGATION
  bindNavigation() {
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        document.querySelectorAll('.tab-content').forEach(section => {
          section.classList.remove('active');
        });
        const activeSection = document.getElementById(`tab-${target}`);
        if (activeSection) {
          activeSection.classList.add('active');
          if (target === 'dashboard' && this.map) {
            setTimeout(() => this.map.invalidateSize(), 200);
          }
        }
      });
    });
  }

  // 2. LEAFLET MAP INITIALIZATION
  initMap() {
    if (!document.getElementById('operational-map')) return;
    try {
      this.map = L.map('operational-map').setView([28.6145, 27.2100], 14);
      // Fallback coordinate centering
      this.map.setView([28.6145, 77.2100], 14);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors | SWIP Digital Twin',
        maxZoom: 18
      }).addTo(this.map);

      this.updateMapMarkers();
    } catch (e) {
      console.warn("Leaflet map initialization warning:", e);
    }
  }

  updateMapMarkers() {
    if (!this.map) return;
    this.mapMarkers.forEach(m => this.map.removeLayer(m));
    this.mapMarkers = [];

    // Add smart bins
    this.data.bins.forEach(bin => {
      const color = bin.status === 'CRITICAL' ? '#ef4444' : bin.status === 'WARNING' ? '#f59e0b' : '#10b981';
      const circle = L.circleMarker([bin.latitude, bin.longitude], {
        radius: bin.status === 'CRITICAL' ? 10 : 8,
        fillColor: color,
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.85
      }).addTo(this.map);

      circle.bindPopup(`
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; color: #111;">
          <strong style="color: ${color}; font-size: 14px;">${bin.name}</strong><br>
          <b>Fill Level:</b> ${bin.fill_level}% (${bin.status})<br>
          <b>Weight:</b> ${bin.weight_kg} kg | <b>Temp:</b> ${bin.temperature_c}°C<br>
          <b>Prediction:</b> ${bin.predicted_overflow}<br>
          <button style="margin-top: 6px; padding: 4px 8px; background: #0284c7; color: #fff; border: none; border-radius: 4px; cursor: pointer;" onclick="app.quickSimulate('${bin.id}')">Simulate Telemetry</button>
        </div>
      `);
      this.mapMarkers.push(circle);
    });

    // Add Hotspots
    this.data.hotspots.forEach(h => {
      const hotspotCircle = L.circle([h.lat, h.lng], {
        radius: 120,
        fillColor: '#8b5cf6',
        color: '#7c3aed',
        weight: 1.5,
        opacity: 0.7,
        fillOpacity: 0.25
      }).addTo(this.map);

      hotspotCircle.bindPopup(`
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; color: #111;">
          <strong style="color: #7c3aed;">📍 Hotspot: ${h.name}</strong><br>
          <b>Incidents Reported:</b> ${h.incidents}<br>
          <b>Severity:</b> ${h.severity} Clustering
        </div>
      `);
      this.mapMarkers.push(hotspotCircle);
    });
  }

  // 3. RENDER KPIS
  renderKPIs() {
    const criticalCount = this.data.bins.filter(b => b.status === 'CRITICAL').length;
    document.getElementById('kpi-critical-bins').innerText = criticalCount;
    document.getElementById('kpi-open-complaints').innerText = this.data.system_metrics.open_complaints_count;
    document.getElementById('kpi-pickups-today').innerText = this.data.system_metrics.pickups_today_count;
    document.getElementById('kpi-hotspots').innerText = this.data.hotspots.length;
  }

  // 4. RENDER BINS FLEET
  renderBins() {
    const container = document.getElementById('bins-fleet-grid');
    if (!container) return;

    container.innerHTML = this.data.bins.map(bin => {
      const isCritical = bin.status === 'CRITICAL';
      const isWarning = bin.status === 'WARNING';
      const statusClass = isCritical ? 'critical' : isWarning ? 'warning' : 'normal';
      const badgeClass = isCritical ? 'badge-red' : isWarning ? 'badge-yellow' : 'badge-green';

      return `
        <div class="bin-card ${isCritical ? 'critical' : ''}">
          <div class="bin-card-header">
            <div>
              <div class="bin-id-title">${bin.id} &bull; ${bin.name.split('(')[1] ? bin.name.split('(')[1].replace(')', '') : bin.name}</div>
              <div class="bin-zone-subtitle">${bin.zone}</div>
            </div>
            <span class="badge ${badgeClass}">${bin.status}</span>
          </div>

          <div style="display: flex; justify-content: space-between; font-size: 0.8rem;">
            <span>Fill Capacity</span>
            <strong class="${isCritical ? 'text-red' : ''}">${bin.fill_level}%</strong>
          </div>
          <div class="fill-bar-wrapper">
            <div class="fill-bar ${statusClass}" style="width: ${bin.fill_level}%;"></div>
          </div>

          <div class="bin-telemetry-meta">
            <div class="meta-item">
              <span>Weight:</span>
              <strong>${bin.weight_kg} kg</strong>
            </div>
            <div class="meta-item">
              <span>Internal Temp:</span>
              <strong>${bin.temperature_c}°C</strong>
            </div>
            <div class="meta-item">
              <span>Battery:</span>
              <strong>${bin.battery_pct}%</strong>
            </div>
            <div class="meta-item">
              <span>Last Serviced:</span>
              <strong style="font-size: 0.72rem;">${bin.last_collection}</strong>
            </div>
          </div>

          <div style="font-size: 0.75rem; color: var(--text-dim); margin-bottom: 0.85rem;">
            🔮 <b>AI Prediction:</b> ${bin.predicted_overflow}
          </div>

          <button class="btn-bin-action" onclick="app.quickSimulate('${bin.id}')">
            🎛️ Simulate Sensor Reading
          </button>
        </div>
      `;
    }).join('');
  }

  // 5. ACTIVITY STREAM
  renderActivityStream() {
    const stream = document.getElementById('live-activity-stream');
    if (!stream) return;

    const events = [
      { type: 'critical', text: 'IoT Telemetry: Bin B-102 reached 94% fill in Central Market', time: '2m ago' },
      { type: 'warning', text: 'AI Dispatch: Suggested dynamic reroute for Vehicle #04', time: '8m ago' },
      { type: 'success', text: 'Worker Rahul Sharma verified collection for Bin B-108 (Heritage Park)', time: '14m ago' },
      { type: 'critical', text: 'Citizen Complaint TKT-8901 lodged: Overflowing bin at Sector 12', time: '45m ago' },
      { type: 'success', text: 'Scheduled bulk commercial collection executed at Tech Park', time: '1h ago' }
    ];

    stream.innerHTML = events.map(e => `
      <div class="activity-item ${e.type}">
        <p>${e.text}</p>
        <span class="activity-item-time">${e.time}</span>
      </div>
    `).join('');
  }

  // 6. COMPLAINTS & CITIZEN PORTAL
  renderComplaints() {
    const list = document.getElementById('recent-complaints-list');
    if (!list) return;

    list.innerHTML = this.data.complaints.map(c => `
      <div class="activity-item" style="margin-bottom: 0.65rem; cursor: pointer;" onclick="app.loadTicket('${c.ticket_id}')">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
          <strong style="color: var(--primary);">${c.ticket_id} &bull; ${c.category}</strong>
          <span class="badge ${c.status === 'Resolved' ? 'badge-green' : c.status === 'Assigned' ? 'badge-cyan' : 'badge-yellow'}">${c.status}</span>
        </div>
        <p style="font-size: 0.8rem; color: var(--text-muted);">${c.description}</p>
        <span class="activity-item-time">📍 ${c.location_name} &bull; ${c.created_at}</span>
      </div>
    `).join('');
  }

  renderTimeline(ticketId) {
    const container = document.getElementById('ticket-timeline-display');
    if (!container) return;

    const ticket = this.data.complaints.find(c => c.ticket_id === ticketId) || this.data.complaints[0];
    const steps = ['Submitted', 'Reviewed', 'Assigned', 'In Progress', 'Resolved'];
    const currentIndex = steps.indexOf(ticket.status);

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span style="font-size: 0.75rem; color: var(--text-dim);">ACTIVE TICKET</span>
          <h4 style="color: #fff; font-size: 1.05rem;">${ticket.ticket_id}: ${ticket.category}</h4>
          <p style="font-size: 0.8rem; color: var(--text-muted);">Assigned To: <strong>${ticket.assigned_to}</strong></p>
        </div>
        <span class="badge badge-cyan">${ticket.status}</span>
      </div>

      <div class="timeline-steps">
        ${steps.map((step, idx) => {
          const isDone = idx < currentIndex;
          const isActive = idx === currentIndex;
          return `
            <div class="timeline-step ${isDone ? 'completed' : ''} ${isActive ? 'active' : ''}">
              <div class="step-circle">${isDone ? '✓' : idx + 1}</div>
              <div class="step-label">${step}</div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  searchTicket() {
    const input = document.getElementById('track-ticket-input').value.trim();
    if (!input) return;
    this.renderTimeline(input);
  }

  loadTicket(ticketId) {
    document.getElementById('track-ticket-input').value = ticketId;
    this.renderTimeline(ticketId);
  }

  handleCitizenReport(e) {
    e.preventDefault();
    const category = document.getElementById('report-category').value;
    const location = document.getElementById('report-location').value;
    const desc = document.getElementById('report-description').value;
    const ticketId = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;

    const newTicket = {
      ticket_id: ticketId,
      category,
      description: desc,
      location_name: location,
      status: 'Submitted',
      assigned_to: 'Sanitation Dispatch Review',
      created_at: 'Just now'
    };

    this.data.complaints.unshift(newTicket);
    this.data.system_metrics.open_complaints_count += 1;
    this.renderKPIs();
    this.renderComplaints();
    this.loadTicket(ticketId);

    this.showToast(`Ticket ${ticketId} created! Status: Submitted.`, 'success');
  }

  handlePhotoPreview(event) {
    const file = event.target.files[0];
    if (file) {
      const previewArea = document.getElementById('upload-preview-area');
      previewArea.innerHTML = `
        <span class="icon">✅</span>
        <p>Evidence Attached: ${file.name}</p>
        <small class="text-emerald">Photo verified by client preview</small>
      `;
    }
  }

  // 7. PICKUP REQUESTS
  renderPickupRequests() {
    const tbody = document.getElementById('pickup-requests-tbody');
    if (!tbody) return;

    tbody.innerHTML = this.data.pickup_requests.map(r => `
      <tr>
        <td><strong>${r.id}</strong></td>
        <td>${r.customer}</td>
        <td><span class="badge badge-outline">${r.type}</span></td>
        <td>${r.window}</td>
        <td>${r.unit}</td>
        <td><span class="badge ${r.status === 'Confirmed' ? 'badge-green' : 'badge-yellow'}">${r.status}</span></td>
        <td><button class="btn btn-outline" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;">View Route</button></td>
      </tr>
    `).join('');
  }

  // 8. AI INSIGHTS & PRIORITY (Screen D)
  renderAIPriority() {
    const tbody = document.getElementById('ai-priority-tbody');
    if (!tbody) return;

    // Calculate priority ranking dynamically
    const sorted = [...this.data.bins].sort((a, b) => b.fill_level - a.fill_level);

    tbody.innerHTML = sorted.map((bin, index) => {
      // Priority formula:
      // Fill (35%) + Predicted Overflow (25%) + Complaints (15%) + Time (15%) + Location Risk (10%)
      const fillPart = (bin.fill_level / 100) * 35;
      const overflowPart = bin.fill_level >= 90 ? 25 : bin.fill_level >= 75 ? 18 : 6;
      const complaintsPart = bin.id === 'B-102' ? 14 : 6;
      const timePart = 12;
      const riskPart = bin.zone.includes('Commercial') ? 10 : 5;
      const score = Math.round(fillPart + overflowPart + complaintsPart + timePart + riskPart);

      const isCritical = score >= 85;

      return `
        <tr>
          <td><strong>#${index + 1}</strong></td>
          <td>
            <strong>${bin.id}</strong> - ${bin.name.split('(')[1] ? bin.name.split('(')[1].replace(')', '') : bin.zone}
          </td>
          <td><strong class="${bin.fill_level >= 90 ? 'text-red' : ''}">${bin.fill_level}%</strong></td>
          <td>${bin.id === 'B-102' ? '2 Reports' : '0 Reports'}</td>
          <td>
            <span class="kpi-value ${isCritical ? 'text-red' : 'text-amber'}" style="font-size: 1.15rem;">${score}/100</span>
          </td>
          <td>
            <span class="badge ${isCritical ? 'badge-red' : 'badge-yellow'}">
              ${isCritical ? 'Immediate Dispatch' : 'Monitor Hourly'}
            </span>
          </td>
          <td>
            ${isCritical ? 'Rahul Sharma (Truck #04)' : 'Zone Route #2'}
          </td>
        </tr>
      `;
    }).join('');
  }

  testClassifier(itemKey) {
    this.selectedClassifier = itemKey;
    const item = this.data.classifier_items[itemKey];
    if (!item) return;

    // Update buttons
    document.querySelectorAll('.classifier-item-btn').forEach(btn => btn.classList.remove('active'));
    event && event.target && event.target.classList && event.target.classList.add('active');

    const resultBox = document.getElementById('classifier-result-box');
    if (!resultBox) return;

    resultBox.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
        <h4 style="color: #fff; font-size: 0.95rem;">${item.name}</h4>
        <span class="badge" style="background: ${item.color}33; color: ${item.color}; border: 1px solid ${item.color};">
          Confidence: ${item.confidence}
        </span>
      </div>
      <p style="font-size: 0.8rem; margin-bottom: 0.4rem;">
        <b>Recommended Receptacle:</b> <span style="color: ${item.color}; font-weight: 700;">${item.bin}</span>
      </p>
      <p style="font-size: 0.78rem; color: var(--text-muted); background: rgba(0,0,0,0.3); padding: 0.5rem; border-radius: 6px;">
        💡 <b>Segregation Tip:</b> ${item.instructions}
      </p>
    `;
  }

  // 9. WORKER PORTAL (Screen E)
  renderWorkerPortal() {
    const container = document.getElementById('worker-active-task-container');
    if (!container) return;

    const task = this.data.worker.activeTask;
    const badge = document.getElementById('worker-task-status-badge');
    if (badge) {
      badge.innerText = task.status;
      badge.className = `badge ${task.status === 'Completed' ? 'badge-green' : task.status === 'Arrived' ? 'badge-yellow' : 'badge-red'}`;
    }

    if (task.status === 'Completed') {
      container.innerHTML = `
        <div style="text-align: center; padding: 2rem 1rem;">
          <div style="font-size: 3rem; margin-bottom: 0.5rem;">🎉</div>
          <h3 style="color: #34d399;">Collection Verified & Closed!</h3>
          <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem;">
            Bin B-102 fill dropped from 95% to 18%. Photographic proof submitted to command center.
          </p>
          <button class="btn btn-outline" style="margin-top: 1.25rem;" onclick="app.resetWorkerDemo()">
            🔄 Reset Worker Task Demo
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
        <div>
          <h4 style="color: #fff; font-size: 1.1rem;">${task.title}</h4>
          <span style="font-size: 0.8rem; color: var(--text-muted);">📍 ${task.location}</span>
        </div>
        <div style="text-align: right;">
          <div class="kpi-value text-red" style="font-size: 1.4rem;">${task.fill_level}%</div>
          <span style="font-size: 0.7rem; color: var(--text-dim);">Estimated ${task.weight_kg} kg</span>
        </div>
      </div>

      <div style="background: rgba(0,0,0,0.3); padding: 0.85rem; border-radius: 8px; font-size: 0.82rem; margin-bottom: 1.25rem;">
        <div><b>Priority Score:</b> <span class="text-red">${task.score}/100 (CRITICAL)</span></div>
        <div style="color: var(--text-dim); margin-top: 0.2rem;">Generated automatically by AI Decision Engine without requiring manual triage.</div>
      </div>

      <!-- Action Step Progression -->
      <div class="worker-task-actions">
        ${task.status === 'Assigned' ? `
          <button class="btn btn-primary btn-block" onclick="app.advanceWorkerStatus('In Route')">
            🚚 Start Route to Location
          </button>
        ` : ''}

        ${task.status === 'In Route' ? `
          <button class="btn btn-secondary btn-block" onclick="app.advanceWorkerStatus('Arrived')">
            📍 Mark Arrived at Bin Site
          </button>
        ` : ''}

        ${task.status === 'Arrived' ? `
          <div style="width: 100%;">
            <div style="margin-bottom: 0.75rem; border: 1px dashed rgba(255,255,255,0.2); padding: 0.85rem; border-radius: 8px; text-align: center; background: rgba(0,0,0,0.2);">
              <span class="icon">📷</span>
              <p style="font-size: 0.8rem; color: #fff;">Proof Photo: [Empty Bin B-102 Captured]</p>
              <small class="text-emerald">Resolution timestamp & GPS automatically stamped</small>
            </div>
            <button class="btn btn-danger btn-block" onclick="app.completeWorkerTask()">
              ✅ Verify Collection & Flush Bin Telemetry
            </button>
          </div>
        ` : ''}
      </div>
    `;

    // Queue list
    const queueList = document.getElementById('worker-queue-list');
    if (queueList) {
      queueList.innerHTML = this.data.worker.queue.map(q => `
        <div class="activity-item" style="margin-bottom: 0.65rem;">
          <div style="display: flex; justify-content: space-between;">
            <strong>${q.title}</strong>
            <span class="badge ${q.priority === 'CRITICAL' ? 'badge-red' : 'badge-yellow'}">${q.priority}</span>
          </div>
          <span style="font-size: 0.75rem; color: var(--text-dim);">${q.distance} &bull; Score ${q.score}/100</span>
        </div>
      `).join('');
    }
  }

  advanceWorkerStatus(newStatus) {
    this.data.worker.activeTask.status = newStatus;
    this.renderWorkerPortal();
    this.showToast(`Worker status updated: ${newStatus}`, 'info');
  }

  completeWorkerTask() {
    this.data.worker.activeTask.status = 'Completed';
    // Flush Bin B-102
    const bin = this.data.bins.find(b => b.id === 'B-102');
    if (bin) {
      bin.fill_level = 18;
      bin.weight_kg = 1.4;
      bin.status = 'NORMAL';
      bin.predicted_overflow = 'Normal capacity';
      bin.last_collection = 'Just now';
    }

    // Update Complaint
    const comp = this.data.complaints.find(c => c.ticket_id === 'TKT-8901');
    if (comp) comp.status = 'Resolved';

    // Update system metrics
    this.data.system_metrics.pickups_today_count += 1;
    this.data.system_metrics.open_complaints_count = Math.max(0, this.data.system_metrics.open_complaints_count - 1);

    this.renderKPIs();
    this.renderBins();
    this.updateMapMarkers();
    this.renderAIPriority();
    this.renderComplaints();
    this.renderTimeline('TKT-8901');
    this.renderWorkerPortal();

    this.showToast('Task Completed! Bin B-102 fill dropped to 18%. Dashboard updated.', 'success');
  }

  resetWorkerDemo() {
    this.data.worker.activeTask.status = 'Assigned';
    this.triggerBinSurge('B-102');
    this.renderWorkerPortal();
  }

  renderAdminFleet() {
    const list = document.getElementById('admin-fleet-list');
    if (!list) return;

    const fleet = [
      { name: "Truck #04 (Compact)", driver: "Rahul Sharma", status: "Active Route (Zone A)", fuel: "84%" },
      { name: "Van #02 (Electric EV)", driver: "Anita Verma", status: "Standby (Zone B)", fuel: "92%" },
      { name: "Truck #08 (Hydraulic)", driver: "Vikram Singh", status: "In Transit (Zone C)", fuel: "68%" }
    ];

    list.innerHTML = fleet.map(f => `
      <div class="activity-item" style="margin-bottom: 0.65rem;">
        <div style="display: flex; justify-content: space-between;">
          <strong>${f.name}</strong>
          <span class="badge badge-emerald">Operational</span>
        </div>
        <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">
          Driver: ${f.driver} &bull; ${f.status} &bull; Battery/Fuel: ${f.fuel}
        </div>
      </div>
    `).join('');
  }

  // 10. SENSOR SIMULATOR MODAL (Digital Twin Layer)
  openSimulatorModal() {
    document.getElementById('simulator-modal').classList.add('open');
  }

  closeSimulatorModal() {
    document.getElementById('simulator-modal').classList.remove('open');
  }

  populateSimBinSelect() {
    const select = document.getElementById('sim-bin-select');
    if (!select) return;

    select.innerHTML = this.data.bins.map(b => `
      <option value="${b.id}" ${b.id === this.activeSimBin ? 'selected' : ''}>
        ${b.id} - ${b.name} (${b.fill_level}%)
      </option>
    `).join('');
  }

  onSimBinChange(binId) {
    this.activeSimBin = binId;
    const bin = this.data.bins.find(b => b.id === binId);
    if (!bin) return;

    document.getElementById('sim-fill-slider').value = bin.fill_level;
    document.getElementById('sim-weight-slider').value = bin.weight_kg;
    document.getElementById('sim-temp-slider').value = bin.temperature_c;

    this.updateSimFillDisplay(bin.fill_level);
    this.updateSimWeightDisplay(bin.weight_kg);
    this.updateSimTempDisplay(bin.temperature_c);
  }

  quickSimulate(binId) {
    this.activeSimBin = binId;
    this.populateSimBinSelect();
    this.onSimBinChange(binId);
    this.openSimulatorModal();
  }

  updateSimFillDisplay(val) {
    const el = document.getElementById('sim-fill-val');
    el.innerText = `${val}%`;
    el.className = `slider-val ${val >= 90 ? 'text-red' : val >= 70 ? 'text-amber' : 'text-emerald'}`;
  }

  updateSimWeightDisplay(val) {
    document.getElementById('sim-weight-val').innerText = `${val} kg`;
  }

  updateSimTempDisplay(val) {
    document.getElementById('sim-temp-val').innerText = `${val} °C`;
  }

  applyPreset(fill, weight, temp) {
    document.getElementById('sim-fill-slider').value = fill;
    document.getElementById('sim-weight-slider').value = weight;
    document.getElementById('sim-temp-slider').value = temp;

    this.updateSimFillDisplay(fill);
    this.updateSimWeightDisplay(weight);
    this.updateSimTempDisplay(temp);
  }

  publishSimulatedSensorReading() {
    const fill = parseFloat(document.getElementById('sim-fill-slider').value);
    const weight = parseFloat(document.getElementById('sim-weight-slider').value);
    const temp = parseFloat(document.getElementById('sim-temp-slider').value);

    const bin = this.data.bins.find(b => b.id === this.activeSimBin);
    if (bin) {
      bin.fill_level = fill;
      bin.weight_kg = weight;
      bin.temperature_c = temp;

      if (fill >= 90 || temp >= 50) {
        bin.status = 'CRITICAL';
        bin.predicted_overflow = 'Critical overflow imminent (< 30 mins)';
      } else if (fill >= 70) {
        bin.status = 'WARNING';
        bin.predicted_overflow = 'Moderate risk (< 3 hrs)';
      } else {
        bin.status = 'NORMAL';
        bin.predicted_overflow = 'Normal capacity';
      }
    }

    this.closeSimulatorModal();
    this.renderKPIs();
    this.renderBins();
    this.updateMapMarkers();
    this.renderAIPriority();

    this.showToast(`[IoT Telemetry Event] Ingested for ${this.activeSimBin}: ${fill}% fill, ${temp}°C`, fill >= 90 ? 'alert' : 'info');
  }

  // 11. HACKATHON LIVE DEMO FLOW (Page 5 & 8 of Brief)
  triggerBinSurge(binId) {
    const bin = this.data.bins.find(b => b.id === binId);
    if (!bin) return;

    bin.fill_level = 95;
    bin.weight_kg = 8.5;
    bin.temperature_c = 29.5;
    bin.status = 'CRITICAL';
    bin.predicted_overflow = 'High overflow risk (< 20 mins)';

    this.data.worker.activeTask.status = 'Assigned';
    this.data.worker.activeTask.fill_level = 95;

    this.renderKPIs();
    this.renderBins();
    this.updateMapMarkers();
    this.renderAIPriority();
    this.renderWorkerPortal();

    this.showToast(`🚨 IoT Alarm: Bin ${binId} breached critical 95% threshold! AI Auto-Dispatch task generated.`, 'alert');
  }

  simulateWorkerEmpty(binId) {
    const bin = this.data.bins.find(b => b.id === binId);
    if (!bin) return;

    bin.fill_level = 18;
    bin.weight_kg = 1.4;
    bin.temperature_c = 26.0;
    bin.status = 'NORMAL';
    bin.predicted_overflow = 'Normal capacity';
    bin.last_collection = 'Just now';

    this.data.worker.activeTask.status = 'Completed';

    this.renderKPIs();
    this.renderBins();
    this.updateMapMarkers();
    this.renderAIPriority();
    this.renderWorkerPortal();

    this.showToast(`✅ Bin ${binId} successfully emptied and flushed to 18%.`, 'success');
  }

  runLiveDemoSurge() {
    this.triggerBinSurge('B-102');
    // Switch to Worker tab after 2.5 seconds to show automated handoff
    setTimeout(() => {
      const workerTab = document.querySelector('[data-tab="worker-portal"]');
      if (workerTab) workerTab.click();
      this.showToast('Switched to Worker Portal view to demonstrate automated task assignment.', 'info');
    }, 2000);
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span class="icon">${type === 'alert' ? '🚨' : type === 'success' ? '✅' : 'ℹ️'}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  openBulkPickupModal() {
    this.showToast('Bulk pickup calendar request dialog opened.', 'info');
  }
}

// Global instance
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new SmartWasteApp();
});

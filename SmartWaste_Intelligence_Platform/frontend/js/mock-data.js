/**
 * Smart Waste Intelligence Platform (SWIP)
 * Initial State & Mock Dataset matching Hackathon Brief
 */

const SWIP_DATA = {
  system_metrics: {
    critical_bins_count: 12,
    open_complaints_count: 27,
    pickups_today_count: 84,
    hotspots_count: 5
  },
  
  bins: [
    {
      id: "B-102",
      name: "Smart Bin B-102 (Central Market)",
      zone: "Zone A - Commercial",
      latitude: 28.6139,
      longitude: 77.2090,
      fill_level: 94,
      weight_kg: 8.4,
      temperature_c: 29.0,
      battery_pct: 88,
      status: "CRITICAL",
      waste_type: "Organic & Mixed",
      last_collection: "7h 24m ago",
      predicted_overflow: "High overflow risk (< 45 mins)",
      risk_factor: "High (Commercial Hub)"
    },
    {
      id: "B-101",
      name: "Smart Bin B-101 (Metro Gate 2)",
      zone: "Zone A - Transit",
      latitude: 28.6152,
      longitude: 77.2105,
      fill_level: 78,
      weight_kg: 6.9,
      temperature_c: 27.5,
      battery_pct: 92,
      status: "WARNING",
      waste_type: "Recyclable",
      last_collection: "12h 10m ago",
      predicted_overflow: "Moderate risk (< 3.5 hrs)",
      risk_factor: "Medium"
    },
    {
      id: "B-103",
      name: "Smart Bin B-103 (Tech Park North)",
      zone: "Zone B - Corporate",
      latitude: 28.6185,
      longitude: 77.2150,
      fill_level: 42,
      weight_kg: 3.8,
      temperature_c: 25.0,
      battery_pct: 95,
      status: "NORMAL",
      waste_type: "Dry / Paper",
      last_collection: "3h 15m ago",
      predicted_overflow: "Low risk (> 12 hrs)",
      risk_factor: "Low"
    },
    {
      id: "B-104",
      name: "Smart Bin B-104 (City Hospital East)",
      zone: "Zone C - Medical",
      latitude: 28.6210,
      longitude: 77.2020,
      fill_level: 91,
      weight_kg: 9.2,
      temperature_c: 31.0,
      battery_pct: 84,
      status: "CRITICAL",
      waste_type: "Sanitary / Mixed",
      last_collection: "8h 05m ago",
      predicted_overflow: "Critical overflow imminent",
      risk_factor: "High (Medical Perimeter)"
    },
    {
      id: "B-105",
      name: "Smart Bin B-105 (Residential Sector 4)",
      zone: "Zone D - Residential",
      latitude: 28.6090,
      longitude: 77.2180,
      fill_level: 55,
      weight_kg: 4.5,
      temperature_c: 26.2,
      battery_pct: 90,
      status: "NORMAL",
      waste_type: "Organic",
      last_collection: "14h 40m ago",
      predicted_overflow: "Moderate (< 6 hrs)",
      risk_factor: "Medium"
    },
    {
      id: "B-106",
      name: "Smart Bin B-106 (Sports Complex)",
      zone: "Zone E - Recreational",
      latitude: 28.6050,
      longitude: 77.2050,
      fill_level: 92,
      weight_kg: 7.8,
      temperature_c: 28.4,
      battery_pct: 79,
      status: "CRITICAL",
      waste_type: "Plastic / Beverage",
      last_collection: "9h 30m ago",
      predicted_overflow: "High overflow risk",
      risk_factor: "High"
    },
    {
      id: "B-107",
      name: "Smart Bin B-107 (Food Court Plaza)",
      zone: "Zone A - Commercial",
      latitude: 28.6145,
      longitude: 77.2078,
      fill_level: 93,
      weight_kg: 11.2,
      temperature_c: 33.1,
      battery_pct: 82,
      status: "CRITICAL",
      waste_type: "Wet / Food Waste",
      last_collection: "6h 15m ago",
      predicted_overflow: "High overflow risk",
      risk_factor: "High"
    },
    {
      id: "B-108",
      name: "Smart Bin B-108 (Heritage Park)",
      zone: "Zone E - Public Park",
      latitude: 28.6170,
      longitude: 77.2210,
      fill_level: 34,
      weight_kg: 2.9,
      temperature_c: 24.8,
      battery_pct: 96,
      status: "NORMAL",
      waste_type: "Dry Waste",
      last_collection: "4h 00m ago",
      predicted_overflow: "Low risk",
      risk_factor: "Low"
    },
    {
      id: "B-109",
      name: "Smart Bin B-109 (Railway Station Concourse)",
      zone: "Zone A - Transit Hub",
      latitude: 28.6250,
      longitude: 77.2140,
      fill_level: 96,
      weight_kg: 14.5,
      temperature_c: 30.5,
      battery_pct: 75,
      status: "CRITICAL",
      waste_type: "Mixed / Cans",
      last_collection: "5h 50m ago",
      predicted_overflow: "Critical overflow imminent",
      risk_factor: "High"
    },
    {
      id: "B-110",
      name: "Smart Bin B-110 (University Library)",
      zone: "Zone B - Education",
      latitude: 28.6280,
      longitude: 77.2090,
      fill_level: 60,
      weight_kg: 5.1,
      temperature_c: 25.5,
      battery_pct: 94,
      status: "NORMAL",
      waste_type: "Paper / Recyclable",
      last_collection: "11h 20m ago",
      predicted_overflow: "Moderate (< 8 hrs)",
      risk_factor: "Low"
    },
    {
      id: "B-111",
      name: "Smart Bin B-111 (Night Bazaar Alley)",
      zone: "Zone A - Commercial",
      latitude: 28.6120,
      longitude: 77.2115,
      fill_level: 95,
      weight_kg: 12.0,
      temperature_c: 32.0,
      battery_pct: 77,
      status: "CRITICAL",
      waste_type: "Organic / Packaging",
      last_collection: "8h 10m ago",
      predicted_overflow: "High overflow risk",
      risk_factor: "High"
    },
    {
      id: "B-112",
      name: "Smart Bin B-112 (Riverfront Promenade)",
      zone: "Zone E - Waterfront",
      latitude: 28.6010,
      longitude: 77.2190,
      fill_level: 90,
      weight_kg: 8.1,
      temperature_c: 28.9,
      battery_pct: 83,
      status: "CRITICAL",
      waste_type: "General / Plastic",
      last_collection: "7h 45m ago",
      predicted_overflow: "High overflow risk",
      risk_factor: "Medium"
    }
  ],

  complaints: [
    {
      ticket_id: "TKT-8901",
      category: "Overflowing bin",
      description: "Bin B-102 in Central Market is overflowing onto the sidewalk, flies gathering.",
      location_name: "Central Market, Sector 12",
      status: "Assigned",
      assigned_to: "Rahul Sharma (Truck #04)",
      created_at: "45 mins ago"
    },
    {
      ticket_id: "TKT-8902",
      category: "Garbage on road",
      description: "Construction debris and plastic bags spilled across road shoulder.",
      location_name: "Ring Road Flyover Junction",
      status: "In Progress",
      assigned_to: "Vikram Singh (Truck #08)",
      created_at: "1h 10m ago"
    },
    {
      ticket_id: "TKT-8903",
      category: "Missed collection",
      description: "Scheduled morning collection did not pick up organic container.",
      location_name: "Greenwood Apartments Block D",
      status: "Reviewed",
      assigned_to: "Unassigned",
      created_at: "2h 30m ago"
    },
    {
      ticket_id: "TKT-8904",
      category: "Illegal dumping",
      description: "Industrial foam and e-waste dumped behind warehouse lot.",
      location_name: "Industrial Area Phase 2",
      status: "Submitted",
      assigned_to: "Pending Review",
      created_at: "3h 15m ago"
    }
  ],

  hotspots: [
    { id: "H-01", name: "Central Commercial Square", lat: 28.6140, lng: 77.2095, incidents: 14, severity: "High" },
    { id: "H-02", name: "Railway Transit Concourse", lat: 28.6250, lng: 77.2140, incidents: 11, severity: "High" },
    { id: "H-03", name: "Industrial Sector Backlane", lat: 28.6270, lng: 77.2030, incidents: 8, severity: "High" },
    { id: "H-04", name: "Sports Stadium West Gate", lat: 28.6050, lng: 77.2050, incidents: 6, severity: "Medium" },
    { id: "H-05", name: "Riverfront Walkway", lat: 28.6010, lng: 77.2190, incidents: 5, severity: "Medium" }
  ],

  worker: {
    id: "W-01",
    name: "Rahul Sharma",
    role: "Lead Collection Operator",
    vehicle_id: "Truck #04",
    phone: "+91 98112-40192",
    activeTask: {
      id: "TSK-301",
      bin_id: "B-102",
      title: "Urgent Collection: Bin B-102 (Central Market)",
      location: "Central Market, Sector 12 (Zone A)",
      priority: "CRITICAL",
      score: 94,
      fill_level: 94,
      weight_kg: 8.4,
      status: "Assigned", // Assigned, In Route, Arrived, Completed
      assigned_at: "10 mins ago"
    },
    queue: [
      { id: "TSK-302", bin_id: "B-107", title: "Bin B-107 - Food Court Plaza", priority: "CRITICAL", score: 92, distance: "1.2 km away" },
      { id: "TSK-303", bin_id: "B-101", title: "Bin B-101 - Metro Gate 2", priority: "WARNING", score: 78, distance: "2.4 km away" }
    ]
  },

  pickup_requests: [
    { id: "REQ-401", customer: "Apex Business Tower", type: "Cardboard & E-Waste", window: "Today 14:00 - 16:00", unit: "Truck #08", status: "Scheduled" },
    { id: "REQ-402", customer: "Green Valley Society", type: "Bulk Horticultural Prunings", window: "Today 16:30 - 18:00", unit: "Truck #04", status: "Confirmed" },
    { id: "REQ-403", customer: "St. Jude Clinic", type: "Non-Hazardous Sanitary Boxes", window: "Tomorrow 09:00", unit: "Van #02", status: "Pending" }
  ],

  classifier_items: {
    plastic_bottle: {
      name: "PET Beverage Bottle",
      category: "Recyclable Dry Waste",
      bin: "Blue Bin",
      color: "#0284c7",
      confidence: "98.2%",
      instructions: "Empty liquid, flatten bottle, and replace cap into the Blue Bin."
    },
    food_scraps: {
      name: "Organic Fruit & Vegetable Peels",
      category: "Wet / Biodegradable Waste",
      bin: "Green Bin",
      color: "#10b981",
      confidence: "99.1%",
      instructions: "Place directly in Green Bin for municipal composting and biogas generation."
    },
    e_waste: {
      name: "Lithium Polymer Battery",
      category: "Domestic E-Waste",
      bin: "Orange / E-Waste Kiosk",
      color: "#f59e0b",
      confidence: "96.4%",
      instructions: "Tape terminals to avoid fire hazards. Drop off at certified e-waste kiosks."
    },
    cardboard: {
      name: "Corrugated Shipping Box",
      category: "Recyclable Paper/Fiber",
      bin: "Blue Bin",
      color: "#0284c7",
      confidence: "97.5%",
      instructions: "Break down and flatten boxes to conserve bin volume."
    },
    chemicals: {
      name: "Paint Thinner Solvent",
      category: "Hazardous Chemical Waste",
      bin: "Red Bin",
      color: "#ef4444",
      confidence: "95.0%",
      instructions: "Keep tightly sealed in original packaging; do not pour into municipal drains."
    }
  }
};

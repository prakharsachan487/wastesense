export type UserRole = 'citizen' | 'admin' | 'worker';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  zone?: string;
}

export type BinStatus = 'NORMAL' | 'WARNING' | 'HIGH' | 'CRITICAL';

export interface SmartBin {
  id: string;
  bin_id: string;
  location: string;
  zone: string;
  latitude: number;
  longitude: number;
  fill_level: number;
  weight: number;
  temperature: number;
  battery: number;
  status: BinStatus;
  waste_type: string;
  last_collection: string;
  overflow_prediction: string;
  priority_score: number;
  risk_factor: string;
  updated_at: string;
}

export type ComplaintCategory = 
  | 'Overflowing Bin'
  | 'Garbage on Road'
  | 'Missed Collection'
  | 'Illegal Dumping'
  | 'Hazardous Material'
  | 'Other';

export type ComplaintStatus = 
  | 'Submitted'
  | 'Under Review'
  | 'Assigned'
  | 'In Progress'
  | 'Resolved';

export type PriorityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface ComplaintTimelineStep {
  step: string;
  timestamp: string;
  description: string;
  completed: boolean;
}

export interface Complaint {
  id: string;
  complaint_id: string;
  user_id?: string;
  user_name: string;
  user_phone?: string;
  category: ComplaintCategory;
  description: string;
  image?: string;
  location: string;
  latitude?: number;
  longitude?: number;
  priority: PriorityLevel;
  status: ComplaintStatus;
  assigned_worker?: string;
  assigned_vehicle?: string;
  created_at: string;
  updated_at: string;
  timeline: ComplaintTimelineStep[];
}

export interface PickupRequest {
  id: string;
  request_id: string;
  user_name: string;
  phone: string;
  waste_type: string;
  location: string;
  preferred_date: string;
  preferred_time: string;
  notes?: string;
  assigned_unit?: string;
  status: 'Pending' | 'Scheduled' | 'In Route' | 'Completed' | 'Cancelled';
  created_at: string;
}

export type TaskStatus = 'Pending' | 'Assigned' | 'In Progress' | 'Completed' | 'Verified';

export interface CollectionTask {
  id: string;
  task_code: string;
  bin_id?: string;
  complaint_id?: string;
  title: string;
  location: string;
  zone: string;
  priority: PriorityLevel;
  priority_score: number;
  worker_id: string;
  worker_name: string;
  vehicle_id: string;
  vehicle_name: string;
  status: TaskStatus;
  instructions: string;
  before_fill?: number;
  after_fill?: number;
  proof_photo?: string;
  created_time: string;
  due_time: string;
  completed_at?: string;
}

export interface WorkerProfile {
  id: string;
  name: string;
  role: string;
  phone: string;
  vehicle_id: string;
  vehicle_name: string;
  zone: string;
  status: 'Available' | 'On Route' | 'Busy' | 'Off Duty';
  completed_today: number;
  active_tasks: number;
}

export interface Vehicle {
  id: string;
  name: string;
  type: string;
  plate: string;
  capacity_tons: number;
  current_load_pct: number;
  fuel_battery_pct: number;
  status: 'Operational' | 'In Route' | 'Maintenance';
  assigned_driver: string;
  zone: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'alert' | 'warning' | 'info' | 'success';
  timestamp: string;
  read: boolean;
  target_role: UserRole | 'all';
}

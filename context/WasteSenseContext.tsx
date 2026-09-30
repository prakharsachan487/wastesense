'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, UserRole, SmartBin, Complaint, CollectionTask, 
  WorkerProfile, Vehicle, PickupRequest, NotificationItem 
} from '../types';
import { 
  INITIAL_BINS, INITIAL_COMPLAINTS, INITIAL_TASKS, 
  INITIAL_WORKERS, INITIAL_VEHICLES, INITIAL_PICKUPS, INITIAL_NOTIFICATIONS 
} from '../data/mockData';
import { 
  getSupabaseBins, 
  getSupabaseComplaints, 
  updateSupabaseBinTelemetry, 
  insertSupabaseComplaint, 
  insertSupabaseTask,
  subscribeToBinsRealtime,
  subscribeToComplaintsRealtime
} from '../lib/supabaseService';
import { isSupabaseConfigured } from '../lib/supabaseClient';
import { detectZoneFromLocation, isWithinGeofence } from '../lib/geoUtils';

interface WasteSenseContextType {
  currentUser: User;
  isLoggedIn: boolean;
  isAuthReady: boolean;
  setCurrentUser: (user: User) => void;
  loginAsRole: (role: UserRole) => void;
  logout: () => void;

  // Smart Bins
  bins: SmartBin[];
  updateBinTelemetry: (binId: string, fill: number, weight?: number, temp?: number, battery?: number) => void;
  simulateSurgeB102: () => void;
  resetBinToClean: (binId: string) => void;

  // Complaints
  complaints: Complaint[];
  createComplaint: (data: Partial<Complaint>) => Complaint;
  updateComplaintStatus: (id: string, status: Complaint['status'], worker?: string) => void;

  // Tasks
  tasks: CollectionTask[];
  createTask: (binId: string, workerId: string, vehicleId: string, priority?: CollectionTask['priority']) => CollectionTask;
  updateTaskStatus: (taskId: string, status: CollectionTask['status']) => void;
  completeTaskWithProof: (taskId: string, afterFill?: number, proofPhotoName?: string) => void;
  workerAcceptTask: (taskId: string) => void;
  workerArriveAtSite: (taskId: string, currentLat: number, currentLng: number, accuracy?: number) => { success: boolean; distanceMeters: number };
  workerSubmitProof: (taskId: string, afterPhoto: string, proofLat: number, proofLng: number, accuracy?: number) => { success: boolean; status: 'PASS' | 'FAIL'; reason?: string; distanceMeters?: number };

  // Workers & Vehicles
  workers: WorkerProfile[];
  vehicles: Vehicle[];
  pickups: PickupRequest[];
  createPickupRequest: (data: Partial<PickupRequest>) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;

  // Metrics
  kpis: {
    criticalBins: number;
    openComplaints: number;
    pickupsToday: number;
    activeWorkers: number;
    efficiencyPct: number;
  };
}

const DEMO_USERS: Record<UserRole, User> = {
  admin: {
    id: 'usr-admin',
    name: 'Chief Operations Officer',
    email: 'admin@wastesense.gov.in',
    role: 'admin',
    avatar: 'A',
    zone: 'Headquarters Command Center'
  },
  citizen: {
    id: 'usr-citizen',
    name: 'Amitabh Sen',
    email: 'citizen@wastesense.org',
    role: 'citizen',
    avatar: 'C',
    phone: '+91 98112-90123',
    zone: 'Sector 12, Central Market'
  },
  worker: {
    id: 'w-1',
    name: 'Rahul Sharma',
    email: 'rahul.s@wastesense.ops',
    role: 'worker',
    avatar: 'W',
    phone: '+91 98112-40192',
    zone: 'Zone A - Commercial'
  }
};

const WasteSenseContext = createContext<WasteSenseContextType | undefined>(undefined);

export const WasteSenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(DEMO_USERS.admin);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [bins, setBins] = useState<SmartBin[]>(INITIAL_BINS);
  const [complaints, setComplaints] = useState<Complaint[]>(INITIAL_COMPLAINTS);
  const [tasks, setTasks] = useState<CollectionTask[]>(INITIAL_TASKS);
  const [workers] = useState<WorkerProfile[]>(INITIAL_WORKERS);
  const [vehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [pickups, setPickups] = useState<PickupRequest[]>(INITIAL_PICKUPS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Load from localStorage on mount if present
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('ws_user');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch {
      setIsLoggedIn(false);
    } finally {
      setIsAuthReady(true);
    }
  }, []);

  // Supabase Database Connection & Realtime Sync (if configured)
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    getSupabaseBins().then((remoteBins) => {
      if (remoteBins && remoteBins.length > 0) {
        setBins((prev) => {
          const remoteMap = new Map(remoteBins.map(b => [b.bin_id.toLowerCase(), b]));
          return prev.map(b => remoteMap.get(b.bin_id.toLowerCase()) || b);
        });
      }
    });

    getSupabaseComplaints().then((remoteComplaints) => {
      if (remoteComplaints && remoteComplaints.length > 0) {
        setComplaints((prev) => {
          const remoteMap = new Map(remoteComplaints.map(c => [c.complaint_id, c]));
          const remaining = prev.filter(c => !remoteMap.has(c.complaint_id));
          return [...remoteComplaints, ...remaining];
        });
      }
    });

    const binChannel = subscribeToBinsRealtime((updatedBin) => {
      setBins((prev) =>
        prev.map((b) => (b.bin_id.toLowerCase() === updatedBin.bin_id.toLowerCase() ? { ...b, ...updatedBin } : b))
      );
    });

    const complaintChannel = subscribeToComplaintsRealtime((incomingComplaint) => {
      setComplaints((prev) => {
        if (prev.some(c => c.complaint_id === incomingComplaint.complaint_id)) return prev;
        return [incomingComplaint, ...prev];
      });
    });

    return () => {
      binChannel?.unsubscribe();
      complaintChannel?.unsubscribe();
    };
  }, []);

  const loginAsRole = (role: UserRole) => {
    const user = DEMO_USERS[role];
    setCurrentUser(user);
    setIsLoggedIn(true);
    try {
      localStorage.setItem('ws_user', JSON.stringify(user));
    } catch {}
  };

  const logout = () => {
    setIsLoggedIn(false);
    try {
      localStorage.removeItem('ws_user');
    } catch {}
  };

  // 1. UPDATE BIN TELEMETRY
  const updateBinTelemetry = (
    binId: string, 
    fill: number, 
    weight?: number, 
    temp?: number, 
    battery?: number
  ) => {
    setBins(prev => prev.map(bin => {
      if (bin.bin_id.toLowerCase() !== binId.toLowerCase()) return bin;

      const newFill = Math.min(100, Math.max(0, fill));
      const newWeight = weight !== undefined ? weight : bin.weight;
      const newTemp = temp !== undefined ? temp : bin.temperature;
      const newBattery = battery !== undefined ? battery : bin.battery;

      let newStatus: SmartBin['status'] = 'NORMAL';
      let prediction = 'Low risk (> 12 hrs)';
      let score = Math.round((newFill * 0.45) + 20);

      if (newFill >= 90 || newTemp >= 50) {
        newStatus = 'CRITICAL';
        prediction = 'High overflow risk (< 30 mins)';
        score = Math.min(99, 90 + Math.round((newFill - 90) * 0.9));
      } else if (newFill >= 75) {
        newStatus = 'HIGH';
        prediction = 'Moderate overflow risk (< 3 hrs)';
        score = 80;
      } else if (newFill >= 60) {
        newStatus = 'WARNING';
        prediction = 'Moderate capacity (< 6 hrs)';
        score = 65;
      }

      return {
        ...bin,
        fill_level: newFill,
        weight: newWeight,
        temperature: newTemp,
        battery: newBattery,
        status: newStatus,
        overflow_prediction: prediction,
        priority_score: score,
        updated_at: 'Just now'
      };
    }));

    // Background async update to Supabase if configured
    updateSupabaseBinTelemetry(binId, fill, weight, temp, battery).catch(() => {});

    // Trigger notification if critical
    if (fill >= 90) {
      addNotification({
        title: `Critical Alert: Bin ${binId}`,
        message: `IoT sensor reached ${fill}% fill level. Automated dispatch required.`,
        type: 'alert',
        target_role: 'admin'
      });
    }
  };

  // 2. SIMULATE SURGE ON B-102 (Demo primary trigger)
  const simulateSurgeB102 = () => {
    updateBinTelemetry('B-102', 95, 8.5, 29.5);
    addNotification({
      title: 'CRITICAL OVERFLOW SURGE: Bin B-102',
      message: 'Fill reached 95% at Central Market. Priority elevated to CRITICAL (Score 95).',
      type: 'alert',
      target_role: 'all'
    });
  };

  const resetBinToClean = (binId: string) => {
    updateBinTelemetry(binId, 18, 1.4, 25.0);
  };

  // 3. CREATE COMPLAINT (Auto-Assignment & Linked Task Generation)
  const createComplaint = (data: Partial<Complaint>): Complaint => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const complaintId = `WS-2026-${randomCode}`;
    const detectedZone = data.zone || detectZoneFromLocation(data.location || 'Central Market');

    // Auto-assignment: Find active worker and vehicle for this zone
    const assignedWorker = workers.find(w => w.zone === detectedZone) || workers[0];
    const assignedVehicle = vehicles.find(v => v.zone === detectedZone) || vehicles[0];

    const lat = data.latitude || 28.6139;
    const lng = data.longitude || 77.2090;

    const newComplaint: Complaint = {
      id: `c-${Date.now()}`,
      complaint_id: complaintId,
      user_name: currentUser.name || 'Resident Citizen',
      user_phone: currentUser.phone || '+91 98112-90123',
      category: data.category || 'Overflowing Bin',
      description: data.description || 'Citizen reported municipal waste issue.',
      location: data.location || 'Central Market, Sector 12',
      zone: detectedZone,
      latitude: lat,
      longitude: lng,
      accuracy_meters: data.accuracy_meters || 12,
      priority: data.priority || 'HIGH',
      status: 'Assigned',
      assigned_worker: assignedWorker.name,
      assigned_worker_id: assignedWorker.id,
      assigned_vehicle: assignedVehicle.name,
      image: data.image || data.before_image || '/images/incident-garbage.jpg',
      before_image: data.image || data.before_image || '/images/incident-garbage.jpg',
      created_at: 'Just now',
      updated_at: 'Just now',
      timeline: [
        { step: 'Submitted', timestamp: 'Just now', description: 'Citizen ticket logged with GPS coordinates', completed: true },
        { step: `Assigned: ${assignedWorker.name}`, timestamp: 'Just now', description: `Auto-assigned to ${assignedWorker.name} (${assignedVehicle.name})`, completed: true },
        { step: 'En Route', timestamp: 'Pending', description: 'Worker en route to location', completed: false },
        { step: 'Arrived & In Progress', timestamp: 'Pending', description: 'Worker at site within 100m geofence', completed: false },
        { step: 'Resolved & Verified', timestamp: 'Pending', description: 'After-photo & GPS proof validated', completed: false }
      ]
    };

    // Auto-spawn collection work order for assigned worker
    const taskNum = Math.floor(1000 + Math.random() * 9000);
    const newTask: CollectionTask = {
      id: `task-${Date.now()}`,
      task_code: `TSK-${taskNum}`,
      complaint_id: complaintId,
      title: `Citizen Ticket ${complaintId}: ${newComplaint.category}`,
      location: newComplaint.location,
      zone: detectedZone,
      target_lat: lat,
      target_lng: lng,
      priority: newComplaint.priority,
      priority_score: 90,
      worker_id: assignedWorker.id,
      worker_name: assignedWorker.name,
      vehicle_id: assignedVehicle.id,
      vehicle_name: assignedVehicle.name,
      status: 'Assigned',
      instructions: `Citizen reported: "${newComplaint.description}". Verify arrival via GPS geofence, clear site, and photograph cleaned site.`,
      before_fill: 90,
      created_time: 'Just now',
      due_time: 'In 45 mins'
    };

    setComplaints(prev => [newComplaint, ...prev]);
    setTasks(prev => [newTask, ...prev]);

    // Background async insert to Supabase if configured
    insertSupabaseComplaint(newComplaint).then(res => {
      if (res.success) {
        console.log('✓ Complaint saved to Supabase Cloud DB:', newComplaint.complaint_id);
      } else {
        console.warn('Supabase complaint insert error:', res.error);
      }
    }).catch(err => console.warn('Supabase complaint catch:', err));

    insertSupabaseTask(newTask).catch(() => {});

    addNotification({
      title: `Work Order Auto-Assigned: ${newTask.task_code}`,
      message: `Assigned to ${assignedWorker.name} (${assignedVehicle.name}) for ${newComplaint.location}.`,
      type: 'info',
      target_role: 'worker'
    });

    addNotification({
      title: `Complaint Registered: ${complaintId}`,
      message: `${newComplaint.category} reported at ${newComplaint.location}. Auto-assigned to ${assignedWorker.name}.`,
      type: 'info',
      target_role: 'admin'
    });

    return newComplaint;
  };

  const updateComplaintStatus = (id: string, status: Complaint['status'], worker?: string) => {
    setComplaints(prev => prev.map(c => {
      if (c.id !== id && c.complaint_id !== id) return c;

      const steps = ['Submitted', 'Assigned', 'En Route', 'In Progress', 'Resolved'];
      const targetIdx = steps.indexOf(status);

      const updatedTimeline = c.timeline.map((step, idx) => ({
        ...step,
        completed: idx <= targetIdx || step.completed,
        timestamp: idx === targetIdx ? 'Just now' : step.timestamp
      }));

      return {
        ...c,
        status,
        assigned_worker: worker || c.assigned_worker,
        updated_at: 'Just now',
        timeline: updatedTimeline
      };
    }));
  };

  // 4. CREATE TASK (Manual Admin Dispatch if needed)
  const createTask = (
    binId: string, 
    workerId: string, 
    vehicleId: string, 
    priority: CollectionTask['priority'] = 'HIGH'
  ): CollectionTask => {
    const worker = workers.find(w => w.id === workerId) || workers[0];
    const vehicle = vehicles.find(v => v.id === vehicleId) || vehicles[0];
    const bin = bins.find(b => b.bin_id.toLowerCase() === binId.toLowerCase());

    const taskNum = Math.floor(1000 + Math.random() * 9000);
    const newTask: CollectionTask = {
      id: `task-${Date.now()}`,
      task_code: `TSK-${taskNum}`,
      bin_id: binId,
      title: `Collection Order: Bin ${binId} (${bin?.location || 'Designated Point'})`,
      location: bin?.location || 'Central Market, Sector 12',
      zone: bin?.zone || 'Zone A',
      target_lat: bin?.latitude || 28.6139,
      target_lng: bin?.longitude || 77.2090,
      priority,
      priority_score: bin?.priority_score || 85,
      worker_id: worker.id,
      worker_name: worker.name,
      vehicle_id: vehicle.id,
      vehicle_name: vehicle.name,
      status: 'Assigned',
      instructions: `Collection order for ${binId}. Empty container, inspect sensor, and photograph clean container.`,
      before_fill: bin?.fill_level || 90,
      created_time: 'Just now',
      due_time: 'In 45 mins'
    };

    setTasks(prev => [newTask, ...prev]);

    addNotification({
      title: `Task Dispatched: ${newTask.task_code}`,
      message: `Assigned to ${worker.name} (${vehicle.name}) for Bin ${binId}.`,
      type: 'info',
      target_role: 'worker'
    });

    return newTask;
  };

  const updateTaskStatus = (taskId: string, status: CollectionTask['status']) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId && t.task_code !== taskId) return t;
      return { ...t, status };
    }));
  };

  // 5. WORKER WORKFLOW: ACCEPT TASK (EN ROUTE)
  const workerAcceptTask = (taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId && t.task_code !== taskId) return t;
      return { ...t, status: 'En Route' };
    }));

    const task = tasks.find(t => t.id === taskId || t.task_code === taskId);
    if (task?.complaint_id) {
      updateComplaintStatus(task.complaint_id, 'En Route');
    }

    addNotification({
      title: `Worker En Route`,
      message: `${task?.worker_name || 'Worker'} is en route for ${task?.location || 'task'}.`,
      type: 'info',
      target_role: 'all'
    });
  };

  // 6. WORKER WORKFLOW: ARRIVE AT SITE & GEOFENCE VERIFICATION (IN PROGRESS)
  const workerArriveAtSite = (
    taskId: string, 
    currentLat: number, 
    currentLng: number, 
    accuracy: number = 10
  ): { success: boolean; distanceMeters: number } => {
    const task = tasks.find(t => t.id === taskId || t.task_code === taskId);
    if (!task) return { success: false, distanceMeters: 999 };

    const targetLat = task.target_lat || 28.6139;
    const targetLng = task.target_lng || 77.2090;
    const { within, distanceMeters } = isWithinGeofence(targetLat, targetLng, currentLat, currentLng, 100);

    setTasks(prev => prev.map(t => {
      if (t.id !== taskId && t.task_code !== taskId) return t;
      return {
        ...t,
        status: 'In Progress',
        arrived_at: 'Just now',
        arrival_lat: currentLat,
        arrival_lng: currentLng,
        arrival_distance_m: distanceMeters
      };
    }));

    if (task.complaint_id) {
      setComplaints(prev => prev.map(c => {
        if (c.complaint_id !== task.complaint_id && c.id !== task.complaint_id) return c;
        const updatedTimeline = c.timeline.map((step) => {
          if (step.step.includes('Arrived') || step.step.includes('In Progress')) {
            return { ...step, completed: true, timestamp: 'Just now', description: `Geofence verified (${distanceMeters}m from site)` };
          }
          if (step.step === 'En Route') {
            return { ...step, completed: true };
          }
          return step;
        });
        return {
          ...c,
          status: 'In Progress',
          geofence_verified: true,
          updated_at: 'Just now',
          timeline: updatedTimeline
        };
      }));
    }

    addNotification({
      title: `Worker Arrived on Site`,
      message: `${task.worker_name} arrived at ${task.location} (${distanceMeters}m from target). Geofence verified.`,
      type: 'info',
      target_role: 'admin'
    });

    return { success: within || distanceMeters <= 100, distanceMeters };
  };

  // 7. WORKER WORKFLOW: SUBMIT PROOF & AUTO-VALIDATION (PASS / FAIL)
  const workerSubmitProof = (
    taskId: string, 
    afterPhoto: string, 
    proofLat: number, 
    proofLng: number, 
    accuracy: number = 8
  ): { success: boolean; status: 'PASS' | 'FAIL'; reason?: string; distanceMeters?: number } => {
    const task = tasks.find(t => t.id === taskId || t.task_code === taskId);
    if (!task) return { success: false, status: 'FAIL', reason: 'Task not found' };

    const targetLat = task.target_lat || 28.6139;
    const targetLng = task.target_lng || 77.2090;
    const { within, distanceMeters } = isWithinGeofence(targetLat, targetLng, proofLat, proofLng, 100);

    const hasPhoto = Boolean(afterPhoto && afterPhoto.trim().length > 0);

    // AUTO-VALIDATION PASS: photo is present AND within geofence radius
    if (hasPhoto && (within || distanceMeters <= 100)) {
      setTasks(prev => prev.map(t => {
        if (t.id !== taskId && t.task_code !== taskId) return t;
        return {
          ...t,
          status: 'Completed',
          after_fill: 15,
          proof_photo: afterPhoto,
          proof_lat: proofLat,
          proof_lng: proofLng,
          proof_accuracy: accuracy,
          proof_timestamp: 'Just now',
          completed_at: 'Just now'
        };
      }));

      if (task.bin_id) {
        resetBinToClean(task.bin_id);
      }

      if (task.complaint_id) {
        setComplaints(prev => prev.map(c => {
          if (c.complaint_id !== task.complaint_id && c.id !== task.complaint_id) return c;
          const updatedTimeline = c.timeline.map(st => {
            if (st.step.includes('Resolved') || st.step.includes('Verified')) {
              return { 
                ...st, 
                completed: true, 
                timestamp: 'Just now', 
                description: `Resolution verified: photo + GPS within ${distanceMeters}m.` 
              };
            }
            return { ...st, completed: true };
          });
          return {
            ...c,
            status: 'Resolved',
            after_image: afterPhoto,
            resolved_at: 'Just now',
            updated_at: 'Just now',
            timeline: updatedTimeline
          };
        }));
      }

      addNotification({
        title: `Validation Passed: ${task.task_code}`,
        message: `Task completed and verified by GPS (within ${distanceMeters}m). Closed loop complete.`,
        type: 'success',
        target_role: 'all'
      });

      return { success: true, status: 'PASS', distanceMeters };
    } else {
      // AUTO-VALIDATION FAIL: Missing photo or outside 100m geofence
      const failReason = !hasPhoto
        ? 'Resolution photo is required for validation.'
        : `GPS location mismatch: Device is ${distanceMeters}m away from reported site (Maximum allowed is 100m).`;

      setTasks(prev => prev.map(t => {
        if (t.id !== taskId && t.task_code !== taskId) return t;
        return {
          ...t,
          status: 'Rework',
          rework_reason: failReason
        };
      }));

      if (task.complaint_id) {
        setComplaints(prev => prev.map(c => {
          if (c.complaint_id !== task.complaint_id && c.id !== task.complaint_id) return c;
          return {
            ...c,
            status: 'Rework',
            rework_reason: failReason,
            updated_at: 'Just now'
          };
        }));
      }

      addNotification({
        title: `Validation Failed: ${task.task_code}`,
        message: `Task flagged for Rework: ${failReason}`,
        type: 'alert',
        target_role: 'worker'
      });

      return { success: false, status: 'FAIL', reason: failReason, distanceMeters };
    }
  };

  // Backwards compatibility adapter
  const completeTaskWithProof = (taskId: string, afterFill = 18, proofPhotoName = 'proof_resolution.jpg') => {
    workerSubmitProof(taskId, proofPhotoName, 28.6139, 77.2090, 8);
  };

  // 6. PICKUP REQUESTS
  const createPickupRequest = (data: Partial<PickupRequest>) => {
    const num = Math.floor(100 + Math.random() * 900);
    const newReq: PickupRequest = {
      id: `p-${Date.now()}`,
      request_id: `PKP-2026-${num}`,
      user_name: data.user_name || currentUser.name,
      phone: data.phone || currentUser.phone || '+91 98110-00000',
      waste_type: data.waste_type || 'Bulk Recyclables & Packaging',
      location: data.location || currentUser.zone || 'Sector 12',
      preferred_date: data.preferred_date || 'Tomorrow',
      preferred_time: data.preferred_time || '10:00 - 12:00',
      notes: data.notes,
      assigned_unit: 'Van #02 (EV)',
      status: 'Scheduled',
      created_at: 'Just now'
    };
    setPickups(prev => [newReq, ...prev]);

    addNotification({
      title: `Scheduled Pickup: ${newReq.request_id}`,
      message: `Pickup scheduled for ${newReq.preferred_date} (${newReq.waste_type}).`,
      type: 'info',
      target_role: 'admin'
    });
  };

  // Helper notification
  const addNotification = (item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const notif: NotificationItem = {
      id: `n-${Date.now()}`,
      timestamp: 'Just now',
      read: false,
      ...item
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  // Live calculated KPIs
  const criticalBins = bins.filter(b => b.status === 'CRITICAL').length;
  const openComplaints = complaints.filter(c => c.status !== 'Resolved').length;
  const pickupsToday = 84 + tasks.filter(t => t.status === 'Completed').length;
  const activeWorkers = workers.filter(w => w.status !== 'Off Duty').length;
  const efficiencyPct = Math.min(98, 86 + tasks.filter(t => t.status === 'Completed').length);

  return (
    <WasteSenseContext.Provider
      value={{
        currentUser,
        isLoggedIn,
        isAuthReady,
        setCurrentUser,
        loginAsRole,
        logout,
        bins,
        updateBinTelemetry,
        simulateSurgeB102,
        resetBinToClean,
        complaints,
        createComplaint,
        updateComplaintStatus,
        tasks,
        createTask,
        updateTaskStatus,
        completeTaskWithProof,
        workerAcceptTask,
        workerArriveAtSite,
        workerSubmitProof,
        workers,
        vehicles,
        pickups,
        createPickupRequest,
        notifications,
        markNotificationRead,
        kpis: {
          criticalBins,
          openComplaints,
          pickupsToday,
          activeWorkers,
          efficiencyPct
        }
      }}
    >
      {children}
    </WasteSenseContext.Provider>
  );
};

export const useWasteSense = () => {
  const context = useContext(WasteSenseContext);
  if (!context) {
    throw new Error('useWasteSense must be used within a WasteSenseProvider');
  }
  return context;
};

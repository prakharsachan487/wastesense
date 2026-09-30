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
  subscribeToBinsRealtime 
} from '../lib/supabaseService';
import { isSupabaseConfigured } from '../lib/supabaseClient';

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
  completeTaskWithProof: (taskId: string, afterFill: number, proofPhotoName?: string) => void;

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
    avatar: '👨‍💼',
    zone: 'Headquarters Command Center'
  },
  citizen: {
    id: 'usr-citizen',
    name: 'Amitabh Sen',
    email: 'citizen@wastesense.org',
    role: 'citizen',
    avatar: '🧑',
    phone: '+91 98112-90123',
    zone: 'Sector 12, Central Market'
  },
  worker: {
    id: 'w-1',
    name: 'Rahul Sharma',
    email: 'rahul.s@wastesense.ops',
    role: 'worker',
    avatar: '👷',
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
        setBins(remoteBins);
      }
    });

    getSupabaseComplaints().then((remoteComplaints) => {
      if (remoteComplaints && remoteComplaints.length > 0) {
        setComplaints(remoteComplaints);
      }
    });

    const channel = subscribeToBinsRealtime((updatedBin) => {
      setBins((prev) =>
        prev.map((b) => (b.bin_id.toLowerCase() === updatedBin.bin_id.toLowerCase() ? { ...b, ...updatedBin } : b))
      );
    });

    return () => {
      channel?.unsubscribe();
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
        title: `🚨 Critical Alert: Bin ${binId}`,
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
      title: '🚨 CRITICAL OVERFLOW SURGE: Bin B-102',
      message: 'Fill reached 95% at Central Market. Priority elevated to CRITICAL (Score 95).',
      type: 'alert',
      target_role: 'all'
    });
  };

  const resetBinToClean = (binId: string) => {
    updateBinTelemetry(binId, 18, 1.4, 25.0);
  };

  // 3. CREATE COMPLAINT
  const createComplaint = (data: Partial<Complaint>): Complaint => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const complaintId = `WS-2026-${randomCode}`;
    const newComplaint: Complaint = {
      id: `c-${Date.now()}`,
      complaint_id: complaintId,
      user_name: currentUser.name || 'Anonymous Citizen',
      user_phone: currentUser.phone || '+91 98112-90123',
      category: data.category || 'Overflowing Bin',
      description: data.description || 'Citizen reported waste issue.',
      location: data.location || 'Central Market, Sector 12',
      latitude: data.latitude || 28.6139,
      longitude: data.longitude || 77.2090,
      priority: data.priority || 'HIGH',
      status: 'Submitted',
      image: data.image,
      created_at: 'Just now',
      updated_at: 'Just now',
      timeline: [
        { step: 'Submitted', timestamp: 'Just now', description: 'Citizen ticket logged in system', completed: true },
        { step: 'Under Review', timestamp: 'Pending', description: 'AI validating sensor and geotag', completed: false },
        { step: 'Assigned', timestamp: 'Pending', description: 'Sanitation team allocation', completed: false },
        { step: 'In Progress', timestamp: 'Pending', description: 'Collection vehicle dispatched', completed: false },
        { step: 'Resolved', timestamp: 'Pending', description: 'Emptied and verified', completed: false }
      ]
    };

    setComplaints(prev => [newComplaint, ...prev]);

    // Background async insert to Supabase if configured
    insertSupabaseComplaint(newComplaint).catch(() => {});

    addNotification({
      title: `📝 New Complaint ${complaintId}`,
      message: `${newComplaint.category} reported at ${newComplaint.location}.`,
      type: 'warning',
      target_role: 'admin'
    });

    return newComplaint;
  };

  const updateComplaintStatus = (id: string, status: Complaint['status'], worker?: string) => {
    setComplaints(prev => prev.map(c => {
      if (c.id !== id && c.complaint_id !== id) return c;

      const steps = ['Submitted', 'Under Review', 'Assigned', 'In Progress', 'Resolved'];
      const targetIdx = steps.indexOf(status);

      const updatedTimeline = c.timeline.map((step, idx) => ({
        ...step,
        completed: idx <= targetIdx,
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

  // 4. CREATE TASK
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
      priority,
      priority_score: bin?.priority_score || 85,
      worker_id: worker.id,
      worker_name: worker.name,
      vehicle_id: vehicle.id,
      vehicle_name: vehicle.name,
      status: 'Assigned',
      instructions: `Urgent collection for ${binId}. Empty container, inspect sensor battery, and photograph clean container.`,
      before_fill: bin?.fill_level || 90,
      created_time: 'Just now',
      due_time: 'In 45 mins'
    };

    setTasks(prev => [newTask, ...prev]);

    addNotification({
      title: `🚛 Task Dispatched: ${newTask.task_code}`,
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

  // 5. COMPLETE TASK WITH PROOF (Closed-loop feedback!)
  const completeTaskWithProof = (taskId: string, afterFill = 18, proofPhotoName = 'proof_resolution.jpg') => {
    const task = tasks.find(t => t.id === taskId || t.task_code === taskId);
    if (!task) return;

    // Update task
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId && t.task_code !== taskId) return t;
      return {
        ...t,
        status: 'Completed',
        after_fill: afterFill,
        proof_photo: proofPhotoName,
        completed_at: 'Just now'
      };
    }));

    // Reset Bin
    if (task.bin_id) {
      resetBinToClean(task.bin_id);
    }

    // Resolve associated complaint if present
    if (task.bin_id === 'B-102') {
      updateComplaintStatus('WS-2026-1042', 'Resolved');
    }

    addNotification({
      title: `✅ Collection Verified: ${task.task_code}`,
      message: `Worker ${task.worker_name} completed collection. Bin ${task.bin_id} fill dropped to ${afterFill}%. Closed loop complete.`,
      type: 'success',
      target_role: 'all'
    });
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
      title: `📅 Scheduled Pickup: ${newReq.request_id}`,
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

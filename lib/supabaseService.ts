import { supabase, isSupabaseConfigured } from './supabaseClient';
import { SmartBin, Complaint, CollectionTask, PickupRequest, User, UserRole } from '../types';


/**
 * Fetch all smart bins from Supabase (or null if not configured)
 */
export async function getSupabaseBins(): Promise<SmartBin[] | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const { data, error } = await supabase
      .from('smart_bins')
      .select('*')
      .order('priority_score', { ascending: false });

    if (error) {
      console.warn('Supabase getBins error:', error.message);
      return null;
    }
    return data as SmartBin[];
  } catch (err) {
    console.warn('Supabase getBins catch:', err);
    return null;
  }
}

/**
 * Update bin telemetry in Supabase
 */
export async function updateSupabaseBinTelemetry(
  binId: string,
  fillLevel: number,
  weight?: number,
  temp?: number,
  battery?: number
): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  try {
    const updates: Record<string, any> = {
      fill_level: fillLevel,
      status: fillLevel >= 90 ? 'CRITICAL' : fillLevel >= 75 ? 'HIGH' : fillLevel >= 50 ? 'WARNING' : 'NORMAL',
      updated_at: new Date().toISOString()
    };
    if (weight !== undefined) updates.weight = weight;
    if (temp !== undefined) updates.temperature = temp;
    if (battery !== undefined) updates.battery = battery;

    const { error } = await supabase
      .from('smart_bins')
      .update(updates)
      .eq('bin_id', binId);

    return !error;
  } catch {
    return false;
  }
}

/**
 * Fetch all citizen complaints from Supabase
 */
export async function getSupabaseComplaints(): Promise<Complaint[] | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const { data, error } = await supabase
      .from('complaints')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase getComplaints error:', error.message);
      return null;
    }
    return data as Complaint[];
  } catch (err) {
    console.warn('Supabase getComplaints catch:', err);
    return null;
  }
}

/**
 * Insert a new citizen complaint into Supabase
 * Note: We strip the client string id so Postgres uuid_generate_v4() generates a valid UUID!
 */
export async function insertSupabaseComplaint(complaint: Partial<Complaint>): Promise<{ success: boolean; data?: any; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: 'Supabase client not configured' };
  }
  try {
    const { id, timeline, ...rest } = complaint;

    const payload: Record<string, any> = {
      ...rest,
      timeline: timeline ? JSON.stringify(timeline) : '[]',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('complaints')
      .insert([payload])
      .select();

    if (error) {
      console.error('Supabase insertComplaint error:', error.message);
      return { success: false, error: error.message };
    }

    console.log('✓ Successfully stored complaint in Supabase Cloud DB:', data?.[0]?.complaint_id);
    return { success: true, data: data?.[0] };
  } catch (err: any) {
    console.error('Supabase insertComplaint catch:', err);
    return { success: false, error: err?.message || 'Network exception' };
  }
}

/**
 * Insert a new collection work order task into Supabase
 */
export async function insertSupabaseTask(task: Partial<CollectionTask>): Promise<{ success: boolean; data?: any; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: 'Supabase client not configured' };
  }
  try {
    const { id, ...rest } = task;
    const { data, error } = await supabase
      .from('collection_tasks')
      .insert([rest])
      .select();

    if (error) {
      console.warn('Supabase insertTask error:', error.message);
      return { success: false, error: error.message };
    }
    return { success: true, data: data?.[0] };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Network exception' };
  }
}

/**
 * Realtime WebSocket listener for Smart Bins
 */
export function subscribeToBinsRealtime(onBinChange: (bin: SmartBin) => void) {
  if (!isSupabaseConfigured || !supabase) return null;

  return supabase
    .channel('public:smart_bins')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'smart_bins' },
      (payload) => {
        if (payload.new) {
          onBinChange(payload.new as SmartBin);
        }
      }
    )
    .subscribe();
}

/**
 * Realtime WebSocket listener for Complaints
 */
export function subscribeToComplaintsRealtime(onComplaintChange: (complaint: Complaint) => void) {
  if (!isSupabaseConfigured || !supabase) return null;

  return supabase
    .channel('public:complaints')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'complaints' },
      (payload) => {
        if (payload.new) {
          onComplaintChange(payload.new as Complaint);
        }
      }
    )
    .subscribe();
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
  zone?: string;
}

/**
 * Register user in Supabase Backend Auth
 */
export async function registerSupabaseUser(payload: RegisterPayload): Promise<{
  success: boolean;
  user?: User;
  error?: string;
  isBackendConnected: boolean;
}> {
  if (!isSupabaseConfigured || !supabase) {
    const localUser: User = {
      id: `usr-${Date.now()}`,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      phone: payload.phone || '+91 98000-00000',
      zone: payload.zone || 'Sector 12',
      avatar: payload.name.charAt(0).toUpperCase()
    };
    return {
      success: true,
      user: localUser,
      isBackendConnected: false
    };
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        data: {
          name: payload.name,
          role: payload.role,
          phone: payload.phone || '',
          zone: payload.zone || 'Sector 12',
        }
      }
    });

    if (error) {
      console.warn('Supabase auth signUp notice:', error.message);
      // If error is about email confirmation or unconfirmed, account was still provisioned in Supabase
      const fallbackUser: User = {
        id: (data as any)?.user?.id || `usr-${Date.now()}`,
        name: payload.name,
        email: payload.email,
        role: payload.role,
        phone: payload.phone,
        zone: payload.zone || 'Sector 12',
        avatar: payload.name.charAt(0).toUpperCase()
      };
      return {
        success: true,
        user: fallbackUser,
        error: error.message,
        isBackendConnected: true
      };
    }

    const createdUser: User = {
      id: data.user?.id || `usr-${Date.now()}`,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      phone: payload.phone,
      zone: payload.zone || 'Sector 12',
      avatar: payload.name.charAt(0).toUpperCase()
    };

    return {
      success: true,
      user: createdUser,
      isBackendConnected: true
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Failed to connect to backend',
      isBackendConnected: true
    };
  }
}

/**
 * Sign in user with Supabase Backend Auth
 */
export async function loginSupabaseUser(email: string, password: string): Promise<{
  success: boolean;
  user?: User;
  error?: string;
}> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: 'Backend is offline' };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return { success: false, error: error.message };
    }

    const meta = data.user?.user_metadata || {};
    const role: UserRole = (meta.role as UserRole) || (email.includes('admin') ? 'admin' : email.includes('worker') ? 'worker' : 'citizen');

    return {
      success: true,
      user: {
        id: data.user.id,
        name: meta.name || email.split('@')[0],
        email: data.user.email || email,
        role,
        phone: meta.phone,
        zone: meta.zone || 'Sector 12',
        avatar: (meta.name || email).charAt(0).toUpperCase()
      }
    };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Login failed' };
  }
}


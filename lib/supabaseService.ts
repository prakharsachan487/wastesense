import { supabase, isSupabaseConfigured } from './supabaseClient';
import { SmartBin, Complaint, CollectionTask, PickupRequest } from '../types';

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

    if (error) return null;
    return data as Complaint[];
  } catch {
    return null;
  }
}

/**
 * Insert a new citizen complaint into Supabase
 */
export async function insertSupabaseComplaint(complaint: Partial<Complaint>): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  try {
    const { error } = await supabase
      .from('complaints')
      .insert([complaint]);

    return !error;
  } catch {
    return false;
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

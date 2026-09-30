/**
 * Geolocation and Geofencing utilities for WasteSense platform
 */

/**
 * Calculates distance between two GPS coordinates using the Haversine formula (returns meters).
 */
export function calculateDistanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Earth radius in meters
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

/**
 * Validates if worker coordinates are within geofence radius of target site.
 * Default radius is 100 meters.
 */
export function isWithinGeofence(
  targetLat: number,
  targetLng: number,
  currentLat: number,
  currentLng: number,
  radiusMeters: number = 100
): { within: boolean; distanceMeters: number } {
  const distanceMeters = calculateDistanceMeters(targetLat, targetLng, currentLat, currentLng);
  return {
    within: distanceMeters <= radiusMeters,
    distanceMeters,
  };
}

/**
 * Map coordinates or area text to standard municipal zones.
 */
export function detectZoneFromLocation(locationText: string): string {
  const lower = locationText.toLowerCase();
  if (lower.includes('central') || lower.includes('market') || lower.includes('transit') || lower.includes('station')) {
    return 'Zone A';
  }
  if (lower.includes('sector 12') || lower.includes('residential') || lower.includes('civic') || lower.includes('colony')) {
    return 'Zone B';
  }
  if (lower.includes('hospital') || lower.includes('medical') || lower.includes('clinic')) {
    return 'Zone C';
  }
  if (lower.includes('university') || lower.includes('school') || lower.includes('college')) {
    return 'Zone D';
  }
  if (lower.includes('park') || lower.includes('lake') || lower.includes('riverfront') || lower.includes('stadium')) {
    return 'Zone E';
  }
  return 'Zone A';
}

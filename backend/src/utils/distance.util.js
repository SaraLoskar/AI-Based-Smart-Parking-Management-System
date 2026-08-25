/**
 * Distance and Navigation Utility Functions
 * Uses the Haversine formula to calculate great-circle distances between points on Earth.
 */

const EARTH_RADIUS_KM = 6371; // Earth's mean radius in kilometers

/**
 * Calculates distance between two geo-coordinates in kilometers
 * @param {number} lat1 Latitude of point 1
 * @param {number} lon1 Longitude of point 1
 * @param {number} lat2 Latitude of point 2
 * @param {number} lon2 Longitude of point 2
 * @returns {{ km: number, meters: number, formatted: string }}
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = (degree) => (degree * Math.PI) / 180;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const lat1Rad = toRadians(lat1);
  const lat2Rad = toRadians(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = EARTH_RADIUS_KM * c;
  const distanceMeters = Math.round(distanceKm * 1000);

  const roundedKm = Math.round(distanceKm * 100) / 100;
  const formatted =
    roundedKm < 1
      ? `${distanceMeters} m`
      : `${roundedKm} km`;

  return {
    km: roundedKm,
    meters: distanceMeters,
    formatted,
  };
};

/**
 * Estimates driving duration based on distance and average city driving speed (e.g. 30 km/h)
 * @param {number} distanceKm Distance in kilometers
 * @param {number} averageSpeedKmh Average speed in km/h (default: 30 km/h in urban settings)
 * @returns {{ minutes: number, formatted: string }}
 */
export const estimateDrivingDuration = (distanceKm, averageSpeedKmh = 30) => {
  const hours = distanceKm / averageSpeedKmh;
  const totalMinutes = Math.max(1, Math.round(hours * 60));

  let formatted = `${totalMinutes} min`;
  if (totalMinutes >= 60) {
    const hrs = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    formatted = mins > 0 ? `${hrs} hr ${mins} min` : `${hrs} hr`;
  }

  return {
    minutes: totalMinutes,
    formatted,
  };
};

/**
 * Generates turn-by-turn navigation deep links for Google Maps, Apple Maps, and Waze
 * @param {number} originLat User's latitude
 * @param {number} originLng User's longitude
 * @param {number} destLat Destination latitude
 * @param {number} destLng Destination longitude
 * @param {string} destinationName Optional name of destination
 * @returns {object} Navigation links object
 */
export const generateNavigationUrls = (originLat, originLng, destLat, destLng, destinationName = "") => {
  const encodedName = encodeURIComponent(destinationName || "");

  // Universal Google Maps Turn-by-Turn Directions URL
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destLat},${destLng}&travelmode=driving`;

  // Google Maps Search / Pin URL
  const googleMapsPinUrl = `https://www.google.com/maps/search/?api=1&query=${destLat},${destLng}${encodedName ? `+(${encodedName})` : ""}`;

  // Apple Maps Navigation (works seamlessly on iOS)
  const appleMapsUrl = `https://maps.apple.com/?saddr=${originLat},${originLng}&daddr=${destLat},${destLng}&dirflg=d`;

  // Waze Navigation URL (mobile deep-link)
  const wazeUrl = `https://waze.com/ul?ll=${destLat},${destLng}&navigate=yes`;

  // Embeddable Google Maps Iframe URL (for web view in React Native or Web apps)
  const embedMapUrl = `https://maps.google.com/maps?q=${destLat},${destLng}&z=15&output=embed`;

  return {
    googleMapsDirectionsUrl,
    googleMapsPinUrl,
    appleMapsUrl,
    wazeUrl,
    embedMapUrl,
  };
};

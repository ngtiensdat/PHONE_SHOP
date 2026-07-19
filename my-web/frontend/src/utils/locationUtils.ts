/**
 * Location & GPS Utility Helper
 * Determines nearest Vietnamese city based on Geolocation API coordinates using Haversine Formula.
 *
 * Related: src/components/base/Header.tsx, src/app/dia-chi/page.tsx
 * Pattern: Pure Utility Function
 */

export interface CityLocation {
  name: string;
  lat: number;
  lng: number;
  nearestStoreAddress: string;
}

export const CITY_COORDINATES: CityLocation[] = [
  {
    name: 'Hồ Chí Minh',
    lat: 10.7769,
    lng: 106.7009,
    nearestStoreAddress: '123 Nguyễn Trãi, P. Bến Thành, Quận 1',
  },
  {
    name: 'Hà Nội',
    lat: 21.0285,
    lng: 105.8542,
    nearestStoreAddress: '456 Cầu Giấy, Q. Cầu Giấy',
  },
  {
    name: 'Đà Nẵng',
    lat: 16.0544,
    lng: 108.2022,
    nearestStoreAddress: '789 Lê Duẩn, Q. Hải Châu',
  },
  {
    name: 'Cần Thơ',
    lat: 10.0452,
    lng: 105.7469,
    nearestStoreAddress: '321 Trần Hưng Đạo, Q. Ninh Kiều',
  },
  {
    name: 'Hải Phòng',
    lat: 20.8449,
    lng: 106.6881,
    nearestStoreAddress: '88 Lương Khánh Thiện, Q. Ngô Quyền',
  },
];

/**
 * Calculates straight-line distance in kilometers between two GPS coordinates using Haversine formula
 */
export function getDistanceInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Returns the nearest city object based on user latitude and longitude
 */
export function getNearestCity(userLat: number, userLng: number): CityLocation {
  let nearestCity = CITY_COORDINATES[0];
  let minDistance = getDistanceInKm(userLat, userLng, nearestCity.lat, nearestCity.lng);

  for (let i = 1; i < CITY_COORDINATES.length; i++) {
    const city = CITY_COORDINATES[i];
    const dist = getDistanceInKm(userLat, userLng, city.lat, city.lng);
    if (dist < minDistance) {
      minDistance = dist;
      nearestCity = city;
    }
  }

  return nearestCity;
}

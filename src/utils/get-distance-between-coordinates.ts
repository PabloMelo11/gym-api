export interface Coordinate {
  latitude: number;
  longitude: number;
}

interface Kilometers {
  distance: number;
}

export function getDistanceBetweenCoordinates(
  from: Coordinate,
  to: Coordinate
): Kilometers {
  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return { distance: 0 };
  }

  const fromRadian = (Math.PI * from.latitude) / 180;
  const toRadian = (Math.PI * to.latitude) / 180;

  const theta = from.longitude - to.longitude;
  const radTheta = (Math.PI * theta) / 180;

  let dist =
    Math.sin(fromRadian) * Math.sin(toRadian) +
    Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(radTheta);

  if (dist > 1) {
    dist = 1;
  }

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344;

  return { distance: dist };
}

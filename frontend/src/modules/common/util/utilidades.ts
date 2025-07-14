export default function parseWKT(wkt: string): { lat: number; lng: number } | null {
  const match = wkt.match(/POINT\s*\(([-\d.]+)\s+([-\d.]+)\)/);
  if (!match) return null;
  const [, lng, lat] = match;
  return { lat: parseFloat(lat), lng: parseFloat(lng) };
}

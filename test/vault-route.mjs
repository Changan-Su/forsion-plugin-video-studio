// Serve a file from the mock host's in-memory vault the way amadeus-asset:// does: real media types and
// byte ranges (206), so audio and video can stream and seek in the preview.
const TYPES = { mp3: 'audio/mpeg', wav: 'audio/wav', webm: 'video/webm', mp4: 'video/mp4', png: 'image/png', jpg: 'image/jpeg' };

export async function serveVault(page, route, path) {
  const buf = await page.evaluate(q => { const v = HOST.files.get(q); return v ? Array.from(typeof v === 'string' ? new TextEncoder().encode(v) : v) : null; }, path);
  if (!buf) return route.fulfill({ status: 404 });
  const body = Buffer.from(buf), contentType = TYPES[path.split('.').pop().toLowerCase()] || 'application/octet-stream';
  const m = /^bytes=(\d*)-(\d*)$/.exec(route.request().headers().range || '');
  if (!m || (!m[1] && !m[2])) return route.fulfill({ body, contentType, headers: { 'Accept-Ranges': 'bytes' } });
  const start = m[1] ? +m[1] : Math.max(0, body.length - +m[2]);
  const end = m[1] && m[2] ? Math.min(+m[2], body.length - 1) : body.length - 1;
  if (start > end) return route.fulfill({ status: 416, headers: { 'Content-Range': `bytes */${body.length}` } });
  return route.fulfill({ status: 206, body: body.subarray(start, end + 1), contentType, headers: { 'Accept-Ranges': 'bytes', 'Content-Range': `bytes ${start}-${end}/${body.length}` } });
}

/**
 * Utility function to convert DigitalOcean Spaces URLs or paths to proxy URLs
 * @param {string} urlOrPath - The image URL or path (can be public URL, private URL, or path like 'images/file.jpeg')
 * @returns {string} - Proxy URL if from DigitalOcean Spaces, original value otherwise
 */
export function getSignedImageUrl(urlOrPath) {
  if (!urlOrPath) return urlOrPath;

  const isPath = !urlOrPath.startsWith('http://') && !urlOrPath.startsWith('https://');
  
  // Check if it's a relative path from backend proxy (starts with /api/upload/image)
  if (isPath && urlOrPath.startsWith('/api/upload/image')) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';
    return `${apiUrl}${urlOrPath}`;
  }
  
  // Check if it's a DigitalOcean Spaces URL or path
  // DigitalOcean Spaces URLs typically contain 'digitaloceanspaces.com'
  // Paths from DigitalOcean Spaces typically start with 'images/', 'logos/', etc.
  const isDigitalOceanSpace = 
    urlOrPath.includes('digitaloceanspaces.com') || 
    urlOrPath.includes('sgp1.digitaloceanspaces.com') ||
    urlOrPath.includes('nyc3.digitaloceanspaces.com') ||
    urlOrPath.includes('ams3.digitaloceanspaces.com') ||
    urlOrPath.includes('fra1.digitaloceanspaces.com') ||
    // Check if it's a path that looks like DigitalOcean Spaces path (starts with common folders)
    (isPath && (urlOrPath.startsWith('images/') || urlOrPath.startsWith('logos/') || urlOrPath.startsWith('uploads/')));

  // If not a DigitalOcean Space URL or path, return as-is
  if (!isDigitalOceanSpace) {
    return urlOrPath;
  }

  // Create proxy URL
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';
  const encodedPath = encodeURIComponent(urlOrPath);
  return `${apiUrl}/api/upload/image?path=${encodedPath}`;
}

/**
 * Convert multiple image URLs to proxy URLs
 * @param {string|string[]} urls - Single URL or array of URLs
 * @returns {string|string[]} - Proxy URL(s)
 */
export function getSignedImageUrls(urls) {
  if (Array.isArray(urls)) {
    return urls.map(url => getSignedImageUrl(url));
  }
  return getSignedImageUrl(urls);
}


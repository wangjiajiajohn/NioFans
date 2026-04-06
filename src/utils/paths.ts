export const getAssetPath = (path: string) => {
  // Hardcoded for NioFans deployment as a fallback for production
  const isProd = process.env.NODE_ENV === 'production';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (isProd ? '/NioFans' : '');
  
  if (!path) return '';
  // Return early if it's already an absolute URL
  if (path.startsWith('http') || path.startsWith('https')) return path;
  
  // Ensure we don't double slash
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // Avoid double prefixing if path already includes basePath
  if (basePath && cleanPath.startsWith(basePath)) return cleanPath;
  
  return `${basePath}${cleanPath}`;
};

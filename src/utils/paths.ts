export const getAssetPath = (path: string) => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  // Ensure we don't double slash
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (path.startsWith('http') || path.startsWith('https')) return path;
  return `${basePath}${cleanPath}`;
};

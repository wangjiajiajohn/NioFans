export const getAssetPath = (path: string) => {
  const basePath = process.env.NODE_ENV === 'production' ? '/NioFans' : '';
  // Ensure we don't double slash
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
};

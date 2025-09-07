// src/utils/image.js

// Плейсхолдер як data-URI (без додаткових файлів у public)
export const FALLBACK_IMG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480">
      <rect width="100%" height="100%" fill="#F2F4F7"/>
      <text x="50%" y="50%" font-family="Arial" font-size="20" fill="#98A2B3"
            text-anchor="middle" dominant-baseline="middle">No image</text>
     </svg>`
  );

// Перша картинка для картки (обкладинка)
export function getCoverImage(camper) {
  const g = camper?.gallery;
  if (Array.isArray(g) && g.length) {
    const first = g[0];
    if (typeof first === 'string') return first;
    if (first?.thumb) return first.thumb;
    if (first?.original) return first.original;
  }
  return (
    camper?.image || camper?.img || camper?.imageUrl || camper?.photo || ''
  );
}

// Повна галерея для сторінки деталей
export function getGallery(camper) {
  const g = camper?.gallery;
  if (Array.isArray(g) && g.length) {
    return g
      .map(item =>
        typeof item === 'string' ? item : item.original || item.thumb || ''
      )
      .filter(Boolean);
  }
  const one = getCoverImage(camper);
  return one ? [one] : [];
}

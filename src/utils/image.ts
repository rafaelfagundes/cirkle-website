export function cloudinaryImage(
  uri: string,
  size: number,
  quality = "low"
): string {
  const options = `c_scale,q_auto:${quality},w_${Math.floor(size * 2)}/`;
  const newUri = uri.replace("upload/", "upload/" + options);

  return newUri;
}

export function cloudinaryProductImage(
  uri: string,
  size: number,
  quality = "low"
): string {
  // `c_crop,g_center,h_${size * 1.15 * 2},w_${size * 2},q_auto:eco/`
  const options = `c_fill,g_center,h_${Math.floor(
    size * 1.15 * 2
  )},w_${Math.floor(size * 2)},q_auto:${quality}/`;
  const newUri = uri.replace("upload/", "upload/" + options);

  return newUri;
}

export function cloudinaryHeroImage(uri: string): string {
  const newUri = uri.replace(
    "upload/",
    "upload/c_fill,e_saturation:-100,g_faces:center,h_600,q_auto:low/"
  );
  return newUri;
}

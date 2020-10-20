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

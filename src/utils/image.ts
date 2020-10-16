export function cloudinaryImage(
  uri: string,
  size: number,
  quality = "low"
): string {
  // f_auto, transforma em imagens com mais compressão JPEG-2000, JPEG-XR, WEBP
  // const options = `f_auto,c_scale,q_auto:${quality},w_${
  //   size * window.devicePixelRatio
  // }/`;
  const options = `c_scale,q_auto:${quality},w_${size}/`;
  const newUri = uri.replace("upload/", "upload/" + options);

  return newUri;
}

export function cloudinaryProductImage(uri: string, size: number): string {
  // const options = `c_lfill,g_center,h_${size * 1.34},q_auto:eco,w_${size}/`;
  const options = `c_lfill,g_center,h_${size * 1.15},q_auto:eco,w_${size}/`;
  const newUri = uri.replace("upload/", "upload/" + options);

  return newUri;
}

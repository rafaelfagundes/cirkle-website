export function cloudinaryImage(
  uri: string,
  size: number,
  quality = "low"
): string {
  const options = `c_scale,q_auto:${quality},w_${
    size * window.devicePixelRatio
  }/`;
  const newUri = uri.replace("upload/", "upload/" + options);
  return newUri;
}

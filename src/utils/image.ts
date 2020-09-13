export function cloudinaryImage(
  uri: string,
  size: number,
  quality = "low"
): string {
  const options = `c_scale,q_auto:${quality},w_${size}/`;

  const newUri = uri.replace("upload/", "upload/" + options);

  console.log("functioncloudinaryImage -> uri", newUri);
  return newUri;
}

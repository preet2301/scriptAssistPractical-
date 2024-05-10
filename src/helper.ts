export function getIdFromUrl(url: string) {
  const arr = url?.split("/").filter((item) => item);
  return arr[arr.length - 1];
}

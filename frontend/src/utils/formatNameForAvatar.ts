export default function formatNameForAvatar(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toLocaleUpperCase();
}

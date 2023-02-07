export function getAssetSrc(name: string) {
  const path = `/src/assets/${name}`;
  const modules = import.meta.glob("/src/assets/*", { eager: true });
  const mod = modules[path] as { default: string };
  if (!mod) return null;
  return mod.default;
}

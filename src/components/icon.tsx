import { icons as phosphor } from "@iconify-json/ph";
import { getIconData, iconToSVG, replaceIDs } from "@iconify/utils";
import { cn } from "@/lib/utils";

type IconProps = {
  /** Phosphor ikon adı, örn. "shield-check-light" */
  name: string;
  className?: string;
  size?: number;
};

/**
 * Iconify Phosphor setinden sunucu tarafında render edilen ikon.
 * İkon verisi paket içinde geldiği için çalışma anında ağ isteği yapmaz.
 */
export function Icon({ name, size = 20, className }: IconProps) {
  const data = getIconData(phosphor, name);
  if (!data) return null;

  const render = iconToSVG(data, { width: size, height: size });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="${cn(
    "shrink-0"
  )}" ${Object.entries(render.attributes)
    .map(([k, v]) => `${k}="${v}"`)
    .join(" ")}>${render.body}</svg>`;

  return (
    <span
      className={cn("inline-flex shrink-0 items-center justify-center", className)}
      dangerouslySetInnerHTML={{ __html: replaceIDs(svg) }}
    />
  );
}

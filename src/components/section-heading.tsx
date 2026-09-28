import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";

type SectionHeadingProps = {
  index?: string;
  eyebrow: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  action,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-6",
        centered
          ? "items-center text-center"
          : "md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div className={cn("max-w-2xl", centered && "flex flex-col items-center")}>
        <p className="eyebrow flex items-center gap-3">
          {index && (
            <>
              <span>{index}</span>
              <span aria-hidden className="h-px w-8 bg-gold/60" />
            </>
          )}
          <span>{eyebrow}</span>
        </p>
        <h2 className="mt-3 font-heading text-4xl leading-[1.08] font-medium text-balance md:text-5xl">
          {title}
        </h2>
        {description && (
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {action && (
        <Link href={action.href} className="link-underline text-foreground">
          {action.label}
          <Icon name="arrow-right-light" size={15} />
        </Link>
      )}
    </Reveal>
  );
}

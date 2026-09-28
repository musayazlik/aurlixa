import { Skeleton } from "@/components/ui/skeleton";

/** Ürün detay sayfasının iskelet yerleşimi — /urun/[slug] loading durumu. */
export function ProductSkeleton() {
  return (
    <div className="py-10 lg:py-14">
      {/* body column-flex olduğu için mx-auto doğrudan burada olamaz — stretch bozulur */}
      <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12">
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-3" />
          <Skeleton className="h-3 w-24" />
        </div>

        <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Skeleton className="aspect-[4/5] w-full" />
            <div className="mt-4 flex gap-3">
              <Skeleton className="aspect-[3/4] w-20" />
              <Skeleton className="aspect-[3/4] w-20" />
            </div>
          </div>

          <div className="flex flex-col">
            <Skeleton className="h-3 w-40" />
            <Skeleton className="mt-5 h-12 w-3/4" />
            <Skeleton className="mt-4 h-8 w-36" />
            <div className="mt-6 flex gap-2">
              <Skeleton className="h-8 w-28" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-20" />
            </div>
            <Skeleton className="mt-8 h-3 w-full" />
            <Skeleton className="mt-2 h-3 w-5/6" />
            <Skeleton className="mt-2 h-3 w-2/3" />

            <Skeleton className="mt-10 h-12 w-full" />

            <div className="mt-10 flex flex-col gap-4 border-t border-border pt-8">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="size-6" />
                  <Skeleton className="h-3 w-64 max-w-full" />
                </div>
              ))}
            </div>

            <div className="mt-10 border-t border-border">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-border py-5"
                >
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="size-4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

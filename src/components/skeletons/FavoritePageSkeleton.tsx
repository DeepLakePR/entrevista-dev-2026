import { Skeleton } from "@/src/components/ui/skeleton";

export default function FavoritePageSkeleton() {
    return (<div className="mx-auto w-full max-w-6xl space-y-4">

        <div className="mt-4 space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-1/3" />
        </div>

        <div className="flex gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
                <div className="rounded-xl py-4 w-full sm:w-1/2 lg:w-1/3" key={index}>
                    <div className="relative mx-auto w-full rounded-xl border bg-card p-4">
                        <Skeleton className="h-[240px] w-full rounded-xl" />
                        <div className="mt-4 space-y-2">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-6 w-1/3" />
                        </div>
                        <div className="mt-4 flex gap-2">
                            <Skeleton className="h-10 w-2/4" />
                            <Skeleton className="h-10 w-2/4" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    )
}

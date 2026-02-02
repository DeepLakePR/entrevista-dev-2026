import { Skeleton } from "@/src/components/ui/skeleton";

export default function ProductDetailsSkeleton() {
    return (
        <section className="w-full">
            <div className="p-8">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-28" />
                    </div>
                    <Skeleton className="h-10 w-10 rounded-md" />
                </div>

                <div className="flex flex-col lg:flex-row">
                    <div className="mx-auto w-full max-w-[400px]">
                        <Skeleton className="h-[400px] w-full rounded-xl" />
                    </div>

                    <div className="lg:px-8 w-full mt-4 lg:mt-0">
                        <Skeleton className="h-8 w-3/4" />

                        <div className="flex justify-between mb-4 mt-4">
                            <Skeleton className="h-8 w-1/3" />
                            <Skeleton className="h-8 w-1/4" />
                        </div>

                        <div className="flex gap-2 lg:max-w-100">
                            <Skeleton className="h-10 w-3/4" />
                            <Skeleton className="h-10 w-1/4" />
                        </div>

                        <Skeleton className="h-4 w-full mt-6" />
                        <Skeleton className="h-4 w-11/12 mt-2" />
                        <Skeleton className="h-4 w-10/12 mt-2" />
                    </div>
                </div>
            </div>
        </section>
    );
}

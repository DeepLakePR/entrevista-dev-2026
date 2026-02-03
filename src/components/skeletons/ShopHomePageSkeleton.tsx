import { Skeleton } from "../ui/skeleton";
import CategoryFilterSkeleton from "./CategoryFilterSkeleton";
import ProductGridSkeleton from "./ProductGridSkeleton";

export default function ShopHomePageSkeleton() {
    return <>
        <CategoryFilterSkeleton />

        <div className="flex gap-8 justify-between">
            <Skeleton className="h-7 w-2/4" />
            <Skeleton className="h-7 w-2/4" />
        </div>

        <ProductGridSkeleton />
    </>
}

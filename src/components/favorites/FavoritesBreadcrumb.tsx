import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";

export default function FavoritesBreadcrumb() {
    return <Breadcrumb className="mb-4">

        <BreadcrumbList>

            <BreadcrumbItem>
                <BreadcrumbLink href="/">Produtos</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
                <BreadcrumbPage>Favoritos</BreadcrumbPage>
            </BreadcrumbItem>

        </BreadcrumbList>

    </Breadcrumb>
}

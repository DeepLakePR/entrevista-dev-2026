import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { HeartIcon, ShoppingCart } from "lucide-react";

export default function Header() {
    return <header className="border-b-1">
        <div className="text-white py-4 px-3 flex justify-between">
            <Link href="/" title="Uncode Commerce">
                <Image
                    src="/logo.png"
                    width={96}
                    height={96}
                    alt="Uncode Commerce Logo"
                    loading="lazy"
                    className="object-cover aspect-square"
                />
            </Link>

            <div className="flex gap-2">
                <Button size="lg">
                    <ShoppingCart />
                    0
                </Button>
                <Button size="lg">
                    <HeartIcon fill="red" color="red" />
                </Button>
            </div>
        </div>
    </header>
}

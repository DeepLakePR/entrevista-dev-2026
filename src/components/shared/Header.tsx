import Link from "next/link";

export default function Header() {
    return <header className="bg-linear-to-br from-slate-900 to-slate-700">
        <div className="container text-white py-4 px-3">
            Header
            <Link href="#">Cart</Link>
        </div>
    </header>
}

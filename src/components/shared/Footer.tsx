import Link from "next/link";

export default function Footer() {

    return <footer>
        <div className="
            mx-auto 
            flex-col flex xl:flex-row 
            xl:justify-between items-center justify-center 
            gap-y-1 
            p-6 px-10 xl:p-8 xl:px-16
            text-center">
            <div className="contact">
                <p className="font-light">
                    Contate-nos:{' '} 
                    <Link href="tel:+554100000000" title="Contact Us" target="_blank" className="underline underline-offset-2 font-semibold">
                        +55 (41) 0000-0000
                    </Link>
                </p>
            </div>
            
            <p className="leading-6 font-light">
                © 2026 Uncode Commerce - Todos os direitos reservados
            </p>
        </div>
    </footer>
}

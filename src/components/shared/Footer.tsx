import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div
        className="
          mx-auto flex flex-col items-center justify-center gap-y-4 p-6 px-10 text-center
          xl:flex-row xl:justify-between xl:p-8 xl:px-16
        "
      >
        <div className="contact">
          <p className="font-light">
            Contate-nos:{" "}
            <Link
              href="tel:+554100000000"
              title="Telefone de contato"
              className="font-semibold underline underline-offset-2"
              aria-label="Ligar para +55 41 0000-0000"
            >
              +55 (41) 0000-0000
            </Link>
          </p>
        </div>

        <p className="font-light leading-6">
          &copy; 2026 Uncode Commerce - Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
}

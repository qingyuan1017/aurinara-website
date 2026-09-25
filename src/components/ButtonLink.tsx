import { Link } from "react-router-dom";

type ButtonLinkProps = {
  to: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export default function ButtonLink({
  to,
  children,
  variant = "primary",
}: ButtonLinkProps) {
  if (variant === "secondary") {
    // Editorial text link with a hand-drawn-style underline, not a pill.
    return (
      <Link
        to={to}
        className="group inline-flex items-center gap-2 self-start font-medium text-teal-800 transition hover:text-teal-900"
      >
        <span className="border-b border-teal-800/40 pb-0.5 transition group-hover:border-teal-800">
          {children}
        </span>
        <span aria-hidden className="transition group-hover:translate-x-0.5">
          &rarr;
        </span>
      </Link>
    );
  }

  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center rounded-md bg-teal-800 px-6 py-3 font-medium text-canvas shadow-sm transition hover:bg-teal-900"
    >
      {children}
    </Link>
  );
}

import Image from "next/image";
import Link from "next/link";

interface LogoMarkProps {
  className?: string;
  priority?: boolean;
}

export function LogoMark({ className = "", priority = false }: LogoMarkProps) {
  return (
    <Link href="/" className={`logo-mark ${className}`} aria-label="Opera Creatives home">
      <Image src="/logo-oc.png" alt="" width={889} height={645} priority={priority} sizes="96px" />
    </Link>
  );
}

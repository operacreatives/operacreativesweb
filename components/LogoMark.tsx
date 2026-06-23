"use client";

import Image from "next/image";
import Link from "next/link";

interface LogoMarkProps {
  className?: string;
  priority?: boolean;
  showText?: boolean;
}

export function LogoMark({ className = "", priority = false, showText = false }: LogoMarkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined") {
      if (window.location.pathname === "/") {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    }
  };

  return (
    <Link 
      href="/" 
      onClick={handleClick}
      className={`logo-mark ${className}`} 
      aria-label="Opera Creatives home"
    >
      <Image 
        src="/logo-oc.png" 
        alt="" 
        width={889} 
        height={645} 
        priority={priority} 
        sizes="96px" 
        style={{ width: "62px", height: "auto" }}
        className="logo-mark__image"
      />
      {showText && <span className="site-header__logo-text">Opera Creatives</span>}
    </Link>
  );
}

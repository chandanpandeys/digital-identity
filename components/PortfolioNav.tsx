"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function PortfolioNav() {
  const pathname = usePathname();
  return <nav className="site-shell portfolio-nav" aria-label="Portfolio verticals">
    {[["/ai", "AI"], ["/content", "Content"], ["/about", "Complete"], ["/work", "Evidence library"], ["/resume", "Resumes"]].map(([href, label]) =>
      <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>{label}<span aria-hidden="true"> ↗</span></Link>
    )}
  </nav>;
}

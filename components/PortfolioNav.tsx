"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, List, X } from "@phosphor-icons/react";
export function PortfolioNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="studio-header">
      <div className="studio-shell nav-inner">
        <Link className="studio-brand" href="/" onClick={() => setOpen(false)}>
          <span className="brand-monogram">cp.</span>
          <span>
            Chandan Pandey<small>ENGINEER. RESEARCHER. CREATOR.</small>
          </span>
        </Link>
        <button
          className="mobile-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="studio-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <List size={24} />}
        </button>
        <nav
          id="studio-navigation"
          className={open ? "studio-navigation is-open" : "studio-navigation"}
          aria-label="Main navigation"
        >
          {(
            [
              ["/ai", "AI"],
              ["/content", "Content"],
              ["/work", "Work"],
              ["/about", "Complete"],
              ["/credentials", "Credentials"],
            ] as const
          ).map(([href, label]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              aria-current={pathname === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link href="/ask" className="nav-ask">
          Ask Chandan <ArrowUpRight size={17} />
        </Link>
      </div>
    </header>
  );
}

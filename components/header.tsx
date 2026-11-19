"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, ChevronDown, Phone, ShieldCheck } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { clinic, phoneHref } from "@/lib/clinic";
import { treatments } from "@/lib/content";
import { Action } from "./actions";
import { track } from "@/lib/analytics";
export function Logo() {
  return (
    <Link href="/" className="logo" aria-label={`${clinic.name} home`}>
      <span className="logo-art logo-art-full" aria-hidden="true">
        <Image
          className="logo-image logo-user-image"
          src="/images/deepsara-logo-user.png"
          alt={clinic.name}
          width={640}
          height={320}
          priority
        />
      </span>
    </Link>
  );
}
const links = [
  ["Home", "/"],
  ["About Us", "/about#about-doctor"],
  ["Blog", "/blog"],
  ["Contact", "/contact"],
];
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="topline">
        <div className="container">
          <span>
            <ShieldCheck size={14} />
            Private conversations. Professional guidance.
          </span>
          <Link href="/book-consultation">
            Your care starts with a conversation{" "}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
      <header className="header">
        <div className="container header-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.slice(0, 2).map(([name, href]) => (
              <Link
                key={href}
                href={href}
                aria-current={
                  pathname === href.split("#")[0] ? "page" : undefined
                }
              >
                {name}
              </Link>
            ))}
            <div className="service-nav-group">
              <Link
                href="/services"
                aria-current={
                  pathname.startsWith("/services") ? "page" : undefined
                }
              >
                Services
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="nav-trigger"
                    aria-label="Open treatment links"
                  >
                    <ChevronDown size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="service-menu" align="start">
                  <DropdownMenuItem asChild>
                    <Link href="/services">Our Services</Link>
                  </DropdownMenuItem>
                  {treatments.map((t) => (
                    <DropdownMenuItem key={t.slug} asChild>
                      <Link href={`/services/${t.slug}`}>{t.name}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {links.slice(2).map(([name, href]) => (
              <Link
                key={href}
                href={href}
                aria-current={pathname === href ? "page" : undefined}
              >
                {name}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            {phoneHref && (
              <a
                href={phoneHref}
                onClick={() => track("call_click")}
                className="header-phone"
              >
                <Phone size={17} />
                {clinic.phone}
              </a>
            )}
            <Action />
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                className="menu-toggle"
                variant="ghost"
                aria-label="Open navigation"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="mobile-menu">
              <SheetTitle>Deepsara</SheetTitle>
              <SheetDescription>
                Find care and contact our team.
              </SheetDescription>
              <nav aria-label="Mobile navigation">
                <SheetClose asChild>
                  <Link href="/">Home</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/about#about-doctor">About Us</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/services">Our Services</Link>
                </SheetClose>
                {treatments.map((t) => (
                  <SheetClose asChild key={t.slug}>
                    <Link
                      className="mobile-treatment"
                      href={`/services/${t.slug}`}
                    >
                      {t.name}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link href="/blog">Blog</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/contact">Contact</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    className="btn btn-primary"
                    href="/book-consultation"
                    onClick={() => track("book_consultation_click")}
                  >
                    Book Free Consultation
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}

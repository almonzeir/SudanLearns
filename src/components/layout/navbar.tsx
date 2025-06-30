
"use client";

import Link from 'next/link';
import { BookOpen, LayoutDashboard, Video, ListChecks, Info, Sparkles, Bot } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Sparkles },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/videos', label: 'Videos', icon: Video },
  { href: '/exercises', label: 'Exercises', icon: ListChecks },
  { href: '/about', label: 'About', icon: Info },
];

export default function Navbar() {
  const pathname = usePathname();

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navItems.map((item) => (
        <Button
          key={item.label}
          variant="ghost"
          asChild
          size="sm"
          className={cn(
            "justify-start w-full font-medium",
            mobile ? "mb-2 text-lg" : "text-sm",
            pathname === item.href ? "bg-accent text-accent-foreground" : ""
          )}
        >
          <Link href={item.href}>
            <item.icon className={cn("mr-2 h-4 w-4", mobile && "h-5 w-5")} />
            {item.label}
          </Link>
        </Button>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-xl">Sudan Shines</span>
        </Link>
        <nav className="hidden md:flex flex-1 items-center space-x-1">
          <NavLinks />
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/dashboard#ai-study-helper">
              <Bot className="h-5 w-5" />
              <span className="hidden md:inline-block ml-2 font-medium">Ask AI</span>
            </Link>
          </Button>
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-4 py-6">
                <NavLinks mobile />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

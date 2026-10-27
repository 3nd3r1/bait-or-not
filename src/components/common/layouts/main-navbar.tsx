"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Library, LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const MainNavbar = () => {
    const pathname = usePathname();

    const items: {
        title: string;
        href: string;
        icon: LucideIcon;
        isActive: boolean;
    }[] = [
        {
            title: "About",
            href: "/about",
            icon: Library,
            isActive: pathname === "/about",
        },
    ];

    return (
        <header className="w-full border-b">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row">
                    <div className="px-4 py-3">
                        <Library />
                    </div>
                    <Separator orientation="vertical" />
                    <nav className="grow px-4 py-2">
                        {items.map((item) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                className={cn(
                                    buttonVariants({ variant: "ghost" }),
                                    item.isActive && "bg-primary/10"
                                )}
                            >
                                <item.icon size={16} />
                                <span>{item.title}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default MainNavbar;

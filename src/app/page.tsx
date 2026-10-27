import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function Home() {
    return (
        <main className="flex-1 bg-background p-8">
            <div className="mx-auto max-w-4xl space-y-8">
                <div className="space-y-2 text-center">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Ender - Next.js Template
                    </h1>
                    <p className="text-muted-foreground">
                        A minimal Next.js starter with React 19, Tailwind CSS 4,
                        and shadcn/ui
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Stack</CardTitle>
                            <CardDescription>
                                All dependencies kept at latest versions
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <p>Next.js with App Router</p>
                            <p>React with Server Components</p>
                            <p>Tailwind CSS</p>
                            <p>TypeScript</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Testing</CardTitle>
                            <CardDescription>
                                Ready for test-driven development
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <p>Vitest for unit tests</p>
                            <p>React Testing Library</p>
                            <p>API route testing</p>
                            <p>Component testing</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Developer Experience</CardTitle>
                            <CardDescription>
                                Tools to keep code clean
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <p>ESLint with Next.js config</p>
                            <p>Prettier with import sorting</p>
                            <p>Zod for validation</p>
                            <p>Path aliases (@/)</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>SEO Ready</CardTitle>
                            <CardDescription>
                                Built-in metadata handling
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <p>Auto-generated OG images</p>
                            <p>Sitemap and robots.txt</p>
                            <p>Structured data (JSON-LD)</p>
                            <p>Centralized site config</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex justify-center gap-4">
                    <Link href="/about" className={buttonVariants()}>
                        About
                    </Link>
                    <a
                        href="https://github.com/3nd3r1/nextjs-template"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonVariants({ variant: "outline" })}
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </main>
    );
}

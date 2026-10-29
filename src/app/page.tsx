import { siteConfig } from "@/lib/config";

export default function Home() {
    return (
        <main className="flex flex-1 items-center justify-center bg-background p-8">
            <div className="space-y-2 text-center">
                <h1 className="text-4xl font-bold tracking-tight">
                    {siteConfig.name}
                </h1>
                <p className="text-muted-foreground">
                    {siteConfig.description}
                </p>
            </div>
        </main>
    );
}

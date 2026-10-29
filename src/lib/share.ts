import { siteConfig } from "@/lib/config";

export const formatShareText = (dayNumber: number, results: boolean[]) => {
    const score = results.filter(Boolean).length;
    const grid = results.map((correct) => (correct ? "⬜" : "🎣")).join("");
    return [
        `${siteConfig.name} #${dayNumber} ${score}/${results.length}`,
        grid,
        new URL(siteConfig.url).host,
    ].join("\n");
};

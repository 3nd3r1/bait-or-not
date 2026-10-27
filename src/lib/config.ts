import type { SiteConfig } from "@/validators/config";

export const siteConfig: SiteConfig = {
    // Basic info - UPDATE THESE
    name: "My App",
    shortName: "App",
    description: "A brief description of your application",
    url: "https://example.com",

    // Branding - UPDATE THESE
    themeColor: "#000000",
    backgroundColor: "#000000",
    locale: "en_US",
    language: "en",

    // Author info - UPDATE THESE
    author: {
        name: "Your Name",
        url: "https://yoursite.com",
    },

    // Keywords for SEO - UPDATE THESE
    keywords: ["keyword1", "keyword2", "keyword3"],

    // App category - UPDATE THIS
    category: "technology",
};

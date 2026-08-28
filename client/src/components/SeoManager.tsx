import { useEffect } from "react";
import { useLocation } from "wouter";

const SITE_URL = "https://businessbloomllc.com";
const DEFAULT_TITLE = "Business Bloom | Launch, Fund, Automate and Grow with AI";
const DEFAULT_DESCRIPTION =
  "Business Bloom helps entrepreneurs launch, strengthen, fund, automate and grow their businesses through one AI-powered operating system.";

const routeMetadata: Record<string, { title: string; description: string }> = {
  "/": {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  "/solutions": {
    title: "Business Solutions | Business Bloom",
    description:
      "Explore Business Bloom solutions for launching, operating, automating and growing a small business with practical AI-enabled systems.",
  },
  "/about": {
    title: "About Business Bloom | Small Business Growth & AI Systems",
    description:
      "Learn how Business Bloom helps entrepreneurs build stronger businesses with practical systems, automation, education and digital resources.",
  },
  "/resources": {
    title: "Small Business Resources | Business Bloom",
    description:
      "Explore practical Business Bloom resources for entrepreneurs building, operating, automating and growing a small business.",
  },
  "/get-started": {
    title: "Get Started with Business Bloom",
    description:
      "Start with Business Bloom and find the services, tools and resources that fit your current stage of business growth.",
  },
  "/marketplace": {
    title: "Business Bloom Marketplace | Digital Business Resources",
    description:
      "Browse Business Bloom digital products and practical resources designed to help entrepreneurs launch, operate and grow more efficiently.",
  },
  "/prompt-packs": {
    title: "AI Prompt Packs for Business | Business Bloom",
    description:
      "Explore Business Bloom prompt packs designed to help entrepreneurs use AI more effectively for practical business workflows.",
  },
  "/dfy-services": {
    title: "Done-for-You Business Services | Business Bloom",
    description:
      "Explore Business Bloom done-for-you services for entrepreneurs who want practical support implementing business systems and automation.",
  },
  "/hosting": {
    title: "Business Hosting Solutions | Business Bloom",
    description:
      "Explore Business Bloom hosting resources for entrepreneurs building a professional and reliable online business presence.",
  },
  "/domains": {
    title: "Business Domain Resources | Business Bloom",
    description:
      "Explore Business Bloom domain resources for establishing and managing a professional online business presence.",
  },
  "/shopify-app": {
    title: "Business Bloom Shopify App",
    description:
      "Learn about Business Bloom tools and resources designed to support Shopify entrepreneurs and ecommerce workflows.",
  },
  "/free-shopify-store": {
    title: "Free Shopify Store Resource | Business Bloom",
    description:
      "Learn about Business Bloom resources for entrepreneurs exploring a Shopify storefront and ecommerce business setup.",
  },
  "/support": {
    title: "Business Bloom Support",
    description: "Get support for Business Bloom products, services and customer resources.",
  },
  "/privacy": {
    title: "Privacy Policy | Business Bloom",
    description: "Read the Business Bloom privacy policy.",
  },
  "/terms": {
    title: "Terms of Service | Business Bloom",
    description: "Read the Business Bloom terms of service.",
  },
};

function setMeta(selector: string, attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

export default function SeoManager() {
  const [location] = useLocation();

  useEffect(() => {
    const normalizedPath = location.split("?")[0].split("#")[0] || "/";
    const isMarketplaceProduct = normalizedPath.startsWith("/marketplace/") && !["/marketplace/success", "/marketplace/cancel"].includes(normalizedPath);
    const metadata =
      routeMetadata[normalizedPath] ??
      (isMarketplaceProduct
        ? {
            title: "Business Bloom Marketplace Product",
            description: "Explore this Business Bloom digital product and practical business resource.",
          }
        : { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION });

    const canonicalUrl = `${SITE_URL}${normalizedPath === "/" ? "/" : normalizedPath}`;

    document.title = metadata.title;
    setMeta('meta[name="description"]', "name", "description", metadata.description);
    setMeta('meta[property="og:title"]', "property", "og:title", metadata.title);
    setMeta('meta[property="og:description"]', "property", "og:description", metadata.description);
    setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", metadata.title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", metadata.description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const noindex = normalizedPath === "/marketplace/success" || normalizedPath === "/marketplace/cancel" || normalizedPath === "/404";
    setMeta('meta[name="robots"]', "name", "robots", noindex ? "noindex,follow" : "index,follow");
  }, [location]);

  return null;
}

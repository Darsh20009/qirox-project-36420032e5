import { useEffect } from "react";

interface SEOOptions {
  title: string;
  siteName?: string;
  description?: string;
  image?: string;
  type?: "website" | "article";
  url?: string;
}

const SITE_NAME = "جمعية معين لخدمات الحج والعمرة";
const BASE_URL = window.location.origin;
const DEFAULT_IMAGE = `${BASE_URL}/images/mueen-kaaba-hero.jpg`;

function setMeta(property: string, content: string, isName = false) {
  const attr = isName ? "name" : "property";
  let el = document.querySelector(`meta[${attr}="${property}"]`) as HTMLMetaElement;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function useSEO({ title, siteName = SITE_NAME, description, image, type = "website", url }: SEOOptions) {
  useEffect(() => {
    const fullTitle = `${title} | ${siteName}`;
    const finalDesc = description || "جمعية معين لخدمات الحج والعمرة لخدمة ضيوف الرحمن.";
    const finalImage = image ? (image.startsWith("http") ? image : `${BASE_URL}${image}`) : DEFAULT_IMAGE;
    const finalUrl = url || window.location.href;

    // Page title
    document.title = fullTitle;

    // Basic meta
    setMeta("description", finalDesc, true);

    // Open Graph
    setMeta("og:title", fullTitle);
    setMeta("og:description", finalDesc);
    setMeta("og:image", finalImage);
    setMeta("og:image:width", "1200");
    setMeta("og:image:height", "630");
    setMeta("og:url", finalUrl);
    setMeta("og:type", type);
    setMeta("og:site_name", siteName);
    setMeta("og:locale", "ar_SA");

    // Twitter Card
    setMeta("twitter:card", "summary_large_image", true);
    setMeta("twitter:title", fullTitle, true);
    setMeta("twitter:description", finalDesc, true);
    setMeta("twitter:image", finalImage, true);

    return () => {
      document.title = siteName;
    };
  }, [title, siteName, description, image, type, url]);
}

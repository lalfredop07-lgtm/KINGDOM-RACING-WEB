import type { MetadataRoute } from "next";

const routes = ["", "/mission", "/legacy", "/ministry", "/racing", "/stories", "/god-speed-magazine", "/support", "/get-involved"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({ url: `https://kingdomracing.net${r}`, changeFrequency: "monthly", priority: r === "" ? 1 : 0.7 }));
}

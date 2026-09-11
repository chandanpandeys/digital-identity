import type { MetadataRoute } from "next";
import { site } from "@/lib/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Chandan Pandey — Digital Identity",
    short_name: "Chandan Pandey",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#080a09",
    theme_color: "#080a09",
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

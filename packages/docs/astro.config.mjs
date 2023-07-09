import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://github.com/withastro/astro/issues/7561
// upgrade to new astro only after above fixed

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "🐟 Trout",
      social: {
        github: "https://github.com/withastro/starlight",
      },
      sidebar: [
        {
          label: "Quick start",
          link: "/",
        },
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Example Guide", link: "/guides/example/" },
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
    }),
  ],

  // Process images with sharp: https://docs.astro.build/en/guides/assets/#using-sharp
  image: { service: { entrypoint: "astro/assets/services/sharp" } },
});

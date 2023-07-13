import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://github.com/withastro/astro/issues/7561
// upgrade to new astro only after above fixed

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      head: [
        {
          tag: "link",
          attrs: {
            rel: "icon",
            href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>🐟</text></svg>",
          },
        },
      ],
      title: "🐟 Trout",
      social: {
        github: "https://github.com/sarimabbas/trout",
      },
      sidebar: [
        {
          label: "Tutorial",
          autogenerate: {
            directory: "tutorial",
          },
        },
        {
          label: "Reference",
          autogenerate: {
            directory: "reference",
          },
        },
        {
          label: "External links",
          items: [
            {
              label: "🏠 Landing page",
              link: "https://trout.run",
            },
            {
              label: "🤖 GitHub",
              link: "https://github.com/sarimabbas/trout",
            },
            {
              label: "💬 Submit feedback",
              link: "https://trout.canny.io",
            },
            {
              label: "🗺️ Roadmap",
              link: "https://trout.canny.io",
            },
            {
              label: "🪵 Changelog",
              link: "https://trout.canny.io/changelog",
            },
          ],
        },
      ],
    }),
  ],
  // Process images with sharp: https://docs.astro.build/en/guides/assets/#using-sharp
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },
});

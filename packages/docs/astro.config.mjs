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
        github: "https://github.com/sarimabbas/trout",
      },
      sidebar: [
        {
          label: "External links",
          items: [
            {
              label: "🏠 Landing page",
              link: "https://trout.run",
            },
            {
              label: "🐟 Go to app",
              link: "https://web.trout.run",
            },
            {
              label: "📢 Feedback",
              link: "https://trout.canny.io",
            },
            {
              label: "🤖 GitHub",
              link: "https://github.com/sarimabbas/trout",
            },
          ],
        },
        {
          label: "Tutorial",
          autogenerate: { directory: "tutorial" },
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

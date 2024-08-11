import alpinejs from "@astrojs/alpinejs";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), alpinejs(), mdx(), react(), svelte()],
  devToolbar: {
    enabled: false
  }
});
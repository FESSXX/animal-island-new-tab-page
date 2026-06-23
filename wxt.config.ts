import { defineConfig } from "wxt";

export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    name: "Animal Island New Tab",
    description: "Animal Island style new tab page for Chrome and Edge.",
    permissions: ["geolocation"],
    host_permissions: ["https://api.open-meteo.com/*"],
  },
});

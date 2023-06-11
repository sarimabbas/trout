const tailwindConfig = require("@sarim.garden/ui/tailwind-config");

console.log({ tailwindConfig: JSON.stringify(tailwindConfig, null, 2) });

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...tailwindConfig,
};

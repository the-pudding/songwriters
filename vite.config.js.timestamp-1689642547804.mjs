// vite.config.js
import { readFileSync } from "fs";
import { sveltekit } from "file:///Users/matt/htdocs/songwriters/node_modules/@sveltejs/kit/src/exports/vite/index.js";
import { timeFormat } from "file:///Users/matt/htdocs/songwriters/node_modules/d3/src/index.js";
import path from "path";
import svg from "file:///Users/matt/htdocs/songwriters/node_modules/vite-plugin-svgstring/index.js";
import dsv from "file:///Users/matt/htdocs/songwriters/node_modules/@rollup/plugin-dsv/dist/es/index.js";
var { version } = JSON.parse(readFileSync("package.json", "utf8"));
var timestamp = timeFormat("%Y-%m-%d-%H:%M")(/* @__PURE__ */ new Date());
var config = {
  define: {
    __VERSION__: JSON.stringify(version),
    __TIMESTAMP__: JSON.stringify(timestamp)
  },
  plugins: [
    sveltekit(),
    dsv(),
    svg()
  ],
  resolve: {
    alias: {
      "$actions": path.resolve("./src/actions"),
      "$components": path.resolve("./src/components"),
      "$data": path.resolve("./src/data"),
      "$routes": path.resolve("./src/routes"),
      "$stores": path.resolve("./src/stores"),
      "$styles": path.resolve("./src/styles"),
      "$svg": path.resolve("./src/svg"),
      "$utils": path.resolve("./src/utils")
    }
  }
};
var vite_config_default = config;
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWF0dC9odGRvY3Mvc29uZ3dyaXRlcnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9tYXR0L2h0ZG9jcy9zb25nd3JpdGVycy92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbWF0dC9odGRvY3Mvc29uZ3dyaXRlcnMvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyByZWFkRmlsZVN5bmMgfSBmcm9tIFwiZnNcIjtcbmltcG9ydCB7IHN2ZWx0ZWtpdCB9IGZyb20gJ0BzdmVsdGVqcy9raXQvdml0ZSc7XG5pbXBvcnQgeyB0aW1lRm9ybWF0IH0gZnJvbSBcImQzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHN2ZyBmcm9tIFwidml0ZS1wbHVnaW4tc3Znc3RyaW5nXCI7XG5pbXBvcnQgZHN2IGZyb20gXCJAcm9sbHVwL3BsdWdpbi1kc3ZcIjtcblxuY29uc3QgeyB2ZXJzaW9uIH0gPSBKU09OLnBhcnNlKHJlYWRGaWxlU3luYyhcInBhY2thZ2UuanNvblwiLCBcInV0ZjhcIikpO1xuY29uc3QgdGltZXN0YW1wID0gdGltZUZvcm1hdChcIiVZLSVtLSVkLSVIOiVNXCIpKG5ldyBEYXRlKCkpO1xuXG5jb25zdCBjb25maWcgPSB7XG5cdGRlZmluZToge1xuXHRcdF9fVkVSU0lPTl9fOiBKU09OLnN0cmluZ2lmeSh2ZXJzaW9uKSxcblx0XHRfX1RJTUVTVEFNUF9fOiBKU09OLnN0cmluZ2lmeSh0aW1lc3RhbXApXG5cdH0sXG5cdHBsdWdpbnM6IFtcblx0XHRzdmVsdGVraXQoKSxcblx0XHRkc3YoKSxcblx0XHRzdmcoKVxuXHRdLFxuXHRyZXNvbHZlOiB7XG5cdFx0YWxpYXM6IHtcblx0XHRcdFwiJGFjdGlvbnNcIjogcGF0aC5yZXNvbHZlKFwiLi9zcmMvYWN0aW9uc1wiKSxcblx0XHRcdFwiJGNvbXBvbmVudHNcIjogcGF0aC5yZXNvbHZlKFwiLi9zcmMvY29tcG9uZW50c1wiKSxcblx0XHRcdFwiJGRhdGFcIjogcGF0aC5yZXNvbHZlKFwiLi9zcmMvZGF0YVwiKSxcblx0XHRcdFwiJHJvdXRlc1wiOiBwYXRoLnJlc29sdmUoXCIuL3NyYy9yb3V0ZXNcIiksXG5cdFx0XHRcIiRzdG9yZXNcIjogcGF0aC5yZXNvbHZlKFwiLi9zcmMvc3RvcmVzXCIpLFxuXHRcdFx0XCIkc3R5bGVzXCI6IHBhdGgucmVzb2x2ZShcIi4vc3JjL3N0eWxlc1wiKSxcblx0XHRcdFwiJHN2Z1wiOiBwYXRoLnJlc29sdmUoXCIuL3NyYy9zdmdcIiksXG5cdFx0XHRcIiR1dGlsc1wiOiBwYXRoLnJlc29sdmUoXCIuL3NyYy91dGlsc1wiKVxuXHRcdH1cblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0USxTQUFTLG9CQUFvQjtBQUN6UyxTQUFTLGlCQUFpQjtBQUMxQixTQUFTLGtCQUFrQjtBQUMzQixPQUFPLFVBQVU7QUFDakIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sU0FBUztBQUVoQixJQUFNLEVBQUUsUUFBUSxJQUFJLEtBQUssTUFBTSxhQUFhLGdCQUFnQixNQUFNLENBQUM7QUFDbkUsSUFBTSxZQUFZLFdBQVcsZ0JBQWdCLEVBQUUsb0JBQUksS0FBSyxDQUFDO0FBRXpELElBQU0sU0FBUztBQUFBLEVBQ2QsUUFBUTtBQUFBLElBQ1AsYUFBYSxLQUFLLFVBQVUsT0FBTztBQUFBLElBQ25DLGVBQWUsS0FBSyxVQUFVLFNBQVM7QUFBQSxFQUN4QztBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1IsVUFBVTtBQUFBLElBQ1YsSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLEVBQ0w7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNSLE9BQU87QUFBQSxNQUNOLFlBQVksS0FBSyxRQUFRLGVBQWU7QUFBQSxNQUN4QyxlQUFlLEtBQUssUUFBUSxrQkFBa0I7QUFBQSxNQUM5QyxTQUFTLEtBQUssUUFBUSxZQUFZO0FBQUEsTUFDbEMsV0FBVyxLQUFLLFFBQVEsY0FBYztBQUFBLE1BQ3RDLFdBQVcsS0FBSyxRQUFRLGNBQWM7QUFBQSxNQUN0QyxXQUFXLEtBQUssUUFBUSxjQUFjO0FBQUEsTUFDdEMsUUFBUSxLQUFLLFFBQVEsV0FBVztBQUFBLE1BQ2hDLFVBQVUsS0FBSyxRQUFRLGFBQWE7QUFBQSxJQUNyQztBQUFBLEVBQ0Q7QUFDRDtBQUVBLElBQU8sc0JBQVE7IiwKICAibmFtZXMiOiBbXQp9Cg==

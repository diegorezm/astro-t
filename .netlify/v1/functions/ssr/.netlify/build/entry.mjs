import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_uKTQTxrX.mjs';
import './_astro-internal_middleware.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const _page0 = () => import('./pages/_actions/_---path_.astro.mjs');
const _page1 = () => import('./pages/_image.astro.mjs');
const _page2 = () => import('./pages/employee.astro.mjs');
const _page3 = () => import('./pages/todo.astro.mjs');
const _page4 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/.pnpm/astro@4.15.12_rollup@4.24.0_typescript@5.6.3/node_modules/astro/dist/actions/runtime/route.js", _page0],
    ["node_modules/.pnpm/astro@4.15.12_rollup@4.24.0_typescript@5.6.3/node_modules/astro/dist/assets/endpoint/generic.js", _page1],
    ["src/pages/employee/index.astro", _page2],
    ["src/pages/todo/index.astro", _page3],
    ["src/pages/index.astro", _page4]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "51771e18-e11a-4f4b-81e8-4b14fa08b55f"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };

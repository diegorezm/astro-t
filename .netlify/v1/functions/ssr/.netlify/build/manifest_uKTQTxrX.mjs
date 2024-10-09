import { g as decodeKey } from './chunks/astro/server_ChqK_OFe.mjs';
import './chunks/shared_BKd_FIVp.mjs';
import './chunks/lexer_CKg1fi5r.mjs';
import 'clsx';

const NOOP_MIDDLEWARE_FN = (_, next) => next();

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/diego/docs/code/tests/astro-t/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_actions/[...path]","pattern":"^\\/_actions(?:\\/(.*?))?$","segments":[[{"content":"_actions","dynamic":false,"spread":false}],[{"content":"...path","dynamic":true,"spread":true}]],"params":["...path"],"component":"node_modules/.pnpm/astro@4.15.12_rollup@4.24.0_typescript@5.6.3/node_modules/astro/dist/actions/runtime/route.js","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@4.15.12_rollup@4.24.0_typescript@5.6.3/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CI4dC2Fz.css"}],"routeData":{"route":"/employee","isIndex":true,"type":"page","pattern":"^\\/employee\\/?$","segments":[[{"content":"employee","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/employee/index.astro","pathname":"/employee","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CI4dC2Fz.css"}],"routeData":{"route":"/todo","isIndex":true,"type":"page","pattern":"^\\/todo\\/?$","segments":[[{"content":"todo","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/todo/index.astro","pathname":"/todo","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CI4dC2Fz.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/diego/docs/code/tests/astro-t/src/pages/employee/index.astro",{"propagation":"none","containsHead":true}],["/home/diego/docs/code/tests/astro-t/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/home/diego/docs/code/tests/astro-t/src/pages/todo/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000@astro-page:node_modules/.pnpm/astro@4.15.12_rollup@4.24.0_typescript@5.6.3/node_modules/astro/dist/actions/runtime/route@_@js":"pages/_actions/_---path_.astro.mjs","\u0000@astro-page:node_modules/.pnpm/astro@4.15.12_rollup@4.24.0_typescript@5.6.3/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/employee/index@_@astro":"pages/employee.astro.mjs","\u0000@astro-page:src/pages/todo/index@_@astro":"pages/todo.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_uKTQTxrX.mjs","/home/diego/docs/code/tests/astro-t/node_modules/.pnpm/@astrojs+react@3.6.2_@types+react-dom@18.3.0_@types+react@18.3.11_react-dom@18.3.1_react@18.3.1__react@18.3.1_vite@5.4.8/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_C1YIWAGb.mjs","\u0000astro:internal-actions":"chunks/_astro_internal-actions_DPZk9I2F.mjs","/home/diego/docs/code/tests/astro-t/node_modules/.pnpm/astro@4.15.12_rollup@4.24.0_typescript@5.6.3/node_modules/astro/dist/actions/runtime/virtual/get-action.js":"chunks/get-action_Byo-ehrt.mjs","/home/diego/docs/code/tests/astro-t/src/pages/todo/_form.tsx":"_astro/_form.D8anwQVo.js","/home/diego/docs/code/tests/astro-t/src/pages/todo/_list.tsx":"_astro/_list.Cabu9uFM.js","/home/diego/docs/code/tests/astro-t/src/pages/employee/_create-employee-button":"_astro/_create-employee-button.smKXXgfn.js","/home/diego/docs/code/tests/astro-t/src/pages/employee/_list":"_astro/_list.DP1OxyDp.js","/home/diego/docs/code/tests/astro-t/src/pages/employee/_create-employee-sheet":"_astro/_create-employee-sheet.BdXMzp0K.js","/home/diego/docs/code/tests/astro-t/src/pages/employee/_update-employee-sheet":"_astro/_update-employee-sheet.eC6DRX0L.js","@/components/ui/sonner":"_astro/sonner.C6dE7QYZ.js","/home/diego/docs/code/tests/astro-t/src/components/navbar/theme-toggle":"_astro/theme-toggle.CmHJqi14.js","@astrojs/react/client.js":"_astro/client.DtQD7m52.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.CI4dC2Fz.css","/favicon.svg","/_astro/_astro_actions.Dz5ahgF_.js","/_astro/_create-employee-button.smKXXgfn.js","/_astro/_create-employee-sheet.BdXMzp0K.js","/_astro/_form.D8anwQVo.js","/_astro/_list.Cabu9uFM.js","/_astro/_list.DP1OxyDp.js","/_astro/_store.CvzKSHjg.js","/_astro/_update-employee-sheet.eC6DRX0L.js","/_astro/_use-open-create-employee-sheet.BoDxfZBC.js","/_astro/_use-open-update-employee-sheet.DmnKN0tj.js","/_astro/button.D0fAGvrV.js","/_astro/card.DNuJI-mP.js","/_astro/client.DtQD7m52.js","/_astro/createLucideIcon.DVAayq6j.js","/_astro/index.BciqYZFU.js","/_astro/index.DDEQXXIH.js","/_astro/index.DNi1g-pO.js","/_astro/index.HeLB5_RA.js","/_astro/jsx-runtime.B6N9iRLn.js","/_astro/label.BvIU1Uzz.js","/_astro/react-icons.esm.B3nMAnd3.js","/_astro/react.CYLdA19q.js","/_astro/sheet.D7_sfH2t.js","/_astro/sonner.C6dE7QYZ.js","/_astro/theme-toggle.CmHJqi14.js"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"13I43LhXEm7rdVErMarmak5j2aN1b+jBd/BvDOWb/Xs=","experimentalEnvGetSecretEnabled":false});

export { manifest };

import {defineMiddleware} from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  if (!context.cookies.has("auth") && context.url.pathname !== "/login") {
    return context.redirect("/login", 302);
  }
  return next();
})

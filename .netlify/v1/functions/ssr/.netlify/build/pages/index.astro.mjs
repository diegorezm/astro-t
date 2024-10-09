import { c as createComponent, r as renderTemplate, d as renderComponent, b as createAstro, m as maybeRenderHead, a as addAttribute } from '../chunks/astro/server_ChqK_OFe.mjs';
import { a as CardHeader, b as CardTitle, e as CardDescription, c as CardContent, B as Button, C as Card, $ as $$Layout } from '../chunks/card_7PJwbnJ5.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$ShowcaseCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ShowcaseCard;
  const { title, description, href } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Card", Card, { "className": "text-center text-2xl shadow-lg" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CardHeader", CardHeader, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "CardTitle", CardTitle, {}, { "default": ($$result4) => renderTemplate`${title}` })} ${renderComponent($$result3, "CardDescription", CardDescription, { "className": "text-secondary-foreground text-lg" }, { "default": ($$result4) => renderTemplate`${description}` })} ` })} ${renderComponent($$result2, "CardContent", CardContent, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Button", Button, { "className": "w-full lg:w-1/3" }, { "default": ($$result4) => renderTemplate` ${maybeRenderHead()}<a${addAttribute(href, "href")} class="w-full h-full">View</a> ` })} ` })} ` })}`;
}, "/home/diego/docs/code/tests/astro-t/src/components/showcase-card.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Home" }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<header class="text-center mb-8"> <h1 class="text-4xl font-bold mb-4">Welcome to the Showcase App</h1> <p class="text-lg text-secondary-foreground">
This app demonstrates a Todo App and a employee management app.
</p> </header> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> ${renderComponent($$result2, "ShowcaseCard", $$ShowcaseCard, { "title": "Todo App", "description": "A simple Todo App", "href": "/todo" })} ${renderComponent($$result2, "ShowcaseCard", $$ShowcaseCard, { "title": "Employee Management", "description": "Consume data from a Mock API to view employee details.", "href": "/employee" })} </div> ` })}`;
}, "/home/diego/docs/code/tests/astro-t/src/pages/index.astro", void 0);

const $$file = "/home/diego/docs/code/tests/astro-t/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

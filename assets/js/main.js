// import { mount } from "./render.js";
// import { initRouter } from "./router.js";
// // import { Sidebar } from "../../components/sidebar.js";
// import { Header } from "../../components/header.js";

// // async function loadSidebar() {
// //   const menu = await fetch("./data/menu.json").then(r => r.json());
// //   mount("#sidebar", Sidebar(menu));
// // }

// function loadPage(path) {
//   const clean = path === "/" ? "/home" : path;

//   import(`./pages${clean}.js`)
//     .then((module) => {
//       mount("#content", module.render());
//     })
//     .catch(() => mount("#content", "<h3>404 Page Not Found</h3>"));
// }

// // boot
// mount("#header", Header());
// // mount("#footer", Footer());
// // loadSidebar();
// loadPage(location.pathname);
// initRouter(loadPage);

import { renderPage } from "./router.js";
import { loadComponent } from "./loader.js";

async function init() {
  await loadComponent("header", "/components/header.js");
  await loadComponent("content", "/components/map.js");

  // Load default page on first load
  renderPage(location.pathname);

  // SPA-like navigation support
  window.onpopstate = () => renderPage(location.pathname);
}

init();

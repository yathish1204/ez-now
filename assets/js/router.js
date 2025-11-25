// import { mount } from "./render.js";

// export function initRouter(loadPage) {
//   document.addEventListener("click", (e) => {
//     const link = e.target.closest("a[data-nav]");
//     if (!link) return;

//     e.preventDefault();
//     const path = link.getAttribute("href");

//     history.pushState({}, "", path);
//     loadPage(path);
//   });

//   window.onpopstate = () => loadPage(location.pathname);
// }

import { loadComponent } from "./loader.js";

export async function renderPage(route) {
  switch (route) {
    case "/compact-table":
      await loadComponent("sidebar", "/components/sidebar-dashboard.html");
      await loadComponent("content", "/pages/compact-table.html");
      break;

    case "/milwaukee":
      await loadComponent("sidebar", "/components/sidebar-reports.html");
      await loadComponent("content", "/pages/milwaukee.html");
      break;

    case "/compact-card":
      await loadComponent("sidebar", "/components/sidebar-settings.html");
      await loadComponent("content", "/pages/compact-card.html");
      break;

    case "/detailed-card":
      await loadComponent("sidebar", "/components/sidebar-settings.html");
      await loadComponent("content", "/pages/detailed-card.html");
      break;

    default:
      history.replaceState({}, "", "/");
      await renderPage("/index.html");
  }
}

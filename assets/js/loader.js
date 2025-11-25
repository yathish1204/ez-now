// export function mount(selector, html) {
//   const el = document.querySelector(selector);
//   if (el) el.innerHTML = html;
// }

// export function loop(list, renderFn) {
//   return list.map(renderFn).join("");
// }

// export async function loadComponent(targetId, filePath) {
//   const html = await fetch(filePath).then((res) => res.text());
//   document.getElementById(targetId).innerHTML = html;
// }

export async function loadComponent(targetId, file) {
  const container = document.getElementById(targetId);

  if (!container) {
    console.error(`❌ Element with id "${targetId}" not found`);
    return;
  }

  // Dynamically import JS module
  const module = await import(file);

  // Component must export a function
  const html = module.default ? module.default() : module.Header();

  container.innerHTML = html;
}

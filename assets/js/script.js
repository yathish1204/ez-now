// Show Active menu-list
// const items = document.querySelectorAll(".nav-item");

// items.forEach((item) => {
//   item.addEventListener("click", function () {
//     items.forEach((i) => i.classList.remove("active"));
//     this.classList.add("active");
//   });
// });

document.addEventListener("click", function (e) {
  let link = e.target.closest(".nav-item");
  if (!link) return;

  document.querySelectorAll(".nav-item").forEach((i) => {
    i.classList.remove("active");
    let img = i.querySelector("img");
    img.src = img.dataset.default;
  });

  link.classList.add("active");
  link.querySelector("img").src = link.querySelector("img").dataset.active;
});

// Time Display
function updateTime() {
  const now = new Date();
  const formatted = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  document.getElementById("current-time").textContent = formatted;
}

updateTime(); // run immediately

setInterval(updateTime, 6000);

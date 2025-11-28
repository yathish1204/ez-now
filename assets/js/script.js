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

// Functionality - Resize columns

const dragIcon = document.querySelector("#dragIcon");
const left = document.querySelector("#split__left");
let mouse_is_down = false;

dragIcon.addEventListener("mousedown", (e) => {
  mouse_is_down = true;
  document.body.style.userSelect = "none";
});

document.addEventListener("mousemove", (e) => {
  if (!mouse_is_down) return;
  left.style.width = `${e.clientX}px`;
});

document.addEventListener("mouseup", () => {
  mouse_is_down = false;
  document.body.style.userSelect = "auto";
});

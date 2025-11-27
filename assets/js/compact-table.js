const tbody = document.getElementById("tableBody");

import { tableData } from "./compact-table-data.js";

async function renderTable() {
  tbody.innerHTML = "";

  tableData.forEach((b, i) => {
    const rowColors = ["#ffffff", "#F48FB1", "#FFCA28", "#B0BEC5", "#80DEEA"];
    const colorIndex = Math.floor(i / 6) % rowColors.length;
    const bg = rowColors[colorIndex];
    const srcSet = [
      "./assets/images/home.png",
      "./assets/images/flat.png",
      "./assets/images/location.png",
    ];
    const randomNum = Math.floor(Math.random() * 3);
    const randomSrc = srcSet[randomNum];

    // parent row
    const parent = document.createElement("tr");
    parent.classList.add("parent-row");
    parent.dataset.id = b.id;

    parent.style.backgroundColor = bg;

    parent.innerHTML = `
      <td  style="background-color:${bg};" 
                >
                <span class="dropdown position-relative">
                <p class="mb-0 fw-medium" role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false" >${b.bus}</P>
                <ul class="dropdown-menu position-absolute">
                <li>
                  <a class="dropdown-item dropdown-toggle custom-arrow" href="#"
                    >Bus History
                    <img src="assets/images/arrow-right.png" alt="arrow-right"
                  /></a>
                </li>
                <li>
                  <a class="dropdown-item dropdown-toggle custom-arrow" href="#"
                    >Macro Summary<img
                      src="assets/images/arrow-right.png"
                      alt="arrow-right"
                  /></a>
                </li>
                <li>
                  <a class="dropdown-item dropdown-toggle custom-arrow" href="#"
                    >Macro Summary (Beta)<img
                      src="assets/images/arrow-right.png"
                      alt="arrow-right"
                  /></a>
                </li>
                <li>
                  <a class="dropdown-item dropdown-toggle custom-arrow" href="#"
                    >Data Viewer<img
                      src="assets/images/arrow-right.png"
                      alt="arrow-right"
                  /></a>
                </li>
                <li>
                  <a class="dropdown-item dropdown-toggle custom-arrow" href="#"
                    >Time on Bus<img
                      src="assets/images/arrow-right.png"
                      alt="arrow-right"
                  /></a>
                </li>
                <li>
                  <a class="dropdown-item dropdown-toggle custom-arrow" href="#"
                    >Rider List<img
                      src="assets/images/arrow-right.png"
                      alt="arrow-right"
                  /></a>
                </li>
                <li>
                  <a class="dropdown-item dropdown-toggle custom-arrow" href="#"
                    >Route Paths<img
                      src="assets/images/arrow-right.png"
                      alt="arrow-right"
                  /></a>
                </li>
                <li>
                  <a class="dropdown-item dropdown-toggle custom-arrow" href="#"
                    >Print Location<img
                      src="assets/images/arrow-right.png"
                      alt="arrow-right"
                  /></a>
                </li>
                <li>
                  <a class="dropdown-item dropdown-toggle custom-arrow" href="#"
                    >Parent App<img
                      src="assets/images/arrow-right.png"
                      alt="arrow-right"
                  /></a>
                </li>
                <li>
                  <a class="dropdown-item dropdown-toggle custom-arrow" href="#"
                    >MDT Message<img
                      src="assets/images/arrow-right.png"
                      alt="arrow-right"
                  /></a>
                </li>
               
              </ul>
                </span>
                </td>
      <td style="background-color:${bg};">${b.route}</td>
      <td style="background-color:${bg};" class="toggle-btn text-nowrap c-pointer col-grow user-select-none"><img class="pe-1 toggle-btn " src="${randomSrc}" alt="location image" />${
      b.location
    }</td>
      <td class="text-nowrap" style="background-color:${bg};"><img class="pe-1" src="./assets/images/speed.png" alt="speed image" />${
      b.speed
    }</td>
      <td style="background-color:${bg};"><img class="pe-1" src="./assets/images/heading.png" alt="speed image" />${
      b.heading
    }</td>
      <td class="text-nowrap" style="background-color:${bg};color: ${
      b.status.toLowerCase() === "active" ? "blue" : "red"
    }"><img class="pe-1 "  src="./assets/images/status.png" alt="speed image" />${
      b.status
    }</td>
    `;

    tbody.appendChild(parent);
  });

  attachExpandHandler();
}

function attachExpandHandler() {
  tbody.addEventListener("click", function (e) {
    if (!e.target.classList.contains("toggle-btn")) return;

    const parentRow = e.target.closest(".parent-row");
    const id = Number(parentRow.dataset.id);

    // 1️⃣ If a child row for this ID already exists → remove it
    const existing = tbody.querySelector(`tr.child-row[data-child='${id}']`);
    if (existing) {
      existing.remove();
      return;
    }

    // 2️⃣ Remove any OPEN child rows
    tbody.querySelectorAll(".child-row").forEach((c) => c.remove());

    // 3️⃣ Create new child row for clicked row
    const b = tableData.find((item) => Number(item.id) === id);

    if (!b) return;

    const childRow = document.createElement("tr");
    childRow.classList.add("child-row");
    childRow.dataset.child = id;

    // childRow.innerHTML = `
    //   <td colspan="6" class="bg-light p-3">
    //       <strong>More details:</strong><br>
    //       Bus: ${b.bus}<br>
    //       Location: ${b.location}<br>
    //       Heading: ${b.heading}<br>
    //       Speed: ${b.speed}<br>
    //       Status: ${b.status}
    //   </td>
    // `;

    // 4️⃣ Insert child row directly AFTER the clicked row
    childRow.innerHTML = `
    <td colspan="6" class="p-0  " >
     <div class="d-flex flex-column gap-2 p-2">
      <div class="d-flex justify-content-between">
        <div class="d-flex flex-column">
          <span class="d-flex"
            ><p class="pe-3 mb-0 fw-medium">Driver:</p>
            <p class="mb-0">${b.driver.split(" ")[0]}</p>
            ,&nbsp;
            <p class="mb-0">${b.driver.split(" ")[1]}</p></span
          >
          <span class="d-flex"
            ><p class="pe-3 mb-0 fw-medium">Attendant:</p>
            <p class="mb-0">${b.attendant.split(" ")[0]}</p>
            ,&nbsp;
            <p class="mb-0">${b.attendant.split(" ")[1]}</p></span
          >
        </div>
        <div class="d-flex align-items-center gap-2">
          <div class="d-flex align-items-center gap-1 user-select-none">
            <input type="checkbox"  name="allstops" id="allStops" />
            <label for="allStops" class="m-0">Display All Stops</label>
          </div>

          <img
            class="c-pointer"
            src="./assets/images/xlsx.png"
            alt="xlsx doc icon"
          />
        </div>
      </div>
      
      <div class="d-flex justify-content-between">
      
        <div class="d-flex flex-column">
          <h6 class="mb-0 fw-bold text-decoration-underline">Route 100 AM</h6>
          ${b.route100AM.stops
            .map((stop) => `<p class="mb-0">${stop.stop}</p>`)
            .join("")}
        </div>
        <div class="d-flex align-items-center gap-3">
          <div class="d-flex flex-column">
            <p class="mb-0 fw-medium text-decoration-underline">Actual</p>
             ${b.route100AM.stops
               .map((stop) => `<p class="mb-0">${stop.actual}</p>`)
               .join("")}
          </div>
          <div class="d-flex flex-column">
            <p class="mb-0 fw-medium text-decoration-underline">Planned</p>
            ${b.route100AM.stops
              .map((stop) => `<p class="mb-0">${stop.planned}</p>`)
              .join("")}
          </div>
          <div class="d-flex flex-column">
            <p class="mb-0 fw-medium text-decoration-underline">Macro</p>
            ${b.route100AM.stops
              .map((stop) => `<p class="mb-0">${stop.macro}</p>`)
              .join("")}
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-between">
        <div class="d-flex flex-column">
          <h6 class="mb-0 fw-bold text-decoration-underline">Route 100 PM</h6>
           ${b.route100PM.stops
             .map((stop) => `<p class="mb-0">${stop.stop}</p>`)
             .join("")}
        </div>
        <div class="d-flex align-items-center gap-3">
        <div class="d-flex flex-column">
        <p class="mb-0 fw-medium text-decoration-underline opacity-0">Actual</p>
             ${b.route100PM.stops
               .map((stop) => `<p class="mb-0">${stop.actual}</p>`)
               .join("")}
          </div>
          <div class="d-flex flex-column">
          <p class="mb-0 fw-medium text-decoration-underline opacity-0">Planned</p>
             ${b.route100PM.stops
               .map((stop) => `<p class="mb-0">${stop.planned}</p>`)
               .join("")}
          </div>
          <div class="d-flex flex-column">
          <p class="mb-0 fw-medium text-decoration-underline opacity-0">Macro</p>
             ${b.route100PM.stops
               .map((stop) => `<p class="mb-0">${stop.macro}</p>`)
               .join("")}
          </div>
        </div>
      </div>
    </div>
    </td>
  `;

    parentRow.insertAdjacentElement("afterend", childRow);
  });
}

// Render table & initialize DataTables
$("#myTable").DataTable().destroy();

renderTable();

$("#myTable").DataTable({
  paging: false,
  info: false,
  ordering: true,
});

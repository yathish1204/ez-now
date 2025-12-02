// import { tableData } from "./milwaukee-data.js";
// function renderRows(data) {
//   const container = document.getElementById("container");
//   container.innerHTML = "";

//   data.forEach((item) => {
//     const html = `
//         <div  class="d-flex justify-content-between align-items-start p-2 text-accent-blue border-bottom">

//             <div class="d-flex flex-column gap-1 max-w-150 2">
//                 <div><strong>Bus: ${item.bus}</strong></div>

//                 <div class="d-flex align-items-center gap-1">
//                 <img
//             class="c-pointer"
//             src="./assets/images/location.png"
//             alt="location"
//           />
//                 <span class="text-nowrap fw-medium">${item.location}</span>
//                 </div>
//             </div>

//             <div class="d-flex flex-column align-items-start flex-wrap">
//                 <div class="fs-8 ">
//               <strong>AM Pkg:</strong> ${item.amPkg}
//               <strong class="ms-2">AM 1:</strong> ${item.am1}
//               <strong class="ms-2">AM 2:</strong> ${item.am2}
//               <strong class="ms-2">AM 3:</strong> ${item.am3}
//               <strong class="ms-2">MID 1:</strong> ${item.mid1}
//             </div>

//             <div class="fs-8 mt-1">
//               <strong>PM Pkg:</strong> ${item.pmPkg}
//               <strong class="ms-2">PM 1:</strong> ${item.pm1}
//               <strong class="ms-2">PM 2:</strong> ${item.pm2}
//               <strong class="ms-2">PM 3:</strong> ${item.pm3}
//               <strong class="ms-2">MID 2:</strong> ${item.mid2}
//             </div>
//             </div>

//           <div class="d-flex align-items-start gap-2 max-w-120 ps-2">
//             <div class="small d-flex align-items-center justify-content-end gap-1">
//               <img
//             src="./assets/images/speed.png"
//             alt="speed"
//           /> ${item.speed}
//             </div>

//             <div class="d-flex flex-column align-items-end ">
//                 <div class="small d-flex align-items-center justify-content-end gap-1 text-nowrap">
//               <img
//             class="c-pointer "
//             src="./assets/images/heading.png"
//             alt="heading"
//           /> ${item.heading}
//             </div>

//             <div class="fw-bold small text-end">${item.status}</div>
//             </div>
//           </div>

//         </div>
//       `;

//     container.innerHTML += html;
//   });
// }

// renderRows(tableData);
import { tableData } from "./milwaukee-data.js";

let activePopover = null;
let activeCard = null;

function renderRows(data) {
  const container = document.getElementById("container");
  container.innerHTML = "";

  data.forEach((item) => {
    const html = `
      <div class="bus-card d-flex justify-content-between align-items-start p-2 text-accent-blue border-bottom c-pointer"
           data-bus='${JSON.stringify(item)}'>
  
        <div class="d-flex flex-column gap-1 max-w-150">
            <div><strong>Bus: ${item.bus}</strong></div>

            <div class="d-flex align-items-center gap-1">
                <img class="c-pointer" src="./assets/images/location.png" alt="location"/>
                <span class="text-nowrap fw-medium">${item.location}</span>
            </div>
        </div>

        <div class="d-flex flex-column align-items-start flex-wrap">
          <div class="fs-8">
            <strong>AM Pkg:</strong> ${item.amPkg}
            <strong class="ms-2">AM 1:</strong> ${item.am1}
            <strong class="ms-2">AM 2:</strong> ${item.am2}
            <strong class="ms-2">AM 3:</strong> ${item.am3}
            <strong class="ms-2">MID 1:</strong> ${item.mid1}
          </div>

          <div class="fs-8 mt-1">
            <strong>PM Pkg:</strong> ${item.pmPkg}
            <strong class="ms-2">PM 1:</strong> ${item.pm1}
            <strong class="ms-2">PM 2:</strong> ${item.pm2}
            <strong class="ms-2">PM 3:</strong> ${item.pm3}
            <strong class="ms-2">MID 2:</strong> ${item.mid2}
          </div>
        </div>

        <div class="d-flex flex-column align-items-end">
          <div class="small d-flex align-items-center gap-1">
            <img src="./assets/images/speed.png" alt="speed"/> ${item.speed}
          </div>
          <div class="small fw-bold">${item.status}</div>
        </div>
      </div>
    `;

    container.innerHTML += html;
  });

  attachPopoverHandlers();
}

renderRows(tableData);

/* ------------------------------------------------------
      CLOSE POPUP
------------------------------------------------------ */
function closeActivePopover() {
  if (activePopover) {
    activePopover.dispose();
    activePopover = null;
  }

  if (activeCard) {
    activeCard.classList.remove("card-active");
    activeCard = null;
  }
}

/* ------------------------------------------------------
      MAIN POPOVER HANDLER
------------------------------------------------------ */
function attachPopoverHandlers() {
  document.querySelectorAll(".bus-card").forEach((card) => {
    card.addEventListener("click", function (e) {
      e.stopPropagation(); // prevent global click from closing it

      const item = JSON.parse(this.dataset.bus);

      // Close previous one
      closeActivePopover();

      // Highlight current card
      this.classList.add("card-active");
      activeCard = this;

      const html = `
        <div class="fw-bold mb-2">Bus ${item.bus}</div>

       <div class="d-flex flex-column align-content-start">
        <div class="d-flex align-items-center mb-2">
        <div class="d-flex align-items-center gap-1"><strong class="text-nowrap">AM PKG:</strong>
          <input type="text" id="ampkg" value="${item.amPkg}" class="form-control d-inline-block w-auto ms-1"></div>
          <div class="d-flex align-items-center gap-1"><strong class="ms-2">AM 1:</strong>
          <input type="text" id="am1" value="${item.am1}" class="form-control d-inline-block w-auto ms-1"></div>
          <div class="d-flex align-items-center gap-1"><strong class="ms-2 text-nowrap">AM 2:</strong>
          <input type="text" id="am2" value="${item.am2}" class="form-control d-inline-block w-auto ms-1"></div>
          <div class="d-flex align-items-center gap-1"><strong class="ms-2 text-nowrap">AM 3:</strong>
          <input type="text" id="am3" value="${item.am3}" class="form-control d-inline-block w-auto ms-1"></div>
        </div>

        <div class="d-flex align-items-center mb-3">
        <div class="d-flex align-items-center gap-1"><strong class=" text-nowrap">PM PKG:</strong>
          <input type="text" id="pmpkg" value="${item.pmPkg}" class="form-control d-inline-block w-auto ms-1"></div>
        <div class="d-flex align-items-center gap-1"><strong class="ms-2">PM 1:</strong>
          <input type="text" id="pm1" value="${item.pm1}" class="form-control d-inline-block w-auto ms-1"></div>
        <div class="d-flex align-items-center gap-1"><strong class="ms-2 text-nowrap">PM 2:</strong>
          <input type="text" id="pm2" value="${item.pm2}" class="form-control d-inline-block w-auto ms-1"></div>
        <div class="d-flex align-items-center gap-1"> <strong class="ms-2 text-nowrap">PM 3:</strong>
          <input type="text" id="pm3" value="${item.pm3}" class="form-control d-inline-block w-auto ms-1"></div>
         </div>
       </div>

        <div class="d-flex justify-content-end gap-2">
          <button class="btn btn-outline-secondary btn-sm" id="cancelBtn">Cancel</button>
          <button class="btn btn-primary btn-sm" id="saveBtn">Save</button>
        </div>
      `;

      // Create popover
      activePopover = new bootstrap.Popover(this, {
        html: true,
        sanitize: false,
        trigger: "manual",
        placement: "right",
        customClass: "wide-popover",
        content: html,
      });

      activePopover.show();

      // Wait for DOM to render inside popover
      setTimeout(() => {
        const popoverEl = document.querySelector(".popover");

        // Prevent popover closing when clicking inside
        popoverEl.addEventListener("click", (e) => e.stopPropagation());

        document.getElementById("cancelBtn").onclick = closeActivePopover;

        document.getElementById("saveBtn").onclick = () => {
          // Save logic here if needed
          closeActivePopover();
        };
      }, 10);
    });
  });

  /* CLICK OUTSIDE → CLOSE */
  document.addEventListener("click", function () {
    closeActivePopover();
  });
}

import { tableData } from "./milwaukee-data.js";
function renderRows(data) {
  const container = document.getElementById("container");
  container.innerHTML = "";

  data.forEach((item) => {
    const html = `
        <div  class="d-flex justify-content-between align-items-start p-2 text-accent-blue border-bottom">
  
            <div class="d-flex flex-column gap-1 max-w-150 2">
                <div><strong>Bus: ${item.bus}</strong></div>
  
                <div class="d-flex align-items-center gap-1">
                <img
            class="c-pointer"
            src="./assets/images/location.png"
            alt="location"
          />
                <span class="text-nowrap fw-medium">${item.location}</span>
                </div>
            </div>
  
            <div class="d-flex flex-column align-items-start flex-wrap">
                <div class="small ">
              <strong>AM Pkg:</strong> ${item.amPkg}
              <strong class="ms-2">AM 1:</strong> ${item.am1}
              <strong class="ms-2">AM 2:</strong> ${item.am2}
              <strong class="ms-2">AM 3:</strong> ${item.am3}
              <strong class="ms-2">MID 1:</strong> ${item.mid1}
            </div>
  
            <div class="small mt-1">
              <strong>PM Pkg:</strong> ${item.pmPkg}
              <strong class="ms-2">PM 1:</strong> ${item.pm1}
              <strong class="ms-2">PM 2:</strong> ${item.pm2}
              <strong class="ms-2">PM 3:</strong> ${item.pm3}
              <strong class="ms-2">MID 2:</strong> ${item.mid2}
            </div>
            </div>
  
          <div class="d-flex align-items-start gap-2 max-w-120 ps-2">
            <div class="small d-flex align-items-center justify-content-end gap-1">
              <img
            src="./assets/images/speed.png"
            alt="speed"
          /> ${item.speed}
            </div>
  
            <div class="d-flex flex-column align-items-end ">
                <div class="small d-flex align-items-center justify-content-end gap-1 text-nowrap">
              <img
            class="c-pointer "
            src="./assets/images/heading.png"
            alt="heading"
          /> ${item.heading}
            </div>
  
            <div class="fw-bold small text-end">${item.status}</div>
            </div>
          </div>
  
        </div>
      `;

    container.innerHTML += html;
  });
}

renderRows(tableData);

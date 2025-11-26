const tbody = document.getElementById("tableBody");

import { tableData } from "./compact-table-data.js";

async function renderTable() {
  // const tableData = await loadData(); // <-- WAIT for data (IMPORTANT!)

  tableData.forEach((b) => {
    // parent row
    const parent = document.createElement("tr");
    parent.classList.add("parent-row");
    parent.dataset.id = b.id;

    parent.innerHTML = `
  <td>${b.bus}</td>
  <td>${b.route}</td>
  <td class="toggle-btn">${b.location}</td>
  <td>${b.speed}</td>
  <td>${b.heading}</td>
  <td>${b.status}</td>
`;

    // child row (hidden)
    // const child = document.createElement("tr");
    //     child.classList.add("child-row");
    //     child.dataset.child = b.id;
    //     child.style.display = "none";

    //     child.innerHTML = `
    //   <td colspan="6" class="bg-light">
    //       <strong>More details:</strong><br>
    //       Speed: ${b.speed}<br>
    //       Location: ${b.location}<br>
    //       Heading: ${b.heading}
    //   </td>
    // `;

    tbody.appendChild(parent);
    // tbody.appendChild(child);
  });

  attachExpandHandler();
}

function attachExpandHandler() {
  tbody.addEventListener("click", function (e) {
    if (!e.target.classList.contains("toggle-btn")) return;

    const btn = e.target;
    const parentRow = btn.closest(".parent-row");
    const id = parentRow.dataset.id;

    const childRow = tbody.querySelector(`.child-row[data-child="${id}"]`);

    if (childRow.style.display === "none") {
      childRow.style.display = "table-row";
    } else {
      childRow.style.display = "none";
    }
  });
}

// call the function
renderTable();

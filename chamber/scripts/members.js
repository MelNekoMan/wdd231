document.addEventListener("DOMContentLoaded", () => {
  const membersContainer = document.getElementById("members-container");
  const gridViewBtn = document.getElementById("grid-view");
  const listViewBtn = document.getElementById("list-view");

  async function getMembers() {
    try {
      const response = await fetch("data/members.json");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      displayMembers(data);
    } catch (error) {
      console.error("Error loading member data:", error);
      if (membersContainer) {
        membersContainer.innerHTML = "<p>Failed to load member data. Please try again later.</p>";
      }
    }
  }

  function displayMembers(members) {
    if (!membersContainer) return;
    membersContainer.innerHTML = "";

    members.forEach((member) => {
      const card = document.createElement("section");
      card.className = "member-card";

      card.innerHTML = `
        <div class="member-header">
          <h3>${member.name}</h3>
          <p>${member.tagline}</p>
        </div>
        <div class="member-body">
          <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
          <div class="member-details">
            <p><strong>ADDRESS:</strong> ${member.address}</p>
            <p><strong>PHONE:</strong> ${member.phone}</p>
            <p><strong>URL:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website.replace('https://', '')}</a></p>
          </div>
        </div>
      `;

      membersContainer.appendChild(card);
    });
  }

  if (gridViewBtn && listViewBtn && membersContainer) {
    gridViewBtn.addEventListener("click", () => {
      membersContainer.className = "grid-layout";
      gridViewBtn.classList.add("active-view");
      listViewBtn.classList.remove("active-view");
    });

    listViewBtn.addEventListener("click", () => {
      membersContainer.className = "list-layout";
      listViewBtn.classList.add("active-view");
      gridViewBtn.classList.remove("active-view");
    });
  }

  getMembers();
});
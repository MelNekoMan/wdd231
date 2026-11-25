const timestampField = document.querySelector("#timestamp");
if (timestampField) {
  timestampField.value = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short"
  });
}

const membershipBenefits = {
  np: {
    title: "NP Membership",
    cost: "Fee: Free (Non-Profit Organizations)",
    benefits: [
      "Listing in the Chamber non-profit directory",
      "Access to community networking mixers",
      "Monthly newsletter updates"
    ]
  },
  bronze: {
    title: "Bronze Membership",
    cost: "Fee: Standard Entry Tier",
    benefits: [
      "Full business directory profile",
      "10% discount on Chamber workshops and seminars",
      "Access to quarterly business forums"
    ]
  },
  silver: {
    title: "Silver Membership",
    cost: "Fee: Growth Tier",
    benefits: [
      "All Bronze benefits included",
      "25% discount on special events and training",
      "Eligibility for rotating home page spotlight features"
    ]
  },
  gold: {
    title: "Gold Membership",
    cost: "Fee: Premier Tier",
    benefits: [
      "All Silver benefits included",
      "Priority home page spotlight placement",
      "Complimentary passes to annual trade forums and VIP networking"
    ]
  }
};

const modal = document.querySelector("#membership-modal");
const closeModalBtn = document.querySelector("#close-modal");
const modalTitle = document.querySelector("#modal-title");
const modalCost = document.querySelector("#modal-cost");
const modalBenefits = document.querySelector("#modal-benefits");
const triggers = document.querySelectorAll(".modal-trigger");

function openMembershipModal(levelKey) {
  const data = membershipBenefits[levelKey];
  if (!data || !modal) {
    return;
  }

  modalTitle.textContent = data.title;
  modalCost.textContent = data.cost;
  modalBenefits.innerHTML = "";

  data.benefits.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    modalBenefits.appendChild(li);
  });

  modal.showModal();
}

triggers.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    const levelKey = trigger.dataset.level;
    openMembershipModal(levelKey);
  });
});

if (closeModalBtn && modal) {
  closeModalBtn.addEventListener("click", () => {
    modal.close();
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });
}
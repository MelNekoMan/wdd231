const params = new URLSearchParams(window.location.search);

const fieldsMap = {
  "#out-first-name": "firstName",
  "#out-last-name": "lastName",
  "#out-email": "email",
  "#out-phone": "phone",
  "#out-organization": "organization",
  "#out-timestamp": "timestamp"
};

Object.entries(fieldsMap).forEach(([selector, paramName]) => {
  const target = document.querySelector(selector);
  if (target) {
    target.textContent = params.get(paramName) || "Not provided";
  }
});
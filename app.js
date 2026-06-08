const LOGIN_KEY = "audiQuotationLoggedIn";
const CARS_KEY = "audiQuotationCars2026LogisticsOnly";

const defaultCars = [
  {
    model: "MY25 A4 Premium",
    color: "",
    cost: 4688000,
    insurance: 126000,
    tcs: 46880,
    rto: 402000,
    misc: 100000
  },
  {
    model: "MY25 A4 Premium Plus",
    color: "",
    cost: 5185000,
    insurance: 139000,
    tcs: 51850,
    rto: 444000,
    misc: 100000
  },
  {
    model: "MY25 A4 Technology",
    color: "",
    cost: 5583000,
    insurance: 150000,
    tcs: 55830,
    rto: 479000,
    misc: 100000
  },
  {
    model: "MY25 A6 Premium Plus",
    color: "",
    cost: 6481000,
    insurance: 173000,
    tcs: 64810,
    rto: 555000,
    misc: 100000
  },
  {
    model: "MY25 A6 Technology",
    color: "",
    cost: 7166000,
    insurance: 190000,
    tcs: 71660,
    rto: 615000,
    misc: 100000
  },
  {
    model: "MY25/MY26 Q3 Premium",
    color: "",
    cost: 4367000,
    insurance: 117000,
    tcs: 43670,
    rto: 375000,
    misc: 100000
  },
  {
    model: "MY25/MY26 Q3 Premium Plus",
    color: "",
    cost: 4819000,
    insurance: 130000,
    tcs: 48190,
    rto: 415000,
    misc: 100000
  },
  {
    model: "MY25/MY26 Q3 Technology",
    color: "",
    cost: 5300000,
    insurance: 140000,
    tcs: 53000,
    rto: 456000,
    misc: 100000
  },
  {
    model: "MY25/MY26 Q3 SB Technology",
    color: "",
    cost: 5425000,
    insurance: 145000,
    tcs: 54250,
    rto: 465000,
    misc: 100000
  },
  {
    model: "MY25 Q5 Premium Plus",
    color: "",
    cost: 6555000,
    insurance: 170000,
    tcs: 65550,
    rto: 562000,
    misc: 100000
  },
  {
    model: "MY25 Q5 Technology",
    color: "",
    cost: 7073000,
    insurance: 189000,
    tcs: 70730,
    rto: 607000,
    misc: 100000
  },
  {
    model: "MY25 Q7 Premium Plus",
    color: "",
    cost: 8717000,
    insurance: 230000,
    tcs: 87170,
    rto: 748000,
    misc: 100000
  },
  {
    model: "MY25 Q7 Technology",
    color: "",
    cost: 9615000,
    insurance: 250000,
    tcs: 96150,
    rto: 825000,
    misc: 100000
  },
  {
    model: "MY26 Q7 Premium Plus",
    color: "",
    cost: 8762000,
    insurance: 230000,
    tcs: 87620,
    rto: 752000,
    misc: 100000
  },
  {
    model: "MY26 Q7 Technology",
    color: "",
    cost: 9615000,
    insurance: 250000,
    tcs: 96150,
    rto: 826000,
    misc: 100000
  },
  {
    model: "Q8",
    color: "",
    cost: 11482000,
    insurance: 300000,
    tcs: 114820,
    rto: 986000,
    misc: 100000
  },
  {
    model: "SQ8",
    color: "",
    cost: 18123000,
    insurance: 480000,
    tcs: 181230,
    rto: 1554000,
    misc: 100000
  },
  {
    model: "RSQ8 Performance",
    color: "",
    cost: 23816000,
    insurance: 600000,
    tcs: 238160,
    rto: 2042000,
    misc: 100000
  }
];

const loginScreen = document.getElementById("loginScreen");
const dashboard = document.getElementById("dashboard");
const quotationView = document.getElementById("quotationView");
const loginForm = document.getElementById("loginForm");
const pricingForm = document.getElementById("pricingForm");
const quotationForm = document.getElementById("quotationForm");
const carModelSelect = document.getElementById("carModel");
const savedCarsList = document.getElementById("savedCarsList");

const quoteFields = {
  color: document.getElementById("quoteColor"),
  cost: document.getElementById("quoteCost"),
  insurance: document.getElementById("quoteInsurance"),
  tcs: document.getElementById("quoteTcs"),
  rto: document.getElementById("quoteRto"),
  misc: document.getElementById("quoteMisc"),
  discount: document.getElementById("quoteDiscount"),
  total: document.getElementById("quoteTotal")
};

function getCars() {
  const savedCars = localStorage.getItem(CARS_KEY);
  if (!savedCars) {
    localStorage.setItem(CARS_KEY, JSON.stringify(defaultCars));
    return defaultCars;
  }

  return JSON.parse(savedCars);
}

function saveCars(cars) {
  localStorage.setItem(CARS_KEY, JSON.stringify(cars));
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(Number(value) || 0);
}

function numberValue(input) {
  return Number(input.value) || 0;
}

function calculateTotalFromQuoteFields() {
  const subtotal =
    numberValue(quoteFields.cost) +
    numberValue(quoteFields.insurance) +
    numberValue(quoteFields.tcs) +
    numberValue(quoteFields.rto) +
    numberValue(quoteFields.misc);
  const discountAmount = subtotal * (numberValue(quoteFields.discount) / 100);
  const total = subtotal - discountAmount;

  quoteFields.total.value = formatCurrency(total);
  return total;
}

function showDashboard() {
  loginScreen.classList.add("hidden");
  quotationView.classList.add("hidden");
  dashboard.classList.remove("hidden");
  renderCars();
}

function showLogin() {
  dashboard.classList.add("hidden");
  quotationView.classList.add("hidden");
  loginScreen.classList.remove("hidden");
}

function renderCars() {
  const cars = getCars();
  carModelSelect.innerHTML = '<option value="">Select a model</option>';

  cars.forEach((car) => {
    const option = document.createElement("option");
    option.value = car.model;
    option.textContent = car.model;
    carModelSelect.appendChild(option);
  });

  if (!cars.length) {
    savedCarsList.innerHTML = '<p class="muted">No cars saved yet.</p>';
    return;
  }

  savedCarsList.innerHTML = cars
    .map(
      (car) => `
        <div class="car-item">
          <div>
            <h3>${escapeHtml(car.model)}</h3>
            <p>${escapeHtml(car.color)} | Cost: ${formatCurrency(car.cost)} | Insurance: ${formatCurrency(car.insurance)} | TCS: ${formatCurrency(car.tcs)} | RTO: ${formatCurrency(car.rto)} | Misc: ${formatCurrency(car.misc)}</p>
          </div>
          <button type="button" class="secondary-button" data-edit-model="${escapeHtml(car.model)}">Edit</button>
        </div>
      `
    )
    .join("");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function fillQuoteFromSelectedCar() {
  const selectedCar = getCars().find((car) => car.model === carModelSelect.value);
  if (!selectedCar) {
    return;
  }

  quoteFields.color.value = selectedCar.color;
  quoteFields.cost.value = selectedCar.cost;
  quoteFields.insurance.value = selectedCar.insurance;
  quoteFields.tcs.value = selectedCar.tcs;
  quoteFields.rto.value = selectedCar.rto;
  quoteFields.misc.value = selectedCar.misc;
  quoteFields.discount.value = "";
  calculateTotalFromQuoteFields();
}

function fillPricingForm(car) {
  document.getElementById("pricingModel").value = car.model;
  document.getElementById("pricingColor").value = car.color;
  document.getElementById("pricingCost").value = car.cost;
  document.getElementById("pricingInsurance").value = car.insurance;
  document.getElementById("pricingTcs").value = car.tcs;
  document.getElementById("pricingRto").value = car.rto;
  document.getElementById("pricingMisc").value = car.misc;
}

function buildQuotation() {
  const customerName = document.getElementById("customerName").value.trim();
  const phoneNumber = document.getElementById("phoneNumber").value.trim();
  const quotationError = document.getElementById("quotationError");

  if (!customerName || !phoneNumber) {
    quotationError.textContent = "Customer name and phone number are required.";
    return;
  }

  quotationError.textContent = "";
  const total = calculateTotalFromQuoteFields();
  const quoteDate = document.getElementById("quoteDate").value;

  const rows = [
    ["Customer name", customerName],
    ["Phone number", phoneNumber],
    ["Date", quoteDate],
    ["Car model", carModelSelect.value],
    ["Car color", quoteFields.color.value],
    ["Car cost", formatCurrency(quoteFields.cost.value)],
    ["Insurance", formatCurrency(quoteFields.insurance.value)],
    ["TCS", formatCurrency(quoteFields.tcs.value)],
    ["RTO", formatCurrency(quoteFields.rto.value)],
    ["Misc", formatCurrency(quoteFields.misc.value)],
    ["Discount", quoteFields.discount.value ? `${quoteFields.discount.value}%` : ""]
  ];

  document.getElementById("quoteDetails").innerHTML = `
    <table class="quote-table">
      <tbody>
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <th>${escapeHtml(label)}</th>
                <td>${escapeHtml(value)}</td>
              </tr>
            `
          )
          .join("")}
        <tr class="total-row">
          <th>Total</th>
          <td>${formatCurrency(total)}</td>
        </tr>
      </tbody>
    </table>
  `;

  dashboard.classList.add("hidden");
  quotationView.classList.remove("hidden");
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const loginError = document.getElementById("loginError");

  if (username === "admin" && password === "1234") {
    localStorage.setItem(LOGIN_KEY, "true");
    loginError.textContent = "";
    showDashboard();
  } else {
    loginError.textContent = "Invalid username or password.";
  }
});

document.getElementById("logoutButton").addEventListener("click", () => {
  localStorage.removeItem(LOGIN_KEY);
  loginForm.reset();
  showLogin();
});

pricingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const car = {
    model: document.getElementById("pricingModel").value.trim(),
    color: document.getElementById("pricingColor").value.trim(),
    cost: Number(document.getElementById("pricingCost").value) || 0,
    insurance: Number(document.getElementById("pricingInsurance").value) || 0,
    tcs: Number(document.getElementById("pricingTcs").value) || 0,
    rto: Number(document.getElementById("pricingRto").value) || 0,
    misc: Number(document.getElementById("pricingMisc").value) || 0
  };

  const cars = getCars();
  const existingIndex = cars.findIndex(
    (savedCar) => savedCar.model.toLowerCase() === car.model.toLowerCase()
  );

  if (existingIndex >= 0) {
    cars[existingIndex] = car;
  } else {
    cars.push(car);
  }

  saveCars(cars);
  pricingForm.reset();
  renderCars();
});

savedCarsList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-edit-model]");
  if (!button) {
    return;
  }

  const car = getCars().find((item) => item.model === button.dataset.editModel);
  if (car) {
    fillPricingForm(car);
  }
});

carModelSelect.addEventListener("change", fillQuoteFromSelectedCar);

["cost", "insurance", "tcs", "rto", "misc", "discount"].forEach((field) => {
  quoteFields[field].addEventListener("input", calculateTotalFromQuoteFields);
});

quotationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  buildQuotation();
});

document.getElementById("printButton").addEventListener("click", () => {
  window.print();
});

document.getElementById("backButton").addEventListener("click", showDashboard);

document.getElementById("quoteDate").valueAsDate = new Date();
calculateTotalFromQuoteFields();

if (localStorage.getItem(LOGIN_KEY) === "true") {
  showDashboard();
} else {
  showLogin();
}

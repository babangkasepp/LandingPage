// TODO: ganti dengan nomor WhatsApp asli.
// Format: kode negara 62, tanpa angka 0 di depan, tanpa spasi/simbol.
// Contoh nomor 0812-3456-7890 -> "6281234567890"
const WHATSAPP_NUMBER = "628XXXXXXXXXX";

const BASE_PRICE = 100000;
const ADDON_PRICES = { frame: 15000, antiAir: 10000 };

const plateInput = document.getElementById("plate");
const colorSelect = document.getElementById("color");
const regionSelect = document.getElementById("region");
const frameCheckbox = document.getElementById("frame");
const antiAirCheckbox = document.getElementById("antiAir");
const totalEl = document.getElementById("total");
const plateError = document.getElementById("plateError");

const heroPlate = document.getElementById("heroPlate");
const heroPlateText = document.getElementById("heroPlateText");
const formPlate = document.getElementById("formPlate");
const formPlateText = document.getElementById("formPlateText");
const previewRegion = document.getElementById("previewRegion");

function calculateTotal() {
  let total = BASE_PRICE;
  if (frameCheckbox.checked) total += ADDON_PRICES.frame;
  if (antiAirCheckbox.checked) total += ADDON_PRICES.antiAir;
  totalEl.textContent = total;
  return total;
}

function updatePreview() {
  const rawPlate = plateInput.value.trim();
  const displayPlate = rawPlate || "B 1234 ABC";
  const color = colorSelect.value;

  [heroPlateText, formPlateText].forEach((el) => {
    el.textContent = displayPlate;
  });
  [heroPlate, formPlate].forEach((el) => {
    el.setAttribute("data-color", color);
  });

  previewRegion.textContent = regionSelect.value;
}

function validatePlate() {
  const isValid = plateInput.value.trim().length > 0;
  plateInput.classList.toggle("invalid", !isValid);
  plateError.hidden = isValid;
  return isValid;
}

function buildWhatsAppUrl() {
  const plate = plateInput.value.trim();
  const color = colorSelect.options[colorSelect.selectedIndex].text;
  const region = regionSelect.value;
  const total = totalEl.textContent;

  const message =
    `Halo, saya ingin pesan plat nomor:\n` +
    `Nomor: ${plate}\n` +
    `Warna: ${color}\n` +
    `Wilayah: ${region}\n` +
    `Total: Rp${total}`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function orderNow() {
  if (!validatePlate()) {
    plateInput.focus();
    return;
  }
  window.open(buildWhatsAppUrl(), "_blank", "noopener");
}

function goToForm() {
  document.getElementById("order-form").scrollIntoView({ behavior: "smooth" });
  plateInput.focus({ preventScroll: true });
}

document.querySelectorAll("input, select").forEach((el) => {
  el.addEventListener("change", () => {
    calculateTotal();
    updatePreview();
  });
});

plateInput.addEventListener("input", () => {
  updatePreview();
  if (!plateError.hidden) validatePlate();
});

document.getElementById("orderBtn").addEventListener("click", orderNow);
document.getElementById("heroCta").addEventListener("click", goToForm);

document.getElementById("year").textContent = new Date().getFullYear();

calculateTotal();
updatePreview();

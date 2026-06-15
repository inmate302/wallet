// JS
const initialBalance = 60000;

function populateStorage() {
  localStorage.setItem("balance", initialBalance);
}

// DOMContentLoaded = Sincronizar UI al haber cambios en valores guardados
document.addEventListener("DOMContentLoaded", () => {
  const stored = localStorage.getItem("balance");

  if (stored === null) {
    populateStorage();
    document.getElementById("balance").textContent = `$${initialBalance}`;
  } else {
    document.getElementById("balance").textContent = `$${stored}`;
  }
});

function deposit(amount) {
  const currentBalance = Number(localStorage.getItem("balance")) || 0;
  const newBalance = currentBalance + amount;

  localStorage.setItem("balance", newBalance);
  document.getElementById("balance").textContent = `$${newBalance}`;
}

function deduct(amount) {
  const currentBalance = Number(localStorage.getItem("balance")) || 0;
  const newBalance = currentBalance - amount;

  localStorage.setItem("balance", newBalance);
  document.getElementById("balance").textContent = `$${newBalance}`;
}
// JS
const initialBalance = 60000;

let transactions = [];

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
  //validar depósito
  if (!amount || amount <= 0) {
    alert("Ingrese una cantidad válida para el depósito");
    return;
  }

  const currentBalance = Number(localStorage.getItem("balance")) || 0;
  const newBalance = currentBalance + amount;

  //crear objeto de depósito
  const depositTransaction = {
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    type: "deposit",
    amount: amount
  };

  //se guarda depósito en localStorage
  let deposits = JSON.parse(localStorage.getItem("deposit")) || [];
  deposits.push(depositTransaction);
  localStorage.setItem("deposit", JSON.stringify(deposits));

  //se actualiza saldo o balance
  localStorage.setItem("balance", newBalance);

  const balanceElement = document.getElementById("balance");
  if (balanceElement) {
    balanceElement.textContent = `$${newBalance}`;  // <- actualiza visualmente en el dom sólo si el elemento existe
  }

  alert("¡Deposito realizado de manera exitosa!");
}

function deduct(amount, recipientFullName, recipientBank) {
  //validar transferencia
  if (!amount || amount <= 0) {
    alert("Ingrese una cantidad válida para la transferencia");
    return;
  }
  
  const currentBalance = Number(localStorage.getItem("balance")) || 0;

  //validar si el saldo es suficiente
  if (amount > currentBalance) {
    alert("¡Saldo insuficiente para esta transferencia!");
    return;
  }

  const newBalance = currentBalance - amount;

  //crear objeto de transferencia
  const transferTransaction = {
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    type: "transfer",
    amount: amount,
    recipient: recipientFullName,
    bank: recipientBank
  };  
  
  //se guarda transferencia a localStorage
  let transfers = JSON.parse(localStorage.getItem("transfer")) || [];
  transfers.push(transferTransaction);
  localStorage.setItem("transfer", JSON.stringify(transfers));

  //se actualiza saldo o balance
  localStorage.setItem("balance", newBalance);

  const balanceElement = document.getElementById("balance");
  if (balanceElement) {
    balanceElement.textContent = `$${newBalance}`;  // <- actualiza visualmente en el dom sólo si el elemento existe
  }

  alert("¡Transferencia exitosa!");
}
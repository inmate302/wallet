window.addEventListener('DOMContentLoaded', function() {
  // Obtenemos los depósitos y transferencias...
  const deposits = JSON.parse(localStorage.getItem("deposit")) || [];
  const transfers = JSON.parse(localStorage.getItem("transfer")) || [];
  
  // y los juntamos en un solo arreglo.
  const allTransactions = [...deposits, ...transfers];
  
  // Ordenar por fecha
  allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Limpiar lista
  document.getElementById("transactionList").innerHTML = "";
  
  // Renderizar cada transacción (depósito o transferencia)
  allTransactions.forEach(transaction => renderTransaction(transaction));
});

function renderTransaction(transaction) {
  const transactionDiv = document.createElement("div");
  transactionDiv.className = "transaction-item";
  
  // creamos clase especifíco por tipo de transacción para estilizarlas posteriormente
  transactionDiv.classList.add(transaction.type === "transfer" ? "transfer-item" : "deposit-item");
  
  const formattedDate = new Date(transaction.date).toLocaleDateString();
  
  const typeLabel = transaction.type === "deposit" ? "Depósito" : "Transferencia";
  const amountDisplay = transaction.type === "deposit" 
    ? `+$${transaction.amount}` 
    : `-$${transaction.amount}`;

  transactionDiv.innerHTML = `
    <div class="contact-header" onclick="toggleTransaction(this)">
      <span class="contact-alias">${typeLabel} ${amountDisplay}</span>
      <span class="toggle-icon">▼</span>
    </div>
    <div class="contact-details" style="display: none;">
      <p><strong>ID:</strong> ${transaction.id}</p>
      <p><strong>Fecha:</strong> ${formattedDate}</p>
      <p><strong>Monto:</strong> $${transaction.amount}</p>
      ${transaction.type === "transfer" 
        ? `<p><strong>Destinatario:</strong> ${transaction.recipient}</p>
           <p><strong>Banco:</strong> ${transaction.bank}</p>` 
        : ''}
    </div>
  `;
  
  document.getElementById("transactionList").appendChild(transactionDiv);
}


function toggleTransaction(element) {
  const details = element.nextElementSibling;
  const icon = element.querySelector('.toggle-icon');
  
  if (details.style.display === "none") {
    details.style.display = "block";
    icon.style.transform = "rotate(180deg)";
  } else {
    details.style.display = "none";
    icon.style.transform = "rotate(0deg)";
  }
}

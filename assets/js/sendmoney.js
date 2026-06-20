
      let contactsGlobal = [];

      window.addEventListener('DOMContentLoaded', function() {
        contactsGlobal = JSON.parse(localStorage.getItem("contacto")) || [];
        document.getElementById("contactList").innerHTML = ""; // Limpiar lista
        contactsGlobal.forEach(contact => renderContact(contact));
        initializeAutocomplete();
      });

      // Inicializar autocomplete
      function initializeAutocomplete() {
        $("#searchContact").autocomplete({
          source: function(request, response) {
            // Filtrar contactos basado en input del usuario
            const filtered = contactsGlobal.filter(contact =>
              contact.alias.toLowerCase().includes(request.term.toLowerCase()) ||
              contact.nombre.toLowerCase().includes(request.term.toLowerCase())
            );
            
            // Regresar sugerencias formateadas
            response(filtered.map(contact => ({
              label: `${contact.alias} (${contact.nombre})`,
              value: contact.alias
            })));
          },
          minLength: 2,
          select: function(event, ui) {
            // Cuando el usuario selecciona una sugerencia usar como input y filtrar
            document.getElementById("searchContact").value = ui.item.value;
            filterContacts(ui.item.value);
            return false;
          }
        });
        
        $("#searchContact").on("input", function() {
          const searchTerm = $(this).val();
          filterContacts(searchTerm);
        });
      }

      // Filtrar y mostrar u ocultar basado en el término de búsqueda
      function filterContacts(searchTerm) {
        const contactElements = document.querySelectorAll('.contact-item');
        
        if (searchTerm.length < 2) {
          // Si es menos de 2 carácteres mostrar todos los contactos
          contactElements.forEach(el => {
            el.style.display = "block";
          });
          return;
        }
        
        const lowerSearchTerm = searchTerm.toLowerCase();
        
        contactElements.forEach(el => {
          const aliasSpan = el.querySelector('.contact-alias');
          const alias = aliasSpan.textContent.toLowerCase();
          
          // Obtener el nombre de los detalles de contacto
          const nombreParagraph = el.querySelector('.contact-details p');
          const nombre = nombreParagraph ? nombreParagraph.textContent.toLowerCase() : "";
          
          // Mostrar contacto si calza con nombre o alias
          if (alias.includes(lowerSearchTerm) || nombre.includes(lowerSearchTerm)) {
            el.style.display = "block";
          } else {
            el.style.display = "none";
          }
        });
      }
      
      /* crea un div con el alias del contacto que al hacerle click 
         despliega otro div con los detalles del contacto (nombre completa, n° de cuenta, banco)
         como también el campo para indicar el monto de transferencia y un botón.
      */
      
      function renderContact(contact) {
        const contactDiv = document.createElement("div");
        contactDiv.className = "contact-item";
        contactDiv.innerHTML = `
          <div class="contact-header" onclick="toggleContact(this)">
            <span class="contact-alias">${contact.alias}</span>
            <span class="toggle-icon">▼</span>
          </div>
          <div class="contact-details" style="display: none;">
            <p><strong>Nombre:</strong> ${contact.nombre}</p>
            <p><strong>Cuenta:</strong> ${contact.ctacte}</p>
            <p><strong>Banco:</strong> ${contact.banco}</p>
            
            <hr style="margin: 12px 0;">
            
            <div class="transfer-form">
              <label for="transferAmount_${contact.alias}">¿Cuánto deseas transferir?</label>
              <div style="display: flex; gap: 8px; margin-top: 8px;">
                <input 
                  type="number" 
                  id="transferAmount_${contact.alias}" 
                  class="form-control" 
                  placeholder="Monto"
                  min="0"
                  step="0.01"
                  style="flex: 1;"
                >
                <button 
                  class="btn btn-primary" 
  onclick="deduct(parseFloat(document.getElementById('transferAmount_${contact.alias}').value), '${contact.nombre}', '${contact.banco}')">
                  Enviar dinero
                </button>
              </div>
            </div>
          </div>
        `;
        
        document.getElementById("contactList").appendChild(contactDiv);
      }

    // Expandir contacto para mostrar detalles    
    function toggleContact(header) {
      const details = header.nextElementSibling;
      const icon = header.querySelector(".toggle-icon");
      
      if (details.style.display === "none") {
        details.style.display = "block";
        icon.style.transform = "rotate(180deg)";
      } else {
        details.style.display = "none";
        icon.style.transform = "rotate(0deg)";
      }
    }

    // Creamos un objeto JSON con los campos de contacto y lo guardamos usando localStorage
    function saveContact(){
      const contact = {
        nombre: document.getElementById("fullName").value,
        ctacte: document.getElementById("account").value,
        alias: document.getElementById("alias").value,
        banco: document.getElementById("bankName").value
      };
      
      // Validación de campos
      if (!contact.nombre || !contact.ctacte || !contact.alias || !contact.banco) {
        alert("Por favor, completa todos los campos");
        return;
      }
      // Validación de nombre completo
      if (contact.nombre.trim().split(/\s+/).length < 2) {
        alert("Debes escribir al menos un nombre y un apellido");
        return;
      }
      // Validación de cuenta corriente
      if (!/^\d+$/.test(contact.ctacte)) {
        alert("Debes ingresar un número de cuenta corriente");
        return;
      }

      if (contact.ctacte.length > 11) {
        alert("Debes ingresar una secuencia númerica no mayor a 11 números");
        return;
      }

      // Obtener contactos o inicializar lista vacía
      let contacts = JSON.parse(localStorage.getItem("contacto")) || [];
      
      // Agregar nuevo contacto
      contacts.push(contact);

      // Guardar localStorage
      localStorage.setItem("contacto", JSON.stringify(contacts));

      // Actualizar arreglo de contactos de manera global
      contactsGlobal = contacts;
      
      renderContact(contact);
      
      // Refrescar autocomplete con nuevos datos
      $("#searchContact").autocomplete("destroy");
      initializeAutocomplete();
      
      // Borrar campo de búsqueda
      document.getElementById("searchContact").value = "";
      filterContacts("");
      
      // Borrar campos de formulario
      document.getElementById("fullName").value = "";
      document.getElementById("account").value = "";
      document.getElementById("alias").value = "";
      document.getElementById("bankName").value = "";
      }

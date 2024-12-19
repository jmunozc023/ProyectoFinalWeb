// ============ El código a continuación es antes de la modificación de la verificación de fechas / Hora 11:25 ============

document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("search-btn");
  const resetBtn = document.getElementById("reset-btn");
  const checkinInput = document.getElementById("checkin");
  const checkoutInput = document.getElementById("checkout");

  const roomTypesSection = document.getElementById("room-types-section");
  const availableRoomsSection = document.getElementById(
    "available-rooms-section"
  );

  const continueBtn = document.getElementById("select-continue"); // Botón de "Seleccionar y continuar"

  // Función para inicializar los eventos de los controles de cantidad
  function initializeIncrementButtons() {
    document.querySelectorAll(".increment-buttons").forEach((container) => {
      const decrementBtn = container.querySelector(".decrement");
      const incrementBtn = container.querySelector(".increment");
      const countInput = container.querySelector(".room-count");

      decrementBtn.addEventListener("click", () => {
        let currentValue = parseInt(countInput.value, 10);
        if (currentValue > 0) {
          countInput.value = currentValue - 1;
          checkSelection();
        }
      });

      incrementBtn.addEventListener("click", () => {
        let currentValue = parseInt(countInput.value, 10);
        if (currentValue < 10) {
          countInput.value = currentValue + 1;
          checkSelection();
        }
      });
    });
  }

  // Función para verificar si hay al menos una habitación seleccionada
  function checkSelection() {
    let isAnySelected = false;

    document.querySelectorAll(".room-count").forEach((input) => {
      if (parseInt(input.value, 10) > 0) {
        isAnySelected = true;
      }
    });

    // Activar o desactivar el botón "Seleccionar y continuar"
    if (isAnySelected) {
      continueBtn.disabled = false;
      continueBtn.classList.add("enabled");
    } else {
      continueBtn.disabled = true;
      continueBtn.classList.remove("enabled");
    }
  }

  // Función para actualizar las habitaciones disponibles
  function updateAvailableRooms() {
    const checkinDate = new Date(checkinInput.value);
    const checkoutDate = new Date(checkoutInput.value);

    // Ejemplo estático de habitaciones disponibles con información adicional
    const availableRooms = [
      {
        type: "Habitación Individual",
        beds: "1 cama individual",
        guests: 1,
        price: 100,
      },
      {
        type: "Habitación Doble - 2 camas",
        beds: "2 camas dobles grandes",
        guests: 4,
        price: 150,
      },
      {
        type: "Suite",
        beds: "1 cama king-size",
        guests: 2,
        price: 250,
      },
    ];

    const tableBody = document.querySelector("#available-rooms-table tbody");
    tableBody.innerHTML = ""; // Limpiar las habitaciones anteriores

    availableRooms.forEach((room) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>
          ${room.type}<br />
          <span>${room.beds}</span>
        </td>
        <td>👤 x${room.guests}</td>
        <td class="price" data-price="${room.price}">$${room.price}</td>
        <td>
          <div class="increment-buttons">
            <button type="button" class="decrement">-</button>
            <input type="text" value="0" readonly class="room-count" />
            <button type="button" class="increment">+</button>
          </div>
        </td>
      `;
      tableBody.appendChild(row);
    });

    // Inicializar los eventos de los controles dinámicos
    initializeIncrementButtons();
    checkSelection(); // Verificar selección inicial
  }

  // Mostrar habitaciones disponibles al hacer clic en "Buscar"
  searchBtn.addEventListener("click", function () {
    // Comprobar que las fechas sean válidas
    if (!checkinInput.value || !checkoutInput.value) {
      alert("Por favor, selecciona las fechas de entrada y salida.");
      return;
    }

    // Ocultar la sección de tipos de habitaciones y mostrar las habitaciones disponibles
    roomTypesSection.style.display = "none";
    availableRoomsSection.style.display = "block";
    updateAvailableRooms();
  });

  // Restablecer los campos y ocultar la sección de habitaciones disponibles
  resetBtn.addEventListener("click", function () {
    checkinInput.value = "";
    checkoutInput.value = "";

    roomTypesSection.style.display = "block";
    availableRoomsSection.style.display = "none";
  });

  // Guardar la selección y continuar
  continueBtn.addEventListener("click", () => {
    const selectedRooms = [];

    document
      .querySelectorAll("#available-rooms-table tbody tr")
      .forEach((row) => {
        const roomType = row
          .querySelector("td")
          .childNodes[0].textContent.trim(); // Tipo de habitación
        const price = row.querySelector(".price").dataset.price; // Precio extraído de data-price
        const count = row.querySelector(".room-count").value; // Cantidad seleccionada

        if (parseInt(count, 10) > 0) {
          selectedRooms.push({
            type: roomType,
            price: parseFloat(price),
            quantity: parseInt(count, 10),
          });
        }
      });

    // Guardar los datos en localStorage para transferirlos
    localStorage.setItem("selectedRooms", JSON.stringify(selectedRooms));

    // Redirigir a la página de pagos
    window.location.href = "Pagos.html";
  });
});

// =============================================== RESEÑAS ===============================================

// Mostrar el formulario al hacer clic en "Dejar reseña"
document
  .getElementById("leave-review-btn")
  .addEventListener("click", function () {
    document.getElementById("review-form").style.display = "block"; // Muestra el formulario
    this.style.display = "none"; // Oculta el botón "Dejar reseña"
  });

// Ocultar el formulario al hacer clic en "Cancelar"
document
  .getElementById("cancel-review-btn")
  .addEventListener("click", function () {
    document.getElementById("review-form").style.display = "none"; // Oculta el formulario
    document.getElementById("leave-review-btn").style.display = "block"; // Muestra el botón "Dejar reseña"
  });

// =============================================== RESERVAS ===============================================

// Esperamos que el DOM esté completamente cargado
// Esperamos que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  const checkinInput = document.getElementById("checkin-rd");
  const guestCountInput = document.getElementById("guest-count-rd");
  const searchBtn = document.getElementById("search-btn-rd");
  const resetBtn = document.getElementById("reset-btn-rd");

  const decrementBtn = document.querySelector(".decrement-rd");
  const incrementBtn = document.querySelector(".increment-rd");

  const maxGuests = 10;

  // Función para validar las fechas
  function validateDates() {
    const checkinDate = new Date(checkinInput.value);
    const today = new Date();

    // Validación de fechas
    if (checkinDate < today) {
      alert("La fecha de entrada no puede ser anterior a hoy.");
      checkinInput.value = "";
    }
  }

  // Función para habilitar/deshabilitar el botón de "Reservar"
  function toggleReserveButton() {
    const checkinDate = checkinInput.value;
    const guestCount = parseInt(guestCountInput.value);

    // Habilitar el botón si las fechas y la cantidad de personas son válidas
    if (
      checkinDate &&
      guestCount > 0 &&
      guestCount <= maxGuests
    ) {
      searchBtn.disabled = false;
    } else {
      searchBtn.disabled = true;
    }
  }

  // Función para incrementar o decrementar la cantidad de personas
  function updateGuestCount(increment) {
    let currentCount = parseInt(guestCountInput.value);
    if (increment && currentCount < maxGuests) {
      guestCountInput.value = currentCount + 1;
    } else if (!increment && currentCount > 0) {
      guestCountInput.value = currentCount - 1;
    }
    toggleReserveButton(); // Actualizar estado del botón de reserva
  }

  // Event listeners para los inputs de fechas
  checkinInput.addEventListener("change", validateDates);

  // Event listeners para botones de incremento/decremento
  incrementBtn.addEventListener("click", () => updateGuestCount(true));
  decrementBtn.addEventListener("click", () => updateGuestCount(false));

  // Event listener para el botón de "Restablecer"
  resetBtn.addEventListener("click", () => {
    checkinInput.value = "";
    guestCountInput.value = "0";
    toggleReserveButton(); // Deshabilitar el botón de reserva
  });

  // Inicialmente, deshabilitamos el botón de "Reservar"
  toggleReserveButton();
});

// ====================================== RESERVAS / GUARDAR INFO ======================================

document.addEventListener("DOMContentLoaded", () => {
  const priceElement = document.getElementById("price-rd");
  const pricePerNight = parseFloat(priceElement.textContent.trim()) || 0; // Precio de voletos de avión
  const checkinInput = document.getElementById("checkin-rd"); // Fecha del vuelo
  const guestCountInput = document.getElementById("guest-count-rd"); // Cantidad de voletos
  const reserveButton = document.getElementById("search-btn-rd"); // Botón de reserva

  function calculateReservation() {
    const checkinDate = new Date(checkinInput.value);
    const guestCount = parseInt(guestCountInput.value);

    if (guestCount > 0) {
      const totalCost = guestCount * pricePerNight;

      // Crear un objeto con los datos de la reserva
      const reservationDetails = {
        pricePerNight,
        checkinDate: checkinDate.toISOString().split("T")[0], // En este caso, es la fecha del vuelo.
        guestCount, // En este caso no son noches, sino voletos.
        totalCost,
      };

      // Guardar los datos en localStorage
      localStorage.setItem(
        "reservationDetails",
        JSON.stringify(reservationDetails)
      );

      // Redirigir a la página de pagos
      window.location.href = "pagosDestinos.html";
    } else {
      alert("Por favor, selecciona fechas y una cantidad de personas válidas.");
    }
  }

  reserveButton.addEventListener("click", calculateReservation);
});

// =============================================== RESEÑAS ===============================================

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("leave-review-btn-rd")
    .addEventListener("click", function () {
      document.getElementById("review-form-rd").style.display = "block"; // Muestra el formulario
      this.style.display = "none"; // Oculta el botón "Dejar reseña"
    });

  // Ocultar el formulario al hacer clic en "Cancelar"
  document
    .getElementById("cancel-review-btn-rd")
    .addEventListener("click", function () {
      document.getElementById("review-form-rd").style.display = "none"; // Oculta el formulario
      document.getElementById("leave-review-btn-rd").style.display = "block"; // Muestra el botón "Dejar reseña"
    });
});

// ================================== VALIDACIÓN DEL BOTÓN ENVIAR RESEÑA ==================================

document.addEventListener("DOMContentLoaded", () => {
  const reviewTextInput = document.getElementById("review-text-rd");
  const reviewRatingInput = document.getElementById("review-rating-rd");
  const submitReviewButton = document.getElementById("submit-review-btn-rd");

  // Función para habilitar/deshabilitar el botón
  function toggleSubmitReviewButton() {
    const reviewText = reviewTextInput.value.trim();
    const reviewRating = reviewRatingInput.value;

    if (reviewText !== "" && reviewRating !== "") {
      submitReviewButton.disabled = false; // Habilitar botón
    } else {
      submitReviewButton.disabled = true; // Deshabilitar botón
    }
  }

  // Event listeners para los inputs
  reviewTextInput.addEventListener("input", toggleSubmitReviewButton);
  reviewRatingInput.addEventListener("change", toggleSubmitReviewButton);

  // Inicialmente deshabilitamos el botón
  toggleSubmitReviewButton();

  // Manejo del envío de la reseña
  submitReviewButton.addEventListener("click", () => {
    const reviewText = reviewTextInput.value.trim();
    const reviewRating = reviewRatingInput.value;

    if (reviewText && reviewRating) {
      alert(
        `¡Gracias por tu reseña!\n\nReseña: ${reviewText}\nCalificación: ${reviewRating} estrellas`
      );
      reviewTextInput.value = "";
      reviewRatingInput.value = "";
      toggleSubmitReviewButton();
    }

    // ============================== Agregar la reseña a la lista de reseñas ==========================
    const reviewsList = document.querySelector(".reviews-list");
    const newReview = document.createElement("p");
    newReview.innerHTML = `
    <strong>Tu reseña:</strong>
    <br /><span style="margin-left: 30px"> ${reviewText} </span> <br/> 
    <span style="margin-left: 30px"> Calificación:</span><span>★${reviewRating}</span>
    `;
    reviewsList.appendChild(newReview);

  });
});



/*
    comentario anterior:

    <strong>Tu reseña:</strong> ${reviewText} <span>★${reviewRating}</span>

    Comentario nuevo:
    <strong>Tu reseña:</strong>
    <br /><span style="margin-left: 30px"> ${reviewText} </span> <br/> 
    <span style="margin-left: 30px"> Calificación:</span><span>★${reviewRating}</span>
    */

// ============ CÓDIGO DESPUÉS DEL REWORK ============

// =============================================== RESERVAS ===============================================

// Esperamos que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  const checkinInput = document.getElementById("checkin");
  const checkoutInput = document.getElementById("checkout");
  const guestCountInput = document.getElementById("guest-count");
  const searchBtn = document.getElementById("search-btn");
  const resetBtn = document.getElementById("reset-btn");

  const decrementBtn = document.querySelector(".decrement");
  const incrementBtn = document.querySelector(".increment");

  const maxGuests = 10;

  // Función para validar las fechas
  function validateDates() {
    const checkinDate = new Date(checkinInput.value);
    const checkoutDate = new Date(checkoutInput.value);
    const today = new Date();

    // Validación de fechas
    if (checkinDate < today) {
      alert("La fecha de entrada no puede ser anterior a hoy.");
      checkinInput.value = "";
    } else if (checkoutDate <= checkinDate) {
      alert("La fecha de salida debe ser posterior a la fecha de entrada.");
      checkoutInput.value = "";
    }
  }

  // Función para habilitar/deshabilitar el botón de "Reservar"
  function toggleReserveButton() {
    const checkinDate = checkinInput.value;
    const checkoutDate = checkoutInput.value;
    const guestCount = parseInt(guestCountInput.value);

    // Habilitar el botón si las fechas y la cantidad de personas son válidas
    if (
      checkinDate &&
      checkoutDate &&
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
  checkoutInput.addEventListener("change", validateDates);

  // Event listeners para botones de incremento/decremento
  incrementBtn.addEventListener("click", () => updateGuestCount(true));
  decrementBtn.addEventListener("click", () => updateGuestCount(false));

  // Event listener para el botón de "Restablecer"
  resetBtn.addEventListener("click", () => {
    checkinInput.value = "";
    checkoutInput.value = "";
    guestCountInput.value = "0";
    toggleReserveButton(); // Deshabilitar el botón de reserva
  });

  // Inicialmente, deshabilitamos el botón de "Reservar"
  toggleReserveButton();
});

// ====================================== RESERVAS / GUARDAR INFO ======================================

document.addEventListener("DOMContentLoaded", () => {
  const pricePerNight = 100; // Precio por noche
  const checkinInput = document.getElementById("checkin");
  const checkoutInput = document.getElementById("checkout");
  const guestCountInput = document.getElementById("guest-count");
  const reserveButton = document.getElementById("search-btn");

  function calculateReservation() {
    const checkinDate = new Date(checkinInput.value);
    const checkoutDate = new Date(checkoutInput.value);
    const guestCount = parseInt(guestCountInput.value);
    const nights = (checkoutDate - checkinDate) / (1000 * 60 * 60 * 24);

    if (nights > 0 && guestCount > 0) {
      const totalCost = nights * pricePerNight;

      // Crear un objeto con los datos de la reserva
      const reservationDetails = {
        pricePerNight,
        checkinDate: checkinDate.toISOString().split("T")[0], // Formatear fecha
        checkoutDate: checkoutDate.toISOString().split("T")[0],
        nights,
        guestCount,
        totalCost,
      };

      // Guardar los datos en localStorage
      localStorage.setItem(
        "reservationDetails",
        JSON.stringify(reservationDetails)
      );

      // Redirigir a la página de pagos
      window.location.href = "pagosHoteles.html";
    } else {
      alert("Por favor, selecciona fechas y una cantidad de personas válidas.");
    }
  }

  reserveButton.addEventListener("click", calculateReservation);
});

// =============================================== RESEÑAS ===============================================

// Mostrar el formulario al hacer clic en "Dejar reseña"
document.addEventListener("DOMContentLoaded", () => {
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
});

// ================================== VALIDACIÓN DEL BOTÓN ENVIAR RESEÑA ==================================

document.addEventListener("DOMContentLoaded", () => {
  const reviewTextInput = document.getElementById("review-text");
  const reviewRatingInput = document.getElementById("review-rating");
  const submitReviewButton = document.getElementById("submit-review-btn");

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
      // Mostrar la reseña como confirmación (puedes cambiar esto por lógica de servidor o similar)
      alert(
        `¡Gracias por tu reseña!\n\nReseña: ${reviewText}\nCalificación: ${reviewRating} estrellas`
      );

      // Limpiar los campos después del envío
      reviewTextInput.value = "";
      reviewRatingInput.value = "";
      toggleSubmitReviewButton(); // Deshabilitar botón de nuevo
    } else {
      // Validación de seguridad (este caso no debería ocurrir si los controles funcionan correctamente)
      alert(
        "Por favor, escribe una reseña y selecciona una calificación antes de enviarla."
      );
    }

// ============================== Opcional: Agregar la reseña a la lista de reseñas ==========================
    const reviewsList = document.querySelector(".reviews-list");
    const newReview = document.createElement("p");
    newReview.innerHTML = `<strong>Tu reseña:</strong> ${reviewText} <span>★${reviewRating}</span>`;
    reviewsList.appendChild(newReview);
  });
});

// =============================================== RESERVAS ===============================================

// Esperamos que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  const checkinInput7 = document.getElementById("checkin7");
  const checkoutInput7 = document.getElementById("checkout7");
  const guestCountInput7 = document.getElementById("guest-count7");
  const searchBtn7 = document.getElementById("search-btn7");
  const resetBtn7 = document.getElementById("reset-btn7");

  const decrementBtn7 = document.querySelector(".decrement7");
  const incrementBtn7 = document.querySelector(".increment7");

  const maxGuests = 10;

  // Función para validar las fechas
  function validateDates7() {
    const checkinDate7 = new Date(checkinInput7.value);
    const checkoutDate7 = new Date(checkoutInput7.value);
    const today = new Date();

    // Validación de fechas
    if (checkinDate7 < today) {
      alert("La fecha de entrada no puede ser anterior a hoy.");
      checkinInput7.value = "";
    } else if (checkoutDate7 <= checkinDate7) {
      alert("La fecha de salida debe ser posterior a la fecha de entrada.");
      checkoutInput7.value = "";
    }
  }

  // Función para habilitar/deshabilitar el botón de "Reservar"
  function toggleReserveButton7() {
    const checkinDate7 = checkinInput7.value;
    const checkoutDate7 = checkoutInput7.value;
    const guestCount7 = parseInt(guestCountInput7.value);

    // Habilitar el botón si las fechas y la cantidad de personas son válidas
    if (
      checkinDate7 &&
      checkoutDate7 &&
      guestCount7 > 0 &&
      guestCount7 <= maxGuests
    ) {
      searchBtn7.disabled = false;
    } else {
      searchBtn7.disabled = true;
    }
  }

  // Función para incrementar o decrementar la cantidad de personas
  function updateGuestCount7(increment) {
    let currentCount7 = parseInt(guestCountInput7.value);
    if (increment && currentCount7 < maxGuests) {
      guestCountInput7.value = currentCount7 + 1;
    } else if (!increment && currentCount7 > 0) {
      guestCountInput7.value = currentCount7 - 1;
    }
    toggleReserveButton7(); // Actualizar estado del botón de reserva
  }

  // Event listeners para los inputs de fechas
  checkinInput7.addEventListener("change", validateDates7);
  checkoutInput7.addEventListener("change", validateDates7);

  // Event listeners para botones de incremento/decremento
  incrementBtn7.addEventListener("click", () => updateGuestCount7(true));
  decrementBtn7.addEventListener("click", () => updateGuestCount7(false));

  // Event listener para el botón de "Restablecer"
  resetBtn7.addEventListener("click", () => {
    checkinInput7.value = "";
    checkoutInput7.value = "";
    guestCountInput7.value = "0";
    toggleReserveButton7(); // Deshabilitar el botón de reserva
  });

  // Inicialmente, deshabilitamos el botón de "Reservar"
  toggleReserveButton7();
});

// ====================================== RESERVAS / GUARDAR INFO ======================================

document.addEventListener("DOMContentLoaded", () => {
  const priceElement = document.getElementById("price7");
  const pricePerNight = parseFloat(priceElement.textContent.trim()) || 0;
  const checkinInput = document.getElementById("checkin7");
  const checkoutInput = document.getElementById("checkout7");
  const guestCountInput = document.getElementById("guest-count7");
  const reserveButton = document.getElementById("search-btn7");

  function calculateReservation7() {
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

  reserveButton.addEventListener("click", calculateReservation7);
});

// =============================================== RESEÑAS ===============================================

// Mostrar el formulario al hacer clic en "Dejar reseña"
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("leave-review-btn7")
    .addEventListener("click", function () {
      document.getElementById("review-form7").style.display = "block"; // Muestra el formulario
      this.style.display = "none"; // Oculta el botón "Dejar reseña"
    });

  // Ocultar el formulario al hacer clic en "Cancelar"
  document
    .getElementById("cancel-review-btn7")
    .addEventListener("click", function () {
      document.getElementById("review-form7").style.display = "none"; // Oculta el formulario
      document.getElementById("leave-review-btn7").style.display = "block"; // Muestra el botón "Dejar reseña"
    });
});

// ================================== VALIDACIÓN DEL BOTÓN ENVIAR RESEÑA ==================================

document.addEventListener("DOMContentLoaded", () => {
  const reviewTextInput7 = document.getElementById("review-text7");
  const reviewRatingInput7 = document.getElementById("review-rating7");
  const submitReviewButton7 = document.getElementById("submit-review-btn7");

  // Función para habilitar/deshabilitar el botón
  function toggleSubmitReviewButton7() {
    const reviewText7 = reviewTextInput7.value.trim();
    const reviewRating7 = reviewRatingInput7.value;

    if (reviewText7 !== "" && reviewRating7 !== "") {
      submitReviewButton7.disabled = false; // Habilitar botón
    } else {
      submitReviewButton7.disabled = true; // Deshabilitar botón
    }
  }

  // Event listeners para los inputs
  reviewTextInput7.addEventListener("input", toggleSubmitReviewButton7);
  reviewRatingInput7.addEventListener("change", toggleSubmitReviewButton7);

  // Inicialmente deshabilitamos el botón
  toggleSubmitReviewButton7();

  // Manejo del envío de la reseña
  submitReviewButton7.addEventListener("click", () => {
    const reviewText7 = reviewTextInput7.value.trim();
    const reviewRating7 = reviewRatingInput7.value;

    if (reviewText7 && reviewRating7) {
      // Mostrar la reseña como confirmación (puedes cambiar esto por lógica de servidor o similar)
      alert(
        `¡Gracias por tu reseña!\n\nReseña: ${reviewText7}\nCalificación: ${reviewRating7} estrellas`
      );

      // Limpiar los campos después del envío
      reviewTextInput7.value = "";
      reviewRatingInput7.value = "";
      toggleSubmitReviewButton7(); // Deshabilitar botón de nuevo
    } else {
      // Validación de seguridad (este caso no debería ocurrir si los controles funcionan correctamente)
      alert(
        "Por favor, escribe una reseña y selecciona una calificación antes de enviarla."
      );
    }

// ============================== Opcional: Agregar la reseña a la lista de reseñas ==========================
    const reviewsList7 = document.querySelector(".reviews-list7");
    const newReview7 = document.createElement("p");
    newReview7.innerHTML = `
    <strong>Tu reseña:</strong>
    <br /><span style="margin-left: 30px"> ${reviewText7} </span> <br/> 
    <span style="margin-left: 30px"> Calificación:</span><span>★${reviewRating7}</span>
    `;

    reviewsList7.appendChild(newReview7);
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
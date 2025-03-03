// =============================================== RESERVAS ===============================================

// Esperamos que el DOM esté completamente cargado

// ============================= RESERVAS / VALIDACIONES =============================
document.addEventListener("DOMContentLoaded", () => {
  const checkinInput = document.getElementById("checkin-rv");
  const guestCountInput = document.getElementById("guest-count-rv");
  const searchBtn = document.getElementById("search-btn-rv");
  const resetBtn = document.getElementById("reset-btn-rv");

  const decrementBtn = document.querySelector(".decrement-rv");
  const incrementBtn = document.querySelector(".increment-rv");

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

// ============================= GUARDAR INFO DE RESERVAS =============================
document.addEventListener("DOMContentLoaded", () => {
  const priceElement = document.getElementById("price-rv");
  const pricePerNight = parseFloat(priceElement.textContent.trim()) || 0;
  const checkinInput = document.getElementById("checkin-rv");
  const guestCountInput = document.getElementById("guest-count-rv");
  const reserveButton = document.getElementById("search-btn-rv");

  function calculateReservation() {
    const checkinDate = new Date(checkinInput.value);
    const guestCount = parseInt(guestCountInput.value);

    if (guestCount > 0) {
      const totalCost = guestCount * pricePerNight;

      const reservationDetails = {
        pricePerNight,
        checkinDate: checkinDate.toISOString().split("T")[0],
        guestCount,
        totalCost,
      };

      localStorage.setItem(
        "reservationDetails",
        JSON.stringify(reservationDetails)
      );

      window.location.href = "pagosVuelos.html";
    } else {
      alert("Por favor, selecciona fechas y una cantidad de personas válidas.");
    }
  }

  reserveButton.addEventListener("click", calculateReservation);
});

// ============================= RESEÑAS =============================
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("leave-review-btn-rv")
    .addEventListener("click", function () {
      document.getElementById("review-form-rv").style.display = "block";
      this.style.display = "none";
    });

  document
    .getElementById("cancel-review-btn-rv")
    .addEventListener("click", function () {
      document.getElementById("review-form-rv").style.display = "none";
      document.getElementById("leave-review-btn-rv").style.display = "block";
    });
});

// ============================= VALIDACIÓN DEL BOTÓN ENVIAR RESEÑA =============================
document.addEventListener("DOMContentLoaded", () => {
  const reviewTextInput = document.getElementById("review-text-rv");
  const reviewRatingInput = document.getElementById("review-rating-rv");
  const submitReviewButton = document.getElementById("submit-review-btn-rv");

  function toggleSubmitReviewButton() {
    const reviewText = reviewTextInput.value.trim();
    const reviewRating = reviewRatingInput.value;

    if (reviewText !== "" && reviewRating !== "") {
      submitReviewButton.disabled = false;
    } else {
      submitReviewButton.disabled = true;
    }
  }

  reviewTextInput.addEventListener("input", toggleSubmitReviewButton);
  reviewRatingInput.addEventListener("change", toggleSubmitReviewButton);

  toggleSubmitReviewButton();

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

    const reviewsList = document.querySelector(".reviews-list-rv");
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
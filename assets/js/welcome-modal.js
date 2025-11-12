
document.addEventListener("DOMContentLoaded", function() {
    const welcomeModal = document.getElementById("welcomeModal");
    const modalCard = welcomeModal.querySelector(".modal-card");
    const closeModalButton = welcomeModal.querySelector(".modal-close");

    // Show the modal
    welcomeModal.classList.add("active");
    modalCard.classList.add("active");

    // Close the modal when the close button is clicked
    closeModalButton.addEventListener("click", function() {
        welcomeModal.classList.remove("active");
        modalCard.classList.remove("active");
    });

    // Also close the modal if the user clicks outside of it
    window.addEventListener("click", function(event) {
        if (event.target == welcomeModal) {
            welcomeModal.classList.remove("active");
            modalCard.classList.remove("active");
        }
    });
});

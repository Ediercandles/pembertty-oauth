document.addEventListener("DOMContentLoaded", function () {
    // 1. Fecha dinámica
    const lastUpdatedElements = document.querySelectorAll(".last-updated");
    if (lastUpdatedElements.length > 0) {
        const lastUpdatedDate = new Date().toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        lastUpdatedElements.forEach((element) => {
            element.textContent = `Última actualización: ${lastUpdatedDate}`;
        });
    }

    // 2. Lazy loading de imágenes
    const images = document.querySelectorAll("img[data-src]");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute("data-src");
                observer.unobserve(img);
            }
        });
    });
    images.forEach((img) => observer.observe(img));

    // 3. Botón "Volver al inicio"
    const backToTopButton = document.querySelector(".back-to-top");
    if (backToTopButton) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                backToTopButton.style.display = "block";
            } else {
                backToTopButton.style.display = "none";
            }
        });

        backToTopButton.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        });
    }

    // 4. Modales dinámicos
    const exampleModal = document.getElementById("exampleModal");
    if (exampleModal) {
        exampleModal.addEventListener("show.bs.modal", function (event) {
            console.log("El modal se ha abierto.");
        });
    }

    // 5. Validación de formularios
    const form = document.querySelector("#contactForm");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = form.querySelector("#name").value.trim();
            const email = form.querySelector("#email").value.trim();

            if (!name || !email) {
                alert("Por favor, completa todos los campos.");
                return;
            }

            console.log("Datos enviados:", { name, email });
            form.reset();
        });
    }

    // 6. Animaciones de scroll
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: "smooth",
                });
            }
        });
    });
});
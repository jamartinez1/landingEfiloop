// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// Fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, observerOptions);

// Add fade-in class to sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Form submission to webhook
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const message = this.message.value.trim();

    // Validate required fields
    if (!name || !email) {
        alert('Por favor, completa los campos Nombre y Email.');
        return;
    }

    const data = { name, email, message };

    // Use XMLHttpRequest to send GET request
    const params = new URLSearchParams(data);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://n8n.efiloop.site/webhook/contactanos?' + params.toString(), true);
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
            document.querySelector('form').reset();
        } else {
            alert('Error al enviar el mensaje. Inténtalo de nuevo.');
        }
    };
    xhr.onerror = function() {
        alert('Error al enviar el mensaje. Inténtalo de nuevo.');
    };
    xhr.send();
});
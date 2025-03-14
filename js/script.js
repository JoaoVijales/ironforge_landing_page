// Menu
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section');
    
    // Scroll suave
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if(targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Atualiza a URL sem recarregar a página
                history.pushState(null, '', targetId);
            }
        });
    });

    // Ativa link correspondente à seção visível
    function setActiveLink() {
        let index = sections.length;
        
        while(--index && window.scrollY + 50 < sections[index].offsetTop) {}
        
        navLinks.forEach(link => link.classList.remove('active'));
        navLinks[index]?.classList.add('active');
    }

    // Observador de scroll
    window.addEventListener('scroll', setActiveLink);
    
    // Ativa na carga inicial
    setActiveLink();

    // Corrige posicionamento do scroll para links âncoras
    window.addEventListener('load', () => {
        if(window.location.hash) {
            const target = document.querySelector(window.location.hash);
            if(target) {
                setTimeout(() => {
                    target.scrollIntoView();
                }, 100);
            }
        }
    });

    // Atualiza ao redimensionar
    let resizeTimer;
    window.addEventListener('resize', () => {
        document.body.classList.add('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('resize-animation-stopper');
            setActiveLink();
        }, 400);
    });
});

// Modal
const modal = document.getElementById('modal');

function openModal() {
    modal.style.display = 'flex';
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Form Submission
document.getElementById('leadForm').addEventListener('submit', function (e) {
    e.preventDefault();
    // Adicionar integração com API de envio
    alert('Cadastro realizado! Entraremos em contato.');
    modal.style.display = 'none';
});
ript >
    // Funções para abrir/fechar o formulário
    function openForm() {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Bloqueia scroll

    }

// WhatsApp
function openWhatsApp() {
    window.open('https://wa.me/5511999999999?text=Quero%20saber%20sobre%20os%20planos');
}

// Scroll Animation
window.addEventListener('scroll', function () {
    const elements = document.querySelectorAll('.benefit-card, .plano-card');
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Adicione no script.js
const gymLocations = [
    {
        name: "Moema",
        address: "Av. das Nações Unidas, 1500",
        image: "images/unidade-moema.jpg",
        facilities: ["24h", "Estacionamento", "Piscina"]
    },
    // Adicione mais unidade
];

function loadGymLocations() {
    const grid = document.querySelector('.gym-grid');
    gymLocations.forEach(gym => {
        const card = document.createElement('div');
        card.className = 'gym-card';
        card.innerHTML = `
            <img src="${gym.image}" alt="${gym.name}">
            <div class="gym-info">
                <h3>${gym.name}</h3>
                <p>${gym.address}</p>
                <p>${gym.facilities.join(' • ')}</p>
                <button onclick="openWhatsApp()">Agendar Visita</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Inicialize no carregamento
window.addEventListener('DOMContentLoaded', () => {
    loadGymLocations();
});
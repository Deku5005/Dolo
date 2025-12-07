// Canvas pour particules animées
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// Ajuster la taille du canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Classe pour les particules
class Particle {
    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.size = Math.random() * 4 + 1;
        this.speed = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.hue = Math.random() * 60 + 180; // Tons bleus/cyans
    }

    update() {
        this.y += this.speed;
        this.x += Math.sin(this.y * 0.01) * 0.5;
        
        if (this.y > canvas.height) {
            this.reset();
        }
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = `hsl(${this.hue}, 100%, 70%)`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsl(${this.hue}, 100%, 70%)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Créer des particules
const particles = [];
const particleCount = 100;

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    requestAnimationFrame(animate);
}

animate();

// Animations supplémentaires pour les éléments interactifs
document.addEventListener('DOMContentLoaded', () => {
    const profileImg = document.getElementById('profileImg');
    const cvButton = document.getElementById('cvButton');
    const icons = document.querySelectorAll('.icon-circle');
    const container = document.getElementById('con');

    // Effet de parallaxe au scroll
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        if (profileImg) {
            profileImg.style.transform = `translate(${(mouseX - 0.5) * 10}px, ${(mouseY - 0.5) * 10}px)`;
        }
        
        // Déplacer les formes flottantes
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            shape.style.transform = `translate(${(mouseX - 0.5) * speed * 20}px, ${(mouseY - 0.5) * speed * 20}px)`;
        });
    });

    // Animation au survol de l'image
    if (profileImg) {
        profileImg.addEventListener('mouseenter', () => {
            profileImg.style.transition = 'transform 0.3s ease';
            profileImg.style.transform = 'scale(1.1)';
        });
        
        profileImg.addEventListener('mouseleave', () => {
            profileImg.style.transform = 'scale(1)';
        });
    }

    // Effet ripple sur le bouton
    cvButton.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });

    // Animation des icônes au clic
    icons.forEach(icon => {
        icon.addEventListener('click', function() {
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            }, 100);
        });
    });

    // Effet de glitch au survol du titre (amélioré pour éviter la disparition)
    const titre = document.getElementById('titre');
    if (titre) {
        // S'assurer que le titre reste visible
        titre.style.opacity = '1';
        titre.style.visibility = 'visible';
        
        titre.addEventListener('mouseenter', function() {
            // Utiliser text-shadow pour l'effet glitch sans affecter transform
            this.classList.add('glitch-active');
        });
        
        titre.addEventListener('mouseleave', function() {
            this.classList.remove('glitch-active');
        });
    }

    // Animation d'entrée séquentielle (en excluant le titre pour éviter les conflits)
    const elements = document.querySelectorAll('.content-wrapper > *:not(#titre)');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animation = `fadeInUp 0.8s ease-out ${index * 0.2}s forwards`;
    });
    
    // Animation du titre séparément pour s'assurer qu'il reste visible
    if (titre) {
        titre.style.opacity = '1';
        titre.style.animation = 'titleFloat 3s ease-in-out infinite, fadeInUp 0.8s ease-out forwards';
    }
});

// Ajouter l'animation ripple au CSS via style
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes glitch {
        0%, 100% {
            text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
        }
        20% {
            text-shadow: -2px 2px 20px rgba(0, 212, 255, 0.8), 2px -2px 20px rgba(255, 0, 255, 0.5);
        }
        40% {
            text-shadow: -2px -2px 20px rgba(0, 212, 255, 0.8), 2px 2px 20px rgba(255, 0, 255, 0.5);
        }
        60% {
            text-shadow: 2px 2px 20px rgba(0, 212, 255, 0.8), -2px -2px 20px rgba(255, 0, 255, 0.5);
        }
        80% {
            text-shadow: 2px -2px 20px rgba(0, 212, 255, 0.8), -2px 2px 20px rgba(255, 0, 255, 0.5);
        }
    }
    
    .glitch-active {
        animation: glitch 0.3s infinite !important;
    }
`;
document.head.appendChild(style);


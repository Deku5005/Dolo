// Variables globales pour les animations
let animationFrameId;
let particles = [];
let mouseX = 0;
let mouseY = 0;

 // Fonction pour générer une couleur aléatoire
 function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
    return color;
}

// Gestionnaire de changement de thème pour le bouton "change"
function initColorThemeSelector() {
    const changeBtn = document.getElementById('change');
    const themeMenu = document.getElementById('colorThemeMenu');
    const themeOptions = document.querySelectorAll('.theme-option');
    
    if (changeBtn && themeMenu) {
        changeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            themeMenu.classList.toggle('active');
        });
        
        // Fermer au clic extérieur
        document.addEventListener('click', (e) => {
            if (!themeMenu.contains(e.target) && !changeBtn.contains(e.target)) {
                themeMenu.classList.remove('active');
            }
        });
        
        themeOptions.forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.dataset.theme;
                document.documentElement.setAttribute('data-theme', theme);
                
                // Sauvegarder la préférence
                localStorage.setItem('cv-theme', theme);
                
                // Feedback visuel
                option.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    option.style.transform = 'scale(1)';
                    themeMenu.classList.remove('active');
                }, 300);
            });
        });
    }
}

// Fonction pour charger le thème sauvegardé (utilisé par les deux sélecteurs)
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('cv-theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
}

// Palette de couleurs personnalisable (bouton en bas à droite)
function initColorPicker() {
    const toggle = document.getElementById('colorPickerToggle');
    const menu = document.getElementById('colorPickerMenu');
    const colorOptions = document.querySelectorAll('.color-option');
    
    if (toggle && menu) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('active');
        });
        
        // Fermer au clic extérieur
        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && !toggle.contains(e.target)) {
                menu.classList.remove('active');
            }
        });
        
        colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.dataset.color;
                document.documentElement.setAttribute('data-theme', theme);
                
                // Sauvegarder la préférence
                localStorage.setItem('cv-theme', theme);
                
                // Feedback visuel
                option.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    option.style.transform = 'scale(1)';
                    menu.classList.remove('active');
                }, 300);
            });
        });
    }
}

// Amélioration des animations de barres de progression
function animateProgressBarsImproved() {
    const progressBars = document.querySelectorAll('.skill-progress');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.dataset.width || '0';
                
                setTimeout(() => {
                    bar.style.width = width + '%';
                    bar.style.opacity = '1';
                }, index * 100);
                
                observer.unobserve(bar);
            }
        });
    }, observerOptions);
    
    progressBars.forEach(bar => {
        bar.style.width = '0%';
        bar.style.opacity = '0';
        observer.observe(bar);
    });
}

// Optimisation des animations - Respect prefers-reduced-motion
function shouldReduceMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Micro-interactions subtiles
function initMicroInteractions() {
    // Ripple effect sur les boutons
    document.querySelectorAll('button, .contact-item, .experience-item').forEach(element => {
        element.addEventListener('click', function(e) {
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
                background: rgba(0, 212, 255, 0.3);
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                z-index: 999;
            `;
            
            if (this.style.position !== 'absolute' && this.style.position !== 'relative') {
                this.style.position = 'relative';
            }
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Ajouter l'animation ripple au CSS
    if (!document.getElementById('ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Fonction de téléchargement PDF simplifiée et fiable
document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('downloadBtn');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const downloadLoader = downloadBtn?.querySelector('.download-loader');
    const downloadIcon = downloadBtn?.querySelector('.download-icon');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', async () => {
   const element = document.getElementById("princip");
   const btn = document.getElementById("annuler");
   const btn1 = document.getElementById("change");
   const btn2 = document.getElementById("downloadBtn");

            if (!element) return;

            // Afficher le loading overlay
            if (loadingOverlay) {
                loadingOverlay.style.display = "flex";
            }

            // Animation du bouton
            if (downloadIcon) downloadIcon.style.opacity = "0";
            if (downloadLoader) downloadLoader.style.display = "block";
            btn2.disabled = true;

            if (btn) btn.style.visibility = "hidden";
            if (btn1) btn1.style.visibility = "hidden";

            try {
                // Fonction pour convertir une image en base64
                function convertImageToBase64(img) {
                    return new Promise((resolve) => {
                        // Si l'image est déjà en base64
                        if (img.src.startsWith('data:image/')) {
                            resolve(img.src);
                            return;
                        }

                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        const image = new Image();
                        
                        // Pour les images locales, ne pas utiliser crossOrigin
                        if (!img.src.startsWith('http') && !img.src.startsWith('//')) {
                            image.crossOrigin = undefined;
                        } else {
                            image.crossOrigin = 'anonymous';
                        }
                        
                        image.onload = function() {
                            try {
                                canvas.width = this.naturalWidth || this.width || 100;
                                canvas.height = this.naturalHeight || this.height || 100;
                                ctx.drawImage(this, 0, 0);
                                const dataUrl = canvas.toDataURL('image/png');
                                resolve(dataUrl);
                            } catch (err) {
                                console.warn('Erreur lors du dessin de l\'image:', err);
                                // Image de remplacement
                                canvas.width = 100;
                                canvas.height = 100;
                                ctx.fillStyle = '#ffffff';
                                ctx.fillRect(0, 0, 100, 100);
                                resolve(canvas.toDataURL('image/png'));
                            }
                        };
                        
                        image.onerror = () => {
                            console.warn('Erreur lors du chargement de l\'image:', img.src);
                            // Image de remplacement
                            canvas.width = 100;
                            canvas.height = 100;
                            ctx.fillStyle = '#ffffff';
                            ctx.fillRect(0, 0, 100, 100);
                            resolve(canvas.toDataURL('image/png'));
                        };
                        
                        // Charger l'image
                        image.src = img.src;
                    });
                }

                // Convertir toutes les images en base64 avant la capture
                const images = element.querySelectorAll('img');
                const imageData = [];
                
                console.log(`Conversion de ${images.length} images en base64...`);
                
                for (const img of images) {
                    try {
                        // Attendre que l'image soit complètement chargée
                        if (!img.complete) {
                            await new Promise((resolve) => {
                                img.onload = resolve;
                                img.onerror = resolve;
                                setTimeout(resolve, 1000); // Timeout après 1 seconde
                            });
                        }
                        
                        const base64 = await convertImageToBase64(img);
                        const originalSrc = img.src;
                        img.src = base64;
                        imageData.push({ img, originalSrc, base64 });
                        
                        // Attendre un peu pour que la nouvelle image se charge
                        await new Promise(resolve => setTimeout(resolve, 100));
                    } catch (e) {
                        console.warn('Erreur lors de la conversion de l\'image:', img.src, e);
                        // En cas d'erreur, garder l'image originale
                        imageData.push({ img, originalSrc: img.src, base64: null });
                    }
                }
                
                console.log(`${imageData.filter(d => d.base64).length} images converties avec succès`);
                
                // Attendre un peu plus pour que toutes les images base64 soient chargées
                await new Promise(resolve => setTimeout(resolve, 300));
                
                // Sauvegarder les styles originaux
                const originalOverflow = element.style.overflow;
                const originalHeight = element.style.height;
                const originalMaxHeight = element.style.maxHeight;
                
                // Cacher temporairement les boutons
                if (btn) btn.style.display = 'none';
                if (btn1) btn1.style.display = 'none';
                
                // Permettre l'affichage complet du contenu
                element.style.overflow = 'visible';
                element.style.height = 'auto';
                element.style.maxHeight = 'none';
                
                // Calculer la hauteur maximale des deux colonnes avant la capture
                const leftCol = element.querySelector('#left');
                const rightCol = element.querySelector('#right');
                let calculatedMaxHeight = 0;
                
                if (leftCol && rightCol) {
                    // Permettre aux colonnes de s'ajuster à leur contenu
                    leftCol.style.height = 'auto';
                    leftCol.style.maxHeight = 'none';
                    leftCol.style.overflow = 'visible';
                    rightCol.style.height = 'auto';
                    rightCol.style.maxHeight = 'none';
                    rightCol.style.overflow = 'visible';
                    
                    // Attendre que le DOM se mette à jour
                    await new Promise(resolve => setTimeout(resolve, 200));
                    
                    // Calculer les hauteurs réelles
                    const leftHeight = Math.max(leftCol.scrollHeight, leftCol.offsetHeight);
                    const rightHeight = Math.max(rightCol.scrollHeight, rightCol.offsetHeight);
                    calculatedMaxHeight = Math.max(leftHeight, rightHeight, 800); // Minimum 800px
                    
                    // Appliquer la même hauteur aux deux colonnes
                    leftCol.style.height = calculatedMaxHeight + 'px';
                    rightCol.style.height = calculatedMaxHeight + 'px';
                    
                    // Stocker la hauteur dans l'élément pour qu'elle soit accessible dans le clone
                    element.setAttribute('data-max-height', calculatedMaxHeight);
                    
                    // Attendre un peu pour que les styles soient appliqués
                    await new Promise(resolve => setTimeout(resolve, 200));
                }
                
                // Générer le canvas - configuration pour éviter les problèmes CORS
  const canvas = await html2canvas(element, {
                    useCORS: false,
                    allowTaint: true,
                    scale: 3,
                    backgroundColor: '#ffffff',
                    logging: false,
                    onclone: (clonedDoc) => {
                        // Récupérer la hauteur calculée depuis l'attribut data
                        const clonedPrincipElement = clonedDoc.getElementById('princip');
                        const storedMaxHeight = clonedPrincipElement ? parseInt(clonedPrincipElement.getAttribute('data-max-height') || '0') : 0;
                        
                        // Cacher les boutons et UI dans le clone
                        const clonedBtns = clonedDoc.querySelectorAll('button, .button-group, .color-picker-container, .color-theme-container, .loading-overlay, .floating-particle');
                        clonedBtns.forEach(b => {
                            b.style.display = 'none';
                        });
                        
                        // Remplacer toutes les images du clone par leurs versions base64
                        const clonedImages = clonedDoc.querySelectorAll('img');
                        clonedImages.forEach((clonedImg, index) => {
                            if (index < imageData.length) {
                                const imgData = imageData[index];
                                // Utiliser la version base64 si disponible
                                if (imgData.base64 && imgData.base64.startsWith('data:image/')) {
                                    clonedImg.src = imgData.base64;
                                } else if (imgData.img.src.startsWith('data:image/')) {
                                    clonedImg.src = imgData.img.src;
                                }
                                clonedImg.crossOrigin = null;
                                clonedImg.removeAttribute('crossorigin');
                                clonedImg.removeAttribute('crossOrigin');
                            }
                        });
                        
                        // S'assurer que l'élément principal est visible et affiche tout
                        const clonedPrincip = clonedDoc.getElementById('princip');
                        if (clonedPrincip) {
                            clonedPrincip.style.display = 'grid';
                            clonedPrincip.style.visibility = 'visible';
                            clonedPrincip.style.opacity = '1';
                            clonedPrincip.style.overflow = 'visible';
                            clonedPrincip.style.height = 'auto';
                            clonedPrincip.style.maxHeight = 'none';
                            clonedPrincip.style.animation = 'none';
                            clonedPrincip.style.transform = 'none';
                        }
                        
                        // S'assurer que les colonnes ont la même hauteur
                        const clonedLeft = clonedDoc.getElementById('left');
                        const clonedRight = clonedDoc.getElementById('right');
                        
                        if (clonedLeft && clonedRight) {
                            clonedLeft.style.overflow = 'visible';
                            clonedLeft.style.maxHeight = 'none';
                            clonedLeft.style.animation = 'none';
                            clonedLeft.style.transform = 'none';
                            
                            clonedRight.style.overflow = 'visible';
                            clonedRight.style.maxHeight = 'none';
                            clonedRight.style.animation = 'none';
                            clonedRight.style.transform = 'none';
                            
                            // Forcer la même hauteur calculée
                            if (storedMaxHeight > 0) {
                                clonedLeft.style.height = storedMaxHeight + 'px';
                                clonedRight.style.height = storedMaxHeight + 'px';
                            }
                        }
                        
                        // Désactiver toutes les animations et effets visuels pour le PDF
                        const style = clonedDoc.createElement('style');
                        const heightStyle = storedMaxHeight > 0 ? `
                            #left, #right {
                                height: ${storedMaxHeight}px !important;
                                min-height: ${storedMaxHeight}px !important;
                            }
                            ` : '';
                        style.textContent = `
                            * {
                                -webkit-print-color-adjust: exact !important;
                                color-adjust: exact !important;
                                print-color-adjust: exact !important;
                                animation: none !important;
                                transition: none !important;
                            }
                            ${heightStyle}
                            /* Désactiver les pseudo-éléments qui créent des effets visuels */
                            #left::before,
                            #left::after,
                            #haut::after,
                            #princip::before,
                            .section::before,
                            .section::after,
                            #contact::before {
                                display: none !important;
                                content: none !important;
                                opacity: 0 !important;
                                visibility: hidden !important;
                            }
                            /* Désactiver les effets de glassmorphism */
                            #princip,
                            .experience-item,
                            .language-item,
                            .hobby-item {
                                backdrop-filter: none !important;
                                -webkit-backdrop-filter: none !important;
                            }
                            /* Forcer des backgrounds solides et opaques */
                            .experience-item {
                                background: white !important;
                                opacity: 1 !important;
                            }
                            .language-item, .hobby-item {
                                background: white !important;
                                opacity: 1 !important;
                            }
                            /* S'assurer que tous les éléments sont visibles */
                            .section, .experience-item, .skill-item, .language-item, .hobby-item {
                                opacity: 1 !important;
                                visibility: visible !important;
                            }
                            /* Augmenter l'opacité de tous les textes */
                            #left p, #left span, #left h1, #left h2, #left strong, #left a {
                                opacity: 1 !important;
                                color: rgba(255, 255, 255, 1) !important;
                            }
                            #left img {
                                opacity: 1 !important;
                            }
                            /* Augmenter la visibilité des bordures */
                            .reference-item {
                                border-bottom-color: rgba(255, 255, 255, 0.5) !important;
                            }
                            /* Assurer une bonne visibilité des textes sur fond sombre */
                            #contact, #edu, #ref, #eco, #lic, #mai, #maiga {
                                color: rgba(255, 255, 255, 1) !important;
                                opacity: 1 !important;
                            }
                            #sous, #appell, #navigateurr, #localisateurr, #num, #phrase, .phrase, #tel, #ema, .tel, .ema {
                                color: rgba(255, 255, 255, 1) !important;
                                opacity: 1 !important;
                            }
                            /* Améliorer le contraste des sections */
                            .section-header {
                                border-bottom-color: #00D4FF !important;
                                opacity: 1 !important;
                            }
                            #right p, #right h1, #right h2, #right span, #right strong {
                                opacity: 1 !important;
                                color: #1A1A2E !important;
                            }
                            /* Forcer l'affichage des backgrounds solides */
                            #left {
                                background: linear-gradient(180deg, #0066AA 0%, #0099CC 50%, #00D4FF 100%) !important;
                            }
                            #haut {
                                background: linear-gradient(135deg, #0066AA 0%, #0099CC 100%) !important;
                            }
                            #bas {
                                background: linear-gradient(180deg, #0099CC 0%, #0066AA 100%) !important;
                            }
                            /* S'assurer que tous les éléments sont visibles */
                            .section, .experience-item, .skill-item, .language-item, .hobby-item {
                                opacity: 1 !important;
                                visibility: visible !important;
                            }
                        `;
                        clonedDoc.head.appendChild(style);
                    }
                });
                
                // Restaurer les styles originaux
                element.style.overflow = originalOverflow || '';
                element.style.height = originalHeight || '';
                element.style.maxHeight = originalMaxHeight || '';
                
                // Restaurer les images originales
                imageData.forEach(({ img, originalSrc }) => {
                    img.src = originalSrc;
                });
                
                // Vérifier que le canvas est valide
                if (!canvas) {
                    throw new Error('Canvas non généré');
                }
                
                console.log('Canvas généré:', canvas.width, 'x', canvas.height);

                // Obtenir l'image du canvas (maintenant sans problème CORS)
                const imgData = canvas.toDataURL('image/png', 1.0);
                
                // Vérifier que l'image est valide
                if (!imgData || imgData.length < 100) {
                    throw new Error('Image data invalide');
                }
                
                console.log('Image data générée:', imgData.substring(0, 50) + '...');

  // Créer le PDF au format A4 portrait
  const { jsPDF } = window.jspdf;
                const pdf = new jsPDF("p", "mm", "a4"); // Format portrait A4

                const pageWidth = pdf.internal.pageSize.getWidth(); // 210mm
                const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm

  const imgProps = pdf.getImageProperties(imgData);
                console.log('Propriétés image:', imgProps);
                
                const imgAspectRatio = imgProps.height / imgProps.width;
                const pageAspectRatio = pageHeight / pageWidth;
                
                let pdfWidth, pdfHeight;
                
                if (imgAspectRatio > pageAspectRatio) {
                    // L'image est plus haute, ajuster à la hauteur de la page
                    pdfHeight = pageHeight;
                    pdfWidth = pdfHeight / imgAspectRatio;
                } else {
                    // L'image est plus large, ajuster à la largeur de la page
                    pdfWidth = pageWidth;
                    pdfHeight = pdfWidth * imgAspectRatio;
                }

                // Centrer l'image
                const xOffset = (pageWidth - pdfWidth) / 2;
                const yOffset = (pageHeight - pdfHeight) / 2;

                console.log('Ajout image au PDF:', { xOffset, yOffset, pdfWidth, pdfHeight });
                
                pdf.addImage(imgData, "PNG", xOffset, yOffset, pdfWidth, pdfHeight);
  pdf.save("cv_dolo_oumar.pdf");

                console.log('PDF sauvegardé avec succès');

                // Succès
                if (loadingOverlay) {
                    const successMsg = loadingOverlay.querySelector('p');
                    if (successMsg) successMsg.textContent = '✅ PDF généré avec succès !';
                    setTimeout(() => {
                        loadingOverlay.style.display = "none";
                        if (successMsg) successMsg.textContent = 'Génération du PDF en cours...';
                    }, 1500);
                }
            } catch (error) {
                console.error('Erreur lors de la génération du PDF:', error);
                if (loadingOverlay) {
                    const errorMsg = loadingOverlay.querySelector('p');
                    if (errorMsg) errorMsg.textContent = '❌ Erreur lors de la génération';
                    setTimeout(() => {
                        loadingOverlay.style.display = "none";
                        if (errorMsg) errorMsg.textContent = 'Génération du PDF en cours...';
                    }, 2000);
                }
            } finally {
                // Réinitialiser le bouton
                if (downloadIcon) downloadIcon.style.opacity = "1";
                if (downloadLoader) downloadLoader.style.display = "none";
                if (btn) btn.style.display = "";
                if (btn1) btn1.style.display = "";
                btn2.disabled = false;
            }
        });
    }
});

// Animations au scroll
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section, .experience-item, .skill-item').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Effet de parallaxe pour le fond
function initParallaxEffect() {
    const left = document.getElementById('left');
    const right = document.getElementById('right');
    
    if (left && right) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX / window.innerWidth;
            mouseY = e.clientY / window.innerHeight;
            
            const offsetX = (mouseX - 0.5) * 20;
            const offsetY = (mouseY - 0.5) * 20;
            
            left.style.transform = `translate(${offsetX * 0.3}px, ${offsetY * 0.3}px)`;
            right.style.transform = `translate(${offsetX * 0.2}px, ${offsetY * 0.2}px)`;
        });
    }
}

// Animation des barres de progression
function animateProgressBars() {
    const progressBars = document.querySelectorAll('#prog1, #prog2, #prog3');
    
    progressBars.forEach((bar, index) => {
        const width = bar.style.width || window.getComputedStyle(bar).width;
        bar.style.width = '0%';
        bar.style.transition = 'width 1.5s ease-out';
        
        setTimeout(() => {
            if (bar.id === 'prog1') {
                bar.style.width = '85%';
            } else if (bar.id === 'prog2') {
                bar.style.width = '75%';
            } else if (bar.id === 'prog3') {
                bar.style.width = '60%';
            }
        }, index * 200 + 500);
    });
}

// Effet de survol sur les cartes d'expérience
function initExperienceHover() {
    const experienceItems = document.querySelectorAll('.experience-item');
    
    experienceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
            this.style.boxShadow = '0 8px 25px rgba(0, 212, 255, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.boxShadow = '0 4px 20px rgba(0, 150, 204, 0.15)';
        });
    });
}

// Animation des icônes de compétences
function animateSkillIcons() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease-out';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 100 + 300);
    });
}

// Effet de particules flottantes pour le fond
function createFloatingParticles() {
    const left = document.getElementById('left');
    if (!left) return;
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 10}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
            pointer-events: none;
            z-index: 1;
        `;
        left.appendChild(particle);
    }
    
    // Ajouter l'animation CSS
    if (!document.getElementById('particle-animation-style')) {
        const style = document.createElement('style');
        style.id = 'particle-animation-style';
        style.textContent = `
            @keyframes floatParticle {
                0%, 100% {
                    transform: translate(0, 0);
                }
                25% {
                    transform: translate(20px, -20px);
                }
                50% {
                    transform: translate(-10px, 10px);
                }
                75% {
                    transform: translate(15px, 15px);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Animation du cercle de profil
function animateProfileCircle() {
    const cercle = document.getElementById('cercle');
    if (cercle) {
        cercle.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.transition = 'transform 0.3s ease';
            this.style.boxShadow = '0 15px 50px rgba(0, 212, 255, 0.5)';
        });
        
        cercle.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.3)';
        });
    }
}

// Effet de brillance sur les titres
function animateSectionHeaders() {
    const headers = document.querySelectorAll('.section-header h1');
    
    headers.forEach(header => {
        header.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 20px rgba(0, 212, 255, 0.8), 0 0 40px rgba(0, 212, 255, 0.4)';
            this.style.transition = 'text-shadow 0.3s ease';
        });
        
        header.addEventListener('mouseleave', function() {
            this.style.textShadow = 'none';
        });
    });
}

// Initialiser toutes les animations
document.addEventListener('DOMContentLoaded', () => {
    // Vérifier si on doit réduire les animations
    if (!shouldReduceMotion()) {
        initScrollAnimations();
        initParallaxEffect();
        animateProgressBars();
        animateSkillIcons();
        createFloatingParticles();
        animateProfileCircle();
        animateSectionHeaders();
    }
    
    initExperienceHover();
    animateProgressBarsImproved();
    initColorPicker();
    initColorThemeSelector();
    loadSavedTheme();
    initMicroInteractions();
    
    // Animation d'entrée générale
    const principal = document.getElementById('princip');
    if (principal) {
        principal.style.opacity = '0';
        const duration = shouldReduceMotion() ? '0.2s' : '0.8s';
        principal.style.transition = `all ${duration} ease-out`;
        
        setTimeout(() => {
            principal.style.opacity = '1';
            if (!shouldReduceMotion()) {
                principal.style.transform = 'scale(1)';
            }
        }, 100);
    }
});

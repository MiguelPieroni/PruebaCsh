document.addEventListener('DOMContentLoaded', function() {
    // Slider Principal
    const mainSlider = {
        track: document.querySelector('.main-slider .slider-track'),
        slides: document.querySelectorAll('.main-slider .slide'),
        currentIndex: 0,
        isAnimating: false,
        autoPlayInterval: null,
        
        init() {
            if (!this.track || !this.slides.length) return;
            
            // Configuración inicial
            this.track.style.display = 'flex';
            this.track.style.width = `${this.slides.length * 100}%`;
            this.slides.forEach(slide => {
                slide.style.width = `${100 / this.slides.length}%`;
            });
            
            // Clonar el primer slide al final para transición suave
            const firstClone = this.slides[0].cloneNode(true);
            this.track.appendChild(firstClone);
            
            // Iniciar autoplay
            this.startAutoPlay();
            
            // Event listeners para hover
            this.track.addEventListener('mouseenter', () => this.stopAutoPlay());
            this.track.addEventListener('mouseleave', () => this.startAutoPlay());
            
            // Event listener para transición
            this.track.addEventListener('transitionend', () => {
                if (this.currentIndex === this.slides.length) {
                    this.track.style.transition = 'none';
                    this.currentIndex = 0;
                    this.updateSlide();
                    setTimeout(() => {
                        this.track.style.transition = 'transform 0.5s ease-in-out';
                    }, 50);
                }
                this.isAnimating = false;
            });
        },
        
        startAutoPlay() {
            this.stopAutoPlay();
            this.autoPlayInterval = setInterval(() => this.next(), 5000);
        },
        
        stopAutoPlay() {
            if (this.autoPlayInterval) {
                clearInterval(this.autoPlayInterval);
                this.autoPlayInterval = null;
            }
        },
        
        next() {
            if (this.isAnimating) return;
            this.isAnimating = true;
            this.currentIndex++;
            this.updateSlide();
        },
        
        updateSlide() {
            const offset = -this.currentIndex * (100 / (this.slides.length + 1));
            this.track.style.transform = `translateX(${offset}%)`;
        }
    };

    // Promociones Bancarias
    const bankPromos = {
        track: document.querySelector('.bank-promos .promos-track'),
        isAnimating: false,
        
        init() {
            if (!this.track) return;
            
            // Clonar elementos para scroll infinito
            const items = Array.from(this.track.children);
            items.forEach(item => {
                const clone = item.cloneNode(true);
                this.track.appendChild(clone);
            });
            
            // Configurar animación
            this.track.style.animation = 'scroll 30s linear infinite';
            
            // Pausar en hover
            this.track.addEventListener('mouseenter', () => {
                if (!this.isAnimating) {
                    this.track.style.animationPlayState = 'paused';
                }
            });
            
            this.track.addEventListener('mouseleave', () => {
                if (!this.isAnimating) {
                    this.track.style.animationPlayState = 'running';
                }
            });
            
            // Reset animación cuando termine
            this.track.addEventListener('animationend', () => {
                this.track.style.animation = 'none';
                this.track.offsetHeight; // Trigger reflow
                this.track.style.animation = 'scroll 30s linear infinite';
            });
        }
    };

    // Barra de búsqueda mejorada
    const searchHandler = {
        input: document.querySelector('.search-input'),
        button: document.querySelector('.search-button'),
        container: document.querySelector('.search-container'),
        
        init() {
            if (!this.input || !this.button) return;
            
            // Event listeners
            this.input.addEventListener('focus', () => this.handleFocus());
            this.input.addEventListener('blur', () => this.handleBlur());
            this.input.addEventListener('keypress', (e) => this.handleKeyPress(e));
            this.button.addEventListener('click', () => this.handleSearch());
        },
        
        handleFocus() {
            this.container.classList.add('is-focused');
        },
        
        handleBlur() {
            this.container.classList.remove('is-focused');
        },
        
        handleKeyPress(e) {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        },
        
        handleSearch() {
            const query = this.input.value.trim();
            if (query) {
                // Aquí iría la lógica de búsqueda
                console.log('Realizando búsqueda:', query);
            }
        }
    };

    // Menu navegación mejorado
    const navigationMenu = {
        items: document.querySelectorAll('.menu-item'),
        
        init() {
            this.items.forEach(item => {
                item.addEventListener('mouseenter', () => this.handleHover(item));
                item.addEventListener('mouseleave', () => this.handleLeave(item));
            });
        },
        
        handleHover(item) {
            item.classList.add('is-hovered');
        },
        
        handleLeave(item) {
            item.classList.remove('is-hovered');
        }
    };

    // Botones flotantes
    const floatingElements = {
        offers: document.querySelector('.floating-offers'),
        whatsapp: document.querySelector('.whatsapp-button'),
        
        init() {
            if (this.offers) {
                this.offers.addEventListener('mouseenter', () => {
                    this.offers.style.transform = 'scale(1.1)';
                });
                this.offers.addEventListener('mouseleave', () => {
                    this.offers.style.transform = 'scale(1)';
                });
            }
            
            if (this.whatsapp) {
                this.whatsapp.addEventListener('mouseenter', () => {
                    this.whatsapp.style.transform = 'scale(1.1)';
                });
                this.whatsapp.addEventListener('mouseleave', () => {
                    this.whatsapp.style.transform = 'scale(1)';
                });
            }
        }
    };

    // Inicializar todos los componentes
    mainSlider.init();
    bankPromos.init();
    searchHandler.init();
    navigationMenu.init();
    floatingElements.init();
});
/************************************/
/*     MÓDULO DE CONFIGURACIÓN JS   */
/************************************/
const CONFIG = {
    startDate: '2025-09-06T19:30:00-05:00',

    // MENSAJE CAMBIADO Y GENERALIZADO
    loveText: `Hola, mi amor… ✨

Quería decirte, desde lo más profundo de mi corazón, que te amo. ❤️  
Que lo mejor que me dejó el 2025 fue encontrarte, y lo más bonito del 2026 es empezarlo y vivirlo a tu lado, construyendo esta nueva vida juntos.

Cada día te amo más, de una forma que no sabía que era posible. Llegaste cuando todo era ruido y caos, y sin darte cuenta fuiste paz, fuiste refugio, fuiste salvación. 🌿  
Me enseñaste a amar de una manera única, sincera, sin miedos, sin máscaras… con el alma.

Gracias por ser luz en mis días oscuros, calma en mis tormentas y hogar en cada abrazo. Gracias por quedarte, por creer, por amar.  
Caminar contigo es el regalo más grande que la vida me ha dado.

Te amo hoy, te amo mañana y te amo en cada paso que demos juntos. 💖✨

🌹FELICES 4 MESES MI AMOR😍`,
    // FRASES CAMBIADAS Y GENERALIZADAS
    clickingPhrases: [
        "Mi chiquita hermosa 💕",
        "Princesa preciosa 👑💖",
        "Mi gordita linda 😍",
        "Eres la más hermosa del mundo 🌸✨",
        "Mi amor eterno 💞",
        "Amor infinito ♾️❤️",
        "Mi princesa preciosa 👑🌹",
        "Chiquita consentida 🧸💖",
        "Mi vida bonita 🌷❤️",
        "Eres un sueño hecho realidad 🌙✨",
        "Mi corazón es tuyo ❤️‍🔥",
        "Belleza que enamora 🌹💖",
        "Mi niña hermosa 💕",
        "Reina bella 👑✨",
        "Mi amorcito lindo 💗",
        "Pedacito de cielo ☁️💞",
        "Mi princesa soñada ✨👑",
        "Eres todo lo que siempre quise 💘",
        "Mi tesoro más valioso 💎❤️",
        "Gordita preciosa 😘💗",
        "Mi razón de sonreír 😊💖",
        "La luz que ilumina mis días 🌟❤️",
        "Mi chiquita del alma 🫶💞",
        "Mi amor verdadero 💍❤️",
        "Mi bebé preciosa 🥰",
        "Niña bonita de mis ojos🌸💗",
        "Mi felicidad 🌈❤️",
        "La princesa de mi cuentos ✨👑",
        "Mi amor infinito y sincero 🔒💖",
        "Sonrisa que enamora 😊💓",
        "Mi reina hermosa 👑🌹",
        "Eres lo mejor que me pasó 💝",
        "Mi vida entera 💘",
        "Amor bonito 🌺💞",
        "Mi chiquita linda 🧸❤️",
        "Con tu belleza única ✨💖",
        "El amor de mi vida 💕",
        "Eres mi lugar seguro 🏡❤️",
        "Mi princesa bella 💫👑",
        "Todo en ti es perfecto 💖✨"
    ],

    heartColors: ['#ff6b6b', '#ffa07a', '#ffc3a0', '#f0932b', '#e84393', '#d14a7e', '#ff7979', '#ff4757', '#e056fd'],
    canopyHeartCount: { desktop: 700, mobile: 400 },
    fallingCanopyHeartFrequency: 400,
    clickBurstCount: 7,
    animation: { initialTreeAppear: 2.5, initialHeartsAppear: 1.5, canopyFallDuration: 5, clickFallDuration: 6, },
    clickBurst: { distance: { min: 60, max: 90 }, wind: { min: 250, max: 450 }, },
    petal: { colors: ['#ffc2d1', '#ffb3c6', '#ff8fab'], frequency: 1000, duration: { min: 8, max: 12 }, },
    initialDelay: 800,
    typingSpeed: 45,

    loading: {
        minDisplayTime: 3000,
        progressSteps: [
            { step: 0, message: "Inicializando..." },
            { step: 10, message: "Cargando corazones..." },
            { step: 30, message: "Preparando árbol especial..." },
            { step: 50, message: "Configurando música..." },
            { step: 70, message: "Cargando recuerdos..." },
            { step: 90, message: "Finalizando..." },
            { step: 100, message: "¡Listo!" }
        ]
    }
};

/************************************/
/*     SISTEMA DE PANTALLA DE CARGA */
/************************************/
class LoadingSystem {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.progressFill = document.getElementById('progress-fill');
        this.percentage = document.getElementById('loading-percentage');
        this.message = document.getElementById('loading-message');
        this.startTime = Date.now();
        this.currentProgress = 0;
        this.targetProgress = 0;
        this.stepIndex = 0;
        this.isHidden = false;

        // Inicializar progreso
        this.updateProgress(0, CONFIG.loading.progressSteps[0].message);
    }

    updateProgress(progress, message = null) {
        this.targetProgress = Math.min(progress, 100);

        // Actualizar mensaje si se proporciona
        if (message) {
            this.message.textContent = message;
        }

        // Animar progreso
        this.animateProgress();
    }

    animateProgress() {
        const animate = () => {
            if (this.currentProgress < this.targetProgress) {
                this.currentProgress += 0.5;
                this.progressFill.style.width = `${this.currentProgress}%`;
                this.percentage.textContent = `${Math.round(this.currentProgress)}%`;

                // Actualizar mensaje según el progreso
                const currentStep = CONFIG.loading.progressSteps.find(step =>
                    this.currentProgress >= step.step &&
                    (this.stepIndex < CONFIG.loading.progressSteps.length - 1 ||
                        this.currentProgress >= step.step)
                );

                if (currentStep && currentStep.step > CONFIG.loading.progressSteps[this.stepIndex].step) {
                    this.message.textContent = currentStep.message;
                    this.stepIndex++;
                }

                requestAnimationFrame(animate);
            } else if (this.currentProgress >= 100 && !this.isHidden) {
                // Verificar tiempo mínimo de visualización
                const elapsedTime = Date.now() - this.startTime;
                if (elapsedTime >= CONFIG.loading.minDisplayTime) {
                    this.hide();
                } else {
                    setTimeout(() => this.hide(), CONFIG.loading.minDisplayTime - elapsedTime);
                }
            }
        };

        requestAnimationFrame(animate);
    }

    hide() {
        if (this.isHidden) return;

        this.isHidden = true;
        this.loadingScreen.classList.add('hidden');

        // Remover del DOM después de la animación
        setTimeout(() => {
            if (this.loadingScreen.parentNode) {
                this.loadingScreen.parentNode.removeChild(this.loadingScreen);
            }
        }, 800);
    }
}

/************************************/
/*     REPRODUCTOR DE MÚSICA        */
/************************************/
class MusicPlayer {
    constructor() {
        this.audio = document.getElementById('hidden-audio') || new Audio();
        this.currentSongIndex = 0;
        this.isPlaying = false;
        this.isShuffle = false;
        this.isRepeat = false;
        this.volume = 0.7;
        this.songs = [];

        this.initializeElements();
        this.loadSongs();
        this.setupEventListeners();

        // Configurar volumen inicial
        this.audio.volume = this.volume;
        this.updateVolumeIcon();
    }

    initializeElements() {
        this.elements = {
            musicButton: document.getElementById('music-button'),
            musicPlayer: document.getElementById('music-player'),
            closePlayer: document.getElementById('close-player'),
            playlist: document.getElementById('playlist'),
            currentSongTitle: document.getElementById('current-song-title'),
            currentSongArtist: document.getElementById('current-song-artist'),
            playBtn: document.getElementById('play-btn'),
            playIcon: document.getElementById('play-icon'),
            prevBtn: document.getElementById('prev-btn'),
            nextBtn: document.getElementById('next-btn'),
            progressBar: document.getElementById('progress-bar'),
            progress: document.getElementById('progress'),
            currentTime: document.getElementById('current-time'),
            duration: document.getElementById('duration'),
            volumeBtn: document.getElementById('volume-btn'),
            volumeIcon: document.getElementById('volume-icon'),
            volumeSlider: document.getElementById('volume-slider'),
            shuffleBtn: document.getElementById('shuffle-btn'),
            repeatBtn: document.getElementById('repeat-btn')
        };

        // Asegurar que el botón siempre sea visible
        this.elements.musicButton.style.display = 'flex';
        this.elements.musicButton.style.visibility = 'visible';
        this.elements.musicButton.style.opacity = '1';
    }

    loadSongs() {
        this.songs = [
            {
                title: "Recuerdas",
                artist: "Esta canción?",
                src: "assets/songs/song2.mp3",
                cover: "assets/images/music0.jpg"
            },
            {
                title: "Eres la mejor",
                artist: "Mi amor hermosa",
                src: "assets/songs/song1.mp3",
                cover: "assets/images/music3.jpg"
            },
            {
                title: "Te amo",
                artist: "Eternamente",
                src: "assets/songs/song3.mp3",
                cover: "assets/images/music2.jpg"
            },
            {
                title: "Hiciste de mi vida",
                artist: "la mejor",
                src: "assets/songs/song4.mp3",
                cover: "assets/images/music4.jpg"
            },
            {
                title: "Mi amor chiquita",
                artist: "Siempre mi princesa",
                src: "assets/songs/song5.mp3",
                cover: "assets/images/music5.jpg"
            }
        ];

        this.renderPlaylist();
    }

    renderPlaylist() {
        this.elements.playlist.innerHTML = '';

        this.songs.forEach((song, index) => {
            const songElement = document.createElement('div');
            songElement.className = 'song-item';
            if (index === this.currentSongIndex) {
                songElement.classList.add('active');
            }

            songElement.innerHTML = `
                <img src="${song.cover}" alt="${song.title}" class="song-cover" 
                     onerror="this.src='data:image/svg+xml;charset=UTF-8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%23ff6b8b%22/><text x=%2250%22 y=%2255%22 text-anchor=%22middle%22 font-size=%2220%22 fill=%22white%22>🎵</text></svg>'">
                <div class="song-details">
                    <h4>${song.title}</h4>
                    <p>${song.artist}</p>
                </div>
                <div class="song-duration">-:--</div>
            `;

            songElement.addEventListener('click', () => {
                this.playSong(index);
            });

            this.elements.playlist.appendChild(songElement);
        });
    }

    setupEventListeners() {
        // Botón de música
        this.elements.musicButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.elements.musicPlayer.classList.toggle('show');
        });

        // Cerrar reproductor
        this.elements.closePlayer.addEventListener('click', (e) => {
            e.stopPropagation();
            this.elements.musicPlayer.classList.remove('show');
        });

        // Controles de reproducción
        this.elements.playBtn.addEventListener('click', () => this.togglePlay());
        this.elements.prevBtn.addEventListener('click', () => this.prevSong());
        this.elements.nextBtn.addEventListener('click', () => this.nextSong());

        // Barra de progreso
        this.elements.progressBar.addEventListener('click', (e) => {
            if (this.audio.duration) {
                const rect = this.elements.progressBar.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                this.audio.currentTime = percent * this.audio.duration;
            }
        });

        // Volumen
        this.elements.volumeSlider.addEventListener('input', (e) => {
            this.volume = e.target.value / 100;
            this.audio.volume = this.volume;
            this.updateVolumeIcon();
        });

        // Botones extra
        this.elements.shuffleBtn.addEventListener('click', () => {
            this.isShuffle = !this.isShuffle;
            this.elements.shuffleBtn.classList.toggle('active', this.isShuffle);
        });

        this.elements.repeatBtn.addEventListener('click', () => {
            this.isRepeat = !this.isRepeat;
            this.elements.repeatBtn.classList.toggle('active', this.isRepeat);
        });

        // Eventos del audio
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('loadedmetadata', () => {
            this.elements.duration.textContent = this.formatTime(this.audio.duration);
        });
        this.audio.addEventListener('ended', () => {
            if (this.isRepeat) {
                this.playSong(this.currentSongIndex);
            } else {
                this.nextSong();
            }
        });

        this.audio.addEventListener('play', () => {
            this.isPlaying = true;
            this.updatePlayButton();
            this.elements.musicButton.classList.add('playing');
        });

        this.audio.addEventListener('pause', () => {
            this.isPlaying = false;
            this.updatePlayButton();
            this.elements.musicButton.classList.remove('playing');
        });

        // Cerrar reproductor si se hace clic fuera de él
        document.addEventListener('click', (e) => {
            if (this.elements.musicPlayer.classList.contains('show') &&
                !this.elements.musicPlayer.contains(e.target) &&
                !this.elements.musicButton.contains(e.target)) {
                this.elements.musicPlayer.classList.remove('show');
            }
        });
    }

    playSong(index) {
        if (index < 0 || index >= this.songs.length) return;

        this.currentSongIndex = index;
        const song = this.songs[index];

        // Detener audio actual
        this.audio.pause();
        this.isPlaying = false;
        this.updatePlayButton();

        // Limpiar fuente anterior
        this.audio.src = '';

        // Establecer nueva fuente
        this.audio.src = song.src;
        this.elements.currentSongTitle.textContent = song.title;
        this.elements.currentSongArtist.textContent = song.artist;

        // Reiniciar progreso
        this.elements.progress.style.width = '0%';
        this.elements.currentTime.textContent = '0:00';
        this.elements.duration.textContent = '0:00';

        // Intentar reproducir
        const playPromise = this.audio.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                this.isPlaying = true;
                this.updatePlayButton();
                this.renderPlaylist();
                this.elements.musicButton.classList.add('playing');
            }).catch(error => {
                console.error("Error al reproducir:", error);

                // Mostrar mensaje de error
                this.elements.currentSongTitle.textContent = "Error al cargar canción";
                this.elements.currentSongArtist.textContent = "Haz clic en play";
                this.isPlaying = false;
                this.updatePlayButton();
                this.elements.musicButton.classList.remove('playing');
            });
        }
    }

    togglePlay() {
        if (!this.audio.src) {
            this.playSong(0);
            return;
        }

        if (this.audio.paused) {
            this.audio.play().then(() => {
                this.isPlaying = true;
                this.updatePlayButton();
                this.elements.musicButton.classList.add('playing');
            }).catch(error => {
                console.error("Error al reanudar:", error);
                if (error.name === 'NotAllowedError') {
                    this.playSong(this.currentSongIndex);
                }
            });
        } else {
            this.audio.pause();
            this.isPlaying = false;
            this.updatePlayButton();
            this.elements.musicButton.classList.remove('playing');
        }
    }

    updatePlayButton() {
        const icon = this.elements.playIcon;
        icon.classList.remove('fa-play', 'fa-pause');
        icon.classList.add(this.isPlaying ? 'fa-pause' : 'fa-play');
    }

    prevSong() {
        if (this.isShuffle) {
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * this.songs.length);
            } while (newIndex === this.currentSongIndex && this.songs.length > 1);
            this.playSong(newIndex);
        } else {
            const newIndex = (this.currentSongIndex - 1 + this.songs.length) % this.songs.length;
            this.playSong(newIndex);
        }
    }

    nextSong() {
        if (this.isShuffle) {
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * this.songs.length);
            } while (newIndex === this.currentSongIndex && this.songs.length > 1);
            this.playSong(newIndex);
        } else {
            const newIndex = (this.currentSongIndex + 1) % this.songs.length;
            this.playSong(newIndex);
        }
    }

    updateProgress() {
        if (this.audio.duration && !isNaN(this.audio.duration)) {
            const progress = (this.audio.currentTime / this.audio.duration) * 100;
            this.elements.progress.style.width = `${progress}%`;
            this.elements.currentTime.textContent = this.formatTime(this.audio.currentTime);
        }
    }

    updateVolumeIcon() {
        const icon = this.elements.volumeIcon;
        icon.classList.remove('fa-volume-up', 'fa-volume-down', 'fa-volume-mute');

        if (this.volume === 0) {
            icon.classList.add('fa-volume-mute');
        } else if (this.volume < 0.3) {
            icon.classList.add('fa-volume-down');
        } else {
            icon.classList.add('fa-volume-up');
        }
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";

        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
}

/************************************/
/*     FUNCIONES AUXILIARES         */
/************************************/
function initCarousel() {
    const carousel = document.getElementById('imageCarousel');
    if (!carousel) return;

    const items = carousel.querySelectorAll('.carousel-item-3d');
    let radius, isDragging = false, startX = 0, currentRotation = 0, targetRotation = 0, autoRotateTimeout, animationFrameId;
    const angle = 360 / items.length;

    const updateRadius = () => {
        if (window.innerWidth <= 480) { radius = 200; }
        else if (window.innerWidth <= 850) { radius = 250; }
        else { radius = 300; }
    };

    const arrangeItems = () => {
        updateRadius();
        items.forEach((item, index) => {
            item.style.transform = `rotateY(${angle * index}deg) translateZ(${radius}px)`;
        });
    };

    const dragStart = (e) => {
        isDragging = true;
        startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        carousel.style.transition = 'none';
    };

    const dragging = (e) => {
        if (!isDragging) return;
        const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const diffX = currentX - startX;
        const sensitivity = window.innerWidth <= 850 ? 0.7 : 0.5;
        targetRotation = currentRotation + diffX * sensitivity;
        carousel.style.transform = `rotateY(${targetRotation}deg)`;
    };

    const dragEnd = () => {
        if (!isDragging) return;
        isDragging = false;
        carousel.style.transition = 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        currentRotation = targetRotation;
        startAutoRotate();
    };

    const animateRotation = () => {
        if (isDragging) {
            animationFrameId = requestAnimationFrame(animateRotation);
            return;
        }
        const rotationSpeed = 0.2;
        targetRotation -= rotationSpeed;
        currentRotation -= rotationSpeed;
        carousel.style.transform = `rotateY(${targetRotation}deg)`;
        animationFrameId = requestAnimationFrame(animateRotation);
    };

    const stopAutoRotate = () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        clearTimeout(autoRotateTimeout);
    };

    const startAutoRotate = () => {
        stopAutoRotate();
        animationFrameId = requestAnimationFrame(animateRotation);
    };

    carousel.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', dragging);
    document.addEventListener('mouseup', dragEnd);
    carousel.addEventListener('touchstart', dragStart, { passive: true });
    carousel.addEventListener('touchmove', dragging, { passive: true });
    carousel.addEventListener('touchend', dragEnd);

    arrangeItems();
    startAutoRotate();
    window.addEventListener('resize', arrangeItems);
}

function pluralize(value, singular, plural) {
    return `${value} ${value === 1 ? singular : plural}`;
}

function getPointInHeartShape(width, height) {
    let t = Math.random() * 2 * Math.PI;
    let r = Math.sqrt(Math.random());
    let x = r * (16 * Math.pow(Math.sin(t), 3));
    let y = -r * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    return { x: (x / 32 + 0.5) * width, y: (y / 30 + 0.45) * height };
}

function createHeartElement(colorPalette = CONFIG.heartColors) {
    const heart = document.createElement('div');
    const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    const heartSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="${color}"/></svg>`;
    heart.style.backgroundImage = `url('data:image/svg+xml;utf8,${encodeURIComponent(heartSVG)}')`;
    const rotation = Math.random() * 90 - 45;
    heart.style.setProperty('--rotation', `${rotation}deg`);
    const swayDelay = Math.random() * 1.5;
    heart.style.setProperty('--sway-delay', `${swayDelay}s`);
    return heart;
}

/************************************/
/*     INICIALIZACIÓN PRINCIPAL     */
/************************************/
document.addEventListener('DOMContentLoaded', function () {
    // 1. Inicializar pantalla de carga
    const loadingSystem = new LoadingSystem();
    window.loadingSystem = loadingSystem;

    // 2. Variables principales
    const canopy = document.querySelector('.heart-canopy');
    const messageElement = document.getElementById('love-message-text');
    const totalHearts = window.innerWidth <= 768 ? CONFIG.canopyHeartCount.mobile : CONFIG.canopyHeartCount.desktop;
    const startDate = new Date(CONFIG.startDate);
    let phraseIndex = 0;

    // 3. Función para actualizar contador
    function updateCounter() {
        const now = new Date();
        const diff = now - startDate;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
        const minutes = Math.floor(diff / (1000 * 60)) % 60;
        const seconds = Math.floor(diff / 1000) % 60;
        document.getElementById('love-counter').innerText =
            `${pluralize(days, 'día', 'días')}, ${pluralize(hours, 'hora', 'horas')}, ${pluralize(minutes, 'minuto', 'minutos')} y ${pluralize(seconds, 'segundo', 'segundos')}`;
    }

    // 4. Función para escribir el mensaje
    let charIndex = 0;
    function typeWriter() {
        if (charIndex < CONFIG.loveText.length) {
            messageElement.parentElement.style.opacity = 1;
            messageElement.innerHTML = CONFIG.loveText.substring(0, charIndex + 1).replace(/\n/g, '<br>') + '<span class="cursor"></span>';
            charIndex++;
            setTimeout(typeWriter, CONFIG.typingSpeed);
        } else {
            messageElement.innerHTML = CONFIG.loveText.replace(/\n/g, '<br>');
        }
    }

    // 5. Función para crear corazón del dosel
    function createCanopyHeart(isFalling = false) {
        const heart = createHeartElement();
        const canopyRect = canopy.getBoundingClientRect();
        if (canopyRect.width > 0) {
            const point = getPointInHeartShape(canopyRect.width, canopyRect.height);
            heart.style.left = `${point.x}px`;
            heart.style.top = `${point.y}px`;
        }
        if (isFalling) {
            heart.classList.add('heart', 'falling-heart');
            heart.style.animationDuration = CONFIG.animation.canopyFallDuration + 's';
            heart.style.opacity = '1';
        } else {
            heart.classList.add('heart');
            heart.style.animationDuration = CONFIG.animation.initialHeartsAppear + 's';
            heart.style.animationDelay = `${Math.random() * CONFIG.animation.initialTreeAppear}s`;
        }
        canopy.appendChild(heart);
        if (isFalling) {
            setTimeout(() => heart.remove(), CONFIG.animation.canopyFallDuration * 1000);
        }
    }

    // 6. Función para crear pétalo
    function createPetal() {
        const petal = createHeartElement(CONFIG.petal.colors);
        petal.classList.add('petal');
        const startX = Math.random() * 30 - 10;
        const endX = startX + (Math.random() * 50 + 30);
        petal.style.setProperty('--start-x', `${startX}vw`);
        petal.style.setProperty('--end-x', `${endX}vw`);
        petal.style.left = '0';
        const duration = Math.random() * (CONFIG.petal.duration.max - CONFIG.petal.duration.min) + CONFIG.petal.duration.min;
        petal.style.animationDuration = duration + 's';
        document.body.appendChild(petal);
        setTimeout(() => petal.remove(), duration * 1000);
    }

    // 7. Función para cargar corazones en lotes
    function loadHeartsInBatches() {
        const batchSize = 50;
        let loaded = 0;

        function loadBatch() {
            const remaining = Math.min(batchSize, totalHearts - loaded);
            for (let i = 0; i < remaining; i++) {
                createCanopyHeart();
                loaded++;
            }

            if (loaded < totalHearts) {
                // Actualizar progreso según los corazones cargados
                const progress = 70 + (loaded / totalHearts) * 10;
                loadingSystem.updateProgress(Math.min(progress, 80), `Cargando corazones... ${loaded}/${totalHearts}`);
                setTimeout(loadBatch, 50);
            } else {
                loadingSystem.updateProgress(80, "Corazones cargados!");
            }
        }
        loadBatch();
    }

    // 8. Evento de clic para frases y corazones
    document.addEventListener('click', function (event) {
        if (event.target.closest('.carousel-3d, .music-button')) return;

        // Crear frase flotante
        const phrase = document.createElement('div');
        phrase.classList.add('floating-phrase');
        phrase.textContent = CONFIG.clickingPhrases[phraseIndex];
        phrase.style.left = `${event.clientX}px`;
        phrase.style.top = `${event.clientY}px`;
        document.body.appendChild(phrase);
        phraseIndex = (phraseIndex + 1) % CONFIG.clickingPhrases.length;
        setTimeout(() => phrase.remove(), 4000);

        // Crear explosión de corazones
        for (let i = 0; i < CONFIG.clickBurstCount; i++) {
            const heart = createHeartElement();
            heart.classList.add('click-heart');
            heart.style.left = `${event.clientX}px`;
            heart.style.top = `${event.clientY}px`;
            const angle = Math.random() * 2 * Math.PI;
            const burstDist = Math.random() * (CONFIG.clickBurst.distance.max - CONFIG.clickBurst.distance.min) + CONFIG.clickBurst.distance.min;
            const windDist = Math.random() * (CONFIG.clickBurst.wind.max - CONFIG.clickBurst.wind.min) + CONFIG.clickBurst.wind.min;
            const burstX = Math.cos(angle) * burstDist;
            const burstY = Math.sin(angle) * burstDist;
            heart.style.setProperty('--burst-x', `${burstX}px`);
            heart.style.setProperty('--burst-y', `${burstY}px`);
            heart.style.setProperty('--wind-x', `${windDist}px`);
            heart.style.setProperty('--fall-duration', `${CONFIG.animation.clickFallDuration}s`);
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), CONFIG.animation.clickFallDuration * 1000);
        }
    });

    // 9. SECUENCIA DE CARGA (en orden correcto)

    // Paso 1: Inicialización básica (0-10%)
    setTimeout(() => loadingSystem.updateProgress(10, "Cargando corazones..."), 300);

    // Paso 2: Preparar elementos visuales (10-30%)
    setTimeout(() => loadingSystem.updateProgress(30, "Preparando árbol especial..."), 800);

    // Paso 3: Inicializar reproductor de música (30-50%)
    setTimeout(() => {
        loadingSystem.updateProgress(50, "Configurando música...");
        const musicPlayer = new MusicPlayer();
        window.musicPlayer = musicPlayer;
    }, 1200);

    // Paso 4: Cargar corazones y efectos (50-70%)
    setTimeout(() => {
        loadingSystem.updateProgress(70, "Cargando recuerdos...");

        // Iniciar carrusel
        initCarousel();

        // Cargar corazones en lotes
        loadHeartsInBatches();

        // Iniciar efectos continuos
        setInterval(() => createCanopyHeart(true), CONFIG.fallingCanopyHeartFrequency);
        setInterval(createPetal, CONFIG.petal.frequency);
    }, CONFIG.initialDelay);

    // Paso 5: Iniciar contador y mensaje (70-90%)
    updateCounter();
    setInterval(updateCounter, 1000);

    setTimeout(() => {
        loadingSystem.updateProgress(90, "Preparando mensaje especial...");
        typeWriter();
    }, CONFIG.initialDelay + 2500);

    // Paso 6: Finalizar carga (90-100%)
    setTimeout(() => {
        loadingSystem.updateProgress(100, "¡Todo listo!");
    }, CONFIG.initialDelay + 3500);

    // Evento para interacción con audio
    document.addEventListener('click', function initAudioOnInteraction() {
        document.removeEventListener('click', initAudioOnInteraction);
    }, { once: true });
});
/************************************/
/*     MÓDULO DE CONFIGURACIÓN JS   */
/************************************/
const CONFIG = {
    startDate: '2025-09-06T19:30:00-05:00',


    // MENSAJE CAMBIADO Y GENERALIZADO
    loveText: `Hola, mi amor... ✨\nSolo quería recordarte lo especial que eres para mí y celebrar cada segundo que hemos compartido. Nuestro tiempo juntos ha sido un regalo maravilloso, lleno de risas, sueños y momentos que guardaré por siempre en mi corazón. ❤️\n\nCada día a tu lado es una nueva aventura y una razón para sonreír. Eres la luz que ilumina mis días. Gracias por tanto amor. ¡Te quiero muchísimo! 🥰`,

    // FRASES CAMBIADAS Y GENERALIZADAS
    clickingPhrases: [
        "Te quiero ❤️",
        "Eres mi persona favorita ✨",
        "Cada día te elijo a ti 🥰",
        "Juntos es mi lugar feliz 💖",
        "Gracias por existir 🌹",
        "Contigo todo es mejor 😊",
        "Mi corazón es tuyo 💘"
    ],

    heartColors: ['#ff6b6b', '#ffa07a', '#ffc3a0', '#f0932b', '#e84393', '#d14a7e', '#ff7979', '#ff4757', '#e056fd'],
    canopyHeartCount: { desktop: 700, mobile: 400 },
    fallingCanopyHeartFrequency: 400,
    clickBurstCount: 7,
    animation: { initialTreeAppear: 2.5, initialHeartsAppear: 1.5, canopyFallDuration: 5, clickFallDuration: 6, },
    clickBurst: { distance: { min: 60, max: 90 }, wind: { min: 250, max: 450 }, },
    petal: { colors: ['#ffc2d1', '#ffb3c6', '#ff8fab'], frequency: 1000, duration: { min: 8, max: 12 }, },
    initialDelay: 800,
    typingSpeed: 45, // Un poco más lento para la nueva fuente
};

// class MusicSystem {
//     constructor() {
//         this.audio = null; this.isPlaying = false; this.clickCount = 0;
//         this.button = document.getElementById('music-button'); this.init();
//     }
//     init() {
//         this.button.addEventListener('click', () => this.toggleMusic());
//         document.addEventListener('click', () => this.handleFirstClick());
//         document.addEventListener('touchstart', () => this.handleFirstClick());
//     }
//     async handleFirstClick() {
//         this.clickCount++; if (this.clickCount === 1) await this.initAudio();
//     }
//     async initAudio() {
//         try {
//             this.audio = new Audio('https://www.dl.dropboxusercontent.com/scl/fi/9aprlwe70zexkb95bfmfx/sound.mp3?rlkey=o3hfblu0a5pr5fv2yr57sydq7&st=ssqwqt3h'); this.audio.loop = true; this.audio.volume = 0.7; this.audio.preload = 'auto';
//             this.audio.addEventListener('error', (e) => { this.button.style.display = 'none'; });
//             setTimeout(() => { this.playMusic(); }, 1000);
//         } catch (error) { this.button.style.display = 'none'; }
//     }
//     async toggleMusic() { if (this.isPlaying) this.pauseMusic(); else await this.playMusic(); }
//     async playMusic() {
//         if (!this.audio) return; try { await this.audio.play(); this.isPlaying = true; this.button.textContent = '🎵'; this.button.classList.add('playing'); } catch (error) { }
//     }
//     pauseMusic() { if (!this.audio) return; this.audio.pause(); this.isPlaying = false; this.button.textContent = '🎵'; this.button.classList.remove('playing'); }
// }

function initCarousel() {
    const carousel = document.getElementById('imageCarousel'); if (!carousel) return;
    const items = carousel.querySelectorAll('.carousel-item-3d');
    let radius, isDragging = false, startX = 0, currentRotation = 0, targetRotation = 0, autoRotateTimeout, animationFrameId;
    const angle = 360 / items.length;

    // ----- RADIO DEL CARRUSEL MODIFICADO PARA ALEJARLO -----
    const updateRadius = () => {
        if (window.innerWidth <= 480) { radius = 200; } // Más pequeño en móvil
        else if (window.innerWidth <= 850) { radius = 250; } // Mediano
        else { radius = 300; } // Grande
    };

    const arrangeItems = () => { updateRadius(); items.forEach((item, index) => { item.style.transform = `rotateY(${angle * index}deg) translateZ(${radius}px)`; }); };
    const dragStart = (e) => { isDragging = true; startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX; carousel.style.transition = 'none'; };
    const dragging = (e) => {
        if (!isDragging) return; const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const diffX = currentX - startX; const sensitivity = window.innerWidth <= 850 ? 0.7 : 0.5;
        targetRotation = currentRotation + diffX * sensitivity; carousel.style.transform = `rotateY(${targetRotation}deg)`;
    };
    const dragEnd = () => { if (!isDragging) return; isDragging = false; carousel.style.transition = 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)'; currentRotation = targetRotation; startAutoRotate(); };
    const animateRotation = () => {
        if (isDragging) { animationFrameId = requestAnimationFrame(animateRotation); return; }
        const rotationSpeed = 0.2; targetRotation -= rotationSpeed; currentRotation -= rotationSpeed;
        carousel.style.transform = `rotateY(${targetRotation}deg)`; animationFrameId = requestAnimationFrame(animateRotation);
    };
    const stopAutoRotate = () => { if (animationFrameId) cancelAnimationFrame(animationFrameId); clearTimeout(autoRotateTimeout); };
    const startAutoRotate = () => { stopAutoRotate(); animationFrameId = requestAnimationFrame(animateRotation); };
    carousel.addEventListener('mousedown', dragStart); document.addEventListener('mousemove', dragging); document.addEventListener('mouseup', dragEnd);
    carousel.addEventListener('touchstart', dragStart, { passive: true }); carousel.addEventListener('touchmove', dragging, { passive: true }); carousel.addEventListener('touchend', dragEnd);
    arrangeItems(); startAutoRotate(); window.addEventListener('resize', arrangeItems);
}

document.addEventListener('DOMContentLoaded', function () {
    const canopy = document.querySelector('.heart-canopy');
    const messageElement = document.getElementById('love-message-text');
    const totalHearts = window.innerWidth <= 768 ? CONFIG.canopyHeartCount.mobile : CONFIG.canopyHeartCount.desktop;
    const startDate = new Date(CONFIG.startDate);
    console.log('CONFIG.startDate:', CONFIG.startDate);
    console.log('startDate (toString):', startDate.toString());
    console.log('startDate (ISO):', startDate.toISOString());
    console.log('Ahora (toString):', new Date().toString());
    let phraseIndex = 0;
    console.log('Inicializando MusicPlayer...');
    const musicPlayer = new MusicPlayer();
    // new MusicSystem();
    window.musicPlayer = musicPlayer;
    console.log('MusicPlayer disponible en window.musicPlayer');

    // Añadir evento para cargar automáticamente la primera canción cuando el usuario interactúe
    document.addEventListener('click', function initAudioOnInteraction() {
        console.log('Interacción del usuario detectada');
        document.removeEventListener('click', initAudioOnInteraction);
    }, { once: true });
    function pluralize(value, singular, plural) { return `${value} ${value === 1 ? singular : plural}`; }

    function updateCounter() {
        const now = new Date(); const diff = now - startDate; const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(diff / (1000 * 60 * 60)) % 24; const minutes = Math.floor(diff / (1000 * 60)) % 60;
        const seconds = Math.floor(diff / 1000) % 60;
        document.getElementById('love-counter').innerText =
            `${pluralize(days, 'día', 'días')}, ${pluralize(hours, 'hora', 'horas')}, ${pluralize(minutes, 'minuto', 'minutos')} y ${pluralize(seconds, 'segundo', 'segundos')}`;
    }

    let charIndex = 0;
    function typeWriter() {
        if (charIndex < CONFIG.loveText.length) {
            messageElement.parentElement.style.opacity = 1;
            messageElement.innerHTML = CONFIG.loveText.substring(0, charIndex + 1).replace(/\n/g, '<br>') + '<span class="cursor"></span>';
            charIndex++; setTimeout(typeWriter, CONFIG.typingSpeed);
        } else { messageElement.innerHTML = CONFIG.loveText.replace(/\n/g, '<br>'); }
    }

    function getPointInHeartShape(width, height) {
        let t = Math.random() * 2 * Math.PI; let r = Math.sqrt(Math.random());
        let x = r * (16 * Math.pow(Math.sin(t), 3)); let y = -r * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        return { x: (x / 32 + 0.5) * width, y: (y / 30 + 0.45) * height };
    }

    function createHeartElement(colorPalette = CONFIG.heartColors) {
        const heart = document.createElement('div'); const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        const heartSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="${color}"/></svg>`;
        heart.style.backgroundImage = `url('data:image/svg+xml;utf8,${encodeURIComponent(heartSVG)}')`;
        const rotation = Math.random() * 90 - 45; heart.style.setProperty('--rotation', `${rotation}deg`);
        const swayDelay = Math.random() * 1.5; heart.style.setProperty('--sway-delay', `${swayDelay}s`);
        return heart;
    }

    function createCanopyHeart(isFalling = false) {
        const heart = createHeartElement(); const canopyRect = canopy.getBoundingClientRect();
        if (canopyRect.width > 0) { const point = getPointInHeartShape(canopyRect.width, canopyRect.height); heart.style.left = `${point.x}px`; heart.style.top = `${point.y}px`; }
        if (isFalling) { heart.classList.add('heart', 'falling-heart'); heart.style.animationDuration = CONFIG.animation.canopyFallDuration + 's'; heart.style.opacity = '1'; }
        else { heart.classList.add('heart'); heart.style.animationDuration = CONFIG.animation.initialHeartsAppear + 's'; heart.style.animationDelay = `${Math.random() * CONFIG.animation.initialTreeAppear}s`; }
        canopy.appendChild(heart);
        if (isFalling) { setTimeout(() => heart.remove(), CONFIG.animation.canopyFallDuration * 1000); }
    }

    document.addEventListener('click', function (event) {
        if (event.target.closest('.carousel-3d, .music-button')) return;

        const phrase = document.createElement('div');
        phrase.classList.add('floating-phrase');
        phrase.textContent = CONFIG.clickingPhrases[phraseIndex];
        phrase.style.left = `${event.clientX}px`;
        phrase.style.top = `${event.clientY}px`;
        document.body.appendChild(phrase);
        phraseIndex = (phraseIndex + 1) % CONFIG.clickingPhrases.length;
        setTimeout(() => phrase.remove(), 4000);

        for (let i = 0; i < CONFIG.clickBurstCount; i++) {
            const heart = createHeartElement(); heart.classList.add('click-heart');
            heart.style.left = `${event.clientX}px`; heart.style.top = `${event.clientY}px`;
            const angle = Math.random() * 2 * Math.PI;
            const burstDist = Math.random() * (CONFIG.clickBurst.distance.max - CONFIG.clickBurst.distance.min) + CONFIG.clickBurst.distance.min;
            const windDist = Math.random() * (CONFIG.clickBurst.wind.max - CONFIG.clickBurst.wind.min) + CONFIG.clickBurst.wind.min;
            const burstX = Math.cos(angle) * burstDist; const burstY = Math.sin(angle) * burstDist;
            heart.style.setProperty('--burst-x', `${burstX}px`); heart.style.setProperty('--burst-y', `${burstY}px`);
            heart.style.setProperty('--wind-x', `${windDist}px`); heart.style.setProperty('--fall-duration', `${CONFIG.animation.clickFallDuration}s`);
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), CONFIG.animation.clickFallDuration * 1000);
        }
    });

    function createPetal() {
        const petal = createHeartElement(CONFIG.petal.colors); petal.classList.add('petal');
        const startX = Math.random() * 30 - 10; const endX = startX + (Math.random() * 50 + 30);
        petal.style.setProperty('--start-x', `${startX}vw`); petal.style.setProperty('--end-x', `${endX}vw`);
        petal.style.left = '0';
        const duration = Math.random() * (CONFIG.petal.duration.max - CONFIG.petal.duration.min) + CONFIG.petal.duration.min;
        petal.style.animationDuration = duration + 's'; document.body.appendChild(petal);
        setTimeout(() => petal.remove(), duration * 1000);
    }

    function loadHeartsInBatches() {
        const batchSize = 50; let loaded = 0;
        function loadBatch() {
            const remaining = Math.min(batchSize, totalHearts - loaded);
            for (let i = 0; i < remaining; i++) { createCanopyHeart(); loaded++; }
            if (loaded < totalHearts) setTimeout(loadBatch, 100);
        }
        loadBatch();
    }

    setTimeout(() => {
        loadHeartsInBatches();
        setInterval(() => createCanopyHeart(true), CONFIG.fallingCanopyHeartFrequency);
        setInterval(createPetal, CONFIG.petal.frequency);
    }, CONFIG.initialDelay);

    updateCounter(); setInterval(updateCounter, 1000);
    setTimeout(typeWriter, CONFIG.initialDelay + 2500);
    initCarousel();
});

/// Reproductor de Música
class MusicPlayer {
    constructor() {
        // Usar el elemento audio existente o crear uno nuevo
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

        // Añadir logs para depuración
        console.log('MusicPlayer inicializado');
        console.log('Elemento audio:', this.audio);
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

        console.log('Elementos inicializados:', this.elements);
    }

    loadSongs() {
        // Lista de canciones - Asegúrate que las rutas sean correctas
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

        console.log('Canciones cargadas:', this.songs);
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
                console.log('Haciendo clic en canción:', index, song.title);
                this.playSong(index);
            });

            this.elements.playlist.appendChild(songElement);
        });
    }

    setupEventListeners() {
        console.log('Configurando event listeners...');

        // Botón de música
        this.elements.musicButton.addEventListener('click', () => {
            console.log('Botón de música clickeado');
            this.elements.musicPlayer.classList.toggle('show');
            this.elements.musicButton.classList.toggle('playing', this.isPlaying);
        });

        // Cerrar reproductor
        this.elements.closePlayer.addEventListener('click', () => {
            console.log('Cerrando reproductor');
            this.elements.musicPlayer.classList.remove('show');
        });

        // Controles de reproducción
        this.elements.playBtn.addEventListener('click', () => {
            console.log('Botón play/pause clickeado');
            this.togglePlay();
        });

        this.elements.prevBtn.addEventListener('click', () => {
            console.log('Botón anterior clickeado');
            this.prevSong();
        });

        this.elements.nextBtn.addEventListener('click', () => {
            console.log('Botón siguiente clickeado');
            this.nextSong();
        });

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
            console.log('Modo aleatorio:', this.isShuffle);
        });

        this.elements.repeatBtn.addEventListener('click', () => {
            this.isRepeat = !this.isRepeat;
            this.elements.repeatBtn.classList.toggle('active', this.isRepeat);
            console.log('Modo repetir:', this.isRepeat);
        });

        // Eventos del audio
        this.audio.addEventListener('timeupdate', () => this.updateProgress());

        this.audio.addEventListener('loadedmetadata', () => {
            console.log('Metadatos cargados, duración:', this.audio.duration);
            this.elements.duration.textContent = this.formatTime(this.audio.duration);

            // Actualizar duración en la lista de reproducción
            const songItems = document.querySelectorAll('.song-item');
            if (songItems[this.currentSongIndex]) {
                songItems[this.currentSongIndex].querySelector('.song-duration').textContent =
                    this.formatTime(this.audio.duration);
            }
        });

        this.audio.addEventListener('loadeddata', () => {
            console.log('Datos de audio cargados');
        });

        this.audio.addEventListener('canplay', () => {
            console.log('Audio listo para reproducir');
        });

        this.audio.addEventListener('play', () => {
            console.log('Audio empezó a reproducirse');
            this.isPlaying = true;
            this.updatePlayButton();
        });

        this.audio.addEventListener('pause', () => {
            console.log('Audio pausado');
            this.isPlaying = false;
            this.updatePlayButton();
        });

        this.audio.addEventListener('ended', () => {
            console.log('Audio terminado');
            if (this.isRepeat) {
                this.playSong(this.currentSongIndex);
            } else {
                this.nextSong();
            }
        });

        this.audio.addEventListener('error', (e) => {
            console.error('Error en audio:', e);
            console.error('Código de error:', this.audio.error);
            console.error('Mensaje:', this.audio.error?.message);
            console.error('SRC actual:', this.audio.src);
        });

        // Configurar volumen inicial
        this.audio.volume = this.volume;
        this.elements.volumeSlider.value = this.volume * 100;
        this.updateVolumeIcon();

        console.log('Event listeners configurados');
    }

    playSong(index) {
        if (index < 0 || index >= this.songs.length) {
            console.error('Índice de canción inválido:', index);
            return;
        }

        this.currentSongIndex = index;
        const song = this.songs[index];

        console.log('Intentando reproducir canción:', song.title);
        console.log('Ruta del archivo:', song.src);

        // Detener audio actual si está reproduciendo
        this.audio.pause();

        // Limpiar eventos anteriores
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
                console.log('Canción empezó a reproducirse correctamente');
                this.isPlaying = true;
                this.updatePlayButton();
                this.renderPlaylist();
                this.elements.musicButton.classList.add('playing');
            }).catch(error => {
                console.error("Error al reproducir:", error);
                console.error("Detalles del error:", {
                    name: error.name,
                    message: error.message,
                    code: this.audio.error?.code,
                    src: this.audio.src
                });

                // Mostrar mensaje de error al usuario
                this.elements.currentSongTitle.textContent = "Error al cargar canción";
                this.elements.currentSongArtist.textContent = "Verifica la ruta del archivo";

                // Verificar si es un problema de autoplay
                if (error.name === 'NotAllowedError') {
                    console.log('Autoplay bloqueado. Necesita interacción del usuario primero.');
                    this.isPlaying = false;
                    this.updatePlayButton();

                    // Mostrar mensaje al usuario
                    alert('Por favor, haz clic en el botón de play para reproducir la música. Los navegadores requieren interacción del usuario para reproducir audio.');
                }
            });
        }
    }

    togglePlay() {
        console.log('togglePlay llamado, isPlaying:', this.isPlaying, 'audio.paused:', this.audio.paused);

        if (!this.audio.src) {
            console.log('No hay fuente de audio, reproduciendo primera canción');
            this.playSong(0);
            return;
        }

        if (this.audio.paused) {
            console.log('Intentando reanudar reproducción');
            const playPromise = this.audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error('Error al reanudar:', error);
                    // Si hay error de autoplay, reproducir desde el inicio
                    if (error.name === 'NotAllowedError') {
                        this.playSong(this.currentSongIndex);
                    }
                });
            }
        } else {
            console.log('Pausando reproducción');
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
        console.log('Botón actualizado, isPlaying:', this.isPlaying);
    }

    prevSong() {
        console.log('Cambiando a canción anterior');
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
        console.log('Cambiando a siguiente canción');
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

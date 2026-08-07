export class AudioManager {
    constructor() {
        // Chemins locaux vers vos fichiers téléchargés
        this.sounds = {
            bgm: new Audio("assets/audio/theme.mp3"),
            jump: "assets/audio/jump.mp3",
            gameOver: "assets/audio/mamma-mia.mp3",
            hit: "assets/audio/hit.mp3",
            pipe: "assets/audio/pipe.mp3",
            fall: "assets/audio/fall.mp3"
        };

        // Configuration musique de fond
        this.sounds.bgm.loop = true;
        this.sounds.bgm.volume = 0.4;

        this.isMuted = false;
        this.bgmStarted = false;
    }

    // Démarre la musique de fond (gère le blocage de lecture automatique du navigateur)
    playBGM() {
        if (this.isMuted) return;
        this.sounds.bgm.play().then(() => {
            this.bgmStarted = true;
        }).catch(() => {
            // Si le navigateur bloque l'autoplay, on débloque au premier clic/touche
            const unlockAudio = () => {
                this.sounds.bgm.play();
                this.bgmStarted = true;
                window.removeEventListener("keydown", unlockAudio);
                window.removeEventListener("click", unlockAudio);
            };
            window.addEventListener("keydown", unlockAudio);
            window.addEventListener("click", unlockAudio);
        });
    }

    // Arrête la musique de fond
    stopBGM() {
        this.sounds.bgm.pause();
        this.sounds.bgm.currentTime = 0;
    }

    // Joue un effet sonore (instancie un nouvel Audio pour permettre des sons simultanés)
    playSFX(name, volume = 0.7) {
        if (this.isMuted || !this.sounds[name]) return;

        const sfx = new Audio(this.sounds[name]);
        sfx.volume = volume;
        sfx.play().catch(() => {}); // Évite d'interrompre le jeu si l'audio échoue
    }
}


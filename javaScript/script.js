// ===== CANVAS FUEGOS =====
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

// Partículas
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 6;
        this.speedY = (Math.random() - 0.5) * 6;
        this.life = 100;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

let particles = [];

function createFirework(x, y) {
    const colors = ["red", "yellow", "orange", "cyan", "lime", "magenta"];
    for (let i = 0; i < 80; i++) {
        particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
    }
}

function animate() {
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
        p.update();
        p.draw();
        if (p.life <= 0) particles.splice(i, 1);
    });

    requestAnimationFrame(animate);
}

setInterval(() => {
    createFirework(Math.random() * canvas.width, Math.random() * canvas.height * 0.6);
}, 900);

canvas.addEventListener("click", e => createFirework(e.clientX, e.clientY));

animate();

// ===== ESTRELLAS =====
const starCanvas = document.getElementById("stars");
const starCtx = starCanvas.getContext("2d");

starCanvas.width = innerWidth;
starCanvas.height = innerHeight;

let stars = Array.from({ length: 150 }, () => ({
    x: Math.random() * starCanvas.width,
    y: Math.random() * starCanvas.height,
    r: Math.random() * 1.5,
    s: Math.random() * 0.3 + 0.05
}));

function animateStars() {
    starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    starCtx.fillStyle = "white";

    stars.forEach(star => {
        star.y += star.s;
        if (star.y > starCanvas.height) star.y = 0;
        starCtx.beginPath();
        starCtx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        starCtx.fill();
    });

    requestAnimationFrame(animateStars);
}

// ===== BOTÓN =====
const musica = document.getElementById("musica");

document.getElementById("btnMensaje").addEventListener("click", () => {
    document.getElementById("inicio").style.display = "none";
    document.getElementById("mensajeFinal").classList.add("activo");

    musica.volume = 0.8;
    musica.currentTime = 0;
    musica.play();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    animateStars();
});

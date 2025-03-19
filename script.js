const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spinButton");
const claimButton = document.getElementById("claimButton");
const resultDiv = document.getElementById("result");

let spinning = false;
let angle = 0;

function drawWheel() {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FFFF33"];
    const labels = ["10.000", "25.000", "50.000", "99.999"];
    const sections = labels.length;
    const arc = (2 * Math.PI) / sections;

    for (let i = 0; i < sections; i++) {
        ctx.beginPath();
        ctx.fillStyle = colors[i];
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, 150, i * arc, (i + 1) * arc);
        ctx.fill();
        ctx.closePath();

        ctx.save();
        ctx.fillStyle = "black";
        ctx.translate(150, 150);
        ctx.rotate(i * arc + arc / 2);
        ctx.textAlign = "right";
        ctx.fillText(labels[i], 120, 10);
        ctx.restore();
    }
}

function spinWheel() {
    if (spinning) return;
    spinning = true;

    let duration = 3000;
    let start = null;
    
    function animateSpin(timestamp) {
        if (!start) start = timestamp;
        let progress = timestamp - start;
        
        angle += (1 - progress / duration) * 20;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(150, 150);
        ctx.rotate(angle * Math.PI / 180);
        ctx.translate(-150, -150);
        drawWheel();
        ctx.restore();

        if (progress < duration) {
            requestAnimationFrame(animateSpin);
        } else {
            spinning = false;
            resultDiv.innerHTML = `<h3>Selamat! Anda mendapatkan <strong>99.999</strong> diamond!</h3>`;
            claimButton.style.display = "block";
        }
    }

    requestAnimationFrame(animateSpin);
}

drawWheel();
spinButton.addEventListener("click", spinWheel);

claimButton.addEventListener("click", function () {
    alert("Selamat! Diamond Anda telah diklaim!");
});

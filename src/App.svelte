<script>
    import { onMount } from "svelte";

    let power = 15;
    let angle = 45;
    let firing = false;
    const gravity = 0.4;

    let width = parseInt(window.innerWidth / 2);
    let height = parseInt(window.innerHeight / 3);
    let canvas;

    let xPos = 50;
    let yPos = height - 41;

    let pjX = xPos + 15;
    let pjY = yPos;
    let velX = 0;
    let velY = 0;

    let wallX = parseInt(width / 2);
    let wallY = parseInt(height / 3);

    let craters = [];

    onMount(() => {
        const ctx = canvas.getContext("2d");
        let frame = requestAnimationFrame(loop);

        function loop(t) {
            drawScene(ctx);
            drawTrajectory(ctx, firing);
            drawWall(ctx);
            drawCraters(ctx);
            drawTank(ctx, xPos, yPos, angle);
            frame = requestAnimationFrame(loop);
        }

        return () => {
            cancelAnimationFrame(frame);
        };
    });

    // canvas fns
    function drawScene(ctx) {
        // draw bg
        ctx.fillStyle = "#cccccc";
        ctx.fillRect(0, 0, width, height);
        // draw ground
        ctx.fillStyle = "#614d28";
        ctx.fillRect(0, height - 30, width, height);
    }

    function drawTank(ctx, x, y, angle) {
        // draw tank body
        ctx.fillStyle = "#1c4623";
        ctx.fillRect(x, y, 30, 10);
        // translate context to tank
        ctx.translate(x + 20, y + 4);
        // rotate to current turret angle
        ctx.rotate(-convertToRadians(angle));

        // draw turret
        ctx.fillRect(0, -5, 20, 3);
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // draw treads
        ctx.fillStyle = "#000000";
        ctx.fillRect(x - 2, y + 9, 34, 2);
    }

    function drawTrajectory(ctx, firing) {
        // if firing, draw projectile
        if (firing) {
            drawProjectile(ctx);
        }
    }

    function drawProjectile(ctx) {
        if (pjY <= height - 30) {
            if (pjX < wallX + 10 && pjX > wallX - 10 && pjY >= height - 30 - wallY) {
                craters = [...craters, { x: wallX - 3, y: pjY }];
                pjX = -Infinity;
                pjY = -Infinity;
            } else {
                ctx.fillStyle = "#334444";
                velY += gravity;
                pjX += velX;
                let x = pjX;
                pjY += velY;
                let y = pjY;

                ctx.fillRect(x, y, 4, 4);
            }
        } else {
            craters = [...craters, { x: pjX, y: height - 30 }];
            pjX = -Infinity;
            pjY = -Infinity;
            firing = false;
            velY = 0;
            velX = 0;
        }
    }

    function drawCraters(ctx) {
        console.log(craters);
        if (craters.length > 10) {
            craters = craters.slice(1);
        }
        ctx.fillStyle = "#cccccc";
        craters.forEach(({ x, y }) => {
            ctx.fillRect(x, y, 7, 7);
            // ctx.arc(x, y, 7, 0, Math.PI * 2);
        });
        // ctx.fill();
        ctx.setTransform(1, 0, 0, 1, 0, 0);

    }

    function drawWall(ctx) {
        ctx.fillStyle = "#614d28";
        ctx.fillRect(wallX, height - 29 - wallY, 10, wallY);
    }

    // util fns
    function convertToRadians(degree) {
        return degree * (Math.PI / 180);
    }

    function fire() {
        firing = true;
        pjX = xPos + 15;
        pjY = yPos;

        velX = parseInt(power * Math.cos(convertToRadians(angle)));
        velY = parseInt(power * -Math.sin(convertToRadians(angle)));
    }

    // UI fns
    function handleKeyPress(e) {
        if (e.key === "ArrowRight") {
            xPos += 2;
            if (xPos + 30 > wallX) {
                xPos = wallX - 30;
            }
        } else if (e.key === "ArrowLeft") {
            xPos -= 2;
            if (xPos < 0) {
                xPos = 0;
            }
        } else if (e.key === "ArrowUp") {
            angle += 1;
            if (angle > 180) {
                angle = 180;
            }
        } else if (e.key === "ArrowDown") {
            angle -= 1;
            if (angle < 0) {
                angle = 0;
            }
        } else if (e.key === "Enter" || e.key === " ") {
            fire();
        }
    }
</script>

<svelte:window on:keydown={handleKeyPress} />

<main>
    <section class="controls">
        <button on:click={() => (xPos -= 5)}>Left</button>
        <button on:click={() => (xPos += 5)}>Right</button>
        <label for="power">Power</label>
        <input type="range" name="power" id="power" min="5" max="20" bind:value={power} />
        <label for="angle">Angle</label>
        <input type="range" name="angle" id="angle" min="0" max="180" bind:value={angle} />
        <button on:click={fire}>FIRE!</button>
    </section>
    <canvas class="battleground" bind:this={canvas} {width} {height} />
</main>

<style>
    :global(body) {
        height: 100vh;
    }
    :global(*) {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    main {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
</style>

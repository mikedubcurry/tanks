<script>
    import { onMount } from "svelte";

    let power = 50;
    let angle = 90;
    let firing = false;

    let width = window.innerWidth - 50;
    let height = window.innerHeight - 250;
    let canvas;

    let xPos = 50;
    let yPos = height - 41;

    let pjX = xPos + 15;
    let pjY = yPos;

    onMount(() => {
        const ctx = canvas.getContext("2d");
        let frame = requestAnimationFrame(loop);

        function loop(t) {
            frame = requestAnimationFrame(loop);
            // draw bg
            ctx.fillStyle = "#cccccc";
            ctx.fillRect(0, 0, width, height);
            // draw ground
            ctx.fillStyle = "#614d28";
            ctx.fillRect(0, height - 30, width, height);

            // if firing, draw projectile
            if (firing) {
                ctx.fillStyle = "#334444";
                // ctx.fillStyle = "#fff";
                ctx.fillRect(
                    angle > 90 ? (pjX -= 8) : (pjX += 8),
                    angle > 90
                        ? (pjY += Math.tan(convertToRadians(angle + 180)) * 8)
                        : (pjY += Math.tan(-convertToRadians(angle)) * 8),
                    4,
                    4
                );
            }
            // draw tank body
            ctx.fillStyle = "#1c4623";
            ctx.fillRect(xPos, yPos, 30, 10);
            // translate context to tank
            ctx.translate(xPos + 20, yPos + 4);
            // rotate to current turret angle
            ctx.rotate(-convertToRadians(angle));

            // draw turret
            ctx.fillRect(0, -5, 20, 3);
            ctx.setTransform(1, 0, 0, 1, 0, 0);

            // draw treads
            ctx.fillStyle = "#000000";
            ctx.fillRect(xPos - 2, yPos + 9, 34, 2);
        }

        return () => {
            cancelAnimationFrame(frame);
        };
    });

    function convertToRadians(degree) {
        return degree * (Math.PI / 180);
    }

    function handleKeyPress(e) {
        if (e.key === "ArrowRight") {
            xPos += 2;
            if (xPos + 30 > width) {
                xPos = width - 30;
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
            firing = true;
            console.log("FIRING!");
            pjX = xPos + 15;
            pjY = yPos;
        }
    }
</script>

<svelte:window on:keydown={handleKeyPress} />

<main>
    <section class="controls">
        <button on:click={() => (xPos -= 5)}>Left</button>
        <button on:click={() => (xPos += 5)}>Right</button>
        <label for="power">Power</label>
        <input type="range" name="power" id="power" min="1" max="100" bind:value={power} />
        <label for="angle">Angle</label>
        <input type="range" name="angle" id="angle" min="0" max="180" bind:value={angle} />
        <button
            on:click={() => {
                console.log("FIRING!", "angle: ", angle, "power: ", power);
            }}>FIRE!</button
        >
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
    /* 
	.battleground {
		background-color: #1c4623;
	} */
</style>

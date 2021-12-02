<script>
	import { onMount } from 'svelte';

	let power = 50;
	let angle = 90;
	let xPos = 50;

	let width = window.innerWidth - 50;
	let height = window.innerHeight - 250;
	let canvas;

	onMount(() => {
		const ctx = canvas.getContext('2d');
		let frame = requestAnimationFrame(loop);

		function loop(t) {
			frame = requestAnimationFrame(loop);
			ctx.beginPath();
			ctx.clearRect(0, 0, width, height);
			ctx.beginPath();
			ctx.fillStyle = '#000000';
			ctx.rect(xPos, height - 11, 30, 10);
			ctx.stroke();

			ctx.translate(xPos + 20, height - 10);
			ctx.rotate(-convertToRadians(angle));
			ctx.rect(0, -5, 20, 3);
      ctx.stroke()
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			// ctx.translate(0, 0);
		}

		return () => {
			cancelAnimationFrame(frame);
		};
	});

	function convertToRadians(degree) {
		return degree * (Math.PI / 180);
	}

	function handleKeyPress(e) {
		if (e.key === 'ArrowRight') {
			xPos += 2;
			if (xPos + 30 > width) {
				xPos = width - 30;
			}
		} else if (e.key === 'ArrowLeft') {
			xPos -= 2;
			if (xPos < 0) {
				xPos = 0;
			}
		} else if (e.key === 'ArrowUp') {
			angle += 1;
			if (angle > 180) {
				angle = 180;
			}
		} else if (e.key === 'ArrowDown') {
			angle -= 1;
			if (angle < 0) {
				angle = 0;
			}
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
				console.log('FIRING!', 'angle: ', angle, 'power: ', power);
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

	/* .battleground {
		background-color: red;
	} */
</style>

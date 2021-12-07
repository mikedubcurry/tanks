<script>
	import { onMount } from 'svelte';

	let gameOver = false;
	let timeLeft = 60;
	let score = 0;
	let highScores = [];
	let power = 15;
	let angle = 45;
	let firing = false;
	const gravity = 0.4;

	let width = parseInt(window.innerWidth - 100);
	let height = parseInt(window.innerHeight - 250);
	let canvas;

	let xPos = 50;
	let yPos = height - 41;

	let pjX = xPos + 15;
	let pjY = yPos;
	let velX = 0;
	let velY = 0;

	let wallX = parseInt(width / 2);
	let wallY = parseInt(height / 3);

	let targetX = width + 15 - Math.floor((Math.random() * width) / 2);

	let craters = [];

	getHighScores();

	$: {
		if (timeLeft === 0) {
			if (score > 0) {
				// highScores = [...highScores, score].sort();
				highScores.push(score);
				let scores = highScores.sort().reverse();
				highScores = scores.slice(0, 5);
				localStorage.setItem('tanksHighScores', JSON.stringify(highScores));
			}
			gameOver = true;
		}
	}
	onMount(() => {
		const ctx = canvas.getContext('2d');
		let frame = requestAnimationFrame(loop);

		function loop(t) {
			drawScene(ctx);
			drawTrajectory(ctx, firing);
			drawWall(ctx);
			drawCraters(ctx);
			drawTank(ctx, xPos, yPos, angle);
			drawPowerMeter(ctx);
			drawAngle(ctx);
			drawScore(ctx);
			drawTime(ctx);
			if (!gameOver) frame = requestAnimationFrame(loop);
		}

		return () => {
			cancelAnimationFrame(frame);
		};
	});

	// canvas fns
	function drawScene(ctx) {
		// draw ground
		ctx.fillStyle = '#614d28';
		ctx.fillRect(0, height - 30, width, height);
		drawTarget(ctx);
		// draw bg
		ctx.fillStyle = '#cccccc';
		ctx.fillRect(0, 0, width, height - 30);
	}

	function drawTank(ctx, x, y, angle) {
		// draw tank body
		ctx.fillStyle = '#1c4623';
		ctx.fillRect(x, y, 30, 10);
		// translate context to tank
		ctx.translate(x + 20, y + 4);
		// rotate to current turret angle
		ctx.rotate(-convertToRadians(angle));

		// draw turret
		ctx.fillRect(0, -5, 20, 3);
		ctx.setTransform(1, 0, 0, 1, 0, 0);

		// draw treads
		ctx.fillStyle = '#000000';
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
				ctx.fillStyle = '#334444';
				velY += gravity;
				pjX += velX;
				let x = pjX;
				pjY += velY;
				let y = pjY;

				ctx.fillRect(x, y, 4, 4);
			}
		} else {
			if (pjX > targetX - 30 && pjX < targetX + 30) {
				targetX = width + 15 - Math.floor((Math.random() * width) / 2);
				if (score === 0) {
					score += 5;
				} else {
					score += 6;
				}
			}
			craters = [...craters, { x: pjX, y: height - 30 }];
			pjX = -Infinity;
			pjY = -Infinity;
			firing = false;
			velY = 0;
			velX = 0;
		}
	}

	function drawCraters(ctx) {
		if (craters.length > 10) {
			craters = craters.slice(1);
		}
		ctx.fillStyle = '#cccccc';
		craters.forEach(({ x, y }) => {
			ctx.fillRect(x, y, 7, 7);
		});
		ctx.setTransform(1, 0, 0, 1, 0, 0);
	}

	function drawWall(ctx) {
		ctx.fillStyle = '#614d28';
		ctx.fillRect(wallX, height - 29 - wallY, 10, wallY);
	}

	function drawTarget(ctx) {
		for (let i = 30; i > 1; i -= 10) {
			ctx.beginPath();
			ctx.arc(targetX, height - 30, i, 0, 2 * Math.PI, false);
			ctx.fillStyle = '#ffffff';
			ctx.fill();
			ctx.lineWidth = 3;
			ctx.strokeStyle = '#ff0000';
			ctx.stroke();
		}
	}

	function drawPowerMeter(ctx) {
		ctx.beginPath();
		ctx.strokeStyle = '#000';
		ctx.lineWidth = 2;
		ctx.rect(10, 10, 100, 8);
		ctx.stroke();
		ctx.fillStyle = '#00ff00';
		ctx.fillRect(11, 11, (power - 5) * 5 - 2, 6);
	}

	function drawAngle(ctx) {
		// ctx.moveTo(120, 10)
		ctx.fillStyle = '#000000';
		ctx.font = '24px sans serif';
		ctx.fillText(`${angle}°`, 120, 20);
	}

	function drawScore(ctx) {
		ctx.fillStyle = '#000000';
		ctx.font = '24px sans serif';
		ctx.fillText(`Score: ${score}`, width - 250, 20);
	}

	function drawTime(ctx) {
		if (timeLeft < 20) {
			ctx.fillStyle = '#ff0000';
		}
		ctx.fillText(`Time: ${timeLeft} s`, width - 130, 20);
	}

	// util fns
	function convertToRadians(degree) {
		return degree * (Math.PI / 180);
	}

	function fire() {
		firing = true;
		pjX = xPos + 15;
		pjY = yPos;

		if (score > 0) {
			score -= 1;
		}

		if (angle === 90) {
			velX = 0;
		} else {
			velX = parseInt(power * Math.cos(convertToRadians(angle)));
		}
		velY = parseInt(power * -Math.sin(convertToRadians(angle)));
	}

	function getHighScores() {
		let scores = JSON.parse(localStorage.getItem('tanksHighScores')) || [];
		scores.sort().reverse()
		if (scores) {
			highScores = scores;
		}
	}

	// UI fns
	function handleKeyPress(e) {
		if (e.key === 'ArrowRight' || e.key === 'l') {
			xPos += 2;
			if (xPos + 30 > wallX) {
				xPos = wallX - 30;
			}
		} else if (e.key === 'ArrowLeft' || e.key === 'h') {
			xPos -= 2;
			if (xPos < 0) {
				xPos = 0;
			}
		} else if (e.key === 'ArrowUp' || e.key === 'k') {
			angle += 1;
			if (angle > 180) {
				angle = 180;
			}
		} else if (e.key === 'ArrowDown' || e.key === 'j') {
			angle -= 1;
			if (angle < 0) {
				angle = 0;
			}
		} else if (e.key === 'Enter' || e.key === ' ') {
			fire();
		} else if (e.key === 'PageUp') {
			if (power < 25) {
				power += 1;
			} else {
				power === 25;
			}
		} else if (e.key === 'PageDown') {
			if (power > 5) {
				power -= 1;
			} else {
				power = 5;
			}
		}
	}

	function startGame() {
		gameOver = false
		timeLeft = 60;
		score = 0;
		function startTime() {
			let t = setTimeout(() => {
				timeLeft -= 1;
				clearTimeout(t);
				startTime();
			}, 1500);
		}
		startTime();
		// interval = setInterval(() => {
		// 	timeLeft -= 1;
		// }, 1000);
	}
</script>

<svelte:window on:keydown|preventDefault={handleKeyPress} />

<div>
	<h1>HTML5 Canvas Tank</h1>

	<button on:click={startGame}>Start</button>
</div>
<main>
	<canvas class="battleground" bind:this={canvas} {width} {height}
		>Your browser doesn't support HTML5 canvas element. :(</canvas
	>

	<section class="controls">
		<h2>Controls:</h2>
		<ul>
			<li>use left and right arrow keys to move the tank left and right *</li>
			<li>use up and down arrow keys to adjust angle of gun *</li>
			<li>press space or enter to fire a shot</li>
			<li>use page-up and page-down to adjust the power</li>
			<li>each target is worth 5 points, and each bullet costs you 1 point</li>
			<li>you have 60 seconds to hit as many targets as you can</li>
			<li>you can practice as long as you want, when you're ready, press "Start"!</li>
		</ul>
	</section>
	<section class="highscores">
		<h2>High Scores</h2>
		<ol>
			{#each highScores as scr}
				<li>{scr}</li>
			{:else}
				<p>Press Start to play and score higher than 0 to make it on the list!</p>
			{/each}
		</ol>
	</section>
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
		display: grid;
		grid-template-columns: 3fr 1fr;
		grid-template-rows: 80% auto;
	}

	canvas {
		grid-column: 1 / span 2;
		justify-self: center;
		align-self: flex-start;
	}
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 1.5rem;
	}
	button {
		border-radius: 14px;
		padding: 0.2rem 1.5rem;
		border: none;
		background-color: #1c4623;
		color: white;
		font-size: 1.5rem;
		transition: all 0.3s ease;
	}
	button:hover {
		background-color: #327d3e;
	}
	button:active {
		background-color: #3a6541;
	}
	.controls {
		padding: 0 2rem;
		grid-column: 1;
		grid-row: 2;
		justify-self: left;
		align-self: center;
	}
	.highscores {
		grid-column: 2;
		grid-row: 2;
		justify-self: left;
		align-self: stretch;
	}
	li {
		margin-bottom: 0.5rem;
	}
</style>

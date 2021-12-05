<script context="module">
	export const prerender = false;
	export const ssr = false;
</script>

<script>
	import Tile from '$lib/jsmatch/Tile.svelte';
	// import svelte from '$assets/svelte.png';
	// import css from '$assets/css.png';
	// import html from '$assets/html.png';
	// import ts from '$assets/typescript.png';
	// import angular from '$assets/angular.png';
	// import js from '$assets/js.png';
	// import node from '$assets/node.png';
	// import react from '$assets/react.png';

	let tiles = [
		{ src: '/svelte.png', faceDown: true, solved: false },
		{ src: '/css.png', faceDown: true, solved: false },
		{ src: '/svelte.png', faceDown: true, solved: false },
		{ src: '/html.png', faceDown: true, solved: false },
		{ src: '/js.png', faceDown: true, solved: false },
		{ src: '/css.png', faceDown: true, solved: false },
		{ src: '/react.png', faceDown: true, solved: false },
		{ src: '/angular.png', faceDown: true, solved: false },
		{ src: '/html.png', faceDown: true, solved: false },
		{ src: '/js.png', faceDown: true, solved: false },
		{ src: '/angular.png', faceDown: true, solved: false },
		{ src: '/typescript.png', faceDown: true, solved: false },
		{ src: '/node.png', faceDown: true, solved: false },
		{ src: '/react.png', faceDown: true, solved: false },
		{ src: '/typescript.png', faceDown: true, solved: false },
		{ src: '/node.png', faceDown: true, solved: false }
	].sort(() => 0.5 - Math.random());

	let selected = 0;
	let guesses = 0;
	let guessBox;

	$: {
		if (selected === 2) {
			let faceUp = tiles.filter((t) => !t.faceDown);
			if (faceUp.length === 2 && faceUp[0].src === faceUp[1].src) {
				tiles = tiles.map((t) => ({ ...t, solved: t.solved || t.src === faceUp[0].src }));
			}
			setTimeout(() => {
				tiles = tiles.map((t) => ({ ...t, faceDown: true }));
				selected = 0;
				guesses++;
			}, 1000);
		}
		if (selected > 2) {
			tiles = tiles.map((t) => ({ ...t, faceDown: true }));
			selected = 0;
		}
	}
	$: {
		if (tiles.filter((t) => t.solved).length === tiles.length) {
			guessBox.classList.add('winner');
			setTimeout(() => {
				tiles = tiles
					.sort(() => 0.5 - Math.random())
					.map((t) => ({ ...t, solved: false, faceDown: true }));
				guesses = 0;
				guessBox.classList.remove('winner');
			}, 3000);
		}
	}
</script>

<div bind:this={guessBox} class="guesses">Guesses: {guesses}</div>
<main>
	{#each tiles as { src, faceDown, solved }}
		<div>
			<Tile on:tileClicked={() => selected++} bind:faceDown {src} bind:solved />
		</div>
	{/each}
</main>

<style>
	:global(*, *::before, *::after) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	:global(body) {
		background-color: #444;
	}
	.guesses {
		/* width: 50px; */
		margin: 0 auto;
		height: fit-content;
		width: fit-content;
		padding: 5px 10px;
		/* height: 50px; */
		background-color: #4aa;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 2rem;
	}
	@keyframes win {
		to {
			filter: hue-rotate(360deg);
		}
	}
	:global(.winner) {
		animation: win 2s linear;
	}
	main {
		text-align: center;
		padding: 1em;
		margin: auto;
		width: 95vh;
		height: 95vh;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 5px;
	}
	div {
		width: calc(95vh / 4 - 20px);
		height: calc(95vh / 4 - 20px);
	}
	@media (orientation: portrait) {
		main {
			width: 95vw;
			height: 95vw;
		}
		div {
			width: calc(95vw / 4 - 20px);
			height: calc(95vw / 4 - 20px);
		}
	}
	@media (orientation: landscape) {
		main {
			width: 95vh;
			height: 95vh;
		}
		div {
			width: calc(95vh / 4 - 20px);
			height: calc(95vh / 4 - 20px);
		}
	}
</style>

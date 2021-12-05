<script>
	import { createEventDispatcher } from 'svelte';

	export let faceDown = false;
	export let src;
	export let solved = false;

	const dispatch = createEventDispatcher();
</script>

<div
	on:click={() => {
		if (!solved || faceDown) {
			faceDown = false;
			dispatch('tileClicked');
		}
	}}
	class:faceDown
	class:solved
	class="tile"
>
	<img {src} alt="a tile, what could it be?" />
</div>

<style>
	.tile {
		background-color: rebeccapurple;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 0.3s ease;
		position: relative;
		transform: rotateY(0deg);
	}

	.faceDown {
		transform: rotateY(180deg);
	}

	.faceDown::before {
		width: 100%;
		height: 100%;
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		background-color: #ddd;
		transition: all 0.3s ease;
	}
	.faceDown:hover::before {
		background-color: #fff;
	}
	.tile.solved {
		background-color: gold;
		transform: rotateY(0deg);
	}
	.solved::before {
		opacity: 0;
	}

	img {
		width: 90%;
	}
</style>

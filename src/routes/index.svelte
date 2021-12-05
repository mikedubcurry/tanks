<script lang="ts">
	import Card from '$lib/components/Card.svelte';

	const games: {
		title: string;
		description: string;
		img: { src: string; alt: string };
		url: string;
	}[] = [
		{
			title: 'Tanks',
			description: 'Control a tank and hit as many targets as you can in 60 seconds!',
			url: '/games/tanks',
			img: {
				src: 'tanks.png',
				alt: 'Tank game screenshot'
			}
		},
		{
			title: 'Bomb-Duster',
			description:
				'Click on tiles and flag each suspecting bomb. When all bombs are flagged, you win!',
			url: '/games/bomb-duster',
			img: {
				src: 'bomb-duster.png',
				alt: 'Bomb Duster screenshot'
			}
		},
		{
			title: 'JS-Match',
			description: 'Click the tiles to reveal a web-themed image. Match all the tiles to win!',
			url: '/games/js-match',
			img: {
				src: 'img-match.png',
				alt: 'JS-Match screenshot'
			}
		}
	];
</script>

<section id="#about">
	<h2>All Games</h2>
	<div class="games">
		{#each games as game}
			<Card {...game} />
		{/each}
	</div>
</section>


<style>
	h2 {
		text-align: center;
		font-family: 'Courier New', Courier, monospace;
		font-size: 28px;
		color: #555;
		text-shadow: 2px -1px 0 salmon;
		padding: 2rem 0;
	}
	section {
		max-width: 1024px;
		margin: 0 auto;
	}
	.games {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
		gap: 20px;
		justify-items: center;
	}
</style>

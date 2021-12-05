<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
</script>

<header>
	<h1><a href="/">Arcade</a></h1>

	<Nav />
</header>
<main>
	<slot />
</main>

<style>
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	main {
		background-color: rgb(142, 189, 166);
		min-height: 85vh;
	}
	h1 {
		font-family: 'Courier New', Courier, monospace;
		padding: 1rem 0.5rem;
		text-align: center;
		letter-spacing: 10px;
		font-size: 32px;
		text-shadow: 2px -1px 0 salmon;
	}
	a {
		text-decoration: none;
		color: #555;
	}
	header {
		background-color: antiquewhite;
		height: 15vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
	}
</style>

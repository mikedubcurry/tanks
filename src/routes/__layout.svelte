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
		color: saddlebrown;
	}
	header {
		background-color: antiquewhite;
	}
</style>

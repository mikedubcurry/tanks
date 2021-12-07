<script lang="ts">
	import { page } from '$app/stores';
</script>

<nav>
	<ul>
		<li><a class:active={$page.path === '/'} href="/">All Games</a></li>
		<li><a class:active={$page.path === '/leaderboard'} href="/leaderboard">High Scores</a></li>
		<li><a class:active={$page.path === '/new-games'} href="/new-games">New Games</a></li>
		<li><a class:active={$page.path === '/about'} href="/about">About</a></li>
	</ul>
</nav>

<style>
	nav {
		/* height: 10vh; */
		width: 100%;
		padding: 1rem 0;
	}

	ul {
		height: 100%;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
	}

	li {
		list-style: none;
	}

	a {
		text-decoration: none;
		color: brown;
		font-family: 'Courier New', Courier, monospace;
		font-weight: bold;
		font-size: 18px;
		transition: color 0.4s ease;
	}

	a:hover {
		color: blue;
	}

	a.active {
		color: rebeccapurple;
	}
</style>

<script lang="ts">
	export let title: string;
	export let description: string;
	export let img: { src: string; alt: string };
	export let url: string;
</script>

<div class="card">
	<a href={url}>
		<header>
			<h3>{title}</h3>
		</header>
		<img src={img.src} alt={img.alt} />
		<p>{description}</p>
	</a>
</div>

<style>
	.card {
		max-width: 400px;
    /* min-height: 456px; */
		background-color: salmon;
		border-radius: 14px;
		padding: 28px;
		transition: background-color 0.4s ease, transform 0.3s ease;
	}
	.card:hover {
		background-color: #f0988e;
		transform: translateY(-5px);
	}
	.card a {
		text-decoration: none;
		color: black;
	}

	img {
    height: 300px;
		width: 100%;
		object-fit: cover;
		object-position: left;
    margin: 1rem 0;
	}

	h3 {
		font-size: 24px;
		text-shadow: 1px 1px 0 white, -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white;
		font-family: 'Courier New', Courier, monospace;
	}
	p {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}
</style>

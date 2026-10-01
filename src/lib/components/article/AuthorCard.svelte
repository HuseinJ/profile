<script lang="ts">
	import { site } from '$lib/config/site';
</script>

<aside class="author" aria-label="About the author">
	<img src={site.image} alt="" width="96" height="96" />
	<div>
		<p class="name">{site.name}</p>
		<p class="about">{site.about}</p>
		<p class="contact">
			<a class="text-link" href="https://github.com/{site.github}">GitHub</a>
			<a class="text-link" href="https://www.linkedin.com/in/{site.linkedin}">LinkedIn</a>
		</p>
	</div>
</aside>

<style>
	.author {
		display: grid;
		grid-template-columns: 4.5rem minmax(0, 1fr);
		gap: 1.25rem;
		padding-top: 1.75rem;
		border-top: 2px solid var(--color-ink);
	}

	img {
		width: 4.5rem;
		height: 4.5rem;
		object-fit: cover;
		object-position: 50% 15%;
		border-radius: 50%;
		background: var(--color-rule);
	}

	.name {
		font-weight: 700;
	}

	.about {
		margin-top: 0.35rem;
		font-family: var(--font-text);
		line-height: 1.55;
		max-width: 34rem;
	}

	.contact {
		display: flex;
		gap: 1.25rem;
		margin-top: 0.75rem;
		font-size: var(--text-sm);
		color: var(--color-pine);
	}
</style>

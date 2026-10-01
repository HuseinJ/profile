<script lang="ts">
	import { site } from '$lib/config/site';
</script>

<footer class="footer">
	<div class="wrap inner">
		<ul class="profiles">
			<li><a href="https://github.com/{site.github}">GitHub</a></li>
			<li><a href="https://www.linkedin.com/in/{site.linkedin}">LinkedIn</a></li>
		</ul>

		<p class="copy">© {new Date().getFullYear()} {site.name}</p>
	</div>
</footer>

<style>
	.footer {
		margin-top: auto;
		background: var(--color-pine);
		color: var(--color-paper);
	}

	.inner {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: space-between;
		gap: 2rem;
		padding-block: clamp(3rem, 7vw, 5rem) 2rem;
	}

	.profiles {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem clamp(1.5rem, 4vw, 3rem);
	}

	.profiles a {
		font-size: clamp(1.75rem, 5vw, var(--text-3xl));
		font-weight: 750;
		font-stretch: 118%;
		letter-spacing: -0.01em;
		line-height: 1.1;
		color: var(--color-lichen);
		text-decoration: none;
		border-bottom: 3px solid transparent;
		transition: border-color 150ms;
	}

	.profiles a:hover {
		border-color: var(--color-lichen);
	}

	.profiles a:focus-visible {
		outline-color: var(--color-lichen);
	}

	.copy {
		font-size: var(--text-sm);
		color: color-mix(in srgb, var(--color-paper) 65%, transparent);
	}
</style>

<script lang="ts">
	import { site } from '$lib/config/site';

	const [firstName, lastName] = site.name.split(' ');
</script>

<section class="wrap hero" aria-labelledby="hero-name">
	<h1 id="hero-name" class="name">
		<span>{firstName}</span>
		<span>{lastName}</span>
	</h1>

	<figure class="portrait">
		<img src={site.image} alt="Portrait of {site.name}" width="800" height="800" />
	</figure>

	<div class="intro">
		<p class="lede">
			Software engineer. I build backend systems and spend a lot of time thinking about how they get attacked.
		</p>

		<div class="actions">
			<a class="primary" href="#writing">Read my writing</a>
			<a class="text-link" href="https://github.com/{site.github}">GitHub</a>
			<a class="text-link" href="https://www.linkedin.com/in/{site.linkedin}">LinkedIn</a>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 0.36fr);
		grid-template-areas:
			'name name'
			'intro portrait';
		column-gap: clamp(1.5rem, 4vw, 4rem);
		padding-block: clamp(1.5rem, 5vw, 4rem) clamp(4rem, 9vw, 7rem);
	}

	.name {
		grid-area: name;
		display: flex;
		flex-direction: column;
		font-size: clamp(4.25rem, 18vw, 16.25rem);
		font-weight: 850;
		font-stretch: 125%;
		line-height: 0.84;
		letter-spacing: -0.035em;
		color: var(--color-pine);
		animation: widen 1100ms cubic-bezier(0.2, 0.75, 0.15, 1) 150ms both;
	}

	/* The last name sits under the first, pushed right so the portrait can tuck into the gap. */
	.name span:last-child {
		padding-left: 0.04em;
	}

	@keyframes widen {
		from {
			font-stretch: 62%;
			letter-spacing: 0;
		}
	}

	.portrait {
		grid-area: portrait;
		align-self: start;
		margin-top: clamp(2rem, 5vw, 3.5rem);
		aspect-ratio: 4 / 5;
		background: var(--color-rule);
		overflow: hidden;
		border-radius: 3px;
	}

	.portrait img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 50% 20%;
	}

	.intro {
		grid-area: intro;
		align-self: start;
		padding-top: clamp(2rem, 5vw, 3.5rem);
	}

	.lede {
		font-family: var(--font-text);
		font-size: clamp(var(--text-lg), 2.2vw, 1.75rem);
		line-height: 1.45;
		max-width: 37rem;
		text-wrap: pretty;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1rem 1.75rem;
		margin-top: 2rem;
	}

	.primary {
		display: inline-block;
		padding: 0.85rem 1.4rem;
		background: var(--color-pine);
		color: var(--color-paper);
		font-weight: 650;
		text-decoration: none;
		border-radius: 3px;
		transition: background-color 150ms;
	}
	.primary:hover {
		background: var(--color-pine-deep);
	}

	@media (max-width: 44rem) {
		.hero {
			grid-template-columns: minmax(0, 1fr);
			grid-template-areas:
				'name'
				'portrait'
				'intro';
		}

		.name {
			font-size: clamp(3.25rem, 21vw, 9rem);
		}

		.portrait {
			margin-top: 1.5rem;
			aspect-ratio: 3 / 2;
		}

		.portrait img {
			object-position: 50% 22%;
		}
	}
</style>

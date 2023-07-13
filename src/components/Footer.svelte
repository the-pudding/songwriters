<script>
	import { onMount } from "svelte";
	import inView from "$actions/inView.js";
	import wordmark from "$svg/wordmark.svg";

	let localURL;
	let stories = [];

	const v = Date.now();
	const url = `https://pudding.cool/assets/data/stories.json?v=${v}`;

	const links = [
		{ name: "about", url: "https://pudding.cool/about" },
		{ name: "facebook", url: "https://facebook.com/pudding.viz/" },
		{ name: "twitter", url: "https://twitter.com/puddingviz/" },
		{
			name: "instagram",
			url: "https://www.instagram.com/the.pudding"
		},
		{ name: "patreon", url: "https://patreon.com/thepudding/" },
		{ name: "privacy", url: "https://pudding.cool/privacy/" },
		{ name: "newsletter", url: "https://thepuddingmail.substack.com" },
		{ name: "rss", url: "https://pudding.cool/feed/index.xml" }
	];

	onMount(async () => {
		localURL = window.location.href;
		const response = await fetch(url);
		const data = await response.json();
		stories = data.filter((d) => !localURL.includes(d.url)).slice(0, 4);
	});
</script>



<div class="center-col promote">
	<p class="para">Enjoy this project? Consider helping fund us on Patreon.</p>
	<a class="button" target="_blank" href="https://patreon.com/thepudding" rel="noopener">
		<button type="button" name="button">Become a Patron
		</button>
	</a>
	<p class="para">You should subscribe to our newsletter too.</p>
	<a class="button button-purp" target="_blank" href="https://thepuddingmail.substack.com/" rel="noopener">
		<button type="button" name="button">Join the Newsletter
		</button>
	</a>
	<div class="">
		<p class="para">Or follow us on <a target="_blank" href="https://www.instagram.com/the.pudding" rel="noopener">Instagram</a>, <a target="_blank" href="https://twitter.com/puddingviz" rel="noopener">Twitter</a>, <a target="_blank" href="https://www.youtube.com/thepudding" rel="noopener">YouTube</a>, and <a href="/feed/index.xml">RSS</a>.</p>
	</div>
</div>

<footer>
	<section class="stories">
		{#each stories as { hed, url, image }}
			{@const href = url.startsWith("http")
				? url
				: `https://pudding.cool/${url}`}
			<div class="story">
				<a {href}>
					<img
						src="https://pudding.cool/common/assets/thumbnails/640/{image}.jpg"
						alt="thumbnail"
					/>
					<span>{hed}</span>
				</a>
			</div>
		{/each}
	</section>

	<section class="about">
		<div class="wordmark">
			{@html wordmark}
		</div>
		<p>
			<a href="https://pudding.cool" target="_self">The Pudding</a>
			is a digital publication that explains ideas debated in culture with visual
			essays.
		</p>
	</section>

	<section class="links">
		<ul>
			{#each links as link}
				<li>
					<a href={link.url} target="_self">
						<span>{link.name.toUpperCase()}</span>
					</a>
				</li>
			{/each}
		</ul>
	</section>
</footer>

<style>
	.button button {
		padding: 10px 20px;
		background-color: var(--color-women);
    	border-radius: 3px;
		color: var(--color-bg);
		font-weight: 300;
		margin-bottom: 30px;
		font-size: 18px;
	}
	.button-purp button {
		background-color: var(--color-men);
		color: var(--color-fg);
		font-weight: 400;
	}
	.button {
		margin: 0 auto;
	}
	.promote {
		margin-top: 50px;
		border-top: 1px solid var(--color-fg);
		display: flex;
		flex-direction: column;
	}

	.promote a {
		border: none;
		text-decoration: underline;
	}

	.button {
		text-decoration: none;
	}

	.para a, .para a:visited {
		color: var(--color-fg);
	}

	.promote .para {
		text-align: center;
		font-size: 18px;
		margin-bottom: 20px;
	}
	footer {
		background-color: var(--color-fg);
		color: var(--color-bg);
		font-family: var(--sans);
		padding: 3em 1em;
		margin-top: 3em;
	}

	footer a,
	footer a:visited,
	footer a:hover {
		color: var(--color-bg);
	}

	.stories {
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		max-width: 70em;
	}

	.story {
		display: block;
		width: 100%;
		border: none;
		margin-bottom: 3rem;
	}

	.story a {
		display: block;
		font-weight: 900;
		text-decoration: none;
		border: none;
	}

	.story span {
		display: block;
		margin-top: 1em;
		line-height: 1.2;
	}

	.wordmark {
		max-width: 10em;
		margin: 1em auto;
	}

	.about {
		margin: 3rem auto;
		margin-top: 0;
		text-align: center;
	}

	.links ul {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.links li {
		display: flex;
		padding: 0.5em 1em;
	}

	.links a {
		display: flex;
		border: none;
		align-items: center;
		text-decoration: none;
	}

	.links span {
		margin-left: 0.5em;
	}

	@media only screen and (min-width: 30em) {
		.story {
			width: 50%;
			padding: 0 1em;
		}
	}

	@media only screen and (min-width: 50em) {
		.story {
			width: 25%;
			padding: 0 1em;
		}
	}
</style>
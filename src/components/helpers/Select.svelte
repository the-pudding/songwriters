<script>
	export let options = [];
	export let label = "";
	export let disabled = false;
	export let value = options.length ? options[0].value : "";

	const id = `select-${Math.floor(Math.random() * 1000000)}`;

</script>

<div class="select">
	{#if label}
		<label for={id}>{label}</label>
	{/if}
	<select {id} bind:value {disabled}>
		{#each options as option}
			<option>{option.label || option.value}</option>
		{/each}
	</select>
</div>

<style>
	.select {
		position: relative;
		padding-right: 30px;
	}

	label {
		display: inline-block;
		font-family: inherit;
		font-weight: inherit;
		font-size: 1em;
		margin-bottom: 0.25em;
	}

	select {
		width: 100%;
		height: 30px;
		font-family: inherit;
		font-size: 1em;
		cursor: pointer;
		background: var(--color-white);
		color: var(--color-gray-900);
		border: none;
		border-radius: 0;
		padding: 0.5em;
		appearance: none;
		line-height: 1.4;
		color: var(--color-fg);
		background: none;
		padding: 0;
		align-self: center;
		font-size: 16px;
		border-bottom: 1px solid rgba(255,250,215,.5);

	}

	select::-ms-expand {
		display: none;
	}

	.select::after {
		display: block;
		content: "";
		position: absolute;
		bottom: .7em;
		right: 0.5em;
		width: 1em;
		height: 1em;
		z-index: 1;
		background: var(--color-fg);
		clip-path: polygon(0% 0%, 55% 55%, 0% 55%);
		border-radius: 0px;
		transform-origin: center center;
		transform: rotate(-45deg);
		pointer-events: none;
	}

	select:focus {
		box-shadow: 0 0 4px 0 var(--color-focus);
	}

	.select:disabled {
		cursor: not-allowed;
		background-color: var(--color-gray-300);
	}
</style>

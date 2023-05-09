<script>
	import Toggle from "$components/helpers/Toggle.svelte";

    export let value;
    export let label;

	let valueInner;
	let valueSlider;
</script>

<section id="demo-toggle">
	<Toggle options={[true,false]} label={label} style="inner" bind:value={value} />
</section>

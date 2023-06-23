<script>
    import Select from "$components/helpers/Select.svelte";

    export let value;
    export let options;

    // $: value = yearStart
</script>

<div class="year">	
    <Select label={""} options={options} bind:value={value} />
</div>

<style>
    .year {
	}
</style>
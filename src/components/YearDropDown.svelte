<script>
    import Select from "$components/helpers/Select.svelte";

    export let value;
    export let yearsArray;

    // $: value = yearStart
</script>

<div class="year">	
    <Select label={""} options={yearsArray} bind:value={value} />
</div>

<style>
    .year {
		width: 100px;
	}
</style>
<script>
	import { getContext } from "svelte";
	import Bubble from '$components/Bubble.svelte';
	import IntroSong from '$components/Intro.song.svelte'
	import IntroAll from '$components/Intro.all.svelte'
	import Demo from "$components/demo/Demo.svelte";
	import Body from "$components/Body.svelte"
	import { groups } from "d3";

	// import Footer from "$components/Footer.svelte";

	// const copy = getContext("copy");
	const data = getContext("data");
    let dataByYear = groups(data.slice(0,500), d => d.year);

</script>

<IntroAll />

<IntroSong {dataByYear}/>

<Body />


<Bubble />
<!-- <Demo /> -->
<style>


</style>
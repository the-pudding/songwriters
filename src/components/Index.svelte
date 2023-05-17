<script>
	import { getContext } from "svelte";
	import Bubble from '$components/Bubble.svelte';
	import IntroSong from '$components/Intro.song.svelte'
	import IntroAll from '$components/Intro.all.svelte'
	import Demo from "$components/demo/Demo.svelte";
	import Female from "$components/Body.femaleOnly.svelte"

	import { groups } from "d3";

	// import Footer from "$components/Footer.svelte";

	// const copy = getContext("copy");
	const data = getContext("data");
    let dataByYear = groups(data, d => d.year);

    let dataByGender = groups(data.filter(d => d.cut == "only women"), d => d.artist_gender, v => v.year);

</script>


<p class="center-col para">
    Between 2020 and 2022, there were only 3 songs to crack the top 5 of the Billboard Hot 100 that were written exclusively by women: “Running Up that Hill (A Deal with God)” by Kate Bush, “All Too Well (10 Minute Version)” by Taylor Swift, and “Dance Monkey” by Tones and I. How far back do you think we have to go before we find another?
</p>

<!-- <IntroAll /> -->

<IntroSong {dataByYear}/>

<p class="center-col para">
	And they are both by Taylor Swift. That means that if Taylor Swift didn’t exist, there would only be a pair of top 5 hits written exclusively by women between 2010 and 2022. One of those two songs - “Running Up that Hill (A Deal with God)” - was written in 1985 and only saw resurgence because it was featured in the hit Netflix show Stranger Things.
</p>




<Female {dataByGender}/>

<p class="center-col para">
	Note how women who wrote more than half of these songs were vocalists in the performing groups. Furthermore, when they weren’t they often were singers and released the song at an earlier time. For example, “Wedding Bell Blues” topped the charts in 1969 by The Fifth Dimension, but it was first released by its songwriter, Laura Nyro, 2 years earlier. Nyro sang on the track.
</p>

<p class="center-col para">
	None of this should come as a shock. Though women have been systematically excluded from nearly every role in music, they have been accepted as singers. In fact, you will seldom find a hit female songwriter who is not also a singer. Sophia Somajo, who co-wrote Britney Spears’s number one hit “3”, noted in 2018 that “Being young and a woman [she] could only be a singer, and that was it.” She wasn’t trusted as a writer until she first proved herself as a vocalist.
</p>

<p class="center-col para">
	You cannot talk about the history of music without talking about sexism. In fact, you don’t have to look far to find evidence of men actively limiting the musical activities that women were allowed to be involved in.
</p>

<p class="center-col para">
	In 1860, an unknown author was disturbed that female cellists would have to straddle their instruments: “Lady-fiddlers we are tolerably well accustomed to, but the attitude of a lady grasping with all her limbs a violoncello is one to the grotesqueness of which usage has not yet reconciled us.” A few decades later, composer Gustave Kerker expressed his distaste for how certain instruments distorted female faces: “Women cannot possibly play brass instruments and look pretty, and why should they spoil their good looks?” Around the same time, critic George Upton wrote in his book Woman in Music about how women’s emotions made them great song interpreters (i.e., vocalists) but prevented them from writing great works.
</p>
<p class="center-col para">
	A century-plus later, it’s clear that there is still so much progress to be made. And that’s just in terms of creating more equity generally for women in the music industry. Below, we provide you with a tool to sift through the artist and songwriter gender data that we gathered. You will quickly see that women are still actively impeded from songwriting at the highest levels of the pop world, and that women of color face even more impediments.
</p>

<Bubble />
<!-- <Demo /> -->
<style>


</style>
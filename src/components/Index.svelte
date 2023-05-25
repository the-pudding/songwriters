<script>
	import { getContext } from "svelte";
	import Bubble from '$components/Bubble.svelte';
	import IntroSong from '$components/Intro.song.svelte'
	import IntroAll from '$components/Intro.all.svelte'
	import Demo from "$components/demo/Demo.svelte";
	import Female from "$components/Body.femaleOnly.svelte"
	import Waffle from "$components/Waffle.svelte"
	import WaffleWriter from "$components/WaffleWriter.svelte";
	import { groups } from "d3";

	// import Footer from "$components/Footer.svelte";

	// const copy = getContext("copy");
	const data = getContext("data");

	const songs = data.songs;
	const writerKey = data.writerKey;

    let dataByYear = groups(songs, d => d.year);
    let dataByGender = groups(songs.filter(d => d.cut == "only women"), d => d.artist_gender, v => v.year);
	let dataByYearWomenOnly = groups(songs.filter(d => d.cut == "only women").map(function(d){
		d["songwriters"] = writerKey.get(d.song_key.toLowerCase());
		return d;
	}), v => v.year)

	let waffleWriterData = songs.map((d) => {
		d["songwriters"] = writerKey.get(d.song_key.toLowerCase());
		return d;
	})

	let textFirst = {
        0: "",
        1: "There’s a few with some female writers …",
        2: "But mostly men …",
        4: "It’s been 5 years. How long is this going to take???",
        7: "This is getting ridiculous",
        9: "Wait! Here are 2 …"
    }

	let textSecond = {
        0: "",
        1: "Between 2000 and 2022, there were 446 top 5 hits written exclusively by men—tk% of songs.",
		4: "",
    }

	let slides= [
        "tk point to expand to inception",
        "Note how all of these songs were performed by women. Men rarely perform hits written exclusively by women. In fact, there are only 13 top 5 hits since the inception of the Hot 100 written exclusively by women and performed exclusively by men.",
        "Even if we expand our search to top 5 hits written exclusively by women and performed by groups that contain at least one woman, the list of songs only grows by 16."
		// ,
		// "Note how women who wrote more than half of these songs <span class=red>were vocalists<span> in the performing groups."
    ]



</script>


<p class="center-col para">
    Between 2020 and 2022, 65 songs cracked the top 5 of the Billboard Hot 100 that were exclusively by men. In that same period, there were only 3 written exclusively by women: “Running Up that Hill (A Deal with God)” by Kate Bush, “All Too Well (10 Minute Version)” by Taylor Swift, and “Dance Monkey” by Tones and I. How far back do you think we have to go before we find another?
</p>

<!-- <IntroAll /> -->

<IntroSong dataByYear={dataByYear.filter(d => +d[0] < 2020 && +d[0] > 2009)} text={textFirst}/>

<p class="center-col para">
	And the songwriting credits were Taylor Swift herself. That means that if Taylor Swift didn’t exist, there would only be a pair of top 5 hits written exclusively by women between 2010 and 2022. One of those two songs - “Running Up that Hill (A Deal with God)” - was written in 1985 and only saw resurgence because it was featured in the hit Netflix show Stranger Things.
</p>
<p class="center-col para">
	If we keep going back into the past, things don’t look better.
</p>

<!-- <IntroSong dataByYear={dataByYear.filter(d => +d[0] < 2010 && +d[0] > 1999)} text={textSecond}/> -->

<p class="center-col para">
	To recap the results from the past 22 years and 800 songs, there have been so few top 5 hits written exclusively by women that I can list them all.
</p>


<Female {dataByGender} {dataByYearWomenOnly} {slides}/>

<p class="center-col para">
	Furthermore, when they weren’t they often were singers and released the song at an earlier time. For example, “Wedding Bell Blues” topped the charts in 1969 by The Fifth Dimension, but it was first released by its songwriter, Laura Nyro, 2 years earlier. Nyro sang on the track.
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

<WaffleWriter data={waffleWriterData}/>

<Waffle data={data.songs}/>


<Bubble data={data.songs}/>
<!-- <Demo /> -->
<style>


</style>
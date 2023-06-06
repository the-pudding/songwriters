<script>
	import { getContext } from "svelte";
	import Bubble from '$components/Bubble.svelte';
	import IntroSong from '$components/Intro.song.svelte'
	import IntroAll from '$components/Intro.all.svelte'
	import Demo from "$components/demo/Demo.svelte";
	import Female from "$components/Body.femaleOnly.svelte"
	import Waffle from "$components/Waffle.svelte"
	import WaffleWriter from "$components/WaffleWriter.svelte";
	import IntroAnimation from "$components/Intro.animation.svelte"
	import { groups } from "d3";
	import Treemap from "$components/Treemap.svelte";
	import Line from "$components/Line.svelte"

	// import Footer from "$components/Footer.svelte";

	// const copy = getContext("copy");
	const data = getContext("data");

	const songs = data.songs;
	const writerKey = data.writerKey;
	let writersByYear = data.writersByYear;
	
	
	console.log(data)

	let priorOne = {
		"no men":0,
		"no women": 0,
		"only women": 0,
		"at least 1 woman":0
	}

	let priorTwo = {
		"no men":0,
		"no women": 169,
		"only women": 2,
		"at least 1 woman":139
    }

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

	let introAnimationText = [
		"Last year, a study by the Annenberg Institute found that only 14% of songs are written by women.",
		"As depressing as this might seem, what’s shocking is how often tracks are written exclusively by an all-men songwriting team.",
	]

	let textFirst = {
        0: "In 2021, one song was written exclusively by women in 2022: Taylor Swift’s “All Too Well,” co-written with Liz Rose.",
		1: "In 2020, Tones and I wrote her own hit, “Dance Monkey.”",
        2: "Nothing in 2019.",
        3: "and 2018…",
		4: "…",
        6: "It’s been 5 years. How long is this going to take???",
        10: "This is getting ridiculous",
        11: "Wait! Here are 2 …"
    }

	let textSecond = {
        0: "",
        1: "tk point",
		4: "",
		6: "tk point"
    }

	let slides= [
        "There have been so few top 5 hits written exclusively by women that I can list them all.",
        "Not only are these songs all written by women, they are also performed by women. When women write songs, men rarely perform them.",
    ]

	let slidesTwo = [
		"Only 187 of the 2,XXX songs were written by women.",
		"There are only 13 top 5 hits written exclusively by women and performed exclusively by men.",
		"Even if we expand our search to top 5 hits written exclusively by women and performed by groups that contain at least one woman, the list of songs only grows by 16.",
		"Note how women who wrote more than half of these songs <span class=red>were vocalists<span> in the performing groups."
	]

</script>

<IntroAnimation text={introAnimationText} />

<p class="center-col para">
    In 2022, 42 songs cracked the top 5 of the Billboard Hot 100, but only 1 was written exclusively by women.
</p>

<p class="center-col para">
	Songs written by <i>just</i> women are rarer than you think. How often has it happened in the past 10 years?
</p>

<!-- <IntroAll /> -->

<IntroSong dataByYear={dataByYear.filter(d => +d[0] < 2022 && +d[0] > 2009)} text={textFirst} priorStats={priorOne}/>

<p class="center-col para">
	Both are performed and written by Taylor Swift. This common—TK point about women performers also being songwriters (which we’ll explore more later). 
</p>
<div class="center-col">
	<h1>Women are superstars on stage but still rarely get to write songs</h1>
	<h3>The Gender Breakdown of Songwriting Teams</h3>
	<p>by chris dalla riva</p>
</div>
<p class="center-col para">
	To recap the results from the past 22 years…
</p>

<!-- <IntroSong dataByYear={dataByYear.filter(d => +d[0] < 2010 && +d[0] > 1999)} text={textSecond} priorStats={priorTwo}/> -->

<Female {dataByYear} {dataByGender} {dataByYearWomenOnly} cut="one" {slides} yearRange={[1999,2023]}/>

<p class="center-col para">
	Let’s explore how rare it is for women to write songs for men to perform. First, we’ll look at every hit song since the start of the Billboard charts, beginning in 1958.
</p>

<p class="center-col para">
	The results do not look much different: very few songs are written exclusively by women.
</p>

<Female {dataByYear} {dataByGender} {dataByYearWomenOnly} cut="two" slides={slidesTwo} yearRange={[1957,2023]}/>

<p class="center-col para">
	Furthermore, when they weren’t, they often were singers and released the song at an earlier time. For example, “Wedding Bell Blues” topped the charts in 1969 by The Fifth Dimension, but it was first released by its songwriter, Laura Nyro, 2 years earlier. Nyro sang on the track.
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
	A century-plus later, it’s clear that there is still so much progress to be made.
</p>
<p class="center-col para">
	TK transition to points about trends
</p>

<Line dataByYear={writersByYear} />

<p class="center-col para">
	And that’s just in terms of creating more equity generally for women in the music industry. Below, we provide you with a tool to sift through the artist and songwriter gender data that we gathered. You will quickly see that women are still actively impeded from songwriting at the highest levels of the pop world, and that women of color face even more impediments.
</p>


<!-- <WaffleWriter data={waffleWriterData}/> -->

<!-- <Waffle data={data.songs}/> -->


<Bubble data={data.songs}/>
<!-- <Demo /> -->
<style>

</style>
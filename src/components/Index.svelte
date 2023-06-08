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
	let cutCategories = data.cutCategories;
	
	

	let priorOne = {};
	cutCategories.forEach(d => {
		priorOne[d] = 0;
	})

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
		"Last year, a study by the Annenberg Institute found that only 14% of songwriters were women.",
		"What might be even more alarming is how often women are outnumbered by men in songwriting teams.",
	]

	let textFirst = {
        0: "In 2021, there was one: Taylor Swift’s “All Too Well,” a song written by Swift with Liz Rose.",
		1: "A year prior, Toni Watson, known as Tones and I, wrote her own hit, “Dance Monkey.”",
        2: "But there were none in 2019",
        3: "or 2018…",
		4: "or 2017…",
		5: "or 2016…",
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
		"Only 187 of the 3,082 top 5 hits were written exclusively by women.",
		"Of those 187, only 13 were performed exclusively by men.",
		"Even if we expand our search to top 5 hits written exclusively by women and performed by groups with men and women, that list of songs only grows by 16.",
		"Note how women who wrote more than half of these songs were vocalists in the performing groups."
	]

</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
</svelte:head>

<IntroAnimation text={introAnimationText} />

<p class="center-col para">
    In 2022, 42 songs cracked the top 5 of the Billboard Hot 100, but only 1 was written exclusively by women. That one song - Kate Bush’s “Running Up that Hill (A Deal with God)” - was written in 1985 and only saw a resurgence because it was featured in the popular Netflix show <i>Stranger Things</i>.
</p>

<p class="center-col para">
	Songs written by <i>just</i> women are rarer than you think. How often do you think a top 5 hit has been written just by women in the last 10 years?
</p>

<!-- <IntroAll /> -->

<p class="chart-hed">top 5 hits and their songwriting teams.</p>

<IntroSong dataByYear={dataByYear.filter(d => +d[0] < 2022 && +d[0] > 2009)} text={textFirst} priorStats={priorOne}/>

<p class="center-col para">
	And both were written and performed by Taylor Swift. This is common: women songwriters generally perform the song too; it’s rare for women to hold the role of “songwriter” only (more on this later).  
</p>
<div class="center-col">
	<h1>Women are superstars on stage but still rarely get to write songs</h1>
	<h3>The Gender Breakdown of Songwriting Teams</h3>
	<p>by chris dalla riva, design by ashley cai</p>
</div>
<p class="center-col para">
	To recap the results from the past 22 years…
</p>

<!-- <IntroSong dataByYear={dataByYear.filter(d => +d[0] < 2010 && +d[0] > 1999)} text={textSecond} priorStats={priorTwo}/> -->

<p class="chart-hed">Gender breakdown of Top 5 Hits, 2000-2022</p>

<Female {dataByYear} {dataByGender} {dataByYearWomenOnly} cut="one" {slides} yearRange={[1999,2023]}/>

<p class="center-col para">
	Let’s explore how rare it is for women to write songs for men to perform. First, we’ll look at every hit song since the start of the Billboard Hot 100 in 1958.
</p>

<p class="chart-hed">Gender breakdown of Top 5 Hits, 1958-2022</p>
<Female {dataByYear} {dataByGender} {dataByYearWomenOnly} cut="two" slides={slidesTwo} yearRange={[1957,2023]}/>

<p class="center-col para">
	Women often singing the songs that they wrote might seem like a trifling detail, but it actually suggests something more vital: You cannot talk about the history of music without talking men actively limiting the musical activities that women were allowed to participate in.
</p>

<p class="center-col para">
	In 1860, an unknown author was disturbed that female cellists would have to straddle their instruments: “Lady-fiddlers we are tolerably well accustomed to, but the attitude of a lady grasping with all her limbs a violoncello is one to the grotesqueness of which usage has not yet reconciled us.” A few decades later, composer Gustave Kerker expressed his distaste for how certain instruments distorted female faces: “Women cannot possibly play brass instruments and look pretty, and why should they spoil their good looks?” Around the same time, critic George Upton wrote in his book Woman in Music about how women’s emotions made them great song interpreters (i.e., vocalists) but prevented them from writing great works.
</p>

<p class="center-col para">
	Upton’s comment is an example of a pernicious piece of sexism that still lives on more than a century later. Before women can be taken seriously as songwriters, they must first prove that they are capable vocalists.
</p>

<p class="center-col para">
	A century-plus later, it’s clear that there is still so much progress to be made.
</p>
<p class="chart-hed">
	In 2022, women represented 14% of songwriters among Top 5 Billboard hits, a number that hasn't in changed 60 years.
</p>
<Line dataByYear={writersByYear} />

<p class="center-col para">
	Below, we provide you with a tool to sift through the artist and songwriter gender data that we gathered. You will quickly see that women are still actively impeded from songwriting at the highest levels of the pop world, and that women of color face even more impediments.
</p>


<!-- <WaffleWriter data={waffleWriterData}/> -->

<!-- <Waffle data={data.songs}/> -->


<Bubble data={waffleWriterData} />
<!-- <Demo /> -->
<style>
</style>
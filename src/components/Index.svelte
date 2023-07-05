<script>
	import { getContext, onMount } from "svelte";
	import Bubble from '$components/Bubble.svelte';
	import IntroSong from '$components/Intro.song.svelte'
	import IntroAll from '$components/Intro.all.svelte'
	import Demo from "$components/demo/Demo.svelte";
	import Female from "$components/Body.femaleOnly.svelte"
	import Waffle from "$components/Waffle.svelte"
	import WaffleWriter from "$components/WaffleWriter.svelte";
	import IntroAnimation from "$components/Intro.animation.svelte"
	import { groups, group } from "d3";
	import Treemap from "$components/Treemap.svelte";
	import Line from "$components/Line.svelte"
	import Sparkle from "./Sparkle.svelte";
	import { format, rollup } from "d3";

	import SongData from "$data/artists.csv"
	import WriterData from "$data/writers.csv"
	import Quote from "$data/quote.csv"
	import SmallSparkle from "./SmallSparkle.svelte";
	import Headline from "./Headline.svelte";

 
	// import Footer from "$components/Footer.svelte";

	const copy = getContext("copy");
	const data = getContext("data");



	let dataReady;





	const songs = data.songs;
	const writerKey = data.writerKey;
	let writersByYear = data.writersByYear;
	let cutCategories = data.cutCategories;
	const comma = format(",");

	let priorOne = {};
	cutCategories.forEach(d => {
		priorOne[d] = 0;
	})

    let dataByYear = groups(songs, d => d.year);
	let dataByYearTwo;
	let writersByYearTwo;
	let waffleWriterDataTwo;

    let dataByGender = groups(songs.filter(d => d.cut == "only women"), d => d.artist_gender, v => v.year);
	let dataByYearWomenOnly = groups(songs.filter(d => d.cut == "only women").map(function(d){
		d["songwriters"] = writerKey.get(d.song_key.toLowerCase());
		return d;
	}), v => v.year)


	let waffleWriterData = songs.map((d) => {
		d["songwriters"] = writerKey.get(d.song_key.toLowerCase());
		return d;
	})

	let introAnimationText = copy["intro"].map(d => d.value);
	// [
	// 	"In 2022, hit songs had, on average, 6 songwriters: <span class=woman-color>1 woman</span> and <span class=man-color-text>5 men</span>.",
	// 	"But the average conceals a remarkable fact about the 42 songs that charted in top 5 of Billboard Hot 100...",
	// 	"Half of the songs had a songwriting team of all men.",
	// 	"Only one song had a songwriting team consisting of just women.",
	// ]

	let textFirst = copy["longScroll"][0];
	// {
    //     0: "In 2021, there was one: <span class=woman-color>Taylor Swift’s “All Too Well,”</span> a song written by Swift with Liz Rose.",
	// 	1: "A year prior, Toni Watson, known as Tones and I, wrote her own hit, <span class=woman-color>“Dance Monkey.”</span>",
    //     2: "But there were none in 2019",
    //     3: "or 2018…",
	// 	4: "or 2017…",
	// 	5: "or 2016…",
    //     6: "It’s been 5 years. How long is this going to take???",
    //     10: "This is getting ridiculous",
    //     11: "Wait! <span class=woman-color>Here are 2…</span>"
    // }

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

	let slidesTwo = copy["waffle"].map(d => d.value)
	// [
	// 	"Only 187 of the 3,082 top 5 hits were written exclusively by women.",
	// 	"Of those 187, only 13 were performed exclusively by men.",
	// 	"Even if we expand our search to top 5 hits written exclusively by women and performed by groups with men and women, that list of songs only grows by 16.",
	// 	"Note how women who wrote more than half of these songs were vocalists in the performing groups."
	// ]

	let genderKey = {
		"m":"m",
		"f":"f",
		"nb":"nb",
		"pf":"f",
		"pm":"m"
	}
	let availableGenders = Object.keys(genderKey);


	const getGenderArray = (v) => {
		return v.map(d => {
			return genderKey[d.gender];
		});
	}

	const getCutTwo = (genderArray) => {

		let cutTwo = "mixed, majority men";


		let countOfSongwriters = genderArray.length;
		let countOfWomen = genderArray.filter(d => d == "f").length;
		let countOfNB = genderArray.filter(d => d == "nb").length;

		let percent = countOfWomen/countOfSongwriters;
		
		let countOfMen = genderArray.filter(d => d == "m").length;

		if(countOfNB > 0 && percent == 0) {
			percent = 1 - (countOfMen / countOfSongwriters);
		}
		
		if(countOfMen == countOfSongwriters){
			cutTwo = "only men";
		}
		else if(countOfWomen == countOfSongwriters) {
			cutTwo = "only women";
		}
		else if(countOfWomen/countOfSongwriters == .5) {
			cutTwo = "parity";
		}
		else if(countOfWomen/countOfSongwriters > .5) {
			cutTwo = "mixed, majority women";
		};
		return [percent,cutTwo]
		
	}

	onMount(() => {

		let writersWithSongData = [];

		let writersGrouped = rollup(WriterData.filter(d => {
			return availableGenders.indexOf(d.gender) > -1;
		}), v => {
			let genderArray = getGenderArray(v);
			let cutTwo = getCutTwo(genderArray);
			return { "songwriters":v, "genderArray": genderArray, cutTwo:cutTwo[1],percent:cutTwo[0]}
		}, d => d.id);

		let songsTwo = SongData;
		console.log(songsTwo)
		songsTwo.forEach(d => {
			let writerData = writersGrouped.get(d.id);
			d["cutTwo"] = writerData["cutTwo"];
			d["genderArray"] = writerData["genderArray"];
			d["percent"] = writerData["percent"];
			d["song_key"] = d["title"] + " by " + d["artist"];
			d["songwriters"] = writerData["songwriters"];
			d["year"] = +d["year"];
			
			d["songwriters"].forEach(j => {
				j["year"] = d["year"];
				j["song_key"] = d["song_key"];
				j["gender_clean"] = genderKey[j["gender"]];
				writersWithSongData.push(j);
			})
		});


		writersByYearTwo = groups(writersWithSongData, d => d["year"]).sort((a,b) => {
			return a[0] - b[0];
		}).filter(d => {
			return d[0] > 1958;
		});

		dataByYearTwo = groups(songsTwo, d => d.year).sort((a,b) => b[0] - a[0]);
		
		waffleWriterDataTwo = songsTwo;
	})

</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
</svelte:head>
{#if dataByYearTwo}
<!-- <div class="sparkle-container">
	<Sparkle starNumber=3 position="left:0px; top: 70vh" />
	<Sparkle />	
</div>



	<IntroAnimation text={introAnimationText} data={dataByYearTwo.filter(d => +d[0] == 2022)[0][1]} />

{#each copy["preLongScroll"].map(d => d.value) as paragraph}
	<p class="center-col para">
		{@html paragraph}
	</p>
{/each}

<p class="chart-hed">{copy.longScrollHeadline}</p>
	<IntroSong dataByYear={dataByYearTwo.filter(d => +d[0] < 2022 && +d[0] > 2009)} text={textFirst} priorStats={priorOne}/>


{#each copy["postLongScroll"].map(d => d.value) as paragraph}
	<p class="center-col para">
		{@html paragraph}
	</p>
{/each}


<Headline></Headline>
      -->         
{#each copy["preWaffle"].map(d => d.value) as paragraph}
	<p class="center-col para">
		{@html paragraph}
	</p>
{/each}

<p class="chart-summary">{@html copy.waffleHed}</p>
<p class="chart-hed">{@html copy.waffleDek}</p>
 
<Female dataByYear={dataByYearTwo} cut="two" slides={slidesTwo} yearRange={[1957,2023]}/>

<!-- {#each copy["postWaffle"].map(d => d.value) as paragraph}
	<p class="center-col para">
		{@html paragraph}
	</p>
{/each}

<p class="chart-summary">{@html copy.lineChartHed}</p>
<p class="chart-hed">{@html copy.lineChartDek}</p>


<Line dataByYear={writersByYearTwo} />

{#each copy["conclusion"].map(d => d.value) as paragraph}
	<p class="center-col para">
		{@html paragraph}
	</p>
{/each}

<div class="space">
	 
</div>
<p class="chart-hed chart-hed-bubble">Explore {comma(waffleWriterData.length)} Top 5 Hits</p>
<Bubble data={waffleWriterDataTwo} />
{#each copy["note"].map(d => d.value) as paragraph}
	<p class="center-col para">
		{@html paragraph}
	</p>
{/each}
 -->
{/if}

<!-- <Demo /> -->
<style>
	.chart-hed-bubble {
		text-align: center;
	}
	.byline {
		text-align: center;
		font-family: 'DM Sans';
	}
	.space {
		height: 100px;
		width: 100%;
	}
	.sparkle-container {
		width: 100%;
		overflow: hidden;
	}
</style>
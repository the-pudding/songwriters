

<script>
	import { onMount,getContext } from "svelte";
	import YearDropDown from "$components/YearDropDown.svelte";
	import GenderToggle from "$components/GenderToggle.svelte";
	import Search from "$components/Search.svelte";

	import { groups, scaleLinear, format } from "d3";

	export let data;	
	
	let mounted = false;
	let yearStart = "1958";
	let yearEnd = "2022";
	let dateRange = [yearStart,yearEnd]
	let onlyWomen = false;
	let onlyMen = false;
	let performerGender = "all"
	let totalSongs = 1;
	let sliceAmount = 20;
	let sliceGain = 20;
	let cutTwo = "all";
	let ogSongTotal = 0;
	const commas = format(",");
	let searchTerm = "";

	
    let colorRange = scaleLinear().domain([0,1]).range(["#944EBE","#FFB102"]);

	let genderMap = {
		"m":"men",
		"f":"women",
		"pm":"men",
		"pf":"women",
		"nb":"non-binary"
	}

	let performerMap = {
		"m":"men",
		"f":"women",
		"all":"all",
		"m;f":"mixed gender"
	}

	let performerMapReverse = {
		"men":"m",
		"women":"f",
		"all":"all",
		"m;f":"mixed gender"
	}

	let performerArray = ["m","f","all","m;f"].map(d => {
		return {"value":`${d}`,"label":performerMap[d]};
	});

	let songSelected;

	let sort = {
		"only men": 0,
		"mixed, majority men": 1,
		"parity":2,
		"mixed, majority women":3,
		"only women":4,
		"all":5
	}

	let cutTwoMap = {
		"only men":"Only Men Songwriters",
		"only women":"Only Women Songwriters",
		"parity":"Parity",
		"mixed, majority men":"Majority Men",
		"mixed, majority women":"Majority Women"
	}

	let cutTwoColor = {
		"only men":"white",
		"only women":"var(--color-bg)",
		"parity":"var(--color-bg)",
		"mixed, majority men":"white",
		"mixed, majority women":"var(--color-bg)"
	}

	let cutTwoArray = Object.keys(sort).map(d => {
		return {"value":`${d}`};
	});

	const updateSlice = d => {
		sliceAmount = sliceAmount + sliceGain;
	}

	const searchData = () => {
		// return filteredBooks = bookData.filter(book => {
		// 	let bookTitle = book.title.toLowerCase();
		// 	return bookTitle.includes(searchTerm.toLowerCase())
		// });
	}

	const arrayRange = (start, stop, step) =>
	    Array.from(
		    { length: (stop - start) / step + 1 },
    		(value, index) => start + index * step
    	);

	const yearsArray = arrayRange(1958,2022,1).map(d => {
		return {"value":`${d}`};
	});

	function getData(data,dateRange,performerGender){

		console.log("gettingData")

		ogSongTotal = data.length;

		let tempData = data.filter(d => {
			return +d.year >= +dateRange[0] && +d.year <= +dateRange[1];
		})

		tempData = tempData.filter(d => {
			if(performerGender == "all") {
				return d;
			}
			else if(performerGender == "men") {
				return d.artist_gender == "m"; 
			}
			else if(performerGender == "women") {
				return d.artist_gender == "f"; 
			}
			else {
				return ["m","f"].indexOf(d.artist_gender) == -1;
			}
		});

		tempData = tempData.filter(d => {
			if(cutTwo == "all") {
				return d;
			}
			// console.log(d.cutTwo)
			return d.cutTwo == cutTwo;
		})

		let songwriters

		if(searchTerm) {
			tempData = tempData.filter(d => {
				let toMatch = searchTerm.toLowerCase();
				let songMatch = false;
				let writerMatch = false;

				songMatch = d.song_key.includes(toMatch.toLowerCase());
				if(d.songwriters){
					writerMatch = d.songwriters.map(d => d.writer.toLowerCase()).join(",").includes(toMatch.toLowerCase())
				}
				return writerMatch || songMatch;
			})
		}

		totalSongs = tempData.length;

		return tempData;

		
	}

	function getSong(song){
		songSelected = song.song_key;
	}

	$: dateRange = [+yearStart,+yearEnd];
	$: dataForChart = getData(data,dateRange,performerGender,cutTwo,searchTerm)

	onMount(async () => {
		mounted = true;
  	});
	

</script>

{#if mounted}
	<div class="toggles">
		<div class="toggle-wrapper">

		<div class="year-range">
			<p class="label">From:</p>
				<YearDropDown options={yearsArray} bind:value={yearStart}/>
			<p class="label">To:</p>
			<div class="year">
				<YearDropDown options={yearsArray} bind:value={yearEnd}/>
			</div>
		</div>
		<div class="gender-toggles">
			<p class="label">Performer Gender:</p>

			<YearDropDown options={performerArray} bind:value={performerGender}/>

			<p class="label">Songwriter Team:</p>
			<YearDropDown options={cutTwoArray} bind:value={cutTwo}/>


			<!-- <GenderToggle label={"Women Only Songs"} bind:value={onlyWomen} /> -->
			<!-- <GenderToggle label={"Men Only Songs"} bind:value={onlyMen}/> -->
		</div>
		</div>
	</div>
{/if}



<div class="bubble-chart">
	<div class="cut-wrapper {dataForChart.length < 10 ? 'no-results' : ''}">
		<div class="rollup-line">
			<p class="">Gender Breakdown</p>
		</div>

		<div class="rollup">
			<div class="spark">
				{#each groups(dataForChart, d => d.cutTwo).sort((a,b) => sort[b[0]] - sort[a[0]]) as cut}
					{@const percent = Math.round(cut[1].length/dataForChart.length*100)}
					<div style="
							background:{colorRange(cut[1][0].percent)};
							flex-basis:{percent}%;
						"
						class="bar"
					>
						<p style="color:{cutTwoColor[cut[0]]};">{percent}%</p>
						{#if percent > 2 || cut[0] == "only women"}
							<span class="bar-label">{cutTwoMap[cut[0]]}</span>
						{/if}
						{#if percent > 2}
							<span class="song-count">{commas(cut[1].length)} songs</span>
						{/if}

					</div>
					
				{/each}
			</div>
		</div>
		<div class="rollup-line results">
			{#if dataForChart.length == ogSongTotal}
				<p>Showing All {commas(ogSongTotal)} Top 5 Hits</p>
			{:else}
				<p>Criteria Matches {commas(dataForChart.length)} of {commas(ogSongTotal)} Top 5 Hits</p>
			{/if}
			<Search bind:searchTerm />
		</div>

		<!-- on:input={searchData} -->
			
		<!-- {#each dataForChart as cut} -->
			<!-- <div class="cut">
				<p>{cut[0]}, {cut[1].length} songs ({Math.round(cut[1].length/totalSongs * 100)}% of total)</p>
				<div class="cut-songs"> -->
					<div class="song first-row">
						<p class="song-name">Song</p>
						<div class="songwriters"><p>Songwriting Team</p></div>
					</div>
					{#each dataForChart.slice(0,sliceAmount) as song}
						<div 
							class="song"
						>
							<p class="song-name">{song.song_key}</p>
							<div class="songwriters">
								{#if song["songwriters"]}
									{#each groups(song["songwriters"], d => genderMap[d.gender]) as genderCut, i}
										<div class="tape-wrapper"
											style="
												margin-top:{i > 0 ? "35px" : ''};
											"
										>
											<p class="para songwriter-gender-cut foreground">
												<span><span class="cut-head">{genderCut[0]}:</span> {genderCut[1].map(d => d.writer).join(", ")}</span>
											</p>
											<p class="para songwriter-gender-cut background cut-{genderCut[0]}">
												<span><span class="cut-head">{genderCut[0]}:</span> {genderCut[1].map(d => d.writer).join(", ")}</span>
											</p>
										</div>               
									{/each}
								{/if}
							</div>
						</div>
					{/each}
			<!-- 	</div>
			</div> -->
		<!-- {/each} -->
		{#if dataForChart.length > 19}
			<button class="see-more" on:click={() => updateSlice()}>See {sliceGain} More Songs</button>
		{/if}
	</div>

	
</div>

<style>

	.para {
		font-size: 16px;
	}



	.tape-wrapper {
		margin: 0;
	}
	.tape-wrapper .foreground {
		z-index: 10;
	}

	.tape-wrapper .background span {
		background-color: var(--color-men);
		color: var(--color-men);
		box-shadow: 15px 0 var(--color-men), -15px 0 var(--color-men);
		opacity: .4;
		border-radius: 4px;
	}

	.tape-wrapper .cut-women span {
		background-color: var(--color-women);
		color: var(--color-women);
		box-shadow: 15px 0 var(--color-women), -15px 0 var(--color-women);
	}

	.tape-wrapper .cut-non-binary span {
		background-color: var(--color-nb);
		color: var(--color-women);
		box-shadow: 15px 0 var(--color-nb), -15px 0 var(--color-nb);
	}

	.cut-head {
		text-transform: capitalize;
	}

	.see-more {
		margin-top: -100px;
		position: absolute;
		bottom: 50px;
		left: 0;
		right: 0;
		margin: 0 auto;
		width: 250px;
		padding: 20px 50px;
		background: white;
		display: inline-block;
		z-index: 10000;
	}

	.cut-wrapper {
		position: relative;
	}

	.cut-wrapper:after{
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		margin: 0 auto;
		background: linear-gradient(360deg, #191817 30%, rgba(0,0,0,0) 100%);
    	width: 100%;
    	height: 300px;
		z-index: 1000;
	}

	.no-results:after {
		display: none;
	}

	
	
	.cut p {
		width: 100%;
	}

	.songwriter-gender-cut {
		display: block;
	}

	.cut-songs {
		display: flex;
		flex-wrap: wrap;
	}

	.cut {
		display: flex;
		/* max-width: 20%; */
		flex-wrap: wrap;
		justify-content: flex-start;
		align-content: flex-start;
	}

	.rollup {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		margin: 0 auto;
		margin-bottom: 100px;
	}

	.first-row .song-name, .first-row .songwriters, .first-row p {
		margin-top: 0;
		margin-bottom: 0;
		padding-bottom: 0;
		padding-top: 0;
		margin-bottom: 5px;
		padding-left: 0;
		text-transform: capitalize;
	}

	.spark {
		display: flex;
		width: 100%;
		margin: 0 auto;
		margin-top: 40px;
		max-width: 1000px;

	}

	.bar span {
		position: absolute;
		bottom: -10px;
		transform: translate(0,100%);
		text-align: center;
		font-size: 12px;
	}


	.bar {
		position: relative;
		height: 30px;
		display: flex;
		justify-content: center;
		transition: width 1s;
	}

	.bar p {
		text-align: center;
		margin: 0;
		align-self: center;
		font-size: 14px;
	}

	.gender-toggles {
		display: flex;
		margin-left: 10px;
	}
	

	.cut-wrapper {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		margin: 0 auto;
		max-width: 1200px;
	}

	.rollup {
		font-family: 'DM Sans';
	}

	.toggles {
		margin-bottom: 20px;
		display: flex;
		font-family: 'DM Sans';
		justify-content: center;
	}

	.toggle-wrapper {
		background: #2a2a2a;
		display: flex;
		padding: 20px 30px;
		border-radius: 50px;
	}

    .bubble-chart {
	}

	.year-range {
		display: flex;
	}

	.label {
		margin: 0 20px;
		align-self: center;
	}

	.song span {
	}

	.songwriters {
		flex-basis: min-content;
    	flex-grow: 1;
		padding: 20px;
	}

	.song {
		display: flex;
		font-size: 16px;
		margin: 0 auto;
		font-family: 'DM Sans';
		border-bottom: 1px solid rgba(255,250,215,.5);
		width: 100%;
		max-width: 1000px;
	}

	.song-name {
		width: 300px;
		margin-right: 10px;
		text-transform: capitalize;
		align-self: center;
	}

	.men {
		background-color: blue;
	}

	.bar .song-count {
		bottom: auto;
		top: -10px;
		transform: translate(0,-100%);
		line-height: 1;
	}

	.rollup-line {
		font-family: 'DM Sans';
		max-width: 1000px;
		margin: 0 auto;
		width:100%;
		display: flex;
		justify-content: center;
	}

	.results {
		margin-bottom: 50px;
	}


</style>
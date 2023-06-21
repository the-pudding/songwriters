

<script>
	import { onMount,getContext } from "svelte";
	import YearDropDown from "$components/YearDropDown.svelte";
	import GenderToggle from "$components/GenderToggle.svelte";

	import { group, groups } from "d3";

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

	

	let genderMap = {
		"m":"men",
		"f":"women",
		"pm":"men",
		"pf":"women",
		"nb":"non-binary"
	}

	let performerArray = ["m","f","all","m;f"].map(d => {
		return {"value":`${d}`};
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

	let cutTwoArray = Object.keys(sort).map(d => {
		return {"value":`${d}`};
	});

	const updateSlice = d => {
		sliceAmount = sliceAmount + sliceGain;
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

		let tempData = data.filter(d => {
			return +d.year >= +dateRange[0] && +d.year <= +dateRange[1];
		})

		tempData = tempData.filter(d => {
			if(performerGender == "all") {
				return d;
			}
			return  d.artist_gender == performerGender;
		});

		tempData = tempData.filter(d => {
			if(cutTwo == "all") {
				return d;
			}
			// console.log(d.cutTwo)
			return d.cutTwo == cutTwo;
		})

		totalSongs = tempData.length;

		// tempData = groups(tempData, d => d.cutTwo);
		// tempData.sort((a,b) => {
		// 	return sort[b[0]] - sort[a[0]];
		// })



		// if(onlyWomen) {	
		// 	console.log(groups(tempData, d => d.womenOnly));
		// 	tempData = tempData.filter(d => {
		// 		return  d.womenOnly == "only women"
		// 	})
		// }

		// if(onlyMen) {	
		// 	tempData = tempData.filter(d => {
		// 		console.log(d)
		// 		return  d.menOnly == "only men"
		// 	})
		// }

		console.log(tempData)

		return tempData;

		
	}

	function getSong(song){
		songSelected = song.song_key;
	}

	$: dateRange = [+yearStart,+yearEnd];
	$: dataForChart = getData(data,dateRange,performerGender,cutTwo)


	onMount(async () => {
		mounted = true;
  	});
	

</script>

{#if mounted}
	<div class="toggles">
		<div class="year-range">
			<p>From</p>
				<YearDropDown options={yearsArray} bind:value={yearStart}/>
			<p>To</p>
			<div class="year">
				<YearDropDown options={yearsArray} bind:value={yearEnd}/>
			</div>
		</div>
		<div class="gender-toggles">
			<p>Performer Gender</p>

			<YearDropDown options={performerArray} bind:value={performerGender}/>

			<p>Songwriter Team:</p>
			<YearDropDown options={cutTwoArray} bind:value={cutTwo}/>


			<!-- <GenderToggle label={"Women Only Songs"} bind:value={onlyWomen} /> -->
			<!-- <GenderToggle label={"Men Only Songs"} bind:value={onlyMen}/> -->
		</div>
	</div>
{/if}



<div class="bubble-chart">
	<p>[tk matt to add in roll up percentages]</p>
	<div class="cut-wrapper">
		<!-- {#each dataForChart as cut} -->
			<!-- <div class="cut">
				<p>{cut[0]}, {cut[1].length} songs ({Math.round(cut[1].length/totalSongs * 100)}% of total)</p>
				<div class="cut-songs"> -->
					{#each dataForChart.slice(0,sliceAmount) as song}
						<div class="song">
							<p class="song-name">{song.song_key}</p>
							<div class="songwriters">
								{#if song["songwriters"]}
									{#each groups(song["songwriters"], d => genderMap[d.gender]) as genderCut}
										<p 
											class="songwriter-gender-cut"
											style="
												color:{genderCut[0] == "men" ? "var(--color-men)" : genderCut[0] == "women" ? "var(--color-women)" : "red"};
											"
										>
											{genderCut[0]}: {genderCut[1].map(d => d.writer).join(", ")}
										</p>
									{/each}
								{/if}
							</div>
						</div>
					{/each}
			<!-- 	</div>
			</div> -->
		<!-- {/each} -->
		<button class="see-more" on:click={() => updateSlice()}>See {sliceGain} More Songs</button>
	</div>

	
</div>

<style>

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
	}
	
	.cut p {
		width: 100%;
	}

	.songwriter-gender-cut {
		display: block;
		margin-bottom: 10px;
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

	.toggles {
		margin-bottom: 50px;
		display: flex;

	}
    .bubble-chart {
		display: flex;
		flex-wrap: wrap;
	}

	.year-range {
		display: flex;
	}

	.year-range p {
		align-self: center;
		margin: 0 20px;
	}

	.song span {
	}

	.songwriters {
		flex-basis: min-content;
    	flex-grow: 1;
	}

	.song {
		display: flex;
		font-size: 16px;
		font-family: 'DM Sans';
		border-bottom: 1px solid white;
		width: 100%;
	}

	.song-name {
		width: 300px;
		margin-right: 10px;
	}

	.men {
		background-color: blue;
	}

</style>
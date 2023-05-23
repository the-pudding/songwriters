

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

	let performerArray = ["m","f","all","m;f"].map(d => {
		return {"value":`${d}`};
	});

	let songSelected;

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


		

		tempData = groups(tempData, d => d.cut);



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
	$: dataForChart = getData(data,dateRange,performerGender)


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
			<!-- <GenderToggle label={"Women Only Songs"} bind:value={onlyWomen} /> -->
			<!-- <GenderToggle label={"Men Only Songs"} bind:value={onlyMen}/> -->
		</div>
	</div>
{/if}



<div class="bubble-chart">
	<p>[tk matt to add in roll up percentages]</p>
	{#each dataForChart as cut}
		<div class="cut">
			<p>{cut[0]}</p>
			<div class="cut-wrapper">
				{#each cut[1] as datum}
					<!-- svelte-ignore a11y-mouse-events-have-key-events -->
					<div on:mouseover={() => getSong(datum)} class="song">
					</div>
				{/each}
			</div>
		</div>

	{/each}
</div>

<p>song: {songSelected}</p>

<style>
	
	.cut p {
		width: 100%;
	}

	.cut {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
	}

	.gender-toggles {
		width: 100%;
	}
	

	.cut-wrapper {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
	}

	.toggles {
		margin-bottom: 50px;

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

	.song {
		width: 10px;
		height: 10px;
		margin: 1px;
		background-color: red;
	}

	.men {
		background-color: blue;
	}

</style>
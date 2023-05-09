

<script>
	import { onMount,getContext } from "svelte";
	import YearDropDown from "$components/YearDropDown.svelte";
	import GenderToggle from "$components/GenderToggle.svelte";

	const data = getContext("data");
	
	let mounted = false;
	let yearStart = "1958";
	let yearEnd = "2022";
	let dateRange = [yearStart,yearEnd]
	let onlyWomen = false;
	let onlyMen = false;

	let songSelected;

	const arrayRange = (start, stop, step) =>
	    Array.from(
		    { length: (stop - start) / step + 1 },
    		(value, index) => start + index * step
    	);

	const yearsArray = arrayRange(1958,2022,1).map(d => {
		return {"value":`${d}`};
	});

	function getData(data,dateRange,onlyWomen,onlyMen){

		let tempData = data.filter(d => {
			return +d.year >= +dateRange[0] && +d.year <= +dateRange[1];
		})

		if(onlyWomen) {	
			tempData = tempData.filter(d => {
				return  d.womenOnly == "only women"
			})
		}

		if(onlyMen) {	
			tempData = tempData.filter(d => {
				console.log(d)
				return  d.menOnly == "only men"
			})
		}



		return tempData;

		
	}

	function getSong(song){
		songSelected = song.song_key;
	}

	$: dateRange = [+yearStart,+yearEnd];
	$: dataForChart = getData(data,dateRange,onlyWomen,onlyMen)


	onMount(async () => {
		mounted = true;
  	});
	

</script>


{#if mounted}
	<div class="toggles">
		<div class="year-range">
			<p>From</p>
				<YearDropDown {yearsArray} bind:value={yearStart}/>
			<p>To</p>
			<div class="year">
				<YearDropDown {yearsArray} bind:value={yearEnd}/>
			</div>

			<div class="gender-toggles">
				<GenderToggle label={"Women Only Songs"} bind:value={onlyWomen} />
				<GenderToggle label={"Men Only Songs"} bind:value={onlyMen}/>
			</div>
		</div>
	</div>
{/if}

<div class="bubble-chart">
	{#each dataForChart as datum}
        <div on:mouseover={() => getSong(datum)} class="song {datum["menOnly"] == "only men" ? 'men' : ''}">
        </div>
	{/each}
</div>

<p>song: {songSelected}</p>

<style>
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
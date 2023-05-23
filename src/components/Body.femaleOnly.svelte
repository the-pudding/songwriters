<script>
    import { onMount,getContext } from "svelte";
    import Scrolly from "$components/helpers/Scrolly.svelte";
	import SortTable from "./helpers/SortTable.svelte";
    import { flip } from "svelte/animate";
    import { groups } from "d3";

    export let dataByGender;
    export let dataByYearWomenOnly;
    export let slides;
    let value = 0;
    let dataForChart;
    
    let performerKey = {
        "m": "men performer",
        "f": "women performer",
        "m;f": "mixed gender band"
    }

    const updateData = () => {
        let tempData;
        if(value == 0 || value == undefined) {


            tempData = JSON.parse(JSON.stringify(dataByYearWomenOnly));
            tempData = tempData.filter((d) => {
                return d[0] < 2023 && d[0] > 1999;
            });



            // tempData = JSON.parse(JSON.stringify(dataByGender))
            // tempData.forEach((d) => {
            //     d[1] = d[1].filter(j => {
            //         return +j[0] < 2023;
            //     })
            // });

        }
        else if(value > 0){
            tempData = JSON.parse(JSON.stringify(dataByYearWomenOnly))
            tempData = tempData.map(d => d[1]).flat(1);
            tempData = groups(tempData, d => d.artist_gender);
            tempData = tempData.reverse();
            console.log(tempData)

        }
        else {
            tempData = JSON.parse(JSON.stringify(dataByYearWomenOnly))

        //     tempData = JSON.parse(JSON.stringify(dataByGender))
        //     console.log(tempData)
        //     tempData.forEach((d) => {
        //         d[1] = d[1].filter(j => {
        //             return +j[0] > 1999 && +j[0] < 2023;
        //         })
        //     });
        // }
        // tempData = tempData.filter(d => {
        //     return d[1].length > 0;
        // })
        }


        return tempData;
    }

    $: dataForChart = updateData(value);
    



</script>


<section class="wrapper">
    <div class="song-wrapper {value == 3 ? 'performer-slide' : ''}">
        <p class="chart-header">songs written by women</p>    
        
        {#if value < 2 || value == undefined}
            {#each dataForChart as dataYear}
                <p class="year">{dataYear[0]}</p>
                {#each dataYear[1] as song, i (song.song_key)}
                    <div class="song-row" style="" animate:flip={{ duration: 1000 }}>
                        {song.song_key}, written by {song["songwriters"].map(d => d.writer).join(", ")}
                    </div>
                {/each}
            {/each}
        {:else}
            {#each dataForChart as performer}
                <div class="performer">
                    {performerKey[performer[0]]}
                    {#each performer[1] as song}
                        <div class="song-row" style="">
                            {song.song_key}, written by&nbsp;
                            {#each song["songwriters"] as songwriter, i}
                                <span class="{songwriter["Songwriter is Artist"] == "1" ? "performer-flag" : ''}">{songwriter.writer}</span>
                                {#if i !== song["songwriters"].length - 1}
                                    ,&nbsp;
                                {/if}
                            {/each}
                        </div>
                    {/each}
                </div>
            {/each}
        {/if}
    </div>
    <Scrolly bind:value>
        {#each slides as slide,i}
                {@const active = value === i}
                <div class="step double-col-step" class:active>
                    <div class="double-col-para-wrapper">
                        <p class="double-col para">
                            {@html slide}
                        </p>
                    </div>
                    
                </div>
        {/each}
    </Scrolly>
</section>


<style>

    .performer-slide .performer-flag {
        color: red;
    }

    .performer {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 30px;
    }
    .song-row {
        font-size: 12px;
        display:flex;
        justify-content:center;
        margin: 5px 10px;
        /* max-width: 150px; */
    }

    .year {
        text-align: center;
        font-size: 12px;
        margin: 0;
    }
    .song-wrapper {
        position: sticky;
        top: 1rem;
        display: flex;
        flex-wrap: wrap;
        height: 100vh;
        overflow: hidden;
        align-content: flex-start;
    }

    .song-container {
        /* display: flex; */
    }

    .song {
        display: flex;
        /* width: 100%; */
        background-color: #f7f7f7;
        margin: 5px;
        border: 1px solid black;
        padding: 0 10px;
        display: none;
    }

    .step {
        min-height: 75vh;
    }

    h2 {
		position: sticky;
		top: 4em;
	}

    .wrapper {
        position: relative;
    }

	.spacer {
		height: 75vh;
	}
</style>







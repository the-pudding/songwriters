<script>
    import { onMount,getContext } from "svelte";
    import Scrolly from "$components/helpers/Scrolly.svelte";
	import SortTable from "./helpers/SortTable.svelte";

    export let dataByGender;

    let value;
    let dataForChart;
    
    let performerKey = {
        "m": "men performer",
        "f": "women performer",
        "m;f": "mixed gender band"
    }

    const updateData = () => {
        let tempData;
        
        if(value > 0) {
            console.log("here")
            tempData = JSON.parse(JSON.stringify(dataByGender))
            tempData.forEach((d) => {
                d[1] = d[1].filter(j => {
                    return +j[0] < 2010;
                })
            });

        }
        else {
            tempData = JSON.parse(JSON.stringify(dataByGender))
            console.log(tempData)
            tempData.forEach((d) => {
                d[1] = d[1].filter(j => {
                    return +j[0] > 1999 && +j[0] < 2010;
                })
            });
        }
        tempData = tempData.filter(d => {
            return d[1].length > 0;
        })

        return tempData;
    }

    let slides= [
        "If we keep going back into the past, things don’t look better. In fact, since the year 2000 there have been so few top 5 hits written exclusively by women that I can list them all.",
        "Note how all of these songs were performed by women. Men rarely perform hits written exclusively by women. In fact, there are only 13 top 5 hits since the inception of the Hot 100 written exclusively by women and performed exclusively by men.",
        "Even if we expand our search to top 5 hits written exclusively by women and performed by groups that contain at least one woman, the list of songs only grows by 16."
    ]




    $: dataForChart = updateData(value);
    $: console.log(dataByGender)
    

</script>


<section class="wrapper">
    <div class="song-wrapper">
        <p>songs written by women</p>        
        {#each dataForChart as performer}
            <div class="performer">
                {performerKey[performer[0]]}
                
                {#each performer[1] as dataYear}
                    <!-- <div class="year-section"> -->
                        <p class="year">{dataYear[0]}</p>
                        <!-- <div class="song-container"> -->
                            {#each dataYear[1].slice(0,10) as song}
                                <div class="song-row" style="">
                                    <div class="song"
                                        on:mouseover={() => console.log(song)}
                                        style="
                                        background-color:{song.menOnly == "only men" ? "rgba(0,0,255,.15)" : song.womenOnly == "only women" ? 'rgba(255,0,0,.15)' : ''};
                                        "
                                    >
                                        {#each song.genderArray as songwriter}
                                            <div class="songwriter"
                                                style="
                                                    color:{songwriter == "m" ? "blue" : songwriter == "f" ? "red" : ''};
                                                "
                                            >
                                                {songwriter}
                                            </div>
                                        {/each}
                                        
                                    </div>
                                    {song.song_key}
                                </div>
                            {/each}
                        <!-- </div> -->
                    <!-- </div> -->
                {/each}
            </div>

        {/each}
    </div>
    <Scrolly bind:value>
        {#each slides as slide,i}
                {@const active = value === i}
                <div class="step double-col-step" class:active>
                    <div class="double-col-para-wrapper">
                        <p class="double-col para">
                            {slide}
                        </p>
                    </div>
                    
                </div>
        {/each}
    </Scrolly>
</section>


<style>
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







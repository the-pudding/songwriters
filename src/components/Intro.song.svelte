<script>
    import { onMount,getContext } from "svelte";	
	import Scrolly from "$components/helpers/Scrolly.svelte";
    import Scroller from "@sveltejs/svelte-scroller";

    export let dataByYear;
    export let text;
    export let priorStats;
    
    let value;
    let textKeys = [];
    let textValue;
    let songColHeight;
    let textToShow;

    let index, offset, progress;
    let threshold = 1;
    let top = 1;
    let bottom = 1;
    let progressCounts = [];

    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);


    let progressAdjusted;
    

    const getText = () => {

        if(textKeys.indexOf(value) > -1){
            textValue = text[value];
        }
    };

    const getProgressText = (progressAdjusted) => {
        if(progressAdjusted) {

            let text = progressCounts[Math.floor(Math.min(progressAdjusted*progressCounts.length-1),1)];
            return text;

        }
        return textToShow;
    }

    const calcProgress = () => {


        if(dataByYear) {

            let counts = priorStats

            let totalLength = dataByYear.flat(2).length;

            let tally = 0
            let progressTally = 0;

            dataByYear.flat(2).map(d => {

                tally = tally + 1;
                progressTally = tally/totalLength;

                counts[d.cut] = counts[d.cut] + 1;

                progressCounts.push(JSON.parse(JSON.stringify(counts)))
                return d;
            })

        }

    }

    $: getText(value)

    $: textKeys = Object.keys(text).map(d => +d);
    $: progressAdjusted = clamp(progress,0,1);
    $: dataByYear, calcProgress();

    $: textToShow = getProgressText(progressAdjusted);
    

</script>



<Scroller top="{top}" bottom="{bottom}" {threshold} bind:index={value} bind:offset bind:progress>    
    <div slot="foreground">
        <div id="scrolly">
            <div class="fixed">
                {#if progressCounts && progress}
                    <!-- <h2> -->
                        <h2>{@html textValue}</h2>

                        {#if textToShow}
                            <p>at least 1 woman: {textToShow["at least 1 woman"]}</p>
                            <p>only men: {textToShow["no women"]}</p>
                            <p>only women: {textToShow["only women"]}</p>
                        {/if}
                    <!-- </h2> -->
                {/if}
            </div>
            <div class="song-wrapper">
                <!-- <Scrolly bind:value> -->
                    <div bind:clientHeight={songColHeight} class="song-col-height">

                    {#each dataByYear as dataYear,i}
                        {@const active = value === i}
                        <section class="step year-section" class:active>
                            
                            <p class="year">{dataYear[0]}</p>
                            {#each dataYear[1] as song}
                                <div
                                    class=""
                                    style="width:100%; display:flex; justify-content:center;">
                                    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                                    <div
                                        class="song-container {song.womenOnly == "only women" ? "women-only" : ''}"
                                    >

                                        <div class="song"
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
                                </div>
                            {/each}
                        </section>
                    {/each}
                    </div>
                <!-- </Scrolly> -->

            </div>
        </div>
    </div>
</Scroller>

<style>

    .song-container {
        display: inline-flex;
    }

    .women-only {
        border: 5px solid red;
    }

    .year {
        text-align: center;
    }
    .song-wrapper {
        /* display: flex; */
        flex-wrap: wrap;
    }
    .song {
        display: flex;
        /* width: 100%; */
        background-color: #f7f7f7;
        margin: 5px;
        border: 1px solid black;
        padding: 0 10px;
    }

    .fixed {
		position: sticky;
		top: 4em;
        z-index: 10000;
        background: rgba(255,255,255,.78);
	}
</style>







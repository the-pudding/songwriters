<script>
    import { onMount,getContext } from "svelte";	
	import Scrolly from "$components/helpers/Scrolly.svelte";
    import Scroller from "@sveltejs/svelte-scroller";
	import viewport from "$stores/viewport.js";
    import { fade, fly } from "svelte/transition";

    export let dataByYear;
    export let text;
    export let priorStats;
    
    let value;
    let textKeys = [];
    let textValue;
    let songColHeight;
    let textToShow;

    let sizes = {
        "m-1":{
            width:55,
            imgWidth:55,
            transform:35,
            leftAdjust:0
        },
        "m-2":{
            width:64,
            imgWidth:64,
            transform: 35,
            leftAdjust:0
        },
        "m-3":{
            width:60,
            imgWidth:135,
            transform: 37,
            leftAdjust:-25
        },
        "m-4":{
            width:60,
            imgWidth:60,
            transform: 32,
            leftAdjust:0
        },
        "m-5":{
            width:70,
            imgWidth:70,
            transform: 30,
            leftAdjust:5
        },
        "m-6":{
            width:72,
            imgWidth:72,
            transform: 35,
            leftAdjust:10
        },
        "m-7":{
            width:60,
            imgWidth:70,
            transform: 35,
            leftAdjust:-5
        },
        "m-8":{
            width:70,
            imgWidth:80,
            transform: 32,
            leftAdjust:0
        },
        "m-9":{
            width:60,
            imgWidth:60,
            transform: 35,
            leftAdjust:0
        },
        "m-10":{
            width:60,
            imgWidth:125,
            transform: 37,
            leftAdjust:-40
        },
        "f-1": {
            width:62,
            imgWidth:62,
            transform:35,
            leftAdjust:0
        },
        "f-2": {
            width:60,
            imgWidth:75,
            transform:37,
            leftAdjust:15
        },
        "f-3": {
            width:55,
            imgWidth:65,
            transform:38,
            leftAdjust:0
        },
        "nb-1": {
            width: 58,
            imgWidth:58,
            transform: 35,
            leftAdjust:0
        }
    }

    let index, offset, progress;
    let threshold = 1;
    let top = 1;
    let bottom = 1;
    let progressCounts = [];

    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);


    let progressAdjusted;
    
    const test = (id) => {
        console.log(id)
    }
    const getText = () => {

        if(textKeys.indexOf(value) > -1){
            textValue = text[value];
        }
    };

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    const getNumber = (gender) => {
        if(gender == "m") {
            return getRandomInt(1,10);
        }
        if(gender == "f") {
            return getRandomInt(1,3);
        }
        return getRandomInt(1,1);
    }

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

                counts[d.cutTwo] = counts[d.cutTwo] + 1;

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
    $: console.log(priorStats)

</script>


<div class="long-scroll">
<Scroller top="{top}" bottom="{bottom}" {threshold} bind:index={value} bind:offset bind:progress>    
    <div slot="foreground">
        <div id="scrolly">
            <div class="fixed" style="">
                <div class="fixed-wrapper" style="height:{$viewport.height}px">
                    {#if progressCounts && progress}
                        <!-- <h2> -->
                            <div class="fixed-text-wrapper">
                                {#key textValue}
                                    <p in:fly="{{ y: 100, duration: 500, delay:500}}" out:fade="{{duartion:500}}" class="fixed-text">{@html textValue}</p>
                                {/key}
                            </div>
                            {#if textToShow}
                                <div class="counter">
                                    {#each Object.keys(priorStats) as statCat}
                                        {#if textToShow[statCat]}
                                            <p class="count-row">{statCat}: {textToShow[statCat]}</p>
                                        {/if}
                                    {/each}
                                </div>
                            {/if}
                        
                            
                            
                        <!-- </h2> -->
                    {/if}
                    <div class="black-overlay">
                    </div>
                </div>

            </div>
            <div class="song-wrapper" style="">
                <!-- <Scrolly bind:value> -->
                    <div bind:clientHeight={songColHeight} class="song-col-height">

                    {#each dataByYear as dataYear,i}
                        {@const active = value === i}
                        <section class="step year-section" class:active>
                            
                            <p class="year">{dataYear[0]}</p>
                            {#each dataYear[1] as song}
                                <div
                                    class=""
                                    style="width:100%; display:flex; justify-content:flex-start;">
                                    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                                    <div
                                        class="song-container {song.womenOnly == "only women" ? "women-only" : ''}"
                                    >

                                        <div class="song"
                                            style="
                                            background-color:{song.menOnly == "only men" ? "rgba(0,0,255,0)" : song.womenOnly == "only women" ? 'rgba(255,0,0,0)' : ''};
                                            "
                                        >

                                        <div class="bar">

                                        </div>
                                            <div class="song-key">
                                                <p class="song-title">{song.song_key.split(" by ")[0]}</p>
                                                <p class="song-artist">{song.song_key.split(" by ")[1]}</p>
                                            </div>
                                            <div class="songwriters">
                                                {#each song.genderArray.sort((a,b) => a.localeCompare(b)) as songwriter}
                                                <!-- background:{songwriter == "m" ? "rgba(209, 36, 25,.4)" : songwriter == "f" ? "rgba(0,108,69,.6)" : 'rgba(0,108,69,.6)'};
                                                color:{songwriter == "m" ? "white" : songwriter == "f" ? "white" : 'white'}; -->

                                                {@const number = getNumber(songwriter)}
                                                {@const gender = ["m","f","nb"].indexOf(songwriter) == -1 ? "m" : songwriter.replace(" ","")}
                                                {@const identifier = `${gender}-${number}`}
                                                {@const testTwo = test(identifier)}
                                                <div class="black-fade">

                                                </div>
                                                <div class="songwriter"
                                                        style="
                                                        width:{sizes[identifier].width*.6}px;
                                                        z-index:{identifier == "m-8" ? 100 : identifier == "m-10" ? '-1' : ''};
                                                        "
                                                    >
                                                        <img class="gender-{sizes[identifier].width}" style="transform:translate({sizes[identifier].leftAdjust}%,{sizes[identifier].transform}%); width:{sizes[identifier].imgWidth*.7}px;" src="assets/{gender}-{number}.svg" alt="">
                                                        <!-- {songwriter == "m" ? 'm' : "w"} -->
                                                    </div>
                                                {/each}
                                            </div>    
                                        </div>
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
</div>

<style>
    .long-scroll {
        margin-bottom: 300px;
    }
    #scrolly {
         max-width: 1200px;
         margin: 0 auto;
    }
    .song-container {
        font-family: 'DM Sans';
        width:100%;
    }

    .women-only {
        border: 5px solid #006C45;
    }

    .count-row {
        font-family: 'DM Sans';
    }
    .bar {
        position: absolute;
        width: 100%;
        height: 1px;
        background: none;
    }
    .song-key {
        margin-right: 10px;
    }
    .year {
        text-align: center;
        font-family: 'DM Sans';
        font-size: 28px;
        position: relative;
        font-weight: 600;
        text-shadow: 2px 2px 0px #191817, -2px -2px 0px #191817, -2px 0px 0px #191817, 2px -2px 0px #191817, -2px 0px 0px #191817, 0px 2px 0px #191817, 0px -2px 0px #191817, 1px 1px 0px #191817, 1px 1px 0px #191817, -1px 1px 0px #191817, -1px -1px 0px #191817, -1px 0px 0px #191817, 0px 1px 0px #191817, 0px -1px 0px #191817;
    }
    .year::after {
        content:'';
        height: 1px;
        width: calc(100% - 50px);
        position: absolute;
        background-color: var(--color-fg);
        left: 0;
        right: 0;
        margin: 0 auto;
        top: 50%;
        transform: translate(0,-50%);
        z-index: -1;
        opacity: .5;
    }
    .song-wrapper {
        width: 100%;
    }

    .fixed-text-wrapper {
        height: 100px;
    }

    .black-overlay {
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, rgba(25,24,23,.9) 0px,rgba(25,24,23,.9) 50px, rgba(25,24,23,0)  150px, rgba(25,24,23,0)  calc(100% - 200px), rgba(25,24,23,.9) 100%);
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }
    .song {
        display: flex;
        width: 100%;
        margin: 5px;
        padding: 0 10px;
        font-family: 'DM Sans';
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        border-bottom: 1px dashed rgba(255,255,255,.25)
    }


    .songwriters {
        display: flex;
        align-self: flex-end;
        max-width: 500px;
        flex-wrap: wrap;
        position: relative;
        z-index: 1;

    }
    .fixed-text {
        font-family: 'DM Sans';
        font-size: 24px;
        text-align: center;
    }

    .song-title {
        margin: 0;
    }

    .song-artist {
        margin: 0;
    }

    .fixed {
		position: sticky;
		top: 0em;
        z-index: 10000;
        width: calc(100% - 0px);
        margin-left: auto;
        margin-right: 0;
        padding-top: 10%;
	}
    .fixed-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        pointer-events: none;
    }

    .songwriter {
        height: 50px;
        /* padding: 5px 10px; */
        /* margin-right: 10px; */
        /* border-radius: 50%; */
        position: relative;
    }

    .songwriter img {
        position: absolute;
        width: 100%;
        max-width: none;
        bottom: 0;


        /* width: 5; */
    }

    .black-fade {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 100%;
        right: 0;
        display: none;
        background: linear-gradient(180deg, rgba(25,24,23,0) 0px,rgba(25,24,23,.4) 100%);
    }

    .counter {
        display: flex;
        width: 100%;
    }
</style>







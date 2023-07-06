<script>
    import { onMount,getContext } from "svelte";	
	import Scrolly from "$components/helpers/Scrolly.svelte";
    import Scroller from "@sveltejs/svelte-scroller";
	import viewport from "$stores/viewport.js";
    import { fade, fly } from "svelte/transition";
    import Group from "$components/Group.svelte";
    import { group, scaleLinear } from "d3";

    export let dataByYear;
    export let text;
    export let priorStats;
    
    let value;
    let textKeys = [];
    let textValue;
    let textToShow;
    let cutTotals;
    let groupSize = .6;
    let groupHeight = 50; 
    let labelPlacementValue = "second";
    let colorRange = scaleLinear().domain([0,1]).range(["#d795ff","#FFB102"]);

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
        },
        "nb-2": {
            width: 70,
            imgWidth:70,
            transform: 32,
            leftAdjust:0
        }
    }

    const getBarWidth = (num) => {
        let dom = cutTotals.get("only men").length;
        // textToShow[statCat]/cutTotals.get(statCat).length
        return num/dom*100;
    }

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
    return getRandomInt(1,2);
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


    const getProgressText = (progressAdjusted) => {
        if(progressAdjusted) {
            let text = progressCounts[Math.floor(Math.min(progressAdjusted*progressCounts.length-1),1)];
            return text;

        }
        return textToShow;
    }

    const calcTotals = () => {
        cutTotals = group(dataByYear.flat(2).filter(d => d.id), d => d.cutTwo);
        console.log(cutTotals.get("only men"))
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
    $: dataByYear, calcTotals();

    $: textToShow = getProgressText(progressAdjusted);

    $: groupSize = $viewport.width < 900 ? $viewport.width < 600 ? .3 : .4 : .6;
    $: groupHeight = $viewport.width < 900 ? $viewport.width < 600 ? 25 : 40 : 50;
    $: labelPlacementValue = $viewport.width < 500 ? "secondMobile" : "second";
    $: console.log(progressAdjusted)

</script>


<div class="long-scroll">
<Scroller top="{top}" bottom="{bottom}" {threshold} bind:index={value} bind:offset bind:progress>    
    <div slot="foreground">
        <div id="scrolly">
            <div class="fixed" style="">
                <div class="fixed-wrapper" style="height:{$viewport.height}px">
                    {#if progressCounts && progress}
                        <div class="fixed-text-wrapper">
                            {#if progressAdjusted > .07}
                            <p class="songwriters-legend">The Songwriting Team</p>
                            {/if}
                        </div>

                        <div class="fixed-text-wrapper fixed-text-wrapper-center">
                            {#if progressAdjusted > .07 && progressAdjusted < 1}
                                {#key textValue}
                                    <p in:fly="{{ y: 100, duration: 500, delay:500}}" out:fade="{{duartion:500}}" class="fixed-text">
                                        <span>{@html textValue}</span>
                                    </p>
                                {/key}
                            {/if}
                        </div>
                        {#if textToShow && cutTotals && progressAdjusted < 1 && progressAdjusted > .07}
                            <div class="counter">
                                <p class="counter-label"># of Songs Written by...</p>
                                <!-- {#each Object.keys(priorStats) as statCat} -->
                                <div class="bar-wrapper">
                                    {#each ["only men","only women"] as statCat, j}
                                        {#if textToShow[statCat]}
                                        <div class="row">
                                            <p class="count-row">{statCat}:</p>
                                            <div class="bar-container">
                                                <div style="
                                                    width:{getBarWidth(textToShow[statCat])}%;
                                                    " class="bar-rect {j == 0 ? 'men-bar' : 'women-bar'}"
                                                >
                                                    <p class="count-label">{textToShow[statCat]}</p>
                                                </div>
                                            </div>
                                            <div class="faux">

                                            </div>
                                        </div>
                                        {/if}
                                    {/each}
                                </div>
                                
                            </div>
                        {/if}                            
                    {/if}
                    {#if progressAdjusted > .07 && progressAdjusted < 1}
                        <div class="black-overlay">
                        </div>
                    {/if}
                </div>

            </div>
            <div class="song-wrapper" style="">
                <!-- <Scrolly bind:value> -->
                    <div class="song-col-height">

                    {#each dataByYear as dataYear,i}
                        {@const active = value === i}
                        <section class="step year-section"
                            style="padding-bottom:{dataByYear.length - 1 == i ? "100px" : ''};"
                            class:active
                        >
                            
                            <p class="year">{dataYear[0]}</p>
                            {#each dataYear[1].sort((a,b) => { return a["percent"] - b["percent"]}) as song}
                                <div
                                    class=""
                                    style="width:100%; display:flex; justify-content:flex-start;">
                                    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                                    <div
                                        class="song-container {song.cutTwo == "only women" ? "women-only" : ''}"
                                    >

                                        <div class="song"
                                            style="
                                            background-color:{song.cutTwo == "only men" ? "rgba(0,0,255,0)" : song.cutTwo !== "only women" ? 'rgba(255,0,0,0)' : ''};
                                            "
                                        >
                                            {#if song.cutTwo == "only women"}
                                            <div class="bar">

                                            </div>
                                            {/if}
                                            <div class="song-key"
                                                style="
                                                color: {song.cutTwo == "only women" ? "#FFB102" : ''};
                                                "
                                            >
                                                <p class="song-title">{song.song_key.split(" by ")[0]}</p>
                                                <p class="song-artist">{song.song_key.split(" by ")[1]}</p>
                                            </div>
                                            {#if $viewport.width < 500}
                                                <p
                                                    style="
                                                        color: {colorRange(song.percent)};
                                                    "
                                                    class="songwriters-label"
                                                >
                                                    {song.cutTwo}
                                                    {#if song.genderArray.indexOf("nb") > -1}
                                                        <span style="color:#e67a5b;">(incl. {song.genderArray.filter(d => d == "nb").length} non-binary writer{song.genderArray.filter(d => d == "nb").length > 1 ? "s" : ''})
                                                        </span>
                                                    {/if}
                                                </p>
                                            {/if}                                        
                                            <div class="songwriters">
                                                <Group {song} size={groupSize} labelPlacement={labelPlacementValue} height={groupHeight}/>
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
         margin: 0 auto;
         width: 100%;
    }
    .song-container {
        font-family: 'DM Sans';
        width:100%;
    }

    .bar-container {
        flex-grow: 1;
        width: 1px;
        display: flex;
    }

    .faux {
        width: 30px;
    }

    .women-only {
        /* border: 5px solid #006C45; */
    }

    .bar-wrapper {
        width: 100%;
    }
    

    .count-row {
        font-family: 'DM Sans';
        margin: 0;
        width: 100px;
        margin-right: 10px;
        text-align: right;
        font-size: 14px;
        line-height: 1.1;
    }
    .bar {
        position: absolute;
        width: 100%;
        height: 100%;
        top:-10px;
        left: 0;
        height: calc(100% + 10px);
        background: linear-gradient(90deg, rgba(255,177,9,.25) 100px, rgba(0,0,0,0) 521px);
    }
    .song-key {
        margin-right: 10px;
        padding-left: 10px;
    }

    .count-label {
        position: absolute;
        right: 0;
        margin: 0;
        font-family: 'DM Sans';
        font-size: 14px;
        padding-left: 8px;
        top: 50%;
        transform: translate(100%, -50%);
        left: auto;
    }

    .row {
        display: flex;
        width: 100%;
    }
    .year {
        text-align: center;
        font-family: var(--sans);
        font-size: 21px;
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
        overflow: hidden;
    }

    .fixed-text-wrapper {
        height: 50px;
        position: relative;
        font-family: 'DM Sans';
    }
    .bar-rect {
        height: 5px;
        width: 10px;
        position: relative;
        align-self: center;
    }

    .songwriters-legend {
        position: absolute;
        bottom: 0;
        right: 2em;
        text-shadow: 2px 2px 0px #191817, -2px -2px 0px #191817, -2px 0px 0px #191817, 2px -2px 0px #191817, -2px 0px 0px #191817, 0px 2px 0px #191817, 0px -2px 0px #191817, 1px 1px 0px #191817, 1px 1px 0px #191817, -1px 1px 0px #191817, -1px -1px 0px #191817, -1px 0px 0px #191817, 0px 1px 0px #191817, 0px -1px 0px #191817;
    }

    .songwriters-label {
        text-shadow: 2px 2px 0px #191817, -2px -2px 0px #191817, -2px 0px 0px #191817, 2px -2px 0px #191817, -2px 0px 0px #191817, 0px 2px 0px #191817, 0px -2px 0px #191817, 1px 1px 0px #191817, 1px 1px 0px #191817, -1px 1px 0px #191817, -1px -1px 0px #191817, -1px 0px 0px #191817, 0px 1px 0px #191817, 0px -1px 0px #191817;
        color: #c498de;
        margin: 0;
        margin-right: -3px;
        font-size: 14px;
    }

    .black-overlay {
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, rgba(25,24,23,.9) 0px,rgba(25,24,23,.9) 10px, rgba(25,24,23,0)  100px, rgba(25,24,23,0)  calc(100% - 200px), rgba(25,24,23,.9) 100%);
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
        border-bottom: 1px dashed rgba(255,255,255,.25);
        padding-right: 10px;
        position: relative;
    }


    .songwriters {
        display: flex;
        align-self: flex-end;
        max-width: 500px;
        flex-wrap: wrap;
        position: relative;
        z-index: 1;
        justify-content: center;
    }
    .fixed-text {
        font-family: 'DM Sans';
        font-size: 24px;
        text-align: center;
    }

    .song-title {
        margin: 0;
        text-transform: capitalize;
        font-size: 18px;
        font-weight: 400;
        opacity: .9;
        font-family: var(--sans);
    }

    .song-artist {
        margin: 0;
        font-family: var(--sans);
        text-transform: capitalize;
        font-size: 14px;
        opacity: .7;
        font-weight:400;
    }

    .fixed {
		position: sticky;
		top: 0em;
        z-index: 10000;
        width: calc(100% - 0px);
        left: 0;
        right: 0;
        margin: 0 auto;
	}
    .fixed-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        /* justify-content: space-between; */
        /* flex-direction: column; */
        pointer-events: none;
    }

    .songwriter {
        height: 50px;
        position: relative;
    }

    .songwriter img {
        position: absolute;
        width: 100%;
        max-width: none;
        bottom: 0;
    }

    .counter {
        display: flex;
        width: calc(100% - 20px);
        margin: 0 auto;
        padding-bottom: 10px;
        bottom: 0;
        position: absolute;
    }

    .men-bar {
        background: var(--color-men);
    }

    .women-bar {
        background: var(--color-women);
    }

    .counter-label {
        font-family: 'DM Sans';
        font-size: 16px;
        margin: 0;
        width: 263px;
        text-align: right;
        text-transform: uppercase;
        font-size: 14px;
        letter-spacing: 1px;
        align-self: center;
    }

    .fixed-text-wrapper-center {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        margin: 0 auto;
        transform: translate(0,-50%);
    }

    .fixed-text-wrapper-center span {
        text-shadow: 2px 2px 0px #191817, -2px -2px 0px #191817, -2px 0px 0px #191817, 2px -2px 0px #191817, -2px 0px 0px #191817, 0px 2px 0px #191817, 0px -2px 0px #191817, 1px 1px 0px #191817, 1px 1px 0px #191817, -1px 1px 0px #191817, -1px -1px 0px #191817, -1px 0px 0px #191817, 0px 1px 0px #191817, 0px -1px 0px #191817;
        background-color: var(--color-bg);
        padding: 10px;
    }
    
    @media only screen and (max-width: 1000px) {
        .counter-label {
            width: 120px;
            font-size: 12px;
        }
        .song-key {
            padding-left: 0;
        }

        .song {
            padding: 0;
            padding-right: 10px;
        }
        .song-artist {
            max-width: 200px;
        }
        .fixed-text-wrapper-center {
            width: calc(100% - 20px);
        }
        .fixed-text-wrapper-center span {
            padding: 0;
        }
    }
    @media only screen and (max-width: 600px) {
        .song-artist, .song-title {
            max-width: 200px;
            font-size: 14px;
        }
        .song-artist {
            font-size: 12px;
        }

        .songwriters {
            max-width: 200px;
        }
    }

    @media only screen and (max-width: 500px) {
        .song-key {
            width: 40%;
            flex-grow: 1;
        }
        .song {
            flex-wrap: nowrap;
        }

        .songwriters {
            max-width: calc(60% - 100px);
        }
        .songwriters-label {
            text-shadow: 2px 2px 0px #191817, -2px -2px 0px #191817, -2px 0px 0px #191817, 2px -2px 0px #191817, -2px 0px 0px #191817, 0px 2px 0px #191817, 0px -2px 0px #191817, 1px 1px 0px #191817, 1px 1px 0px #191817, -1px 1px 0px #191817, -1px -1px 0px #191817, -1px 0px 0px #191817, 0px 1px 0px #191817, 0px -1px 0px #191817;
            color: #c498de;
            margin-right: -3px;
            font-size: 11px;
            margin: 0;
            text-align: right;
            line-height: 1;
            max-width: 100px;
        }

        .songwriters-label span {
            display: inline;
            margin-top: 5px;
            font-size: 11px;
        }

    }

</style>







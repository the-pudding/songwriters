<script>
    import Scrolly from "$components/helpers/Scrolly.svelte";
    import { range } from "d3";
    import { onMount,getContext } from "svelte";
    import Group from "$components/Group.svelte"	
	import viewport from "$stores/viewport.js";
    import { flip } from 'svelte/animate';

    export let viewportHeight;
    export let data;
    export let text;

    let mobile = false;
    let value;
    let sizeGroup = .4
    let fixedHeight;

    let stepValue = 0;

    let men = range(223);
    let women = range(32);

    let average = {song_key:"Songwriters for Hit Songs by The Average",genderArray:["f","m","m","m","m","m"],cutTwo:"avearge"};

    let legendGroup = {song_key:"Songwriters for Hit Songs by The Average",genderArray:["m","f","nb"],cutTwo:"avearge"};

    let dataForChart;

    const getOpacity = (song,value) => {
        if(stepValue == 0){
            return 0;
        }
        if(stepValue == 2 && song.cutTwo !== "only men"){
            return .1;
        }
        if(stepValue == 3 && song.cutTwo !== "only women"){
            return .1;
        }
        return 1;
    }

	onMount(async () => {
        // average = {genderArray:["m","m","m","m","m","f"],cutTwo:"avearge"};
        // data.push(average)
        // console.log(data);

        dataForChart = JSON.parse(JSON.stringify(data))
            .sort((a,b) => {

                let aLength = a["genderArray"].length;
                let bLength = b["genderArray"].length;
                // console.log(aLength,bLength)
                return bLength - aLength;
            });
        // dataForChart.push({song_key:"average by average",genderArray:["m","m","m","m","m","f"],cutTwo:"avearge"});
	});

    $: stepValue = value ? value : 0;
    $: sizeGroup = $viewport.width < 1100 ? mobile ? $viewport.width < 400 ? .22 : .25 : .3 : .4;
    $: mobile = $viewport.width < 600 ? true : false;
</script>


<section class="wrapper" data-mobile={mobile}>
    <div data-height={fixedHeight} class="fixed" bind:clientHeight={fixedHeight}
    >
        <div class="black-shade"
            style="
            opacity:{value > 0 ? '0' : ''};
            "
        >
        </div>

        <div class="average-wrapper">
        </div>
        {#if dataForChart}
        {#each dataForChart as song (song.song_key)}
            {@const random = Math.random()}
            <div animate:flip={{duration:1000, delay:0}} class="song-wrapper"
                style="
                    opacity:{getOpacity(song,value)};
                    transform: translate3d(0,0,0);
                    --transitionDelay: {stepValue == 1 ? `${random*3000}ms` : ''};
                    position:{value == 3 && song.cutTwo == "only women" && !mobile ? 'absolute' : ''};
                    max-width:{value == 3 && song.cutTwo == "only women" && !mobile ? '150px' : ''};
                    right:{value == 3 && song.cutTwo == "only women" && !mobile ? '0' : ''};
                    left:{value == 3 && song.cutTwo  == "only women" && !mobile ? '0' : ''};
                    margin:{value == 3 && song.cutTwo == "only women" && !mobile ? '0 auto' : ''};
                "
            >
                <div class="songwriters"
                    style="
                        margin:{value == 3 && song.cutTwo == "only women" ? '0 auto' : ''};
                    "
                >
                    <Group {song} size={sizeGroup} labelPlacement={"first"} height={30}/>
                </div>
                <div class="song-key">
                    <p class="song-title">{song.song_key.split(" by ")[0].split(" (")[0]} 
                        <span class="song-artist song-artist-mobile">
                            {#if mobile}
                                {song.song_key.split(" by ")[1].split("ft.")[0]}
                            {:else}
                                {song.song_key.split(" by ")[1]}
                            {/if}
                        </span></p>
                    <p class="song-artist song-artist-desktop">
                        {#if mobile}
                            {song.song_key.split(" by ")[1].split("ft.")[0]}
                        {:else}
                            {song.song_key.split(" by ")[1]}
                        {/if}
                    </p>
                </div>
            </div>
        {/each}   
        {/if}   
        <div class="legend-row"
            style="
            opacity:{value > 0 && value < 3 ? '' : '0'};
            "
        >
            <div class="legend">
                <Group song={legendGroup} size={mobile ? sizeGroup : sizeGroup-.1} labelPlacement={"legend"} height={20}/>
            </div>
        </div>
    </div>
    <!-- </div> -->
    <!-- </div> -->
    <Scrolly bind:value>
        {#each text as slide,i}
                {@const active = value === i}
                <div class="step single-col {text.length - 1}-{i}" class:active data-fixed={fixedHeight} data-vh={viewportHeight}
                    style="
                        margin-top: {i == 0 ? -fixedHeight/2 : ''}px;
                        padding-top: {i == 0 ? '0' : ''}px;
                        opacity: {fixedHeight ? 1 : 0};
                        min-height: {viewportHeight*.75}px;
                    "
                >
                    {#if i == 0}
                        <div class="song-wrapper">
                            <div class="songwriters">
                                <Group song={average} size={.8} labelPlacement={"first"} height={30}/>
                            </div>
                            <!-- <div class="song-key">
                                <p class="song-title">{average.song_key.split(" by ")[0]}</p>
                                <p class="song-artist">{average.song_key.split(" by ")[1].slice(0,20)}</p>
                            </div> -->
                        </div>        
                    {/if}
                    <div class="tape-wrapper">
                        <p class="para foreground">
                            <span>{@html slide}</span>
                        </p>
                        <p class="para background">
                            <span>{@html slide}</span>
                        </p>
                    </div>
                    {#if i == 1}
                        <details><summary>How did we identify writers&rsquo; gender?</summary>test</details>
                    {/if}
                </div>
        {/each}
    </Scrolly>
</section>

<style>

details {
    font-family: var(--sans);
    font-size: 14px;
    background: var(--color-bg);
    padding: 10px;
    width: 320px;
    margin: 0 auto;
    text-align: center;
    cursor: pointer;

}   
.single-col .para {
    text-align: center;
}

.wrapper .step {
    min-height: 100px;
    padding-top: 500px;
    padding-bottom: 300px;
}


.step .songwriters {
    max-width: none;
}

.legend {
    display: flex;
    justify-content: center;
    margin-top: 40px;
}

.legend-row {
    width: 100%;
}

.black-shade {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: var(--color-bg);
    transition: opacity 1s;
    z-index: 100000;
    pointer-events: none;
    display: none;
}
.step {
    z-index: 10000;
    position: relative;
    transition: opacity 1s;
}
.sticky {
    position: sticky;
    width: 100%;
    top: 0;
}

.wrapper {
    position: relative;
}
.fixed {
    position: sticky;
    top: 0;
    padding-top: 20px;
    /* top: 50%; */
    display: flex;
    /* position: absolute; */
    flex-wrap: wrap;
    justify-content: center;
    /* transform: translate(0,-50%); */
    /* flex-direction: column; */
    /* height: 100vh; */
}
.men {
    display: flex;
    flex-wrap: wrap;
    transform: translate(0,-50%);
}
.fixed-wrapper {
    position: relative;
}

.songwriters {
        display: flex;
        align-self: flex-end;
        max-width: 150px;
        flex-wrap: wrap;
        position: relative;
        z-index: 1;
        margin: 0 auto;
        justify-content: center;
        margin-left: 20px;
        margin-right: 20px;
    }

.man, .woman {
	width: 20px;
	height: 30px;
	background-color: blue;
	margin: 1px;
	display: inline-block;
	color: white;
	font-size: 12px;
}

.woman {
	background-color: red;
}
.song-wrapper {
    max-width: 400px;
    margin: 0 auto;
    margin-bottom: 20px;
    opacity: 1;
    transition: opacity 2s;
    /* transition-delay: var(--transitionDelay); */
    top: 50%;
    left: 0;
    right: 0;
}

.song-key {
    z-index: 100;
    font-family: 'DM Sans';
    position: relative;
    margin-top: -10px;
}

.average-wrapper {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 1000;
}

.song-title {
        margin: 0;
        font-size: 16px;
        opacity: .8;
        text-align: center;
        text-transform: capitalize;
        text-shadow: 2px 2px 0px #191817, -2px -2px 0px #191817, -2px 0px 0px #191817, 2px -2px 0px #191817, -2px 0px 0px #191817, 0px 2px 0px #191817, 0px -2px 0px #191817, 1px 1px 0px #191817, 1px 1px 0px #191817, -1px 1px 0px #191817, -1px -1px 0px #191817, -1px 0px 0px #191817, 0px 1px 0px #191817, 0px -1px 0px #191817;
    }

    .song-artist {
        margin: 0;
        opacity: .65;
        font-size: 14px;
        text-align: center;
        text-transform: capitalize;
        text-shadow: 2px 2px 0px #191817, -2px -2px 0px #191817, -2px 0px 0px #191817, 2px -2px 0px #191817, -2px 0px 0px #191817, 0px 2px 0px #191817, 0px -2px 0px #191817, 1px 1px 0px #191817, 1px 1px 0px #191817, -1px 1px 0px #191817, -1px -1px 0px #191817, -1px 0px 0px #191817, 0px 1px 0px #191817, 0px -1px 0px #191817;
    }
    .song-artist-mobile {
        display: none;
    }

    @media only screen and (max-width: 1000px) {
            .single-col {
                width: calc(100% - 20px);
            }
            .song-artist-mobile {
                display: inline;
                max-width: 100%;
                font-size: 12px;
                opacity: .8;
            }
            .songwriters {
                margin: 0 auto;
                max-width: none;
                min-width: 100px;
            }

            .song-artist-desktop {
                max-width: 100%;
                font-size: 12px;
                opacity: .8;
                line-height: 1;
                display: none;
            }
            .song-title {
                font-size: 12px;
                line-height: 1;
                opacity: 1;
            }
            .song-wrapper {
                margin-left: 10px;
                margin-right: 10px;
                margin-bottom: 15px;
                position: relative;
            }
            .legend-row {
                width: auto;
                display: flex;
            }
            .legend {
                margin-top: 0;
                align-self: center;
                margin: 0;
            }

            .song-key {
                position: absolute;
                left: 0;
                right: 0;
                margin: 0 auto;
                top: 15px;
            }
    }

    @media only screen and (max-width: 500px) { 
        .song-wrapper {
            margin-bottom: 8px;
            margin-left: 8px;
            margin-right: 8px;
        }
        .song-title {
            opacity: .9;
            font-size: 11px;
        }
        .song-artist-mobile {
            font-size: 11px;
            opacity: .8;
        }
    }


   


</style>
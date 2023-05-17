<script>
    import { onMount,getContext } from "svelte";	
	import Scrolly from "$components/helpers/Scrolly.svelte";

    export let dataByYear;
    let value;
    let textKeys = [];
    let textValue;

    let text = {
        0: "There’s a few with some female writers …",
        1: "But mostly men …",
        4: "It’s been 5 years. How long is this going to take???",
        7: "This is getting ridiculous",
        8: "Wait! Here are 2 …"
    }

    const getText = () => {
        if(textKeys.indexOf(value) > -1){
            textValue = text[value];
        }
        // textValue = "hi";
    };

    $: getText(value)
    $: textKeys = Object.keys(text).map(d => +d);

    $: console.log(textKeys.indexOf(value),value)
</script>

<section id="scrolly">
    <!-- {#if textKeys.indexOf(value) > -1} -->
        <h2>
            {@html textValue}
        </h2>
    <!-- {/if} -->
    <div class="song-wrapper">

        <Scrolly bind:value>
            {#each dataByYear.filter(d => +d[0] < 2020 && +d[0] > 2009) as dataYear,i}
                {@const active = value === i}

                <div class="step year-section" class:active>
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
                        </div>
                    {/each}
                </div>
            {/each}
        </Scrolly>

    </div>
</section>

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

    h2 {
		position: sticky;
		top: 4em;
	}
</style>







<script>
    import { onMount,getContext } from "svelte";	
	import Scrolly from "$components/helpers/Scrolly.svelte";

    export let dataByYear;
    let value;
    let textKeys = [];

    let text = {
        0: "tktk look at all the men",
        1: "tktk so many songs written just by men",
        2: "where are all the songs written by <ul>just</ul> women?",
        5: "wonder how long it'll take before we see a song written by all women...",
        12: "oh here it is! we actually went 10 years without one happening"

    }

    $: textKeys = Object.keys(text).map(d => +d);

    $: console.log(textKeys.indexOf(value),value)
</script>


<p>[all the text in this is super placeholder—but meant to make the point you wanted to do in your first table in your draft where "In fact, since the year 2000 there have been so few top 5 hits written exclusively by women that I can list them all.
    "]</p>

<section id="scrolly">
    {#if textKeys.indexOf(value) > -1}
        <h2>
            {@html text[value]}
        </h2>
    {/if}
	<div class="spacer" />
    <div class="song-wrapper">
        <Scrolly bind:value>
            {#each dataByYear as dataYear,i}
                {@const active = value === i}

                <div class="step year-section" class:active>
                    <p class="year">{dataYear[0]}</p>
                    {#each dataYear[1] as song}
                        <div style="width:100%; display:flex; justify-content:center;">
                            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
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
                </div>
            {/each}
        </Scrolly>
    </div>
</section>

<style>
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

	.spacer {
		height: 75vh;
	}
</style>







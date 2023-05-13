<script>
    import { onMount,getContext } from "svelte";
	const data = getContext("data").filter((d) => {
        return d.womenOnly == "only women" && +d.year > 1999;
    });

</script>


<p>[here we transition to your points around performance..]</p>
<p>In fact, since the year 2000 there have been so few top 5 hits written exclusively by women that I can list them all.</p>

<div class="song-wrapper">

    {#each data as song}
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
<p>[I haven't made this viz yet, but the above one will morph to highlights ones with performer is also songwriter]</p>

<p>Note how all of these songs were performed by women. Men rarely perform hits written exclusively by women. In fact, there are only 13 top 5 hits since the inception of the Hot 100 written exclusively by women and performed exclusively by men.
</p>
<p>[viz changes to highlight those performed by songwriter]</p>
<p>Even if we expand our search to top 5 hits written exclusively by women and performed by groups that contain at least one woman, the list of songs only grows by 16.
</p>
<p>[viz expands accordingly]</p>

<p>Note how women who wrote more than half of these songs were vocalists in the performing groups. This should not come as a shock. Though women have been systematically excluded from nearly every role in music, they have been accepted as singers. In fact, you will seldom find a hit female songwriter who is not also a singer. Sophia Somajo, who co-wrote Britney Spears’s number one hit “3”, noted in 2018 that “Being young and a woman [she] could only be a singer, and that was it.” She wasn’t trusted as a writer until she first proved herself as a vocalist.
</p>

<p>You cannot talk about the history of music without talking about sexism. In fact, you don’t have to look far to find evidence of men actively limiting the musical activities that women were allowed to be involved in.
</p>

<p>In 1860, an unknown author was disturbed that female cellists would have to straddle their instruments: “Lady-fiddlers we are tolerably well accustomed to, but the attitude of a lady grasping with all her limbs a violoncello is one to the grotesqueness of which usage has not yet reconciled us.” A few decades later, composer Gustave Kerker expressed his distaste for how certain instruments distorted female faces: “Women cannot possibly play brass instruments and look pretty, and why should they spoil their good looks?” Around the same time, critic George Upton wrote in his book Woman in Music about how women’s emotions made them great song interpreters (i.e., vocalists) but prevented them from writing great works.
</p>
<p>Though we felt it was beyond the scope of the piece to suggest solutions, we thought it would be important to highlight how alive many of these attitudes remain. Below we provide you with a tool to sift through this data. If you want to see every top 5 hit, written exclusively by men and performed exclusively by women, just click on the relevant filters. If you want to see every top 5 hit with at least one non-binary writer, do the same.
</p>

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







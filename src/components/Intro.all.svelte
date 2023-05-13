<script>
    import { onMount,getContext } from "svelte";		
    import { groups } from "d3";
	import { json } from "@sveltejs/kit";


    let data = getContext("data").map(d => d.genderArray).flat(1);
    data = data.sort((a,b) => {
        return b.localeCompare(a)
    })

    let dataByGender = groups(data, d => d);
    console.log(dataByGender)

    
</script>

<p>[Chris, my line notes are all in square brackets!]</p>
<p>[the intro needs to be tightened up, at least enough to intro the main point that the industry is 14% women]</p>
<p>
    Women have been excluded from nearly every role in the music industry since the beginning of time. A study sponsored by Spotify and USC’s Annenberg Institute found that only 14% of songwriters and 2.8% of producers who worked on the 1,100 most popular songs released between 2012 and 2022 were women.
</p>
<p>
    That is a depressing statistic. Given that that study only looked at the last decade, we wondered if expanding the temporal scope would tell a different story. So we grabbed songwriting credits on all 3,083 top 5 hits on the Billboard Hot 100 between 1958 and 2022. We then used a combination of interviews, obituaries, official bios, Discogs, and Wikipedia to identify the gender of all 6100+ songwriters.
</p>
<p>
    [this "chart" will be beautified, but right now each letter is a songwriter credit. imagine that it's just a sea of people and we color code them by gender. this will make it easy to "see" the 13%. we'll make this smaller so it can fit on one screen]
</p>

<div class="song-wrapper">
    {#each dataByGender as gender}
        <div class="songwriter"
            style="
                color:{gender[0] == "m" ? "blue" : gender[0] == "f" ? "red" : ''};
            "
        >
            {gender[1].join(', ')}
            <!-- {#each gender[1] as songwriter}
                {songwriter},&nbsp;
            {/each} -->
        </div>
    {/each}
</div>

<p>
    We quickly realized that this data was deceptive. what this hides is how this actually shapes the songs we listen to. Most songs are written entirely by men.
</p>

<p>
    let's start with last year.
</p>
<p>
    [this viz makes the point of "In fact, since the year 2000 there have been so few top 5 hits written exclusively by women that I can list them all." but walks through them in the data.    "]
</p>


<style>
    .songwriter {
        width: 100%;
        display: flex;
        flex-wrap:wrap;
    }
    .song-wrapper {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
    }
    .song {
        display: flex;
        /* width: 100%; */
        background-color: #f7f7f7;
        margin: 5px;
        border: 1px solid black;
        padding: 0 10px;
    }
</style>







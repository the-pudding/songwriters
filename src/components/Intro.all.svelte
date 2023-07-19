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

<div class="song-wrapper">
    {#each dataByGender as gender}
        <div class="songwriter"
            style="
                color:{gender[0] == "m" ? "blue" : gender[0] == "f" ? "red" : ''};
            "
        >
            {gender[1].join(', ')}
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







<script>
    import { onMount,getContext } from "svelte";	
	const data = getContext("data");
    console.log(data)
</script>

<div class="song-wrapper">
    {#each data as song}
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
    {/each}
</div>


<style>
    .song-wrapper {
        display: flex;
        flex-wrap: wrap;
    }
    .song {
        display: flex;
        background-color: #f7f7f7;
        margin: 5px;
        border: 1px solid black;
        padding: 0 10px;
    }
</style>







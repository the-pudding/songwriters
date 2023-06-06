<script>
    export let dataByYear;
    $:console.log(dataByYear)

</script>

<div class="line-chart-container">
    {#each dataByYear as year, i}
        <div class="year">
            {#each year[1].sort((a,b) => b.gender.localeCompare(a.gender)) as songwriter}
                <div class="songwriter {songwriter.gender == "f" ? "f" : ''}"></div>
            {/each}
            {#if i % 5 == 0}
                <div class="year-text">{year[0].slice(2,4)}</div>
            {/if}
        </div>
    {/each}

</div>


<style>

    .line-chart-container {
        display: flex;
    }
    .year {
        display: flex;
        position: relative;
        margin-left: 3px;
        flex-direction: column-reverse;
    }
    .year-text {
        position: absolute;
        bottom: -20px;
        font-size: 12px;
        width: 30px;
    }
    .songwriter {
        width: 10px;
        height: 2px;
        margin-bottom: 1px;
        background-color: blue;
    }
    .f {
         background-color: red;
    }
</style>
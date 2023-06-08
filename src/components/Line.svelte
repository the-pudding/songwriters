<script>
    export let dataByYear;
    $:console.log(dataByYear)

    let width = 15;
    let gap = 3;
    let songGap = 1;
    let height = 2;
    let chartHeight = Math.max.apply(Math,dataByYear.map(d => d[1].length))* (height + songGap)
    let chartWidth = dataByYear.length * (width + gap);
    let columnWidth = width + gap;

</script>

<svg width={chartWidth} height={chartHeight} style="width:{chartWidth}px; height:{chartHeight}px;" class="line-chart-container">
    {#each dataByYear as year, i}
        <g class="year" transform="translate({columnWidth * i},0)">
            {#each year[1].sort((a,b) => b.gender.localeCompare(a.gender)) as songwriter, s}
                <rect fill="{songwriter.gender == "f" ? "red" : 'blue'}" transform="translate(0,{-s * (songGap + height) + chartHeight})" width={width} height={height} class="songwriter {songwriter.gender == "f" ? "f" : ''}"></rect>
            {/each}
            {#if i % 5 == 0}
                <text class="year-text">{year[0].slice(2,4)}</text>
            {/if}
        </g>
    {/each}

</svg>


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
        width: 15px;
        height: 2px;
        margin-bottom: 1px;
        background-color: blue;
        fill: blue;
    }
    .f {
         background-color: red;
         fill: red;
    }
</style>
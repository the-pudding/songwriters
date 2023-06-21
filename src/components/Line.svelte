<script>
    export let dataByYear;

    let width = 15;
    let gap = 3;
    let songGap = 1;
    let height = 2;
    let chartHeight = Math.max.apply(Math,dataByYear.map(d => d[1].length))* (height + songGap)
    let chartWidth = dataByYear.length * (width + gap) - 200;
    let columnWidth = width + gap;

    let dataForChart = JSON.parse(JSON.stringify(dataByYear))
    let minFemaleSecondHighlight;
    let womenOnlyLength;
    let menOnlyLength;
    
    dataForChart
        .forEach((d,i) => {
            d[1].sort((a,b) => b.gender.localeCompare(a.gender));
            if(d[0] == "2022"){
                let womenOnly = d[1].filter(j => {
                    return ["pf","f"].indexOf(j.gender) > -1;
                })

                let menOnly = d[1].filter(j => {
                    return ["m","pm"].indexOf(j.gender) > -1;
                })

                womenOnlyLength = womenOnly.length;
                menOnlyLength = menOnly.length
                minFemaleSecondHighlight = `${womenOnly[0].title}-${womenOnly[0].writer}`
            }
            
            


            
        })
    
    


    

</script>
{#if dataForChart}
<div 
    style="
    " 
    class="line-chart-container"
>
    {#each dataForChart as year, i}
        <div class="year"
            style="
                width:{width}px;
                height:{chartHeight}px;
            "
        >
            {#each year[1] as songwriter, s}
                <div
                    style="
                        transform:translate(0px,{-s * (songGap + height)}px);
                    "
                    data-writer="{songwriter.writer}"
                    class="songwriter {songwriter.gender == "f" ? "f" : songwriter.gender == "m" ? 'm' : 'nb'}"
                >
                </div>
                {#if year[0] == "1975" && s == year[1].length - 1}                  
                    <div 
                        style="
                        transform:translate(0px,{-s * (songGap + height)}px);
                        "
                        data-writer="{songwriter.writer}"
                        class="songwriter {songwriter.gender == "f" ? "f" : songwriter.gender == "m" ? 'm' : 'nb'} highlight"
                    >
                    <div class="highlight-container">
                        <p>This bar represents <span class="woman-color">Jane Doe</span>, credited as a songwriter on Mary Smith’s Song”</p>
                        <svg viewBox="0 0 20 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.10511 51.5173C9.59934 52.0115 10.4007 52.0115 10.8949 51.5173L18.9489 43.4633C19.4431 42.9691 19.4431 42.1678 18.9489 41.6735C18.4546 41.1793 17.6533 41.1793 17.1591 41.6735L10 48.8326L2.84091 41.6735C2.34668 41.1793 1.54537 41.1793 1.05114 41.6735C0.556905 42.1678 0.556905 42.9691 1.05114 43.4633L9.10511 51.5173ZM8.73444 -5.53194e-08L8.73444 50.6224L11.2656 50.6224L11.2656 5.53194e-08L8.73444 -5.53194e-08Z" fill="#FFFAD7"/>
                        </svg>
                    </div>
                    
                    </div>
                {/if}

                {#if year[0] == "2022" && `${songwriter.title}-${songwriter.writer}` == minFemaleSecondHighlight }
                    <div
                        class="songwriter highlight highlight-right"
                        style="
                            transform:translate(0px,{-s * (songGap + height)}px);
                            height:{womenOnlyLength * (songGap + height)}px;
                        "
                    >
                        <p>There were <span class="woman-color">{womenOnlyLength} women songwriters</span> with a top 5 hit in 2022.</p>
                    </div>

                    <div
                    class="songwriter highlight highlight-right highlight-right-men"
                    style="
                        transform:translate(0px,0px);
                        height:{(year[1].length * (height + songGap))- (womenOnlyLength * (songGap + height)) - (1 * (songGap + height))}px;
                    "
                >
                    <p>There were <span class="man-color">{menOnlyLength} men songwriters</span> with a top 5 hit in 2022.</p>
                </div>
                {/if}

            {/each}
            {#if i % 5 == 0 || i == dataByYear.length - 1}
                <span 
                    class="year-text"
                    style="
                        
                    "
                >
                    &rsquo;{year[0].slice(2,4)}
                </span>
            {/if}
        </div>
    {/each}

</div>
{/if}

<style>

    .line-chart-container {
        display: flex;
        margin: 0 auto;
        padding-right: 150px;
        max-width: 1300px;
    }
    .year {
        display: flex;
        position: relative;
        margin-left: 7px;
        flex-direction: column-reverse;
        width: 1px;
        flex-grow: 1;
    }
    .year-text {
        position: absolute;
        bottom: -25px;
        font-size: 16px;
        width: 30px;
        font-family: 'DM Sans';
        fill: white;
        left: 50%;
        transform:translate(-40%,0)
    }
    .songwriter {
        width: 100%;
        height: 2px;
        margin-bottom: 1px;
        position: absolute;
        background-color: var(--color-men);
        fill: var(--color-men);
        bottom: 0;
    }
    .f {
         background-color: var(--color-women);
         fill: var(--color-women);
    }
    .nb {
        fill: red;
    }
    .highlight {
        border: 3px solid #FFFAD7;
        height: 12px;
        width: calc(100% + 10px);
        background: none;
        /* transform: translate(-5px,8px); */
        left: -5px;
        bottom: -5px;
    }

    .highlight .highlight-container {
        position: absolute;
        transform: translate(0%,-100%);
        left: 0px;
        top: -10px;
    }

    .highlight-container p {
        font-family: 'DM Sans';
        width: 300px;
    }

    .highlight-container svg {
        width: 15px;
    }

    .highlight-right {
        border: none;
        border-left: 2px solid white;
        left: auto;
        width: 1px;
        right: -7px;
        bottom: 0;
        height: 100%;
    }

    .highlight-right:before {
        content: '';
        position: absolute;
        top: -2px;
        left: 0;
        transform: translate(-100%,0);
        width: 7px;
        border-top: 2px solid white;
    }

    .highlight-right:after {
        content: '';
        position: absolute;
        bottom: -2px;
        width: 7px;
        transform: translate(-100%,0);
        border-top: 2px solid white;
    }

    .highlight-right p {
        position: absolute;
        top: 50%;
        left: 10px;
        font-family: 'DM Sans';
        width: 120px;
        font-size: 14px;
        transform: translate(0,-50%);
        margin: 0;
    }
</style>
<script>
    export let dataByYear;
	import viewport from "$stores/viewport.js";

    let width = 15;
    let gap = 3;
    let songGap = 1;
    let height = 2;
    let chartHeight = Math.max.apply(Math,dataByYear.map(d => d[1].length))* (height + songGap)
    let chartWidth = dataByYear.length * (width + gap) - 200;
    let columnWidth = width + gap;
    let rectWidth = 0;

    let dataForChart = JSON.parse(JSON.stringify(dataByYear))
    let minFemaleSecondHighlight;
    let minFemaleSecondHighlightMobile;
    let minNBSecondHighlightMobile;

    let womenOnlyLengthMobile;
    let womenOnlyLength;
    let menOnlyLength;
    let nbOnlyLengthMobile;
    let nbOnlyLength;


    let mobile = false;

    $: mobile = $viewport.width < 900 ? true : false;
    $: mobile, updateMobile();

    const updateMobile = () => {
        gap = 1;
    }

    let captionData = [];
    
    dataForChart
        .forEach((d,i) => {
            d[1].sort((a,b) => b.gender_clean.localeCompare(a.gender_clean));

            captionData.push(`${d[0]}: ${d[1].length} songwriters, of which ${d[1].filter(j => { return ["pf","f"].indexOf(j.gender_clean) > -1; }).length} are women`)

            if(d[0] == "2022"){
                let womenOnly = d[1].filter(j => {
                    return ["pf","f"].indexOf(j.gender_clean) > -1;
                })

                let menOnly = d[1].filter(j => {
                    return ["m","pm"].indexOf(j.gender_clean) > -1;
                })

                let nbOnly = d[1].filter(j => {
                    return ["nb"].indexOf(j.gender_clean) > -1;
                })

                womenOnlyLength = womenOnly.length;
                menOnlyLength = menOnly.length
                nbOnlyLength = nbOnly.length;
                minFemaleSecondHighlight = `${womenOnly[0].title}-${womenOnly[0].writer}`
            }
            if(d[0] == "2018"){
                let womenOnly = d[1].filter(j => {
                    return ["pf","f"].indexOf(j.gender_clean) > -1;
                })

                womenOnlyLengthMobile = womenOnly.length;
                minFemaleSecondHighlightMobile = `${womenOnly[0].song_key}-${womenOnly[0].writer}`
            }
            if(d[0] == "2014"){
                let nbOnly = d[1].filter(j => {
                    return ["nb"].indexOf(j.gender_clean) > -1;
                })

                console.log(nbOnly)

                nbOnlyLengthMobile = nbOnly.length;
                minNBSecondHighlightMobile = `${nbOnly[0].song_key}-${nbOnly[0].writer}`
            }

        })


</script>
{#if dataForChart}
<div class="wrapper">
<figure 
    style="
    " 
    class="line-chart-container"
>
    <figcaption class="sr-only" aria-live="polite">The share of songwriters who are women, men, or non-binary, from 1958 to 2022. {captionData.join(", ")}.</figcaption>
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
                    class="songwriter {songwriter.gender_clean == "f" ? "f" : songwriter.gender_clean == "m" ? 'm' : 'nb'}"
                >
                </div>
                {#if year[0] == "1975" && s == year[1].length - 1}                  
                    <div 
                        style="
                        transform:translate(0px,{-s * (songGap + height)}px);
                        "
                        data-writer="{songwriter.writer}"
                        bind:clientWidth={rectWidth}
                        class="songwriter {songwriter.gender_clean == "f" ? "f" : songwriter.gender_clean == "m" ? 'm' : 'nb'} highlight"
                    >
                    <div class="highlight-container"
                        style="left:{rectWidth/2 - 7}px;"
                    >
                        <p>This bar represents <span class="woman-color">{songwriter.writer}</span>, credited as a songwriter on &ldquo;{songwriter.song_key.split(" by ")[0]}&rdquo; by {songwriter.song_key.split(" by ")[1]}.</p>
                        <svg viewBox="0 0 20 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.10511 51.5173C9.59934 52.0115 10.4007 52.0115 10.8949 51.5173L18.9489 43.4633C19.4431 42.9691 19.4431 42.1678 18.9489 41.6735C18.4546 41.1793 17.6533 41.1793 17.1591 41.6735L10 48.8326L2.84091 41.6735C2.34668 41.1793 1.54537 41.1793 1.05114 41.6735C0.556905 42.1678 0.556905 42.9691 1.05114 43.4633L9.10511 51.5173ZM8.73444 -5.53194e-08L8.73444 50.6224L11.2656 50.6224L11.2656 5.53194e-08L8.73444 -5.53194e-08Z" fill="#FFFAD7"/>
                        </svg>
                    </div>
                    
                    </div>
                {/if}


                {#if $viewport.width > 500}
                    {#if year[0] == "2022" && `${songwriter.title}-${songwriter.writer}` == minFemaleSecondHighlight }
                        <div
                            class="songwriter highlight highlight-right"
                            style="
                                transform:translate(0px,{-s * (songGap + height)}px);
                                height:{womenOnlyLength * (songGap + height)}px;
                            "
                        >
                            <p><span class="woman-color">Women had {womenOnlyLength} songwriting credits</span> for top 5 hits in 2022.</p>
                        </div>

                        <div
                            class="songwriter highlight highlight-right highlight-right-men"
                            style="
                                transform:translate(0px,-{nbOnlyLength * (songGap + height)}px);
                                height:{(year[1].length * (height + songGap)) - (nbOnlyLength * (songGap + height)) - (womenOnlyLength * (songGap + height)) - (2 * (songGap + height))}px;
                            "
                        >
                            <p><span class="man-color-text">Men had {menOnlyLength}</span> songwriting credits for top 5 hits in 2022.</p>
                        </div>

                        <div
                            class="songwriter highlight highlight-right highlight-right-nb"
                            style="
                                transform:translate(0px,0px);
                                height:{(nbOnlyLength * (songGap + height))}px;
                            "
                        >
                            <p>{nbOnlyLength} songwriting credits went to <span style="color:#ff8080;">non-binary writers</span> in 2022.</p>
                        </div>
                    {/if}
                {:else}
                    {#if year[0] == "2018" && `${songwriter.song_key}-${songwriter.writer}` == minFemaleSecondHighlightMobile }
                        <div
                            class="songwriter highlight highlight-right highlight-mobile"
                            style="
                                transform:translate(-100%,{-s * (songGap + height)}px);
                                height:{womenOnlyLengthMobile * (songGap + height)}px;
                            "
                        >
                        <p><span class="woman-color">Women had {womenOnlyLength} songwriting credits</span> for top 5 hits in 2018.</p>
                    </div>
                    {/if}
                    {#if year[0] == "2014" && `${songwriter.song_key}-${songwriter.writer}` == minNBSecondHighlightMobile }
                        <div
                        class="songwriter highlight highlight-right highlight-mobile highlight-mobile-nb"
                        style="
                            transform:translate(-100%,{-s * (songGap + height)}px);
                            height:{nbOnlyLengthMobile * (songGap + height)}px;
                        "
                        >
                        <p>{nbOnlyLengthMobile} songwriting credits went to <span style="color:#FFF;">non-binary writers</span> in 2014.</p>
                    </div>
                    {/if}

                {/if}


            {/each}
            {#if i % 5 == 0 || i == dataByYear.length - 1}
                <span 
                    class="year-text"
                    style="
                        
                    "
                >
                    &rsquo;{JSON.stringify(year[0]).slice(2,4)}
                </span>
            {/if}
        </div>
    {/each}
    
</figure>
<div class="legend">
    <div class="item">
        <div class="box"
            style="
                background-color: red;
            "
        >
        </div>
        <p 
            class="desc"
            style=""
        >
            Non-binary
        </p>
    </div>
    <div class="item">
        <div class="box"
            style="
                background-color: var(--color-women);
            "
        >
        </div>
        <p 
            class="desc"
            style="
            "
        >
            Women
        </p>
    </div>
    <div class="item">
        <div class="box"
            style="
            "
        >
        </div>
        <p 
            class="desc"
            style="
            "
        >
            Men
        </p>
    </div>
</div>
</div>

{/if}

<style>
    .wrapper {
        width: 100%;
        overflow: hidden;
        padding-top: 10px;
    }
    .desc {
        font-family: var(--sans);
        align-self: center;
        margin-right: 10px;
        font-size: 14px;
    }
    .legend {
        display: flex;
        margin-top: 20px;
        width: calc(100% - 150px);
        justify-content: flex-end;
        margin-bottom: 100px;
    }
    .item {
        display: flex;
    }
    .box {
        width: 10px;
        height: 10px;
        margin-right: 10px;
        align-self: center;
        background-color: var(--color-men);
    }
    .line-chart-container {
        display: flex;
        margin: 0 auto;
        padding-right: 150px;
        max-width: 1300px;
        width: calc(100% - 50px);
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
        background-color: red;
    }
    .highlight {
        border: 3px solid #FFFAD7;
        height: 12px;
        width: calc(100% + 10px);
        background: none;
        /* transform: translate(-5px,8px); */
        left: -5px;
        bottom: -5px;
        line-height: 1.2;
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

    .highlight-right-nb:before {
        display: none;
    }



    .highlight-right-nb p {
        bottom: 0;
        top: auto;
        transform: translate(0,50%);
    }

    .highlight-mobile {
        left: -7px;
        right: auto;
    }

    .highlight-mobile p {
        transform: translate(-100%,-50%);
        text-align: right;
        left: -10px;
    }

    .highlight-mobile:after, .highlight-mobile:before {
        transform: translate(-2px,0);
    }
    .highlight-mobile-nb {
        bottom: 0;
        top: auto;
    }
    .highlight-mobile-nb p {
        text-shadow: 2px 2px 0px #191817, -2px -2px 0px #191817, -2px 0px 0px #191817, 2px -2px 0px #191817, -2px 0px 0px #191817, 0px 2px 0px #191817, 0px -2px 0px #191817, 1px 1px 0px #191817, 1px 1px 0px #191817, -1px 1px 0px #191817, -1px -1px 0px #191817, -1px 0px 0px #191817, 0px 1px 0px #191817, 0px -1px 0px #191817;
        transform: translate(-100%,-100%);
        width: 150px;
    }

    @media only screen and (max-width: 900px) {
        .year {
            margin-left: 5px;
        }
        .line-chart-container {
            width: calc(100% - 20px);
        }
        .year-text {
            font-size: 12px;
            bottom: -17px;
        }
        .highlight {
            z-index: 10000;
        }
    }

    @media only screen and (max-width: 500px) {
        .line-chart-container {
            padding-right: 0;
        }
        .legend {
            width: calc(100% - 10px);
        }
        .year {
            margin-left: 2px;
        }
        
        .highlight-container p {
            font-size: 14px;
            max-width: 220px;
            text-shadow: 2px 2px 0px #191817, -2px -2px 0px #191817, -2px 0px 0px #191817, 2px -2px 0px #191817, -2px 0px 0px #191817, 0px 2px 0px #191817, 0px -2px 0px #191817, 1px 1px 0px #191817, 1px 1px 0px #191817, -1px 1px 0px #191817, -1px -1px 0px #191817, -1px 0px 0px #191817, 0px 1px 0px #191817, 0px -1px 0px #191817;
        }
    }



</style>
<script>
    import { onMount,getContext } from "svelte";
    import Scrolly from "$components/helpers/Scrolly.svelte";
	import SortTable from "./helpers/SortTable.svelte";
    import { flip } from "svelte/animate";
    import { groups, scaleLinear } from "d3";
    import { fade } from "svelte/transition";
	import viewport from "$stores/viewport.js";
	import { Divide } from "lucide-svelte";

    export let dataByYear;
    export let dataByGender;
    export let dataByYearWomenOnly;
    export let slides;
    export let cut;

    export let yearRange;

    let value;
    let dataForChart;

    let nearTermData;  
    let allTimeData; 
    
    let performerKey = {
        "m": "men performer",
        "f": "women performer",
        "m;f": "mixed gender band"
    }


    let viewControl = {
        0: "close",
        1: "close",
        2: "close",
        3: "close"
    }

    let colorRange = scaleLinear().domain([0,1]).range(["purple","green"]);

    const getColor = (first,value) => {
        if(cut=="two" && first.artist_gender == "m" && value==1) {
            return "grey"
        }

        if(cut=="two" && first.artist_gender == "m;f" && value==2) {
            return "red"
        }
        if(cut=="two" && first.artist_gender == "f" && value==3) {
            let singerSongwriter = false;
            let songwriterList = first.songwriters;
            
            songwriterList.forEach(d => {
                console.log(d.writer_is_artist);
            })
            
            return "blue"
        }

        return colorRange(first.percent);
    }

    const updateData = (value,years) => {

            let tempData;
            tempData = JSON.parse(JSON.stringify(dataByYear));

            tempData = tempData.filter((d) => {
                return d[0] < years[1] && d[0] > years[0];
            })

            const totalTiles = tempData.reduce(
                (accumulator, currentValue) => accumulator + currentValue[1].length,
                0,
            );

            tempData = tempData.map(d => d[1]).flat(1).sort((a,b) => {
                return b.percent - a.percent  || a.artist_gender.localeCompare(b.artist_gender);
            });


            let viewportPixels = $viewport.height * $viewport.width;

            let ratio = 1;//width/height;


            let maxSquare = 300;
            let bigCardsNeeded = tempData.filter(d => d.percent == 1).length;
            
            let squareSize = Math.floor(Math.min($viewport.width, $viewport.height) / Math.sqrt(bigCardsNeeded));
            squareSize = Math.min(maxSquare,squareSize);

            let getMaxSizeOfSquaresInRect = function(n,w,h) {
                var sw, sh;
                var pw = Math.ceil(Math.sqrt(n*w/h));
                if (Math.floor(pw*h/w)*pw < n) sw = h/Math.ceil(pw*h/w);
                else sw = w/pw;
                var ph = Math.ceil(Math.sqrt(n*h/w));
                if (Math.floor(ph*w/h)*ph < n) sh = w/Math.ceil(w*ph/h);
                else sh = h/ph;
                return Math.max(sw,sh);
            }
            
            const squareDimension = getMaxSizeOfSquaresInRect(bigCardsNeeded,$viewport.width, $viewport.height);
            const squareSizeSmall = getMaxSizeOfSquaresInRect(totalTiles,$viewport.width, $viewport.height);
            

            squareSize = squareDimension

            let width = squareSize;
            let height = squareSize;

            let cardPixels = width * height * totalTiles;

            let scaleReduction = cardPixels/viewportPixels;
            let cardArea = width * height / scaleReduction;

            let newCardHeight = squareSizeSmall//Math.sqrt(cardArea/ratio);
            let newCardWidth = squareSizeSmall//newCardHeight*ratio;

            let formerCardCountWidth = $viewport.width/width;

            let cardWidthDecease = newCardWidth/width;
            let widthChange = formerCardCountWidth/cardWidthDecease/formerCardCountWidth;

            let newCardCountWidth = Math.floor($viewport.width * widthChange / width);
            let secondCountWidth = Math.floor($viewport.width * 1 / width);
            

            tempData.forEach((d,i) => {
                d.width = squareSize;
                d.cardWidthDecease = cardWidthDecease;
                d.widthChange = widthChange
                d.x = Math.floor(i % newCardCountWidth * width);
                d.y = Math.floor(i / newCardCountWidth) * height;

                if(d.cutTwo == "only women"){
                    d.targetX = Math.floor(i % secondCountWidth * width);
                    d.targetY = Math.floor(i / secondCountWidth) * height;
                }
                else {
                    d.targetX = d.x;
                    d.targetY = d.y;
                }

            })

            return groups(tempData, (d) => {
                if(d.percent == 1){
                    return "women";
                }
                return "no-women";
            });
        


        // else if(value > 0){
        //     tempData = JSON.parse(JSON.stringify(dataByYearWomenOnly))
        //     tempData = tempData.filter((d) => {
        //         return d[0] < 2023 && d[0] > 1958;
        //     });

        //     tempData = tempData.map(d => d[1]).flat(1);
        //     tempData = tempData.sort((a,b) => {
        //         return a.artist_gender.localeCompare(b.artist_gender);
        //     })
        // }        
    }

    
    

    // $: console.log(dataForChart,value)
    onMount(async () => {
		nearTermData = updateData(value,yearRange);
        dataForChart = nearTermData;
  	});

    $: console.log(value)

    $: dataForChart = nearTermData;




</script>
<!--  -->

<!-- opacity:{value == 0 && song.percent < 1 ? 0 : 1}; -->

<section class="wrapper">
    <div class="song-wrapper {value == 5 ? 'performer-slide' : ''}">
        <p class="chart-header">songs written by women</p>    
        
        {#if dataForChart}
            {@const cardWidthDecease = dataForChart[0][1][0].cardWidthDecease}
            {@const widthChange = dataForChart[0][1][0].widthChange}

            {#if value < 5 || value == undefined}
                <div class="song-col-wrapper"
                    style="width:{widthChange*100}%; transform:translate3d(0,0,0) scale({value == undefined || viewControl[value] == "far" ? cardWidthDecease : 1});"
                >
                    <div class="song-col">
                        {#each dataForChart as cut}
                        <div 
                            class="{cut[0]} {cut[0] == "no-women" && viewControl[value] == "close" ? "fade" : ""}"
                        >
                        {#each cut[1] as song}
                            <div 
                                style="
                                    transform:translate3d({value == undefined || viewControl[value] == "far" ? song.x : song.targetX}px,{ value == undefined || viewControl[value] == "far" ? song.y : song.targetY}px, 0);
                                    background-color:{getColor(song,value)};
                                    width:{song.width-10}px;
                                    height:{song.width-10}px;
                                "
                                class="song-row"
                            >
                                
                                <!-- <p class="song-name"
                                    style="color:{value == 1 ? "white" : ''};"
                                >
                                    {song.song_key}
                                </p> -->
                                <!-- {#if song["songwriters"].length > 0}
                                    <p class="writer-name">
                                        written by {song["songwriters"].map(d => d.writer).join(", ")}
                                    </p>
                                {/if} -->
                            </div>
                        {/each}
                        
                        {#if cut[0] == "women"}
                            <div class="text-overlay" style="opacity:{value == undefined || viewControl[value] == "far" ? 0 : 1};">
                                {#each cut[1] as song}
                                    <div
                                        class="song-row song-row-text"
                                        style="
                                        transform:translate3d({song.targetX}px,{song.targetY}px, 0);
                                        width:{song.width-10}px;
                                        height:{song.width-10}px;
                                        "
                                    >
                                        <p class="song-name"
                                        style="
                                            color:{value == 1 && cut=="one" ? "white" : ''};
                                            font-size: {song.width < 100 ? 12 : ''}px;
                                        "
                                        >
                                            {song.song_key}
                                        </p>
                                        {#if song["songwriters"].length > 0}
                                            <p class="writer-name"
                                            style="
                                                font-size: {song.width < 100 ? 10 : ''}px;
                                            "
                                            >
                                                written by {song["songwriters"].map(d => d.writer).join(", ")}
                                            </p>
                                        {/if}        
                                    </div>    
                                {/each}
                            </div>
                        {/if}
                        
                    </div>
                        {/each}
                    </div>
                </div>
            {/if}
        {/if}
    </div>
    <Scrolly bind:value>
        {#each slides as slide,i}
                {@const active = value === i}
                <div class="step double-col-step" class:active>
                    <div class="double-col-para-wrapper">
                        <p class="double-col para">
                            {@html slide}
                        </p>
                    </div>
                    
                </div>
        {/each}
    </Scrolly>
</section>


<style>


    .text-overlay {
        opacity: 0;
        transition: opacity .5s 2.5s;
    }
    .writer-name {
        font-size: 14px;
        margin: 0;
    }
    .performer-slide .performer-flag {
        color: red;
    }

    .song-col {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;

        position: relative;
        display: block;
        width: 100%;
        height: 100%;
    }

    .performer {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 30px;
    }

    

    .song-row {
        background-color: #f7f7f7;
        transform: translate3d(0,0,0) scale(0);
        position: absolute;
        transition: transform .5s 2s;
    }

    .song-row-text {
        background: none;
    }

    .song-name {
        /* max-width: 150px; */
        width: 100%;
        margin: 0;
        max-height: 60px;
    }

    .year {
        text-align: center;
        font-size: 12px;
        margin: 0;
    }


    .song-wrapper {
        position: sticky;
        top: 0rem;
        display: flex;
        flex-wrap: wrap;
        width: 100vw;
        height: 100vh;
        transform: translate3d(0,0,0);
        overflow: hidden;
    }

    .song-col-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform-origin: center;
        transform: translate3d(-50%,-50%,0) scale(1);
        width: 100%;


        top: 0;
        left: 0;
        transform: translate(0%,0%) scale(1);
        transform-origin: top left;
        transition: transform 1s 1s;


    }

    .no-women {
        transition: opacity 1s 1.5s;
    }

    .fade {
        opacity: 0;
    }

    .song {
        display: flex;
        /* width: 100%; */
        background-color: #f7f7f7;
        margin: 5px;
        transform: translate3d(0,0,0) scale(0);
        padding: 0 10px;
        display: none;
    }

    .step {
        min-height: 75vh;
    }

    h2 {
		position: sticky;
		top: 4em;
	}

    .wrapper {
        position: relative;
    }

	.spacer {
		height: 75vh;
	}

    
    .male-performer, .mixed-performer {
        border-color: black;
        border: 1px solid black;
        background-color: rgba(0,0,0,.2);
    }
</style>







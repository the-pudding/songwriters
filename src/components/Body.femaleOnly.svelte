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
    let linearGradientHeight = 0;
    let secondGradientTop = 0;
    let dataForChart;
    let marginX = 25;
    let marginY  = 25;

    let nearTermData;  
    let allTimeData; 
    
    let performerKey = {
        "m": "men performer",
        "f": "women performer",
        "m;f": "mixed gender band"
    }

    let labelTestKey = {
        "only women":"Songs Written by Only Women",
        "mixed, majority men":"Songs Written by Mixed Gender Teams",
        "only men":"Songs Written by Only Men"
    }


    let viewControl = {
        0: "close",
        1: "close",
        2: "close",
        3: "close"
    }

    let colorRange = scaleLinear().domain([0,1]).range(["#944EBE","#FFB102"]);

    const getOpacity = (first,value) => {
        if(cut=="two" && first.artist_gender == "m" && value==1) {
            return 1
        }

        if(cut=="two" && first.artist_gender == "m;f" && value==2) {
            return 1
        }
        if(cut=="two" && first.artist_gender == "f" && value==3) {
            let singerSongwriter = false;
            let songwriterList = first.songwriters;
        
            return 1
        }
        if(value > 0){
            return .2;
        }
        return 1;
    }

    const getColor = (first,value) => {
        // if(cut=="two" && first.artist_gender == "m" && value==1) {
        //     return "grey"
        // }

        // if(cut=="two" && first.artist_gender == "m;f" && value==2) {
        //     return "red"
        // }
        // if(cut=="two" && first.artist_gender == "f" && value==3) {
        //     let singerSongwriter = false;
        //     let songwriterList = first.songwriters;
            
        //     songwriterList.forEach(d => {
        //         console.log(d.writer_is_artist);
        //     })
            
        //     return "blue"
        // }

        return colorRange(first.percent);
    }

    const updateData = (value,years) => {

            let tempData;
            let availableWidth = $viewport.width - (marginX*2);
            let availableHeight = $viewport.height - (marginY*2);



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


            let viewportPixels = availableHeight * availableWidth;

            let ratio = 1;//width/height;


            let maxSquare = 300;
            let bigCardsNeeded = tempData.filter(d => d.percent == 1).length;
            
            let squareSize = Math.floor(Math.min(availableWidth, availableHeight) / Math.sqrt(bigCardsNeeded));
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
            
            const squareDimension = getMaxSizeOfSquaresInRect(bigCardsNeeded,availableWidth, availableHeight);
            const squareSizeSmall = getMaxSizeOfSquaresInRect(totalTiles,availableWidth, availableHeight);
            

            squareSize = squareDimension

            let width = squareSize;
            let height = squareSize;

            let cardPixels = width * height * totalTiles;

            let scaleReduction = cardPixels/viewportPixels;
            let cardArea = width * height / scaleReduction;

            let newCardHeight = squareSizeSmall//Math.sqrt(cardArea/ratio);
            let newCardWidth = squareSizeSmall//newCardHeight*ratio;

            let formerCardCountWidth = availableWidth/width;

            let cardWidthDecease = newCardWidth/width;
            let widthChange = formerCardCountWidth/cardWidthDecease/formerCardCountWidth;

            let newCardCountWidth = Math.floor(availableWidth * widthChange / width);
            let secondCountWidth = Math.floor(availableWidth * 1 / width);
            
            let minMenOnlyValues = [];

            tempData.forEach((d,i) => {
                d.width = squareSize;
                d.cardWidthDecease = cardWidthDecease;
                d.widthChange = widthChange
                d.x = Math.floor(i % newCardCountWidth * width);
                d.y = Math.floor(i / newCardCountWidth) * height;
                d.id = i;

                
                if(d.cutTwo == "only women") {
                    d.y = d.y - squareSize/2;
                }
                else if(d.cutTwo == "only men"){
                    d.y = d.y + squareSize/2;
                    d.x = d.x + squareSize;
                    minMenOnlyValues.push(d.y);
                }
                else {
                    d.x = d.x + squareSize/2;
                }

                if(d.cutTwo == "only women"){
                    d.targetX = Math.floor(i % secondCountWidth * width);
                    d.targetY = Math.floor(i / secondCountWidth) * height;
                }
                else {
                    d.targetX = d.x;
                    d.targetY = d.y;
                }

            })

            linearGradientHeight = Math.min(...tempData.filter(d => d.cutTwo != "only women").map(d => d.y)) + squareSize*1.5;
            secondGradientTop = Math.min(...minMenOnlyValues);
            console.log(secondGradientTop);

            return groups(tempData, (d) => {
                return d.cutTwo;
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
<div class="legend">
    <div class="box">
    </div>
    <p>= 1 Song</p>
</div>
<section class="wrapper">
    <div class="song-wrapper {value == 5 ? 'performer-slide' : ''}">
        {#if dataForChart}
            {@const cardWidthDecease = dataForChart[0][1][0].cardWidthDecease}
            {@const widthChange = dataForChart[0][1][0].widthChange}

            {#if value < 5 || value == undefined}
                <div class="song-col-wrapper"
                    style="
                        width:{widthChange*100}%;
                        transform:translate3d(0,0,0) scale({value == undefined || viewControl[value] == "far" ? cardWidthDecease : 1});
                        left:{marginX}px;
                        top:{marginY}px;
                    "
                >
                
                    <!-- {#if viewControl[value] == "far" || value == undefined} -->
                        <div out:fade={{duration:250,delay:2500}} in:fade={{duration:1000,delay:0}} class="gradient-waffle" style="
                        top:{0};
                        height: {linearGradientHeight}px;
                        ">
                        </div>

                        <div out:fade={{duration:250,delay:2500}} in:fade={{duration:1000,delay:2500}} class="gradient-waffle" style="
                            top:{secondGradientTop}px;
                            z-index:2500;
                            opacity: .5;
                            height: {linearGradientHeight}px;
                        ">
                        </div>
                    <!-- {/if} -->


                    <div class="song-col">
                        {#each dataForChart as cut}
                        {@const minY = Math.min(...cut[1].map(d => d.y))}
                        {@const minX = Math.min(...cut[1].map(d => d.x))}
                        {@const minBox = Math.min(...cut[1].filter(d => d.x == minX).map(d => d.id))}
                        <div 
                            data-minY={minY}
                            data-minX={minX}
                            data-minBox={minBox}
                            class="{cut[0] != "only women" ? "no-women" : 'only-women'} {cut[0] !== "only women" && viewControl[value] == "close" ? "fade" : ""}"
                            style="
                                position:relative;
                                z-index:{cut[0] != 'only women' && cut[0] != 'only men' ? '5000' : ''};
                                "
                        >
                        {#each cut[1] as song, j}
                            {#if song.id == minBox && Object.keys(labelTestKey).indexOf(cut[0]) > -1}
                                {#if viewControl[value] == "far" || value == undefined}
                                    <div
                                        class="label-test" 
                                        style="
                                        transform:translate3d({song.x}px,{song.y+(song.width)}px, 0) scale(calc(1 / {cardWidthDecease}));
                                        "
                                        in:fade={{delay: 2000}}>
                                            <span 
                                            class="only-women-label only-women-label-bg"
                                            style="
                                                background: {getColor(song,value)};
                                                color: #ffb202;
                                                font-weight: {song.cutTwo == "only women" ? '500' : ''};
                                                opacity:{song.cutTwo == "only women" ? '' : song.cutTwo == "only men" ? '0' : '.5'};
                                            "
                                            >
                                                {labelTestKey[song.cutTwo]}
                                            </span>
                                            <span 
                                                class="only-women-label"
                                                style="
                                                    background: none;
                                                    font-weight: {song.cutTwo == "only women" ? '500' : ''};
                                                    text-shadow: {song.cutTwo == "only women" ? '' : '-3px -3px 1px rgba(25, 24, 23, 0.1), -3px -2px 1px rgba(25, 24, 23, 0.1), -3px -1px 1px rgba(25, 24, 23, 0.1), -3px 0px 1px rgba(25, 24, 23, 0.1), -3px 1px 1px rgba(25, 24, 23, 0.1), -3px 2px 1px rgba(25, 24, 23, 0.1), -3px 3px 1px rgba(25, 24, 23, 0.1), -2px -3px 1px rgba(25, 24, 23, 0.1), -2px -2px 1px rgba(25, 24, 23, 0.1), -2px -1px 1px rgba(25, 24, 23, 0.1), -2px 0px 1px rgba(25, 24, 23, 0.1), -2px 1px 1px rgba(25, 24, 23, 0.1), -2px 2px 1px rgba(25, 24, 23, 0.1), -2px 3px 1px rgba(25, 24, 23, 0.1), -1px -3px 1px rgba(25, 24, 23, 0.1), -1px -2px 1px rgba(25, 24, 23, 0.1), -1px -1px 1px rgba(25, 24, 23, 0.1), -1px 0px 1px rgba(25, 24, 23, 0.1), -1px 1px 1px rgba(25, 24, 23, 0.1), -1px 2px 1px rgba(25, 24, 23, 0.1), -1px 3px 1px rgba(25, 24, 23, 0.1), 0px -3px 1px rgba(25, 24, 23, 0.1), 0px -2px 1px rgba(25, 24, 23, 0.1), 0px -1px 1px rgba(25, 24, 23, 0.1), 0px 1px 1px rgba(25, 24, 23, 0.1), 0px 2px 1px rgba(25, 24, 23, 0.1), 0px 3px 1px rgba(25, 24, 23, 0.1), 1px -3px 1px rgba(25, 24, 23, 0.1), 1px -2px 1px rgba(25, 24, 23, 0.1), 1px -1px 1px rgba(25, 24, 23, 0.1), 1px 0px 1px rgba(25, 24, 23, 0.1), 1px 1px 1px rgba(25, 24, 23, 0.1), 1px 2px 1px rgba(25, 24, 23, 0.1), 1px 3px 1px rgba(25, 24, 23, 0.1), 2px -3px 1px rgba(25, 24, 23, 0.1), 2px -2px 1px rgba(25, 24, 23, 0.1), 2px -1px 1px rgba(25, 24, 23, 0.1), 2px 0px 1px rgba(25, 24, 23, 0.1), 2px 1px 1px rgba(25, 24, 23, 0.1), 2px 2px 1px rgba(25, 24, 23, 0.1), 2px 3px 1px rgba(25, 24, 23, 0.1), 3px -3px 1px rgba(25, 24, 23, 0.1), 3px -2px 1px rgba(25, 24, 23, 0.1), 3px -1px 1px rgba(25, 24, 23, 0.1), 3px 0px 1px rgba(25, 24, 23, 0.1), 3px 1px 1px rgba(25, 24, 23, 0.1), 3px 2px 1px rgba(25, 24, 23, 0.1), 3px 3px 1px rgba(25, 24, 23, 0.1)'};
                                                    color:{song.cutTwo == "only women" ? '' : '#FFF'};
                                                "
                                            >
                                                {labelTestKey[song.cutTwo]}
                                            </span>
                                    </div>
                                {/if}                    
                            {/if}
                            <div
                                data-id={song.id}
                                style="
                                    transform:translate3d({value == undefined || viewControl[value] == "far" ? song.x : song.targetX}px,{ value == undefined || viewControl[value] == "far" ? song.y : song.targetY}px, 0);
                                    background-color:{getColor(song,value)};
                                    width:{song.width-5}px;
                                    height:{song.width-5}px;
                                    opacity: {getOpacity(song,value)};
                                    z-index:{song.cutTwo == "only women" ? '100000' : song.cutTwo == "only men" ? '1000' : '5000'};
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
                        <!-- opacity:{value == undefined || viewControl[value] == "far" ? 1 : 1}; -->
                        {#if cut[0] == "only women"}
                            <div class="text-overlay"
                                style=""
                            >
                                {#each cut[1] as song}
                                    <div
                                        class="song-row song-row-text"
                                        style="
                                        opacity:{value == undefined || viewControl[value] == "far" ? 0 : 1};
                                        transform:translate3d({song.targetX}px,{song.targetY}px, 0);
                                        width:{song.width-5}px;
                                        height:{song.width-5}px;

                                        transition:{value == undefined || viewControl[value] == "far" ? '' : "transform .5s 2s, opacity 2s 2.5s"};
                                        }
                                        height:{song.width-5}px;
                                        "
                                    >
                                    {#if song["songwriters"].length > 0}
                                        <p class="writer-name"
                                        style="
                                            font-size: {song.width < 100 ? 11 : ''}px;
                                        "
                                        >
                                            <span>{song["songwriters"].map(d => d.writer).join(", ")}</span> {song.song_key}
                                        </p>
                                    {/if}
                                        <!-- <p class="song-name"
                                        style="
                                            color:{value == 1 && cut=="one" ? "white" : ''};
                                            font-size: {song.width < 100 ? 10 : ''}px;
                                        "
                                        >
                                            {song.song_key}
                                        </p> -->
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
                <div class="step"
                    style="margin-top:{i == 0 ? '400px' : ''};"
                    class:active
                >
                    <div class="tape-wrapper">
                        <p class="para foreground">
                            <span>{@html slide}</span>
                        </p>
                        <p class="para background">
                            <span>{@html slide}</span>
                        </p>
                    </div>               
                </div>
        {/each}
    </Scrolly>
</section>


<style>

    .step {
        max-width: 400px;
        margin-left: 100px;
    }
    .text-overlay {
        opacity: 1;
        /* transform: translate3d(0,0,0); */
        /* transition: opacity .5s 2.5s; */
    }
    
    .performer-slide .performer-flag {
        color: red;
    }

    .only-women-label {
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(0,-50%);
        background-color: var(--color-women);
        /* box-shadow: -3px -3px 1px rgba(255, 177, 2,1), -3px -2px 1px rgba(255, 177, 2,1), -3px -1px 1px rgba(255, 177, 2,1), -3px 0px 1px rgba(255, 177, 2,1), -3px 1px 1px rgba(255, 177, 2,1), -3px 2px 1px rgba(255, 177, 2,1), -3px 3px 1px rgba(255, 177, 2,1), -2px -3px 1px rgba(255, 177, 2,1), -2px -2px 1px rgba(255, 177, 2,1), -2px -1px 1px rgba(255, 177, 2,1), -2px 0px 1px rgba(255, 177, 2,1), -2px 1px 1px rgba(255, 177, 2,1), -2px 2px 1px rgba(255, 177, 2,1), -2px 3px 1px rgba(255, 177, 2,1), -1px -3px 1px rgba(255, 177, 2,1), -1px -2px 1px rgba(255, 177, 2,1), -1px -1px 1px rgba(255, 177, 2,1), -1px 0px 1px rgba(255, 177, 2,1), -1px 1px 1px rgba(255, 177, 2,1), -1px 2px 1px rgba(255, 177, 2,1), -1px 3px 1px rgba(255, 177, 2,1), 0px -3px 1px rgba(255, 177, 2,1), 0px -2px 1px rgba(255, 177, 2,1), 0px -1px 1px rgba(255, 177, 2,1), 0px 1px 1px rgba(255, 177, 2,1), 0px 2px 1px rgba(255, 177, 2,1), 0px 3px 1px rgba(255, 177, 2,1), 1px -3px 1px rgba(255, 177, 2,1), 1px -2px 1px rgba(255, 177, 2,1), 1px -1px 1px rgba(255, 177, 2,1), 1px 0px 1px rgba(255, 177, 2,1), 1px 1px 1px rgba(255, 177, 2,1), 1px 2px 1px rgba(255, 177, 2,1), 1px 3px 1px rgba(255, 177, 2,1), 2px -3px 1px rgba(255, 177, 2,1), 2px -2px 1px rgba(255, 177, 2,1), 2px -1px 1px rgba(255, 177, 2,1), 2px 0px 1px rgba(255, 177, 2,1), 2px 1px 1px rgba(255, 177, 2,1), 2px 2px 1px rgba(255, 177, 2,1), 2px 3px 1px rgba(255, 177, 2,1), 3px -3px 1px rgba(255, 177, 2,1), 3px -2px 1px rgba(255, 177, 2,1), 3px -1px 1px rgba(255, 177, 2,1), 3px 0px 1px rgba(255, 177, 2,1), 3px 1px 1px rgba(255, 177, 2,1), 3px 2px 1px rgba(255, 177, 2,1), 3px 3px 1px rgba(255, 177, 2,1); */
        z-index: 1000000;
        margin: 0;
        font-size: 18px;
        padding: 0 5px;
        font-family: 'DM Sans';
        color: var(--color-bg);
        
    }

    .label-test {
        color: black;
        transform: scale(calc(1/.2));
        transform-origin: left;
        z-index: 100000000;
        position: absolute;
        font-family: 'DM Sans';
        width: 350px;
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
        transition: transform .5s 2s, opacity .5s;
    }

    .song-row-text {
        background: none;
        z-index: 1000000;
        font-family: 'DM Sans';
        color: var(--color-bg);
        opacity: 0;
        display: flex;
        flex-direction: column;
    }

    .song-name {
        /* max-width: 150px; */
        width: 100%;
        margin: 0;
        font-size: 12px;
        max-height: 60px;
        line-height: 1;
        padding: 5px;
    }

    .writer-name {
        font-size: 12px;
        margin: 0;
        line-height: 1;
        flex-grow: 1;
        padding: 2px;
        letter-spacing: -.5px;        
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

    .gradient-waffle {
        width: 100%;
        background: linear-gradient(180deg, #181716 0px, rgba(25,24,23,0) 100%);
        height: 180px;
        position: absolute;
        z-index: 10000;
        top: -25px;
    }

    
    .male-performer, .mixed-performer {
        border-color: black;
        border: 1px solid black;
        background-color: rgba(0,0,0,.2);
    }

    .no-women {
        transition: opacity 1s 1.5s;
    }

    .writer-name span {
        font-weight: 400;
        font-family: var(--display);
        letter-spacing: .3px;
        font-size: 14px;
        text-transform: capitalize;
        /* background-color: rgba(0,0,0,.2); */
    }

    .legend {
        display: flex;
        justify-content: flex-start;
        max-width: var(--col-width);
        margin: 0 auto;
    }

    .box {
        width: 10px;
        align-self: center;
        height: 10px;
        background: white;
        margin-right: 10px;
    }

    .legend p {
        align-content: center;
        font-family: var(--sans);
        margin: 0;
    }
</style>







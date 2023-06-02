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
    let value;
    let dataForChart;

    let cardWidthDecease = 0;
    let widthChange = 0;
    
    let performerKey = {
        "m": "men performer",
        "f": "women performer",
        "m;f": "mixed gender band"
    }

    let colorRange = scaleLinear().domain([0,1]).range(["purple","green"]);

    const getColor = (first) => {
        return colorRange(first.percent);
    }

    const updateData = () => {

        if(!dataForChart) {
            let tempData;
            tempData = JSON.parse(JSON.stringify(dataByYear));

            tempData = tempData.filter((d) => {
                return d[0] < 2023 && d[0] > 1999;
            })

            const totalTiles = tempData.reduce(
                (accumulator, currentValue) => accumulator + currentValue[1].length,
                0,
            );

            tempData = tempData.map(d => d[1]).flat(1).sort((a,b) => {
                return b.percent - a.percent;
            });


            let viewportPixels = $viewport.height * $viewport.width;

            let cardPixels = 322 * 121 * totalTiles;
            let scaleReduction = cardPixels/viewportPixels;
            let cardArea = 322 * 121 / scaleReduction;

            let newCardHeight = Math.sqrt(cardArea/2.6611);
            let newCardWidth = newCardHeight*2.6611;

            let formerCardCountWidth = $viewport.width/322;

            cardWidthDecease = newCardWidth/322;
            widthChange = formerCardCountWidth/cardWidthDecease/formerCardCountWidth;

            let newCardCountWidth = Math.floor($viewport.width * widthChange / 322);
            let secondCountWidth = Math.floor($viewport.width * 1 / 322);


            tempData.forEach((d,i) => {
                if(d.cutTwo == "only women"){
                    d.targetX = Math.floor(i % secondCountWidth * 322);
                    d.targetY = Math.floor(i / secondCountWidth) * 126;
                }
                d.x = Math.floor(i % newCardCountWidth * 322);
                d.y = Math.floor(i / newCardCountWidth) * 126;

                if(d.cutTwo == "only women"){
                    d.targetX = Math.floor(i % secondCountWidth * 322);
                    d.targetY = Math.floor(i / secondCountWidth) * 126;
                }
                else {
                    d.targetX = d.x;
                    d.targetY = d.y;
                }

            })




            dataForChart = tempData;
        }
        


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

    $: updateData(value);

    

    // $: console.log(dataForChart,value)
    



</script>
<!--  -->


<section class="wrapper">
    <div class="song-wrapper {value == 3 ? 'performer-slide' : ''}">
        <p class="chart-header">songs written by women</p>    
        
        {#if value < 3 || value == undefined}
            <div class="song-col-wrapper {value == 0 ? 'expanded' : ''}"
                style="width:{widthChange*100}%; transform:translate3d(0,0,0) scale({value == undefined ? cardWidthDecease : 1});"
            >
                <div class="song-col">
                    {#each dataForChart as song, i (song.id)}
                        <div 
                            style="
                                transform:translate3d({value == 0 ? song.targetX : song.x}px,{value == 0 ? song.targetY : song.y}px, 0);
                                background-color:{getColor(song)};
                                
                                opacity:{value == 0 && song.percent < 1 ? 0 : 1};
                            "
                            class="song-row {value == 2 && song.artist_gender == "m;f" ? 'mixed-performer' : ''} {value == 1 && song.artist_gender == "m" ? 'male-performer' : ''}">
                                <!-- <p class="song-name">
                                    {song.song_key}
                                </p>
                                {#if song["songwriters"].length > 0}
                                <p class="writer-name">
                                    written by {song["songwriters"].map(d => d.writer).join(", ")}
                                </p>
                                {/if} -->
                        </div>
                    {/each}
                </div>
            </div>
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
        font-size: 18px;
        display:flex;
        max-width: 300px;
        justify-content:flex-start;
        margin: 5px 10px;
        flex-wrap: wrap;
        border-left: 2px solid red;
        padding: 10px;
        background-color: #f7f7f7;

        position: absolute;
        top: 0;
        left: 0;
        width: 300px;
        height: 122px;

        transition: opacity 1s;

        
        /* max-width: 150px; */
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
        top: 1rem;
        display: flex;
        flex-wrap: wrap;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }

    .song-col-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform-origin: center;
        transform: translate(-50%,-50%) scale(1);
        width: 100%;


        top: 0;
        left: 0;
        transform: translate(0%,0%) scale(1);
        transform-origin: top left;
        transition: transform 1s;


    }

    .song {
        display: flex;
        /* width: 100%; */
        background-color: #f7f7f7;
        margin: 5px;
        border: 1px solid black;
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

    .expanded {
        /* width: 238%; */
        /* transform: translate(0%,0%) scale(.43); */
        /* transition: transform .5s; */

    }

    .male-performer, .mixed-performer {
        border-color: black;
        border: 1px solid black;
        background-color: rgba(0,0,0,.2);
    }
</style>







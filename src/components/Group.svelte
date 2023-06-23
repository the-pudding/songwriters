<script>

import { scaleLinear } from "d3";

export let song;
export let size;
export let labelPlacement;
export let height;

let colorRange = scaleLinear().domain([0,1]).range(["#d795ff","#FFB102"]);

let sizes = {
        "m-1":{
            width:55,
            imgWidth:55,
            transform:35,
            leftAdjust:0
        },
        "m-2":{
            width:64,
            imgWidth:64,
            transform: 35,
            leftAdjust:0
        },
        "m-3":{
            width:60,
            imgWidth:135,
            transform: 37,
            leftAdjust:-25
        },
        "m-4":{
            width:60,
            imgWidth:60,
            transform: 32,
            leftAdjust:0
        },
        "m-5":{
            width:70,
            imgWidth:70,
            transform: 30,
            leftAdjust:5
        },
        "m-6":{
            width:72,
            imgWidth:72,
            transform: 35,
            leftAdjust:10
        },
        "m-7":{
            width:60,
            imgWidth:70,
            transform: 35,
            leftAdjust:-5
        },
        "m-8":{
            width:70,
            imgWidth:80,
            transform: 32,
            leftAdjust:0
        },
        "m-9":{
            width:60,
            imgWidth:60,
            transform: 35,
            leftAdjust:0
        },
        "m-10":{
            width:60,
            imgWidth:125,
            transform: 37,
            leftAdjust:-40
        },
        "f-1": {
            width:62,
            imgWidth:62,
            transform:35,
            leftAdjust:0
        },
        "f-2": {
            width:60,
            imgWidth:75,
            transform:37,
            leftAdjust:15
        },
        "f-3": {
            width:55,
            imgWidth:65,
            transform:38,
            leftAdjust:0
        },
        "nb-1": {
            width: 58,
            imgWidth:58,
            transform: 35,
            leftAdjust:0
        },
        "nb-2": {
            width: 70,
            imgWidth:70,
            transform: 32,
            leftAdjust:0
        }
    }



function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
}
const getNumber = (gender) => {
    if(gender == "m") {
        return getRandomInt(1,10);
    }
    if(gender == "f") {
        return getRandomInt(1,3);
    }
    return getRandomInt(1,2);
}

const genderKey = {
    "f":"women",
    "m":"men",
    "nb":"non-binary"
}

</script>


<p class="songwriters-label {labelPlacement}"
    style="
    color: {colorRange(song.percent)};
    display: {labelPlacement == "second" ? song.cutTwo == "only men" || song.cutTwo == "only women" ? 'block' : 'block' : 'none'};
    "
>
    {song.cutTwo}
</p>
{#each song.genderArray.sort((a,b) => a.localeCompare(b)) as songwriter}
<!-- background:{songwriter == "m" ? "rgba(209, 36, 25,.4)" : songwriter == "f" ? "rgba(0,108,69,.6)" : 'rgba(0,108,69,.6)'};
color:{songwriter == "m" ? "white" : songwriter == "f" ? "white" : 'white'}; -->

{@const number = getNumber(songwriter)}
{@const gender = ["m","f","nb"].indexOf(songwriter) == -1 ? "m" : songwriter.replace(" ","")}
{@const identifier = `${gender}-${number}`}

<div class="songwriter {labelPlacement}"
        style="
        width:{labelPlacement == "legend" ? '' : `${sizes[identifier].width*size}px`};
        height:{height}px;
        "
    >
        <img class="gender-{sizes[identifier].width}" style="transform:translate({sizes[identifier].leftAdjust}%,{sizes[identifier].transform}%); width:{sizes[identifier].imgWidth*(size+.1)}px;" src="assets/{gender}-{number}.svg" alt="">
        {#if labelPlacement == "legend"}
            <p>{genderKey[songwriter]}</p>
        {/if}
    </div>
{/each}

<style>

    .songwriter p {
        font-family: 'DM Sans';
        position: relative;
        opacity: .7;
        font-size: 14px;
        color: rgb(255, 250, 215);
        text-shadow: 2px 2px 0px #191817, -2px -2px 0px #191817, -2px 0px 0px #191817, 2px -2px 0px #191817, -2px 0px 0px #191817, 0px 2px 0px #191817, 0px -2px 0px #191817, 1px 1px 0px #191817, 1px 1px 0px #191817, -1px 1px 0px #191817, -1px -1px 0px #191817, -1px 0px 0px #191817, 0px 1px 0px #191817, 0px -1px 0px #191817;
    }
    .songwriter {
        height: 50px;
        position: relative;
    }

    .legend {
        justify-content: center;
        display: flex;
        margin: 0 10px;
    }

    .songwriter img {
        position: absolute;
        width: 100%;
        max-width: none;
        bottom: 0;
    }

    .songwriters-label {
        text-shadow: 2px 2px 0px #191817, -2px -2px 0px #191817, -2px 0px 0px #191817, 2px -2px 0px #191817, -2px 0px 0px #191817, 0px 2px 0px #191817, 0px -2px 0px #191817, 1px 1px 0px #191817, 1px 1px 0px #191817, -1px 1px 0px #191817, -1px -1px 0px #191817, -1px 0px 0px #191817, 0px 1px 0px #191817, 0px -1px 0px #191817;
        color: #c498de;
        margin-right: -3px;
        font-size: 14px;
        position: absolute;
        left: 0;
        transform: translate(-100%,-50%);
        margin: 0;
        text-align: right;
        top: 50%;
        line-height: 1;
    }
</style>
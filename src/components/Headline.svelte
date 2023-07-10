<script>
    import Sparkle from "./Sparkle.svelte";
	import SmallSparkle from "./SmallSparkle.svelte";
    import viewport from "$stores/viewport.js";
    import { range } from "d3";

    export let viewportHeight;

    let value;

    let imageHeight = .9;
    let fixedOffset = .5;

    $: imageHeight = $viewport.width < 800 ? 2.16 : .9;
    $: fixedOffset = $viewport.width < 800 ? 1 : .5;

</script>


<div class="title-container fixed-wrapper">

    <div class="title fixed" style="
        top:{-$viewport.width * fixedOffset}px;
    ">
        <Sparkle></Sparkle>

        {#each range(15) as sparkle}
            <SmallSparkle {viewportHeight} />
        {/each}
        
        <Sparkle starNumber=2 position="left:0px;top:50%"></Sparkle>
        
        <div id="headline" alt="Women are superstars on stage but still rarely get to write songs"
            style="
                height:{$viewport.width * imageHeight}px;
                width:{$viewport.width}px;
            "
        >

        </div>
        
    </div>

    <img class="microphones fixed2" alt="" src="assets/headline-mics.png"
    style="
    transform:translate(0,{0}px);
    "
    >
</div>
<p class="byline">by <a target="_blank" href="https://pudding.cool/author/chris-dalla-riva">Chris Dalla Riva</a>, Design by <a target="_blank" href="https://pudding.cool/author/ashley-cai">Ashley Cai</a></p>


<style>
    #headline {
        background-image: url("/assets/headline-base.png") !important;
        width: 100%;
        background-size: 100%;
        background-repeat: no-repeat;
    }

    @media (max-width: 800px) {
        #headline {
            background-image: url("/assets/headline-mobile.png") !important;
        }
    }

    .title {
        z-index: 2;
    }

    @media (max-width: 800px) {
        .fixed-wrapper {
        position: relative; 
        height: 300%;
        }
    }
    
    .fixed-wrapper {
        position: relative; 
        width: 100%;
    }

    .microphones {
        z-index: 3;
    }


    
    .fixed {
        position: sticky;
        width: 100%;
        top: -45%;
        display: flex;
        /* position: absolute; */
        flex-wrap: wrap;
        justify-content: center;
        /* transform: translate(0,10%); */
        flex-direction: column;
    }


    .fixed2 {
        position: sticky;
        transform: translate(0,-20%);
    }

    .byline {
		text-align: center;
		font-family: 'DM Sans';
        z-index: 10;
	}
</style>
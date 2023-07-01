<script>
    import Sparkle from "./Sparkle.svelte";
	import SmallSparkle from "./SmallSparkle.svelte";
    let value;
</script>


<div class="title-container fixed-wrapper">

    <div class="title center-col fixed" style="max-width:100vw">
        <Sparkle></Sparkle>
        <SmallSparkle></SmallSparkle><SmallSparkle></SmallSparkle><SmallSparkle></SmallSparkle><SmallSparkle></SmallSparkle><SmallSparkle></SmallSparkle>
        <SmallSparkle></SmallSparkle><SmallSparkle></SmallSparkle><SmallSparkle></SmallSparkle><SmallSparkle></SmallSparkle><SmallSparkle></SmallSparkle>
        <SmallSparkle></SmallSparkle><SmallSparkle></SmallSparkle><SmallSparkle></SmallSparkle><SmallSparkle></SmallSparkle><SmallSparkle></SmallSparkle>

        <Sparkle starNumber=2 position="left:0px;top:50%"></Sparkle>
        <div id="headline" alt="Women are superstars on stage but still rarely get to write songs"></div>
        
    </div>

    <img class="microphones fixed2" alt="" src="assets/headline-mics.png">
</div>
<p class="byline">by Chris Dalla Riva, Design by Ashley Cai</p>



<style>

    @media (max-width: 800px) {
        #headline {
            background-image: url("/assets/headline-mobile.png") !important;
            height: 216vw;
            width: 100vw;
        }
    }
    @media (min-width: 800px) {
        #headline {
            background-image: url("/assets/headline-base.png") !important;
            height: 113vw;
            width: 100vw;
        }
    }
    #headline {
        background-size: 100vw;
        background-repeat: no-repeat;
    }

    .title {
        z-index: 2;
    }

    @media (max-width: 800px) {
        .fixed-wrapper {
        position: relative; 
        height: 300vw;
        }
    }
    @media (min-width: 800px) {
        .fixed-wrapper {
        position: relative; 
        height: 150vw;
        }
    }

    .microphones {
        z-index: 3;
    }


    @media (max-width: 800px) {
        .fixed {
            top: -70vw !important;
        }
    }
    @media (min-width: 1200px) {
        .fixed {
            top: -45vw !important;
        }
    }
    .fixed {
        position: sticky;
        top: -10vw;

        display: flex;
        /* position: absolute; */
        flex-wrap: wrap;
        justify-content: center;
        /* transform: translate(0,10%); */
        flex-direction: column;
    }

    @media (max-width: 800px) {
        .fixed2 {
            transform: translate(0,130%) !important;
        }
    }
    .fixed2 {
        position: sticky;
        transform: translate(0,-60%);
    }


    @media (max-width: 800px) {
        .byline {
            transform: translateY(0vw) !important;
        }
    }
    .byline {
        transform: translateY(-15vw);
		text-align: center;
		font-family: 'DM Sans';
        z-index: 10;
	}
</style>
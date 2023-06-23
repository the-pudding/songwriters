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
        <img id="headline" alt="Women are superstars on stage but still rarely get to write songs" src="assets/headline-base.png">
        
    </div>

    <img class="microphones fixed2" alt="" src="assets/headline-mics.png">
</div>
<p class="byline">by Chris Dalla Riva, Design by Ashley Cai</p>



<style>

    .title {
        z-index: 2;
    }

    .fixed-wrapper {
    position: relative; 
    height: 260vh;
    }

    .microphones {
        z-index: 3;
    }

    .fixed {
        position: sticky;
        top: -70vh;
        display: flex;
        /* position: absolute; */
        flex-wrap: wrap;
        justify-content: center;
        /* transform: translate(0,-70%); */
        flex-direction: column;
    }

    .fixed2 {
        position: sticky;
        top: 20vh;
        /* top: -70vh; */
        display: flex;
        /* position: absolute; */
        flex-wrap: wrap;
        justify-content: center;
        /* transform: translate(0,-70%); */
        flex-direction: column;
    }

    .byline {
		text-align: center;
		font-family: 'DM Sans';
        z-index: 10;
	}
</style>
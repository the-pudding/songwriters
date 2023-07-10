
<script>

    let starNumber = Math.floor(Math.random() * 5);
    let locationLeft = Math.floor(Math.random() * 100);
    let locationTop = Math.floor(Math.random() * 100);
    let randomDelay = Math.random() * 5;

    export let viewportHeight;
</script>

<div class="small-sparkle" style = "position: absolute; left:{locationLeft}vw; top:{locationTop/100 * viewportHeight}px; animation-delay: {randomDelay}s">
    <img src="assets/sparkles/small-sparkle-{starNumber}.svg" alt="">
</div>

<style>

    .small-sparkle {
        width: 2vw;
        animation: spark 1.5s infinite; 
    }
    
    @keyframes spark {
        0% {
            transform: scale(0);
        }
        20% {
            transform: scale(1);
        }
        30% {
            transform: scale(1);
        }
        40% {
            transform: scale(0);
        }
        100% {
            transform: scale(0);
        }
    }
</style>
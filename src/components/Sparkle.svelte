<script>
    export let starNumber = 1;
    export let position = "right:0px";
</script>


<div class="sparkle"
    style="
      position:absolute; {position};
      background-image:url('assets/sparkles/big-sparkle-{starNumber}.svg');
    "
    id="big-sparkle-{starNumber}"
    role="img" aria-label="Star that grows/shrinks every few seconds"
>
</div>

<style>
    
#big-sparkle-1 { 
    --width: 5vw; /*temp variable placeholder*/
    --height: calc(var(--width)*1.1);
    width: var(--width);
    height: var(--height);
    background-size: calc(var(--width) * 15) auto;
    animation: spark 3s steps(15) infinite; 
    background-position: 0 0;
}

#big-sparkle-2 { 
    --width: 7vw; /*temp variable placeholder*/
    --height: calc(var(--width));
    width: var(--width);
    height: var(--height);
    background-size: calc(var(--width) * 15) auto;
    animation: spark 3s steps(15) 1.5s infinite; 
    background-position: 0 0;
}

#big-sparkle-3 { 
    --width: 10vw; /*temp variable placeholder*/
    --height: calc(var(--width)*0.97);
    width: var(--width);
    height: var(--height);
    background-size: calc(var(--width) * 15) auto;
    animation: spark 3s steps(15) 2.5s infinite; 
    background-position: 0 0;
}

@media (prefers-reduced-motion) {
    #big-sparkle-1, #big-sparkle-2, #big-sparkle-3 {
        animation: none;
    }
}

@keyframes spark {
  0% {
    background-position: 0 0;
  }
  60% {
    background-position: -1500% 0;
  }
  100% {
    background-position: -1500% 0;
  }
}
</style>
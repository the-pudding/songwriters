<script>
    import Scrolly from "$components/helpers/Scrolly.svelte";
    import { range } from "d3";

    export let text;
    let value;

    let men = range(223);
    let women = range(32);

</script>


<section class="wrapper">
    <div class="fixed">
        <div class="first-viz">
            <div class="men">
                {#each men as man,i}
                    <div class="man"></div>
                {/each}
                {#each women as woman,i}
                    <div class="woman"></div>
                {/each}
            </div>
        </div>
    </div>
    <Scrolly bind:value>
        {#each text as slide,i}
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

.wrapper {
    position: relative;
}
.fixed {
    position: sticky;
    width: 100%;
    top: 50%;
}
.men {
    display: flex;
    flex-wrap: wrap;
    transform: translate(0,-50%);
}

.step {
    min-height: 75vh;
}

.man, .woman {
	width: 20px;
	height: 30px;
	background-color: blue;
	margin: 1px;
	display: inline-block;
	color: white;
	font-size: 12px;
}

.woman {
	background-color: red;
}
</style>
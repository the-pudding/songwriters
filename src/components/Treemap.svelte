<script>
	import { treemap, hierarchy, groups, treemapBinary, select, treemapSquarify, scaleLinear } from "d3";

    export let data;
    const tree = treemap();

    let svgEl;
    let recentData = data.filter(d => d[0] > 2000).map(d => d[1]).flat(1).sort((a,b) => {
        return a.percent - b.percent
    });


    recentData.forEach(element => {
        element.count = 1;
    });

    let grouped = groups(recentData, d => d.cutTwo).map(d => ({
      name: d[1],
      children: d[1],
    }));

    const treeData = { name: 'all', children: grouped };
    const tile = 'treemapBinary';
    let ratio = 1;

    let colorRange = scaleLinear().domain([0,1]).range(["purple","green"]);

    const getColor = (first) => {

        return colorRange(first.percent);
        return "purple"
    }

    const treemapEl = treemap()
        // .mode("squarify")
        .tile((tile => (node, x0, y0, x1, y1) => {
    tile(node, x0 / ratio, y0, x1 / ratio, y1);
    for (const child of node.children) child.x0 *= ratio, child.x1 *= ratio;
  })(treemapSquarify.ratio(1)))
        //   .tile(treemapBinary)
          .size([500, 500])
          .padding(0)
          .round(true);

    const hiearchy = hierarchy(treeData)
        .sum(d => d.count)
        .sort((a, b) => b.count - a.count);

    const root = treemapEl(hiearchy);
    console.log(root)
    // console.log(root.leaves())

    const svg = select(svgEl)
      .attr("viewBox", [0, 0, 500, 500])
      .attr("width", 500)
      .attr("height", 500)
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10);

  const node = svg.selectAll("a")
//     .data(root)
//     .join("a")
//       .attr("xlink:href", link == null ? null : (d, i) => link(d.data, d))
//       .attr("target", link == null ? null : linkTarget)
//       .attr("transform", d => `translate(${d.x0},${d.y0})`);

//   node.append("rect")
//       .attr("fill", color ? (d, i) => color(G[i]) : fill)
//       .attr("fill-opacity", fillOpacity)
//       .attr("stroke", stroke)
//       .attr("stroke-width", strokeWidth)
//       .attr("stroke-opacity", strokeOpacity)
//       .attr("stroke-linejoin", strokeLinejoin)
//       .attr("width", d => d.x1 - d.x0)
//       .attr("height", d => d.y1 - d.y0);


</script>

<h1>hi</h1>

<div bind:this={svgEl}
    class="flex"
>
    {#each recentData as first}
        <div class="song"
            style="background-color:{getColor(first)};"
        >

        </div>
        

        <!-- <div class="first"
            style="
                width:{first.x1 - first.x0}px;
                height:{first.y1 - first.y0}px;
                background-color:
                transform:translate({first.x0}px,{first.y0}px);"
            >
        </div> -->
        <!-- {#each first.children as second}
            <div class="second"
                style="
                    width:{second.x1 - second.x0}px;
                    height:{second.y1 - second.y0}px;
                    transform:translate({second.x0}px,{second.y0}px);"
            >
             {#each second.data.genderArray as writer}
                <div class="{writer == "m" ? 'm' : 'f'}">
                </div>

             {/each}
            </div>
        {/each} -->
    {/each}
</div>

<style>
    .flex {
        display: flex;
        flex-wrap: wrap;

    }

    .song {
        width: 10px;
        height: 10px;
        background: red;
        border: 1px solid white;
    }

    .first {
        border: 3px solid white;
        z-index: 100;
        background-color: none;
    }

    .second {
        border: 1px solid black;
    }

    .first, .second {
        position: absolute;
    }

    .second {
        display: flex;
    }

    .second {
        opacity: 1;
    }

    .m, .f {
        height: 100%;
        flex-grow: 1;
        border-right: 1px solid white;
    }
    .m {
        background-color: purple;
    }
    .f {
        background-color: green;
    }
</style>
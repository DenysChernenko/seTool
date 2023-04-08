<script lang="ts" >

    import type { PageData } from './$types';
    import Baseline from './Baseline.svelte';
    // import Mouseline, { handleMousemove } from './Mouseline.svelte';

    export let data: PageData;
    let scale:Number = 500;
    var canvX:Number = scale * 2;
    var canvY:Number = scale * 1;


    let m = { x: 0, y: 0 };

    function handleMousemove(event:any) {
		m.x = event.clientX;
		m.y = event.clientY;
	}
</script>

<div class="container min-w-full min-h-fit my-auto mx-auto py-20 px- bg-slate-500">
    <div class="mx-auto my-auto border" >
        <svg class="bg-white" viewBox="0 0 {canvX} {canvY}" on:mousemove={handleMousemove}>
            <!-- <Mouseline x={canvX} y={canvY} on:mousemove={handleMousemove}/> -->
            <Baseline x={canvX} y={canvY}/>


            <path  
                fill = "none"
                stroke = "gray"
                stroke-width = 0.5
                d = "
                M {m.x}, 0 v {canvY}
                "
                />
        </div>
        <div>mouse x = {m.x}</div>

</div>



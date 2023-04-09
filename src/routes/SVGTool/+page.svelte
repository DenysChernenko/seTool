<script lang="ts" >
	import { onMount } from 'svelte';
    import type { PageData } from './$types';
    import Baseline from './Baseline.svelte';
	import Mouseline from './Mouseline.svelte';

    // import Mouseline, { handleMousemove } from './Mouseline.svelte';

    export let data: PageData;
    let scale: number = 500;
    let screenW: number;
    let m = { x: 0, y: 0 };
    let relm = { x: 0 , y: 0};


    var canvX:number = scale * 2;
    var canvY:number = scale * 1;
    var relfactor:number;

	onMount(async () => {
        handleResize();
	});

    function handleMousemove(event:any) {
		m.x = event.clientX;
		m.y = event.clientY;
        relm.x = m.x*relfactor;
	}

    function handleResize(){
        screenW = innerWidth;
        relfactor = canvX/screenW;
    }
</script>


<svelte:window bind:innerWidth={screenW} on:resize={handleResize}/>


<div class="container min-w-full min-h-fit my-auto mx-auto py-20 px- bg-slate-500" >
    <div class="mx-auto my-auto border static" >
        <div class="absolute flex flex-col text-gray-400">
            <!-- Debug Menu -->
            <ul>
                <li>
                    ---Screen---
                </li>
                <li>
                    Width = {screenW}
                </li>
                <li>
                    ---Canvas---
                </li>
                <li>
                    relfactor = {relfactor}
                </li>
                <li>
                    Canvas X Dim = {canvX}
                </li>
                <li>
                    Canvas Y Dim = {canvY}
                </li>
                <li>
                    ---Mouse---
                </li>
                <li>
                    Mouse X = {m.x}
                </li>
                <li>
                    Relative Mouse X = {relm.x}
                </li>
            </ul>
            <!-- Debug Menu -->
        </div>
        
        <svg class="bg-white" viewBox="0 0 {canvX} {canvY}" on:mousemove={handleMousemove} >
            <!-- <Mouseline x={canvX} y={canvY} on:mousemove={handleMousemove}/> -->
            <Baseline x={canvX} y={canvY}/>
            <Mouseline x={relm.x} y={canvY}/>
    </div>
</div>



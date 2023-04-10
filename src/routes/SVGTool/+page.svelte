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
    let canvasWidth:number;

    var canvX:number = scale * 2;
    var canvY:number = scale * 1;
    var relfactor:number = canvX/screenW;

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

	onMount(async () => {
        handleResize();
	});
    


    function handleMousemove(event:any) {
		m.x = event.clientX;
		m.y = event.clientY;
        relm.x = m.x*relfactor;
	}

    async function handleResize(){
        await sleep(100);
        screenW = canvasWidth;
        relfactor = canvX/screenW;
    }
</script>


<svelte:window bind:innerWidth={screenW} on:resize={handleResize} on:mousemove={handleMousemove}/>


<div class="container min-w-full min-h-fit my-auto mx-auto py-16 px- bg-slate-500" >
    <div class="mx-auto my-auto border static " bind:clientWidth = {canvasWidth} >
        <div class="absolute flex flex-row  text-gray-400  min-w-full min-h-full">
            <div class="basis-1/4 float-left bg-slate-200">
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
                        True Canvas X Dim = {canvasWidth}
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
            <div class="basis-1/2"></div>
            <div class="basis-1/4 float-right bg-slate-200">
                test
            </div>
        </div>
        
        <svg class="bg-white" viewBox="0 0 {canvX} {canvY}"  >
            <!-- <Mouseline x={canvX} y={canvY} on:mousemove={handleMousemove}/> -->
            <Baseline x={canvX} y={canvY}/>
            <Mouseline x={relm.x} y={canvY}/>
    </div>
</div>



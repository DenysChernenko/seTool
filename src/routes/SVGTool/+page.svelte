<script lang="ts" >
	import { onMount } from 'svelte';
    import type { PageData } from './$types';
    import Baseline from './Baseline.svelte';
	import Mouseline from './Mouseline.svelte';
	import { islandStyle } from './styles';
    import {x,y} from "./canvas";

    export let data: PageData;
    let scale: number = 500;
    let screenW: number;
    let m = { x: 0, y: 0 };
    let relm = { x: 0 , y: 0};
    let canvasWidth:number;
    let islandStyleString:any = $islandStyle;

    var canvX:number = scale * 2;
    var canvY:number = scale * 1;
    var relfactor:number = canvX/screenW;

    $x = canvX;
    $y = canvY;

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



<div class="flex-1 h-full bg-emerald-50" bind:clientWidth = {canvasWidth} >
    <div class="absolute flex flex-row min-h-screen text-gray-400  min-w-full ">
        <div class="basis-1/4 bg-emerald-50 z-10">
            <div class="h-full w-full {islandStyleString}">
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

        </div>
        <div class="basis-1/2 "></div>
        <div class="basis-1/4 bg-emerald-50 z-10">
            <div class="h-full w-full {islandStyleString}">
                test
            </div>
        </div>

    </div>
    

    <svg class="bg-emerald-50" viewBox="0 0 {canvX} {canvY}"  >

        <Baseline x={canvX} y={canvY}/>
        {#if relm.x > 300 && relm.x < 700}
        <Mouseline x={relm.x} y={canvY}/>
        {/if}
</div>




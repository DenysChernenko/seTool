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
    let canvasHeight:number;
    let islandStyleString:any = $islandStyle;
    let rightComponent:any;

    var canvX:number = scale * 2;
    var canvY:number = scale * 1;
    var relfactor:number = canvX/screenW;

    $x = canvX;
    $y = canvY;

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

	onMount(async () => {
        handleResize();
	});
    
    // function setRightComponent(componentName:String){
    //     rightComponent = components.load;
    // }

    function handleMousemove(event:any) {
		m.x = event.clientX;
		m.y = event.clientY;
        relm.x = m.x*relfactor;
	}

    async function handleResize(){
        await sleep(200);
        screenW = canvasWidth;
        relfactor = canvX/screenW;
    }
</script>


<svelte:window bind:innerWidth={screenW}  on:resize={handleResize} on:mousemove={handleMousemove}/>


<div class="h-full relative bg-zinc-200 z-40" bind:clientWidth = {canvasWidth} bind:clientHeight = {canvasHeight}>
    <svg class="absolute inset-0 w-full z-0 my-auto bg-zinc-200" viewBox="0 0 {canvX} {canvY}"  >

        <Baseline x={canvX} y={canvY}/>
        {#if relm.x > 300 && relm.x < 700}
        <Mouseline x={relm.x} y={canvY}/>
        {/if}
    </svg>
    <div class="flex absolute inset-0 z-10 ">
        <div class="basis-1/4 {islandStyleString} border-r">
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
                    True Canvas Y Dim = {canvasHeight}
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
        </div>
        <div class="basis-2/4"></div>
        <div class="basis-1/4 {islandStyleString} border-l">Wow</div>
    </div>

    
</div>







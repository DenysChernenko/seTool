<script lang="ts" >
    export let data: PageData;
	import { onMount } from 'svelte';
    import type { PageData } from './$types';
    import Baseline from './Baseline.svelte';
	import Mouseline from './Mouseline.svelte';
	import { islandStyle } from './styles';
    import { x , y , marginX, blength } from "./canvas";
    import RGlobal from './RGlobal.svelte';
	import RLoads from './RLoads.svelte';
	import ROther from './ROther.svelte';
	import JoistTable from './JoistTable.svelte';


    let scale: number = 500;
    let screenW: number = 0;
    let m = { x: 0, y: 0 };
    let canvasWidth:number;
    let canvasHeight:number;
    let rComponent:string = "Global";
    let jdata:any[] = [];


    $ : $x = canvasWidth;
    $ : $y = canvasHeight;

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

	onMount(async () => {
        handleResize();
        const res = await fetch('src/public/joist.json');
        jdata = await res.json();
	});
    
    function handleMousemove(event:any) {
		m.x = event.clientX;
		m.y = event.clientY;
	}

    async function handleResize(){
        await sleep(100);
        screenW = canvasWidth;

    }




    import * as d3 from "d3";


    </script>


<svelte:window bind:innerWidth={screenW}  on:resize={handleResize} on:mousemove={handleMousemove}/>


<div class="h-full relative bg-neutral-50 z-40 overflow-hidden " bind:clientWidth = {canvasWidth} bind:clientHeight = {canvasHeight}>
    <!-- Main Canvas -->
    <div id="mainCanvas" class="w-full h-full">
        <svg id="content" class="absolute inset-0 w-full z-0 my-auto bg-neutral-50 " viewBox="0 0 {canvasWidth} {canvasHeight}"  >


            <g >
                <Baseline  />
                {#if m.x > $marginX && m.x < $marginX+$blength}
                <Mouseline x={m.x} y={$y}/>
                {/if}
            </g>

        </svg>        
    </div>
    <div class="flex absolute inset-0 z-10 ">
        <!-- Left Info Panel -->
        <div class="basis-1/5 {$islandStyle} border-r overflow-y-scroll flex flex-col min-w-[300px]">
            <div class="font-mono font-bold text-lg mb-3 text-center">
                Joists
            </div>
            <div class="overflow-x-auto">
                <JoistTable {jdata}/>
            </div>
        </div>
        <!-- Gap to Show Main Canvas -->
        <div class="basis-3/5"></div>
        <!-- Right Info Panel -->
        <div class="basis-1/5 {$islandStyle} border-l flex flex-col">
            <div class="font-mono font-bold text-lg mb-3 text-center">
                Parameters
            </div>
            <div class="btn-group mx-auto">
                <button class:btn-active="{rComponent === 'Global'}" on:click="{() => rComponent = "Global"}" class="btn btn-outline ">Global</button>
                <button class:btn-active="{rComponent === 'Loads'}" on:click="{() => rComponent = "Loads"}" class="btn btn-outline ">Loads</button>
                <button class:btn-active="{rComponent === 'Other'}" on:click="{() => rComponent = "Other"}" class="btn btn-outline ">Other</button>
            </div>
            
            <div class="">
                {#if rComponent === 'Global'}
                <RGlobal></RGlobal>
                {:else if rComponent === 'Loads'}
                <RLoads></RLoads>
                {:else if rComponent === 'Other'}
                <ROther></ROther>
                {:else}
                <div>Oops! Something Went Wrong</div>
                {/if}
            </div>

        </div>
    </div>
    <!-- Debug Info -->
    <div class="absolute bottom-0 z-20">
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
                Canvas X Dim = {$x}
            </li>
            <li>
                Canvas X Margin = {$marginX}
            </li>
            <li>
                True Canvas X Dim = {canvasWidth}
            </li>
            <li>
                True Canvas Y Dim = {canvasHeight}
            </li>
            <li>
                Canvas Y Dim = {$y}
            </li>
            <li>
                Baseline Length = {$blength}
            </li>
            <li>
                ---Mouse---
            </li>
            <li>
                Mouse X = {m.x}
            </li>

        </ul>
    </div>

    
</div>







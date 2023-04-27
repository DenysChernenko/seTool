<script lang="ts" >
    export let data: PageData;
	import { onMount } from 'svelte';
    import type { PageData } from './$types';
    import Baseline from './Baseline.svelte';
	import Mouseline from './Mouseline.svelte';
	import { islandStyle } from './styles';
    import {x,y} from "./canvas";
    import RGlobal from './RGlobal.svelte';
	import RLoads from './RLoads.svelte';
	import ROther from './ROther.svelte';
	import JoistTable from './JoistTable.svelte';


    let scale: number = 500;
    let screenW: number = 0;
    let m = { x: 0, y: 0 };
    let relm = { x: 0 , y: 0};
    let canvasWidth:number;
    let canvasHeight:number;
    let islandStyleString:any = $islandStyle;
    let rComponent:string = "Global";
    let jdata = [];

    var canvX:number = scale * 2;
    var canvY:number = scale * 1;
    var relfactor:number = canvX/screenW;

    $x = canvX;
    $y = canvY;

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

	onMount(async () => {
        handleResize();
        const res = await fetch('src/public/joist.json');
        jdata = await res.json();
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


<div class="h-full relative bg-zinc-200 z-40 overflow-hidden " bind:clientWidth = {canvasWidth} bind:clientHeight = {canvasHeight}>
    <svg class="absolute inset-0 w-full z-0 my-auto bg-neutral-50 " viewBox="0 0 {canvX} {canvY}"  >

        <Baseline x={canvX} y={canvY}/>
        {#if relm.x > 300 && relm.x < 700}
        <Mouseline x={relm.x} y={canvY}/>
        {/if}
    </svg>
    <div class="flex absolute inset-0 z-10 ">
        <div class="basis-1/5 {islandStyleString} border-r overflow-y-scroll ">
            <div class="font-mono font-bold text-lg mb-3 text-center">
                Joists
            </div>
            <div class="overflow-x-auto">
                <JoistTable {jdata}/>
            </div>
        </div>
        <div class="basis-3/5"></div>
        <div class="basis-1/5 {islandStyleString} border-l flex flex-col">
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

    
</div>







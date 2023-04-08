<script lang="ts" context="module">
    export let x:Number,y:Number;
    export let m = { x: 0, y: 0 };


    export function handleMousemove(event:any) {
		m.x = event.clientX;
		m.y = event.clientY;
	}
</script>


<path  
fill = "none"
stroke = "gray"
d = "
M {m.x}, 0 v {y}
"
/>
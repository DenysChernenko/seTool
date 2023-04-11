<script lang="ts">
    export let x:number,y:number;
    import "../../app.css";
    var midY:number = y/2;
    var pad:number = 0.3 * x;
    var end:number = x - pad*2;

</script>


<path
fill = "none"
stroke = "black"
stroke-width = 1
stroke-linecap = "round"
d = "
M {pad},{midY} h {end}
"
/>
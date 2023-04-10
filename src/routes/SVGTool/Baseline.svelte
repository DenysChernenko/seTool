<script lang="ts">
    export let x:Number,y:Number;

    var midY:Number = y/2;
    var pad:Number = 0.3 * x;
    var end:Number = x - pad*2;

</script>


<path
fill = "none"
stroke = "gray"
stroke-linecap = "round"
d = "
M {pad},{midY} h {end}
"
/>
<script lang="ts">
    export let x:Number,y:Number;

    var midY:Number = y/2;
    var pad:Number = 0.125 * x;
    var end:Number = x - (0.125 * x)*2;

</script>


<path
fill = "none"
stroke = "gray"
d = "
M {pad},{midY} h {end}
"
/>
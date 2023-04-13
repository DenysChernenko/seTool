<script lang="ts">
    import "../../app.css";
    import {x,y,pad} from "./canvas";
    var midY:number = $y/2;
    var padVal:number = $x*$pad;
    var end:number = $x - padVal*2;

</script>


<path
fill = "none"
stroke = "black"
stroke-width = 1
stroke-linecap = "round"
d = "
M {padVal},{midY} h {end}
"
/>
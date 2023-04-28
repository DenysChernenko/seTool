<script lang="ts">
    import "../../app.css";
    import { x, marginX, midY, blength} from "./canvas";

    $: $blength = $x-2*$marginX;



</script>


<path
fill = "none"
stroke = "black"
stroke-width = 1.5
stroke-linecap = "round"
d = "
M {$marginX},{$midY} h {$blength}
"
/>
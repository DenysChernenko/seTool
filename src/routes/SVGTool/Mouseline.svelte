<script lang="ts">
  import { jcolor } from "../globalStyle";
  
  export let x:Number;
  export let y:Number;
  
</script>


<path  
fill = "none"
stroke = "{$jcolor}"
opacity = 1
stroke-width = 1
d = "
M {x}, 0 v {y}
"
/>
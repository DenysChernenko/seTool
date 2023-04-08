<script>
    import "../app.css";

    let buttonStyle = 'px-5 py-2 mx-2 text-white font-bold border border-1 border-green-700 border-rounded-xl bg-green-500'
</script>
  
<div class="container w-auto mx-auto ">
    <ul class="">
        <li class="float-left ">
            <a href="/"><div class="{buttonStyle}">Home</div></a>
        </li>
        <li class="float-left ">
            <a href="/SVGTool"><div class="{buttonStyle}">SVGTool</div></a>
        </li>

    </ul>

</div>
<slot></slot>


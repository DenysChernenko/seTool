<script>
    import "../app.css";

    let buttonStyle = 'mx-2 my-2'
</script>



<div class="w-screen h-screen flex flex-col " >
    <div class="navbar border-b border-primary bg-zinc-800 z-50">
        <div class="flex-1">
          <a href="/" class="btn btn-ghost normal-case text-xl text-white"><img src="src/img/SVG/jComp.svg" alt=""></a>
        </div>
        <div class="flex-none">
          <ul class="menu menu-horizontal px-1  text-white">
            <li><a href="/" class="btn btn-ghost">Home</a></li>
            <li><a href="/SVGTool" class="btn btn-ghost">Analyze</a></li>
            <li><a href="/Debug" class="btn btn-ghost">Debug</a></li>
          </ul>
        </div>
      </div>

    <slot></slot>

</div>


<!-- <div class="w-auto min-h-screen flex flex-col z-0">
    <div class="basis-1/12">
        <ul class="flex flex-row justify-center border-b border-emerald-500 bg-zinc-800">
            <li class="">
                <a href="/"><div class="{buttonStyle}">Home</div></a>
            </li>
            <li class="">
                <a href="/SVGTool"><div class="{buttonStyle}">SVGTool</div></a>
            </li>
        </ul>
    </div>
    <div class="basis-11/12">
        <slot></slot>
    </div>
</div> -->



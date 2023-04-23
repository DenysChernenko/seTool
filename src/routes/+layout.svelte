<script>
    import "../app.css";

    let buttonStyle = 'px-5 py-2 mr-5 my-2 text-white font-bold border border-emerald-900 rounded-md bg-emerald-500'
</script>



<div class="w-screen h-screen flex flex-col overflow-hidden">
    <div class="flex basis-12 bg-zinc-800 justify-center border-b border-emerald-500 z-50">
        <a href="/"><div class="{buttonStyle}">Home</div></a>
        <a href="/SVGTool"><div class="{buttonStyle}">SVGTool</div></a>
        <a href="/Debug"><div class="{buttonStyle}">Debug</div></a>
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



<script>
    import "../app.css";

    let buttonStyle = 'px-5 py-2 mr-5 my-2 text-white font-bold border border-emerald-900 rounded-md bg-emerald-500'
</script>

<div class="w-auto flex flex-col h-auto z-0 ">

    <ul class="flex flex-row h-16 justify-center border-b border-emerald-900">
        <li class="">
            <a href="/"><div class="{buttonStyle}">Home</div></a>
        </li>
        <li class="">
            <a href="/SVGTool"><div class="{buttonStyle}">SVGTool</div></a>
        </li>
    </ul>



    <slot></slot>

</div>



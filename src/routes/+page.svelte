<script lang="ts">
	import P5 from 'p5-svelte';


    let udl:number = 10;
    let leng:number = 20;
    let steps:number = 50;
    const inc:number = leng/steps;

    function momentList(udl:number,leng:number, steps:number){
        let xVals = [];
        let yVals = [];
        let current = 0;
        const inc = leng/steps;
        function momentAtPoint(w:number,x:number,l:number){
            return ((w*x)/2)*(l-x)
        }
        for (let i = 0; i < steps+1; i++){
            xVals.push(current);
            yVals.push(momentAtPoint(udl,current,leng));
            current = current+inc;
            console.log(current)
        }
        let mlist = [xVals,yVals];
        return mlist;
    }

    let moments = momentList(udl,leng,steps);

    console.log('inc is: ' + inc)
    console.log(moments);

    let canvX:number = 1200; // canvas x dimension
    let canvY:number = 600; // canvas y dimension
    let pad:number = 50; // padding
    let vOffset:number = 0; // vertical offset
    let bl1 = [0+pad,canvY/2 + vOffset]; // baseline start point
    let bl2 = [canvX-pad,canvY/2 + vOffset]; // baseline end point
    let dTCT = canvY-bl1[1]; // distance to canvas top

    const Baseline = {
        start: bl1,
        end: bl2,
        length: bl2[0]-bl1[0],
        origin: bl1,
        distToCanvasTop: dTCT
    };

    // console.log("baseline start point is: " + Baseline.start);
    console.log("baseline end point is: " + Baseline.end);
    console.log("baseline length is: " + Baseline.length);
    // console.log("Baseline distance to canvas top is: " + dTCT);
    console.log("Baseline origin is: " + Baseline.origin)


    function normalize(arr:number[],normVal:number){
        let NormValMax = Math.max.apply(Math,arr);
        let NormValMin = Math.min.apply(Math,arr);
        let Nvals = arr.map(y => (y-NormValMin)/(NormValMax-NormValMin));
        Nvals = Nvals.map(y => y*normVal);
        return Nvals;
    };

    let normX = normalize(moments[0],Baseline.length);
    let normY = normalize(moments[1],canvY*(-1)/2);


    function relocate(arr:number[],dist:number){
        let relocatedArr = arr.map(i => i+dist);
        return relocatedArr;
    };

    let momentX = relocate(normX,Baseline.origin[0]);
    let momentY = relocate(normY,Baseline.origin[1]);

    console.log(normX,normY);
    console.log(momentX,momentY);

    let fontSize = 30;
    let fontOffset = fontSize*1.25;



    var overlay:any;

	const sketch = (p5) => {
		p5.setup = () => {
            p5.textFont('Courier',100);
            p5.pixelDensity(2);
			p5.createCanvas(canvX, canvY);
            p5.background('white');
            let start = p5.createDiv('0')
            start.position(canvX,canvY)
            overlay = p5.createGraphics(canvX,canvY);
            overlay.clear();
		};

		p5.draw = () => {

            p5.clear();
            p5.background('white');
            p5.line(p5.mouseX,0,p5.mouseX,canvY) ;
            p5.image(overlay,0,0);
            p5.translate(0,pad);
            // p5.textSize(fontSize)
            // p5.textAlign('right')
            // p5.text('0',bl1[0],bl1[1] + fontOffset)
            // p5.textAlign('left')
            // p5.text(leng,bl2[0],bl2[1] + fontOffset)

            p5.strokeWeight(1);
            p5.noFill();
            p5.line(bl1[0],bl1[1],bl2[0],bl2[1]);
            p5.strokeWeight(2)

            for (let i=1; i <= steps; i++){
                p5.line(momentX[i-1],momentY[i-1],momentX[i],momentY[i])
            };
            
		};

	};
</script>

<!-- 
        p5.mouseX = () => {
            p5.line(p5.mouseX,0,p5.mouseX,canvY);
            overlay.clear();
        }; -->


<div class="container w-auto h-screen my-auto mx-auto pt-20 bg-gray-300">
    <div class="mx-auto my-auto w-fit border ">
        <div class="canvas">
            <P5 {sketch} />
        </div>

    </div>

</div>




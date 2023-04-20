<script lang="ts">
	import P5 from 'p5-svelte';

    var ileng:number =20;
    var iudl:number =20;

    let maxMoment:number = 0;

    var lengmin:number = 1;
    var lengmax:number = 100

    let udl:number = 10;
    let leng:number = 20;
    let steps:number = 50;
    const inc:number = leng/steps;

    let mx:number;
    let my:number;

    let curMouseX:number = 0;



    function reportMouseLoc(arr:number[],curMouseX:number){
        arr.sort((a,b) => {
            return Math.abs(curMouseX-a) - Math.abs(curMouseX - b);
        })
        console.log(arr[0]);
        return arr[0];
    }


    function pushLeng(ileng,lengmin){
        if (ileng >= lengmin && ileng <= lengmax){
        leng = ileng;
        
    };
    }

    function pushMaxMoment(iudl){
        udl = iudl;
        // console.log("udl is: " + udl);
        // console.log("leng is: " + leng);
        maxMoment = (udl*(leng*leng))/8;
        maxMoment = Math.round(maxMoment*100)/100
        // console.log("Max moment is: " + maxMoment)
    };

    


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
            // console.log(current)
        }
        let mlist = [xVals,yVals];
        return mlist;
    }



    let moments = momentList(udl,leng,steps);

    // console.log('inc is: ' + inc)
    // console.log(moments);

    let canvX:number = 1200; // canvas x dimension
    let canvY:number = 600; // canvas y dimension
    let pad:number = 100; // padding
    let vOffset:number = 0; // vertical offset for baseline
    let tvOffset:number = 10; // vertical offset for text
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
    // console.log("baseline end point is: " + Baseline.end);
    // console.log("baseline length is: " + Baseline.length);
    // console.log("Baseline distance to canvas top is: " + dTCT);
    // console.log("Baseline origin is: " + Baseline.origin)


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

    // console.log(normX,normY);
    // console.log(momentX,momentY);

    let fontSize = 30;
    let fontOffset = fontSize*1.25;
    let cnv:any;


    var overlay:any;

	const sketch = (p5:any) => {
        p5.preload = () =>{

        };
		p5.setup = () => {


            p5.pixelDensity(2);
			cnv = p5.createCanvas(canvX, canvY);

            p5.background('white');

            overlay = p5.createGraphics(canvX,canvY);
            overlay.clear();
            overlay.textFont('Courier',100);

		};

		p5.draw = () => {

            p5.translate(0,pad);
            p5.background('white');

            p5.image(overlay,0,0);
            overlay.background('white')
            overlay.textSize(fontSize)
            overlay.textAlign('right')
            overlay.text('0',bl1[0],bl1[1] + fontOffset)
            overlay.textAlign('left')
            overlay.text(leng,bl2[0],bl2[1] + fontOffset)
            p5.line(p5.mouseX,-pad,p5.mouseX,canvY);
            p5.strokeWeight(1);
            p5.noFill();
            p5.line(bl1[0],bl1[1],bl2[0],bl2[1]);
            p5.strokeWeight(2)

            for (let i=1; i <= steps; i++){
                p5.line(momentX[i-1],momentY[i-1],momentX[i],momentY[i])
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
        <label>
            Length
            <input type="number" bind:value={ileng} on:input={pushLeng(ileng,lengmin),pushMaxMoment(iudl)} id="length" min="1" max="200"/>

        </label>
        
        <label>
            UDL
            <input type="number" bind:value={iudl} on:input={pushMaxMoment(iudl)} min="0" max="1000" step="0.1" />
        </label>
        <div>Max Moment is: {maxMoment}</div>
    </div>

</div>




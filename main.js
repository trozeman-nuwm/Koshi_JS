let W = 740, H = 540;
let a = 0.0;
let s = 0.0;
let points, worker;
function setup() {
    createCanvas(W, H);
    fill(0);
    border();
    grid();
    worker = new Worker();

    fill(200, 0, 0);
    worker.euler(0.1);
    fill(0, 200, 0);
    worker.euler(0.2);
    fill(0, 0, 200);
    worker.euler(0.4);
    fill(0);
    worker.mathPoint(0.1);

}

function draw() {

}

function border() {
    line(0, 0, W, 0);
    line(W, 0, W, H);
    line(W, H, 0, H);
    line(0, H, 0, 0);
}


function grid() {
    line(20, H - 20, 20,  20);
    line(20, H - 20, W - 20,  H - 20);
    for(let i = 0; i < 11; i++){
        text(i, 25,   (H - 100 * i) - 5);
        if(i !== 0){
            line(20,   H - 100 * i, 50,  H - 100 * i);
            line(20 +  i * ((W - 40) / 10), H - 20, 20 +  i * ((W - 40) / 10), H - 40); 
            text(i, i * ((W - 40) / 10)  + 15,   H - 5);
        }
        else{
            ellipse(21, H - 21, 8);
        }
    }
}

class Worker {
    xPoints = [];
    mathPoints = [];
    EulerData = {};

    constructor(){
        for(let x = 0; x<=10; x++){
                this.xPoints.push(x/10);
        }
    }

    mathPoint = (step) =>{
        let y = 0;
        for(let i = 0; i <= 1; i += step){
            let point = {
                x: i,
                y: Math.exp(Math.pow(y, 2))
            }
            this.mathPoints.push(point);
            y += step;
        }
        let toDrawPoints = this.toDraw(this.mathPoints);
        this.drawPoints(toDrawPoints);
        this.drawLines(toDrawPoints);
    };

    euler = (step, prevY = 1) => {
        this.EulerData[step] = [];
        this.xPoints.forEach((x, i)=>{
            if(x === 0){
                prevY = 1;
            }else{
                prevY = prevY + step * 2 * this.xPoints[i-1] * prevY;
            }
            this.EulerData[step].push({x , y : prevY});
        });
        let toDrawPoints = this.toDraw(this.EulerData[step]);
        this.drawPoints(toDrawPoints);
        this.drawLines(toDrawPoints);
        this.drawLines(this.toDraw(this.EulerData[step]));
    };

    drawLines = (arr = [])=>{
        arr.forEach((e, i) => {
            if (arr[i + 1]) {
                line(e.x, e.y, arr[i + 1].x, arr[i + 1].y);
            }
        });
    }
    drawPoints = arr =>{
        arr.forEach(e=>{ellipse(e.x, e.y, 10)});
    }

    toDraw(arr){
        return arr.map(e=>{
            return {
                x: 20 + e.x * (W - 40),
                y: H -  e.y * 100
            }
        });;
    }


}
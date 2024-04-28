var canvas =  document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Context Declaration
var c = canvas.getContext('2d')

// // Rectangle
// c.fillStyle = 'rgba(255, 0, 0, 0.5)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0, 0, 255, 0.5)';
// c.fillRect(400, 100, 100, 100);

// //Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "#fa34a3";
// c.stroke();

// //Arc / Circle
// c.beginPath()
// c.arc(300, 300, 30, 0, Math.PI * 2, false)
// c.strokeStyle = 'blue'
// c.stroke();

// for(var i = 0; i < 20; i ++){
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     c.beginPath()
//     c.arc(x, y, 30, 0, Math.PI * 2, false)
//     c.strokeStyle = 'blue'
//     c.stroke();
// }

var mouse = {
    x:undefined, 
    y: undefined
}
var minRadius = 2;
var maxRadius = 40;

var colorArray = [
    '#042940',
    '#005C53',
    '#9FC131',
    '#DBF227',
    '#D6D58E'
]

window.addEventListener('mousemove', 
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
        console.log(mouse);
})

window.addEventListener('resize', 
    function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    }
)

function Circle (x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random()* colorArray.length)];

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = 'black';
        c.fillStyle = this.color;
        c.fill();
    }
    this.update = function(){
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy
        }
        this.x += this.dx;
        this.y += this.dy

        if(Math.abs(mouse.x - this.x) < this.radius+10 && Math.abs(mouse.y - this.y) < this.radius+10){
            this.radius = Math.min(maxRadius, this.radius+5);
        }else{
            this.radius = Math.max(this.minRadius, this.radius-1)
        }
        this.draw()
    }
    
}


var circleArray = []
function init(){
    circleArray = []
    for (var i = 0; i < 800; i ++){
        var radius = Math.random()*3+1;
        var x = Math.random() * (innerWidth - radius *2) + radius;
        var y = Math.random() * (innerHeight - radius *2) + radius;
        var dx = 16*(Math.random() - 0.5);
        var dy = 16*(Math.random() - 0.5);

        //var circle = new Circle(200, 200,16*(Math.random() - 0.5), 16*(Math.random() - 0.5), 30);
        circleArray.push(new Circle(x, y, dx, dy, 2))
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0, innerWidth, innerHeight)
    for (var i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }
}
animate();
init();

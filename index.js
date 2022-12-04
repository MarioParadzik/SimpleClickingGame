let canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;
canvas.style.background = "#FF8C00";

class Krug {
    constructor(id, x, y, size, color, speed){
        this.id = id;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speed = speed;
        this.dx = 1 * speed;
        this.dy = 1 * speed;
    }

    draw(ctx){
        ctx.font = "15px Verdana";
        ctx.strokeText("Broj Kvadrati: " + brojKvadrati, 376, 30);
        ctx.strokeText("Poništeni: " + (brojKvadrati - brojElemenata()), 376, 48);
        ctx.fillStyle = "steelblue";
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.fill();
        ctx.closePath();
    }

    update(){
        this.draw(ctx);

        if(this.x + this.size > 500){
            var brzina = slucajnaBrzina();
            this.dx = -(this.dx + brzina);
        }

        if((this.x < 0)){
            var brzina = slucajnaBrzina();
            if( brzina > 0) brzina = -brzina;
            this.dx = -(this.dx + brzina);
        }

        if(this.y + this.size > 500){
            var brzina = slucajnaBrzina();
            if(this.dy < 0) -this.dy;
            this.dy = -(this.dy + brzina);
        }

        if((this.y ) < 0){
            var brzina = slucajnaBrzina();
            if( brzina > 0) brzina = -brzina;
            this.dy = -(this.dy + brzina);
        }

        this.x += this.dx;
        this.y += this.dy;
    }

    klik(xMouse, yMouse){
        if (xMouse >= this.x &&
            xMouse <= (this.x + this.size) &&
            yMouse >=  this.y 
            && yMouse <= (this.y + this.size)){
            makniElement(this.id);
        }
    }


}

function slucajanBroj() { 
    return Math.floor(Math.random() * (9 - 4 + 1) + 4)
}

function slucajanX() { 
    return Math.random() * (440 - 60 + 1) + 60;
}

function slucajanY() { 
    return Math.random() * (440 - 60 + 1) + 60;
}
function brojElemenata(){
    return sviKvadrati.length;
}

function slucajnaBrzina() {
    var sluc = Math.random()*(1+0.5) - 0.5;
    var potencija = Math.pow(10, 2);
    return Math.floor(sluc*potencija) / potencija;
};

function slucajnaPocetnaBrzina() {
    var sluc = Math.random()*(7 - 3) + 3;
    var potencija = Math.pow(10, 2);
    return Math.floor(sluc*potencija) / potencija;
};

function makniElement(id){
    const index = sviKvadrati.findIndex((obj) => obj.id === id);
  if (index > -1) {
    sviKvadrati.splice(index, 1);
  }
}

let brojKvadrati = slucajanBroj();
var sviKvadrati =[];

for(var kvadrati = 0; kvadrati < brojKvadrati; kvadrati++){
    let kvadrat = new Krug(kvadrati+1, slucajanX(), slucajanY(), 60, "black", slucajnaPocetnaBrzina());
    sviKvadrati.push(kvadrat);
}

let updatePozicije = function() {
    requestAnimationFrame(updatePozicije);
    ctx.clearRect(0, 0, 500, 500);
  
    for (var i = 0; i < brojElemenata(); i++) {
        sviKvadrati[i].update();
    }
}
  
updatePozicije();

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    for(var kvadrati = 0; kvadrati < brojKvadrati; kvadrati++){
        sviKvadrati[kvadrati].klik(x,y);
    }
})
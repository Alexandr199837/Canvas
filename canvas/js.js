var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var mas = [];
var count = 0;
var timer;
canvas.onclick = function(event) {
   var x = event.offsetX; //координаты мыши, относительно canvas
   var y = event.offsetY;
   console.log(x);
   console.log(y);
   x=Math.floor(x/10); //300/10=30px
   y=Math.floor(y/10);
   mas[y][x]=1;//заполнение игрового поля. На место клика ставится единица.
   console.log(mas);
   drawField();
}

function goLife() {// игровое поле
    var n=30, m=30;
    for (var i=0; i<m; i++) {
        mas[i]=[];
        for (var j=0; j<n; j++) {
            mas[i][j]=0;
        }
    }
}
goLife();

function drawField() { //функция отрисовки прямоугольника
    ctx.clearRect(0,0,300,300); //очищаем поле
    for (var i=0; i<30; i++) {       //перебираем массив клетов, если какая-либо из клеток равна 1, то закрашиваем её.
        for (var j=0; j<30; j++) {
            if(mas[i][j]==1) {
                ctx.fillRect(j*10, i*10,10,10);
            }
        }
    }
}
function startLife() {
    //моделирование жизни
    var mas2=[];
    for (var i=0; i<30; i++) { 
        mas2[i]=[];     
        for (var j=0; j<30; j++) {
            var neighbors = 0;
            if(mas[fpm(i)-1][j]==1) neighbors++;//вверх
            if(mas[i][fpp(j)+1]==1) neighbors++;//право
            if(mas[fpp(i)+1][j]==1) neighbors++;//низ
            if(mas[i][fpm(j)-1]==1) neighbors++;//лево
            if (mas[fpm(i)-1][fpp(j)+1]==1) neighbors++;//вправо вверх
            if (mas[fpp(i)+1][fpp(j)+1]==1) neighbors++;//вправо вниз
            if (mas[fpp(i)+1][fpm(j)-1]==1) neighbors++;//влево вниз
            if (mas[fpm(i)-1][fpm(j)-1]==1) neighbors++;//влево вверх
            (neighbors==2 || neighbors==3) ? mas2[i][j]=1 : mas2[i][j]=0;
        }
    }
    mas = mas2;
    drawField();
    count++;
    document.getElementById('count').innerHTML = count;
    timer = setTimeout(startLife,300);
}
function fpm(i) {
    if (i==0) return 30; //если i=0, то возвращаем 30 и переносимя в противоположную клетку. Так мы выходим за края (пока так)
    else return i;
}
function fpp(i) {
    if (i==29) return -1;
    else return i;
}
document.getElementById('start').onclick = startLife;
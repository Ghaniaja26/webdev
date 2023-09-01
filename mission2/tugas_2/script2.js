var isMoving = true;

function setBackgroundMoving(){
    if (isMoving == true){
        setTimeout(function(){
                
        //background berjalan
        var bg = document.getElementById('board');
        bg.style.backgroundPosition = (parseInt(bg.style.
        backgroundPosition.replace('px', ''))-5) + 'px';
                
        //update live score
        document.getElementById('score').innerHTML = 
        parseInt(document.getElementById('score').innerHTML) + 1;
                
        //panggil fungsi secara terus menerus (rekursif)
        setBackgroundMoving();
        },5);
    }
}

//inisialisasi fungsi background berjalan
setBackgroundMoving();

function setBoxMoving(){
    var box = document.getElementById('box');
    var dino = document.getElementById('dino');
    setTimeout(function(){

        box.style.marginLeft = (parseInt(box.style.marginLeft.replace('px',''))-5) + 'px';

        if(parseInt(box.style.marginLeft.replace('px','')) < -150){
            box.style.marginLeft = "1200px";
        }
        if(dino.offsetTop + 80 >= box.offsetTop && 
           dino.offsetLeft + 80 >= box.offsetLeft && 
           dino.offsetTop + 80 <= box.offsetTop + 80 && 
           dino.offsetLeft <= box.offsetLeft + 80)
        {
            alert('GAME OVER, Score anda : ' + document.getElementById('score' ).innerHTML);
            dino.setAttribute('class', 'freeze');
            isMoving = false;
        }
        else
        {
            //panggil fungsi secara terus menerus (rekursif)
            setBoxMoving();
        }
    },5);
}

//inisialisasi box bergerak
setBoxMoving();

window.addEventListener('keyup', function(e){
    //untuk mendeteksi tombol spasi     
    if (e.keyCode == 32){
        //setting dino nya biar bisa loncat
        document.getElementById('dino').style.marginTop = "30px";
        document.getElementById('dino').setAttribute('class','freeze');
        
        //kembalikan dino ke darat
        setTimeout(function(){
            document.getElementById('dino').style.marginTop = "370px";
            document.getElementById('dino').setAttribute('class','');
        },1000);
    }
});
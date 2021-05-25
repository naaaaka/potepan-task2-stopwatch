//情報の取得
const time = document.getElementById("time");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");

let starttime;
let timeoutid;
let kepttime;

function display(){
    const d = new Date(Date.now() - starttime + kepttime);//経過時刻をmsで取得
    const h = String(d.getHours()) - 9;//なぜか-9しないとhourが0にならない？？
    const m = String(d.getMinutes());
    const s = String(d.getSeconds());
    const ms = String(Math.floor(d.getMilliseconds()/100));
    time.textContent = `${h}:${m}:${s}:${ms}`
    //100ms事に処理を循環させる
    timeoutid = setTimeout(function(){
        display();
    }, 100);
}
//各ボタン押すことでclass="inactive"を与えたり除いたり
//初期状態
function setting(){
    start.classList.remove("inactive");//活性
    stop.classList.add("inactive");//非活性
    reset.classList.add("inactive");
}

//運転中
function runnning(){
    start.classList.add("inactive");
    stop.classList.remove("inactive");
    reset.classList.remove("inactive");
}

//停止中
function stopping(){
    start.classList.remove("inactive");
    stop.classList.add("inactive");
    reset.classList.remove("inactive");
}

//活性・不活性に応じたボタンの見た目変更

//開始時は初期状態に
setting();

//スタートを押したときの処理
start.addEventListener('click',function(){
    //非活性状態なら何も生じない
    if (start.classList.contains("inactive") === true) {
        return;
    }
    //リスタートではないときの処理
    if (!kepttime) {
        kepttime = 0;
    }
    //ボタン状態の変更
    runnning();
    //開始時刻の取得
    starttime = Date.now();
    display();
});

//ストップを押したときの処理
stop.addEventListener('click', function(){
    if (stop.classList.contains("inactive") === true) {
        return;
    }
    stopping();
    //循環させていた処理を止める
    clearTimeout(timeoutid);
    //止めた時の時間を保持する
    kepttime = Date.now() - starttime;
});

//リセットを押したときの処理
reset.addEventListener('click', function(){
        if (reset.classList.contains("inactive") === true) {
        return;
    }
    setting();
    //表記も保持時間も0に戻す
    time.textContent = "0:0:0:0";
    kepttime = 0;
    //循環を止める
    clearTimeout(timeoutid);
})
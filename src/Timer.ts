
class Timer extends GameObject
{
    private timer : egret.Timer = null;
    private text : egret.TextField = null;

    constructor()
    {
        super();

        this.text = Util.myText(500, 0, "time : 0", 50, 0.5, 0xffffff, false);
        GameObject.display.addChild( this.text );

        this.timer = new egret.Timer(1000, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.timer.start();
    }

    onDestroy() {
        GameObject.display.removeChild( this.text );
        this.text = null;
    }

    updateContent(){
        this.text.text = "time : " + this.timer.currentCount.toString();
    }

    private timerFunc(event: egret.Event) {
        //this.text.text = "time : " + this.timer.currentCount.toString();
    }

}

class GameManager extends GameObject
{
    static I : GameManager = null;   // singleton instance
    public pause : boolean = false;
    public mode : number = 0;
    //public score : number = 0;
    public timer : egret.Timer = null;
    private text : egret.TextField = null;
    private isStop : boolean = false;

    constructor() {
        super();
        GameManager.I = this;

        this.timer = new egret.Timer(1000, 0);
        //this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.timer.start();

        this.text = Util.myText(500, 0, "time : 0", 50, 0.5, 0xffffff, false);
        GameObject.display.addChild( this.text );

        let w = 230;
        let h = 90;
       // new Button( "TIME", Game.width/2-w/2, Game.height/2 - 320, w, h, 0x00f0f0, 0x606060, 40, this.onButton );

    }

    onDestroy() {
        GameObject.display.removeChild( this.text );
        this.text = null;
        
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.timer = null;
        GameManager.I = null;
    }

    timerFunc(){}

    onButton()
    {
        GameManager.I.timer.reset();
        GameManager.I.timer.start();
        
        /*
        if( GameManager.I.timer.running ){
            GameManager.I.timer.stop();
        }
        else{
            GameManager.I.timer.start();
        }*/

    }

    updateContent()
    {
        this.text.text = "time : " + this.timer.currentCount.toString();
    }

}

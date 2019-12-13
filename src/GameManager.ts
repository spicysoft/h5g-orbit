class GameManager extends GameObject
{
    static I : GameManager = null;   // singleton instance
    static isTitleEnd : boolean = false;
    public pause : boolean = false;
    public mode : number = 0;
    //public score : number = 0;
    public timer : egret.Timer = null;
    private text : egret.TextField = null;
    //private isStop : boolean = false;

    constructor() {
        super();
        GameManager.I = this;

        // timer
        this.text = Util.myText(550, 5, "0", 50, 0.5, 0xc0c0c0, false);
        GameObject.display.addChild( this.text );


        if( !GameManager.isTitleEnd ){
            new Title();
        }
        else{
            this.gameStart();
        }


        this.shape = new egret.Shape();
        this.shape.x = Game.width/2;
        this.shape.y = Game.height/2;
        this.shape.graphics.beginFill(PLAYER_COLOR);
        this.shape.graphics.drawCircle(0, 0, 200);
        this.shape.graphics.endFill();
        
        GameObject.displayF.addChild(this.shape);
        //GameObject.display.setChildIndex( this.shape, 2 );

    }

    public gameStart()
    {
        this.pause = false;

        this.timer = new egret.Timer(1000, 0);
        //this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.timer.start();

        ObstacleGen.I.start();
    }


    onDestroy() {
        GameObject.display.removeChild( this.text );
        this.text = null;
        
        //this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
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

    onButton2()
    {
        GameManager.isTitleEnd = true;
    }

    updateContent()
    {
        if( this.pause ){
            return;
        }

        GameObject.displayF.y += 1;
        
        if( this.text != null ){
//            this.text.text = this.timer.currentCount.toString();
            let idx = GameObject.display.getChildIndex( this.shape );
            this.text.text = idx.toString();
            Button.uiIndex = idx;
        }
    }
}

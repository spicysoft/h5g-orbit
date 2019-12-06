class ObstacleGen extends GameObject
{
    static I:ObstacleGen = null;   // singleton instance
    private radius :number =null;
    private timer : egret.Timer = null;
    //static num : number = 0;

    private reqGen : number = 0;

    constructor() {
        super();

        ObstacleGen.I = this;
        //ObstacleGen.num++;

        //egret.log("ObstacleGen "+ObstacleGen.num.toString());

        this.timer = new egret.Timer(1000, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.timer.start();

    }

    onDestroy() {
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.timer = null;
        ObstacleGen.I = null;
    }


    private timerFunc(event: egret.Event)
    {
        this.reqGen = Util.randomInt( 1, 3 );
    }


    updateContent()
    {
        if( GameManager.I.pause ){
            return;
        }

        if( this.reqGen > 0 ){
            for( let i = 0; i < this.reqGen; i++ ){
                new Obstacle();
            }
            this.reqGen = 0;
        }
    }

}

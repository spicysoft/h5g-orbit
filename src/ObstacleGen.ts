class ObstacleGen extends GameObject
{
    static I:ObstacleGen = null;   // singleton instance
    private radius :number =null;
    private timer : egret.Timer = null;
    //static num : number = 0;

    private reqGen : boolean = false;

    constructor() {
        super();

        ObstacleGen.I = this;
        //ObstacleGen.num++;

        //egret.log("ObstacleGen "+ObstacleGen.num.toString());

        this.timer = new egret.Timer(2000, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.timer.start();

    }

    onDestroy() {
        egret.log(" on destroy ObstacleGen");
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.timer = null;
        ObstacleGen.I = null;
    }


    private timerFunc(event: egret.Event)
    {
        let rndNum = 1;//Util.randomInt( 1, 3 );
        for( let i = 0; i < rndNum; i++ ){
            //new Obstacle();
            this.reqGen = true;
        }
    }


    updateContent()
    {
        if( this.reqGen ){
            this.reqGen = false;
            new Obstacle();
        }
    }

}

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

            let minx = -160 - 40;
            let maxx = 160 + 40;

            // 向き、速度ベクトル.
            let mat = new egret.Matrix();
            //let rot = -Math.PI;
            let rot = Util.random( 0, 2*Math.PI );
            mat.rotate( rot );
            let vel = new egret.Point();
            mat.transformPoint( 0, -1, vel );

            for( let i = 0; i < this.reqGen; i++ ){

                let rndX = Util.random( minx/20, maxx/20 ) * 20;
                let basePos = new egret.Point( rndX, 500 );
                let startPos = new egret.Point();
                mat.transformPoint( basePos.x, basePos.y, startPos );
                startPos.x += Game.width/2;
                startPos.y += Game.height/2;

                new Obstacle( startPos.x, startPos.y, vel );
            }
            this.reqGen = 0;
        }
    }

}

const GenRepeatCnt : number = 4;    // 実際の回数＋１.
const EndLevel : number = 3;

class ObstacleGen extends GameObject
{
    static I : ObstacleGen = null;   // singleton instance
    public timer : egret.Timer = null;
    public waitTimer : egret.Timer = null;
    private textName : egret.TextField = null;
    //private step : number = 0;
    private reqGen : number = 0;
    private wave : number = 0;
    private level : number = 0;
    private stepFunc : ()=>void = null;

    private labelWave : SimpleText = null;

    constructor() {
        super();

        ObstacleGen.I = this;

        //this.textName = Util.myText( Game.width/2, Game.height/2 - 300, "LEVEL : 1\nWAVE : 1", 80, 0.5, 0xf0f000, true, true );
        //GameObject.display.addChild( this.textName );
        /*new SimpleText("Level : 1", Game.width/2, Game.height/2 - 360, 48, 0xffff00, true, true, 3 );
        new SimpleText("Wave : 1", Game.width/2, Game.height/2 - 300, 40, 0xffff00, true, true, 3 );


        this.timer = new egret.Timer(1000, GenRepeatCnt);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComplete, this);

        this.timer.start();
*/
        this.waitTimer = new egret.Timer(1000, 0);
    }

    public start()
    {
        new SimpleText("Level : 1", Game.width/2, Game.height/2 - 360, 48, 0xffff00, true, true, 3 );
        new SimpleText("Wave : 1", Game.width/2, Game.height/2 - 300, 40, 0xffff00, true, true, 3 );

        this.timer = new egret.Timer(1000, GenRepeatCnt);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComplete, this);

        this.timer.start();
    }

    onDestroy()
    {
        //GameObject.display.removeChild( this.textName );
        //this.textName = null;
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComplete, this);
        this.timer = null;
        this.waitTimer = null;
        ObstacleGen.I = null;
    }


    private timerFunc(event: egret.Event)
    {
        this.reqGen = this.wave + 1;
        //this.reqGen = Util.randomInt( 1, 3 );
        this.stepFunc = this.generate;
    }

    private timerComplete(event: egret.Event)
    {
        this.wave++;
        this.stepFunc = this.waitWave;
        this.waitTimer.reset();
        this.waitTimer.start();
    }

    public timerStart()
    {
        this.timer.start();
    }

    public timerStop()
    {
        this.timer.stop();
    }

    updateContent()
    {
        if( GameManager.I.pause ){
            return;
        }

        if( this.stepFunc != null ){
            this.stepFunc();
        }

    }

    generate()
    {
        if( this.reqGen > 0 ){

            let minx = -160 - 40;
            let maxx = 160 + 40;

            // 向き、速度ベクトル.
            let mat = new egret.Matrix();
            let rot = Math.PI;
            //let rot = Util.random( 0, 2*Math.PI );
            mat.rotate( rot );
            let vel = new egret.Point();
            mat.transformPoint( 0, -1, vel );

            let startPos = new egret.Point();
            for( let i = 0; i < this.reqGen; i++ ){

                let rndX = Util.randomInt( minx/32, maxx/32 ) * 32;
                let basePos = new egret.Point( rndX, 600 );
                mat.transformPoint( basePos.x, basePos.y, startPos );
                startPos.x += Game.width/2;
                startPos.y += Game.height/2;
                if( i == 0 ){
                    new Obstacle( startPos.x, startPos.y, vel, 1 );
                }
                else{
                    new Obstacle( startPos.x, startPos.y, vel );                    
                }
            }
            this.reqGen = 0;
        }

        this.stepFunc = null;
    }

    waitWave()
    {
        if( this.waitTimer.currentCount >= 2 ){
            this.stepFunc = null;

            if( this.wave >= 3 ){
                // 次のレベル.
                this.wave = 0;
                this.level++;
                if( this.level < EndLevel ){
                    this.timer.reset();
                    this.timer.delay = 1000;
                    this.timer.repeatCount = GenRepeatCnt;
                    this.timer.start();
                    //this.textName.text = "LEVEL : " + (this.level+1).toString() + "\nWAVE : " + (this.wave+1).toString();
                    new SimpleText("Level : "+(this.level+1).toString(), Game.width/2, Game.height/2 - 360, 48, 0xffff00, true, true, 3 );
                    new SimpleText("Wave : "+(this.wave+1).toString(), Game.width/2, Game.height/2 - 300, 40, 0xffff00, true, true, 3 );
               }
                else{
                    // clear
                    GameManager.I.pause = true;
                    new GameOver( true );
                }
            }
            else{
                // 次のwave.
                this.timer.reset();
                this.timer.delay = 1000;
                this.timer.repeatCount += 2;
                this.timer.start();
                //this.textName.text = "LEVEL : " + (this.level+1).toString() + "\nWAVE : " + (this.wave+1).toString();
                new SimpleText("Wave : "+(this.wave+1).toString(), Game.width/2, Game.height/2 - 300, 40, 0xffff00, true, true, 3 );
            }
        }
    }
}

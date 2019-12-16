
const END_LEVEL : number = 4;
const GEN_YOFS : number = 550;

class ObstacleGen extends GameObject
{
    static I : ObstacleGen = null;   // singleton instance
    public timer : egret.Timer = null;
    public waitTimer : egret.Timer = null;
    private textLevel : egret.TextField = null;
    private reqGen : number = 0;
    private wave : number = 0;
    private level : number = 0;
    private stepFunc : ()=>void = null;

    private labelWave : SimpleText = null;

    constructor() {
        super();

        ObstacleGen.I = this;

        this.textLevel = Util.myText(10, 40, "Level 1\nWave 1", 60, 0.5, 0xc0c0c0, true, false);        
        GameObject.uiDisplay.addChild( this.textLevel );

        this.waitTimer = new egret.Timer(1000, 0);
    }

    public start()
    {
        new SimpleText("Level : 1", Game.width/2, Game.height/2 - 360, 48, 0xffff00, true, true, 3 );
        new SimpleText("Wave : 1", Game.width/2, Game.height/2 - 300, 40, 0xffff00, true, true, 3 );

        this.timer = new egret.Timer( this.getDelay(0), this.getRepeatCount(0) );
        this.timer.addEventListener( egret.TimerEvent.TIMER, this.timerFunc, this );
        this.timer.addEventListener( egret.TimerEvent.TIMER_COMPLETE, this.timerComplete, this );

        this.timer.start();
    }

    onDestroy()
    {
        GameObject.uiDisplay.removeChild( this.textLevel );
        this.textLevel = null;
        this.timer.removeEventListener( egret.TimerEvent.TIMER, this.timerFunc, this );
        this.timer.removeEventListener( egret.TimerEvent.TIMER_COMPLETE, this.timerComplete, this );
        this.timer = null;
        this.waitTimer = null;
        ObstacleGen.I = null;
    }


    private timerFunc(event: egret.Event)
    {
        this.reqGen = this.getGenNum( this.wave );
        this.stepFunc = this.generate;
    }

    private timerComplete(event: egret.Event)
    {
        this.wave++;
        this.stepFunc = this.genAndWait;
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

    getGenNum( wave:number ) : number
    {
        if( wave == 0 ){
            //return 1;
            return Util.randomInt(1, 2);
        }
        else if( wave == 1 ){
            return 2;
        }
        else{
            return 3;
            //return Util.randomInt(2, 3);
        }
    }

    getRepeatCount( wave:number ) : number
    {
        if( wave == 1 ){
            return 5;
        }
        else if( wave == 2 ){
            return 9;
        }
        else{
            return 5;
        }
    }

    getSpeed( level:number ) : number
    {
        switch( level ){
        case 0:
            return Util.random( 100, 200 );
        case 1:
            return Util.random( 110, 220 );
        case 2:
            return Util.random( 120, 240 );
        case 3:
        default:
            return Util.random( 150, 300 );
        }
    }

    getDelay( level:number ) : number
    {
        switch( level ){
        case 0:
            return 2500;
        case 1:
            return 2300;
        case 2:
            return 2100;
        case 3:
            return 1900;
        default:
            return 1500;
        }
    }

    getRot( level:number ) : number
    {
        switch( level ){
        case 0:
            return Math.PI;
        case 1:
            return 0;
        case 2:
            if( Util.random(1,100) < 50 ){
                return Math.PI;
            }
            else{
                return 0;                
            }
        case 3:
            if( Util.random(1,100) < 50 ){
                return Math.PI*1.25;
            }
            else{
                return Math.PI;                
            }
        default:
            return 0;
        }
    }

    generate()
    {
        if( this.reqGen > 0 ){

            let minx = -160 - 40;
            let maxx = 160 + 40;

            // 向き、速度ベクトル.
            let mat = new egret.Matrix();
            let rot = this.getRot( this.level );
            //let rot = Util.random( 0, 2*Math.PI );
            mat.rotate( rot );
            let vel = new egret.Point();
            mat.transformPoint( 0, -1, vel );

            let startPos = new egret.Point();
            for( let i = 0; i < this.reqGen; i++ ){

                // position.
                let rndX = Util.randomInt( minx/32, maxx/32 ) * 32;
                let basePos = new egret.Point( rndX, Util.random(GEN_YOFS-40, GEN_YOFS+40) );
                mat.transformPoint( basePos.x, basePos.y, startPos );
                startPos.x += Game.width/2;
                startPos.y += Game.height/2;

                if( Life.I.life < DEF_LIFE && Util.random(1,100) < 10 ){
                    // 回復.
                    new Obstacle( startPos.x, startPos.y, vel, this.getSpeed(this.level), 1 );
                }
                else{
                    new Obstacle( startPos.x, startPos.y, vel, this.getSpeed(this.level) );
                }
            }
            this.reqGen = 0;
        }

        this.stepFunc = null;
    }

    genAndWait()
    {
        this.generate();

        this.stepFunc = this.waitWave;
        this.waitTimer.reset();
        this.waitTimer.start();
    }

    waitWave()
    {
        if( this.waitTimer.currentCount >= 3 ){
            this.stepFunc = null;

            if( this.wave >= 3 ){
                // 次のレベル.
                this.wave = 0;
                this.level++;
                if( this.level < END_LEVEL ){
                    this.timer.reset();
                    this.timer.delay = this.getDelay( this.level );
                    this.timer.repeatCount = this.getRepeatCount(0);
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
                this.timer.delay = this.getDelay( this.level );
                this.timer.repeatCount = this.getRepeatCount( this.wave );
                this.timer.start();
                //this.textName.text = "LEVEL : " + (this.level+1).toString() + "\nWAVE : " + (this.wave+1).toString();
                new SimpleText("Wave : "+(this.wave+1).toString(), Game.width/2, Game.height/2 - 300, 40, 0xffff00, true, true, 3 );
            }

            this.textLevel.text = "Level " + (this.level+1).toString() + "\nWave " + (this.wave+1).toString();
        }
    }
}

class Player extends GameObject
{
    static I:Player = null;   // singleton instance
    //private radius :number =null;
    private center : egret.Point = null;
    private pos : egret.Point = null;
    private prePos : egret.Point = null;
    private ang : number = 0;
    private rad : number = 160;
    private isTouch : boolean = false;
    private angSpd : number = 0;
    private angAcc : number = 0;
    private framRate : number = 1/60;
    private baseSpd : number = 0;

    constructor() {
        super();

        Player.I = this;

        this.center = new egret.Point();
        this.center.x = Game.width * 0.5;
        this.center.y = Game.height * 0.5;

        this.pos = new egret.Point();
        this.pos.x = this.rad;
        this.pos.y = 0;

        this.pos = this.pos.add(this.center);

        this.setShape(this.pos.x, this.pos.y, 16);

        this.baseSpd = Math.PI*0.6;
        this.angSpd = this.baseSpd;
        this.angAcc = Math.PI*0.01;

        egret.MainContext.instance.stage.addEventListener( egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this );
        egret.MainContext.instance.stage.addEventListener( egret.TouchEvent.TOUCH_END, this.touchHandler, this );
    }

    onDestroy() {
        GameObject.display.removeChild( this.shape );
        this.shape = null;
        Player.I = null;
    }


    private touchHandler( evt:egret.TouchEvent ){
        switch ( evt.type ){
            case egret.TouchEvent.TOUCH_MOVE:
                //console.log("touch move");
                break;
            case egret.TouchEvent.TOUCH_BEGIN:
                //egret.MainContext.instance.stage.addEventListener( egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this );
                //egret.MainContext.instance.stage.once( egret.TouchEvent.TOUCH_END, this.touchHandler, this );
                //console.log("touch begin");
                this.isTouch = true;
                //new GameOver();
                break;
            case egret. TouchEvent.TOUCH_END:
                //egret.MainContext.instance.stage.removeEventListener( egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this );
                //egret.MainContext.instance.stage.addEventListener( egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this );
                //console.log("touch end");
                this.isTouch = false;                
                break;
        }
    }
    

    setShape(x: number, y:number, radius: number)
    {
        if( this.shape ){
            GameObject.display.removeChild(this.shape);        
        }

        this.shape = new egret.Shape();
        this.shape.x = x;
        this.shape.y = y;
        //this.shape.rotation = 45;
        this.shape.graphics.beginFill(0xff0000);
        this.shape.graphics.drawCircle(0, 0, radius);
        //this.shape.graphics.drawRect(0, 0, 30 , 30);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
        
    }




    updateContent()
    {
        if( this.isTouch ){
            this.angSpd -= this.angAcc;
            if( this.angSpd < Math.PI*0.1 ){
                this.angSpd = Math.PI*0.1;
            }
        }
        else{
            this.angSpd += this.angAcc;
            if( this.angSpd > this.baseSpd ){
                this.angSpd = this.baseSpd;
            }
        }

        this.ang += this.angSpd * this.framRate;
        if( this.ang > Math.PI*2 ){
            this.ang -= Math.PI*2;
        }


        let nextPos = new egret.Point();
        nextPos.x = Math.cos( this.ang ) * this.rad;
        nextPos.y = Math.sin( this.ang ) * this.rad;

        nextPos = nextPos.add( this.center );

        this.pos = nextPos;

        this.shape.x = this.pos.x;
        this.shape.y = this.pos.y;

    }

}

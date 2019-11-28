class Player extends GameObject
{
    static I:Player = null;   // singleton instance
    //private radius :number =null;
    private center : egret.Point = null;
    private pos : egret.Point = null;
    private prePos : egret.Point = null;
    private ang : number = 0;
    private rad : number = 160;

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

        this.setShape(this.pos.x, this.pos.y, 10);

        /*let ang = Math.PI;
        let s = Math.sin( ang );
        let c = Math.cos( ang );
        console.log("s = " + s + "c = " + c);*/

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
        let aspd = Math.PI*0.4 * (1/60);
        this.ang += aspd;

        this.pos.x = Math.cos( this.ang ) * this.rad;
        this.pos.y = Math.sin( this.ang ) * this.rad;

        this.pos = this.pos.add( this.center );

        this.shape.x = this.pos.x;
        this.shape.y = this.pos.y;

    }


}
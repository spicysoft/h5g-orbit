class Orbit extends GameObject
{
    static AreaMinX : number = 0;
    static AreaMaxX : number = 0;
    static AreaMinY : number = 0;
    static AreaMaxY : number = 0;

    private radius :number;

    constructor() {
        super();

        Orbit.AreaMinX = 0.5*Game.width - 200;
        Orbit.AreaMaxX = 0.5*Game.width + 200;
        Orbit.AreaMinY = 0.5*Game.height - 200;
        Orbit.AreaMaxY = 0.5*Game.height + 200;

        this.setShape(0.5*Game.width, 0.5*Game.height, 160);
    }

    onDestroy() {
        GameObject.gameDisplay.removeChild( this.shape );
        this.shape = null;
    }

    setShape(x: number, y:number, radius: number)
    {
        if( this.shape ){
            GameObject.gameDisplay.removeChild(this.shape);        
        }

        this.shape = new egret.Shape();
        this.shape.x = x;
        this.shape.y = y;

        this.shape.graphics.lineStyle(1, 0xf0f0f0);
        this.shape.graphics.drawCircle(0, 0, radius);
        GameObject.gameDisplay.addChild(this.shape);
    }


    updateContent(){
    }
}

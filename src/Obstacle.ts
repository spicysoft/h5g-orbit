class Obstacle extends GameObject
{
    private radius :number =null;
    private speed : number;

    constructor() {
        super();

        this.speed = Util.randomInt( 200, 300 );
        let rndX = Util.randomInt( 100, 500 );
        this.setShape( rndX, 100, 20 );
    }

    onDestroy() {
        GameObject.display.removeChild( this.shape );
        this.shape = null;
    }

    setShape( x: number, y:number, size: number )
    {
        if( this.shape ){
            GameObject.display.removeChild(this.shape);        
        }

        this.shape = new egret.Shape();
        this.shape.x = x;
        this.shape.y = y;

        this.shape.graphics.lineStyle( 2, 0xffffff );
        this.shape.graphics.drawRect( -size/2, -size/2, size, size );
        GameObject.display.addChild( this.shape );
        
    }


    updateContent()
    {
        this.shape.rotation += 360 * Game.fps;
        this.shape.y += this.speed * Game.fps;

        if( this.shape.y > 1000 ){
            this.destroy();
        }
    }

}

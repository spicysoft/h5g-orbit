class DamageEffect extends GameObject
{
    private radius : number;
    private speed : number;

    constructor( x:number, y:number ) {
        super();
        this.radius = 32;
        this.setShape( x, y, 32 );
    }

    onDestroy() {
        GameObject.gameDisplay.removeChild( this.shape );
        this.shape = null;
    }

    setShape( x:number, y:number, size: number )
    {
        if( this.shape ){
            GameObject.gameDisplay.removeChild(this.shape);        
        }

        this.shape = new egret.Shape();
        this.shape.x = x;
        this.shape.y = y;

        this.shape.graphics.lineStyle( 2, 0xaf0000 );
        //this.shape.graphics.drawCircle( 0, 0, size );
        this.shape.graphics.drawRect( -size/2, -size/2, size, size );

        GameObject.gameDisplay.addChild( this.shape );
    }


    updateContent()
    {
        if( GameManager.I.pause ){
            return;
        }

        //this.shape.x = Player.I.prePos.x;
        //this.shape.y = Player.I.prePos.y;
        this.shape.x = Player.I.pos.x;
        this.shape.y = Player.I.pos.y;

        this.shape.rotation -= 360 * 2 * Game.deltaTime;

        this.radius += 160 * Game.deltaTime;
        this.shape.graphics.clear();
        this.shape.graphics.lineStyle( 3, 0xaf0000 );
        //this.shape.graphics.drawCircle( 0, 0, this.radius );
        this.shape.graphics.drawRect( -this.radius/2, -this.radius/2, this.radius, this.radius );

        if( this.radius > 80 ){
            this.destroy();
        }
    }

}

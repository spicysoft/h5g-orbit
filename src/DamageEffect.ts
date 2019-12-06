class DamageEffect extends GameObject
{
    private radius : number;
    private speed : number;

    constructor( x:number, y:number ) {
        super();
        this.radius = 15;
        this.setShape( x, y, 15 );
    }

    onDestroy() {
        GameObject.display.removeChild( this.shape );
        this.shape = null;
    }

    setShape( x:number, y:number, size: number )
    {
        if( this.shape ){
            GameObject.display.removeChild(this.shape);        
        }

        this.shape = new egret.Shape();
        this.shape.x = x;
        this.shape.y = y;

        this.shape.graphics.lineStyle( 2, 0xaf0000 );
        //this.shape.graphics.drawCircle( 0, 0, size );
        this.shape.graphics.drawRect( -size/2, -size/2, size, size );

        if( Button.uiIndex == 0 ){
            GameObject.display.addChild( this.shape );
        }
        else{
            GameObject.display.addChildAt( this.shape, Button.uiIndex );
        }    
    }


    updateContent()
    {
        if( GameManager.I.pause ){
            return;
        }

        this.shape.x = Player.I.prePos.x;
        this.shape.y = Player.I.prePos.y;

        this.shape.rotation -= 360 * 2 * Game.fps;

        this.radius += 160 * Game.fps;
        this.shape.graphics.clear();
        this.shape.graphics.lineStyle( 3, 0xaf0000 );
        //this.shape.graphics.drawCircle( 0, 0, this.radius );
        this.shape.graphics.drawRect( -this.radius/2, -this.radius/2, this.radius, this.radius );

        if( this.radius > 80 ){
            this.destroy();
        }
    }

}

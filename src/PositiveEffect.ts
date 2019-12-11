class PositiveEffect extends GameObject
{
    private radius : number;
    private speed : number;

    constructor( x:number, y:number ) {
        super();
        this.radius = 16;
        this.setShape( x, y, this.radius );
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

        this.shape.graphics.lineStyle( 2, 0xffff00 );
        this.shape.graphics.drawCircle( 0, 0, size );


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

        //this.shape.x = Player.I.prePos.x;
        //this.shape.y = Player.I.prePos.y;
        this.shape.x = Player.I.pos.x;
        this.shape.y = Player.I.pos.y;

        this.radius += 100 * Game.fps;
        this.shape.graphics.clear();
        this.shape.graphics.lineStyle( 3, 0xffff00 );
        this.shape.graphics.drawCircle( 0, 0, this.radius );

        if( this.radius > 60 ){
            this.destroy();
        }
    }

}

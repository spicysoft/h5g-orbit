class SimpleText extends GameObject
{
    private text : egret.TextField = null;
    private lifeTime : number = 0;
    private timer : number = 0; 

    constructor( label:string, x:number, y:number, fontSize:number, textColor:number, isBold:boolean, isCentering:boolean, lifeTime:number=0 )
    {
        super();

        this.text = Util.myText( x, y, label, fontSize*2, 0.5, textColor, isBold, isCentering );
        GameObject.display.addChild( this.text );

        this.lifeTime = lifeTime;
    }
    
    onDestroy()
    {
        GameObject.display.removeChild( this.text );
        this.text = null;
    }

    updateContent()
    {
        this.timer += Game.fps;
        if( this.lifeTime > 0 && this.timer >= this.lifeTime ){
            this.destroy();
        }
    }

}

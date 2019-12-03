class Button extends GameObject
{
    private isTapped : boolean = false;
    private onTapped : ()=>void = null;
    private text : egret.TextField = null;

    constructor( onTappedHandler:()=>void )
    {
        super();

        this.onTapped = onTappedHandler;
        
        this.shape = new egret.Shape();
        this.shape.x = 200;
        this.shape.y = 100;

        //this.shape.graphics.beginFill(0xf0f0f0);
        this.shape.graphics.beginFill(0x0000f0);
        this.shape.graphics.drawRoundRect(0, 0, 180 , 60, 16);
        this.shape.graphics.endFill();
        this.shape.touchEnabled = true;
        
        GameObject.displayF.addChild( this.shape );

        this.text = Util.myText(200+90, 100+30, "button", 30, 1, 0x000000, false, true);

        GameObject.display.addChild( this.text );

        this.shape.addEventListener( egret.TouchEvent.TOUCH_TAP, this.touchHandler, this )
    }

    onDestroy()
    {
        GameObject.display.removeChild( this.shape );
        GameObject.display.removeChild( this.text );
        this.shape = null;
        this.text = null;
    }
    
    private touchHandler( evt:egret.TouchEvent ){
        switch ( evt.type ){
            case egret.TouchEvent.TOUCH_TAP:
                //let x = evt.stageX;
                //let y = evt.stageY;
                //if( this.shape.hitTestPoint(x,y) ){
                    this.isTapped = true;
                    //console.log("touch tap " + x + ", " + y);
                //}
                break;
            case egret.TouchEvent.TOUCH_MOVE:
                break;
            case egret.TouchEvent.TOUCH_BEGIN:
                break;
            case egret. TouchEvent.TOUCH_END:
                break;
        }
    }
    
    updateContent()
    {
        if( this.isTapped ){
            this.isTapped = false;
            if( this.onTapped ){
                this.onTapped();
            }
            //egret.log("tapped");
        }

    }
}

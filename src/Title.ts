class Title extends GameObject
{
    static I : Title = null;
    textTitle : egret.TextField = null;
    textManual : egret.TextField = null;
    textColor : number = 0x00c0e0;
    button : Button = null;

    constructor() {
        super();

        Title.I = this;

        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(0x000000, 0.5);
        this.shape.graphics.drawRect(0, Game.height/2-400, Game.width, Game.height*0.6);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);

        this.textTitle = Util.myText(Game.width/2, Game.height/2 - 300, "ORBIT", 100, 0.5, this.textColor, true, true);        
        GameObject.display.addChild( this.textTitle );
        
        this.textManual = Util.myText(Game.width/2, Game.height/2 - 180, "軌道上を周回している自機のスピード\nの調整で障害物を避ける", 60, 0.5, 0xf0f0f0, true, true);        
        GameObject.display.addChild( this.textManual );

        let w = 230;
        let h = 90;
        this.button = new Button( "START", Game.width/2-w/2, Game.height/2 + 120, w, h, 0xf0f0f0, 0x606060, 40, this.onButton );

        // ポーズ.
        GameManager.I.pause = true;
    }

    onDestroy() {
        if( this.button != null ){
            this.button.destroy();
            this.button = null;
        }
        GameObject.display.removeChild( this.shape );
        this.shape = null;
        GameObject.display.removeChild( this.textTitle );
        this.textTitle = null;
        GameObject.display.removeChild( this.textManual );
        this.textManual = null;
    }
    
    updateContent() {
    }

    onButton()
    {
        GameManager.isTitleEnd = true;
        GameManager.I.gameStart();
        Title.I.destroy();
    }
}
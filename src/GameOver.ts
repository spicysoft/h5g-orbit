class GameOver extends GameObject{

    textGameOver:egret.TextField = null;
    textScore:egret.TextField = null;
    textColor : number = 0x00c0e0;

    constructor() {
        super();

        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(0x000000, 0.4);
        this.shape.graphics.drawRect(0, Game.height*0.25, Game.width, Game.height*0.5);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);

        this.textGameOver = Util.myText(Game.width/2, Game.height/2 - 150, "GAME OVER", 100, 0.5, this.textColor, true, true);
        GameObject.display.addChild( this.textGameOver );
        
        this.textScore = Util.myText(Game.width/2, Game.height/2 - 50, "SCORE : " + Score.I.score, 90, 0.5, this.textColor, true, true);
        GameObject.display.addChild( this.textScore );

        /*if( Score.I.score >= Score.I.bestScore ){
            window.localStorage.setItem("bestScore", Score.I.score.toFixed() ); // string
        }*/

        //GameObject.display.once(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => this.tap(e), this);

        let w = 230;
        let h = 90;
        new Button( "RETRY", Game.width/2-w/2, Game.height/2 + 120, w, h, 0xf0f0f0, 0x606060, 40, this.onButton );
    }

    onDestroy() {
        GameObject.display.removeChild( this.shape );
        this.shape = null;
        GameObject.display.removeChild( this.textGameOver );
        this.textGameOver = null;
        GameObject.display.removeChild( this.textScore );
        this.textScore = null;
    }
    
    updateContent() {
    }

    onButton()
    {
        GameObject.transit = Game.init;
    }
}
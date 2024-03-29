
const DEF_LIFE : number = 5;

class Life extends GameObject
{
    static I:Life = null;   // singleton instance

    public life: number;
    private text: egret.TextField = null;
    private textColor : number = 0xF0F0F0;
    private shapes : egret.Shape[] = new Array(DEF_LIFE);


    constructor() {
        super();

        this.textColor = Util.color(255,255,255);

        Life.I = this;
        this.life = DEF_LIFE;
        this.text = Util.myText(330, 5, "LIFE :", 60, 0.5, this.textColor, true);
        GameObject.uiDisplay.addChild( this.text );

        let x = 100 + 330;
        let y = 16 + 5;
        for( let i = 0; i < DEF_LIFE; i++ ){
            this.shapes[i] = new egret.Shape();
            this.shapes[i].x = x + i * 25;
            this.shapes[i].y = y;
            this.shapes[i].graphics.beginFill(PLAYER_COLOR);
            this.shapes[i].graphics.drawCircle(0, 0, 12);
            this.shapes[i].graphics.endFill();
            GameObject.uiDisplay.addChild(this.shapes[i]);
        }
    }


    onDestroy() {
        GameObject.uiDisplay.removeChild( this.text );
        this.text = null;

        for( let i = 0; i < DEF_LIFE; i++ ){
            GameObject.uiDisplay.removeChild( this.shapes[i] );
            this.shapes[i] = null;
        }

        this.shapes = null;
    }

    updateContent() {
    }

    subLife()
    {
        this.life--;
        this.shapes[this.life].visible = false;

        if( this.life <= 0 ){
            this.life = 0;
            GameManager.I.pause = true;
            new GameOver();
        }

        //this.text.text = "Life : " + this.life.toFixed();
    }

    addLife()
    {
        if( this.life <  DEF_LIFE ){
            this.shapes[this.life].visible = true;
            this.life++;
        }
    }

}

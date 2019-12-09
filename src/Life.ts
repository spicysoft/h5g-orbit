
const DefLife = 3;

class Life extends GameObject
{
    static I:Life = null;   // singleton instance

    public life:number;
    private text:egret.TextField = null;
    private textColor : number = 0xF0F0F0;
    private shapes : egret.Shape[] = new Array(DefLife);


    constructor() {
        super();

        this.textColor = Util.color(250,250,255);

        Life.I = this;
        this.life = DefLife;
        this.text = Util.myText(200, 0, "Life :", 50, 0.5, this.textColor, false);
        GameObject.display.addChild( this.text );

        let x = 270;
        let y = 13;
        for( let i = 0; i < DefLife; i++ ){
            this.shapes[i] = new egret.Shape();
            this.shapes[i].x = x + i * 20;
            this.shapes[i].y = y;
            this.shapes[i].graphics.beginFill(0xff0000);
            this.shapes[i].graphics.drawCircle(0, 0, 10);
            this.shapes[i].graphics.endFill();
            GameObject.display.addChild(this.shapes[i]);
        }
    }


    onDestroy() {
        GameObject.display.removeChild( this.text );
        this.text = null;

        for( let i = 0; i < DefLife; i++ ){
            GameObject.display.removeChild( this.shapes[i] );
            this.shapes[i] = null;
        }

        this.shapes = null;
    }

    updateContent() {
    }

    subLife()
    {
        this.life -= 1;
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
 
    }

}

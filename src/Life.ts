class Life extends GameObject
{
    static I:Life = null;   // singleton instance

    public life:number;
    private text:egret.TextField = null;
    private textColor : number = 0xF0F0F0;

    constructor() {
        super();

        this.textColor = Util.color(250,250,255);

        Life.I = this;
        this.life = 3;
        this.text = Util.myText(200, 0, "Life : 3", 50, 0.5, this.textColor, false);
        GameObject.display.addChild( this.text );

    }
    
    onDestroy() {
        GameObject.display.removeChild( this.text );
        this.text = null;
    }

    updateContent() {
    }

    subLife()
    {
        this.life -= 1;
        if( this.life <= 0 ){
            this.life = 0;
        }

        this.text.text = "Life : " + this.life.toFixed();
    }

    addLife()
    {
 
    }

}

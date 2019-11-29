class Orbit extends GameObject
{
    //static I:Orbit = null;   // singleton instance
    private radius :number =null;

    constructor() {
        super();

        //Orbit.I = this;

        this.setShape(0.5*Game.width, 0.5*Game.height, 160);
    }

    onDestroy() {
        GameObject.display.removeChild( this.shape );
        this.shape = null;
    }

    setShape(x: number, y:number, radius: number){
        if( this.shape ){
            GameObject.display.removeChild(this.shape);        
        }

        this.shape = new egret.Shape();
        this.shape.x = x;
        this.shape.y = y;

        this.shape.graphics.lineStyle(2, 0xffffff);
        //this.shape.graphics.beginFill(0xff0000);
        this.shape.graphics.drawCircle(0, 0, radius);
        //this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
        
    }




    updateContent(){
    }


}

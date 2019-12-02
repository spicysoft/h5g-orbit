class ObstacleGen extends GameObject
{
    static I:ObstacleGen = null;   // singleton instance
    private radius :number =null;
    private timer : egret.Timer = null;

    constructor() {
        super();

        ObstacleGen.I = this;

        this.timer = new egret.Timer(1000, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.timer.start();

/*
        ///Set Group for layout of buttons, see layout samples for details.
        var group = new eui.Group();
        group.width = Game.width;
        group.height = Game.height;
        GameObject.display.addChild(group);

        var layout = new eui.VerticalLayout();
        layout.gap = 30;
        layout.verticalAlign = egret.VerticalAlign.MIDDLE;
        layout.horizontalAlign = egret.HorizontalAlign.CENTER;
        group.layout = layout;

        var btn3 = new eui.Button();
        btn3.label = "disabled";
        ///The view state of the display setting button component is disabled.
        btn3.currentState = "disabled";
        btn3.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouch,this);
        btn3.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouch,this);
        group.addChild(btn3);

        var btn4 = new eui.Button();
        btn4.label = "normal";
        btn4.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
        group.addChild(btn4);
*/
        
        //new Button( "btn", 50, 0x0000ff, 0.1, 0.1, 0.2, 0.05, 0xffffff, 0xff, this.onTouch );

    }

    onDestroy() {
    }

    onTouch()
    {
        egret.log("btn on");
    }

    private timerFunc(event: egret.Event)
    {
        let rndNum = Util.randomInt( 1, 3 );
        for( let i = 0; i < rndNum; i++ ){
            new Obstacle();
        }
    }


    updateContent()
    {

    }

}

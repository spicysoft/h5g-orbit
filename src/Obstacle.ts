class Obstacle extends GameObject
{
    private radius : number;
    private speed : number;

    constructor() {
        super();

        this.speed = Util.randomInt( 200, 300 );
        let rndX = Util.randomInt( 100, 500 );
        this.setShape( rndX, 100, 20 );
    }

    onDestroy() {
        GameObject.display.removeChild( this.shape );
        this.shape = null;
    }

    setShape( x: number, y:number, size: number )
    {
        if( this.shape ){
            GameObject.display.removeChild(this.shape);        
        }

        this.shape = new egret.Shape();
        this.shape.x = x;
        this.shape.y = y;

        this.shape.graphics.lineStyle( 2, 0xffffff );
        this.shape.graphics.drawRect( -size/2, -size/2, size, size );
        //this.shape.blendMode = egret.BlendMode.ADD;

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

        this.shape.rotation += 360 * Game.fps;
        this.shape.y += this.speed * Game.fps;

        let pos = new egret.Point( this.shape.x, this.shape.y );
        let next = new egret.Point( this.shape.x, this.shape.y + this.speed * Game.fps );

        if( this.checkColli( pos, next ) ){
            this.destroy();
            // effect.
            new DamageEffect( Player.I.pos.x, Player.I.pos.y );
            // ダメージ.
            Life.I.subLife();
            return;
        }


        if( this.shape.y > 1000 ){
            this.destroy();
        }
    }

    // 参考 http://sampo.hatenadiary.jp/entry/20070626/p1#f1
    checkColli( pos:egret.Point, nxt:egret.Point ) : boolean
    {
        // 範囲チェック.
        if( (pos.x < Orbit.AreaMinX || pos.x > Orbit.AreaMaxX) &&
            (nxt.x < Orbit.AreaMinX || nxt.x > Orbit.AreaMaxX) ){
            return false;
        }
        if( (pos.y < Orbit.AreaMinY || pos.y > Orbit.AreaMaxY) &&
            (nxt.y < Orbit.AreaMinY || nxt.y > Orbit.AreaMaxY) ){
            return false;
        }

        // 点と線分の距離で判定.
        // pc位置.
        let pcPos = Player.I.pos;

        // pcPosから線分に最も近い点.
        let near = new egret.Point();

        let a = nxt.subtract( pos );
        let b = pcPos.subtract( pos );
        let t = (a.x*b.x + a.y*b.y) / (a.x*a.x + a.y*a.y);

        if( t <= 0 ){
            near = pos;
        }
        else if( t >= 1 ){
            near = nxt;
        }
        else{
            near.x = pos.x + t * a.x;
            near.y = pos.y + t * a.y;
        }

        // pcPosからnearまでの距離.
        //let dist = egret.Point.distance( pcPos, near );
        let distSq = (near.x - pcPos.x)**2 + (near.y - pcPos.y)**2;
        let rSq = (16+10)**2;

        if( distSq <= rSq ){
            //egret.log("hit");
            return true;
        }

        return false;
    }


}

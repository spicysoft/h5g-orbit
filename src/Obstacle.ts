class Obstacle extends GameObject
{
    private radius : number;
    private velocity : egret.Point;
    private speed : number;
    private dist : number;

    constructor( x:number, y:number, vel:egret.Point ) {
        super();

        this.dist = 0;
        this.speed = Util.randomInt( 200, 300 ) * Game.fps;

        this.velocity = new egret.Point( vel.x, vel.y );
        this.velocity.x *= this.speed;
        this.velocity.y *= this.speed;

        this.setShape( x, y, 20 );
    }
/*
    constructor() {
        super();

        this.dist = 0;
        this.speed = Util.randomInt( 200, 300 ) * Game.fps;

        this.velocity = new egret.Point();
        this.velocity.x = 0;
        this.velocity.y = -this.speed;

        let minx = Game.width / 2 - 160 - 40;
        let maxx = Game.width / 2 + 160 + 40;
        //let rndX = Util.randomInt( minx, maxx );
        let rndX = Util.random( minx/20, maxx/20 ) * 20;
        this.setShape( rndX, 1100, 20 );
    }
*/
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

        let pos = new egret.Point( this.shape.x, this.shape.y );
        let next = pos.add( this.velocity );

        if( this.checkColli( pos, next ) ){
            this.destroy();
            // effect.
            new DamageEffect( Player.I.pos.x, Player.I.pos.y );
            // ダメージ.
            Life.I.subLife();
            return;
        }

        this.shape.x = next.x;
        this.shape.y = next.y;
        
        this.dist += this.speed;
        if( this.dist > 1000 ){
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

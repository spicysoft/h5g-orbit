class Obstacle extends GameObject
{
    private radius : number;
    private velocity : egret.Point;
    private speed : number;
    private rotSpeed : number;
    private dist : number;
    private type : number;  // 0:障害物 1:回復

    constructor( x:number, y:number, vel:egret.Point, speed:number, type:number=0 )
    {
        super();

        this.type = type;
        this.dist = 0;
        //this.speed = Util.randomInt( 200, 300 ) * Game.fps;
        //this.speed = 200 * Game.fps;
        this.speed = speed * Game.deltaTime;
        this.rotSpeed = (360 * speed / 200) * Game.deltaTime;

        this.velocity = new egret.Point( vel.x, vel.y );
        this.velocity.x *= this.speed;
        this.velocity.y *= this.speed;

        this.setShape( x, y, 20 );
    }

    onDestroy() {
        GameObject.gameDisplay.removeChild( this.shape );
        this.shape = null;
    }

    setShape( x: number, y:number, size: number )
    {
        if( this.shape ){
            GameObject.gameDisplay.removeChild(this.shape);        
        }

        this.shape = new egret.Shape();
        this.shape.x = x;
        this.shape.y = y;

        if( this.type == 0 ){
            this.shape.graphics.lineStyle( 2, 0xffffff );
            this.shape.graphics.drawRect( -size/2, -size/2, size, size );
            //this.shape.blendMode = egret.BlendMode.ADD;
        }
        else{
            // ライフ.
            this.shape.graphics.beginFill(PLAYER_COLOR);
            this.shape.graphics.drawCircle(0, 0, (size/2)+2);
            this.shape.graphics.endFill();
        }

        GameObject.gameDisplay.addChild( this.shape );
    }


    updateContent()
    {
        if( GameManager.I.pause ){
            return;
        }

        this.shape.rotation += this.rotSpeed;

        let pos = new egret.Point( this.shape.x, this.shape.y );
        let next = pos.add( this.velocity );

        if( this.checkColli( pos, next ) ){
            this.destroy();
            if( this.type == 0 ){
                // effect.
                new DamageEffect( Player.I.pos.x, Player.I.pos.y );
                // ダメージ.
                Life.I.subLife();
            }
            else{
                // effect.
                new PositiveEffect( Player.I.pos.x, Player.I.pos.y );
                // ライフアップ.
                Life.I.addLife();
                // LIFE+1表示.
                new SimpleText("LIFE+1", Player.I.pos.x, Player.I.pos.y, 28, 0xffff00, true, true, 1.5 );
            }
            return;
        }

        this.shape.x = next.x;
        this.shape.y = next.y;
        
        this.dist += this.speed;
        if( this.dist > GEN_YOFS*2 ){
            this.destroy();
        }
    }

    // PCとの当たり判定.
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

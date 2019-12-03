class GameManager extends GameObject
{
    static I : GameManager = null;   // singleton instance
    public pause : boolean = false;
    public mode : number = 0;

    constructor() {
        super();
        GameManager.I = this;
    }

    onDestroy() {

    }

    updateContent()
    {

    }

}

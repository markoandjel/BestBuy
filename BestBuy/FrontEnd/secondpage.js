import {removeAllChildNodes} from './main.js'
export class SecondPage
{
    constructor(kontejner)
    {
        this.kontejner=kontejner
    }

    crtaj() 
    {
        removeAllChildNodes(this.kontejner)
    }


}

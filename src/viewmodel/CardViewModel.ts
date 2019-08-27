import { GridLineViewModel } from "./GridLineViewModel";
import { GridViewModel } from "./GridViewModel";
import Card from "../../components/Card";
import Activity from "../../Activity";

export class CardViewModel {

    public _component: Card;
    public get c(): Card { return this._component; }
    public set c(component: Card) { this._component = component; }

    public _id: number;
    public get id(): number { return this._id; }

    public get app(): Activity { return this._gridLine.grid.app }

    public _gridLine: GridLineViewModel;
    public get gridLine(): GridLineViewModel { return this._gridLine; }

    public get grid(): GridViewModel { return this._gridLine.grid; }
    
    public _value: number;
    public get value(): number { return this._value; }
    
    public _imgSource: any;
    public get imgSource(): any { return this._imgSource; }
    public set imgSource(imgSource: any) { this._imgSource = imgSource; }
     
    public _discovered: boolean;
    public get discovered(): boolean { return this._discovered; }
    public set discovered(discovered: boolean) { this._discovered = discovered; }
    
	constructor(id: number, value: number, gridLine: GridLineViewModel) {
        this._id = id;
        this._value = value;
        this._gridLine = gridLine;
        this._imgSource = require('../../assets/img/react.png');
        this._discovered = false;
    }

}
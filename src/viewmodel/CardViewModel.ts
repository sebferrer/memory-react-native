import { GridViewModel } from "./GridViewModel";
import Card from "../../components/Card";

export class CardViewModel {

    public _component: Card;
    public get component(): Card { return this._component; }
    public set component(component) { this._component = component; }

    public _id: number;
    public get id(): number { return this._id; }

    public _grid: GridViewModel;
    public get grid(): GridViewModel { return this._grid; }
    
    public _value: number;
    public get value(): number { return this._value; }
    
    public _imgSource: any;
    public get imgSource(): any { return this._imgSource; }
    public set imgSource(imgSource: any) { this._imgSource = imgSource; }
     
    public _discovered: boolean;
    public get discovered(): boolean { return this._discovered; }
    public set discovered(discovered: boolean) { this._discovered = discovered; }
    
	constructor(id: number, value: number, grid: GridViewModel) {
        this._id = id;
        this._value = value;
        this._grid = grid;
        this._imgSource = require('../../assets/img/react.png');
        this._discovered = false;
    }

}
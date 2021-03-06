import { GridViewModel } from "./GridViewModel";
import { CardViewModel } from "./CardViewModel";
import GridLine from "../../components/GridLine";
import Activity from "../../Activity";

export class GridLineViewModel {

    public _component: GridLine;
    public get c(): GridLine { return this._component; }
    public set c(component: GridLine) { this._component = component; }

    public _id: number;
    public get id(): number { return this._id; }

    public get app(): Activity { return this._grid.app }

    public _grid: GridViewModel;
    public get grid(): GridViewModel { return this._grid; }

    public _nb: number;
    public get nb() { return this._nb; }

    public _cards: CardViewModel[];
    public get cards() { return this._cards; }

	constructor(id: number, nb: number, grid: GridViewModel) {
        this._id = id;
        this._nb = nb;
        this._grid = grid;
        this._cards = new Array<CardViewModel>();
    }
    
}
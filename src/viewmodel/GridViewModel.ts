import { CardViewModel } from "./CardViewModel";
import * as shuffle from 'shuffle-array';
import { GridLineViewModel } from "./GridLineViewModel";
import Grid from "../../components/Grid";

export class GridViewModel {

    public _component: Grid;
    public get c(): Grid { return this._component; }
    public set c(component) { this._component = component; }

    public _id: string;
    public get id(): string { return this._id; }

    public _nbX: number;
    public get nbX() { return this._nbX; }

    public _nbY: number;
    public get nbY() { return this._nbY; }

    public _gridLines: GridLineViewModel[];
    public get gridLines() { return this._gridLines; }

	constructor(id: string, nbX: number, nbY: number) {
        if (nbX * nbY % 2 != 0) {
			throw "Number of cards must be even";
		}

        this._id = id;
        this._nbX = nbX;
        this._nbY = nbY;

        this._gridLines = new Array<GridLineViewModel>();

        let cardValues = Array.from({ length: (nbX*nbY)/2 }, (_, index) => index + 1);
		cardValues = cardValues.concat(cardValues);
        cardValues = shuffle(cardValues);

        let chunkSize = this.nbX;
        let valuesChunks = new Array<Array<number>>();
		for (let i = 0, j = cardValues.length; i < j; i += chunkSize) {
			valuesChunks.push(cardValues.slice(i, i + chunkSize));
		}
        
        let gridLine;
        let counter = 0;
        for(let j = 0; j < nbY; j++) {
            gridLine = new GridLineViewModel(j, nbY, this);
            for(let i = 0; i < nbX; i++) {
                gridLine.cards.push(new CardViewModel(counter, valuesChunks[j][i], this));
                counter++;
            }
            this.gridLines.push(gridLine);
        }
    }
    
}
import { GridViewModel } from './src/viewmodel/GridViewModel';
import { CardViewModel } from './src/viewmodel/CardViewModel';

export default class Activity {

    public _grid: GridViewModel;
	public get grid(): GridViewModel { return this._grid; }

	public _score: number;
	public get score(): number { return this._score; }

	public _imgs: Array<any>;
	public get imgs(): Array<any> { return this._imgs; }

	public _defaultImg: any;
	public get defaultImg(): any { return this._defaultImg; }

	public _currentCard: CardViewModel;
	public get currentCard(): CardViewModel { return this._currentCard; }
	public set currentCard(currentCard: CardViewModel) { this._currentCard = currentCard; }

	// Don't have the choice but to load all of the images in advance:
	// https://stackoverflow.com/questions/30854232/react-native-image-require-module-using-dynamic-names
	constructor() {
        this._grid = new GridViewModel("grid", 5, 6, this);
        this._score = 0;
        this._imgs = [
			require("./assets/img/1.png"),
			require("./assets/img/2.png"),
			require("./assets/img/3.png"),
			require("./assets/img/4.png"),
			require("./assets/img/5.png"),
			require("./assets/img/6.png"),
			require("./assets/img/7.png"),
			require("./assets/img/8.png"),
			require("./assets/img/9.png"),
			require("./assets/img/10.png"),
			require("./assets/img/11.png"),
			require("./assets/img/12.png"),
			require("./assets/img/13.png"),
			require("./assets/img/14.png"),
			require("./assets/img/15.png")
		];
		this._defaultImg = require('./assets/img/react.png');
		this._currentCard = null;
    }
}
 module.exports = class Travel{
    
    /**
     * Receive the current location and the travel destination
     * @param {string} location 
     * @param {string} destination 
     */
    constructor(location,destination){
        this._location = location;
        this._destination = destination;

        /**          
        Grid explanation
                From   Andvari	Demeter	Aqua	Calas
                Andvari	 -	    X	    13	    23
                Demeter	 X	    -	    22	    25
                Aqua	 X	    30	    -	    12
                Calas	 20	    25	    15	    - 
         */
        this._grid = [
            ['-','x',13,23],
            ['x','-',22,25],
            ['x',30,'-',12],
            [20,25,15,'-']
        ]
    }

    #returnPosition(position){   
        switch (position) {
            case 'ANDVARI':
                return 0;
                break;
            case 'DEMETER':
                return 1;
            case 'AQUA':
                return 2;
            case 'CALAS':
                return 3;
            default:
                break;
        }
    }

    travel(){
        return this._grid[this.#returnPosition(this._location)][this.#returnPosition(this._destination)];
    }


}


import { Utils } from "../shared/utils";


export class List
{
    id: string;
    name: string;
    idCards: string[];

    /**
     * Constructor
     *
     * @param list
     */
    constructor(list)
    {
        this.id = list.id || Utils.generateGUID();
        this.name = list.name || '';
        this.idCards = [];
    }
}

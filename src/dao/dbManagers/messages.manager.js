import {messagesModel} from '../dbManagers/models/messages.model.js';


export default class Messages {

    constructor(){
        console.log('Trabajando messages con DB')
    }

    save = async (obj) => { //save        
            const result = await messagesModel.create(obj);
            return result;      
        
    }

}
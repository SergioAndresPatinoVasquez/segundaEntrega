import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productsCollection = 'products';

const productsSchema = new mongoose.Schema({

    title : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    code : {
        type: String,
        required: true
    },
    price :{
        type: Number,
        required: true
    }, 
    status : {
        type: Boolean,
        required: true
    },
    stock : {
        type: Number,
        required: true,
        default: 0
        
    },
    category : {
        type: String,
        required: true
    },
    thumbnail : {
        type: String,
        required: true
    }
    // carts:{
    //     //se define la referencia a la colección de carts
    //     type:[
    //         {
    //             carts : {
    //                 type: mongoose.Schema.Types.ObjectId,
    //                 ref: 'carts'
    //             }
    //         }
    //     ],
    //     default:[]
    // }

});

productsSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model(productsCollection, productsSchema);


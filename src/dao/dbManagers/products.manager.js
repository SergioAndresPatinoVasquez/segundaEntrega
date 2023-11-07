import {productsModel} from '../dbManagers/models/products.model.js';

export default class Products {

    constructor(){
        console.log('Trabajando productos con DB')
    }

    readProducts = async () =>{ //getAll
            const products = await productsModel.find().lean();
            return products;
         
    }

    writeProducts = async (product) => { //save        
            const result = await productsModel.create(product);
            return result;      
        
    }    

    getProductsByQuery = async ({limit, page, sort, query, queryValue})=>{
            let filter = {};

            if(!query || !queryValue){

            }else{
                filter = {[query]: queryValue};
            }
            

            const option = {
                limit: Number(limit) || 10,
                page: Number(page) || 1,
                sort: {["price"]: sort}
            };
            console.log("filter",filter)
            console.log("option",option)

           
            const result = await productsModel.paginate(filter, option)
            console.log(JSON.stringify(result, null, '\t'));
            return result;
    }

    getProductsById = async (id)=>{
        console.log("el id q llega", id);
            let products = await this.readProducts();
            let productsById = products.find(prod => prod._id.toString() === id)
            if(!productsById) return "Producto No encontrado"
            return productsById;
    }

    deleteProduct = async (id)=>{
        const result = await productsModel.deleteOne({_id:id});
        return result;
    }


    updatedProducts = async (id, product) => {
       
        const result = await productsModel.updateOne({_id:id}, product);
        return result;

    }



}


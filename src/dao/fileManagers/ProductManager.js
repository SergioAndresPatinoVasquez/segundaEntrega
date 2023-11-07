import {promises as fs} from 'fs'
import {nanoid} from 'nanoid'

export default class ProductManager {

    constructor(){
        this.path = "./src/files/products.json"
    }

    readProducts = async () =>{
        try {
            let products = await fs.readFile(this.path, "utf-8")
            return JSON.parse(products);
        } catch (error) {
            console.log(error)
        }
        
    }

    writeProducts = async (product) => {
        try {
            await fs.writeFile(this.path, JSON.stringify(product, null, '\t'))
        } catch (error) {
            console.log(error)
        }
        
    }

    addProducts = async (product) => {
        try {

            let productsAnt = await this.readProducts()
            product.id = nanoid()
            let productAll = [...productsAnt, product]
            await this.writeProducts(productAll)
            return "PRODUCTO AGREGADO";
        } catch (error) {
            console.log(error)
        }
        
    }

    getAll = async ()=>{
        try {
            return await this.readProducts();
        } catch (error) {
            console.log(error)
        }
        
    }

    getProductsById = async (id)=>{
        try {
            let products = await this.readProducts();
            let productsById = products.find(prod => prod.id === id)
            if(!productsById) return "Producto No encontrado"
            return productsById;
        }catch (error) {
            console.log(error)
        }


    }

    deleteProduct = async (id)=>{
        try {
            let products = await this.readProducts();
            let existProducts = products.some(prod => prod.id===id)
            if(existProducts){
                let filterProducts = products.filter(prod => prod.id != id)
                await this.writeProducts(filterProducts)
                return "Producto elimininado "
            }
            return "El producto que quieres eliminar no existe"
        } catch (error) {
            console.log(error)
        }

    }

    updatedProducts = async (id, product) => {
        try {
            let products = await this.readProducts();
            let productsById = products.find(prod => prod.id === id)
            if(!productsById) return "Producto No encontrado";
            await this.deleteProduct(id);
            let productsAllBefore = await this.readProducts();        
            products = [{...product, id : id}, ...productsAllBefore]
            await this.writeProducts(products)
            return "Producto Actualizado"
        } catch (error) {
            console.log(error)
        }

    }



}


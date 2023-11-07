import {promises as fs} from 'fs'
import {nanoid} from 'nanoid'
import ProductManager from './ProductManager.js'

const allProducts = new ProductManager

export default class CartManager {
    constructor(){
        this.path = "./src/files/carts.json"
    }

    readCarts = async () =>{
        try {
            
            let carts = await fs.readFile(this.path, "utf-8")
            return JSON.parse(carts);
        } catch (error) {
            console.log(error)
        }

    }

    writeCarts = async (carts) => {
        try {

            await fs.writeFile(this.path, JSON.stringify(carts, null, '\t'))
        } catch (error) {
            console.log(error)
        }

    }

    addCarts = async () =>{
        try {

            let cartssAnt = await this.readCarts()
            let id = nanoid()
            let cartsConcatenado = [{id : id, products: []}, ...cartssAnt]
            await this.writeCarts(cartsConcatenado)
            return "Carrito agregado correctamente"
        } catch (error) {
            console.log(error)
        }

    }

    getCartsById = async (id)=>{
        try {

            let carts = await this.readCarts();
            let cartsById = carts.find(cart => cart.id === id)
            if(!cartsById) return "Carrito No encontrado"
            
            return cartsById;
        } catch (error) {
            console.log(error)
        }

 
    }

    addProductInCart = async (cartId, productId) =>{
        try {

            let carts = await this.readCarts();
            let cartsById = carts.find(cart => cart.id === cartId)
            if(!cartsById) return "Carrito No encontrado"
            let productsManag = await allProducts.readProducts();
            let productsById = productsManag.find(prod => prod.id === productId)
            if(!productsById) return "Producto No encontrado" 
    
            //Ya existe ? , le sumo uno a la cantidad.
            let cartFilter = carts.filter(cart=> cart.id != cartId) 
    
            if(cartsById.products.some(prod => prod.id ===productId)){
                let productCart = cartsById.products.find(prod => prod.id ===productId)
                productCart.quantity++
                let concatCart = [cartsById, ...cartFilter] //
                await this.writeCarts(concatCart) 
                return "Cantidad del producto existente actualizado"
            }
    
            cartsById.products.push({id:productsById.id, quantity:1})     
            
            let concatCart = [ cartsById, ...cartFilter]
            await this.writeCarts(concatCart)
            return "Producto agregado al carrito"
        } catch (error) {
            console.log(error)
        }

    }
}
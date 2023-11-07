import {cartsModel} from '../dbManagers/models/carts.model.js';
import Products from './products.manager.js';

const allProducts = new Products();

export default class Carts {
    constructor(){
        console.log("Trabajando los carritos con DB")
    }

    readCarts = async () =>{ //getAll
        const carts = await cartsModel.find().lean();
        return carts;

    }

    writeCarts = async () => { //save
        
        const result = await cartsModel.create({});
        return result; 

    }


    update = async (id, cart) =>{
        const result = await cartsModel.updateOne({_id: id}, cart);
        return result;
    };




    // updateProductsInCart = async (carritoId, products) =>{
    //     try {
    //         const carrito = await cartsModel.findById(carritoId);
    //         console.log("carrito encontrado", carrito)
        
    //         if (!carrito) {
    //           return { error: 'Carrito no encontrado' };
    //         }
        
    //         console.log("products antes de for", products)
    //         for (const producto of products) {
    //           const { _id, quantity } = producto;
    //           console.log("productoId", _id)
    //           console.log("quantity", quantity)
    //           console.log("producto", producto)
        
    //           const productoEnCarrito = carrito.products.find(p => p._id.toString() === _id);
    //           console.log("productoEnCarrito", productoEnCarrito)
    //           if (productoEnCarrito) {
    //             productoEnCarrito.quantity = quantity;
    //           } else {
    //             carrito.products.push({ _id, quantity });
    //             console.log("carrito actualizado", carrito)
    //           }
    //         }
        
    //         await cartsModel.updateOne({_id: carrito._id}, carrito.products)
        
    //         return { message: 'Productos actualizados en el carrito' };
    //       } catch (error) {
    //         return { error: error.message };
    //       }
    // }
    updateProductsInCart = async (carritoId, products) =>{
        
        //buscar el carrito por su id
        const carrito = await cartsModel.findById(carritoId);

        if(!carrito){
           console.log("el carrito con id seleccionado no exite")
        }

        //se eliminan todos los productos existentes en el carrito
        carrito.products = [];

        //se agrega el nuevo producto
        products.forEach(producto => {
            carrito.products.push(producto);
          });

          console.log("el carrito", carrito)

        //se guarda el carrito actualizado
        const result= await carrito.save();

        return result;
    }

    updateQuantityProductInCar = async(cartId, productId,newQuantity) =>{
        //busco el carrito por id
        const carrito = await cartsModel.findById(cartId);
        console.log("carrito", carrito)

        if(!carrito){
            console.log("el carrito buscado no existe");
        }

        //Se busca el producto en el carrito
        const productInCart = carrito.products.find(producto => producto.product.toString() === productId);
        console.log("productInCart", productInCart)

        if(!productInCart) console.log("El producto no fue encontrado dentro del carrito")

        //se actualiza la cantidad
        productInCart.quantity= newQuantity;

        //se guarda el carrito actualizado
        const result = await carrito.save();
    }

    deleteProductInCart = async (cid) =>{
        //busco el carrito
        const carrito = await cartsModel.findById(cid);

        if(!carrito){
            return console.log("El carrito no existe")
        }

        //se limpian el array de productos
        carrito.products = [];

        //se guarda el carrito actualizado
        const result = await carrito.save();
    }


    getCartsById = async (Cartid)=>{
        try {

            const carrito = await cartsModel.findById(Cartid);
          
            if(!carrito) return console.log("Carrito No encontrado")
            
            return carrito;
        } catch (error) {
            console.log(error)
        }

 
    }

    // addProductInCart = async (cartId, productId) =>{

    //         let carts = await this.readCarts();
    //         let cartsById = carts.find(cart => cart._id.toString() === cartId)

    //         if(!cartsById) return "Carrito No encontrado"
    //         let productsManag = await allProducts.readProducts();
    //         let productsById = productsManag.find(prod => prod._id.toString() === productId)
    //         if(!productsById) return "Producto No encontrado" 
    
    //         //Ya existe ? , le sumo uno a la cantidad.
    //         let cartFilter = carts.filter(cart=> cart._id.toString() != cartId) 
    
    //         if(cartsById.products.some(prod => prod._id.toString() ===productId)){
    //             console.log("entro aqui")
    //             let productCart = cartsById.products.find(prod => prod._id.toString() ===productId)
    //             productCart.quantity++
    //             let cart = [cartsById, ...cartFilter] //
    //             await cartsModel.updateOne({product: cartId}, cartsById) //_id
    //             //await cartsModel.create(concatCart);
    //             return "Cantidad del producto existente actualizado"
    //         }
    
    //         cartsById.products.push({product:productsById.product, quantity:1})  //_id
            
    //         let cart = [ cartsById, ...cartFilter]
    //         await cartsModel.updateOne({product: cartId}, cartsById) //_id
    //         //await cartsModel.create(concatCart);
    //         return "Producto agregado al carrito"

    // }

    addProductInCart = async (cartId, productId) =>{

        //encontrando el carrito por ID
        const carrito = await cartsModel.findById(cartId);

        if(!carrito){
            return console.log("el carrito no existe")
        }

        //se verifica si el producto ya existe en el carrito
        const productInCart = carrito.products.find(p => p.product.toString() === productId);

        if (productInCart){ //si existe aumento solo la cantidad
            productInCart.quantity += 1;
        }else{ //si no existe lo creo
            carrito.products.push({product: productId, quantity:1});
        }

        const result = await carrito.save();
        return result;

    }

    deleteProduct = async(cid,pid)=>{
        const result = await cartsModel.updateOne({_id:cid},{$pull:{products:{product:pid}}})
        console.log("resultado carro", result)
        return result;
    }
}
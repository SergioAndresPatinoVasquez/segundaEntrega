import { Router } from "express";
import Carts from '../dao/dbManagers/carts.manager.js';
import { productsModel } from "../dao/dbManagers/models/products.model.js";
import { cartsModel } from "../dao/dbManagers/models/carts.model.js";
//import CartManager from "../managers/CartManager.js";

const cartRouter = Router ();
const cartsManager = new Carts();


cartRouter.get("/", async (req, res) =>{
    try {
        const carts = await cartsManager.readCarts();
        res.send({status: 'success', payload: carts});
    } catch (error) {
        res.status(500).send({status: 'error', message: error.message})
    }
    
})

cartRouter.post("/", async (req,res)=>{
    try {
        const result = await cartsManager.writeCarts();
        res.send({status: 'success', payload: result});
    } catch (error) {
        res.status(500).send({status: 'error', message: error.message})

    }

});


cartRouter.put("/:cid", async (req,res)=>{
    try {
        let carritoId= req.params.cid;
        const products =req.body;        
        
        const result = await cartsManager.updateProductsInCart(carritoId, products);
        
        res.send({status: 'success', payload: result});
    } catch (error) {
        res.status(500).send({status: 'error', message: error.message})
    }
});

cartRouter.put("/:cid/products/:pid", async (req,res)=>{
    try {
        const cartId= req.params.cid;
        const productId= req.params.pid;
        const newQuantity =req.body.quantity;       
        
        console.log("estos son ", cartId )
        console.log("estos son ",  productId)
        console.log("estos son ", newQuantity)
        
        const result = await cartsManager.updateQuantityProductInCar(cartId, productId, newQuantity);
        
        res.send({status: 'success', payload: result});
    } catch (error) {
        res.status(500).send({status: 'error', message: error.message})
    }
});


cartRouter.post("/:cid/products/:pid", async (req, res) =>{
    try {
        let cartId =req.params.cid
        let productId =req.params.pid

        const result = await cartsManager.addProductInCart(cartId, productId)
        res.send({status: 'success', payload: result});
    } catch (error) {
        res.status(500).send({status: 'error', message: error.message})

    }

});

cartRouter.delete("/:cid", async (req, res) =>{
    try {
        const cartId = req.params.cid;

        const result = await cartsManager.deleteProductInCart(cartId);
        
        res.send({status: 'success', payload: result});
    } catch (error) {
        res.status(500).send({status: 'error', message: error.message})

    }

});

cartRouter.delete("/:cid/products/:pid", async (req, res) =>{
    try {
        const { cid, pid} = req.params;

        const result = await cartsManager.deleteProduct(cid, pid);
        
        res.send({status: 'success', payload: result});
    } catch (error) {
        res.status(500).send({status: 'error', message: error.message})

    }

});

//populate
cartRouter.get("/:cid", async (req, res) =>{
    try {
        let Cartid = req.params.cid;

        const cart = await cartsManager.getCartsById(Cartid);

        const result = await cartsModel.find(cart).populate('products.product');

        console.log("Populate", JSON.stringify(result));

        res.send({status: 'success', payload: result});

    } catch (error) {
        
        res.status(500).send({status: 'error', message: error.message})

    }
    
    
 
 });





// cartRouter.get("/:id", async (req, res) =>{
//     let id = req.params.id  //ojo es un string 
//     res.send(await carts.getCartsById(id))
 
//  });



export default cartRouter;


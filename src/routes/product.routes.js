import { Router } from "express";
//import ProductManager from "../managers/ProductManager.js";
import Products from '../dao/dbManagers/products.manager.js'

const productRouter = Router()
const ProductManager = new Products();

// productRouter.get("/", async (req, res) => {
//    try {
//       const products = await ProductManager.readProducts();
//       res.send({status: 'success', payload: products});
//    } catch (error) {
//       res.status(500).send({status: 'error', message: error.message});
//    }   

// });

productRouter.get("/", async (req, res) => {
   try {
      let { limit, page, sort, query, queryValue } = req.query;
      
      console.log(req.query);

      const search = await ProductManager.getProductsByQuery({
            limit,
            page,
            sort,
            query,
            queryValue
      });

      res.send({status: 'success', payload: search});

   } catch (error) {
      res.status(500).send({status: 'error', message: error.message});
   }   

});

productRouter.post("/", async (req, res) => {

   try {
      const {title, description, code, price, status, stock, category, thumbnail} = req.body
   
   if (!title || !description || !code || !price || !status || !category || !thumbnail) {
      return res.status(400).send({ status: "error", error: "Incomplete values" });
   }

   const result = await ProductManager.writeProducts({
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail
   });

   res.status(201).send({status: 'success', payload: result});

   } catch (error) {
      res.status(500).send({status: 'error', message: error.message});
   }

});


productRouter.get("/:id", async (req, res) => {
   try {
      let id = req.params.id //ojo es un string 
      res.send(await ProductManager.getProductsById(id))
   } catch (error) {
      res.status(500).send({status: 'error', message: error.message});
   }


})

productRouter.delete("/:id", async (req, res) => {
   try {
      let id = req.params.id
      res.send(await ProductManager.deleteProduct(id))
   } catch (error) {
      res.status(500).send({status: 'error', message: error.message});
   }

})



productRouter.put("/:id", async (req, res) => {
   try {
      const {title, description, code, price, status, stock, category, thumbnail} = req.body
      const {id} = req.params;

      if (!title || !description || !code || !price || !status || !stock || !category || !thumbnail) {
         return res.status(400).send({ status: "error", error: "Incomplete values" });
      }

      const result = await ProductManager.updatedProducts(id,{
         title,
         description,
         code,
         price,
         status,
         stock,
         category,
         thumbnail
      });

      res.send({status: 'success', payload: result});

   } catch (error) {
      res.status(500).send({ status: 'error', message: error.message });
   }


})


export default productRouter;
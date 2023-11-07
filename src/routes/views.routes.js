import { Router } from 'express';
import Products from '../dao/dbManagers/products.manager.js';
import Carts from '../dao/dbManagers/carts.manager.js';
import { productsModel } from '../dao/dbManagers/models/products.model.js';
import { cartsModel } from '../dao/dbManagers/models/carts.model.js';

const router = Router ();

const productsManager = new Products();
const cartsManager = new Carts();

//paginate
router.get('/products', async(req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 2;

        const {docs, hasPrevPage, hasNextPage, nextPage, prevPage} = await productsModel.paginate({}, {page, limit, lean:true});
        
        res.render('products', {
            products: docs,
            hasPrevPage,
            hasNextPage,
            nextPage,
            prevPage,
            limit
        });

        

    } catch (error) {
        console.error(error.message);
    }
});

// router.get('/products-view', async(req,res)=>{
//     try {
//         const products = await productsManager.readProducts();
//         console.log("los prodcuts",products)
//         res.render('products', {products});
//     } catch (error) {
//         console.error(error.message);
//     }
// });

router.get('/carts-view', async(req,res)=>{
    try {
        const carts = await cartsManager.readCarts();
        res.render('carts', {carts});
    } catch (error) {
        console.error(error.message);
    }
});


router.get('/carts/:cid', async(req,res)=>{
    try {
        const cartId = req.params.cid;
        const cart = await cartsModel.findById(cartId).lean();
        console.log("aqui", cart)
        res.render('cartId', {cart});
    } catch (error) {
        console.error(error.message);
    }
});
// router.get('/', (req, res) => {
//     res.render('chat');
   
// });

export default router;
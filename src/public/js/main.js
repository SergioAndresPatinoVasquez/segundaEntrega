// Se declara una variable global para almacenar el id del carrito
let cartId = null;

function addProduct(id) {
  try {

    console.log("el id del producto es: ", id);

    // Si no tenemos un carrito asignado, creamos uno
    if (!cartId) {
      fetch("/api/carts", {
        method: 'POST',
        body: JSON.stringify(),
        headers: {'Content-Type': 'application/json'}
      })
      .then(response => response.json())
      .then(json => {
        cartId = json.payload._id;
        addToCart(id);
       
      })
      .catch(error => {
        console.error(error);
      });
    } else {
      // Si ya tenemos un carrito, agregamos el producto
      addToCart(id);
    }
  } catch (error) {
    console.log(error);
  }
}

function addToCart(productId) {
  try {
    console.log("el id del carrito es: ", cartId);
    fetch(`/api/carts/${cartId}/products/${productId}`,{
      method: 'POST',
      body: JSON.stringify(),
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
      if (response.ok) {
        console.log("Producto agregado al carrito exitosamente.");
      } else {
        throw new Error("Error al agregar el producto al carrito.");
      }
    })
    .catch(error => {
      console.error(error);
    });
  } catch (error) {
    console.log(error);
  }
}
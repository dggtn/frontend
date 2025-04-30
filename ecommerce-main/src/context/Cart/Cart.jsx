import axios from 'axios';
import { createContext, useContext } from 'react';
import { toast } from 'react-hot-toast';
import { authContext } from '../Auth/Auth';

// Crear contexto del carrito
export const cartContext = createContext(null);

export default function CartContextProvider(props) {
  const { userToken } = useContext(authContext);

  const headers = {
    token: userToken,
  };
  const URL = 'https://localhost4002/pedidos/comprar';

  // Obtener productos del carrito
  function getProducts() {
    const config = {
      method: 'get',
      url: URL,
      headers: headers,
    };

    return axios(config)
      .then((response) => response.data.data)
      .catch((error) => {
        throw error;
      });
  }

  // Agregar producto al carrito
  function addProduct(id) {
    const data = { productId: id };

    const config = {
      method: 'post',
      url: URL,
      headers: headers,
      data: data,
    };

    return toast.promise(
      axios(config)
        .then((response) => response.data)
        .catch((error) => {
          throw error;
        }),
      {
        loading: 'Agregando producto...',
        success: '¡Producto agregado exitosamente!',
        error: 'Error al agregar el producto',
      }
    );
  }

  // Eliminar producto del carrito
  function deleteProduct(id) {
    const config = {
      method: 'delete',
      url: `${URL}/${id}`,
      headers: headers,
    };

    return toast.promise(
      axios(config)
        .then((response) => response.data)
        .catch((error) => {
          throw error;
        }),
      {
        loading: 'Eliminando producto...',
        success: '¡Producto eliminado exitosamente!',
        error: 'Error al eliminar el producto',
      }
    );
  }

  // Actualizar cantidad del producto
  function updateProductQuantity(id, quantity) {
    const data = { count: quantity };

    const config = {
      method: 'put',
      url: `${URL}/${id}`,
      headers: headers,
      data: data,
    };

    return toast.promise(
      axios(config)
        .then((response) => response.data)
        .catch((error) => {
          throw error;
        }),
      {
        loading: 'Actualizando cantidad...',
        success: '¡Cantidad actualizada exitosamente!',
        error: 'Error al actualizar la cantidad',
      }
    );
  }

  // Vaciar todo el carrito
  function emptyCart() {
    const config = {
      method: 'delete',
      url: URL,
      headers: headers,
    };

    return axios
      .request(config)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  return (
    <cartContext.Provider
      value={{
        getProducts,
        addProduct,
        deleteProduct,
        updateProductQuantity,
        emptyCart,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}

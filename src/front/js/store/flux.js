import * as api from '../utils/apiCalls.js'
import { CATEGORIES } from '../utils/constants.js'

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      user: {},
      token: null,
      clothes: [],
      shoes: [],
      accessories: [],
      details: {},
      favorites: [],
      shopping_cart: [],
      clothes_types: [],
      shoes_types: [],
      accessories_types: [],
      sizes: {
        clothes: [],
        shoes: [],
        accessories: [],
      },
      orders: [],
      admin_orders: {
        'in progress': [],
        shipping: [],
        completed: [],
        canceled: [],
      },
      images: {
        clothes: '',
        shoes: '',
        accessories: '',
        logo: '',
        favicon: '',
      },
      response: {
        type: "",
        message: ""
      }
    },
    actions: {
      login: async (email, password) => {
        const actions = getActions()
        const data = await api.login(email, password)
        setStore({ user: data.user, token: data.token })
        actions.getFavorites()
        if (!data.user.is_admin) localStorage.setItem('myToken', data.token)
        return data
      },
      signup: async (
        email,
        password,
        first_name,
        last_name,
        phone,
        location,
        address
      ) => {
        const response = await api.signup(
          email,
          password,
          first_name,
          last_name,
          phone,
          location,
          address
        )
        return response
      },

      logout: () => {
        localStorage.removeItem('myToken')
        localStorage.removeItem('user')
        setStore({ user: {}, token: undefined })
      },

      validateToken: async () => {
        const token = localStorage.getItem('myToken')
        if (!token) return
        try {
          const data = await api.validateToken(token)
          localStorage.setItem('user', JSON.stringify(data))
          setStore({
            user: data.user,
            token,
            favorites: data.favorites,
            shopping_cart: data.shopping_cart,
          })
        } catch {
          localStorage.removeItem('user')
          localStorage.removeItem('myToken')
          setStore({ user: {}, token: undefined })
        }
      },

      addNewProduct: async ({
        name,
        price,
        description,
        color,
        type,
        category_id,
        sizes_stock,
        images,
      }) => {
        const product = {
          name,
          price,
          description,
          color,
          type,
          category_id,
          sizes_stock,
          images,
        }
        const createdProduct = await api.createProduct(
          product,
          getStore().token
        )
        // Create a new list of types with the new type if it doesn't exist
        const newTypes = [
          ...getStore()[`${CATEGORIES[category_id]}_types`],
          type,
        ].filter((type, index, self) => self.indexOf(type) === index)

        setStore({
          [CATEGORIES[category_id]]: [
            ...getStore()[CATEGORIES[category_id]],
            createdProduct,
          ],
          [`${CATEGORIES[category_id]}_types`]: newTypes,
        })
        return createdProduct
      },

      getProducts: async (category) => {
        const products = await api.getProducts(category)
        setStore({ [category]: products })
      },
      getProductDetails: async (id) => {
        const product = await api.getProductByID(id)
        return product
      },
      getFavorites: async () => {
        const store = getStore()
        if (!store.token) return
        if (store.user.is_admin) return
        const response = await api.getFavorites(store.token)
        setStore({ favorites: response })
        return response
      },

      postFavorites: async (id) => {
        const store = getStore()
        const response = await api.postFavorites(store.token, id)
        setStore({ favorites: response })
        return response
      },

      deleteFavorites: async (id) => {
        const store = getStore()
        const response = await api.deleteFavorites(store.token, id)
        setStore({ favorites: response })
        return response
      },

      postShoppingCart: async (product_id, quantity, size_id) => {
        const response = await api.postShoppingCart(
          product_id,
          quantity,
          size_id,
          getStore().token
        )
        setStore({ shopping_cart: response })
        return response
      },

      deleteShoppingCart: async (product_id, size_id) => {
        const store = getStore()
        const response = await api.deleteShoppingCart(
          store.token,
          product_id,
          size_id
        )

        const updatedShoppingCart = store.shopping_cart.filter(
          (item) => item.product.id !== product_id || item.size.id !== size_id
        )

        const updatedTotalCart = updatedShoppingCart.reduce(
          (total, item) => total + item.quantity * item.product.price,
          0
        )

        setStore({
          shopping_cart: updatedShoppingCart,
          total_cart: updatedTotalCart,
        })
        return response
      },
      updateCartItemQuantity: (product_id, size_id, quantity) => {
        const store = getStore()
        const updatedShoppingCart = store.shopping_cart.map((item) => {
          if (item.product.id === product_id && item.size.id === size_id) {
            item.quantity = quantity
          }
          return item
        })

        setStore({
          shopping_cart: updatedShoppingCart,
        })
      },
      getTotalCart: () => {
        return getStore().shopping_cart.reduce(
          (total, item) => total + item.quantity * item.product.price,
          0
        )
      },
      getTypes: async (category) => {
        const response = await api.getTypes(category)
        setStore({ [`${category}_types`]: response })
      },
      getSizes: async () => {
        const response = await api.getSizes()
        setStore({ sizes: response })
      },
      createSize: async (name, category_id) => {
        const newSize = await api.createSize(
          name,
          category_id,
          getStore().token
        )
        setStore({
          sizes: {
            ...getStore().sizes,
            [CATEGORIES[category_id]]: [
              ...getStore().sizes[CATEGORIES[category_id]],
              newSize,
            ],
          },
        })
      },
      deleteUser: async () => {
        const response = await api.deleteCallUser(getStore().token)
        setStore({ user: {} })
        getActions().logout()
        return response
      },
      editUser: async (user) => {
        const response = await api.editCallUser(getStore().token, user)
        setStore({ user: response.user })
      },
      deleteProduct: async (product_id) => {
        const response = await api.deleteCallProduct(
          getStore().token,
          product_id
        )

        return response
      },
      editProduct: async (product_id, product) => {
        const response = await api.editCallProduct(
          getStore().token,
          product_id,
          product
        )
        const products = getStore()[CATEGORIES[response.category_id]].map(
          (product) => {
            if (product.id === product_id) return response
            return product
          }
        )
        setStore({ [CATEGORIES[product.category_id]]: products })
        return response
      },
      clearLocalCart: () => {
        setStore({ shopping_cart: [] })
      },
      getOrdersUser: async () => {
        const response = await api.getOrdersUser(getStore().token)
        setStore({ orders: response })
      },
      updateAppImage: async (location, image) => {
        const newImage = await api.updateAppImage(image, location, getStore().token)
        setStore({
          images: {
            ...getStore().images,
            [location]: newImage.url,
          },
        })
      },
      getAppImages: async () => {
        const images = await api.getAppImages()
        setStore({ images })
      },
      getOrderDetails: async (orderID) => {
        const response = await api.getOrderDetials(orderID, getStore().token)
        return response
      },
      cancelOrder: async (orderID) => {
        const response = await api.cancelOrder(orderID, getStore().token)
        return response
      },
      getAllOrdersByStatus: async (status) => {
        const response = await api.getAllOrdersByStatus(
          status,
          getStore().token
        )
        setStore({
          admin_orders: {
            ...getStore().admin_orders,
            [status]: response,
          },
        })
      },
      updateOrderStatus: async (orderID, status) => {
        const response = await api.updateOrderStatus(
          orderID,
          status,
          getStore().token
        )
        return response
      },
      showNotification: async (message, type) => {
        setStore({ response: { message, type } })
      },
      checkIfUserCanRate: async (product_id) => {
        const response = await api.checkIfUserCanRate(
          product_id,
          getStore().token
        )
        return response
      },
      rateProduct: async (product_id, rating) => {
        const response = await api.rateProduct(
          product_id,
          rating,
          getStore().token
        )
        return response
      }
    },
  }
}

export default getState

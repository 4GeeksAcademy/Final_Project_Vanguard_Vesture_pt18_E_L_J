const API_URL = process.env.BACKEND_URL + 'api'

async function makeRequest(url, method = 'GET', body = null, token = null) {
  const headers = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers['Authorization'] = 'Bearer ' + token
  }

  const response = await fetch(API_URL + url, {
    method,
    headers,
    body: body && JSON.stringify(body),
  })

  const data = await response.json()

  if (!response.ok) {
    const newError = new Error()
    newError.httpStatus = response.status
    newError.missing_values = response.missing_values
    newError.message = data.message
    throw newError
  }
  return data
}

export async function login(email, password) {
  const response = await makeRequest('/login', 'POST', {
    email,
    password,
  })
  return response
}

export async function signup(
  email,
  password,
  first_name,
  last_name,
  phone,
  location,
  address
) {
  const response = await makeRequest('/signup', 'POST', {
    email: email,
    password: password,
    first_name: first_name,
    last_name: last_name,
    phone: phone,
    location: location,
    address: address,
  })

  return response
}

export async function validateToken(token) {
  const user = await makeRequest('/validate-token', 'POST', null, token)
  return user
}

export async function createProduct(product, token) {
  const createdProduct = await makeRequest('/products', 'POST', product, token)
  const imagesFromCloudinary = await Promise.all(
    product.images.map((image) => {
      const imgFormData = new FormData()
      imgFormData.append('file', image)
      imgFormData.append('cloud_name', 'dspkak5d0')
      imgFormData.append('upload_preset', 'vanguar_vesture_preset')
      return fetch('https://api.cloudinary.com/v1_1/dspkak5d0/image/upload', {
        method: 'POST',
        body: imgFormData,
      })
    })
  ).then((responses) => Promise.all(responses.map((res) => res.json())))

  const imagesFromDB = await Promise.all(
    imagesFromCloudinary.map((img, index) => {
      return makeRequest(
        `/products/${createdProduct.id}/images`,
        'POST',
        { image_url: img.secure_url.toString(), order: index },
        token
      )
    })
  )
  return { ...createdProduct, images: imagesFromDB }
}

export async function getFavorites(token) {
  const response = await makeRequest('/users/favorites', 'GET', null, token)

  return response
}

export async function postFavorites(token, product_id) {
  const response = await makeRequest(
    '/users/favorites/' + product_id,
    'POST',
    null,
    token
  )
  return response
}

export async function deleteFavorites(token, product_id) {
  const response = await makeRequest(
    '/users/favorites/' + product_id,
    'DELETE',
    null,
    token
  )
  return response
}

export async function getProductByID(id) {
  const response = await makeRequest(`/products/${id}`)
  return response
}

export async function postShoppingCart(product_id, quantity, size_id, token) {
  const response = await makeRequest(
    '/cart',
    'POST',
    {
      product_id: product_id,
      size_id: size_id,
      quantity: quantity,
    },
    token
  )

  return response
}

export async function deleteShoppingCart(token, product_id, size_id) {
  const response = await makeRequest(
    '/cart/' + product_id + '/size/' + size_id,
    'DELETE',
    null,
    token
  )
  return response
}

export async function getProducts(category) {
  const response = await makeRequest(`/products/${category}`)
  return response
}

export async function getTypes(category) {
  const response = await makeRequest(`/${category}/types`)
  return response
}

export async function getSizes() {
  const response = await makeRequest('/sizes', 'GET')
  return response
}

export async function createSize(name, category_id, token) {
  const response = await makeRequest(
    '/sizes',
    'POST',
    {
      name: name,
      category_id,
    },
    token
  )

  return response
}
export async function deleteCallUser(token) {
  const response = await makeRequest('/user/', 'DELETE', null, token)
  return response
}

export async function editCallUser(token, user) {
  const response = await makeRequest(
    '/user/',
    'PUT',
    {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      password: user.password,
      address: user.address,
      location: user.location,
    },
    token
  )
  return response
}
export async function deleteCallProduct(token, product_id) {
  const response = await makeRequest(
    '/products/' + product_id,
    'DELETE',
    null,
    token
  )
  return response
}
export async function editCallProduct(token, product_id, product) {
  const response = await makeRequest(
    '/products/' + product_id,
    'PUT',
    {
      name: product.name,
      price: product.price,
      description: product.description,
      color: product.color,
      type: product.type,
      sizes_stock: product.sizes_stock,
      category_id: product.category_id,
    },
    token
  )
  return response
}

export async function getOrdersUser(token) {
  const response = await makeRequest('/user/orders', 'GET', null, token)
  return response
}

export async function getOrderDetials(orderID, token) {
  const response = await makeRequest('/orders/' + orderID, 'GET', null, token)
  return response
}

export async function cancelOrder(orderID, token) {
  const response = await makeRequest(
    '/orders/' + orderID + '/cancel',
    'PUT',
    null,
    token
  )
  return response
}

export async function getAllOrdersByStatus(status, token) {
  const response = await makeRequest(
    `/orders/${status === 'in progress' ? 'in-progress' : status}`,
    'GET',
    null,
    token
  )
  return response
}

export async function updateOrderStatus(orderID, status, token) {
  const response = await makeRequest(
    '/orders/' + orderID + '/status',
    'PUT',
    { status },
    token
  )
  return response
}

export async function updateAppImage(image, location, token) {
  const imgFormData = new FormData()
  imgFormData.append('file', image)
  imgFormData.append('cloud_name', 'dspkak5d0')
  imgFormData.append('upload_preset', 'vanguar_vesture_preset')

  const imageFromCloudinary = await fetch(
    'https://api.cloudinary.com/v1_1/dspkak5d0/image/upload',
    {
      method: 'POST',
      body: imgFormData,
    }
  ).then((res) => res.json())

  const imageFromDB = await makeRequest(
    '/app/images',
    'POST',
    { url: imageFromCloudinary.secure_url.toString(), location },
    token
  )

  return imageFromDB
}

export async function getAppImages() {
  const response = await makeRequest('/app/images/')
  return response
}

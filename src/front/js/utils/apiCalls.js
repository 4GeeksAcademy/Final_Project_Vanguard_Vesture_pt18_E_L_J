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
  address,
  payment_method
) {
  const response = await makeRequest('/signup', 'POST', {
    email: email,
    password: password,
    first_name: first_name,
    last_name: last_name,
    phone: phone,
    location: location,
    address: address,
    payment_method: payment_method,
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
        { image_url: img.url.toString(), order: index },
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
  console.log('quantity', quantity)
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
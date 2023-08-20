# Vanguard Vesture API documentation

For routes that require auth must use `Authorizarion` header with this format: `Bearer <token>`

All routes url start with `/api/`

## Table of contents

- [Models](#models)
- [Signup and login users](#signup-and-login-users)
- [Products routes](#products-routes)
- [Product Images routes](#product-images-routes)
- [Product Rating routes](#product-rating-routes)
- [Categories routes](#categories-routes)
- [Sizes routes](#sizes-routes)
- [Cart routes](#cart-routes)
- [Types routes](#types-routes)
- [Orders routes](#orders-routes)


## Models

<details>
<summary>
    <code>User</code>
</summary>
    
```json
{
    "id": int,
    "first_name": string,
    "last_name": string,
    "email": string,
    "address": string,
    "location": string,
    "payment_method": string,
    "is_admin": boolean
}
```

</details>

<details>
<summary>
    <code>Product</code>
</summary>
    
```json
{
    "id": int,
    "name": string,
    "price": float,
    "description": string,
    "color": string,
    "image_url": string,
    "category_id": int,
    "type": string,
    "created_at": string,
    "sizes_stock": [
        {
            "id": int,
            "quantity": int
        }
    ],
    "rating": float,
}
```
</details>

<details>
<summary>
    <code>Category</code>
</summary>
        
```json
{
    "id": int,
    "name": string,
}
```
</details>

<details>
<summary>
    <code>Size</code>
</summary>
            
```json
{
    "id": int,
    "name": string,
}
```
</details>

<details>
<summary>
    <code>Order</code>
</summary>

```json
{
    "id": int,
    "user_id": int,
    "status": string,
    "order_date": string,
    "billing_info": {
        "full_name": string,
        "address": string,
        "email": string,
        "phone_number": string
    },
    "total": float,
    "order_items": [
        {
            "product": 'Product object',
            "quantity": int,
            "size": 'Size object'
        }
    ]
}
```

</details>

<details>
<summary>
    <code>ProductImage</code>
</summary>
    
```json
{
    "id": int,
    "order": int,
    "image_url": string,
    "product_id": int
}
```

</details>

<details>
<summary>
    <code>Category</code>
</summary>
        
```json
{
    "id": int,
    "name": string
}
```
</details>

<details>
<summary>
    <code>Size</code>
</summary>

```json
{
    "id": int,
    "name": string
}
```

</details>

<details>
<summary>
    <code>ShoppingCart</code>
</summary>

Represents a product within a user's cart. A product can be added to a shopping cart several times, but with different sizes.

```json
{
    "id": int,
    "user_id": int,
    "product_id": int,
    "size_id": int,
    "quantity": int,
    "product": "Product object",
    "size": "Size object"
}
```

</details>

<!-- End models -->

## Signup and login users

<details>
<summary>
	<code>POST</code>
	<code><b>/signup</b></code>
	<code>Creates a new user</code>
</summary>

### Request Body

```json
{
    "first_name": string,
    "last_name": string,
    "email": string,
    "password": string,
    "address": string,
    "location": string
}
```

### Responses

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `201`     | `application/json` | `{"message": "User created succefully"}` |
> | `409`     | `application/json` | `{"message": "Email already in use"}`    |
> | `400`     | `application/json` | `{"message": "Password is required"}`    |

</details>

<details>
<summary>
	<code>POST</code>
	<code><b>/login</b></code>
	<code>Creates an auth token</code>
</summary>

### Request Body

```json
{
  "email": string,
  "password": string
}
```

### Responses

> | http code | content-type       | response                                                                   |
> | --------- | ------------------ | -------------------------------------------------------------------------- |
> | `200`     | `application/json` | `{"message": "Successful login", "token": string , "user": (User object)}` |
> | `401`     | `application/json` | `{"message": "Invalid credentials"}`                                       |
> | `400`     | `application/json` | `{"message": "InEmail and password are required"}`                         |

</details>

<details>
<summary>
	<code>POST</code>
	<code><b>/validate-token</b></code>
	<code>Validates a token and returns the user</code>
</summary>

**Auth required** : YES

### Responses

> | http code | content-type       | response                                  |
> | --------- | ------------------ | ----------------------------------------- |
> | `200`     | `application/json` | `(User object)`                           |
> | `401`     | `application/json` | `{"msg": "Missing Authorization Header"}` |
> | `401`     | `application/json` | `{"msg": "Token has expired"}`            |
> | `422`     | `application/json` | `{"msg": "Not enough segments"}`          |

</details>

---

<!-- Product routes -->

## Products routes

<details>
<summary>
	<code>GET</code>
	<code><b>/products</b></code>
	<code>List all products</code>
</summary>

### Responses

> | http code | content-type       | response          |
> | --------- | ------------------ | ----------------- |
> | `200`     | `application/json` | `Array <Product>` |

</details>

<details>
<summary>
	<code>GET</code>
	<code><b>/products/{int:product_id}</b></code>
	<code>Get a product by ID</code>
</summary>

### Responses

> | http code | content-type       | response                           |
> | --------- | ------------------ | ---------------------------------- |
> | `200`     | `application/json` | `(Product object)`                 |
> | `404`     | `application/json` | `{"message": "Product not found"}` |

</details>

<details>
<summary>
	<code>GET</code>
	<code><b>/products/clothing</b></code>
	<code>List all clothing products</code>
</summary>

### Responses

> | http code | content-type       | response          |
> | --------- | ------------------ | ----------------- |
> | `200`     | `application/json` | `Array <Product>` |

</details>

<details>
<summary>
	<code>GET</code>
	<code><b>/products/accessories</b></code>
	<code>List all accessories products</code>
</summary>

### Responses

> | http code | content-type       | response          |
> | --------- | ------------------ | ----------------- |
> | `200`     | `application/json` | `Array <Product>` |

</details>

<details>
<summary>
	<code>GET</code>
	<code><b>/products/shoes</b></code>
	<code>List all clothing shoes</code>
</summary>

### Responses

> | http code | content-type       | response          |
> | --------- | ------------------ | ----------------- |
> | `200`     | `application/json` | `Array <Product>` |

</details>

<details>
<summary>
	<code>POST</code>
	<code><b>/products</b></code>
	<code>Creates a product</code>
</summary>

**Auth required** : YES

**Admin required** : YES

### Request Body

```json
{
  "name": string,
  "price": float,
  "description": string,
  "color": string,
  "image_url": string,
  "category_id": int,
  "sizes_stock": [
    {
      "id": int,
      "stock": int
    }
  ],
  "type": string
}
```

### Responses

> | http code | content-type       | response                                        |
> | --------- | ------------------ | ----------------------------------------------- |
> | `200`     | `application/json` | `(Product object)`                              |
> | `422`     | `application/json` | `{"message": "Size with id (size_id) not found` |

</details>

<details>
<summary>
	<code>PUT</code>
	<code><b>/products/{int:product_id}</b></code>
	<code>Updates a product by ID</code>
</summary>

**Auth required** : YES

**Admin required** : YES

### Request Body

```json
{
  "name": string,
  "price": float,
  "description": string,
  "color": string,
  "image_url": string,
  "category_id": int,
  "sizes_stock": [
    {
      "id": int,
      "stock": int
    }
  ],
  "type": string
}
```

### Responses

> | http code | content-type       | response                                        |
> | --------- | ------------------ | ----------------------------------------------- |
> | `200`     | `application/json` | `(Product object)`                              |
> | `404`     | `application/json` | `{"message": "Product not found"}`              |
> | `422`     | `application/json` | `{"message": "Size with id (size_id) not found` |

</details>

<details>
<summary>
	<code>DELETE</code>
	<code><b>/products/{int:product_id}</b></code>
	<code>Deletes a product by ID</code>
</summary>

**Auth required** : YES

**Admin required** : YES

### Responses

> | http code | content-type               | response                           |
> | --------- | -------------------------- | ---------------------------------- |
> | `204`     | `text/html; charset=utf-8` |                                    |
> | `404`     | `application/json`         | `{"message": "Product not found"}` |

</details>

<!-- End product routes -->

---

<!-- Product Images routes -->

## Product Images routes

<!-- Images routes -->
<details>
<summary>
    <code>GET</code>
    <code><b>/products/{int:product_id}/images</b></code>
    <code>Gets all images of a product</code>
</summary>

### Responses

> | http code | content-type       | response               |
> | --------- | ------------------ | ---------------------- |
> | `200`     | `application/json` | `Array <ProductImage>` |

</details>

<details>

<summary>
    <code>POST</code>
    <code><b>/products/{int:product_id}/images</b></code>
    <code>Creates a new image for a product</code>
</summary>

**Auth required** : YES

**Admin required** : YES

### Request Body

```json
{
    "image_url": string,
    "order": int
}
```

### Responses

> | http code | content-type       | response                              |
> | --------- | ------------------ | ------------------------------------- |
> | `200`     | `application/json` | `(ProductImage object)`               |
> | `404`     | `application/json` | `{"message": "Product not found"}`    |
> | `422`     | `application/json` | `{"message": "Image URL is required"` |
> | `422`     | `application/json` | `{"message": "Order is required"`     |

</details>

<details>
<summary>
    <code>PUT</code>
    <code><b>/products/{int:product_id}/images/{int:image_id}</b></code>
    <code>Updates an image of a product</code>
</summary>

**Auth required** : YES

**Admin required** : YES

### Request Body

```json
{
    "image_url": string,
    "order": int
}
```

### Responses

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `200`     | `application/json` | `(ProductImage object)`                  |
> | `404`     | `application/json` | `{"message": "Product image not found"}` |

</details>

<details>
<summary>
    <code>DELETE</code>
    <code><b>/products/{int:product_id}/images/{int:image_id}</b></code>
    <code>Deletes an image of a product</code>
</summary>

**Auth required** : YES

**Admin required** : YES

### Responses

> | http code | content-type               | response                                 |
> | --------- | -------------------------- | ---------------------------------------- |
> | `204`     | `text/html; charset=utf-8` |                                          |
> | `404`     | `application/json`         | `{"message": "Product image not found"}` |

</details>
<!-- End images routes -->

---

<!-- Product Rating routes -->

## Product Rating routes

<details>
<summary>
    <code>GET</code>
    <code><b>/products/{int:product_id}/rating</b></code>
    <code>Gets the rating of a product</code>
</summary>

### Responses

> | http code | content-type       | response                                                                     |
> | --------- | ------------------ | ---------------------------------------------------------------------------- |
> | `200`     | `application/json` | `{"id": number, "rating": float, name: string, users_rating: Array <User> }` |
> | `404`     | `application/json` | `{"message": "Product not found"}`                                           |

</details>

<details>
<summary>
    <code>POST</code>
    <code><b>/products/{int:product_id}/rating</b></code>
    <code>Creates a new rating for a product</code>
</summary>

**Auth required** : YES

### Request Body

```json
{
    "rating": float
}
```

### Responses

> | http code | content-type       | response                                                     |
> | --------- | ------------------ | ------------------------------------------------------------ |
> | `200`     | `application/json` | `{"user_id": number, "product_id": number, "rating": float}` |
> | `404`     | `application/json` | `{"message": "Product not found"}`                           |

</details>

<details>
<summary>
    <code>PUT</code>
    <code><b>/products/{int:product_id}/rating</b></code>
    <code>Updates the rating of a product</code>
</summary>

**Auth required** : YES

### Request Body

```json
{
    "rating": float
}
```

### Responses

> | http code | content-type       | response                                                     |
> | --------- | ------------------ | ------------------------------------------------------------ |
> | `200`     | `application/json` | `{"user_id": number, "product_id": number, "rating": float}` |
> | `404`     | `application/json` | `{"message": "Product not found"}`                           |

</details>

<details>
<summary>
    <code>DELETE</code>
    <code><b>/products/{int:product_id}/rating</b></code>
    <code>Deletes the rating of a product</code>
</summary>

**Auth required** : YES

### Responses

> | http code | content-type               | response                           |
> | --------- | -------------------------- | ---------------------------------- |
> | `204`     | `text/html; charset=utf-8` |                                    |
> | `404`     | `application/json`         | `{"message": "Product not found"}` |

</details>

<!-- End product rating routes -->

---

<!-- Categories routes -->

## Categories routes

<details>
<summary>
	<code>GET</code>
	<code><b>/categories</b></code>
	<code>List all categories</code>
</summary>

### Responses

> | http code | content-type       | response           |
> | --------- | ------------------ | ------------------ |
> | `200`     | `application/json` | `Array <Category>` |

</details>

<details>
<summary>
	<code>GET</code>
	<code><b>/categories/{int:categories_id}</b></code>
	<code>Get a category by ID</code>
</summary>

### Responses

> | http code | content-type       | response                            |
> | --------- | ------------------ | ----------------------------------- |
> | `200`     | `application/json` | `(Category object)`                 |
> | `404`     | `application/json` | `{"message": "Category not found"}` |

</details>

<details>
<summary>
    <code>POST</code>
    <code><b>/categories</b></code>
    <code>Creates a category</code>
</summary>

**Auth required** : YES

**Admin required** : YES

### Request Body

```json
{
    "name": string,
    "id": number
}
```

### Responses

> | http code | content-type       | response                                   |
> | --------- | ------------------ | ------------------------------------------ |
> | `200`     | `application/json` | `(Category object)`                        |
> | `409`     | `application/json` | `{"message": "Category already exists"`    |
> | `409`     | `application/json` | `{"message": "Category ID already exists"` |
> | `422`     | `application/json` | `{"message": "Name is required"`           |
> | `422`     | `application/json` | `{"message": "ID is required"`             |

</details>

<details>
<summary>
    <code>PUT</code>
    <code><b>/categories/{int:category_id}</b></code>
    <code>Updates a category by ID</code>
</summary>

**Auth required** : YES

**Admin required** : YES

### Request Body

```json
{
    "name": string
}
```

### Responses

> | http code | content-type       | response                            |
> | --------- | ------------------ | ----------------------------------- |
> | `200`     | `application/json` | `(Category object)`                 |
> | `404`     | `application/json` | `{"message": "Category not found"}` |

</details>

<details>
<summary>
    <code>DELETE</code>
    <code><b>/categories/{int:category_id}</b></code>
    <code>Deletes a category by ID</code>
</summary>

**Auth required** : YES

**Admin required** : YES

### Responses

> | http code | content-type               | response                            |
> | --------- | -------------------------- | ----------------------------------- |
> | `204`     | `text/html; charset=utf-8` |                                     |
> | `404`     | `application/json`         | `{"message": "Category not found"}` |

</details>

<!-- End categories routes -->

---

<!-- Sizes routes -->

## Sizes routes

<details>
<summary>
    <code>GET</code>
    <code><b>/sizes</b></code>
    <code>List all sizes</code>
</summary>

### Responses

> | http code | content-type       | response       |
> | --------- | ------------------ | -------------- |
> | `200`     | `application/json` | `Array <Size>` |

</details>

<details>

<summary>
    <code>GET</code>
    <code><b>/sizes/{int:size_id}</b></code>
    <code>Get a size by ID</code>
</summary>

### Responses

> | http code | content-type       | response                        |
> | --------- | ------------------ | ------------------------------- |
> | `200`     | `application/json` | `(Size object)`                 |
> | `404`     | `application/json` | `{"message": "Size not found"}` |

</details>

<details>
<summary>
    <code>POST</code>
    <code><b>/sizes</b></code>
    <code>Creates a size</code>
</summary>

**Auth required** : YES

**Admin required** : YES

### Request Body

```json
{
    "name": string,
    "category_id": number
}
```

### Responses

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `200`     | `application/json` | `(Size object)`                          |
> | `409`     | `application/json` | `{"message": "Size name already exists"` |
> | `422`     | `application/json` | `{"message": "Name is required"`         |
> | `422`     | `application/json` | `{"message": "Category ID is required"`  |

</details>

<details>
<summary>
    <code>PUT</code>
    <code><b>/sizes/{int:size_id}</b></code>
    <code>Updates a size by ID</code>
</summary>

**Auth required** : YES

**Admin required** : YES

### Request Body

```json
{
    "name": string,
    "category_id": number
}
```

### Responses

> | http code | content-type       | response                        |
> | --------- | ------------------ | ------------------------------- |
> | `200`     | `application/json` | `(Size object)`                 |
> | `404`     | `application/json` | `{"message": "Size not found"}` |

</details>

<details>
<summary>
    <code>DELETE</code>
    <code><b>/sizes/{int:size_id}</b></code>
    <code>Deletes a size by ID</code>
</summary>

**Auth required** : YES

**Admin required** : YES

### Responses

> | http code | content-type               | response                        |
> | --------- | -------------------------- | ------------------------------- |
> | `204`     | `text/html; charset=utf-8` |                                 |
> | `404`     | `application/json`         | `{"message": "Size not found"}` |

</details>

<!-- End sizes routes -->

---

<!-- Cart routes -->

## Cart routes

<details>
<summary>
    <code>GET</code>
    <code><b>/cart</b></code>
    <code>List all CartItems of a user</code>
</summary>

**Auth required** : YES

### Responses

> | http code | content-type       | response           |
> | --------- | ------------------ | ------------------ |
> | `200`     | `application/json` | `Array <CartItem>` |

</details>

<details>
<summary>
    <code>POST</code>
    <code><b>/cart</b></code>
    <code>Adds a product to the cart</code>
</summary>

If the product is already in the cart, the quantity will be updated.

**Auth required** : YES

### Request Body

```json
{
    "product_id": number,
    "size_id": number,
    "quantity": number
}
```

### Responses

> | http code | content-type       | response                                        |
> | --------- | ------------------ | ----------------------------------------------- |
> | `200`     | `application/json` | `Array <ShoppingCart>`                          |
> | `404`     | `application/json` | `{"message": "Product not found"}`              |
> | `404`     | `application/json` | `{"message": "Size not found"}`                 |
> | `422`     | `application/json` | `{"message": "Value quantity is missing"`       |
> | `422`     | `application/json` | `{"message": "Quantity must be greater than 0"` |
> | `409`     | `application/json` | `{"message": "Not enough stock"`                |
> | `422`     | `application/json` | `{"message": "Value size_id is missing"`        |
> | `422`     | `application/json` | `{"message": "Value product_id is missing"`     |

</details>

<details>
<summary>
    <code>DELETE</code>
    <code><b>/cart/{int:int:product_id}/size/{int:size_id}</b></code>
    <code>Deletes a cart item</code>
</summary>

**Auth required** : YES

### Responses

> | http code | content-type       | response                                   |
> | --------- | ------------------ | ------------------------------------------ |
> | `200`     | `application/json` | `Array <ShoppingCart>`                     |
> | `404`     | `application/json` | `{"message": "Product not found"}`         |
> | `404`     | `application/json` | `{"message": "Size not found"}`            |
> | `404`     | `application/json` | `{"message": "Product not found in cart"}` |

</details>

<!-- End cart routes -->

---

<!-- Types routes -->

## Types routes

<details>
<summary>
    <code>GET</code>
    <code><b>/clothes/types</b></code>
    <code>List all clothes types</code>
</summary>

### Responses

> | http code | content-type       | response         |
> | --------- | ------------------ | ---------------- |
> | `200`     | `application/json` | `Array <string>` |

</details>

<details>
<summary>
    <code>GET</code>
    <code><b>/accessories/types</b></code>
    <code>List all accessories types</code>
</summary>

### Responses

> | http code | content-type       | response         |
> | --------- | ------------------ | ---------------- |
> | `200`     | `application/json` | `Array <string>` |

</details>

<details>
<summary>
    <code>GET</code>
    <code><b>/shoes/types</b></code>
    <code>List all shoes types</code>
</summary>

### Responses

> | http code | content-type       | response         |
> | --------- | ------------------ | ---------------- |
> | `200`     | `application/json` | `Array <string>` |

</details>

<!-- End types routes -->

---

<!-- Orders routes -->

## Orders routes

<details>
<summary>
    <code>GET</code>
    <code><b>/create-paypal-order</b></code>
    <code>Creates a paypal order</code>
</summary>

**Auth required** : YES

## Request Body

```json
{
    "cart": Array <ShoppingCart>
}
```

### Responses

> | http code | content-type       | response                                                   |
> | --------- | ------------------ | ---------------------------------------------------------- |
> | `200`     | `application/json` | `Paypal response`                                          |
> | `422`     | `application/json` | `{"message": "Cart is empty"}`                             |
> | `404`     | `application/json` | `{"message": "Product not found"}`                         |
> | `404`     | `application/json` | `{"message": "Size not found"}`                            |
> | `400`     | `application/json` | `{"message": "Product does not have stock for this size"}` |
> | `400`     | `application/json` | `{"message": "Not enough stock", "stock": number}`         |

</details>

<details>
<summary>
    <code>POST</code>
    <code><b>/capture-paypal-order</b></code>
    <code>Completes the paypal pay. If the pay is confirmed, creates an internal order</code>
</summary>

**Auth required** : YES

## Request Body

```json
{
    "orderID": string, // Paypal order ID
    "cart": Array <ShoppingCart>,
    "billing_info": {
        "full_name": string,
        "address": string,
        "email": string,
        "phone_number": string
    },
    "fromCart": boolean
}
```

### Responses

> | http code | content-type       | response                                                             |
> | --------- | ------------------ | -------------------------------------------------------------------- |
> | `200`     | `application/json` | `{"message": "Order created successfully", "order": (Order object)}` |

</details>

<details>

<summary>
    <code>GET</code>
    <code><b>/user/orders</b></code>
    <code>List all orders of a user</code>
</summary>

**Auth required** : YES

### Responses

> | http code | content-type       | response         |
> | --------- | ------------------ | ---------------- |
> | `200`     | `application/json` | `Array <Order>`  |

</details>

<details>
<summary>
    <code>GET</code>
    <code><b>/orders/{int:order_id}</b></code>
    <code>Get an order by ID</code>
</summary>

**Auth required** : YES

### Responses

> | http code | content-type       | response                            |
> | --------- | ------------------ | ----------------------------------- |
> | `200`     | `application/json` | `(Order object)`                    |
> | `404`     | `application/json` | `{"message": "Order not found"}`    |

</details>

<details>
<summary>
    <code>PUT</code>
    <code><b>/orders/{int:order_id}/cancel</b></code>
    <code>
        Cancels an order. If the order is not in 'in progress' status, it will not be cancelled.
        If the order is cancelled, the stock of the products will be updated.
    </code>
</summary>

**Auth required** : YES

### Responses

> | http code | content-type       | response                            |
> | --------- | ------------------ | ----------------------------------- |
> | `200`     | `application/json` | `(Order object)`                    |
> | `404`     | `application/json` | `{"message": "Order not found"}`    |
> | `400`     | `application/json` | `{"message": "Order cannot be canceled"}`    |

</details>

<details>
<summary>
    <code>PUT</code>
    <code><b>/orders/{int:order_id}/status</b></code>
    <code>Updates the status of an order</code>
</summary>

**Auth required** : YES

**Admin required** : YES

### Request Body

```json
{
    "status": string
}
```

### Responses

> | http code | content-type       | response                            |
> | --------- | ------------------ | ----------------------------------- |
> | `200`     | `application/json` | `(Order object)`                    |
> | `404`     | `application/json` | `{"message": "Order not found"}`    |
> | `422`     | `application/json` | `{"message": "Status is required"}` |
> | `422`     | `application/json` | `{"message": "Invalid status"}`     |

</details>

<!-- End orders routes -->




"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, Response
from src.api.models import db, User, Product, Order, OrderItem, Category, Size, ShoppingCart, ProductSizeStock, ProductsRating, ProductImage, AppImage
from src.api.utils import generate_sitemap, APIException
from src.api.utils import save_new_product, update_product_by_id, update_category_by_id
from src.api.utils import check_is_admin_by_user_id
from src.api.utils import generate_paypal_access_token, handle_paypal_response
import bcrypt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import requests
import datetime

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# Auth routes


@api.route('/signup', methods=['POST'])
def signup():
    data = request.json

    if User.query.filter_by(email=data['email']).first():
        raise APIException(message='Email already in use', status_code=409)

    if 'password' not in data or not data['password']:
        return jsonify({'message': 'Password is required'}), 400

    # Encriptar la contraseña antes de guardarla en la base de datos
    hashed_password = bcrypt.hashpw(
        data['password'].encode('utf-8'), bcrypt.gensalt())

    new_user = User(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        # Decodificar el hash para almacenarlo como cadena
        password=hashed_password.decode('utf-8'),
        address=data['address'],
        phone=data['phone'],
        location=data['location'],
    )

    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created succefully'}), 201


@api.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']

    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        token = create_access_token(identity=user.id)
        return jsonify({'message': 'Successful login', 'token': token, 'user': user.serialize()}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401


@api.route('/validate-token', methods=['POST'])
@jwt_required()
def validate_token():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    response = {
        'user': user.serialize(),
        'favorites': [p.serialize() for p in user.favorites],
        'shopping_cart': [p.serialize() for p in user.shopping_cart]
    }
    return jsonify(response), 200
# End auth routes

# User routes


@api.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    serialized_users = [user.serialize() for user in users]
    return jsonify(serialized_users), 200


@api.route('/user/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    return jsonify(user.serialize()), 200


@api.route('/user/', methods=['PUT'])
@jwt_required()
def update_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    data = request.json
    hashed_password = bcrypt.hashpw(
        data['password'].encode('utf-8'), bcrypt.gensalt())
    user.first_name = data.get('first_name', user.first_name)
    user.last_name = data.get('last_name', user.last_name)
    user.password = hashed_password.decode('utf-8')
    user.email = data.get('email', user.email)
    user.phone = data.get('phone', user.phone)
    user.address = data.get('address', user.address)
    user.location = data.get('location', user.location)
    user.is_admin = data.get('is_admin', user.is_admin)

    db.session.commit()
    return jsonify({'message': 'User midified', "user": user.serialize()}), 200


@api.route('/user/', methods=['DELETE'])
@jwt_required()
def delete_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    if user.is_admin == True:
        return jsonify({'message': "El admin no puede ser eliminado"})
    if len(user.shopping_cart) > 0:
        for product in user.shopping_cart:
            db.session.delete(product)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted'}), 200


@api.route('/users/favorites', methods=['GET'])
@jwt_required()
def get_favorite():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return [p.serialize() for p in user.favorites], 200


@api.route('/users/favorites/<int:product_id>', methods=['POST'])
@jwt_required()
def add_favorite(product_id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    product = Product.query.get(product_id)
    if product is None:
        raise APIException(message='Product not found', status_code=404)
    user.favorites.append(product)
    db.session.commit()
    return [p.serialize() for p in user.favorites], 200


@api.route('/users/favorites/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_favorite(product_id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    product = Product.query.get(product_id)
    if product is None:
        raise APIException(message='Product not found', status_code=404)
    user.favorites.remove(product)
    db.session.commit()
    return [p.serialize() for p in user.favorites], 200
# End user routes

# Product routes


@api.route('/products', methods=['GET'])
def all_products():
    products = Product.query.all()
    return jsonify([p.serialize() for p in products]), 200


@api.route('/products/<int:product_id>', methods=['GET'])
def get_product_by_id(product_id):
    product = Product.query.get(product_id)
    if product is None:
        raise APIException(message='Product not found', status_code=404)
    return jsonify(product.serialize()), 200


@api.route('/products', methods=['POST'])
@jwt_required()
def create_product():
    request_body = request.get_json()
    current_user_id = get_jwt_identity()
    check_is_admin_by_user_id(current_user_id)
    product = save_new_product(request_body)
    return jsonify(product.serialize()), 200


@api.route('/products/<int:product_id>/images', methods=['GET'])
def get_product_images(product_id):
    product = Product.query.get(product_id)
    if product is None:
        raise APIException(message='Product not found', status_code=404)
    return jsonify(product.serialize_sorted_images()), 200


@api.route('/products/<int:product_id>/images/<int:image_id>', methods=['GET'])
def get_product_image_by_id(product_id, image_id):
    product = Product.query.get(product_id)
    if product is None:
        raise APIException(message='Product not found', status_code=404)
    product_image = ProductImage.query.get(image_id)
    if product_image is None:
        raise APIException(message='Product image not found', status_code=404)
    if product_image.product_id != product_id:
        raise APIException(message='Product image not found', status_code=404)

    return jsonify(product_image.serialize()), 200


@api.route('/products/<int:product_id>/images', methods=['POST'])
@jwt_required()
def upload_product_image(product_id):
    request_body = request.get_json()
    current_user_id = get_jwt_identity()
    check_is_admin_by_user_id(current_user_id)
    product = Product.query.get(product_id)
    if product is None:
        raise APIException(message='Product not found', status_code=404)
    if 'image_url' not in request_body:
        raise APIException(message='Image URL is required', status_code=422)
    if 'order' not in request_body:
        raise APIException(message='Order is required', status_code=422)
    product_image = ProductImage(
        image_url=request_body['image_url'], order=request_body['order'], product=product)
    db.session.add(product_image)
    db.session.commit()
    return jsonify(product_image.serialize()), 200


@api.route('/products/<int:product_id>/images/<int:product_image_id>', methods=['PUT'])
@jwt_required()
def update_product_image(product_id, product_image_id):
    request_body = request.get_json()
    current_user_id = get_jwt_identity()
    check_is_admin_by_user_id(current_user_id)
    product = Product.query.get(product_id)
    if product is None:
        raise APIException(message='Product not found', status_code=404)
    product_image = ProductImage.query.get(product_image_id)
    if product_image is None:
        raise APIException(message='Product image not found', status_code=404)
    if product_image.product_id != product_id:
        raise APIException(message='Product image not found', status_code=404)
    if 'image_url' in request_body:
        product_image.image_url = request_body['image_url']
    if 'order' in request_body:
        product_image.order = request_body['order']
    db.session.commit()
    return jsonify(product_image.serialize()), 200


@api.route('/products/<int:product_id>/images/<int:product_image_id>', methods=['DELETE'])
@jwt_required()
def delete_product_image(product_id, product_image_id):
    current_user_id = get_jwt_identity()
    check_is_admin_by_user_id(current_user_id)
    product = Product.query.get(product_id)
    if product is None:
        raise APIException(message='Product not found', status_code=404)
    product_image = ProductImage.query.get(product_image_id)
    if product_image is None:
        raise APIException(message='Product image not found', status_code=404)
    if product_image.product_id != product_id:
        raise APIException(message='Product image not found', status_code=404)
    db.session.delete(product_image)
    db.session.commit()
    return Response(status=204)


@api.route('/products/clothes', methods=['GET'])
def get_clothing_products():
    products = Product.query.filter_by(category_id=1, deleted=False)
    return jsonify([p.serialize() for p in products]), 200


@api.route('/products/accessories', methods=['GET'])
def get_accessories_accesories():
    products = Product.query.filter_by(category_id=2, deleted=False)
    return jsonify([p.serialize() for p in products]), 200


@api.route('/products/shoes', methods=['GET'])
def get_accessories_shoes():
    products = Product.query.filter_by(category_id=3, deleted=False)
    return jsonify([p.serialize() for p in products]), 200


@api.route('/products/<int:product_id>', methods=['PUT'])
@jwt_required()
def update_product(product_id):
    request_body = request.get_json()
    current_user_id = get_jwt_identity()
    check_is_admin_by_user_id(current_user_id)
    updated_product = update_product_by_id(product_id, request_body)
    return jsonify(updated_product.serialize()), 200


@api.route('/products/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_product(product_id):
    current_user_id = get_jwt_identity()
    check_is_admin_by_user_id(current_user_id)
    product = Product.query.get(product_id)
    if product is None:
        raise APIException(message='Product not found', status_code=404)
    product.deleted = True
    db.session.commit()

    return jsonify({'message': 'Product deleted successfully'}), 200


@api.route('/products/<int:product_id>/rating', methods=['GET'])
def get_product_rating(product_id):
    product = Product.query.get(product_id)
    if product is None:
        raise APIException(message='Product not found', status_code=404)
    return jsonify(product.serialize_rating()), 200


@api.route('/products/<int:product_id>/rating', methods=['POST'])
@jwt_required()
def create_product_rating(product_id):
    request_body = request.get_json()
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    product = Product.query.get(product_id)
    if product is None:
        raise APIException(message='Product not found', status_code=404)

    if request_body.get('rating') is None:
        raise APIException(message='Rating is required', status_code=422)

    # check if rating already exists
    for rating in product.users_ratings:
        if rating.user_id == current_user_id:
            raise APIException(
                message='You already rated this product', status_code=400)

    # chekcs is the user have a completed order with the product
    for order in user.orders:
        if order.status != 'completed':
            continue
        for order_item in order.products:
            if order_item.product.id == product_id:
                rating = ProductsRating(
                    user=user, product=product, rating=request_body['rating'])
                db.session.add(rating)
                db.session.commit()
                return jsonify(rating.serialize()), 200

    raise APIException(
        message='You need to buy the product to rate it', status_code=400)


@api.route('/products/<int:product_id>/rating', methods=['PUT'])
@jwt_required()
def update_product_rating(product_id):
    request_body = request.get_json()
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    product = Product.query.get(product_id)
    if product is None:
        raise APIException(message='Product not found', status_code=404)
    if request_body.get('rating') is None:
        raise APIException(message='Rating is required', status_code=422)

    rating = ProductsRating.query.filter_by(user=user, product=product).first()
    if rating is None:
        raise APIException(
            message='You need to rate the product first', status_code=400)

    rating.rating = request_body['rating']
    db.session.commit()
    return jsonify(rating.serialize()), 200


@api.route('/products/<int:product_id>/rating', methods=['DELETE'])
@jwt_required()
def delete_product_rating(product_id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    product = Product.query.get(product_id)
    if product is None:
        raise APIException(message='Product not found', status_code=404)

    rating = ProductsRating.query.filter_by(user=user, product=product).first()
    if rating is None:
        raise APIException(
            message='You need to rate the product first', status_code=400)

    db.session.delete(rating)
    db.session.commit()
    return Response(status=204)
# End product roues

# Category routes


@api.route('/categories', methods=['GET'])
def all_categories():
    categories = Category.query.all()
    return jsonify([c.serialize() for c in categories]), 200


@api.route('/categories/<int:category_id>', methods=['GET'])
def get_category_by_id(category_id):
    category = Category.query.get(category_id)
    if category is None:
        raise APIException(message='Category not found', status_code=404)
    return jsonify(category.serialize()), 200


@api.route('/categories', methods=['POST'])
@jwt_required()
def create_category():
    request_body = request.get_json()
    current_user_id = get_jwt_identity()
    check_is_admin_by_user_id(current_user_id)
    if 'name' not in request_body:
        raise APIException(message='Name is required', status_code=422)
    if 'id' not in request_body:
        raise APIException(message='ID is required', status_code=422)

    # Checks is the category exists by the name or id
    category = Category.query.filter_by(name=request_body['name']).first()
    if category is not None:
        raise APIException(message='Category already exists', status_code=409)
    category = Category.query.filter_by(id=request_body['id']).first()
    if category is not None:
        raise APIException(
            message='Category ID already exists', status_code=409)

    category = Category(id=request_body['id'], name=request_body['name'])
    db.session.add(category)
    db.session.commit()

    return jsonify(category.serialize()), 200


@api.route('/categories/<int:category_id>', methods=['PUT'])
@jwt_required()
def update_category(category_id):
    request_body = request.get_json()
    current_user_id = get_jwt_identity()
    check_is_admin_by_user_id(current_user_id)
    updated_character = update_category_by_id(category_id, request_body)
    return jsonify(updated_character.serialize()), 200


@api.route('/categories/<int:category_id>', methods=['DELETE'])
@jwt_required()
def delete_category(category_id):
    current_user_id = get_jwt_identity()
    check_is_admin_by_user_id(current_user_id)
    category = Category.query.get(category_id)
    if category is None:
        raise APIException(message='Category not found', status_code=404)
    db.session.delete(category)
    db.session.commit()
    return Response(status=204)
# End category routes

# Size routes


@api.route('/sizes', methods=['GET'])
def all_sizes():
    clothes_sizes = Size.query.filter_by(category_id=1).all()
    accessories_sizes = Size.query.filter_by(category_id=2).all()
    shoes_sizes = Size.query.filter_by(category_id=3).all()

    return jsonify({
        'clothes': [s.serialize() for s in clothes_sizes],
        'accessories': [s.serialize() for s in accessories_sizes],
        'shoes': [s.serialize() for s in shoes_sizes]
    }), 200


@api.route('/sizes/<int:size_id>', methods=['GET'])
def get_size_by_id(size_id):
    size = Size.query.get(size_id)
    if size is None:
        raise APIException(message='Size not found', status_code=404)
    return jsonify(size.serialize()), 200


@api.route('/sizes/clothes', methods=['GET'])
def get_clothes_sizes():
    sizes = Size.query.filter_by(category_id=1).all()
    return jsonify([s.serialize() for s in sizes]), 200


@api.route('/sizes/accessories', methods=['GET'])
def get_accessories_sizes():
    sizes = Size.query.filter_by(category_id=2).all()
    return jsonify([s.serialize() for s in sizes]), 200


@api.route('/sizes/shoes', methods=['GET'])
def get_shoes_sizes():
    sizes = Size.query.filter_by(category_id=3).all()
    return jsonify([s.serialize() for s in sizes]), 200


@api.route('/sizes', methods=['POST'])
@jwt_required()
def create_size():
    request_body = request.get_json()
    current_user_id = get_jwt_identity()
    check_is_admin_by_user_id(current_user_id)
    if 'name' not in request_body:
        raise APIException(message='Name is required', status_code=422)
    if 'category_id' not in request_body:
        raise APIException(message='Category ID is required', status_code=422)

    # Checks is the size exists by the name
    size = Size.query.filter_by(name=request_body['name']).first()
    if size is not None:
        raise APIException(message='Size name already exists', status_code=409)

    category = Category.query.get(request_body['category_id'])
    size = Size(name=request_body['name'].upper(), category=category)
    db.session.add(size)
    db.session.commit()

    return jsonify(size.serialize()), 200


@api.route('/sizes/<int:size_id>', methods=['PUT'])
@jwt_required()
def update_size(size_id):
    request_body = request.get_json()
    current_user_id = get_jwt_identity()
    check_is_admin_by_user_id(current_user_id)
    size = Size.query.get(size_id)
    if size is None:
        raise APIException(message='Size not found', status_code=404)

    if 'name' in request_body:
        size.name = request_body['name'].upper()
    db.session.commit()
    return jsonify(size.serialize()), 200


@api.route('/sizes/<int:size_id>', methods=['DELETE'])
@jwt_required()
def delete_size(size_id):
    current_user_id = get_jwt_identity()
    check_is_admin_by_user_id(current_user_id)
    size = Size.query.get(size_id)
    if size is None:
        raise APIException(message='Size not found', status_code=404)
    db.session.delete(size)
    db.session.commit()
    return Response(status=204)
# End size routes

# Cart routes


@api.route('/cart', methods=['GET'])
@jwt_required()
def get_cart():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify([p.serialize() for p in user.shopping_cart]), 200


@api.route('/cart', methods=['POST'])
@jwt_required()
def add_to_cart():
    current_user_id = get_jwt_identity()
    request_body = request.get_json()
    user = User.query.get(current_user_id)
    if 'product_id' not in request_body:
        raise APIException(
            message='Value product_id is missing', status_code=422)
    product = Product.query.get(request_body['product_id'])
    if product is None:
        raise APIException(message='Product not found', status_code=404)
    if 'size_id' not in request_body:
        raise APIException(message='Value size_id is missing', status_code=422)
    if 'quantity' not in request_body:
        raise APIException(
            message='Value quantity is missing', status_code=422)
    if request_body['quantity'] < 1:
        raise APIException(
            message='Quantity must be greater than 0', status_code=422)

    size = Size.query.get(request_body['size_id'])
    if size is None:
        raise APIException(message='Size not found', status_code=404)
    product_size_stock = ProductSizeStock.query.filter_by(
        product=product, size=size).first()
    if product_size_stock.stock < request_body['quantity']:
        raise APIException(message='Not enough stock', status_code=409, payload={
                           'stock': product_size_stock.stock})

   # Checks if the product is already in the cart
    product_in_cart = ShoppingCart.query.filter_by(
        product=product, size=size, user=user).first()
    if product_in_cart is not None:
        product_in_cart.quantity = request_body['quantity']
        db.session.commit()
        return jsonify([p.serialize() for p in user.shopping_cart]), 200
    else:
        new_item_cart = ShoppingCart(
            quantity=request_body['quantity'], product=product, size=size, user=user)
        db.session.add(new_item_cart)
        db.session.commit()
        return jsonify([p.serialize() for p in user.shopping_cart]), 200


@api.route('/cart/<int:product_id>/size/<int:size_id>', methods=['DELETE'])
@jwt_required()
def delete_from_cart(product_id, size_id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    product = Product.query.get(product_id)
    if product is None:
        raise APIException(message='Product not found', status_code=404)
    size = Size.query.get(size_id)
    if size is None:
        raise APIException(message='Size not found', status_code=404)
    product_in_cart = ShoppingCart.query.filter_by(
        product=product, size=size, user=user).first()
    if product_in_cart is None:
        raise APIException(
            message='Product not found in cart', status_code=404)
    db.session.delete(product_in_cart)
    db.session.commit()
    return jsonify([p.serialize() for p in user.shopping_cart]), 200
# End cart routes


@api.route('/clothes/types', methods=['GET'])
def all_clothing_types():
    types = db.session.query(Product.type).filter_by(
        category_id=1).distinct().all()
    types_as_string = [type[0] for type in types]
    return jsonify(types_as_string), 200


@api.route('/accessories/types', methods=['GET'])
def all_accessories_types():
    types = db.session.query(Product.type).filter_by(
        category_id=2).distinct().all()
    types_as_string = [type[0] for type in types]
    return jsonify(types_as_string), 200


@api.route('/shoes/types', methods=['GET'])
def all_shoes_types():
    types = db.session.query(Product.type).filter_by(
        category_id=3).distinct().all()
    types_as_string = [type[0] for type in types]
    return jsonify(types_as_string), 200

# Paypal routes


@api.route('/create-paypal-order', methods=['POST'])
@jwt_required()
def create_paypal_order():
    request_body = request.get_json()
    cart = request_body.get('cart')

    if cart is None:
        raise APIException(message='Cart is empty', status_code=422)
    if len(cart) == 0:
        raise APIException(message='Cart is empty', status_code=422)

    amount = 0

    # Checks the stock of the products in the cart
    for cartItem in cart:
        product = Product.query.get(cartItem['product']['id'])
        if product is None:
            raise APIException(message='Product not found', status_code=404)
        size = Size.query.get(cartItem['size']['id'])
        if size is None:
            raise APIException(message='Size not found', status_code=404)

        product_size_stock = ProductSizeStock.query.filter_by(
            product=product, size=size).first()
        if product_size_stock is None:
            raise APIException(
                message='Product does not have stock for this size', status_code=400)
        if product_size_stock.stock < cartItem['quantity']:
            raise APIException(message='Not enough stock', status_code=409, payload={
                               'stock': product_size_stock.stock})
        amount += product.price * cartItem['quantity']

    access_token = generate_paypal_access_token()
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {access_token}"
    }
    body = {
        "intent": "CAPTURE",
        "purchase_units": [
            {
                "amount": {
                    "currency_code": "USD",
                    "value": amount
                }
            }
        ]
    }

    order_response = requests.post(
        'https://api-m.sandbox.paypal.com/v2/checkout/orders',
        headers=headers,
        json=body
    )

    return handle_paypal_response(order_response)


@api.route('/capture-paypal-order', methods=['POST'])
@jwt_required()
def capture_paypal_order():
    request_body = request.get_json()
    current_user_id = get_jwt_identity()
    paypal_order_id = request_body.get('orderID')
    cart = request_body.get('cart')
    billing_info = request_body.get('billingInfo')
    fromCart = request_body.get('fromCart')
    user = User.query.get(current_user_id)

    paypal_access_token = generate_paypal_access_token()
    paypal_response = requests.post(
        f'https://api-m.sandbox.paypal.com/v2/checkout/orders/{paypal_order_id}/capture',
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {paypal_access_token}"
        }
    )

    if paypal_response.ok:
        # Creates the order
        new_order = Order(
            user=user,
            paypal_order_id=paypal_order_id,
            status='in progress',
            order_date=datetime.datetime.now(),
            full_name=billing_info['fullName'],
            email=billing_info['email'],
            address=billing_info['address'],
            phone_number=billing_info['phoneNumber'],
        )
        db.session.add(new_order)
        # Creates the order items
        for cartItem in cart:
            product = Product.query.get(cartItem['product']['id'])
            size = Size.query.get(cartItem['size']['id'])
            # Reduce the sotck of each product
            product_size_stock = ProductSizeStock.query.filter_by(
                product=product, size=size).first()
            product_size_stock.stock -= cartItem['quantity']
            new_order_item = OrderItem(
                order=new_order,
                product=product,
                size=size,
                quantity=cartItem['quantity'],
            )
            print('ADDED ORDER ITEM', new_order_item.product_id)

            db.session.add(new_order_item)
            if fromCart:
                for cart_item in user.shopping_cart:
                    db.session.delete(cart_item)
            db.session.commit()

    else:
        error_message = paypal_response.text
        raise APIException(message=error_message,
                           status_code=paypal_response.status_code)

    response = {
        'order': new_order.serialize(),
        'message': 'Order created successfully',
    }
    return response, 200

 # End paypal routes

#  Order routes


@api.route('/user/orders', methods=['GET'])
@jwt_required()
def get_orders():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    return jsonify([o.serialize() for o in user.orders]), 200

#  Admin orders


@api.route('/orders', methods=['GET'])
@jwt_required()
def get_all_orders():
    current_user_id = get_jwt_identity()
    check_is_admin_by_user_id(current_user_id)
    return jsonify([o.serialize() for o in Order.query.all()]), 200


@api.route('/orders/<int:order_id>', methods=['GET'])
@jwt_required()
def get_order_by_id(order_id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    order = Order.query.get(order_id)
    if order is None:
        raise APIException(message='Order not found', status_code=404)
    if user.is_admin:
        return jsonify(order.serialize()), 200

    if order.user_id != current_user_id:
        raise APIException(message='Order not found', status_code=404)

    return jsonify(order.serialize()), 200


@api.route('/orders/<int:order_id>/cancel', methods=['PUT'])
@jwt_required()
def cancel_order(order_id):
    current_user_id = get_jwt_identity()
    order = Order.query.get(order_id)
    if order is None:
        raise APIException(message='Order not found', status_code=404)
    if order.user_id != current_user_id:
        raise APIException(message='Order not found', status_code=404)
    if order.status != 'in progress':
        raise APIException(message='Order cannot be canceled', status_code=400)
    order.status = 'canceled'
    db.session.commit()
    return jsonify(order.serialize()), 200


@api.route('/orders/<int:order_id>/status', methods=['PUT'])
@jwt_required()
def update_order_status(order_id):
    current_user_id = get_jwt_identity()
    check_is_admin_by_user_id(current_user_id)
    request_body = request.get_json()
    order = Order.query.get(order_id)
    if order is None:
        raise APIException(message='Order not found', status_code=404)
    if 'status' not in request_body:
        raise APIException(message='Status is required', status_code=422)
    if request_body['status'] not in ['in progress', 'shipping', 'completed', 'canceled']:
        raise APIException(message='Invalid status', status_code=422)
    order.status = request_body['status']
    db.session.commit()
    return jsonify(order.serialize()), 200


@api.route('/orders/in-progress', methods=['GET'])
@jwt_required()
def get_in_progress_orders():
    current_user_id = get_jwt_identity()
    check_is_admin_by_user_id(current_user_id)
    return jsonify([o.serialize() for o in Order.query.filter_by(status='in progress')]), 200


@api.route('/orders/shipping', methods=['GET'])
@jwt_required()
def get_on_the_way_orders():
    current_user_id = get_jwt_identity()
    check_is_admin_by_user_id(current_user_id)
    return jsonify([o.serialize() for o in Order.query.filter_by(status='shipping')]), 200


@api.route('/orders/completed', methods=['GET'])
@jwt_required()
def get_completed_orders():
    current_user_id = get_jwt_identity()
    check_is_admin_by_user_id(current_user_id)
    return jsonify([o.serialize() for o in Order.query.filter_by(status='completed')]), 200


@api.route('/orders/canceled', methods=['GET'])
@jwt_required()
def get_canceled_orders():
    current_user_id = get_jwt_identity()
    check_is_admin_by_user_id(current_user_id)
    return jsonify([o.serialize() for o in Order.query.filter_by(status='canceled')]), 200

# End order routes

# ImageApp Routes


@api.route('/app/images', methods=['POST'])
def create_image():
    request_body = request.get_json()
    if 'url' not in request_body:
        raise APIException(message='Image URL is required', status_code=422)
    if 'location' not in request_body:
        raise APIException(message='Location is required', status_code=422)

    image = AppImage.query.filter_by(location=request_body['location']).first()
    if image is None:
        image = AppImage(
            url=request_body['url'], location=request_body['location'])

    image.url = request_body['url']
    db.session.commit()
    return jsonify(image.serialize()), 200


@api.route('/app/images', methods=['GET'])
def get_all_images():
    logo = AppImage.query.filter_by(location='logo').first()
    clothes = AppImage.query.filter_by(location='clothes').first()
    accessories = AppImage.query.filter_by(location='accessories').first()
    shoes = AppImage.query.filter_by(location='shoes').first()
    favicon = AppImage.query.filter_by(location='favicon').first()

    return jsonify({
        'logo': logo.url,
        'clothes': clothes.url,
        'accessories': accessories.url,
        'shoes': shoes.url,
        'favicon': favicon.url,
    }), 200

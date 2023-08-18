from flask import jsonify, url_for
from sqlalchemy import exc
from src.api.models import db, Category, Product, User, Size, ProductSizeStock, AppImage
import re
import os
import requests
import base64
import bcrypt


class APIException(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv

def has_no_empty_params(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)

def generate_sitemap(app):
    links = ['/admin/']
    for rule in app.url_map.iter_rules():
        # Filter out rules we can't navigate to in a browser
        # and rules that require parameters
        if "GET" in rule.methods and has_no_empty_params(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            if "/admin/" not in url:
                links.append(url)

    links_html = "".join(["<li><a href='" + y + "'>" + y + "</a></li>" for y in links])
    return """
        <div style="text-align: center;">
        <img style="max-height: 80px" src='https://storage.googleapis.com/breathecode/boilerplates/rigo-baby.jpeg' />
        <h1>Rigo welcomes you to your API!!</h1>
        <p>API HOST: <script>document.write('<input style="padding: 5px; width: 300px" type="text" value="'+window.location.href+'" />');</script></p>
        <p>Start working on your project by following the <a href="https://start.4geeksacademy.com/starters/full-stack" target="_blank">Quick Start</a></p>
        <p>Remember to specify a real endpoint path like: </p>
        <ul style="text-align: left;">"""+links_html+"</ul></div>"

def db_load_categories(app, db):
    clothing = Category(id=1, name='clothing')
    accesories = Category(id=2, name='accessories')
    shoes = Category(id=3, name='shoes')
    
    try:
        with app.app_context():
            db.session.add(clothing)
            db.session.add(accesories)
            db.session.add(shoes)
            db.session.commit()
            print('Created categories')
    except:
        print('All categories already exists')

def load_firts_admin_user(app, db):
    try:
        with app.app_context():
            if User.query.count() > 0:
                print('Admin user already exists')
                return
            hashed_password = bcrypt.hashpw('admin'.encode('utf-8'), bcrypt.gensalt())
            user = User(
                first_name='Admin',
                last_name='Admin',
                email='admin@admin.com',
                password=hashed_password.decode('utf-8'),
                address='Admin address',
                phone='123456789',
                location='Admin location',
                is_admin=True
            )
            db.session.add(user)
            db.session.commit()
            print('Created admin user')
    except:
        print('Error')

def load_default_images(app, db):
    try:
        with app.app_context():
            logo = AppImage(
                url='https://res.cloudinary.com/dspkak5d0/image/upload/v1692261881/default-images/cuq17vakmy0rvdegei32.png',
                location='logo'
            )
            clothes_image = AppImage(
                url='https://res.cloudinary.com/dspkak5d0/image/upload/v1692261983/default-images/trclsys6mat4h9mqbge3.avif',
                location='clothes'
            )
            accessories_image = AppImage(
                url='https://res.cloudinary.com/dspkak5d0/image/upload/v1692262030/default-images/ijzjkiitnjzu0fc6w5rm.avif',
                location='accessories'
            )
            shoes_image = AppImage(
                url='https://res.cloudinary.com/dspkak5d0/image/upload/v1692262011/default-images/rzgkhfc582gq5kxvo4jz.avif',
                location='shoes'
            )
            favicon = AppImage(
                url='https://res.cloudinary.com/dspkak5d0/image/upload/v1692261941/default-images/gy0sgfgt8s7sxpa5dk1l.png',
                location='favicon'
            )

            db.session.add(logo)
            db.session.add(clothes_image)
            db.session.add(accessories_image)
            db.session.add(shoes_image)
            db.session.add(favicon)
            db.session.commit()
            print('Created default images')
    except:
        print('Images already created')


def generate_error_message(error_text):
    key_text = re.search(r'(?<=Key \().*?(?=\))', error_text).group(0)
    text = re.search(r'\(.*\)\s+(.*)', error_text).group(1)
    return f'<{key_text}> {text}'

def save_new_product(request_body):
    required_values = ['name', 'price', 'category_id']
    missing_values = []
    for key in required_values:
        if key not in request_body:
            missing_values.append(key)
    
    if len(missing_values) > 0:
        raise APIException(
            message=f'Missing value for: {", ".join(missing_values)}', status_code=422, 
            payload={'missing_values': missing_values}
        )
    
    
    product = Product(name=request_body['name'], price=request_body['price'],
        description=request_body.get('description'), color=request_body.get('color'), category_id=request_body['category_id'],
        type=request_body.get('type')
    )
    db.session.add(product)
    if request_body.get('sizes_stock') is not None:
        for size in request_body['sizes_stock']:
            size_db = Size.query.get(size['id'])
            if size_db is None:
                raise APIException(message=f'Size with id {size["id"]} not found', status_code=422)
            size_quantity = ProductSizeStock(size=size_db, product=product, stock=size['stock'])
            db.session.add(size_quantity)
            
    db.session.commit()
    return product

def update_product_by_id(id, request_body):
    product = Product.query.get(id)
    if product is None:
        raise APIException(message='Product not found', status_code=404)

    
    for key in product.__dict__.keys():
        if key in request_body:
            if key == 'price':
                continue
            setattr(product, key, request_body[key])
            
    if request_body.get('sizes_stock') is not None:
        for size_from_body in request_body['sizes_stock']:
            size_db = Size.query.get(size_from_body['id'])
            if size_db is None:
                raise APIException(message=f'Size with id {size_from_body["id"]} not found', status_code=422)
            size_stock = ProductSizeStock.query.filter_by(size=size_db, product=product).first()
            if size_stock is None:
                new_size_stock = ProductSizeStock(size=size_db, product=product, stock=size_from_body['stock'])
                db.session.add(new_size_stock)
            else:
                size_stock.stock = size_from_body['stock']

    try:
        db.session.commit()
    except exc.IntegrityError as e:
        db.session.rollback()
        message = generate_error_message(str(e.orig))
        raise APIException(message=message, status_code=400)
    return product

# Lanza un APIException si el usuario no es admin
def check_is_admin_by_user_id(user_id):
    user = User.query.get(user_id)
    if not user.is_admin:
        raise APIException(message='Route only for admin users', status_code=401)
    
def update_category_by_id(id, request_body):
    category = Category.query.get(id)
    if category is None:
        raise APIException(message='Category not found', status_code=404)

    for key in category.__dict__.keys():
        if key in request_body:
            setattr(category, key, request_body[key])

    try:
        db.session.commit()
    except exc.IntegrityError as e:
        db.session.rollback()
        message = generate_error_message(str(e.orig))
        raise APIException(message=message, status_code=400)
    return category

def generate_paypal_access_token():
    client_id = os.environ.get('PAYPAL_CLIENT_ID')
    client_secret = os.environ.get('PAYPAL_CLIENT_SECRET')
    auth = f"{client_id}:{client_secret}"
    encoded_auth = base64.b64encode(auth.encode('utf-8')).decode('utf-8')

    response = requests.post(
        'https://api-m.sandbox.paypal.com/v1/oauth2/token', 
        data="grant_type=client_credentials", 
        headers={"Authorization": f"Basic {encoded_auth}"}
    )
    response_json = response.json()
    return response_json['access_token']

def handle_paypal_response(response):
    if response.status_code == 200 or response.status_code == 201:
        return response.json(), response.status_code
    error_message = response.text
    raise APIException(message=error_message, status_code=response.status_code)
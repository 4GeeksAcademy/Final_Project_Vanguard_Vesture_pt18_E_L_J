# Vanguar Vesture e-commerce

Final project for the Full Stack Web Development Bootcamp at 4Geeks Academy.

## Table of contents

- [Description](#description)
- [Technologies](#technologies)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Installation](#installation)
- [Preview](#preview)
- [Screenshots](#screenshots)
- [Authors](#authors)
- [Acknowledgments](#acknowledgments)
- [What's next?](#whats-next)

## Description

Vanguard Vesture is a web e-commerce app developed to streamline the buying and selling activities of men's clothing. We built this app for the final project of the Full Stack Web Development Bootcamp at 4Geeks Academy. The team members are: [Luis Vela](https://github.com/luismvl), [Emmanuel Vargas](https://github.com/EmmanuelV22) and [Julio Vargas](https://github.com/JulioV10)

It features a PayPal payment system, search filters, a favorites list, and a web chat with immediate response for its customers. On the seller's side, it offers an article publishing system, editing capabilities, and app management,
including images and order processing. We aim to innovate using the latest technologies such as React, Python, Flask, and JavaScript for efficient development with room for future implementations to enhance the experience.

## Technologies

- React
- Python
- Flask
- SQLAlchemy
- JavaScript
- HTML
- CSS
- Bootstrap
- PostgreSQL
- PayPal API

## Features

- User registration and login
- User profile settings
- Product search and filter
- Product details
- Product favorites
- Product cart
- Product checkout
- Product reviews
- Seller product management
- Seller order management
- Seller chat
- PayPal payment system
- Responsive design
- Image management for products 
- Image management for app

## API Endpoints

API documentation available at [Vanguard Vesture API](https://github.com/4GeeksAcademy/Final_Project_Vanguard_Vesture_pt18_E_L_J/blob/develop/src/api/README.md)

## Installation and usage

1. Clone the repository from GitHub:
```bash
git clone https://github.com/4GeeksAcademy/Final_Project_Vanguard_Vesture_pt18_E_L_J
```

2. Install python packages:
```bash
pipenv install
```

3. Create a `.env` file based on the `.env.example` with proper settings for your development environment.
4. Install your database engine and create your database, depending on your database you have to create a **DATABASE_URL** variable with one of the possible values, make sure you replace the valudes with your database information:

  | Engine    | DATABASE_URL                                        |
  | --------- | --------------------------------------------------- |
  | SQLite    | sqlite:////test.db                                  |
  | MySQL     | mysql://username:password@localhost:port/example    |
  | Postgress | postgres://username:password@localhost:5432/example |


5. Migrate the migrations (skip if you have not made changes to the models on the ./src/api/models.py)
  
```bash
pipenv run migrate
```

6. Run the migrations:

```bash
pipenv run upgrade
```

7. Run the application:
  
```bash
pipenv run start
```

8. Install the frontend dependencies:

```bash
npm install
```

9. Run the frontend application:

```bash
npm run start
```

10. Change default admin user and password:
    1. Login with the default admin user and password:
        - User: admin@admin.com
        - Password: admin
    2. Go to settings and change the default admin user and password.

## Preview

Live demo available at [Vanguard Vesture](https://sample-service-name-b95y.onrender.com/)

You can use this sandbox account to test the payment system:

- Email: sb-xsmhg27066186@personal.example.com
- Password: IR3=ggA<

## Screenshots

### User Screenshots

![Home](https://res.cloudinary.com/dspkak5d0/image/upload/v1692662616/readme_images/iavqahkcm76zlfqnvmsu.png)

![UserOrders](https://res.cloudinary.com/dspkak5d0/image/upload/v1692667864/readme_images/d6t1bxbdrv3erc5rfl1f.jpg)

![OrderDetails](https://res.cloudinary.com/dspkak5d0/image/upload/v1692667925/readme_images/jycrda5cqvvhhdmj6bc7.jpg)

![ProductList](https://res.cloudinary.com/dspkak5d0/image/upload/v1692667803/readme_images/ldcxr3wzf8df3fqqe2rv.jpg)

![ProductDetails](https://res.cloudinary.com/dspkak5d0/image/upload/v1692668070/readme_images/yjsav0lx0de5p7lhbdzo.jpg)

![Checkout](https://res.cloudinary.com/dspkak5d0/image/upload/v1692668000/readme_images/gryqz78leb6bdvkq9mql.jpg)

![Cart](https://res.cloudinary.com/dspkak5d0/image/upload/v1692668206/readme_images/aaptai7epsl12xhi3aeu.jpg)

### Admin Screenshots

![CreateProduct](https://res.cloudinary.com/dspkak5d0/image/upload/v1692668039/readme_images/s9ghqeaw0bjd6nxwyuej.jpg)

![EditProduct](https://res.cloudinary.com/dspkak5d0/image/upload/v1692668237/readme_images/wvt7mbu5crrnx4ds6jsd.jpg)

![SellerOrders](https://res.cloudinary.com/dspkak5d0/image/upload/v1692668271/readme_images/jnjgcrvzz2v9nlapl0nh.jpg)

## Authors

- [Luis Vela](https://github.com/luismvl)
- [Emmanuel Vargas](https://github.com/EmmanuelV22)
- [Julio Vargas](https://github.com/JulioV10)

This project was based on the [4Geeks Academy's React JS and Flask API Boilerplate](https://github.com/4GeeksAcademy/react-flask-hello)

## Acknowledgments

We would like to express our gratitude to the following individuals and s, whose guidance and support were instrumental in the realization of this project:

- **[4Geeks Academy](https://4geeksacademy.com/)**: For providing the framework and content of the bootcamp that formed the foundation of this project. The structured learning and resources laid the groundwork for our achievements.
- **David Cunha and Astrid Mata**: Our professors and mentors, whose wealth of experience and expertise in the field served as an invaluable beacon throughout our project's journey. Their guidance, feedback, and unwavering support were vital in overcoming challenges and achieving success.
- **All team members**: A special thank you to every member of our team for their tireless dedication, collaboration, and commitment to the project. Your collective efforts made this endeavor a collaborative and fulfilling experience.

## What's next?

- Search products in the navbar with autocomplete and suggestions
- Suggestions based on user's search history, favorites, purchases, reviews and sells
- Suggestions based on AI
- Customizable themes for the app
- Enhanced Seller Dashboard:  Expand the features available to the seller by providing them with insights and analytics on their products' performance, customer demographics, and sales trends.
- Add a tracking system for orders
- Add a forget password system
- Add customizable categories for products to expand the app's scope to other markets
- Enhance filter system to include more options like size, color, brand, etc.
- Add pagination to the product list
- Add email notifications when a user makes a purchase
- Add email notifications when an order status is updated
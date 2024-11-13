**PureBeauty E-Commerce Platform**
==================================

**PureBeauty** is a modern e-commerce platform for beauty products, built with **Django** on the backend and **React** on the frontend. The project offers essential features such as product ratings, reviews, and the ability to add products to a cart. It integrates seamlessly with Django REST Framework (DRF) to provide an API for easy access to the data.

Features
--------

-   **Product Management**: List, filter, and manage beauty products.
-   **Ratings & Reviews**: Users can rate products and leave reviews.
-   **Shopping Cart**: Add products to your cart and proceed to checkout.
-   **Authentication**: Secure user authentication and management.
-   **API-Driven**: Built using Django REST Framework for a clean, flexible API.

* * * * *

**Backend (Django) Setup**
--------------------------

Clone the repository:

`git clone https://github.com/yourusername/purebeauty.git
cd purebeauty/backend`

Set up the virtual environment and install dependencies:

`python -m venv env
source env/bin/activate  # On Windows, use env\Scripts\activate
pip install -r requirements.txt`

Set up the `.env` file for environment variables. Make sure to include your database credentials and other configurations.

Apply migrations and run the development server:

`python manage.py migrate
python manage.py runserver`

* * * * *

**Frontend (React) Setup**
--------------------------

Navigate to the frontend directory:

`cd ../frontend`

Install the required dependencies:

`npm install`

Start the React development server:

`npm start`

* * * * *

**Backend Requirements**
------------------------

Make sure to have the following dependencies installed in your backend environment. You can use the `requirements.txt` 



* * * * *

**API Documentation**
---------------------

### **Authentication**

-   **POST** `/api/users/login/`

    -   Request: `{ "username": "user", "password": "password" }`
    -   Response: `{ "access": "JWT_TOKEN", "refresh": "JWT_REFRESH_TOKEN" }`
-   **POST** `/api/users/register/`

    -   Request: `{ "username": "newuser", "email": "user@example.com", "password": "password" }`
    -   Response: `{ "id": 1, "username": "newuser", "email": "user@example.com" }`
-   **POST** `/api/users/profile/`

    -   Fetch the authenticated user's profile.
    -   Response: `{ "id": 1, "username": "user", "email": "user@example.com" }`
-   **PUT** `/api/users/profile/update/`

    -   Update the user's profile.
    -   Request: `{ "username": "updateduser", "email": "updated@example.com" }`
    -   Response: `{ "id": 1, "username": "updateduser", "email": "updated@example.com" }`

### **Product Endpoints**

-   **GET** `/api/products/`

    -   Fetch all products.
    -   Response: `[ { "id": 1, "name": "Product 1", "description": "Description", "price": 10.0, "rating": 4.5 }, ... ]`
-   **GET** `/api/products/categories/`

    -   Fetch product categories.
    -   Response: `[ { "id": 1, "name": "Category 1" }, ... ]`
-   **GET** `/api/products/featured-items/`

    -   Fetch featured products.
    -   Response: `[ { "id": 1, "name": "Featured Product", "description": "Description", "price": 15.0, "rating": 5.0 }, ... ]`
-   **GET** `/api/products/{id}/`

    -   Fetch a single product by its ID.
    -   Response: `{ "id": 1, "name": "Product 1", "description": "Description", "price": 10.0, "rating": 4.5 }`
-   **POST** `/api/products/{id}/reviews/`

    -   Add a review for a product.
    -   Request: `{ "rating": 5, "comment": "Amazing product!" }`
    -   Response: `{ "id": 2, "user": "user2", "rating": 5, "comment": "Amazing product!" }`

### **Order Endpoints**

-   **GET** `/api/orders/`

    -   Fetch all orders.
    -   Response: `[ { "id": 1, "user": "user1", "status": "Pending", "total": 50.0 }, ... ]`
-   **POST** `/api/orders/add/`

    -   Add an order item.
    -   Request: `{ "product_id": 1, "quantity": 2 }`
    -   Response: `{ "id": 2, "product": "Product 1", "quantity": 2, "total_price": 20.0 }`
-   **GET** `/api/orders/myorders/`

    -   Fetch the authenticated user's orders.
    -   Response: `[ { "id": 1, "user": "user1", "status": "Pending", "total": 50.0 }, ... ]`
-   **GET** `/api/orders/{id}/`

    -   Fetch a specific order by ID.
    -   Response: `{ "id": 1, "user": "user1", "status": "Pending", "total": 50.0 }`
-   **POST** `/api/orders/{id}/pay/`

    -   Mark the order as paid.
    -   Response: `{ "id": 1, "status": "Paid" }`
-   **POST** `/api/orders/{id}/deliver/`

    -   Mark the order as delivered.
    -   Response: `{ "id": 1, "status": "Delivered" }`

### **Website Endpoints**

-   **GET** `/api/website/headers/`

    -   Fetch website headers.
    -   Response: `[ { "id": 1, "name": "Header 1" }, ... ]`
-   **GET** `/api/website/about/`

    -   Fetch about us information.
    -   Response: `{ "id": 1, "content": "About Us content here" }`
-   **GET** `/api/website/social/`

    -   Fetch social media links.
    -   Response: `{ "id": 1, "platform": "Facebook", "link": "https://facebook.com" }`
-   **GET** `/api/website/contact/`

    -   Fetch contact information.
    -   Response: `{ "id": 1, "email": "contact@purebeauty.com", "phone": "1234567890" }`

* * * * *

**Contributing**
----------------

Feel free to contribute to this project by opening an issue or submitting a pull request. All contributions are welcome!

* * * * *

License
-------

This project is licensed under the MIT License.

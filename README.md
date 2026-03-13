# Lawa Food Delivery - Backend API

Node.js + Express + PostgreSQL backend for Lawa Food Delivery application.

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Setup Instructions

### 1. Database Setup

First, install PostgreSQL if you haven't already. Then:

```bash
# Log into PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE lawa_delivery;

# Exit psql
\q
```

### 2. Run Database Schema

```bash
# Navigate to backend folder
cd backend

# Run the schema to create tables
psql -U postgres -d lawa_delivery -f models/schema.sql
```

### 3. Environment Configuration

Update the `.env` file with your database credentials:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lawa_delivery
DB_USER=postgres
DB_PASSWORD=your_postgres_password_here

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Client URL (for CORS)
CLIENT_URL=http://localhost:5173
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Start the Server

For development (with auto-restart):
```bash
npm run dev
```

For production:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Products
- `GET /api/products` - Get all products (optional: ?category=vegetables)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Orders
- `POST /api/orders` - Create order (requires auth)
- `GET /api/orders/my-orders` - Get user's orders (requires auth)
- `GET /api/orders/all` - Get all orders (admin only)
- `GET /api/orders/:id` - Get order by ID (requires auth)
- `PATCH /api/orders/:id/status` - Update order status (admin only)

### Cart
- `GET /api/cart` - Get user's cart (requires auth)
- `POST /api/cart` - Add item to cart (requires auth)
- `PUT /api/cart` - Update cart item (requires auth)
- `DELETE /api/cart/:productId` - Remove item from cart (requires auth)
- `DELETE /api/cart` - Clear cart (requires auth)

### Profile
- `GET /api/profile` - Get user profile (requires auth)
- `PUT /api/profile` - Update profile (requires auth)
- `POST /api/profile/change-password` - Change password (requires auth)

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. After login/register, you'll receive an access token. Include it in subsequent requests:

```
Authorization: Bearer <your_token_here>
```

## Creating Admin User

To create an admin user, first register a user normally, then update their role in the database:

```sql
UPDATE users SET role = 'admin' WHERE email = 'admin@example.com';
```

Or you can directly insert an admin user:

```sql
-- First, hash the password using bcrypt (you'll need to do this in Node.js)
-- Then insert with the hashed password

INSERT INTO users (uid, full_name, email, password, phone, role) 
VALUES (
  'your-uuid-here',
  'Admin User',
  'admin@demo.com',
  '$2a$10$...',  -- hashed password
  '03001234567',
  'admin'
);
```

## Testing the API

You can test the API using:
- Postman
- curl
- Thunder Client (VS Code extension)

Example request:

```bash
# Register a user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","email":"test@example.com","password":"password123","phone":"03001234567"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## Database Schema

The database includes the following tables:
- `users` - User accounts and authentication
- `products` - Product catalog
- `orders` - Customer orders
- `order_items` - Individual items in orders
- `cart` - Shopping cart items

See `models/schema.sql` for complete schema details.

## Troubleshooting

### Database Connection Issues
- Make sure PostgreSQL is running: `sudo service postgresql status`
- Verify your database credentials in `.env`
- Check if the database exists: `psql -U postgres -l`

### Port Already in Use
If port 5000 is already in use, change the `PORT` in `.env`

### CORS Issues
Make sure `CLIENT_URL` in `.env` matches your frontend URL

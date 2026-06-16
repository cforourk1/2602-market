CREATE TABLE users (
  id serial PRIMARY KEY,
  username text UNIQUE NOT NULL,
  password text NOT NULL
)

CREATE TABLE orders (
  id serial PRIMARY KEY,
  orderDate date NOT NULL,
  note text,
  user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE
)

CREATE TABLE orders_products (
  order_id int NOT NULL,
  product_id int NOT NULL REFERENCES product(id) ON DELETE CASCADE,
  quantity int NOT NULL

  indexes (
    (order_id, product_id) PRIMARY KEY
  )
)

CREATE TABLE products (
  id serial PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  price decimal NOT NULL
)




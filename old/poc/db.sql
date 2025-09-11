create schema bacarotruck

-- USER

CREATE TABLE if not exists bacarotruck.roles 
(
    id  SERIAL PRIMARY KEY 
);
ALTER TABLE bacarotruck.roles ADD code varchar NOT NULL;

ALTER TABLE bacarotruck.roles ADD "name" varchar NULL;

CREATE TABLE if not exists bacarotruck.users 
(
    id  SERIAL PRIMARY KEY 
);
ALTER TABLE bacarotruck.users ADD role_id      serial NOT NULL;
ALTER TABLE bacarotruck.users ADD email        varchar NOT NULL;
ALTER TABLE bacarotruck.users ADD "password"   varchar NOT NULL;
ALTER TABLE bacarotruck.users ADD telephone    varchar NOT NULL;
ALTER TABLE bacarotruck.users ADD "name"       varchar NULL;
ALTER TABLE bacarotruck.users ADD "uuid" uuid NOT NULL DEFAULT gen_random_uuid();
ALTER TABLE bacarotruck.users ADD CONSTRAINT users_un UNIQUE (email);

-- LookUp
-- Week day
CREATE TABLE if not exists bacarotruck.days 
(
    id  SERIAL PRIMARY KEY 
);
ALTER TABLE bacarotruck.days ADD code varchar NOT NULL;
ALTER TABLE bacarotruck.days ADD "name" varchar NULL;
ALTER TABLE bacarotruck.days ADD COLUMN day_of_week smallint CHECK (day_of_week BETWEEN 0 AND 6) NULL;
ALTER TABLE bacarotruck.days ADD holiday date NULL;
ALTER TABLE bacarotruck.days ADD custom_day date NULL;
ALTER TABLE bacarotruck.days ADD CONSTRAINT code_days_un UNIQUE (code);
ALTER TABLE bacarotruck.days
ADD CONSTRAINT only_one_field_not_null
CHECK (
    (day_of_week IS NULL AND holiday IS NULL AND custom_day IS NULL) OR
    (day_of_week IS NOT NULL AND holiday IS NULL AND custom_day IS NULL) OR
    (day_of_week IS NULL AND holiday IS NOT NULL AND custom_day IS NULL) OR
    (day_of_week IS NULL AND holiday IS NULL AND custom_day IS NOT NULL)
);

-- Tag for dishes or other
CREATE TABLE if not exists bacarotruck.tags 
(
    id  SERIAL PRIMARY KEY 
);
ALTER TABLE bacarotruck.tags ADD code varchar NOT NULL;
ALTER TABLE bacarotruck.tags ADD "name" varchar NULL;
ALTER TABLE bacarotruck.tags ADD "type" varchar NULL;
ALTER TABLE bacarotruck.tags ADD CONSTRAINT code_tags_un UNIQUE (code);

-- Tag for dishes or other
CREATE TABLE if not exists bacarotruck.categories 
(
    id  SERIAL PRIMARY KEY 
);
ALTER TABLE bacarotruck.categories ADD code varchar NOT NULL;
ALTER TABLE bacarotruck.categories ADD "name" varchar NULL;
ALTER TABLE bacarotruck.categories ADD isenable boolean NOT NULL DEFAULT true;
ALTER TABLE bacarotruck.categories ADD "type" varchar(20) NULL;
ALTER TABLE bacarotruck.categories ADD CONSTRAINT code_category_un UNIQUE (code);

-- The place/items on menu - also drinks and sauces
CREATE TABLE if not exists bacarotruck.dishes
(
    id           SERIAL PRIMARY KEY
);
ALTER TABLE bacarotruck.dishes ADD code varchar NOT NULL;
ALTER TABLE bacarotruck.dishes ADD "name" varchar NULL;
ALTER TABLE bacarotruck.dishes ADD "description" varchar NULL;
ALTER TABLE bacarotruck.dishes ADD note varchar NULL;
ALTER TABLE bacarotruck.dishes ADD price decimal NOT NULL DEFAULT 0.0;
ALTER TABLE bacarotruck.dishes ADD CONSTRAINT code_dishes_un UNIQUE (code);

-- Added for order item's
CREATE TABLE if not exists bacarotruck.extras
(
    id           SERIAL PRIMARY KEY
);
ALTER TABLE bacarotruck.extras ADD code varchar NOT NULL;
ALTER TABLE bacarotruck.extras ADD "name" varchar NULL;
ALTER TABLE bacarotruck.extras ADD price decimal NOT NULL DEFAULT 0.0;
ALTER TABLE bacarotruck.extras ADD CONSTRAINT code_extras_un UNIQUE (code);

-- Discounts applicable to products in the cart
CREATE TABLE if not exists bacarotruck.discounts
(
    id           SERIAL PRIMARY KEY
);
ALTER TABLE bacarotruck.discounts ADD code varchar NOT NULL;
ALTER TABLE bacarotruck.discounts ADD "name" varchar NULL;
ALTER TABLE bacarotruck.discounts ADD value decimal DEFAULT 0.0;
ALTER TABLE bacarotruck.discounts ADD percentage decimal DEFAULT 0.0;
ALTER TABLE bacarotruck.discounts ADD CONSTRAINT code_discount_un UNIQUE (code);

-- Trucks available
CREATE TABLE if not exists bacarotruck.trucks
(
    id           SERIAL PRIMARY KEY
);
ALTER TABLE bacarotruck.trucks ADD code varchar NOT NULL;
ALTER TABLE bacarotruck.trucks ADD "name" varchar NULL;
ALTER TABLE bacarotruck.trucks ADD note varchar NULL;
ALTER TABLE bacarotruck.trucks ADD CONSTRAINT code_trucks_un UNIQUE (code);

-- Sites where the trucks are
CREATE TABLE if not exists bacarotruck.sites
(
    id           SERIAL PRIMARY KEY
);
ALTER TABLE bacarotruck.sites ADD code varchar NOT NULL;
ALTER TABLE bacarotruck.sites ADD "name" varchar NULL;
ALTER TABLE bacarotruck.sites ADD address varchar NULL;

-- State order: Accepted, Reject, Delay, ....
CREATE TABLE if not exists bacarotruck.state_orders 
(
    id  SERIAL PRIMARY KEY 
);
ALTER TABLE bacarotruck.state_orders ADD code varchar NOT NULL;
ALTER TABLE bacarotruck.state_orders ADD "name" varchar NULL;
ALTER TABLE bacarotruck.state_orders ADD CONSTRAINT code_states_un UNIQUE (code);

-- Group
--- Order / Comanda 
CREATE TABLE if not exists bacarotruck.orders 
(
    id  SERIAL PRIMARY KEY 
);
ALTER TABLE bacarotruck.orders ADD created_at timestamp NOT NULL;
ALTER TABLE bacarotruck.orders ADD modify_at timestamp NULL;
ALTER TABLE bacarotruck.orders ADD user_id      serial NOT NULL;
ALTER TABLE bacarotruck.orders ADD truck_id      serial NOT NULL;
ALTER TABLE bacarotruck.orders ADD state_order_id      serial NOT NULL;
ALTER TABLE bacarotruck.orders ADD ticket_code varchar NOT NULL;
ALTER TABLE bacarotruck.orders ADD CONSTRAINT orders_ticket_un UNIQUE (ticket_code);


--- Calendar and site of truck in the week
CREATE TABLE if not exists bacarotruck.truck_calendars
(
    id           SERIAL PRIMARY KEY
);
ALTER TABLE bacarotruck.truck_calendars ADD truck_id      serial NOT NULL;
ALTER TABLE bacarotruck.truck_calendars ADD day_id      serial NOT NULL;
ALTER TABLE bacarotruck.truck_calendars ADD site_id      serial NOT NULL;
ALTER TABLE bacarotruck.truck_calendars ADD start_at time NULL;
ALTER TABLE bacarotruck.truck_calendars ADD end_at time NULL;

--- Dishes can added to order
CREATE TABLE if not exists bacarotruck.orders_items
(
    id           SERIAL PRIMARY KEY
);
ALTER TABLE bacarotruck.orders_items ADD order_id      serial NOT NULL;
ALTER TABLE bacarotruck.orders_items ADD dish_id      serial NOT NULL;
ALTER TABLE bacarotruck.orders_items ADD note varchar NULL;


-- Multi to Multi

CREATE TABLE if not exists bacarotruck.dishes_categories
(
    id           SERIAL PRIMARY KEY
);
ALTER TABLE bacarotruck.dishes_categories ADD dish_id      serial NOT NULL;
ALTER TABLE bacarotruck.dishes_categories ADD category_id      serial NOT NULL;

CREATE TABLE if not exists bacarotruck.dishes_tags
(
    id           SERIAL PRIMARY KEY
);
ALTER TABLE bacarotruck.dishes_tags ADD dish_id      serial NOT NULL;
ALTER TABLE bacarotruck.dishes_tags ADD tag_id      serial NOT NULL;

CREATE TABLE if not exists bacarotruck.extras_order_items
(
    id           SERIAL PRIMARY KEY
);
ALTER TABLE bacarotruck.extras_order_items ADD order_item_id      serial NOT NULL;
ALTER TABLE bacarotruck.extras_order_items ADD extra_id      serial NOT NULL;

CREATE TABLE if not exists bacarotruck.discounts_order_items
(
    id           SERIAL PRIMARY KEY
);
ALTER TABLE bacarotruck.discounts_order_items ADD dish_item_id      serial NOT NULL;
ALTER TABLE bacarotruck.discounts_order_items ADD discount_id      serial NOT NULL;

CREATE TABLE if not exists bacarotruck.users_trucks
(
    id           SERIAL PRIMARY KEY
);
ALTER TABLE bacarotruck.users_trucks ADD truck_id      serial NOT NULL;
ALTER TABLE bacarotruck.users_trucks ADD user_id      serial NOT NULL;


-- users fk
ALTER TABLE bacarotruck.users ADD CONSTRAINT fk_role_users FOREIGN KEY (role_id) REFERENCES bacarotruck.roles(id);

-- orders fk
ALTER TABLE bacarotruck.orders ADD CONSTRAINT fk_user_orders FOREIGN KEY (user_id) REFERENCES bacarotruck.users(id);
ALTER TABLE bacarotruck.orders ADD CONSTRAINT fk_truck_orders FOREIGN KEY (truck_id) REFERENCES bacarotruck.trucks(id);
ALTER TABLE bacarotruck.orders ADD CONSTRAINT fk_state_order_orders FOREIGN KEY (state_order_id) REFERENCES bacarotruck.state_orders(id);

-- users truck_days fk
ALTER TABLE bacarotruck.truck_calendars ADD CONSTRAINT fk_truck_truck_calendar FOREIGN KEY (truck_id) REFERENCES bacarotruck.trucks(id);
ALTER TABLE bacarotruck.truck_calendars ADD CONSTRAINT fk_day_truck_calendar FOREIGN KEY (day_id) REFERENCES bacarotruck.days(id);
ALTER TABLE bacarotruck.truck_calendars ADD CONSTRAINT fk_site_truck_calendar FOREIGN KEY (site_id) REFERENCES bacarotruck.sites(id);

-- users orders_items fk
ALTER TABLE bacarotruck.orders_items ADD CONSTRAINT fk_order_order_items FOREIGN KEY (order_id) REFERENCES bacarotruck.orders(id);
ALTER TABLE bacarotruck.orders_items ADD CONSTRAINT fk_dish_order_items FOREIGN KEY (dish_id) REFERENCES bacarotruck.dishes(id);

-- users dishes_categories fk
ALTER TABLE bacarotruck.dishes_categories ADD CONSTRAINT fk_dish_dish_category FOREIGN KEY (dish_id) REFERENCES bacarotruck.dishes(id);
ALTER TABLE bacarotruck.dishes_categories ADD CONSTRAINT fk_category_dish_category FOREIGN KEY (category_id) REFERENCES bacarotruck.categories(id);

-- users dishes_tags fk
ALTER TABLE bacarotruck.dishes_tags ADD CONSTRAINT fk_dish_dish_tags FOREIGN KEY (dish_id) REFERENCES bacarotruck.dishes(id);
ALTER TABLE bacarotruck.dishes_tags ADD CONSTRAINT fk_tag_dish_tags FOREIGN KEY (tag_id) REFERENCES bacarotruck.tags(id);

-- users extras_order_items fk
ALTER TABLE bacarotruck.extras_order_items ADD CONSTRAINT fk_dish_item_extras_order_items FOREIGN KEY (order_item_id) REFERENCES bacarotruck.orders_items(id);
ALTER TABLE bacarotruck.extras_order_items ADD CONSTRAINT fk_extra_extras_order_items FOREIGN KEY (extra_id) REFERENCES bacarotruck.extras(id);

-- users discounts_order_items fk
ALTER TABLE bacarotruck.discounts_order_items ADD CONSTRAINT fk_order_items_discount_order_items FOREIGN KEY (dish_item_id) REFERENCES bacarotruck.orders_items(id);
ALTER TABLE bacarotruck.discounts_order_items ADD CONSTRAINT fk_discount_discount_order_items FOREIGN KEY (discount_id) REFERENCES bacarotruck.discounts(id);


-- users users_trucks fk
ALTER TABLE bacarotruck.users_trucks ADD CONSTRAINT fk_truck_users_truks FOREIGN KEY (truck_id) REFERENCES bacarotruck.trucks(id);
ALTER TABLE bacarotruck.users_trucks ADD CONSTRAINT fk_user_users_truks FOREIGN KEY (user_id) REFERENCES bacarotruck.users(id);



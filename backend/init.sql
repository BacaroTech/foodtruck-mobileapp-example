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
ALTER TABLE bacarotruck.categories ADD "order" int NULL;

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
alter table bacarotruck.trucks add phone varchar(13);

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
ALTER TABLE bacarotruck.orders ADD truck_id      serial;
ALTER TABLE bacarotruck.orders ADD state_order_id      serial NOT NULL;
ALTER TABLE bacarotruck.orders ADD ticket_code varchar NOT NULL;
ALTER TABLE bacarotruck.orders ADD CONSTRAINT orders_ticket_un UNIQUE (ticket_code);
ALTER TABLE bacarotruck.orders ADD pick_up_time_request timestamp NULL;
ALTER TABLE bacarotruck.orders ADD pick_up_time_accepted timestamp NULL;
ALTER TABLE bacarotruck.orders ADD total decimal NOT NULL DEFAULT 0.0;
ALTER TABLE bacarotruck.orders ADD site_id serial;
ALTER TABLE bacarotruck.orders ADD day_id serial;
ALTER TABLE bacarotruck.orders ADD CONSTRAINT fk_site_orders FOREIGN KEY (site_id) REFERENCES bacarotruck.sites(id);
ALTER TABLE bacarotruck.orders ADD CONSTRAINT fk_day_orders FOREIGN KEY (day_id) REFERENCES bacarotruck.days(id);

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
ALTER TABLE bacarotruck.orders_items ADD quantity int NOT NULL DEFAULT 1;

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


-- DATA

-- Insert Data
-- Roles
INSERT INTO bacarotruck.roles (code, "name") VALUES('CUSTOMER', 'customer');
INSERT INTO bacarotruck.roles (code, "name") VALUES('TRUCK', 'truck');
INSERT INTO bacarotruck.roles (code, "name") VALUES('ADMIN', 'admin');

-- Trucks
INSERT INTO bacarotruck.trucks (code, "name", "phone") VALUES('TRUCK_1', 'Taco Magico', '+393491186730');
INSERT INTO bacarotruck.trucks (code, "name", "phone") VALUES('TRUCK_2', 'Nacho Volante', '+393513997356');

-- Sites
INSERT INTO bacarotruck.sites (code, "name", address) VALUES('SITE_1', 'Camposampiero', '');
INSERT INTO bacarotruck.sites (code, "name", address) VALUES('SITE_2', 'San Vito di Altivole', '');
INSERT INTO bacarotruck.sites (code, "name", address) VALUES('SITE_3', 'Montebelluna', '');
INSERT INTO bacarotruck.sites (code, "name", address) VALUES('SITE_4', 'Valdobiadene', '');
INSERT INTO bacarotruck.sites (code, "name", address) VALUES('SITE_5', 'Volpago del Montello', '');
INSERT INTO bacarotruck.sites (code, "name", address) VALUES('SITE_6', 'Castelfranco', '');
INSERT INTO bacarotruck.sites (code, "name", address) VALUES('SITE_7', 'Feltre', '');

-- Extras
INSERT INTO bacarotruck.extras (code, "name", price) VALUES('KETCHUP', 'ketchup', 0.5);
INSERT INTO bacarotruck.extras (code, "name", price) VALUES('MAIONESE', 'maionese', 0.5);
INSERT INTO bacarotruck.extras (code, "name", price) VALUES('SENAPE', 'senape', 0.5);

-- Discount
INSERT INTO bacarotruck.discounts (code, "name", "value", "percentage") VALUES('FAMILY', 'family', 5, null);
INSERT INTO bacarotruck.discounts (code, "name", "value", "percentage") VALUES('DRINK3x2', 'family', null, 100);

-- State Order
INSERT INTO bacarotruck.state_orders (code,"name") VALUES
	 ('CART','Carrello'),
	 ('SEND','Inviato'),
	 ('ACCEPTED','Accettato'),
	 ('TRADE','Trattativa'),
	 ('REJECT','Respinto'),
	 ('PICKEDUP','Ritirato');


-- Days
INSERT INTO bacarotruck.days (code, "name", "day_of_week") VALUES('MON', 'monday', 1);
INSERT INTO bacarotruck.days (code, "name", "day_of_week") VALUES('TUE', 'tuesday', 2);
INSERT INTO bacarotruck.days (code, "name", "day_of_week") VALUES('WED', 'wednesday', 3);
INSERT INTO bacarotruck.days (code, "name", "day_of_week") VALUES('THU', 'thursday', 4);
INSERT INTO bacarotruck.days (code, "name", "day_of_week") VALUES('FRI', 'friday', 5);
INSERT INTO bacarotruck.days (code, "name", "day_of_week") VALUES('SAT', 'saturday', 6);
INSERT INTO bacarotruck.days (code, "name", "day_of_week") VALUES('SUN', 'sunday', 0);

-- Tags
INSERT INTO bacarotruck.tags (code, "name", "type") VALUES('NEWS', 'news', 'MENU');
INSERT INTO bacarotruck.tags (code, "name", "type") VALUES('SPECIAL', 'special', 'MENU');
INSERT INTO bacarotruck.tags (code, "name", "type") VALUES('SPICE', 'spice', 'MENU');
INSERT INTO bacarotruck.tags (code, "name", "type") VALUES('EXTRA_SPICE', 'spice', 'MENU');
INSERT INTO bacarotruck.tags (code, "name", "type") VALUES('VEGETARIAN', 'vegetarian', 'MENU');
INSERT INTO bacarotruck.tags (code, "name", "type") VALUES('VEGAN', 'vegan', 'MENU');
INSERT INTO bacarotruck.tags (code, "name", "type") VALUES('GLUTEN', 'glutine', 'MENU');
INSERT INTO bacarotruck.tags (code, "name", "type") VALUES('DAIRY', 'dairy', 'MENU'); /*Latticini*/
INSERT INTO bacarotruck.tags (code, "name", "type") VALUES('FRUITS_IN_SHELL', 'fruits in shell', 'MENU'); /*frutta a guscio*/
INSERT INTO bacarotruck.tags (code, "name", "type") VALUES('SESAME', 'sesame', 'MENU'); /*Sesamo*/
INSERT INTO bacarotruck.tags (code, "name", "type") VALUES('MUSTARD', 'mustard', 'MENU'); /*Senape*/
INSERT INTO bacarotruck.tags (code, "name", "type") VALUES('SOY', 'soy', 'MENU'); /*Soia*/
INSERT INTO bacarotruck.tags (code, "name", "type") VALUES('CELERY', 'celery', 'MENU'); /*Sedano*/

-- Categories
INSERT INTO bacarotruck.categories (code, "name", "isenable", "type", "order") VALUES('DRINKS', 'drink', true, 'MENU', 7);
INSERT INTO bacarotruck.categories (code, "name", "isenable", "type", "order") VALUES('BURRITOS', 'burrito', true, 'MENU', 1);
INSERT INTO bacarotruck.categories (code, "name", "isenable", "type", "order") VALUES('TACOS', 'tacos', true, 'MENU', 3);
INSERT INTO bacarotruck.categories (code, "name", "isenable", "type", "order") VALUES('PANINI', 'panini', true, 'MENU', 4);
INSERT INTO bacarotruck.categories (code, "name", "isenable", "type", "order") VALUES('PIATTI_TIPICI', 'piatti tipici', true, 'MENU', 5);
INSERT INTO bacarotruck.categories (code, "name", "isenable", "type", "order") VALUES('NACHOS', 'nachos', true, 'MENU', 2);
INSERT INTO bacarotruck.categories (code, "name", "isenable", "type", "order") VALUES('FRITTI', 'fritti', true, 'MENU', 6);
INSERT INTO bacarotruck.categories (code, "name", "isenable", "type", "order") VALUES('DESSERTS', 'dessert', true, 'MENU', 8);

-- Dishes
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('BURR_BORR', 'Burrito Borracho', 'Straccetti di pollo marinati con lime, spezie e tequila spadellati con cipolla e peperoni, riso, formaggio e salsa ranch', '', 9);
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('NACH_QUES', 'Nachos Queso', 'Chips di mais serviti con salsa di formaggi e jalapenos', '', 5);
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('BANDIDO', 'Bandido', 'Pane, pulled pork (spalla di maiale al forno sfilacciata), pomodoro, coleslaw, cheddar, salsa BBQ', '', 9);
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('BURR_DON', 'Burrito Don Alberto', 'Chili con carne (carne di manzo cotta a bassa temperatura con spezie messicane), formaggio, cipolla tritata e peperoni', '', 9);
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('BURR_MEX', 'Burrito Mexico', 'Chorizo (salsiccia messicana speziata), frijoles refritos, formaggio, riso e panna acida', '', 9);
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('BURR_COC', 'Burrito de Cochinita', 'Spalla di maiale marinata in spezie e cotta a bassa temperatura, formaggio, coleslaw (capuccio, carote, dressing) e salsa BBQ', '', 9);
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('BURR_VER', 'Burrito de Verdura', 'Formaggio, riso, frijoles refritos, cipolla e peperoni, mais, pico de gallo e salsa queso', '', 9);
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('NACH_GUA', 'Nachos Guacamole', 'Nachos con guacamole, fagioli mex, pico de gallo e panna acida', '', 7);
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('NACH_CHO', 'Nachos Chorizo', 'Nachos con salsiccia messicana speziata, fagioli mex, salsa queso e panna acida', '', 7.5);
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('TAC_BIR', 'Tacos de Birria', 'Birria (carne di manzo cotta a bassa temperatura con spezie messicane), formaggio, cipolla, coriandolo e salsa', '', 8.5);
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('TAC_POL', 'Tacos de Pollo', 'Straccetti di pollo marinati al lime e spezie, formaggio, lattuga, pico de gallo e salsa ranch', '', 8.5);
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('TAC_PUL', 'Tacos Pulled Pork', 'Spalla di maiale al forno sfilacciata, formaggio, coleslaw (capuccio, carote, dressing) e salsa BBQ', '', 8.5);
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('TRIS_TAC', 'Degustazione Tris de Tacos', 'Taco de Birria, Taco de Pollo, Taco Pulled Pork', '', 12.5);
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('ELPATRON', 'El Patron', 'Pane, pollo fritto speziato, pomodoro, lattuga, cheddar, salsa Bacarotruck', '', 9);
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('CHILIDOG', 'Chili Dog', 'Pane, chili con carne, wrustel, jalapenos, cheddar, cipolla fritta, salsa mex', '', 10);
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('BBQ_RIBS', 'Bbq Ribs', 'Tenerissime costine di maiale marinate e affumicate cotte a bassa temperatura e glassate con salsa BBQ. Servite con patate fritte e fagioli messicani', '', 14);
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('CHORIZO', 'Chorizo e fagioli', 'Salsiccia messicana speziata cucinata con fagioli. Servita con riso, pico de gallo, panna acida, jalapenos e tortillas', '', 13.5);
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('CHILI', 'Chili con carne', 'Carne di manzo cotta a bassa temperatura con spezie messiane. Servita con formaggio, riso, cipolla tritata, jalapenos, mais e tortillas', '', 14);
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('FAJITA', 'Fajita de Pollo', 'Straccetti di pollo marinati al lime, spezie e tequila spadellati con cipolla e peperoni. Servita con mais, pico de gallo, guacamole e tortillas', '', 13.5);
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('MEXICO', 'Degustazione Mexico', 'Fajita de pollo, chorizo (salsiccia messicana piccante cucinata con fagioli), riso, formaggio, pico de gallo, guacamole, tortillas, salse', '', 17);
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('TEXAS', 'Degustazione Texas', 'Chili con carne, pulled pork (spalla di maiale al forno sfilacciata), riso, formaggio, coleslaw, fagioli, tortillas, salse', '', 17);
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('JALAPENOS', 'Jalapenos', '4pz', '', 5.5);
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('GUA_FRIT', 'Guacamole Fritto', '5pz', '', 5.5);
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('ONION_RIN', 'Onion Rings', '8pz', '', 5.5);
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('FIL_POLLO', 'Filetti di Pollo', '2pz', '', 6);
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('PATATINE', 'Patatine fritte', '', '', 4);
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('PATATE_TAK', 'Patate Bacarotruck', 'Servite con chorizo e salsa queso', '', 5.5);
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('PACIFICO', 'Pacifico', '', '', 5);
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('DESP', 'Desperados', '', '', 4);
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('MODELO', 'Modelo', '', '', 5);
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('CORONA', 'Corona', '', '', 3.5);
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('BIBITE', 'Bibite', '', '', 2.5);
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('ACQUA', 'Acqua', '', '', 1);
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('SAN_HALF', 'Sangria', '0,5 Litro', '', 6);
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('SAN', 'Sangria', '1 Litro', '', 12);
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('CHU_NU', 'Churros Nutella', '4pz', '', 4.5);
INSERT INTO bacarotruck.dishes (code, "name", "description", "note", "price") VALUES('CHU_DU', 'Churros Dulche de Leche', '4pz', '', 4.5);

-- Dishes_Categories
INSERT INTO bacarotruck.dishes_categories (dish_id, category_id)
SELECT d.id AS dish_id, c.id AS category_id
FROM bacarotruck.dishes d
JOIN bacarotruck.categories c ON c.code = 'BURRITOS'
WHERE d.code = 'BURR_BORR';

INSERT INTO bacarotruck.dishes_categories (dish_id, category_id)
SELECT d.id AS dish_id, c.id AS category_id
FROM bacarotruck.dishes d
JOIN bacarotruck.categories c ON c.code = 'BURRITOS'
WHERE d.code = 'BURR_DON';

INSERT INTO bacarotruck.dishes_categories (dish_id, category_id)
SELECT d.id AS dish_id, c.id AS category_id
FROM bacarotruck.dishes d
JOIN bacarotruck.categories c ON c.code = 'BURRITOS'
WHERE d.code = 'BURR_MEX';

INSERT INTO bacarotruck.dishes_categories (dish_id, category_id)
SELECT d.id AS dish_id, c.id AS category_id
FROM bacarotruck.dishes d
JOIN bacarotruck.categories c ON c.code = 'BURRITOS'
WHERE d.code = 'BURR_COC';

INSERT INTO bacarotruck.dishes_categories (dish_id, category_id)
SELECT d.id AS dish_id, c.id AS category_id
FROM bacarotruck.dishes d
JOIN bacarotruck.categories c ON c.code = 'BURRITOS'
WHERE d.code = 'BURR_VER';

INSERT INTO bacarotruck.dishes_categories (dish_id, category_id)
SELECT d.id AS dish_id, c.id AS category_id
FROM bacarotruck.dishes d
JOIN bacarotruck.categories c ON c.code = 'NACHOS'
WHERE d.code = 'NACH_QUES';
INSERT INTO bacarotruck.dishes_categories (dish_id, category_id)
SELECT d.id AS dish_id, c.id AS category_id
FROM bacarotruck.dishes d
JOIN bacarotruck.categories c ON c.code = 'NACHOS'
WHERE d.code = 'NACH_GUA';
INSERT INTO bacarotruck.dishes_categories (dish_id, category_id)
SELECT d.id AS dish_id, c.id AS category_id
FROM bacarotruck.dishes d
JOIN bacarotruck.categories c ON c.code = 'NACHOS'
WHERE d.code = 'NACH_CHO';
INSERT INTO bacarotruck.dishes_categories (dish_id, category_id)
SELECT d.id AS dish_id, c.id AS category_id
FROM bacarotruck.dishes d
JOIN bacarotruck.categories c ON c.code = 'TACOS'
WHERE d.code = 'TAC_BIR';
INSERT INTO bacarotruck.dishes_categories (dish_id, category_id)
SELECT d.id AS dish_id, c.id AS category_id
FROM bacarotruck.dishes d
JOIN bacarotruck.categories c ON c.code = 'TACOS'
WHERE d.code = 'TAC_POL';
INSERT INTO bacarotruck.dishes_categories (dish_id, category_id)
SELECT d.id AS dish_id, c.id AS category_id
FROM bacarotruck.dishes d
JOIN bacarotruck.categories c ON c.code = 'TACOS'
WHERE d.code = 'TAC_PUL';
INSERT INTO bacarotruck.dishes_categories (dish_id, category_id)
SELECT d.id AS dish_id, c.id AS category_id
FROM bacarotruck.dishes d
JOIN bacarotruck.categories c ON c.code = 'TACOS'
WHERE d.code = 'TRIS_TAC';
INSERT INTO bacarotruck.dishes_categories (dish_id, category_id)
SELECT d.id AS dish_id, c.id AS category_id
FROM bacarotruck.dishes d
JOIN bacarotruck.categories c ON c.code = 'PANINI'
WHERE d.code = 'ELPATRON';
INSERT INTO bacarotruck.dishes_categories (dish_id, category_id)
SELECT d.id AS dish_id, c.id AS category_id
FROM bacarotruck.dishes d
JOIN bacarotruck.categories c ON c.code = 'PANINI'
WHERE d.code = 'BANDIDO';
INSERT INTO bacarotruck.dishes_categories (dish_id, category_id)
SELECT d.id AS dish_id, c.id AS category_id
FROM bacarotruck.dishes d
JOIN bacarotruck.categories c ON c.code = 'PANINI'
WHERE d.code = 'CHILIDOG';
INSERT INTO bacarotruck.dishes_categories (dish_id, category_id)
SELECT d.id AS dish_id, c.id AS category_id
FROM bacarotruck.dishes d
JOIN bacarotruck.categories c ON c.code = 'PIATTI_TIPICI'
WHERE d.code = 'BBQ_RIBS';
INSERT INTO bacarotruck.dishes_categories (dish_id, category_id)
SELECT d.id AS dish_id, c.id AS category_id
FROM bacarotruck.dishes d
JOIN bacarotruck.categories c ON c.code = 'PIATTI_TIPICI'
WHERE d.code = 'CHORIZO';
INSERT INTO bacarotruck.dishes_categories (dish_id, category_id)
SELECT d.id AS dish_id, c.id AS category_id
FROM bacarotruck.dishes d
JOIN bacarotruck.categories c ON c.code = 'PIATTI_TIPICI'
WHERE d.code = 'CHILI';
INSERT INTO bacarotruck.dishes_categories (dish_id, category_id)
SELECT d.id AS dish_id, c.id AS category_id
FROM bacarotruck.dishes d
JOIN bacarotruck.categories c ON c.code = 'PIATTI_TIPICI'
WHERE d.code = 'FAJITA';
INSERT INTO bacarotruck.dishes_categories (dish_id, category_id)
SELECT d.id AS dish_id, c.id AS category_id
FROM bacarotruck.dishes d
JOIN bacarotruck.categories c ON c.code = 'PIATTI_TIPICI'
WHERE d.code = 'MEXICO';
INSERT INTO bacarotruck.dishes_categories (dish_id, category_id)
SELECT d.id AS dish_id, c.id AS category_id
FROM bacarotruck.dishes d
JOIN bacarotruck.categories c ON c.code = 'PIATTI_TIPICI'
WHERE d.code = 'TEXAS';
INSERT INTO bacarotruck.dishes_categories (dish_id, category_id)
SELECT d.id AS dish_id, c.id AS category_id
FROM bacarotruck.dishes d
JOIN bacarotruck.categories c ON c.code = 'FRITTI'
WHERE d.code = 'JALAPENOS';
INSERT INTO bacarotruck.dishes_categories (dish_id, category_id)
SELECT d.id AS dish_id, c.id AS category_id
FROM bacarotruck.dishes d
JOIN bacarotruck.categories c ON c.code = 'FRITTI'
WHERE d.code = 'ONION_RIN';
INSERT INTO bacarotruck.dishes_categories (dish_id, category_id)
SELECT d.id AS dish_id, c.id AS category_id
FROM bacarotruck.dishes d
JOIN bacarotruck.categories c ON c.code = 'FRITTI'
WHERE d.code = 'FIL_POLLO';
INSERT INTO bacarotruck.dishes_categories (dish_id, category_id)
SELECT d.id AS dish_id, c.id AS category_id
FROM bacarotruck.dishes d
JOIN bacarotruck.categories c ON c.code = 'FRITTI'
WHERE d.code = 'PATATINE';
INSERT INTO bacarotruck.dishes_categories (dish_id, category_id)
SELECT d.id AS dish_id, c.id AS category_id
FROM bacarotruck.dishes d
JOIN bacarotruck.categories c ON c.code = 'FRITTI'
WHERE d.code = 'PATATE_TAK';
INSERT INTO bacarotruck.dishes_categories (dish_id, category_id)
SELECT d.id AS dish_id, c.id AS category_id
FROM bacarotruck.dishes d
JOIN bacarotruck.categories c ON c.code = 'DRINKS'
WHERE d.code = 'PACIFICO';
INSERT INTO bacarotruck.dishes_categories (dish_id, category_id)
SELECT d.id AS dish_id, c.id AS category_id
FROM bacarotruck.dishes d
JOIN bacarotruck.categories c ON c.code = 'DRINKS'
WHERE d.code = 'DESP';
INSERT INTO bacarotruck.dishes_categories (dish_id, category_id)
SELECT d.id AS dish_id, c.id AS category_id
FROM bacarotruck.dishes d
JOIN bacarotruck.categories c ON c.code = 'DRINKS'
WHERE d.code = 'MODELO';
INSERT INTO bacarotruck.dishes_categories (dish_id, category_id)
SELECT d.id AS dish_id, c.id AS category_id
FROM bacarotruck.dishes d
JOIN bacarotruck.categories c ON c.code = 'DRINKS'
WHERE d.code = 'CORONA';
INSERT INTO bacarotruck.dishes_categories (dish_id, category_id)
SELECT d.id AS dish_id, c.id AS category_id
FROM bacarotruck.dishes d
JOIN bacarotruck.categories c ON c.code = 'DRINKS'
WHERE d.code = 'BIBITE';
INSERT INTO bacarotruck.dishes_categories (dish_id, category_id)
SELECT d.id AS dish_id, c.id AS category_id
FROM bacarotruck.dishes d
JOIN bacarotruck.categories c ON c.code = 'DRINKS'
WHERE d.code = 'ACQUA';
INSERT INTO bacarotruck.dishes_categories (dish_id, category_id)
SELECT d.id AS dish_id, c.id AS category_id
FROM bacarotruck.dishes d
JOIN bacarotruck.categories c ON c.code = 'DRINKS'
WHERE d.code = 'SAN_HALF';
INSERT INTO bacarotruck.dishes_categories (dish_id, category_id)
SELECT d.id AS dish_id, c.id AS category_id
FROM bacarotruck.dishes d
JOIN bacarotruck.categories c ON c.code = 'DRINKS'
WHERE d.code = 'SAN';
INSERT INTO bacarotruck.dishes_categories (dish_id, category_id)
SELECT d.id AS dish_id, c.id AS category_id
FROM bacarotruck.dishes d
JOIN bacarotruck.categories c ON c.code = 'DESSERTS'
WHERE d.code = 'CHU_NU';
INSERT INTO bacarotruck.dishes_categories (dish_id, category_id)
SELECT d.id AS dish_id, c.id AS category_id
FROM bacarotruck.dishes d
JOIN bacarotruck.categories c ON c.code = 'DESSERTS'
WHERE d.code = 'CHU_DU';

-- Dishes_Tags
--Burrito Borracho
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'GLUTEN'
WHERE d.code = 'BURR_BORR';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'DAIRY'
WHERE d.code = 'BURR_BORR';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'SESAME'
WHERE d.code = 'BURR_BORR';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'MUSTARD'
WHERE d.code = 'BURR_BORR';

--Burrito Don Alberto
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'SPICE'
WHERE d.code = 'BURR_DON';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'GLUTEN'
WHERE d.code = 'BURR_DON';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'DAIRY'
WHERE d.code = 'BURR_DON';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'CELERY'
WHERE d.code = 'BURR_DON';

--Burrito Mexico
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'SPICE'
WHERE d.code = 'BURR_MEX';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'GLUTEN'
WHERE d.code = 'BURR_MEX';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'DAIRY'
WHERE d.code = 'BURR_MEX';

--Burrito de Cochinita
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'SESAME'
WHERE d.code = 'BURR_COC';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'GLUTEN'
WHERE d.code = 'BURR_COC';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'DAIRY'
WHERE d.code = 'BURR_COC';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'MUSTARD'
WHERE d.code = 'BURR_COC';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'SOY'
WHERE d.code = 'BURR_COC';

--Burrito de Verdura
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'GLUTEN'
WHERE d.code = 'BURR_VER';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'DAIRY'
WHERE d.code = 'BURR_VER';

--Nachos Queso
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'SPICE'
WHERE d.code = 'NACH_QUES';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'DAIRY'
WHERE d.code = 'NACH_QUES';

--Nachos Guacamole
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'DAIRY'
WHERE d.code = 'NACH_GUA';

--Nachos Chorizo
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'SPICE'
WHERE d.code = 'NACH_CHO';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'DAIRY'
WHERE d.code = 'NACH_CHO';

--Tacos de Birria
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'SPICE'
WHERE d.code = 'TAC_BIR';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'GLUTEN'
WHERE d.code = 'TAC_BIR';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'DAIRY'
WHERE d.code = 'TAC_BIR';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'CELERY'
WHERE d.code = 'TAC_BIR';

--Tacos de Pollo
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'SESAME'
WHERE d.code = 'TAC_POL';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'GLUTEN'
WHERE d.code = 'TAC_POL';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'DAIRY'
WHERE d.code = 'TAC_POL';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'MUSTARD'
WHERE d.code = 'TAC_POL';

--Tacos Pulled Pork
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'SESAME'
WHERE d.code = 'TAC_PUL';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'GLUTEN'
WHERE d.code = 'TAC_PUL';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'DAIRY'
WHERE d.code = 'TAC_PUL';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'MUSTARD'
WHERE d.code = 'TAC_PUL';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'SOY'
WHERE d.code = 'TAC_PUL';

--Degustazione Tris de Tacos
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'SESAME'
WHERE d.code = 'TRIS_TAC';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'GLUTEN'
WHERE d.code = 'TRIS_TAC';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'DAIRY'
WHERE d.code = 'TRIS_TAC';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'MUSTARD'
WHERE d.code = 'TRIS_TAC';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'SOY'
WHERE d.code = 'TRIS_TAC';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'SPICE'
WHERE d.code = 'TRIS_TAC';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'CELERY'
WHERE d.code = 'TRIS_TAC';

--Bandido
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'SESAME'
WHERE d.code = 'BANDIDO';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'GLUTEN'
WHERE d.code = 'BANDIDO';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'DAIRY'
WHERE d.code = 'BANDIDO';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'MUSTARD'
WHERE d.code = 'BANDIDO';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'SOY'
WHERE d.code = 'BANDIDO';

--El Patron
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'SESAME'
WHERE d.code = 'ELPATRON';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'GLUTEN'
WHERE d.code = 'ELPATRON';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'DAIRY'
WHERE d.code = 'ELPATRON';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'MUSTARD'
WHERE d.code = 'ELPATRON';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'SOY'
WHERE d.code = 'ELPATRON';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'SPICE'
WHERE d.code = 'ELPATRON';

--Chili Dog
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'SPICE'
WHERE d.code = 'CHILIDOG';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'GLUTEN'
WHERE d.code = 'CHILIDOG';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'DAIRY'
WHERE d.code = 'CHILIDOG';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'CELERY'
WHERE d.code = 'CHILIDOG';

--Bbq Ribs
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'GLUTEN'
WHERE d.code = 'BBQ_RIBS';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'MUSTARD'
WHERE d.code = 'BBQ_RIBS';

--Chorizo e fagioli
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'GLUTEN'
WHERE d.code = 'CHORIZO';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'DAIRY'
WHERE d.code = 'CHORIZO';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'SPICE'
WHERE d.code = 'CHORIZO';

--Chili con carne
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'GLUTEN'
WHERE d.code = 'CHILI';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'DAIRY'
WHERE d.code = 'CHILI';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'SPICE'
WHERE d.code = 'CHILI';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'CELERY'
WHERE d.code = 'CHILI';

--Fajita de Pollo
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'GLUTEN'
WHERE d.code = 'FAJITA';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'DAIRY'
WHERE d.code = 'FAJITA';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'SESAME'
WHERE d.code = 'FAJITA';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'MUSTARD'
WHERE d.code = 'FAJITA';

--Degustazione Mexico
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'GLUTEN'
WHERE d.code = 'MEXICO';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'DAIRY'
WHERE d.code = 'MEXICO';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'SESAME'
WHERE d.code = 'MEXICO';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'MUSTARD'
WHERE d.code = 'MEXICO';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'SPICE'
WHERE d.code = 'MEXICO';

--Degustazione Texas
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'GLUTEN'
WHERE d.code = 'TEXAS';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'DAIRY'
WHERE d.code = 'TEXAS';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'SESAME'
WHERE d.code = 'TEXAS';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'MUSTARD'
WHERE d.code = 'TEXAS';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'SPICE'
WHERE d.code = 'TEXAS';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'CELERY'
WHERE d.code = 'TEXAS';
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'SOY'
WHERE d.code = 'TEXAS';

--Jalapenos
INSERT INTO bacarotruck.dishes_tags (dish_id, tag_id)
SELECT d.id AS dish_id, t.id AS tag_id
FROM bacarotruck.dishes d
JOIN bacarotruck.tags t ON t.code = 'EXTRA_SPICE'
WHERE d.code = 'JALAPENOS';

ALTER TABLE bacarotruck.orders ALTER COLUMN truck_id DROP NOT NULL;
ALTER TABLE bacarotruck.orders ALTER COLUMN site_id DROP NOT NULL;
ALTER TABLE bacarotruck.orders ALTER COLUMN day_id DROP NOT NULL;
ALTER TABLE bacarotruck.orders ALTER total DROP NOT NULL;


-- Auto-generated SQL script #202409151905
INSERT INTO bacarotruck.sites (code,"name",address)
	VALUES ('SITE_8','Pieve di Soligo','Fronte Cinema Teatro Careni');
INSERT INTO bacarotruck.sites (code,"name",address)
	VALUES ('SITE_9','Cornuda','Fronte Chiesa');
UPDATE bacarotruck.sites
	SET address='Fronte Chiesa Parrochiale dei Santi e Paolo'
	WHERE id=1;
UPDATE bacarotruck.sites
	SET address='Fronte Chiesa'
	WHERE id=2;
UPDATE bacarotruck.sites
	SET address='Fronte carabinieri'
	WHERE id=3;
UPDATE bacarotruck.sites
	SET address='Foro Boario'
	WHERE id=4;
UPDATE bacarotruck.sites
	SET address='Fronte municipio'
	WHERE id=5;
UPDATE bacarotruck.sites
	SET address='Zona C6 Fronte gelateria Puro Bio'
	WHERE id=6;
UPDATE bacarotruck.sites
	SET "name"='Treviso',address='Piscine Santa Bona'
	WHERE id=7;

INSERT INTO bacarotruck.sites
(id, code, "name", address)
VALUES(10, 'SITE_10', 'Bassano del Grappa', 'Parcheggio Centro Giovanile');

ALTER TABLE bacarotruck.orders ADD delated_at timestamp NULL;

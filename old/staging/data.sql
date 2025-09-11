
-- DATA

-- Insert Data
-- Roles
INSERT INTO bacarotruck.roles (code, "name") VALUES('CUSTOMER', 'customer');
INSERT INTO bacarotruck.roles (code, "name") VALUES('TRUCK', 'truck');
INSERT INTO bacarotruck.roles (code, "name") VALUES('ADMIN', 'admin');

-- Trucks
INSERT INTO bacarotruck.trucks (code, "name") VALUES('TRUCK_1', 'Taco Magico');
INSERT INTO bacarotruck.trucks (code, "name") VALUES('TRUCK_2', 'Nacho Volante');

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
	 ('REJECT','Respinto');


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
ALTER TABLE bacarotruck.orders ALTER COLUMN truck_id DROP NOT NULL;
ALTER TABLE bacarotruck.orders ALTER COLUMN site_id DROP NOT NULL;
ALTER TABLE bacarotruck.orders ALTER COLUMN day_id DROP NOT NULL;
ALTER TABLE bacarotruck.orders ALTER total DROP NOT NULL;


ALTER TABLE bacarotruck.orders_items ADD quantity int NOT NULL DEFAULT 1;
-- feature/category-order
ALTER TABLE bacarotruck.categories ADD "order" int NULL;
--feature/phone-truck
alter table bacarotruck.trucks add phone varchar(13)
--feature/truck-order

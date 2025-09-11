ALTER TABLE bacarotruck.orders ALTER COLUMN truck_id DROP NOT NULL;
ALTER TABLE bacarotruck.orders_items ADD quantity int NOT NULL DEFAULT 1;
-- feature/category-order
ALTER TABLE bacarotruck.categories ADD "order" int NULL;
ALTER TABLE bacarotruck.orders ADD pick_up_time_request timestamp NULL;
ALTER TABLE bacarotruck.orders ADD pick_up_time_accepted timestamp NULL;
--feature/phone-truck
alter table bacarotruck.trucks add phone varchar(13)
--feature/truck-order
ALTER TABLE bacarotruck.orders ADD total decimal NOT NULL DEFAULT 0.0;
ALTER TABLE bacarotruck.orders ADD site_id serial4;
ALTER TABLE bacarotruck.orders ADD day_id serial4
ALTER TABLE bacarotruck.orders ADD CONSTRAINT fk_site_orders FOREIGN KEY (site_id) REFERENCES bacarotruck.sites(id);
ALTER TABLE bacarotruck.orders ADD CONSTRAINT fk_day_orders FOREIGN KEY (day_id) REFERENCES bacarotruck.days(id);
ALTER TABLE bacarotruck.orders ALTER COLUMN site_id DROP NOT NULL;
ALTER TABLE bacarotruck.orders ALTER COLUMN day_id DROP NOT NULL;

-- add PICKEDUP alla tabella status_order

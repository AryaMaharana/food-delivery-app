-- Food Delivery Platform local test data
-- Apply after JPA has created the tables.
-- All seeded users use the password: password

BEGIN;

DELETE FROM orders;
DELETE FROM menu_item;
DELETE FROM restaurant;
DELETE FROM users;

INSERT INTO users (id,email,password,full_name,address,phone_number,role) VALUES
(1,'admin@fooddelivery.local','$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy','Platform Admin','Pune, Maharashtra','9000000001','ADMIN'),
(2,'owner@demo.com','$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy','Spice Garden Owner','Kharadi, Pune','9000000002','RESTAURANT_OWNER'),
(3,'owner@punekitchen.local','$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy','Pune Kitchen Owner','Viman Nagar, Pune','9000000003','RESTAURANT_OWNER'),
(4,'arya.customer@fooddelivery.local','$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy','Arya Customer','Keshav Nagar, Pune','9000000004','CUSTOMER'),
(5,'test.customer@fooddelivery.local','$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy','Test Customer','Viman Nagar, Pune','9000000005','CUSTOMER');

INSERT INTO restaurant (id,name,description,address,phone_number,image_url) VALUES
(1,'Spice Garden','Comfort Indian food with biryani, tikkas and fresh breads.','Kharadi, Pune','+91-9000000011','https://images.unsplash.com/photo-1517248135467-4c7edcad34c4'),
(2,'Pune Kitchen','Modern Pune favourites and quick lunch bowls.','Viman Nagar, Pune','+91-9000000012','https://images.unsplash.com/photo-1552566626-52f8b828add9'),
(3,'Green Bowl','Fresh vegetarian bowls, dosas and healthy sides.','Kalyani Nagar, Pune','+91-9000000013','https://images.unsplash.com/photo-1512621776951-a57141f2eefd');

INSERT INTO menu_item (id,name,description,price,image_url,available,restaurant_id) VALUES
(1,'Chicken Biryani','Aromatic basmati rice with spiced chicken.',299.00,'https://images.unsplash.com/photo-1563379091339-03246963d96c',true,1),
(2,'Paneer Tikka','Char-grilled paneer with Indian spices.',229.00,'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8',true,1),
(3,'Butter Naan','Soft tandoori naan finished with butter.',59.00,'https://images.unsplash.com/photo-1601050690597-df0568f70950',true,1),
(4,'Masala Dosa','Crispy dosa with potato masala and chutney.',149.00,'https://images.unsplash.com/photo-1668236543090-82eba5ee5976',true,1),
(5,'Misal Pav','Classic spicy Maharashtrian misal with pav.',139.00,'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7',true,2),
(6,'Vada Pav','Mumbai-style potato fritter in soft pav.',49.00,'https://images.unsplash.com/photo-1601050690597-df0568f70950',true,2),
(7,'Veg Thali','Balanced vegetarian meal with rice, roti and sides.',249.00,'https://images.unsplash.com/photo-1546833999-b9f581a1996d',true,2),
(8,'Paneer Bowl','Protein-rich paneer bowl with grains and vegetables.',219.00,'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',true,3),
(9,'Idli Sambar','Steamed idlis served with sambar and chutney.',99.00,'https://images.unsplash.com/photo-1589301760014-d929f3979dbc',true,3),
(10,'Masala Oats','Healthy oats with vegetables and Indian seasoning.',129.00,'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',true,3);

-- Order references use business keys because services own their data.
INSERT INTO orders
(id,customer_email,restaurant_id,total_amount,delivery_address,payment_method,payment_id,status,order_time) VALUES
(1,'arya.customer@fooddelivery.local',1,417.00,'B Block, Keshav Nagar, Pune','UPI','DEMO-PAY-100001','DELIVERED','2026-09-28 12:35:00'),
(2,'arya.customer@fooddelivery.local',3,318.00,'B Block, Keshav Nagar, Pune','CARD','DEMO-PAY-100002','PREPARING','2026-10-02 19:10:00'),
(3,'test.customer@fooddelivery.local',2,237.00,'Viman Nagar, Pune','UPI','DEMO-PAY-100003','OUT_FOR_DELIVERY','2026-10-03 13:20:00');

SELECT setval(pg_get_serial_sequence('users','id'),COALESCE((SELECT MAX(id) FROM users),1),true);
SELECT setval(pg_get_serial_sequence('restaurant','id'),COALESCE((SELECT MAX(id) FROM restaurant),1),true);
SELECT setval(pg_get_serial_sequence('menu_item','id'),COALESCE((SELECT MAX(id) FROM menu_item),1),true);
SELECT setval(pg_get_serial_sequence('orders','id'),COALESCE((SELECT MAX(id) FROM orders),1),true);

COMMIT;

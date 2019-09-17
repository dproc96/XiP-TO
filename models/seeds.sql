/*Automatic execution when the server startups*/
INSERT INTO Category (name) VALUES ("Park");
INSERT INTO Category (name) VALUES ("Restaurant");
INSERT INTO Category (name) VALUES ("Pub");
INSERT INTO Category (name) VALUES ("Cinema");
INSERT INTO Category (name) VALUES ("Music Festival");
INSERT INTO Category (name) VALUES ("Theatre");
INSERT INTO Category (name) VALUES ("Museum");
INSERT INTO Category (name) VALUES ("Other");

/*test data*/
INSERT INTO User VALUES 
(1,'John','Doe','john@gmail.com','123456789',null,18,1,'2019-09-14 14:23:59','2019-09-14 14:32:20'),
(2,'Carol','Cavalcanti','carolinapc@gmail.com','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,5,1,'2019-09-14 14:31:49','2019-09-14 14:32:51'),
(3,'Dan','Proctor','dan@gmail.com','123456789',null,3,1,'2019-09-14 14:31:49','2019-09-14 14:32:51'),
(4,'Rob','Gronkowski','gronk@gmail.com','$2b$10$F.mAHbUstqqJrkZEoCq3iuLWBk8aq5pyrpb0VzZDnJe8hu0VyJdJy',null,22,1,'2019-09-14 14:31:49','2019-09-14 14:32:51'),
(5,'Julian','Edelman','jules@gmail.com','123456789',null,19,1,'2019-09-14 14:31:49','2019-09-14 14:32:51');
INSERT INTO Experience VALUES 
(1,'High Park Scavenger Hunt','1873 Bloor St W, Toronto, ON M6R 2Z3',NULL,NULL,'My friends and I found a scavenger hunt on High Park''s website, it was great!','high-park-scavenger-hunt.jpg','2019-09-14 14:24:17','2019-09-14 14:24:17',1,1),
(2,'Picnic in Christie Pits','750 Bloor St W, Toronto, ON M6G 3K4',NULL,NULL,'My wife and I had a picnic in Christie Pits and watched a local baseball league play on a Saturday.','picnic-in-christie-pits.jpg','2019-09-14 14:24:33','2019-09-14 14:24:33',1,1),
(3,'Watching the Dogs at Trinity Bellwoods','790 Queen St W, Toronto, ON M6J 1G3',NULL,NULL,'At Trinity Bellwoods there''s a pit where dogs can play together off leash','watching-the-dog-at-trinity-bellwoods.jpg','2019-09-14 14:24:41','2019-09-14 14:24:41',1,3),
(4,'Flo''s Diner','70 Yorkville Ave 2nd Floor, Toronto, ON M5R 1B9',NULL,NULL,'THE! BEST! HOLLANDAISE! Go there and get the eggs benedict! You might even spot a celebrity at this hidden gem!','flos-diner.jpg','2019-09-14 14:32:51','2019-09-14 14:32:51',2,2),
(5,'Ramen Isshin and a Beer','421 College St, Toronto, ON M5T 1T1','421 College St, Toronto, ON M5T 1T1',NULL,'Me and my friends went out to this ramen place and then went to Nirvana across the street afterwards for a great pitcher of beer! Be sure you get to Ramen Isshin early because it fills up fast!','ramen-isshin-and-a-beer.jpg','2019-09-14 14:32:51','2019-09-14 14:32:51',2,3),
(6,'HALF! PRICE! WINGS!','192 Bloor St W, Toronto, ON M5S 1T8',NULL,NULL,'Did you know that Gabby''s on Bloor does half price wings on Mondays and Wednesdays? My friends and I started a weekly tradition sometimes twice a week!','half-price-wings.jpg','2019-09-14 14:32:51','2019-09-14 14:32:51',2,4),
(7,'Jazz & Drinks at the Rex','194 Queen St W, Toronto, ON M5V 1Z1',NULL,NULL,'Come for the drinks, stay for the jazz! The sax player I saw there was one of the best ever!','jazz-drinks-at-the-rex.jpg','2019-09-14 14:32:51','2019-09-14 14:32:51',3,5),
(8,'AYCE Sushi','486 Bloor St W, Toronto, ON M5S 1Y2','394 Bloor St W, Toronto, ON M5S 1Y2',NULL,'My buddies go to New Gen all the time for AYCE Sushi, even better there''s a back-up place Sakura about a block or so away','ayce-sushi.jpg','2019-09-14 14:32:51','2019-09-14 14:32:51',2,5),
(9,'Kensington Pub Crawl','268 Augusta Ave, Toronto, ON M5T 2L9','303 Augusta Ave, Toronto, ON M5T 2M2','394 College St, Toronto, ON M5T 1S7','We started at the Supermarket bar and had a few while watching some live music, then we went to the back patio at Trinity Common. Afterwards we went to the back deck at Cloak & Dagger where it feel like a friends place','kensington-pub-crawl.jpg','2019-09-14 14:32:51','2019-09-14 14:32:51',3,3),
(10,'Billiards and Brews','229 College St, Toronto, ON M5T 1R4',NULL,NULL,'This is not the best bar in the world but if you like a dive it makes up for its shortcomings in cheap beer and free pool on Sunday!','billiards-and-brews.jpg','2019-09-14 14:32:51','2019-09-14 14:32:51',3,4),
(11,'Shakespeare in High Park','1873 Bloor St W, Toronto, ON M6R 2Z3',NULL,NULL,'In the late summer they put on Shakespeare plays in High Park, it is pay what you want but it is worth whatever you pay!','shakespeare-in-high-park.jpg','2019-09-14 14:32:51','2019-09-14 14:32:51',6,1),
(12,'Hart House Theatre','7 Hart House Cir, Toronto, ON M5S 3H3',NULL,NULL,'This place has a lot of great theatre, often with student actors and crew! Great place to see a play!','hart-house-theatre.jpg','2019-09-14 14:32:51','2019-09-14 14:32:51',6,4),
(13,'Vegan Gluten Free Baked Goods!','100 Harbord St, Toronto, ON M5S 1G6',NULL,NULL,'Delicious gluten free baked goods and also vegan! The coffee is really great too!','vegan-gluten-free-baked-goods.jpg','2019-09-14 14:32:51','2019-09-14 14:32:51',2,3),
(14,'Honest Ed''s Theatre','244 Victoria St, Toronto, ON M5B 1V8',NULL,NULL,'I go here all the time, if you''re willing to shell out a little extra money it''s the best theatre in town.','honest-eds-theatre.jpg','2019-09-14 14:32:51','2019-09-14 14:32:51',6,5);

INSERT INTO Review VALUES 
(1,1,NULL,'2019-09-14 14:31:56','2019-09-14 14:31:56',3,2),
(2,1,NULL,'2019-09-14 14:32:01','2019-09-14 14:32:01',1,2),
(3,0,NULL,'2019-09-14 14:32:20','2019-09-14 14:32:20',2,2);
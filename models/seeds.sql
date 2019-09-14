/*Automatic execution when the server startups*/
INSERT INTO Category (name) VALUES ("Park");
INSERT INTO Category (name) VALUES ("Restaurant");
INSERT INTO Category (name) VALUES ("Pub");
INSERT INTO Category (name) VALUES ("Cinema");
INSERT INTO Category (name) VALUES ("Music Festival");
INSERT INTO Category (name) VALUES ("Theatre");
INSERT INTO Category (name) VALUES ("Museum");

/*test data*/
INSERT INTO User VALUES (1,'John','Doe','john@gmail.com','123456789',18,1,'2019-09-14 14:23:59','2019-09-14 14:32:20'),(2,'Carol','Cavalcanti','carol@gmail.com','123456789',5,1,'2019-09-14 14:31:49','2019-09-14 14:32:51');
INSERT INTO Experience VALUES (1,'Experience 1','Location X',NULL,NULL,'Description of the experience 1','experience_1.jpg',1,'2019-09-14 14:24:17','2019-09-14 14:24:17',1,1),
(2,'Experience 2','Location LMN',NULL,NULL,'Description of the experience 2','experience_2.jpg',1,'2019-09-14 14:24:33','2019-09-14 14:24:33',1,1),
(3,'Experience 3','Location HIJ',NULL,NULL,'Description of the experience 3','experience_3.jpg',1,'2019-09-14 14:24:41','2019-09-14 14:24:41',2,1),
(4,'Experience 4','Location DFG',NULL,NULL,'Description of the experience 4','experience_4.jpg',1,'2019-09-14 14:32:51','2019-09-14 14:32:51',2,2),
(5,'Experience 5','Location ABC',NULL,NULL,'Description of the experience 5',null,1,'2019-09-14 14:32:51','2019-09-14 14:32:51',2,2),
(6,'Experience 6','Location ZET',NULL,NULL,'Description of the experience 6',null,1,'2019-09-14 14:32:51','2019-09-14 14:32:51',2,2);

INSERT INTO Review VALUES (1,1,NULL,1,'2019-09-14 14:31:56','2019-09-14 14:31:56',3,2),(2,1,NULL,1,'2019-09-14 14:32:01','2019-09-14 14:32:01',1,2),(3,0,NULL,1,'2019-09-14 14:32:20','2019-09-14 14:32:20',2,2);
INSERT INTO users(name,email,password)
VALUES('Eva Stanley','sebastianguerra@ymail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Louisa Meyer','jacksonrose@hotmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Dominic Parks','victoriablackwell@outlook.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2uu');

INSERT INTO properties(owner_id,title,description,thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces,number_of_bathrooms,number_of_bedrooms,country,street,city,province,post_code,active)
VALUES(1,'Speed Lamp','description','https://images.pexels.com/photos/892618/pexels-photo-892618.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260','https://images.pexels.com/photos/892618/pexels-photo-892618.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',85234,6,6,7,'Canada','651 Nami Road','Bohbatev','Alberta',83680,true),
(1,'Blank Corner','description','https://images.pexels.com/photos/3554424/pexels-photo-3554424.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260','https://images.pexels.com/photos/3554424/pexels-photo-3554424.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',46058,6,4,8,'Canada','536 Nambsub Highway','Sotboske','Quebec',28142,true),
(2,'Habit mix','description','https://images.pexels.com/photos/2079234/pexels-photo-2079234.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260','https://images.pexels.com/photos/2079234/pexels-photo-2079234.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',82640,0,5,6,'Canada','1650 Hejto Center','Genwezuj','Newfoundland And Labrador',44583,true);

INSERT INTO reservations(start_date,end_date,property_id,guest_id) VALUES('2020-11-11','2020-11-20',2,3),
('2020-10-11','2020-10-20',1,2),
('2020-10-05','2020-10-10',3,1);

INSERT INTO property_reviews(guest_id,property_id,reservation_id,rating,message) 
VALUES(2,3,1,3,'message'),
(1,2,2,4,'message'),
(3,1,3,4,'message');
create database dog CHARACTER set = 'utf8' COLLATE = 'utf8_hungarian_ci';
use dog;

create table dog (id int AUTO_INCREMENT PRIMARY KEY,
                 name VARCHAR(100) not null,
                 breed VARCHAR(100) not null,
                 gender BOOLEAN default false,
                 age INT,
                 picurl VARCHAR(255));


insert into dog values(null,"Zsazsa");

delete from dog;


alter table dog AUTO_INCREMENT = 1;
INSERT INTO dog  VALUES
(NULL, 'Mendy', 'keverék', 0, 3, 'https://www.tappancs.hu/sites/default/files/styles/full_width_gallery/public/media/mendy20251.jpg'),
(NULL, 'Zsazsa', 'keverék', 0, 11, 'https://www.tappancs.hu/sites/default/files/styles/full_width_gallery/public/media/zsazsa20251.jpg'),
(NULL, 'Bobi', 'pekingi palotakutya', 1, 11, 'https://www.tappancs.hu/sites/default/files/styles/full_width_gallery/public/media/bobi20251.jpg'),
(NULL, 'Figura', 'mudi keverék', 1, 1, 'https://www.tappancs.hu/sites/default/files/styles/full_width_gallery/public/media/figura20251.jpg'),
(NULL, 'Harcos', 'németjuhász keverék', 1, 1, 'https://www.tappancs.hu/sites/default/files/styles/full_width_gallery/public/media/harcos20242.jpg'),
(NULL, 'Liza', 'rottweiler keverék', 0, 12, 'https://www.tappancs.hu/sites/default/files/styles/full_width_gallery/public/media/liza20251.jpg'),
(NULL, 'Csöpi', 'keverék', 1, 8, 'https://www.tappancs.hu/sites/default/files/styles/full_width_gallery/public/media/csopi20244.jpg'),
(NULL, 'Briós', 'keverék', 0, 7, 'https://www.tappancs.hu/sites/default/files/styles/full_width_gallery/public/media/brios20245.jpg');

drop table users;
delete from users;
alter table users AUTO_INCREMENT = 1;
create table users (userId int AUTO_INCREMENT PRIMARY key,
email varchar(100) not null UNIQUE,
password varchar(255) not null,
avatar varchar(255) null,
Foreign Key (avatar) REFERENCES files(fileId) on delete CASCADE);

drop table files;
delete from files;
create table files (
    fileId VARCHAR(255) not null primary key UNIQUE,
    fileName varchar(255) not null,
    uploadTime TIMESTAMP default CURRENT_TIMESTAMP(),
    mimeType varchar(100),
    fileSize INTEGER not null

)

alter table files add mimeType varchar(100);

drop table userFiles;
create table userFiles (
    userId integer not null,
    fileId varchar(255),
    Foreign Key (fileId) REFERENCES files(fileId) on delete cascade,
    Foreign Key (userId) REFERENCES users(userId) on delete cascade
);




insert into users values (null, "teszt1@gmail.com","titok",null),
(null,"teszt2@gmail.com","jelszo",null)


create trigger insert_user BEFORE insert on users
for each row set new.password = pwd_encrypt(new.password);

create FUNCTION pwd_encrypt(pwd varchar(100))
RETURNS VARCHAR(255) DETERMINISTIC
RETURN SHA2(concat(pwd,'sozas'),256);

drop function login;

create function login(email VARCHAR(100),pwd VARCHAR(100))
RETURNS integer DETERMINISTIC
BEGIN
declare ok integer;
set ok = 0;
select userId into ok from users where users.email = email and users.password =  pwd_encrypt(pwd);
RETURN ok;
End;

select login("teszt2@gmail.com","jelszo");


drop Trigger insert_user;


alter table dog modify column gender TINYINT(1);

update dog set name = 'macikafgsfg', breed = 'keveréksfg', gender = false, age = 3, picurl = 'https://www.tappancs.hu/sites/default/files/styles/full_width_gallery/public/media/mendy20251.jpg' where id = 11;
create database listaAlbumes;

use listaAlbumes;

create table SOLICITUD(
	/*Declaro un varchar de 20 caracteres para la IP por las dudas, a priori, con 11 caracteres es suficiente
	  porque son 9 números en total y 2 puntos.*/
	ipUsuario     VARCHAR(20)  NOT NULL,
	fecha         TIMESTAMP default CURRENT_TIMESTAMP,
	/*Aquí en el nombre del artista, por las dudas dejo un márgen de 200 caracteres, como es un proyecto pequeño
	  desde mi punto de vista no hay problema.*/
	nombreArtista VARCHAR(200)  NOT NULL
);

alter table SOLICITUD
  add constraint PK_SOLICITUD primary key (ipUsuario, fecha);
create database caixadesonhos;
use caixadesonhos;

create table usuario (
  id int primary key auto_increment,
  nome varchar(255),
  email varchar(255) unique,
  senha varchar(255),
  foto varchar(255),
  data_cadastro  timestamp default current_timestamp
);

create table brinquedo (
  id int primary key auto_increment,
  nome varchar(100),
  descricao text,
  foto_url varchar(500),
  status varchar(20) default 'disponivel'
);

create table doacao (
  id  int primary key auto_increment,
  id_doador  int,
  id_beneficiario  int default null,
  id_brinquedo int,
  data_retirada  timestamp null default null,
  foreign key (id_doador) references usuario(id),
  foreign key (id_beneficiario) references usuario(id),
  foreign key (id_brinquedo) references brinquedo(id)
);

create table favorito (
  id int primary key auto_increment,
  id_usuario int,
  id_brinquedo int,
  foreign key (id_usuario) references usuario(id),
  foreign key (id_brinquedo) references brinquedo(id)
);
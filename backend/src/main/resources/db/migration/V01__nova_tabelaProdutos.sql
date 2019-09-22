create table produto (
	id bigint auto_increment not null,
	nome varchar(80) not null,
	categoria varchar(200) not null,
	quantidade decimal(10,2),
	preco decimal(10,2),

	primary key (id)

);
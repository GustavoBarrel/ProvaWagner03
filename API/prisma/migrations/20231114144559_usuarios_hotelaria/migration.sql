-- CreateTable
CREATE TABLE `UsuarisHotelaria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(250) NOT NULL,
    `email` VARCHAR(250) NOT NULL,
    `cpf` CHAR(11) NOT NULL,
    `cnpj` CHAR(11) NOT NULL,
    `senha` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `UsuarisHotelaria_email_key`(`email`),
    UNIQUE INDEX `UsuarisHotelaria_cpf_key`(`cpf`),
    UNIQUE INDEX `UsuarisHotelaria_cnpj_key`(`cnpj`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

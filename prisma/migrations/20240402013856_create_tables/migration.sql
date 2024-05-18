-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NULL,
    `password` VARCHAR(100) NOT NULL,
    `role` VARCHAR(100) NOT NULL DEFAULT 'USER',

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `psikologs` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `keahlian` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `psikologs_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaksis` (
    `id` VARCHAR(191) NOT NULL,
    `status` VARCHAR(100) NOT NULL DEFAULT 'PENDING',
    `tanggal` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `user_id` VARCHAR(191) NOT NULL,
    `psikolog_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jadwals` (
    `id` VARCHAR(191) NOT NULL,
    `psikolog_id` VARCHAR(191) NOT NULL,
    `jam_mulai` DATETIME(6) NOT NULL,
    `jam_selesai` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transaksis` ADD CONSTRAINT `transaksis_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaksis` ADD CONSTRAINT `transaksis_psikolog_id_fkey` FOREIGN KEY (`psikolog_id`) REFERENCES `psikologs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jadwals` ADD CONSTRAINT `jadwals_psikolog_id_fkey` FOREIGN KEY (`psikolog_id`) REFERENCES `psikologs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `carteiraId` on the `Transacao` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `Transacao` table. All the data in the column will be lost.
  - Added the required column `carteiraDestinoId` to the `Transacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carteiraOrigemId` to the `Transacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataDevolucao` to the `Transacao` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transacao" DROP CONSTRAINT "Transacao_carteiraId_fkey";

-- AlterTable
ALTER TABLE "Carteira" ALTER COLUMN "saldo" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Transacao" DROP COLUMN "carteiraId",
DROP COLUMN "tipo",
ADD COLUMN     "carteiraDestinoId" TEXT NOT NULL,
ADD COLUMN     "carteiraOrigemId" TEXT NOT NULL,
ADD COLUMN     "dataDevolucao" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "devolucao" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Transacao" ADD CONSTRAINT "Transacao_carteiraOrigemId_fkey" FOREIGN KEY ("carteiraOrigemId") REFERENCES "Carteira"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transacao" ADD CONSTRAINT "Transacao_carteiraDestinoId_fkey" FOREIGN KEY ("carteiraDestinoId") REFERENCES "Carteira"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - The primary key for the `Ratings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Ratings` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,butterflyId]` on the table `Ratings` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Ratings" DROP CONSTRAINT "Ratings_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "Ratings_userId_butterflyId_key" ON "Ratings"("userId", "butterflyId");

-- AlterTable
ALTER TABLE "Users" RENAME CONSTRAINT "User_pkey" TO "Users_pkey";

-- CreateTable
CREATE TABLE "Ratings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "butterflyId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "Ratings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ratings" ADD CONSTRAINT "Ratings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ratings" ADD CONSTRAINT "Ratings_butterflyId_fkey" FOREIGN KEY ("butterflyId") REFERENCES "Butterflies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "User_username_key" RENAME TO "Users_username_key";

-- DropForeignKey
ALTER TABLE "Ratings" DROP CONSTRAINT "Ratings_butterflyId_fkey";

-- DropForeignKey
ALTER TABLE "Ratings" DROP CONSTRAINT "Ratings_userId_fkey";

-- AddForeignKey
ALTER TABLE "Ratings" ADD CONSTRAINT "Ratings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ratings" ADD CONSTRAINT "Ratings_butterflyId_fkey" FOREIGN KEY ("butterflyId") REFERENCES "Butterflies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

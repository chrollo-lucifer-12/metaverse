/*
  Warnings:

  - You are about to drop the column `elementsId` on the `spaceElements` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "spaceElements" DROP CONSTRAINT "spaceElements_elementsId_fkey";

-- AlterTable
ALTER TABLE "spaceElements" DROP COLUMN "elementsId";

-- AddForeignKey
ALTER TABLE "spaceElements" ADD CONSTRAINT "spaceElements_elementId_fkey" FOREIGN KEY ("elementId") REFERENCES "Elements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

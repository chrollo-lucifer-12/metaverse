/*
  Warnings:

  - Made the column `imageUrl` on table `Avatar` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Avatar` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `creatorId` to the `Space` table without a default value. This is not possible if the table is not empty.
  - Made the column `avatarId` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `elementId` on table `mapElements` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `elementsId` to the `spaceElements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Avatar" ALTER COLUMN "imageUrl" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "Space" ADD COLUMN     "creatorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "avatarId" SET NOT NULL;

-- AlterTable
ALTER TABLE "mapElements" ALTER COLUMN "elementId" SET NOT NULL;

-- AlterTable
ALTER TABLE "spaceElements" ADD COLUMN     "elementsId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Avatar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Space" ADD CONSTRAINT "Space_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spaceElements" ADD CONSTRAINT "spaceElements_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spaceElements" ADD CONSTRAINT "spaceElements_elementsId_fkey" FOREIGN KEY ("elementsId") REFERENCES "Elements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mapElements" ADD CONSTRAINT "mapElements_elementId_fkey" FOREIGN KEY ("elementId") REFERENCES "Elements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mapElements" ADD CONSTRAINT "mapElements_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

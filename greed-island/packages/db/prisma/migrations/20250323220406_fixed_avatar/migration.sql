/*
  Warnings:

  - Added the required column `idleJson` to the `Avatar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl2` to the `Avatar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `runningJson` to the `Avatar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Avatar" ADD COLUMN     "idleJson" JSONB NOT NULL,
ADD COLUMN     "imageUrl2" TEXT NOT NULL,
ADD COLUMN     "runningJson" JSONB NOT NULL;

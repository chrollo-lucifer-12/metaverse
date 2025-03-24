/*
  Warnings:

  - Added the required column `name` to the `Elements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Elements" ADD COLUMN     "name" TEXT NOT NULL;

/*
  Warnings:

  - You are about to drop the column `email` on the `Publication` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Publication` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Publication` table. All the data in the column will be lost.
  - You are about to drop the column `presentation` on the `Publication` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Publication` table. All the data in the column will be lost.
  - Added the required column `description` to the `Publication` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Publication.email_unique";

-- AlterTable
ALTER TABLE "Publication" DROP COLUMN "email",
DROP COLUMN "gender",
DROP COLUMN "name",
DROP COLUMN "presentation",
DROP COLUMN "username",
ADD COLUMN     "description" VARCHAR(200) NOT NULL,
ALTER COLUMN "latLng" DROP NOT NULL,
ALTER COLUMN "latLng" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "model" TEXT,
ADD COLUMN     "price" TEXT,
ADD COLUMN     "source" TEXT,
ALTER COLUMN "link" DROP NOT NULL;

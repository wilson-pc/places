-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_publicationId_fkey";

-- DropForeignKey
ALTER TABLE "CommentResponse" DROP CONSTRAINT "CommentResponse_commentId_fkey";

-- DropForeignKey
ALTER TABLE "Items" DROP CONSTRAINT "Items_publicationId_fkey";

-- DropForeignKey
ALTER TABLE "PostLike" DROP CONSTRAINT "PostLike_publicationId_fkey";

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("publicationId") REFERENCES "Publication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentResponse" ADD FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLike" ADD FOREIGN KEY ("publicationId") REFERENCES "Publication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items" ADD FOREIGN KEY ("publicationId") REFERENCES "Publication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

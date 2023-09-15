import { createUploadthing, type FileRouter } from "uploadthing/next";
import { currentUser } from '@clerk/nextjs';

const file = createUploadthing();
const auth = async () => await currentUser();

export const ourFileRouter = {
  media: file({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const user = await auth()

      if (!user) throw new Error("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.info("Upload complete for userId:", metadata.userId);
      console.info("file url", file.url);
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;
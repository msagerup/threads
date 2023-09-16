// export const runtime = 'edge'; // 'nodejs' is the default
// export const preferredRegion = 'fra1'; // Frankfurt, Germany

import { createNextRouteHandler } from "uploadthing/next";
 
import { ourFileRouter } from "./core";
 
// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});
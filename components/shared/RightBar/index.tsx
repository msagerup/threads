import { Suspense } from "react";

import Spinner from "../Spinner";
import SuggestedCommunities from "../SuggestedCommunities";
import SuggestedUsers from "../SuggestedUsers";

const RightSideBar = async () => {
  return (
    <section className='costum-scrollbar rightsidebar w-[300px]'>
      <div className='flex flex-1 flex-col justify-start'>
        <Suspense fallback={<Spinner isComponent={true} />}>
          <SuggestedCommunities />
        </Suspense>
        <Suspense fallback={<Spinner isComponent={true} />}>
          <SuggestedUsers />
        </Suspense>
      </div>   
    </section>
  );
};

export default RightSideBar;

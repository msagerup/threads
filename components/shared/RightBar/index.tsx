import { Suspense } from "react";

import Spinner from "../Spinner";
import SuggestedCommunities from '../SuggestedCommunities';
import SuggestedUsers from '../SuggestedUsers';

const RightSideBar = async () => {
  return (
    <section className='costum-scrollbar rightsidebar w-[300px]'>
      <div className='flex flex-1 flex-col justify-start'>
        <h3 className='text-heading4-medium text-light-1'>
          <Suspense fallback={<Spinner isComponent={true}/>}>
            <SuggestedCommunities/>
          </Suspense>
        </h3>
      </div>
      <div className='flex flex-1 flex-col justify-start'>
        <h3 className='text-heading4-medium text-light-1'>
          <Suspense fallback={<Spinner isComponent={true}/>}>
            <SuggestedUsers />
          </Suspense>
        </h3>
      </div>
    </section>
  );
};

export default RightSideBar;

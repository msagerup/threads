import { Suspense } from "react";
import Spinner from "../Spinner";
import dynamic from 'next/dynamic';

//Code splitting
const SuggestedCommunities = dynamic(() => import('../SuggestedCommunities')); 
const SuggestedUsers = dynamic(() => import('../SuggestedUsers'));

const RightSideBar = async () => {
  return (
    <section className='costum-scrollbar rightsidebar w-[300px]'>
      <div className='flex flex-1 flex-col justify-start'>
        <Suspense fallback={<Spinner isComponent={true} size={30}/>}>
          <SuggestedCommunities />
        </Suspense>
        <Suspense fallback={<Spinner isComponent={true} size={30}/>}>
          <SuggestedUsers />
        </Suspense>
      </div>   
    </section>
  );
};

export default RightSideBar;

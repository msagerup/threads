import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
import { fetchCommunities } from "@/lib/actions/community.actions";
import { Separator } from '@/components/ui/separator';
import SearchBar from '@/components/shared/SearchBar';
import dynamic from 'next/dynamic';
import Pagination from '@/components/shared/Pagination';

// Code Splitting 
const CommunityCard = dynamic(() => import('@/components/cards/CommunityCard'))

async function Communities({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchCommunities({
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  return (
    <>
       <header className='mb-10'>
        <h1 className='head-text'>Communities</h1>
        <Separator className='separator' />
        <div className='text-subtle-large text-gray-1 '>
          Find your gang of stitchers 
        </div>
      </header>

      <div className='mb-5'>
        <SearchBar routeType='communities' />
      </div>
      <Separator className='separator' />

      <section className='mt-9 flex flex-wrap gap-4'>
        {result.communities.length === 0 ? (
          <p className='no-result'>No Result</p>
        ) : (
          <>
            {result.communities.map((community) => (
              <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                bio={community.bio}
                members={community.members}
              />
            ))}
          </>
        )}
      </section>

      <Pagination
        path='communities'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </>
  );
}

export default Communities;

import { fetchCommunities } from "@/lib/actions/community.actions";
import dynamic from 'next/dynamic';

// Code splitting 
const CommunityCard = dynamic(() => import('@/components/cards/CommunityCard'))

const SuggestedCommunities = async () => {
  const result = await fetchCommunities({});

  if (!result) return <p className='no-result'>No Result</p>;

  return (
    <section className='mt-8 flex flex-wrap gap-2'>
      <header className='px-4'>
        <h2 className='text-light-1'>Popular communities</h2>
      </header>
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
  );
};

export default SuggestedCommunities;

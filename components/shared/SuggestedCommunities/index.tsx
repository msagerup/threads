import CommunityCard from "@/components/cards/CommunityCard";
import { fetchCommunities } from "@/lib/actions/community.actions";

const SuggestedCommunities = async () => {
  const result = await fetchCommunities({});

  if (!result) return <p className='no-result'>No Result</p>;

  return (
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
  );
};

export default SuggestedCommunities;

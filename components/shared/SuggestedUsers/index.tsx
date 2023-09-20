import CommunityCard from "@/components/cards/CommunityCard";
import UserCard from "@/components/cards/UserCard";
import { fetchUsers } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";

const SuggestedUsers = async () => {
  const { userId } = auth();

  const result = await fetchUsers({
    userId: userId ? userId : "",
    searchString: "",
    pageNumber: 1,
    pageSize: 10,
  });

  if (!result)
    return <p className='!text-base-regular text-light-3'>No results found</p>;

  return (
    <section className='mt-9 flex flex-wrap gap-4'>
       <header className='px-4'>
        <h2 className='text-light-1'>Active users</h2>
      </header>
      {result.query.length === 0 ? (
        <p className='!text-base-regular text-light-3'>No results found</p>
      ) : (
        <>
          {result.query.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </>
      )}
    </section>
  );
};

export default SuggestedUsers;

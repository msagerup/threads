import UserCard from '@/components/cards/UserCard';
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { userData } from "@/types";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Search = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }
  const userInfo: userData = await fetchUser(user.id);

  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  const searchResult = await fetchUsers({
    userId: userInfo.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 10,
  });


  return (
    <section>
      <h1 className='head-text mb-10'>Search</h1>
      <div className='mt-14 flex flex-col gap-9'>
        {searchResult.query.length === 0 ? (
          <p className='!text-base-regular text-light-3'>No results found</p>
        ) : (
          <>
            {searchResult.query.map((user) => (
              <UserCard key={user._id.toString()} user={user} />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Search;

import UserCard from "@/components/cards/UserCard";
import Spinner from "@/components/shared/Spinner";
import { fetchUsers } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const Search = async () => {
  const { userId } = auth();

 if(!userId) {  
   redirect("/sign-in");
 }

  const searchResult = await fetchUsers({
    userId: userId,
    searchString: "",
    pageNumber: 1,
    pageSize: 10,
  });

  return (
    <section>
      <h1 className='head-text mb-10'>Search</h1>
      <Suspense fallback={<Spinner />}>
        <div className='mt-14 flex flex-col gap-9'>
          {searchResult.query.length === 0 ? (
            <p className='!text-base-regular text-light-3'>No results found</p>
          ) : (
            <>
              {searchResult.query.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </>
          )}
        </div>
      </Suspense>
    </section>
  );
};

export default Search;

import UserCard from "@/components/cards/UserCard";
import SearchBar from '@/components/shared/SearchBar';
import Spinner from "@/components/shared/Spinner";
import { Separator } from "@/components/ui/separator";
import { fetchUsers } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const Search = async({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const searchResult = await fetchUsers({
    userId: userId,
    searchString: searchParams.q,
    pageNumber: 1,
    pageSize: 10,
  });

  return (
    <section>
      <header className='mb-10'>
        <h1 className='head-text'>Search users</h1>
        <Separator className='separator' />
        <div className='text-subtle-large text-gray-1 '>
          Who ya looking for?
        </div>
      </header>
      <Suspense fallback={<Spinner />}>
      <div className='mb-5'>
        <SearchBar routeType='search' />
      </div>
      <Separator className='separator' />
        <div className='mt-9 flex flex-wrap gap-4'>
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

import {Metadata} from 'next';
import Table from '@/app/ui/customers/table';
import {lusitana} from '@/app/ui/fonts';
import {fetchCustomersPages} from '@/app/lib/data';
import Search from '@/app/ui/search';
import Pagination from '@/app/ui/pagination';

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page || 1);

  const totalPages = await fetchCustomersPages(query);

  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>Customers</h1>
      <Search placeholder="Search customers..." />
      <Table
        currentPage={currentPage}
        query={query}
      />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

"use client";

import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import { useSearchVideoQuery } from "@/redux/api/videoApi";
import { useRouter, useSearchParams } from "next/navigation";

const PageResult = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const { data: searchResults, isFetching } = useSearchVideoQuery(
    searchQuery as string,
    {
      skip: !searchQuery,
    }
  );

  console.log("searchResults: ", searchResults);

  if (isFetching) {
    return <div>Đang tải...</div>;
  }

  // if (!searchResults || searchResults.length === 0) {
  //   return <div>Không tìm thấy video nào.</div>;
  // }
  return <LayoutDefault>Kết quả tìm kiếm</LayoutDefault>;
};

export default PageResult;

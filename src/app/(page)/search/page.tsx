"use client";

import VideoCard from "@/components/card/VideoCard";
import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import CardVideoSkeleton from "@/components/skeleton/CardVideoSkelenton";
import { useSearchVideoQuery } from "@/redux/api/videoApi";
import { Col, Row } from "antd";
import { useRouter, useSearchParams } from "next/navigation";

const PageResult = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("q");

  const { data: searchResults, isLoading } = useSearchVideoQuery(
    searchTerm || "",
    {
      skip: !searchTerm,
    }
  );

  console.log("Search results for term:", searchTerm, searchResults?.results);

  return (
    <LayoutDefault>
      <Row gutter={[18, 48]}>
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <Col key={index} xs={24} sm={12} lg={8} xl={8} xxl={6}>
              <CardVideoSkeleton />
            </Col>
          ))
        ) : searchResults && searchResults.results?.length > 0 ? (
          searchResults?.results?.map((item: any) => (
            <Col key={item._id} xs={24} sm={12} lg={8} xl={8} xxl={6}>
              <VideoCard item={item} />
            </Col>
          ))
        ) : (
          <p>
            Không tìm thấy video cho từ khóa{" "}
            <strong>&ldquo;{searchTerm}&rdquo;</strong>
          </p>
        )}
      </Row>
    </LayoutDefault>
  );
};

export default PageResult;

import { useEffect, useRef, useCallback } from "react";

export interface InfiniteScrollProps {
  hasMore: boolean;
  isLoading: boolean;
  loadMore: () => void;
}

export const useInfiniteScroll = ({
  hasMore,
  isLoading,
  loadMore,
}: InfiniteScrollProps) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoading) {
        loadMore();
      }
    },
    [hasMore, isLoading, loadMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "30px",
      threshold: 1.0,
    });

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [handleObserver]);

  return loaderRef;
};

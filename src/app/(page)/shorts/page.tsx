import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import VideoShortCard from "@/components/card/VideoShortCard";

const ShortPage = () => {
  return (
    <LayoutDefault>
      <div
        className="flex justify-center py-3 items-center flex-col gap-[40px] min-h-[100vh] overflow-y-auto scroll-snap-y"
        style={{
          scrollSnapType: "y mandatory",
          scrollBehavior: "smooth",
        }}
      >
        {Array.from({ length: 10 }, (_, index) => (
          <div
            key={index}
            className="flex justify-center w-full scroll-snap-align-center"
            style={{
              scrollSnapAlign: "center",
              scrollMarginTop: "50px",
            }}
          >
            <VideoShortCard />
          </div>
        ))}
      </div>
    </LayoutDefault>
  );
};

export default ShortPage;

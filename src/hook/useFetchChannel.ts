import {
  useCheckSubCriptionQuery,
  useGetChannelSubscribersCountQuery,
} from "@/redux/api/subcription";
import { useGetChannelVideoCountQuery } from "@/redux/api/videoApi";

const useFetchChannelData = (channelId: string) => {
  const { data: subscriptionStatus } = useCheckSubCriptionQuery(channelId, {
    skip: !channelId,
  });
  const { data: videoCount } = useGetChannelVideoCountQuery(channelId, {
    skip: !channelId,
  });
  const { data: subscribersCount } = useGetChannelSubscribersCountQuery(
    channelId,
    { skip: !channelId }
  );

  return {
    subscriptionStatus: subscriptionStatus?.subscribed || false,
    videoCount: videoCount?.count || 0,
    subscribersCount: subscribersCount?.count || 0,
  };
};

export default useFetchChannelData;

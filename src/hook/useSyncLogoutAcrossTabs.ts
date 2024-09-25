import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useSyncLogoutAcrossTabs = () => {
  const router = useRouter();

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (
        event.storageArea === localStorage &&
        event.key === "authToken" &&
        !event.newValue
      ) {
        router.push("/");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [router]);
};

export default useSyncLogoutAcrossTabs;

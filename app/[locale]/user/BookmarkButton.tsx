"use client";
import { useBookmark } from "@/contexts/BookmarkContext";
import { Button } from "@/components/ui/button";
import { BookmarkIcon } from "lucide-react";
import { motion } from "framer-motion";
import { AXIOS } from "@/utils/axiosInstance";
import { toast } from "sonner";

const BookmarkButton = () => {
  const { bookmarkedOrders } = useBookmark();
  console.log("🚀 ~ BookmarkButton ~ bookmarkedOrders:", bookmarkedOrders);

  const prepareApiData = () => {
    const orderIds = Array.from(bookmarkedOrders);
    return {
      order_ids: orderIds,
    };
  };

  const handleSaveBookmark = async () => {
    const data = prepareApiData();
    console.log("🚀 ~ handleSaveBookmark ~ data:", data);
    const response = await AXIOS.post("/users/createAddlist", data);
    const result = response.data;
    toast.success(result.data.message);
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{
        y: bookmarkedOrders.size > 0 ? 0 : 100,
        opacity: bookmarkedOrders.size > 0 ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed bottom-4 left-0 right-0 flex justify-center"
    >
      <Button
        variant="default"
        className="w-[95%] bg-black text-white rounded-lg py-3 text-lg font-semibold"
        onClick={handleSaveBookmark} // Replace with actual navigation or action
      >
        <BookmarkIcon className="mr-2 size-5" />
        View Bookmarks ({bookmarkedOrders.size})
      </Button>
    </motion.div>
  );
};

export default BookmarkButton;

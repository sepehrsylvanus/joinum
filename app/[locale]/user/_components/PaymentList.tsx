"use client";
import PaymentItem from "@/app/[locale]/user/_components/PaymentItem";
import React, { useState } from "react";
import { useBookmark } from "@/contexts/BookmarkContext";

export default function PaymentList({ orders = [] }: { orders: Orders }) {
  const { bookmarkedOrders, toggleBookmark } = useBookmark();

  return (
    <div className="grid gap-2">
      {orders.length > 0 &&
        orders.map((order) => {
          return (
            <PaymentItem
              key={order.id}
              onToggleBookmark={() => toggleBookmark(order.id)}
              order={order}
            />
          );
        })}
    </div>
  );
}

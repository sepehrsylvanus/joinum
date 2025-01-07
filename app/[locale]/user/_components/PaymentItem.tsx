"use client"
import {BookmarkIcon, CircleDollarSign, UserCircle} from "lucide-react";
import {Button} from "@/components/ui/button";
import {execOnce} from "next/dist/shared/lib/utils";
import React, {useState} from "react";
import {useBookmark} from "@/contexts/BookmarkContext";


export default function PaymentItem({order}: { order: Order;}) {
    const { bookmarkedOrders, toggleBookmark } = useBookmark();
    if(!order) return;
    const isBookmarked = bookmarkedOrders.has(order.id);

    return (
        <div className="flex items-center justify-between gap-2">
            <div className="flex flex-1 items-center gap-4 rounded-xl bg-muted p-2">
                <UserCircle className="size-5"/>
                <span className="text-sm">{order.link}</span>
            </div>
            <Button  onClick={() => toggleBookmark(order.id)}
                     className={`rounded-xl px-2 py-1 `} variant={'secondary'} size={'icon'}>
                <BookmarkIcon
                    className={`size-4 ${ isBookmarked ? 'text-white' : ''}`}
                   style={{fill:`${isBookmarked ? '#3b82f6' : ''}`,stroke:`${isBookmarked ? '#3b82f6' : ''}` }}
                />
            </Button>
            <div className="flex items-center gap-4 rounded-xl bg-muted p-2 text-center">
                <CircleDollarSign className="size-5"/>
                <span className="text-sm">{order.income}</span>
            </div>
        </div>
    );
}
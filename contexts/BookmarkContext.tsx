"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define types for context
type BookmarkContextType = {
    bookmarkedOrders: Set<number>;
    toggleBookmark: (orderId: number) => void;
    reset: ()=>void;
};

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

// Provider Component
export function BookmarkProvider({ children }: { children: ReactNode }) {
    const [bookmarkedOrders, setBookmarkedOrders] = useState<Set<number>>(new Set());

    const toggleBookmark = (orderId: number) => {
        setBookmarkedOrders((prev) => {
            const updatedBookmarks = new Set(prev);
            if (updatedBookmarks.has(orderId)) {
                updatedBookmarks.delete(orderId);
            } else {
                updatedBookmarks.add(orderId);
            }
            return updatedBookmarks;
        });
    };

    const reset =()=>{
        setBookmarkedOrders(new Set())
    }

    return (
        <BookmarkContext.Provider value={{ bookmarkedOrders, toggleBookmark,reset }}>
            {children}
        </BookmarkContext.Provider>
    );
}

// Custom hook to use BookmarkContext
export function useBookmark() {
    const context = useContext(BookmarkContext);
    if (!context) {
        throw new Error("useBookmark must be used within a BookmarkProvider");
    }
    return context;
}

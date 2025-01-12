"use client";

import { useEffect, useRef } from "react";

export default function InfiniteScroll({
  loadMore,
  hasMore,
  children,
  loading,
}) {
  const observerRef = useRef(null);

  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loadMore, hasMore]);

  return (
    <div>
      {children}
      {hasMore && <div ref={observerRef} className="h-1 bg-white" />}
    </div>
  );
}

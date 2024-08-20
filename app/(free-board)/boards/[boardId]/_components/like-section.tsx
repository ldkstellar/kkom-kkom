"use client";

import { LikeCountSection } from "@/app/(free-board)/_components/card";
import { useHandleArticleLikeMutation } from "@/app/(free-board)/_query/mutation";
import { useArticleQuery } from "@/app/(free-board)/_query/query";
import Button from "@/components/button/button";
import LikeButtonColored from "@/public/icons/like-button-colored";

interface LikeSectionProps {
  articleId: number;
}

export default function LikeSection({ articleId }: LikeSectionProps) {
  const { data, isFetching } = useArticleQuery(articleId);
  const { mutate, isPending } = useHandleArticleLikeMutation();
  if (!data) return null;
  const { likeCount, isLiked } = data;
  const handleClick = () => {
    if (isFetching || isPending) {
      alert(
        "공감/비공감 후 일정시간 동안 추가적인 공감/비공감을 제한하고 있습니다.",
      );
      return;
    }
    mutate({ articleId, isLiked: isLiked });
  };

  return (
    <>
      <Button
        btnSize="large"
        btnStyle="outlined_secondary"
        className="mb-8 w-[94px] hover:bg-text-secondary md:mb-10 md:w-[140px]"
        onClick={handleClick}
      >
        <section
          className={`flex items-center gap-1 overflow-visible text-sm font-normal leading-4 text-text-disabled`}
        >
          <LikeButtonColored size={24} isClicked={isLiked} />
          Like {likeCount > 9999 ? "9999+" : likeCount}
        </section>
      </Button>
    </>
  );
}

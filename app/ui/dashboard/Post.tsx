import FormatDate from "@/app/components/FormatDate";
import PostImage from "@/app/components/PostImage";
import React from "react";

async function fetchPost() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WEB_URL}/api/get-post-new`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function Post({ dict }: any) {
  const post = await fetchPost();
  return (
    <div className="w-[85%] h-[85%] short:w-[85%] lg:w-[80%] short:h-[85%] lg:h-[80%] flex flex-col items-center short:items-center lg:items-center">
      {post && post[0] && (
        <div className="flex flex-col items-center short:flex lg:block">
          <div className="text-xl short:text-xl lg:text-2xl mb-3 xs:mb-6">
            {dict.post.title}
          </div>
          <div className="flex flex-col items-center xs:block">
            <div className="flex flex-col xs:flex-row items-center short:mb-0 lg:mb-6 gap-3 min-h-[100px]">
              <div className="w-[110px] h-[60px] xs:w-[140px] xs:h-[80px] relative flex justify-center">
                <PostImage source={post[0].image} />
              </div>

              <div className="flex flex-col items-center xs:block text-center xs:text-left">
                <div className="text-lg xs:text-xl short:text-lg lg:text-2xl text-mainTheme mb-1">
                  {post[0]?.title}
                </div>
                <div className="text-[#777] text-xs short:text-xs lg:text-lg">
                  {post[0]?.author}
                </div>
              </div>
            </div>
            <div className="text-xs short:text-xs lg:text-lg">
              {post[0]?.createdAt && FormatDate(post[0].createdAt, dict)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

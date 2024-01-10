"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function NewPost() {
  const [file, setFile] = useState<File | null>(null);
  const [media, setMedia] = useState<string>("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { id } = useParams();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const { data: session }: any = useSession();

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsSubmitting(true);

    const title = e.target[0].value;
    const content = e.target[1].value;
    const image =
      media ||
      "https://static-00.iconduck.com/assets.00/no-image-icon-2048x2048-2t5cx953.png";

    try {
      const res = await fetch(`/api/edit-post?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, image, session }),
      });

      if (!res.ok) {
        res.json().then((e) => {
          console.log(e);
        });
      }
      if (res.status === 200) {
        router.push("/admin-cp/posts");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const fetchPostDetails = async () => {
    if (!id) {
      return router.push("/admin-cp/posts");
    }
    try {
      const response = await fetch(`/api/single-post?id=${id}`);
      if (response.ok) {
        const data = await response.json();
        setTitle(data.title);
        setContent(data.content);
        setMedia(data.image);
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, []);

  useEffect(() => {
    const upload = async () => {
      if (file) {
        const storage = getStorage(app);
        const name = new Date().getTime() + file.name;
        const storageRef = ref(storage, name);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {},
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setMedia(downloadURL);
            });
          }
        );
      }
    };
    upload();
  }, [file]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.value = content;
      adjustTextareaHeight();
    }
  }, [content]);
  return (
    <main className="flex h-screen">
      <div className="my-[25px] flex w-screen flex-col justify-center items-center">
        <div className="w-[90%] min-h-[100%] flex mb-5">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 w-full mt-5 lg:mt-0"
          >
            <input
              defaultValue={title}
              className="bg-inherit text-3xl lg:text-5xl mt-10 placeholder:text-[#999] focus:outline-none"
              type="text"
              placeholder="Title"
              required
            />
            <textarea
              defaultValue={content}
              ref={textareaRef}
              className="bg-inherit text-lg lg:text-2xl placeholder:text-[#999] focus:outline-none resize-none"
              placeholder="Content"
              onInput={adjustTextareaHeight}
              required
            />
            <div>
              <input
                type="file"
                id="image"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="flex">
                <label className="w-[50px] relative" htmlFor="image">
                  <PlusCircleIcon className="w-10 cursor-pointer" />
                </label>
              </div>
              <div className="select-none my-5">
                {media && (
                  <Image src={media} alt="img" width={100} height={100} />
                )}
              </div>

              <button
                className="bg-white text-black rounded-xl px-3 py-2 hover:brightness-50 transition-all select-none"
                disabled={isSubmitting}
                type="submit"
              >
                Edit post
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

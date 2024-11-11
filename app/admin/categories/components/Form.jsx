"use client";

import { createCategory } from "@/lib/firestore/categories/read";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Form() {
  const [data, setData] = useState(null);
  const [image, setImage] = useState(null);

  const handleData = (key, value) => {
    setData((prevData) => {
      return {
        ...(prevData ?? {}),
        [key]: value,
      };
    });
  };

  const handleSubmit = async () => {
try {
  await createCategory({data: data, image: image});
} catch (error) {
  toast.error(error?.message)
}
  }

  return (
    <div className="flex flex-col gap-3 bg-white rounded-xl p-5 w-full md:w-[400px]">
      <h1 className="font-semibold">Add Category</h1>
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="category-image" className="text-gray-500 text-sm">
            Image<span className="text-red-500">*</span>
          </label>
          <div className="flex justify-center items-center">
          {image && <img src={URL.createObjectURL(image)} alt="" className="h-32"/>}
          </div>
          <input
            type="file"
            id="category-image"
            name="category-image"
            className="border px-4 py-2 rounded-lg w-full focus:outline"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                setImage(e.target.files[0]);
              }
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="category-name" className="text-gray-500 text-sm">
            Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="category-name"
            name="category-name"
            placeholder="Enter Category"
            className="border px-4 py-2 rounded-lg w-full focus:outline"
            value={data?.name ?? ""}
            onChange={(e) => {
              handleData("name", e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="category-slug" className="text-gray-500 text-sm">
            Slug<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="category-slug"
            name="category-slug"
            placeholder="Enter Slug"
            className="border px-4 py-2 rounded-lg w-full focus:outline"
            value={data?.slug ?? ""}
            onChange={(e) => {
              handleData("slug", e.target.value);
            }}
          />
        </div>
        <Button color="primary" type="submit">
          Add Category
        </Button>
      </form>
    </div>
  );
}

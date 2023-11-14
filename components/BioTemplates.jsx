"use client";

import { useBioFormContext } from "@app/context/BioProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BioTemplates = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const router = useRouter();
  const { bioFormData, bioFormDataHandler } = useBioFormContext();

  const templateList = [
    {
      headTextColor: "",
      image: "/assets/images/dymmyTemplate.jpg",
    },
    {
      headTextColor: "",
      image: "/assets/images/bio.png",
    },
    {
      headTextColor: "",
      image: "/assets/images/template3.png",
    },
    {
      headTextColor: "",
      image: "/assets/images/template4.png",
    },
    {
      headTextColor: "",
      image: "/assets/images/template5.png",
    },
    {
      headTextColor: "",
      image: "/assets/images/template6.png",
    },
  ];

  const onDesignSelect = ({ headTextColor, image }) => {
    const stateData = {
      ...bioFormData,
      templateImage: image,
      templateHeadTextColor: headTextColor,
    };
    bioFormDataHandler(stateData);
    router.push("/create");
  };

  return (
    <div className="flex flex-wrap -m-4 mb-10">
      {templateList.map((data, index) => (
        <div
          className=" w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 gap-3"
          key={index}
        >
          <div
            className="flex-1 flex justify-start items-center cursor-pointer"
            onClick={() => onDesignSelect(data)}
          >
            <Image
              src={data.image}
              alt="Bio Template"
              width={300}
              height={380}
              className="object-contain"
            />
          </div>

          <div className="mt-2 flex-center gap-4 border-t border-gray-100 pt-3">
            <button
              className="px-5 py-1.5 text-sm bg-gray-500 rounded-full text-white cursor-pointer"
              title="View & Edit"
              onClick={() => onDesignSelect(data)}
            >
              Edit Design
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BioTemplates;

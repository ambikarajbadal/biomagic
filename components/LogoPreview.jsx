import Image from "next/image";
import { FaEdit, FaPlusCircle, FaTrash } from "react-icons/fa";

const LogoPreview = ({ onEdit, onDelete, imgSrc }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      {imgSrc ? (
        <div className="block bg-white p-4 rounded-full shadow-lg relative">
          <div className="relative w-24 h-24 rounded-full overflow-hidden">
            <Image
              src={imgSrc}
              width={96}
              height={96}
              alt="Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      ) : (
        <p>Add Logo..</p>
      )}
      <div className=" flex space-x-8 top-full p-2 gap-2">
        {imgSrc ? (
          <>
            <FaEdit
              className="text-gray-600 cursor-pointer"
              title="Change Image"
              onClick={onEdit}
            />

            <FaTrash
              className="text-red-600 cursor-pointer"
              onClick={onDelete}
              title="Delete Image"
            />
          </>
        ) : (
          <FaPlusCircle
            className="text-gray-600 cursor-pointer"
            onClick={onEdit}
            title="Add Image"
          />
        )}
      </div>
    </div>
  );
};

export default LogoPreview;

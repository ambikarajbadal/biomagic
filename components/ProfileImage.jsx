import Image from "next/image";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProfileImage = ({ imgSrc, onChange, onDelete }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="block bg-white p-4 shadow-lg relative">
      <label htmlFor="imageInput" className="cursor-pointer">
        <div className="relative w-24 h-24 overflow-hidden">
          <Image
            src={imgSrc || "/assets/images/profileIcon.png"}
            width={96}
            height={96}
            alt="profile"
            className="w-full h-full object-cover"
          />
          <input
            type="file"
            id="imageInput"
            className="hidden"
            accept="image/*"
            onChange={onChange}
          />
          {/* <div className="absolute top-10 right-0 flex space-x-2 p-2">
            <FaEdit className="text-gray-600 cursor-pointer" />
            <FaTrash className="text-red-600 cursor-pointer" />
          </div> */}
        </div>
      </label>
      <div className="absolute flex space-x-8 top-full p-2 gap-2">
        <FaEdit className="text-gray-600 cursor-pointer" />
        <FaTrash className="text-red-600 cursor-pointer" onClick={onDelete} />
      </div>
    </div>
  );
};

export default ProfileImage;

"use client";
import { ImageCropper } from "./ImageCropper";

export const ImageCropperModal = ({ image, onCropComplete, onClose }) => {
  console.log({ image });
  return (
    <div className="flex relative">
      <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-slate-400 bg-opacity-50 h-1/4 p-10">
        <div className="p-4 rounded-md max-w-md w-full relative h-full">
          <ImageCropper image={image} onCropComplete={onCropComplete} />
        </div>
        <div className="mt-2">
          <div className="flex justify-between gap-2">
            <button className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white">
              Crop
            </button>
            <button
              className="px-5 py-1.5 text-sm bg-gray-500 rounded-full text-white"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

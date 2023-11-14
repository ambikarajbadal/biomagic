import { getCroppedImg } from "@utils/utils";
import { useState } from "react";
import Cropper from "react-easy-crop";

export const ImageCropper = ({ image, onCropComplete, onClose }) => {
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const handleCropComplete = async (croppedArea, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const getFinalCroppedImage = async (e) => {
    e.preventDefault();
    const croppedImage = await getCroppedImg(image, croppedArea);
    onCropComplete(croppedImage);
  };

  return (
    <div className="flex relative">
      <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-slate-400 bg-opacity-50 h-1/4 p-10">
        <div className="p-4 rounded-md max-w-md w-full relative h-full">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1} // You can set the aspect ratio here
            onCropChange={onCropChange}
            onCropComplete={handleCropComplete}
            onZoomChange={onZoomChange}
          />{" "}
        </div>
        <div className="mt-2">
          <div className="flex justify-between gap-2">
            <button
              className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
              onClick={getFinalCroppedImage}
            >
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

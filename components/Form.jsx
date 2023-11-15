"use client";
import { useBioFormContext } from "@app/context/BioProvider";
import {
  BLOOD_GROUP,
  FAIR,
  HEIGHT,
  MANGLIK,
  NAKSHATRA,
  RASHI,
} from "@utils/constant";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { BirthTimeDropDown } from "./BirthTimeDropDown";
import { CustomModal } from "./CustomModal";
import DateMonthYear from "./DateMonthYear";
import Dropdown from "./Dropdown";
import { ImageCropper } from "./ImageCropper";
import InputField from "./InputField";
import LogoPreview from "./LogoPreview";
import ProfileImage from "./ProfileImage";
const logo1 = "/assets/images/1.png";
const logoList = [
  "/assets/images/1.png",
  "/assets/images/2.png",
  "/assets/images/3.jpeg",
  "/assets/images/4.png",
];

const Form = ({ type, handleSubmit }) => {
  const { bioFormData, bioFormDataHandler } = useBioFormContext();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  console.log({ mode });
  const [submitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageCropperOpen, setImageCropperOpen] = useState(false);
  const [errors, setErrors] = useState({});

  console.log({ bioFormData });

  const inputHandler = (key, value) => {
    const stateData = {
      ...bioFormData,
      [key]: value,
    };
    bioFormDataHandler(stateData);
  };

  const personalInfoInputChange = (index, field, newValue) => {
    if (field === "label" && newValue && newValue.length > 14) {
      alert(
        "The maximum characters limit reached. More than 14 characters not allowed in title."
      );
      return;
    }
    if (field === "value" && newValue && newValue.length > 44) {
      alert("The maximum characters limit reached.");
      return;
    }
    const updatedData = [...bioFormData.personalInfo];
    updatedData[index][field] = newValue;

    setErrors({
      ...errors,
      [updatedData[index]?.key]: "",
    });

    const stateData = {
      ...bioFormData,
      personalInfo: updatedData,
    };
    bioFormDataHandler(stateData);
  };

  const handleFamilyInputChange = (index, field, newValue) => {
    if (field === "label" && newValue && newValue.length > 14) {
      alert(
        "The maximum characters limit reached. More than 14 characters not allowed in title."
      );
      return;
    }
    if (field === "value" && newValue && newValue.length > 44) {
      alert("The maximum characters limit reached.");
      return;
    }

    const updatedData = [...bioFormData?.familyInfo];
    updatedData[index][field] = newValue;

    setErrors({
      ...errors,
      [updatedData[index]?.key]: "",
    });

    const stateData = {
      ...bioFormData,
      familyInfo: updatedData,
    };
    bioFormDataHandler(stateData);
  };

  const handleContactInputChange = (index, field, newValue) => {
    if (field === "label" && newValue && newValue.length > 14) {
      alert(
        "The maximum characters limit reached. More than 14 characters not allowed in title."
      );
      return;
    }
    if (field === "value" && newValue && newValue.length > 44) {
      alert("The maximum characters limit reached.");
      return;
    }
    const updatedData = [...bioFormData?.contactInfo];
    updatedData[index][field] = newValue;

    setErrors({
      ...errors,
      [updatedData[index]?.key]: "",
    });

    const stateData = {
      ...bioFormData,
      contactInfo: updatedData,
    };
    bioFormDataHandler(stateData);
  };

  const renderDropDown = (index, itemValue) => {
    const handleChange = (value) => {
      const updatedData = [...bioFormData.personalInfo];
      if (index === 1 || index === 2) {
        updatedData[index].value = { ...updatedData[index].value, ...value };
      } else {
        updatedData[index].value = value;
      }

      setErrors({
        ...errors,
        [updatedData[index]?.key]: "",
      });

      const stateData = {
        ...bioFormData,
        personalInfo: updatedData,
      };
      bioFormDataHandler(stateData);
    };
    switch (index) {
      case 1:
        return (
          <DateMonthYear
            handleChange={handleChange}
            value={itemValue}
            error={errors?.DOB}
          />
        );
      case 2:
        return (
          <BirthTimeDropDown
            handleChange={handleChange}
            value={itemValue}
            error={errors?.TOB}
          />
        );
      case 4:
        return (
          <Dropdown onSelect={handleChange} options={RASHI} value={itemValue} />
        );

      case 5:
        return (
          <Dropdown
            onSelect={handleChange}
            options={NAKSHATRA}
            value={itemValue}
          />
        );

      case 6:
        return (
          <Dropdown
            onSelect={handleChange}
            options={MANGLIK}
            value={itemValue}
          />
        );

      case 12:
        return (
          <Dropdown
            onSelect={handleChange}
            options={HEIGHT}
            value={itemValue}
          />
        );

      case 13:
        return (
          <Dropdown
            onSelect={handleChange}
            options={BLOOD_GROUP}
            value={itemValue}
          />
        );

      case 14:
        return (
          <Dropdown onSelect={handleChange} options={FAIR} value={itemValue} />
        );

      default:
        return (
          <Dropdown onSelect={handleChange} options={RASHI} value={itemValue} />
        );
    }
  };

  const modalOpenHandler = () => {
    setIsModalOpen(true);
  };
  const modalCloseHandler = () => {
    setIsModalOpen(false);
  };
  const logoDeleteHandler = () => {
    const stateData = {
      ...bioFormData,
      logoImage: "",
    };
    bioFormDataHandler(stateData);
    console.log("Logo Deleted!");
  };

  const logoSelectHandler = (logo) => {
    const stateData = {
      ...bioFormData,
      logoImage: logo,
    };
    bioFormDataHandler(stateData);
    modalCloseHandler();
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setImageCropperOpen(true);
    }
    e.target.value = null;
  };

  const handleCropComplete = (croppedImage) => {
    const stateData = {
      ...bioFormData,
      profileImage: croppedImage,
    };
    bioFormDataHandler(stateData);
    setSelectedImage(null);
    setImageCropperOpen(false);
  };

  const handleProfileImageDelete = () => {
    const stateData = {
      ...bioFormData,
      profileImage: "",
    };
    bioFormDataHandler(stateData);
  };

  const handleCropperClose = (e) => {
    e.preventDefault();
    setSelectedImage(null);
    setImageCropperOpen(false);
  };

  const checkValidation = () => {
    const dobObj = bioFormData.personalInfo[1].value; // Date of Birth Object
    const tobObj = bioFormData.personalInfo[2].value; // Time of Birth Object
    const newErrors = {};
    let hasErrors = false;
    let isValid = true;

    if (!dobObj.date || !dobObj.month || !dobObj.year) {
      newErrors.DOB = "Required";
      hasErrors = true;
    }

    if (!tobObj.hr || !tobObj.min || !tobObj.format) {
      newErrors.TOB = "Required";
      hasErrors = true;
    }

    for (let i = 0; i < bioFormData.personalInfo.length; i++) {
      const item = bioFormData.personalInfo[i];
      if (item?.isRequired && (!item.value || !item.label)) {
        newErrors[item.key] = "Required!";
        hasErrors = true;
      }
    }
    for (let i = 0; i < bioFormData.familyInfo.length; i++) {
      const item = bioFormData.familyInfo[i];
      if (item?.isRequired && (!item.value || !item.label)) {
        newErrors[item.key] = "Required!";
        hasErrors = true;
      }
    }

    for (let i = 0; i < bioFormData.contactInfo.length; i++) {
      const item = bioFormData.contactInfo[i];
      if (item?.isRequired && (!item.value || !item.label)) {
        newErrors[item.key] = "Required!";
        hasErrors = true;
      }
    }
    console.log({ newErrors });

    if (hasErrors) {
      setErrors(newErrors);
      return false; // isValid
    } else {
      return true; // isValid
    }
  };

  const handleOnSubmit = () => {
    if (!checkValidation()) return;
    console.log("dddd", checkValidation());
    setIsSubmitting(true);
    setTimeout(() => {
      handleSubmit();
      setIsSubmitting(false);
    }, 1000);
  };
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {mode === "edit" ? "Edit" : "Create"} BioData
        </span>
      </h1>
      <p className="desc text-left max-w-md">
        Craft Your Biodata: Compile personal, educational, and professional
        details into a concise profile for matrimonial purposes.
      </p>

      <form
        // onSubmit={(e) => handleSubmit(e, bioData)}
        className="glassmorphism"
      >
        <div className="flex justify-around">
          {/* TO PREVIEW SHREEE GANESHA LOGO */}
          <LogoPreview
            onEdit={modalOpenHandler}
            onDelete={logoDeleteHandler}
            imgSrc={bioFormData?.logoImage}
          />
          <div className="w-3/12">
            {bioFormData?.logoImage && (
              <InputField
                value={bioFormData?.mainTitle}
                changeHandler={(e) => inputHandler("mainTitle", e.target.value)}
                className="text-center"
              />
            )}
            <InputField
              value={bioFormData?.bioTitle}
              changeHandler={(e) => inputHandler("bioTitle", e.target.value)}
              className="text-center"
            />
          </div>

          {/* TO PREVIEW USER PROFILE */}
          <ProfileImage
            onChange={handleProfileChange}
            imgSrc={bioFormData?.profileImage}
            onDelete={handleProfileImageDelete}
          />
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 ">
          {bioFormData?.personalInfo.map((item, index) => (
            <div key={index} className="mb-4">
              <InputField
                value={item.label}
                changeHandler={(e) =>
                  personalInfoInputChange(index, "label", e.target.value)
                }
                placeholder={item?.labelPlaceholder}
              />

              {item?.isDropdown ? (
                renderDropDown(index, item.value)
              ) : (
                <InputField
                  value={item.value}
                  changeHandler={(e) =>
                    personalInfoInputChange(index, "value", e.target.value)
                  }
                  error={errors?.[item?.key]}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-around">
          <div className="w-3/12 sm:w-full text-center">
            <InputField
              value={bioFormData?.familyTitle}
              changeHandler={(e) => inputHandler("familyTitle", e.target.value)}
              className="text-center"
            />
          </div>
        </div>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 ">
          {bioFormData?.familyInfo?.map((item, index) => (
            <div key={index} className="mb-4">
              <InputField
                value={item.label}
                changeHandler={(e) =>
                  handleFamilyInputChange(index, "label", e.target.value)
                }
                placeholder={item?.labelPlaceholder}
              />

              {item?.isDropdown ? (
                renderDropDown(index, item.value)
              ) : (
                <InputField
                  value={item.value}
                  changeHandler={(e) =>
                    handleFamilyInputChange(index, "value", e.target.value)
                  }
                  placeholder={item?.placeholder}
                  error={errors?.[item?.key]}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-around">
          <div className="w-3/12 sm:w-full text-center">
            <InputField
              value={bioFormData?.contactTitle}
              changeHandler={(e) =>
                inputHandler("contactTitle", e.target.value)
              }
              className="text-center"
            />
          </div>
        </div>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 ">
          {bioFormData?.contactInfo?.map((item, index) => (
            <div key={index} className="mb-4">
              <InputField
                value={item.label}
                changeHandler={(e) =>
                  handleContactInputChange(index, "label", e.target.value)
                }
                disabled={item?.isLabelDisable}
              />
              {item?.isDropdown ? (
                renderDropDown(index, item.value)
              ) : (
                <InputField
                  value={item.value}
                  changeHandler={(e) =>
                    handleContactInputChange(index, "value", e.target.value)
                  }
                  placeholder={item?.placeholder}
                  error={errors?.[item?.key]}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            onClick={(e) => {
              e.preventDefault();
              handleOnSubmit();
            }}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? "Creating..." : "Create BioData"}
          </button>
        </div>
        <CustomModal isOpen={isModalOpen} onClose={modalCloseHandler}>
          <div className="flex gap-2">
            {logoList.map((img, index) => (
              <div
                className="flex flex-col items-center justify-center"
                key={`${img}-${index}`}
              >
                <div className="flex w-28 h-28 rounded-full">
                  <Image
                    src={img}
                    width={96}
                    height={96}
                    alt="profile"
                    className="w-full h-full object-cover rounded-full shadow cursor-pointer"
                    onClick={() => logoSelectHandler(img)}
                  />
                </div>
                <FaPlusCircle
                  className="text-gray-600 cursor-pointer mt-2"
                  onClick={() => logoSelectHandler(img)}
                />
              </div>
            ))}
          </div>
        </CustomModal>
        {isImageCropperOpen && (
          <ImageCropper
            image={selectedImage}
            onCropComplete={handleCropComplete}
            onClose={handleCropperClose}
          />
        )}
      </form>
    </section>
  );
};

export default Form;

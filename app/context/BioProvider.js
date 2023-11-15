"use client";

import { createContext, useContext, useState } from "react";

const BioFormContext = createContext({});

export const BioFormContextProvider = ({ children }) => {
  const [bioFormData, setBioFormData] = useState({
    templateHeadTextColor: "#000",
    templateImage: "",
    logoImage: "",
    profileImage: "",
    mainTitle: "|| SHREE GANESHAY NAMAH ||",
    bioTitle: "BIODATA",
    familyTitle: "FAMILY DETAILS",
    contactTitle: "CONTACT DETAILS",
    personalInfo: [
      { label: "Name", isRequired: true, key: "name", value: "" },
      {
        label: "Date of Birth",
        isRequired: true,
        key: "DOB",
        value: { date: "", month: "", year: "" },
        isDropdown: true,
      },
      {
        label: "Time of Birth",
        isRequired: true,
        key: "TOB",
        value: { hr: "", min: "", format: "AM" },
        isDropdown: true,
      },
      {
        isRequired: false,
        key: "POB",
        label: "Place of Birth",
        value: "",
        placeholder: "Enter Place Of Birth",
      },
      {
        isRequired: false,
        key: "rashi",
        label: "Rashi",
        value: "",
        isDropdown: true,
      },
      {
        isRequired: false,
        key: "nakshatra",
        label: "Nakshatra",
        value: "",
        isDropdown: true,
      },
      {
        isRequired: false,
        key: "manglik",
        label: "Manglik",
        value: "",
        isDropdown: true,
      },
      { isRequired: true, key: "religion", label: "Religion", value: "" },
      { isRequired: true, key: "caste", label: "Caste", value: "" },
      { isRequired: false, key: "gotra", label: "Gotra", value: "" },
      { isRequired: false, key: "gan", label: "Gan", value: "" },
      { isRequired: false, key: "weight", label: "Weight", value: "" },
      {
        isRequired: true,
        key: "height",
        label: "Height",
        value: "",
        isDropdown: true,
      },
      {
        isRequired: false,
        key: "bloodgroup",
        label: "Blood Group",
        value: "",
        isDropdown: true,
      },
      {
        isRequired: true,
        key: "complexion",
        label: "Complexion",
        value: "",
        isDropdown: true,
      },
      { isRequired: true, key: "education", label: "Education", value: "" },
      { isRequired: false, key: "occupation", label: "Occupation", value: "" },
      {
        label: "",
        value: "",
        labelPlaceholder: "You can add and extra heading here.",
      },
    ],
    familyInfo: [
      {
        isRequired: true,
        key: "fatherName",
        label: "Father Name",
        value: "",
        placeholder: "Enter Father Name",
      },
      {
        isRequired: false,
        key: "FatherOccupation",
        label: "Occupation",
        value: "",
        placeholder: "Enter Father Occupation",
      },
      {
        isRequired: true,
        key: "motherName",
        label: "Mother Name",
        value: "",
        placeholder: "Enter Mother Name",
      },
      {
        isRequired: false,
        key: "motherOccupation",
        label: "Occupation",
        value: "",
        placeholder: "Enter Mother Occupation",
      },
      {
        isRequired: false,
        key: "sister",
        label: "Sister",
        value: "",
        placeholder: "1 Married",
      },
      {
        isRequired: false,
        key: "brother",
        label: "Brother",
        value: "",
        placeholder: "2 Brothers/1 Married",
      },
      {
        isRequired: false,
        key: "familyExtra",
        label: "",
        value: "",
        labelPlaceholder: "You can add and extra heading here.",
      },
    ],
    contactInfo: [
      {
        isRequired: true,
        key: "address",
        label: "Address",
        value: "",
        placeholder: "Address Line 1",
      },
      {
        isRequired: true,
        key: "phone",
        label: "Contact No.",
        value: "",
        placeholder: "Enter Mobile No.",
      },
    ],
  });

  const bioFormDataHandler = (data) => {
    console.log("first", data);
    setBioFormData(data);
  };

  return (
    <BioFormContext.Provider value={{ bioFormData, bioFormDataHandler }}>
      {children}
    </BioFormContext.Provider>
  );
};

export const useBioFormContext = () => useContext(BioFormContext);

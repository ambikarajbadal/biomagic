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
      { label: "Name", value: "" },
      {
        label: "Date of Birth",
        key: "DOB",
        value: { date: "", month: "", year: "" },
        isDropdown: true,
      },
      {
        label: "Time of Birth",
        key: "TOB",
        value: { hr: "", min: "", format: "" },
        isDropdown: true,
      },
      { label: "Place of Birth", value: "" },
      { label: "Rashi", value: "", isDropdown: true },
      { label: "Nakshatra", value: "", isDropdown: true },
      { label: "Manglik", value: "", isDropdown: true },
      { label: "Religion", value: "" },
      { label: "Caste", value: "" },
      { label: "Gotra", value: "" },
      { label: "Gan", value: "" },
      { label: "Weight", value: "" },
      { label: "Height", value: "", isDropdown: true },
      { label: "Blood Group", value: "", isDropdown: true },
      { label: "Complexion", value: "", isDropdown: true },
      { label: "Education", value: "" },
      { label: "Occupation", value: "" },
      {
        label: "",
        value: "",
        labelPlaceholder: "You can add and extra heading here.",
      },
    ],
    familyInfo: [
      {
        label: "Father Name",
        value: "",
        placeholder: "Enter Father Name",
      },
      {
        label: "Occupation",
        value: "",
        placeholder: "Enter Father Occupation",
      },
      {
        label: "Mother Name",
        value: "",
        placeholder: "Enter Mother Name",
      },
      {
        label: "Occupation",
        value: "",
        placeholder: "Enter Mother Occupation",
      },
      {
        label: "Sister",
        value: "",
        placeholder: "1 Married",
      },
      {
        label: "Brother",
        value: "",
        placeholder: "2 Brothers/1 Married",
      },
      {
        label: "",
        value: "",
        labelPlaceholder: "You can add and extra heading here.",
      },
    ],
    contactInfo: [
      {
        label: "Address",
        value: "",
        placeholder: "Address Line 1",
      },
      {
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

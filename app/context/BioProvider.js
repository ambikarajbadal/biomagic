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
      { label: "Name", value: "Ambika Kumar" },
      {
        label: "Date of Birth",
        key: "DOB",
        value: { date: "23", month: "09", year: "1992" },
        isDropdown: true,
      },
      {
        label: "Time of Birth",
        key: "TOB",
        value: { hr: "02", min: "09", format: "AM" },
        isDropdown: true,
      },
      { label: "Place of Birth", value: "New Delhi" },
      { label: "Rashi", value: "Cancer (Kark)", isDropdown: true },
      { label: "Nakshatra", value: "Bharani", isDropdown: true },
      { label: "Manglik", value: "No", isDropdown: true },
      { label: "Religion", value: "Hindu" },
      { label: "Caste", value: "Hindu" },
      { label: "Gotra", value: "AAA" },
      { label: "Gan", value: "Hindu" },
      { label: "Weight", value: "20kg" },
      { label: "Height", value: "5", isDropdown: true },
      { label: "Blood Group", value: "AB+", isDropdown: true },
      { label: "Complexion", value: "Light Neutral", isDropdown: true },
      { label: "Education", value: "Hindu" },
      { label: "Occupation", value: "Hindu" },
      {
        label: "",
        value: "",
        labelPlaceholder: "You can add and extra heading here.",
      },
    ],
    familyInfo: [
      {
        label: "Father Name",
        value: "LB Singh",
        placeholder: "Enter Father Name",
      },
      {
        label: "Occupation",
        value: "Businessman",
        placeholder: "Enter Father Occupation",
      },
      {
        label: "Mother Name",
        value: "RB Devi",
        placeholder: "Enter Mother Name",
      },
      {
        label: "Occupation",
        value: "House Wife",
        placeholder: "Enter Mother Occupation",
      },
      {
        label: "Sister",
        value: "1",
        placeholder: "1 Married",
      },
      {
        label: "Brother",
        value: "1",
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
        value: "Test",
        placeholder: "Address Line 1",
      },
      {
        label: "Contact No.",
        value: "9098787678",
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

"use client";
import BioData from "@components/BioData";

function CreateBioData({ data, state }) {
  console.log("first", state);
  // if (!data) {
  //   return <div>Loading...</div>;
  // }
  return <BioData data={data?.searchParams} />;
}

export default CreateBioData;

// pages/components/CanvasImage.js
import { useBioFormContext } from "@app/context/BioProvider";
import { safeUpperCase } from "@utils/utils";
import jsPDF from "jspdf";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const CanvasImage = () => {
  const canvasRef = useRef(null);
  const { bioFormData } = useBioFormContext();
  const router = useRouter();
  console.log({ bioFormData });
  useEffect(() => {
    const {
      templateHeadTextColor,
      templateImage,
      logoImage,
      profileImage,
      mainTitle,
      bioTitle,
      familyTitle,
      contactTitle,
      personalInfo,
      familyInfo,
      contactInfo,
    } = bioFormData;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const clearCache = new Date().getTime(); // Create a new timestamp for the query parameter

    const image = new Image();
    image.src = templateImage || "/assets/images/dymmyTemplate.jpg"; // Set the path to your image file

    const logo = new Image();
    const profile = new Image();
    logo.src = `${logoImage}?cache=${clearCache}`; // Set the path to your logo image file
    profile.src = profileImage; // Set the path to your logo image file

    image.onload = function () {
      // Calculate the aspect ratio of the image
      const aspectRatio = image.width / image.height;

      // Set the canvas dimensions based on the aspect ratio
      canvas.width = 1061; // Adjust this to your desired width
      canvas.height = canvas.width / aspectRatio;

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the background image while preserving its aspect ratio
      const drawWidth = canvas.width;
      const drawHeight = canvas.width / aspectRatio;
      ctx.drawImage(image, 0, 0, drawWidth, drawHeight);

      // Draw Logo
      if (logoImage) {
        const logoWidth = 110; // Adjust the logo size as needed
        const logoHeight = 110; // Adjust the logo size as needed
        const centerX = (canvas.width - logoWidth) / 2;
        ctx.drawImage(logo, centerX, 70, logoWidth, logoHeight); // Centered horizontally
      }

      // Draw Profile photo
      if (profileImage) {
        const profileWidth = 300;
        const profileAspectRatio = profile.width / profile.height;
        const profileX = canvas.width - profileWidth;
        const profileHeight = canvas.width - profileAspectRatio; // Adjust the logo size as needed
        const margin = 100;
        const top = 290;

        // Draw a border around the profile image
        ctx.strokeStyle = templateHeadTextColor; // Set the border color
        ctx.lineWidth = 10; // Set the border width
        ctx.strokeRect(profileX - margin, top, profileWidth, 320);

        ctx.drawImage(
          profile,
          profileX - margin,
          top,
          profileWidth,
          320 // Height
          // profileHeight
        ); // Centered horizontally
      }

      // Add Title the canvas
      if (logoImage) {
        const titledataText = safeUpperCase(mainTitle);
        ctx.font = "24px Arial";
        ctx.fillStyle = templateHeadTextColor;
        const titleTextWidth = ctx.measureText(titledataText).width;
        const titleTextCenterX = (canvas.width - titleTextWidth) / 2; // Horizontal center
        ctx.fillText(titledataText, titleTextCenterX, 205); // Adjust the position as needed
      }

      // Add Bio Data label to the canvas
      const bioTextTopPosition = logoImage ? 235 : 205;
      const biodataText = safeUpperCase(bioTitle);
      ctx.font = "24px Arial";
      ctx.fillStyle = templateHeadTextColor;
      const bioTextWidth = ctx.measureText(biodataText).width;
      const bioTextCenterX = (canvas.width - bioTextWidth) / 2; // Horizontal center
      ctx.fillText(biodataText, bioTextCenterX, bioTextTopPosition); // Adjust the position as needed

      ctx.fillStyle = "#262626";
      ctx.letterSpacing = 15; // Adjust the letter spacing here

      // Find the maximum label width for vertical alignment
      const maxLabelWidth = Math.max(
        ...personalInfo?.map((item) => ctx.measureText(item.label).width)
      );
      const colonOffset = 26; // Adjust this value to vertically align the colons

      ctx.font = "22px 'Liberation Sans' sans-serif"; // Set the font size to 24 pixels and use the Arial font

      // Iterate through the data array and draw the text dynamically

      let lastPersonlaX, lastFamilyX;

      personalInfo?.forEach((item, index) => {
        if (item.label && item.value) {
          let value = item.value;
          if (item?.key === "DOB") {
            value = `${item.value.date}/${item.value.month}/${item.value.year}`;
          } else if (item?.key === "TOB" && item.value.hr) {
            value = `${item.value.hr}:${item.value.min || "00"} ${
              item.value.format || "AM"
            }`;
          }
          ctx.fillText(item.label, 100, 240 + colonOffset + index * 42); // Adjust the position as needed

          ctx.fillText(
            ":",
            110 + maxLabelWidth + 10,
            240 + colonOffset + index * 42
          );

          ctx.fillText(
            value,
            140 + maxLabelWidth + 10,
            240 + colonOffset + index * 42
          );

          lastPersonlaX = 240 + colonOffset + index * 42;
        }
      });

      // ============ Family Details Title ==============
      lastPersonlaX = lastPersonlaX + 40;
      const familyDetailsTitle = safeUpperCase(familyTitle);
      ctx.font = "24px Arial";
      ctx.fillStyle = templateHeadTextColor;
      const famTitleWidth = ctx.measureText(familyDetailsTitle).width;
      const famTextCenterX = (canvas.width - famTitleWidth) / 2; // Horizontal center
      ctx.fillText(familyDetailsTitle, famTextCenterX, lastPersonlaX); // Adjust the position as needed

      ctx.fillStyle = "#262626";
      ctx.font = "22px 'Liberation Sans' sans-serif"; // Set the font size to 24 pixels and use the Arial font
      familyInfo?.forEach((item, index) => {
        if (item.label && item.value) {
          ctx.fillText(
            item.label,
            100,
            lastPersonlaX + 20 + colonOffset + index * 42
          ); // Adjust the position as needed

          ctx.fillText(
            ":",
            110 + maxLabelWidth + 10,
            lastPersonlaX + 20 + colonOffset + index * 42
          );

          ctx.fillText(
            item.value,
            140 + maxLabelWidth + 10,
            lastPersonlaX + 20 + colonOffset + index * 42
          );

          lastFamilyX = lastPersonlaX + 20 + colonOffset + index * 42;
        }
      });

      // ============ Contact Details Title ==============
      lastFamilyX = lastFamilyX + 40;
      const contactDetailsTitle = safeUpperCase(contactTitle);
      ctx.font = "24px Arial";
      ctx.fillStyle = templateHeadTextColor;
      const contactTitleWidth = ctx.measureText(contactDetailsTitle).width;
      const contactTextCenterX = (canvas.width - contactTitleWidth) / 2; // Horizontal center
      ctx.fillText(contactDetailsTitle, contactTextCenterX, lastFamilyX); // Adjust the position as needed

      ctx.fillStyle = "#262626";
      ctx.font = "22px 'Liberation Sans' sans-serif"; // Set the font size to 24 pixels and use the Arial font
      contactInfo?.forEach((item, index) => {
        if (item.label && item.value) {
          ctx.fillText(
            item.label,
            100,
            lastFamilyX + 20 + colonOffset + index * 42
          ); // Adjust the position as needed

          ctx.fillText(
            ":",
            110 + maxLabelWidth + 10,
            lastFamilyX + 20 + colonOffset + index * 42
          );

          ctx.fillText(
            item.value,
            140 + maxLabelWidth + 10,
            lastFamilyX + 20 + colonOffset + index * 42
          );

          // lastX = 240 + colonOffset + index * 42 + 20;
        }
      });
    };
  }, [bioFormData]);

  const handleDownloadPDF = () => {
    const canvas = canvasRef.current;
    const imgData = canvas.toDataURL("image/jpeg", 1.0);

    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "JPEG", 0, 0, width, height);
    pdf.save("biodata.pdf");
  };

  const handleDownloadImage = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "biodata.png";
    link.click();
  };

  const goToEdit = () => {
    router.push("/create?mode=edit");
  };
  console.log({ bioFormData });

  return (
    <div className="flex">
      <div
        className="w-full md:w-1/2"
        style={{ width: "350px", height: "350px" }}
      >
        <canvas ref={canvasRef} className="max-w-full"></canvas>
        <div className="text-center mt-5 flex justify-around">
          <button
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
            onClick={goToEdit}
          >
            Edit Details
          </button>
          <button
            className="px-5 py-1.5 text-sm bg-gray-500 rounded-full text-white"
            onClick={() => router.push("/?mode=edit")}
          >
            Change Design
          </button>
        </div>
      </div>
      <div className="w-full md:w-1/2 p-4">
        <p className="desc text-center">
          Express Yourself: Create a Biodata That Reflects You.
        </p>
        <div className="flex justify-around mt-5">
          <button
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
            onClick={handleDownloadPDF}
          >
            Download PDF
          </button>
          <button
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
            onClick={handleDownloadImage}
          >
            Download Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default CanvasImage;

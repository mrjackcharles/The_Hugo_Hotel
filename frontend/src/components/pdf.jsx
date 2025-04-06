import { jsPDF } from "jspdf";
import "svg2pdf.js";
import "../App.css";

export const generatePDF = (room) => {
    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
    });

    // Header background
    pdf.setFillColor("#3b3b3b");
    pdf.rect(0, 0, 210, 30, "F");

    // Logo
    const logo = new Image();
    logo.src = "../../logopng.png";
    pdf.addImage(logo, "png", 10, 8, 43, 15.5);

    // Room Title
    pdf.setFont("Karla");
    pdf.setTextColor("#3b3b3b");
    pdf.setFontSize(21);
    pdf.text(`${room.roomName}`, 10, 50);

    // Content
    pdf.setFontSize(18);
    pdf.setFont("Merriweather");

    const descriptionText = pdf.splitTextToSize(`${room.roomDescription}`, 190);
    let currentY = 60;
    pdf.text(descriptionText, 10, currentY);

    currentY += descriptionText.length * 8;

    if (room.roomImage) {
        const pageWidth = 210;
        const imageWidth = 190;
        const x = (pageWidth - imageWidth) / 2;

        pdf.addImage(room.roomImage, "PNG", x, currentY + 10, imageWidth, 110);
        currentY += 140;
    }

    const facilitiesText = pdf.splitTextToSize(
        `Facilities: ${room.roomFacilities}`,
        190
    );
    pdf.text(facilitiesText, 10, currentY);

    // Footer background
    pdf.setFillColor("#bfb8b0");
    pdf.rect(0, 280, 210, 20, "F");

    pdf.setFontSize(10);
    pdf.setFont("Merriweather");
    pdf.setTextColor("#3b3b3b");

    // Footer Date and Copyright
    pdf.text(new Date().toLocaleDateString("en-GB"), 182, 290);
    pdf.text("© The Hugo 2025", 10, 290);

    // Save the PDF
    pdf.save(`${room.roomName || "Room"}.pdf`);
};

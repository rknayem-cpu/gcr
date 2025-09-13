// app/api/generate-certificate/route.js

import { NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import QRCode from 'qrcode';
export async function POST(req) {
  const body = await req.json();
  const { name, course,father,mother,center,reg } = body;

  if (!name || !course) {
    return NextResponse.json({ message: 'Missing name or course' }, { status: 400 });
  }

  try {
    // 1. Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // 2. Add a blank page
    const page = pdfDoc.addPage([842, 595]); // A4 landscape

    // 3. Load certificate background image
    const imagePath = path.join(process.cwd(), 'public', 'ytc.png');
   const imageBytes = fs.readFileSync(imagePath);
const image = await pdfDoc.embedPng(imageBytes);


    const { width, height } = page.getSize();

    // 4. Draw background
    page.drawImage(image, {
      x: 0,
      y: 0,
      width,
      height,
    });

    // 5. Embed font
    const font = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);


 const qrText = 'https://support-bangladesh.vercel.app';
  const qrDataUrl = await QRCode.toDataURL(qrText); // returns base64 image

  // ✅ 2. Convert base64 to Uint8Array
  const qrImageBytes = Buffer.from(qrDataUrl.split(',')[1], 'base64');
  const qrImage = await pdfDoc.embedPng(qrImageBytes);

  // ✅ 3. Draw QR image to PDF
  const qrDims = qrImage.scale(0.8); // scale if needed
  page.drawImage(qrImage, {
    x: 60,
    y: 210,
    width: qrDims.width,
    height: qrDims.height,
  });


    // 6. Draw name and course
    page.drawText(name, {
       x:375,
      y: 292,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });

     page.drawText(father, {
       x:335,
      y: 266,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });
 page.drawText(mother, {
       x:290,
      y: 243,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });

  


    page.drawText(course, {
     x:390,
      y: 216,
      size: 12,
      font,
      color: rgb(0, 0, 0.8),
    });


 page.drawText(center, {
       x:295,
      y: 194,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });




    // 7. Finalize PDF
    const pdfBytes = await pdfDoc.save();

    return new Response(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=certificate.pdf',
      },
    });
  } catch (error) {
    console.error('Error generating certificate:', error);
    return NextResponse.json({ message: 'Failed to generate certificate' }, { status: 500 });
  }
}

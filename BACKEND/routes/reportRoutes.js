const express = require('express');
const router = express.Router();
const Card = require('../models/Card');
const nodemailer = require('nodemailer');
const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Configure email transporter with Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Validate card existence with proper ID check
const getCardWithValidation = async (cardId) => {
  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    throw new Error('Invalid card ID format');
  }
  
  const card = await Card.findById(cardId).lean();
  if (!card) {
    throw new Error('Card not found in database');
  }
  return card;
};

// Generate and send report endpoint for a card
router.post('/cards/:id/generate-report', async (req, res) => {
  const cardId = req.params.id;
  try {
    console.log(`Fetching card ${cardId}...`);
    const card = await getCardWithValidation(cardId);

    // Generate report HTML content using card data
    const htmlContent = `
      <h1>Card Report</h1>
      <p><strong>Title:</strong> ${card.title}</p>
      <p><strong>Description:</strong> ${card.description || 'No description provided.'}</p>
      <p><strong>Created At:</strong> ${card.createdAt}</p>
    `;

    // Launch Puppeteer to generate PDF from HTML
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    
    // Use a dynamic file name to avoid overwriting
    const pdfFileName = `report_${cardId}_${Date.now()}.pdf`;
    const pdfPath = path.join(__dirname, '..', 'reports', pdfFileName);
    await page.pdf({ path: pdfPath, format: 'A4' });
    await browser.close();
    
    console.log('PDF report generated:', pdfPath);

    // Prepare email options with PDF attachment
    const mailOptions = {
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Change if sending to a different recipient
      subject: 'Generated Card Report',
      text: 'Please find attached the generated PDF report for your card.',
      attachments: [{ filename: pdfFileName, path: pdfPath }]
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully.');

    res.json({ success: true, message: 'Report generated and emailed successfully.' });
  } catch (error) {
    console.error('Error generating or emailing report:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

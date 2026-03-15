import express from 'express';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// MongoDB Connection
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = db.connections[0].readyState === 1;
    console.log('✅ Connected to MongoDB Atlas');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    throw err;
  }
};

// Member Schema
const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  year: { type: String, required: true },
  branch: { type: String, required: true },
  section: String,
  why: String,
  status: { type: String, default: 'registered' },
  joinedAt: { type: Date, default: Date.now }
});

const Member = mongoose.model('Member', MemberSchema);

// Middleware
app.use(cors());
app.use(express.json());

// Email Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Google Sheets Webhook
async function sendToGoogleSheets(memberData) {
  try {
    const response = await fetch(process.env.GOOGLE_SHEETS_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      'User-Agent': 'MINDS-Registration-API/1.0'
      },
      body: JSON.stringify(memberData)
    });
    
    if (!response.ok) {
      throw new Error(`Google Sheets webhook failed: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('✅ Data sent to Google Sheets:', result);
    return result;
  } catch (error) {
    console.error('❌ Google Sheets webhook error:', error);
    throw error;
  }
}

// Send Welcome Email
async function sendWelcomeEmail(member) {
  let websiteData = { upcomingEvents: [], recruitment: { isOpen: false } };
  
  try {
    const res = await fetch('https://minds-ds.vercel.app/website-data.json');
    if (res.ok) {
      websiteData = await res.json();
    }
  } catch (err) {
    console.error('⚠️ Could not fetch website data for email:', err.message);
  }

  // Build Upcoming Events HTML
  let eventsHtml = '';
  const events = websiteData.upcomingEvents;
  
  if (events && events.length > 0) {
    let eventsList = '';
    events.forEach((event, idx) => {
      eventsList += `
        <li style="margin-bottom: 10px;">
          <strong>${idx + 1}. ${event.title}</strong><br>
          <em>Date: ${event.date || 'TBA'} | Time: ${event.time || 'TBA'} | Location: ${event.location || 'TBA'}</em><br>
          ${event.description || ''}
        </li>
      `;
    });
    
    eventsHtml = `
      <div style="background-color: #f8fafc; padding: 25px; border-radius: 10px; margin: 30px 0;">
        <h3 style="color: #0f172a; margin-top: 0; margin-bottom: 15px;">📅 Upcoming Events</h3>
        <ul style="padding-left: 20px; color: #334155; margin: 0;">
          ${eventsList}
        </ul>
      </div>
    `;
  } else {
    eventsHtml = `
      <div style="background-color: #f8fafc; padding: 25px; border-radius: 10px; margin: 30px 0; text-align: center;">
        <h3 style="color: #0f172a; margin-top: 0; margin-bottom: 15px;">📅 Upcoming Events</h3>
        <p style="color: #334155; margin: 0;">Stay tuned for exciting workshops, hackathons, and data science events!</p>
      </div>
    `;
  }

  // Build Recruitment HTML
  let recruitmentHtml = '';
  const isRecruitmentOpen = websiteData.recruitment && websiteData.recruitment.isOpen;
  const recruitmentFormUrl = (websiteData.recruitment && websiteData.recruitment.formUrl) || '';
  
  if (isRecruitmentOpen) {
    recruitmentHtml = `
      <div style="background-color: #f0fdf4; padding: 25px; border-radius: 10px; margin: 30px 0; text-align: center;">
        <h3 style="color: #059669; margin-top: 0; margin-bottom: 15px;">🚀 Core Committee Recruitment</h3>
        <p style="color: #064e3b; margin-bottom: 15px;">Applications for the MINDS Core Committee are now open!</p>
        <a href="${recruitmentFormUrl}" style="display: inline-block; background-color: #059669; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">Apply here</a>
      </div>
    `;
  } else {
    recruitmentHtml = `
      <div style="background-color: #f8fafc; padding: 25px; border-radius: 10px; margin: 30px 0; text-align: center;">
        <h3 style="color: #0f172a; margin-top: 0; margin-bottom: 15px;">🚀 Core Committee Recruitment</h3>
        <p style="color: #334155; margin: 0;">Interested in leadership? Keep an eye out for upcoming recruitment announcements!</p>
      </div>
    `;
  }

  const WA_LINK = 'https://chat.whatsapp.com/Hir2hpXuLqAAmW1CoV5qaq?mode=hq1tswa';

  const mailOptions = {
    from: `"MINDS - Data Science Club" <${process.env.EMAIL_USER}>`,
    to: member.email,
    subject: '🎉 Welcome to MINDS - Your Data Science Journey Begins!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h1 style="color: #0f172a; text-align: center; margin-bottom: 30px;">
          🎉 WELCOME TO MINDS!
        </h1>
        
        <h2 style="color: #1e293b; text-align: center; margin-bottom: 20px;">
          Hi ${member.name}, Welcome to the Data Science Community!
        </h2>
        
        <p style="font-size: 16px; line-height: 1.5; text-align: center; margin-bottom: 30px;">
          We're thrilled to have you join our community of innovators and data enthusiasts at HITAM.
        </p>
        
        ${eventsHtml}
        
        ${recruitmentHtml}
        
        <div style="text-align: center; margin: 40px 0;">
          <a href="${WA_LINK}" 
             style="display: inline-block; background-color: #25D366; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
            💬 Join WhatsApp Community
          </a>
        </div>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
          <p style="color: #64748b; font-size: 14px;">
            Follow us on Instagram and stay tuned for action!<br>
            <strong style="color: #1e293b;">The MINDS Team</strong>
          </p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Welcome email sent to:', member.email);
  } catch (error) {
    console.error('❌ Email send error:', error);
    throw error;
  }
}

// Registration Endpoint
app.post('/api/register', async (req, res) => {
  try {
    console.log('📝 Registration request received:', req.body);
    
    // Connect to MongoDB
    await connectDB();
    
    // Validation
    const { name, email, year, branch, section, why } = req.body;
    
    if (!name || !email || !year || !branch) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, email, year, branch'
      });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }
    
    // Check if already registered
    const existingMember = await Member.findOne({ email });
    if (existingMember) {
      return res.status(409).json({
        success: false,
        message: 'This email is already registered'
      });
    }
    
    // Create new member
    const newMember = new Member({
      name,
      email,
      year,
      branch,
      section: section || '',
      why: why || '',
      status: 'registered'
    });
    
    // Save to MongoDB
    await newMember.save();
    console.log('✅ Member saved to MongoDB:', email);
    
    // Send to Google Sheets and wait
    try {
      await sendToGoogleSheets({
        name,
        email,
        year,
        branch,
        section: section || '',
        why: why || '',
        status: 'registered',
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      console.error('⚠️ Google Sheets sync failed:', err);
    }
    
    // Send welcome email and wait
    try {
      await sendWelcomeEmail(newMember);
    } catch (err) {
      console.error('⚠️ Email send failed:', err);
    }
    
    // Return success
    res.status(200).json({
      success: true,
      message: 'Registration successful! Check your email for welcome message.',
      data: {
        name,
        email,
        year,
        branch
      }
    });
    
  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: error.message
    });
  }
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Start Server locally, Export for Vercel
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 MINDS Registration API running on port ${PORT}`);
    console.log(`📊 MongoDB: ${process.env.MONGODB_URI ? 'Configured' : 'Not configured'}`);
    console.log(`📧 Email: ${process.env.EMAIL_USER ? 'Configured' : 'Not configured'}`);
    console.log(`📊 Google Sheets: ${process.env.GOOGLE_SHEETS_WEBHOOK ? 'Configured' : 'Not configured'}`);
  });
}

export default app;

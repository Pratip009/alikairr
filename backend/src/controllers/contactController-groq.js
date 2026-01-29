// controllers/contactController.js
import axios from 'axios';

// Store contact messages (you can also save to database)
const contactMessages = [];

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate inputs
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields"
      });
    }

    // Save contact message (optional - save to database)
    const contactData = {
      name,
      email,
      phone,
      subject,
      message,
      date: new Date(),
      responded: false
    };
    
    contactMessages.push(contactData);

    // Generate AI response using Groq API
    const aiResponse = await generateGroqResponse(name, subject, message);

    // Here you would typically send an email with the AI response
    // For now, we'll return it in the response
    
    return res.status(200).json({
      success: true,
      message: "Message received successfully",
      aiResponse: aiResponse,
      userMessage: {
        name,
        email,
        subject,
        message
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      message: "Failed to process your message. Please try again."
    });
  }
};

// Function to generate AI response using Groq API
async function generateGroqResponse(userName, subject, userMessage) {
  try {
    const groqApiKey = process.env.GROQ_API_KEY; // Add this to your backend .env file
    const groqApiUrl = 'https://api.groq.com/openai/v1/chat/completions';

    const systemPrompt = `You are a professional customer service representative for Alikair LLC, a healthcare staffing and recruiting company specializing in public-sector and government-aligned healthcare organizations. 

Your tone should be:
- Warm and professional
- Knowledgeable about healthcare staffing
- Helpful and solution-oriented
- Concise but thorough

Keep responses to 3-4 paragraphs maximum.`;

    const userPrompt = `A user named ${userName} has contacted us with the following:

Subject: ${subject}
Message: ${userMessage}

Generate a professional response that:
1. Thanks them for reaching out to Alikair
2. Acknowledges their specific inquiry about healthcare staffing
3. Provides relevant information if applicable
4. Mentions we'll follow up personally within 24 hours during business days
5. Sign off as "The Alikair Team"

Keep it professional, warm, and concise.`;

    const response = await axios.post(
      groqApiUrl,
      {
        model: "llama-3.3-70b-versatile", // Fast and capable Groq model
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: userPrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 600,
        top_p: 1,
        stream: false
      },
      {
        headers: {
          'Authorization': `Bearer ${groqApiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {
    console.error('Groq API error:', error.response?.data || error.message);
    
    // Fallback response if AI fails
    return `Dear ${userName},

Thank you for reaching out to Alikair LLC regarding "${subject}". We have received your message and appreciate you taking the time to contact us.

At Alikair, we specialize in healthcare staffing and recruiting services exclusively for public-sector and government-aligned organizations. Our team is reviewing your inquiry and will get back to you with a detailed response within 24 hours during business days.

If your matter is urgent, please feel free to call us directly at +1 (555) 123-4567.

We look forward to assisting you with your healthcare staffing needs.

Best regards,
The Alikair Team`;
  }
}

// Get all contact messages (admin only)
export const getAllContactMessages = async (req, res) => {
  try {
    // You would fetch from database here
    return res.status(200).json({
      success: true,
      messages: contactMessages
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch contact messages"
    });
  }
};
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // Initialize Gemini AI Client lazily if API key is present
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  };

  // API Health Check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString()
    });
  });

  // Server-side Gemini AI Chatbot Route
  app.post('/api/chatbot', async (req, res) => {
    try {
      const { message, history = [], context = {} } = req.body;

      if (!message || typeof message !== 'string') {
        res.status(400).json({ error: 'Message is required' });
        return;
      }

      const client = getGeminiClient();

      if (client) {
        const systemInstruction = `You are the friendly, expert Campus AI Career & Freelancing Advisor for Campus Sphere — the all-in-one student freelancing, peer mentorship, hackathon, and campus career ecosystem.
Current User Context:
- Active Screen: ${context.currentPage || 'General'}
- User Name: ${context.userName || 'Student'}
- College: ${context.college || 'Engineering College'}
- Reputation Score: ${context.reputationScore || 85}/100
- Mentorship Coupons Balance: ${context.couponsBalance ?? 4}
- Available Platform Features: Gigs Marketplace, Peer Mentoring with Coupons, Community Discussions & Polls, Weekly Competitions & Hackathons, Campus Leaderboard, Trending Skills Radar, Career Hub / Internships, Reputation Trust Ladder.

Your goals:
1. Provide practical, high-impact advice for student freelancers, hackathon participants, and peer mentors.
2. Give clear, bulleted steps, proposal templates, pricing advice in INR (₹), or skill roadmaps.
3. Suggest platform actions (e.g. "Check the Gigs page to apply", "Book a mentor session with your coupons", "Compete in the HackSprint competition").
4. Keep the tone inspiring, empathetic, professional, and student-focused.`;

        // Format contents from history
        const contents: any[] = [];
        if (Array.isArray(history) && history.length > 0) {
          for (const h of history.slice(-6)) {
            contents.push({
              role: h.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: h.text }]
            });
          }
        }
        contents.push({
          role: 'user',
          parts: [{ text: message }]
        });

        // Model list to try in sequence if one encounters 503 High Demand or quota limits
        const candidateModels = [
          'gemini-3.7-flash',
          'gemini-3.6-flash',
          'gemini-3.5-flash-lite',
          'gemini-3.1-flash-lite'
        ];

        for (const modelName of candidateModels) {
          try {
            const response = await client.models.generateContent({
              model: modelName,
              contents,
              config: {
                systemInstruction,
                temperature: 0.7
              }
            });

            const responseText = response.text;
            if (responseText && responseText.trim().length > 0) {
              res.json({ reply: responseText, source: 'gemini', model: modelName });
              return;
            }
          } catch (modelErr: any) {
            // If model is busy (503 / 429), try next model in candidateModels list
            const errMsg = modelErr?.message || '';
            const isTemporaryUnavailable = errMsg.includes('503') || errMsg.includes('demand') || errMsg.includes('429') || errMsg.includes('UNAVAILABLE');
            if (isTemporaryUnavailable) {
              console.log(`Model ${modelName} temporarily busy (503/429), trying next candidate...`);
              continue;
            }
            console.warn(`Model ${modelName} call failed:`, errMsg);
          }
        }
      }

      // Contextual Smart Fallback Engine
      const fallbackReply = generateFallbackReply(message, context);
      res.json({ reply: fallbackReply, source: 'campus-brain' });
    } catch (err: any) {
      console.error('Chatbot error:', err);
      res.status(500).json({ error: 'Failed to process message' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CampusGig Server running on port ${PORT}`);
  });
}

function generateFallbackReply(message: string, context: any): string {
  const query = message.toLowerCase();

  if (query.includes('gig') || query.includes('earn') || query.includes('money') || query.includes('client') || query.includes('proposal')) {
    return `### 💡 How to Win Top Campus Gigs on CampusGig:
1. **Write a Specific, Focused Proposal**: Highlight 1 relevant repo or demo rather than generic greetings.
2. **Offer Milestones**: Suggest delivering a wireframe or MVP in 24 hours to build trust.
3. **Escrow Protection**: All payments are held safely in CampusGig Escrow and released upon your milestone approval.
4. **Reputation Multiplier**: With your **${context.reputationScore || 85}/100 Reputation Score**, your proposals are given priority sorting to clients!

👉 *Tip: Head to the **Gigs Marketplace** to filter by your skills like React, Python, or UI Design.*`;
  }

  if (query.includes('mentor') || query.includes('coupon') || query.includes('doubt') || query.includes('guidance')) {
    return `### 🎓 Campus Peer Mentorship Guide:
- **Your Balance**: You have **${context.couponsBalance ?? 4} Mentor Coupons** available.
- **How It Works**: 1 Coupon = 1 Verified 1-on-1 45-minute Video Mentorship Session with top senior students.
- **How to Earn More Coupons**: 
  - Refer a college classmate (+2 coupons)
  - Submit a project in weekly competitions (+2 coupons)
  - Maintain a 4.8+ rating when mentoring others (+1 coupon per session)

👉 *Navigate to the **Mentors** tab to find verified seniors across AI/ML, Full Stack, and Cloud.*`;
  }

  if (query.includes('hackathon') || query.includes('competition') || query.includes('challenge') || query.includes('prize')) {
    return `### 🏆 Weekly Hackathons & Competitions:
- **Active Challenges**: Join the *Campus AI Automation Hackathon* (₹50,000 Prize Pool) or *Mobile App UI Sprint*.
- **Submission Perks**:
  - +250 Leaderboard XP Points
  - +2 Free Mentorship Coupons
  - +5 Reputation Trust Points
  - Top 3 winners get featured on the Campus Leaderboard & direct recruiter visibility!

👉 *Go to the **Competitions** page to submit your GitHub repo or Figma demo link.*`;
  }

  if (query.includes('intern') || query.includes('career') || query.includes('job') || query.includes('hire') || query.includes('resume')) {
    return `### 💼 Fast-Track Your Career & Internships:
- **Verified Student Profiles**: Recruiters on CampusGig value verified GitHub repos, live gig reviews, and peer ratings over static PDF resumes.
- **1-Click Apply**: Your verified projects, certificates, and reputation score are automatically bundled into an interactive portfolio card.
- **Top Demanded Roles**: Full Stack Devs, Agentic AI Builders, and UI/UX Product Designers currently have the highest stipend offers (₹25k - ₹45k/mo).

👉 *Visit the **Career Hub** to view curated campus internships and apply instantly.*`;
  }

  if (query.includes('reputation') || query.includes('trust') || query.includes('badge') || query.includes('tier') || query.includes('score')) {
    return `### 🛡️ Campus Trust Ladder & Reputation Score:
Your current score is **${context.reputationScore || 85}/100** (**Gold Tier**).
- **How to reach Platinum (80+)**:
  - Complete 3 paid gigs with 5-star ratings (+15 pts)
  - Verify college institutional email (.ac.in / .edu) (+10 pts)
  - Submit verified certificates & portfolio items (+4 pts each)
  - Active participation in Community Discussions (+1 pt per post)

Platinum members get **0% escrow platform fees**, **Priority Gig matching**, and a **Gold Verified badge**.`;
  }

  if (query.includes('skill') || query.includes('trend') || query.includes('learn') || query.includes('future')) {
    return `### 📈 Trending Campus Skills This Month:
1. **Next.js & Full-Stack TypeScript** (Avg Budget: ₹8,500/gig | +42% growth)
2. **Generative AI & LLM Pipelines** (Avg Budget: ₹14,000/gig | +88% growth)
3. **Figma UI/UX & Design Systems** (Avg Budget: ₹6,200/gig | +35% growth)
4. **Cloud DevOps & Docker/K8s** (Avg Budget: ₹11,000/gig | +29% growth)

👉 *Check out the **Trending Skills** page for AI-driven predictions of next month's top demanded tech stacks.*`;
  }

  return `### 👋 Hello! I'm your Campus AI Career & Gig Assistant.
Here is how I can help you today:
- 🚀 **Find tailored gigs** based on your tech stack and schedule
- 💡 **Write winning proposals** that clients accept within hours
- 🤝 **Connect with verified mentors** for 1-on-1 career guidance
- 🏆 **Strategy for weekly hackathons** to win cash prizes & XP
- 🛡️ **Boost your reputation score** to unlock 0% fee Platinum perks

Ask me anything or select one of the suggested prompts below!`;
}

startServer();

# 🌱 Resort-It

<div align="center">

**A Comprehensive Waste Management & Recycling Ecosystem**

*Connecting communities for sustainable waste management and eco-friendly living*

</div>

---

## 🌍 Overview

**Resort-It** is a comprehensive web application designed to revolutionize waste management and promote sustainable living. The platform seamlessly connects multiple stakeholders in the recycling ecosystem—individuals, scrap dealers, NGOs, and government organizations—to facilitate efficient waste management, community engagement, and environmental conservation.

### 🎯 Mission
To create a sustainable ecosystem where waste is transformed into opportunity through technology-driven connections and community collaboration.

### 📊 Impact
- ✅ **80+** successful scrap exchanges facilitated
- ✅ **150+** active users engaged in sustainable practices
- ✅ Real-time location-based matching of users and service providers
- ✅ Community-driven waste management initiatives

---

## ✨ Features

### 🔄 **ScrapConnect** - Location-Based Scrap Dealer Network
- 📍 Real-time geolocation tracking using **Geolocation API**
- 🗺️ Interactive maps powered by **React Leaflet API**
- 🤝 Direct connection between users and nearby scrap dealers
- 📱 Instant notifications for scrap pickup requests
- 💰 Transparent pricing and rating system

### 🤝 **CleanConnect** - NGO Collaboration Platform
- 📸 Upload photos of areas requiring cleanup
- 🌐 Connect with nearby NGOs and environmental organizations
- 🎯 Location-based alert system for NGOs
- 📊 Track cleanup initiatives and community impact
- 💬 Real-time messaging and coordination

### 🎨 **EcoCreate** - Best Out of Waste Community
- 💡 Share creative recycling ideas and DIY projects
- 🏆 Interactive challenges and eco-friendly craft competitions
- 📚 Step-by-step tutorials for waste transformation
- 🌟 Community voting and featured projects
- 🎓 Educational resources on sustainable crafting

### 🏛️ **GovSchema** - Government Initiative Hub
- 📢 Latest government recycling schemes and policies
- 💼 Information on waste management regulations
- 🔔 Updates on environmental initiatives
- 📄 Documentation and application procedures
- 🤝 Bridge between citizens and government bodies

### 🤖 **AI-Powered Assistant** (Gemini Integration)
- 💬 Intelligent chatbot for recycling guidance
- 🔍 Material identification and proper disposal methods
- 📊 Personalized sustainability tips
- 🌱 Carbon footprint tracking suggestions

### 👥 **Multi-Role Dashboard System**
- **Users**: Track scrap sales, browse eco-ideas, connect with NGOs
- **Scrap Dealers**: Manage pickups, view nearby requests, earnings tracking
- **NGOs**: Coordinate cleanup drives, manage volunteers, impact reporting
- **Owners/Admins**: Platform management and analytics

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: React.js 18.3.1
- **Routing**: React Router DOM 6.26.1
- **Styling**: Tailwind CSS 3.4.10
- **UI Components**: Custom components with Lottie animations
- **Icons**: React Icons 5.3.0
- **Notifications**: React Hot Toast 2.4.1

### **Backend & Database**
- **Authentication**: Firebase Auth
- **Database**: Cloud Firestore
- **Storage**: Firebase Storage (for images and media)
- **Real-time Updates**: Firestore real-time listeners

### **APIs & Services**
- **Maps**: React Leaflet API
- **Geolocation**: Browser Geolocation API
- **HTTP Client**: Axios 1.7.5
- **AI Integration**: Google Gemini API (via custom integration)

### **State Management**
- **Context API**: React Context for global state
- **Local Storage**: User session persistence

### **Development Tools**
- **Build Tool**: Create React App
- **Testing**: Jest, React Testing Library
- **Deployment**: Vercel

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account (for backend services)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/resort-it.git
   cd resort-it
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   
   Create a `src/firebase/Firebase.jsx` file with your Firebase configuration:
   ```javascript
   import { initializeApp } from "firebase/app";
   import { getFirestore } from 'firebase/firestore';
   import { getAuth } from 'firebase/auth';
   import { getStorage } from "firebase/storage";

   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };

   const app = initializeApp(firebaseConfig);
   const fireDB = getFirestore(app);
   const auth = getAuth(app);
   const storage = getStorage(app);

   export { fireDB, auth, storage };
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Run Tests

```bash
npm test
```

---

## 📁 Project Structure

```
Resort-it-omega-main/
├── public/                      # Static files
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── assets/                  # Images and media
│   ├── components/              # Reusable components
│   │   ├── category/           # Category display components
│   │   ├── comment/            # Comment system
│   │   ├── footer/             # Footer component
│   │   ├── geminipage/         # AI chatbot interface
│   │   ├── govschemePage/      # Government schemes
│   │   ├── heroSection/        # Landing page hero
│   │   ├── homePageProductCard/ # Product cards
│   │   ├── layout/             # Layout wrapper
│   │   ├── messagepage/        # NGO messaging
│   │   ├── navbar/             # Navigation bar
│   │   ├── scappage/           # Scrap dealer interface
│   │   └── skillPage/          # Eco-create page
│   ├── context/                 # React Context for state
│   │   ├── myContext.jsx
│   │   └── myState.jsx
│   ├── css/                     # Custom CSS
│   │   ├── animate.css
│   │   └── hero.css
│   ├── firebase/                # Firebase configuration
│   │   └── Firebase.jsx
│   ├── lottie/                  # Animation files
│   │   ├── bot.json
│   │   ├── community.json
│   │   ├── energy.json
│   │   ├── gov.json
│   │   ├── hero1.json
│   │   ├── img.json
│   │   ├── scrap.json
│   │   └── skills.json
│   ├── pages/                   # Main pages
│   │   ├── category/           # Category listing
│   │   ├── gemini/             # AI assistant page
│   │   ├── govscheme/          # Government schemes
│   │   ├── home/               # Homepage
│   │   ├── idea/               # Ideas showcase
│   │   ├── message/            # NGO connection
│   │   ├── noPage/             # 404 page
│   │   ├── owner/              # Admin dashboard
│   │   ├── productInfo/        # Product details
│   │   ├── registeration/      # Login & Signup
│   │   ├── scrap/              # Scrap dealer page
│   │   ├── skills/             # EcoCreate page
│   │   └── user/               # User dashboard
│   ├── protectedRoute/          # Route protection
│   │   ├── protectedRouteForOwner.jsx
│   │   └── protectedRouteForUser.jsx
│   ├── scrollTop/               # Scroll to top utility
│   │   └── Scrolltop.jsx
│   ├── App.js                   # Main App component
│   ├── App.css                  # App styles
│   ├── index.js                 # Entry point
│   └── index.css                # Global styles
├── package.json                 # Dependencies
├── tailwind.config.js           # Tailwind configuration
├── vercel.json                  # Vercel deployment config
└── README.md                    # This file
```

---

## 🎯 Core Modules

### 1. **ScrapConnect Module**
**Purpose**: Connect users with nearby scrap dealers for efficient recycling

**Key Components**:
- Location tracking and mapping
- Dealer profile management
- Request and booking system
- Rating and review system

**User Flow**:
1. User posts scrap availability with photos and location
2. Nearby dealers receive notifications
3. Dealers send pickup requests with price quotes
4. User accepts request and schedules pickup
5. Transaction completed with mutual ratings

### 2. **CleanConnect Module**
**Purpose**: Bridge between citizens and NGOs for community cleanup

**Key Components**:
- Photo upload with geolocation
- NGO discovery and filtering
- Task assignment and tracking
- Impact metrics dashboard

**User Flow**:
1. User uploads photo of area needing cleanup
2. Location tagged automatically
3. NGOs in vicinity notified
4. NGO accepts task and coordinates cleanup
5. Before/after photos shared with community

### 3. **EcoCreate Module**
**Purpose**: Foster creativity and community engagement through sustainable crafting

**Key Components**:
- Idea submission and showcase
- Interactive challenges
- Tutorial library
- Community voting system

**User Flow**:
1. Users share creative recycling projects
2. Step-by-step guides with photos/videos
3. Community votes and comments
4. Featured projects highlighted
5. Challenges with themes and prizes

### 4. **GovSchema Module**
**Purpose**: Centralize government waste management information

**Key Components**:
- Scheme listings and updates
- Application procedures
- Policy documents
- Contact information

### 5. **AI Assistant Module**
**Purpose**: Provide intelligent guidance on recycling and sustainability

**Key Components**:
- Natural language chat interface
- Material identification
- Disposal recommendations
- Sustainability tips

---

## 👥 User Roles

### 🙋 **Regular User**
- Access to all platform features
- Post scrap for sale
- Connect with NGOs
- Share eco-friendly ideas
- View government schemes
- Use AI assistant

### ♻️ **Scrap Dealer**
- Receive scrap pickup requests
- View nearby scrap availability on map
- Manage earnings and transactions
- Build reputation through ratings
- Access dealer dashboard

### 🏢 **NGO**
- Receive cleanup requests
- Coordinate volunteer activities
- Track impact metrics
- Manage multiple cleanup drives
- NGO-specific dashboard

### 👨‍💼 **Owner/Admin**
- Platform management
- User verification
- Analytics and reporting
- Content moderation
- System configuration

---

## 🎨 Screenshots

> *Add screenshots of your application here*

<div align="center">

### Homepage
![Homepage](path/to/homepage-screenshot.png)

### ScrapConnect
![ScrapConnect](path/to/scrapconnect-screenshot.png)

### CleanConnect
![CleanConnect](path/to/cleanconnect-screenshot.png)

### EcoCreate
![EcoCreate](path/to/ecocreate-screenshot.png)

</div>

---

## 🔒 Authentication & Security

- **Firebase Authentication**: Secure email/password authentication
- **Protected Routes**: Role-based access control
- **Data Validation**: Input sanitization and validation
- **Secure Storage**: Encrypted data storage in Firestore
- **API Key Protection**: Environment variables for sensitive data

---

## 🌐 Deployment

### Vercel Deployment

This project is configured for deployment on Vercel:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Configuration is handled through `vercel.json`.

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute
1. 🐛 Report bugs and issues
2. 💡 Suggest new features
3. 📝 Improve documentation
4. 🔧 Submit pull requests

### Contribution Guidelines

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Code Style
- Follow existing code patterns
- Use meaningful variable and function names
- Comment complex logic
- Write unit tests for new features

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Mohd. Altamash Rizwi**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- Firebase for backend infrastructure
- React team for the amazing framework
- Tailwind CSS for styling utilities
- Leaflet for mapping functionality
- All contributors and users of Resort-It

---

## 📞 Support

For support, email your.email@example.com or join our community forum.

---

## 🗺️ Roadmap

### Upcoming Features
- [ ] Mobile app (React Native)
- [ ] Blockchain-based reward system
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Payment gateway integration
- [ ] Social media sharing
- [ ] Video tutorials
- [ ] Community forums

---

## 📈 Project Status

🟢 **Active Development** - This project is actively maintained and accepting contributions.

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

**Made with 💚 for a sustainable future**

[⬆ Back to Top](#-resort-it)

</div>

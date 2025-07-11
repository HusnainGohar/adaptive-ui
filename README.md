# Adaptive Personas - E-commerce Personalization Platform

A machine learning-powered e-commerce platform that adapts the user interface based on discovered user behavior patterns and personas.

## 🚀 Features

- **ML-Powered Persona Detection**: Uses unsupervised clustering to discover 8 distinct user personas
- **Adaptive UI**: Dynamic layouts that change based on detected user behavior
- **Real-time Personalization**: Instant persona switching and interface adaptation
- **Modern Tech Stack**: Next.js frontend with Python FastAPI backend

## 🏗️ Architecture

### Frontend (Next.js)
- React 19 with TypeScript
- Tailwind CSS for styling
- Radix UI components
- React Query for data fetching
- Adaptive layouts for each persona

### Backend (Python FastAPI)
- FastAPI with automatic API documentation
- Scikit-learn for ML clustering
- JWT authentication
- PostgreSQL database (configurable)

### Machine Learning
- Unsupervised clustering with K-means
- 8 discovered user personas:
  - Review Reader
  - Deal Hunter
  - Window Shopper
  - Impulse Shopper
  - Loyal Customer
  - Practical Shopper
  - Ethical Shopper
  - Gift Giver

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd adaptive-personas
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. **Generate training data**
   ```bash
   cd backend
   python scripts/generate_user_data.py
   ```

5. **Train the ML model**
   ```bash
   python scripts/train_clustering.py
   ```

6. **Start the backend server**
   ```bash
   cd backend
   uvicorn app.main:app --reload
   ```

7. **Start the frontend development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

8. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌐 Deployment

### Frontend Deployment (Vercel)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Set Environment Variables**
   - Go to your Vercel dashboard
   - Add `NEXT_PUBLIC_API_URL` = your backend URL

### Backend Deployment Options

#### Option A: Railway (Recommended)
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Select the `backend` folder
4. Set environment variables if needed
5. Deploy

#### Option B: Render
1. Go to [render.com](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Set build command: `pip install -r requirements.txt`
5. Set start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

#### Option C: Heroku
1. Install Heroku CLI
2. Create a `Procfile` in backend folder:
   ```
   web: uvicorn app.main:app --host 0.0.0.0 --port $PORT
   ```
3. Deploy with `heroku create` and `git push heroku main`

### Environment Variables

Create a `.env.local` file for local development:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

For production, set these in your deployment platform:
- `NEXT_PUBLIC_API_URL`: Your deployed backend URL

## 📊 ML Model Training

The system uses unsupervised learning to discover user personas:

1. **Data Generation**: Creates synthetic user behavior data
2. **Feature Engineering**: Extracts behavioral patterns
3. **Clustering**: K-means with k=8 for 8 personas
4. **Evaluation**: Silhouette score, Davies-Bouldin index
5. **Deployment**: Model saved as joblib file

### Training Commands

```bash
# Generate new training data
python backend/scripts/generate_user_data.py

# Train the clustering model
python backend/scripts/train_clustering.py

# Visualize clusters (optional)
python backend/scripts/visualize_clusters.py
```

## 🎨 Persona Layouts

Each persona has a unique UI layout:

- **Review Reader**: Detailed product information, reviews section
- **Deal Hunter**: Prominent pricing, discount badges
- **Window Shopper**: Visual browsing, inspiration gallery
- **Impulse Shopper**: Quick purchase buttons, urgency indicators
- **Loyal Customer**: Brand loyalty features, rewards
- **Practical Shopper**: Technical specifications, comparison tools
- **Ethical Shopper**: Sustainability badges, ethical sourcing info
- **Gift Giver**: Gift wrapping options, occasion-based recommendations

## 🔧 Configuration

### Persona Configuration
- `backend/app/config/personas.py`: Backend persona definitions
- `src/config/personas.js`: Frontend persona configurations
- `backend/app/config/cluster_mapping.py`: ML cluster to persona mapping

### Layout Configuration
- `src/config/layoutMap.js`: Maps personas to layout components
- `src/layouts/`: Individual layout components for each persona

## 📈 Performance

- **Frontend**: Optimized with Next.js 15
- **Backend**: FastAPI with async/await
- **ML**: Efficient scikit-learn clustering
- **Database**: Optimized queries with indexes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and questions:
1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information

## 🔮 Roadmap

- [ ] Real-time persona detection
- [ ] A/B testing framework
- [ ] Advanced ML models (deep learning)
- [ ] Multi-language support
- [ ] Mobile app
- [ ] Analytics dashboard 
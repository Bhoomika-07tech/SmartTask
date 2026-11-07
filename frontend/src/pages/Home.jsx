import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import heroImage from '../assets/hero.png';
import './Home.css';

/**
 * Feature items displaying core value propositions.
 */
const features = [
  {
    id: 'organize-tasks',
    title: 'Organize Your Tasks',
    description:
      'Categorize, prioritize, and structure your daily projects with intuitive lists and tags so nothing slips through the cracks.',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="m9 16 2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 'ai-breakdown',
    title: 'AI-Powered Task Breakdown',
    description:
      'Transform complex goals into manageable, step-by-step action items instantly with intelligent AI assistance.',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
      </svg>
    ),
  },
  {
    id: 'track-progress',
    title: 'Track Your Progress',
    description:
      'Monitor your productivity milestones, visualize daily momentum, and celebrate accomplishments with real-time tracking.',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
  },
];

/**
 * Home page component for SmartTask.
 * Features:
 * - Hero section with main heading, description, Get Started button, and Login link.
 * - Product visual preview illustration.
 * - Features section highlighting three core capabilities using Card components.
 * - Call-to-action banner.
 */
function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section" aria-labelledby="hero-heading">
        <div className="container hero-container">
          <div className="hero-grid">
            <div className="hero-content">
              <span className="badge hero-badge">Next-Gen Productivity</span>
              <h1 id="hero-heading" className="hero-title">
                Get More Done, Stress Less.
              </h1>
              <p className="hero-description">
                SmartTask is an intelligent task management platform that helps you plan,
                prioritize, and accomplish your daily tasks with smart workflows designed
                to keep you focused.
              </p>
              <div className="hero-actions">
                <Button
                  variant="primary"
                  className="hero-btn-primary"
                  onClick={() => navigate('/signup')}
                >
                  Get Started
                </Button>
                <Link to="/login" className="hero-link-login">
                  Login
                </Link>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-image-wrapper">
                <img
                  src={heroImage}
                  alt="SmartTask productivity dashboard preview"
                  className="hero-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" aria-labelledby="features-heading">
        <div className="container">
          <div className="features-header">
            <span className="badge">Why SmartTask</span>
            <h2 id="features-heading" className="features-title">
              Designed for modern, focused work
            </h2>
            <p className="features-subtitle">
              Everything you need to organize your day and build lasting productive habits.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature) => (
              <Card
                key={feature.id}
                title={feature.title}
                hoverable
                className="feature-card"
              >
                <div className="feature-icon-wrapper" aria-hidden="true">
                  {feature.icon}
                </div>
                <p className="feature-description">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="cta-section" aria-labelledby="cta-heading">
        <div className="container">
          <div className="cta-card">
            <h2 id="cta-heading" className="cta-title">
              Ready to streamline your workflow?
            </h2>
            <p className="cta-description">
              Start managing your tasks effectively today and see the difference in your daily focus.
            </p>
            <Button
              variant="primary"
              className="cta-btn"
              onClick={() => navigate('/signup')}
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

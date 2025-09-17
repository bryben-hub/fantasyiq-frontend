// src/App.js - FantasyIQ Pro Frontend
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Your backend API URL
const API_BASE = 'https://web-production-185fa.up.railway.app';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

function App() {
  const [playerData, setPlayerData] = useState(null);
  const [tradeData, setTradeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [email, setEmail] = useState('');
  const [showApp, setShowApp] = useState(false);

  // Test API connection on load
  useEffect(() => {
    api.get('/')
      .then(response => console.log('✅ API Connected:', response.data))
      .catch(error => console.error('❌ API Error:', error));
  }, []);

  const searchPlayer = async (playerName) => {
    if (!playerName.trim()) return;
    
    setLoading(true);
    try {
      const response = await api.get(`/player/${encodeURIComponent(playerName)}`);
      setPlayerData(response.data);
    } catch (error) {
      console.error('Error fetching player:', error);
      setPlayerData({ error: 'Player not found or API error' });
    }
    setLoading(false);
  };

  const loadDemoTrade = async () => {
    setLoading(true);
    try {
      const response = await api.get('/demo/trade');
      setTradeData(response.data);
    } catch (error) {
      console.error('Error loading demo trade:', error);
      setTradeData({ error: 'Could not load demo trade' });
    }
    setLoading(false);
  };

  const handleEmailSignup = (e) => {
    e.preventDefault();
    if (email) {
      localStorage.setItem('fantasyiq_email', email);
      setShowApp(true);
    }
  };

  // Landing Page
  if (!showApp) {
    return (
      <div className="landing">
        <div className="hero">
          <nav className="nav">
            <div className="nav-content">
              <div className="logo">
                🧠 <span>FantasyIQ Pro</span>
              </div>
              <button onClick={() => setShowApp(true)} className="nav-link">
                Try App
              </button>
            </div>
          </nav>

          <div className="hero-content">
            <h1 className="hero-title">
              Dominate Dynasty Fantasy<br />
              <span className="gradient-text">with AI</span>
            </h1>
            
            <p className="hero-subtitle">
              Get multi-year player projections, AI-powered trade analysis, and exclusive dynasty insights 
              that give you the edge over your competition.
            </p>

            <form onSubmit={handleEmailSignup} className="signup-form">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="email-input"
                required
              />
              <button type="submit" className="signup-btn">
                Start Free →
              </button>
            </form>

            <p className="signup-note">
              Free tier available • No credit card required • Upgrade anytime
            </p>

            <div className="stats">
              <div className="stat">
                <div className="stat-number">87%</div>
                <div className="stat-label">Prediction Accuracy</div>
              </div>
              <div className="stat">
                <div className="stat-number">500+</div>
                <div className="stat-label">Dynasty Managers</div>
              </div>
              <div className="stat">
                <div className="stat-number">$50K+</div>
                <div className="stat-label">Winnings Tracked</div>
              </div>
            </div>
          </div>
        </div>

        <div className="features">
          <div className="container">
            <h2 className="section-title">Why FantasyIQ Pro Beats the Competition</h2>
            
            <div className="feature-grid">
              <div className="feature">
                <div className="feature-icon">🧠</div>
                <h3>AI Dynasty Advisor</h3>
                <p>Get 3-year player projections powered by machine learning. Know which rookies will boom and which veterans will bust.</p>
              </div>
              
              <div className="feature">
                <div className="feature-icon">🎯</div>
                <h3>Smart Trade Analyzer</h3>
                <p>Never make a bad trade again. Our AI considers age curves, team contexts, and future value to recommend the best moves.</p>
              </div>
              
              <div className="feature">
                <div className="feature-icon">📈</div>
                <h3>Buy Low Alerts</h3>
                <p>Get notified when elite players hit their lowest values. Buy assets before the market catches up.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="cta">
          <div className="container">
            <h2>Ready to Dominate Your League?</h2>
            <p>Join hundreds of dynasty managers using AI to gain the edge</p>
            <button onClick={() => setShowApp(true)} className="cta-btn">
              Try Free Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main App
  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            🧠 <span>FantasyIQ Pro</span>
          </div>
          <div className="header-right">
            <span className="tier">Free Tier</span>
            <button className="upgrade-btn">Upgrade to Pro</button>
          </div>
        </div>
      </header>

      <div className="main">
        <div className="container">
          
          {/* Player Analysis Section */}
          <div className="card">
            <h2 className="card-title">🎯 AI Player Analysis</h2>
            <p className="card-subtitle">Get multi-year projections and dynasty recommendations</p>
            
            <div className="search-section">
              <input
                type="text"
                placeholder="Enter player name (e.g., Josh Allen, Ja'Marr Chase, Breece Hall)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                onKeyPress={(e) => e.key === 'Enter' && searchPlayer(searchTerm)}
              />
              <button
                onClick={() => searchPlayer(searchTerm)}
                disabled={loading}
                className="search-btn"
              >
                {loading ? 'Analyzing...' : 'Analyze'}
              </button>
            </div>

            {playerData && !playerData.error && (
              <div className="player-result">
                <div className="player-header">
                  <h3>{playerData.name}</h3>
                  <div className="player-meta">
                    <span className="position">{playerData.position}</span>
                    <span className="team">{playerData.team}</span>
                  </div>
                </div>
                
                <div className="player-stats">
                  <div className="stat">
                    <div className="stat-label">Current Value</div>
                    <div className="stat-value">{playerData.current_value}/100</div>
                  </div>
                  <div className="stat">
                    <div className="stat-label">Trend</div>
                    <div className={`stat-value ${playerData.trend.startsWith('+') ? 'positive' : 'negative'}`}>
                      {playerData.trend}
                    </div>
                  </div>
                  <div className="stat">
                    <div className="stat-label">Recommendation</div>
                    <div className="stat-value recommendation">{playerData.recommendation}</div>
                  </div>
                  <div className="stat">
                    <div className="stat-label">Confidence</div>
                    <div className="stat-value">{playerData.confidence}%</div>
                  </div>
                </div>

                <div className="projections">
                  <h4>Multi-Year Projections:</h4>
                  <div className="projection-grid">
                    <div>2025: <strong>{playerData.projections?.['2025']}</strong></div>
                    <div>2026: <strong>{playerData.projections?.['2026']}</strong></div>
                    <div>2027: <strong>{playerData.projections?.['2027']}</strong></div>
                  </div>
                </div>

                <div className="reasoning">
                  <h4>AI Analysis:</h4>
                  <p>{playerData.reasoning}</p>
                </div>
              </div>
            )}

            {playerData?.error && (
              <div className="error">❌ {playerData.error}</div>
            )}
          </div>

          {/* Trade Analyzer Section */}
          <div className="card">
            <h2 className="card-title">⚖️ AI Trade Analyzer</h2>
            <p className="card-subtitle">Smart dynasty trade recommendations</p>
            
            <div className="demo-section">
              <p><strong>Demo Trade:</strong> Travis Kelce + 2025 1st → Ja'Marr Chase</p>
              <button
                onClick={loadDemoTrade}
                disabled={loading}
                className="demo-btn"
              >
                {loading ? 'Analyzing...' : 'Analyze Demo Trade'}
              </button>
            </div>

            {tradeData && !tradeData.error && (
              <div className={`trade-result ${tradeData.recommendation.toLowerCase()}`}>
                <div className="trade-header">
                  <h3>AI Recommendation: {tradeData.recommendation}</h3>
                  <div className="confidence">Confidence: {tradeData.confidence}%</div>
                </div>
                
                <div className="trade-details">
                  <div className="trade-side">
                    <h4>You Give:</h4>
                    <ul>
                      {tradeData.trade_details.give.map((player, idx) => (
                        <li key={idx}>{player}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="trade-side">
                    <h4>You Receive:</h4>
                    <ul>
                      {tradeData.trade_details.receive.map((player, idx) => (
                        <li key={idx}>{player}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="trade-analysis">
                  <h4>Analysis:</h4>
                  <p>{tradeData.reasoning}</p>
                  
                  <div className="value-metrics">
                    <div>Current Value: <strong>{tradeData.value_analysis.current_value_difference}</strong></div>
                    <div>Long-term Outlook: <strong>{tradeData.value_analysis.long_term_outlook}</strong></div>
                    <div>Risk Level: <strong>{tradeData.value_analysis.risk_level}</strong></div>
                  </div>
                </div>
              </div>
            )}

            {tradeData?.error && (
              <div className="error">❌ {tradeData.error}</div>
            )}
          </div>

          {/* Upgrade CTA */}
          <div className="upgrade-card">
            <h2>🚀 Unlock Full AI Power</h2>
            <p>Get unlimited analysis, buy/sell alerts, and advanced dynasty tools</p>
            <div className="upgrade-features">
              <div>✅ Unlimited player analysis</div>
              <div>✅ Custom trade scenarios</div>
              <div>✅ Weekly buy/sell alerts</div>
              <div>✅ League sync integration</div>
            </div>
            <button className="upgrade-btn-large">
              Start 7-Day Free Trial - $29.99/month
            </button>
            <p className="upgrade-note">Cancel anytime • No commitment</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;

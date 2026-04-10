import React, { useState, useEffect } from 'react';
import { CheckCircle2, ChevronRight, X, AlertTriangle } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showWarningPopup, setShowWarningPopup] = useState(false);

  useEffect(() => {
    // Show popup after 5 seconds to create urgency
    const timer = setTimeout(() => {
      setShowWarningPopup(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Zapier Webhook Integration
    const zapierWebhookUrl = "https://hooks.zapier.com/hooks/catch/27033536/unzr80d/";
    
    if (zapierWebhookUrl) {
      try {
        // Zapier Webhooks accept POST requests naturally
        await fetch(zapierWebhookUrl, {
          method: 'POST',
          body: JSON.stringify(formData)
        });
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
    
    setIsSubmitted(true);
  };

  return (
    <div className="app-container">
      {/* URGENCY POPUP */}
      {showWarningPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="popup-close" onClick={() => setShowWarningPopup(false)}>
              <X size={24} />
            </button>
            <div className="popup-alert"><AlertTriangle size={24} /> URGENT UPDATE</div>
            <h2>Spots are disappearing FAST!</h2>
            <p>We're close to reaching our max of <strong>75 guys</strong> and you can fill that gap!</p>
            <button 
              className="cta-button primary popup-cta"
              onClick={() => {
                setShowWarningPopup(false);
                document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Secure My Spot NOW <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="navbar">
        <div className="container">
          <div className="logo">Finally, <span>you're here.</span></div>
          <nav className="nav-links">
            <a href="#about">About</a>
            <a href="#event">The Game</a>
            <a href="#past-performances">Past Performances</a>
            <a href="#register" className="nav-cta">Register</a>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="badge">June 14th, 2026 • Nationals Game</div>
            <h1 className="hero-title">
              <span className="highlight">Fellas,</span> thought it'd be cool to <span className="highlight-sing">sing</span> the National Anthem at a Nationals game? <span className="yup-stamp">YUP!</span>
            </h1>
            <p className="hero-subtitle">
              Wouldn't you LOVE to be a Nationals Fan that has ALSO opened the game with the Star Spangled Banner? <strong>And thousands of people will hear it and LOVE IT.</strong>
            </p>
            
            <div className="video-card glass-panel">
              <div className="video-thumbnail vertical" style={{ padding: 0, background: '#000', overflow: 'hidden' }}>
                <video 
                  src="/promo.mp4" 
                  controls 
                  controlsList="nodownload"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <div className="video-caption">
                "I guess you're watching this because you think it would be cool to sing the national anthem in front of thousands of people... What's stopping you?"
              </div>
            </div>
          </div>

          <div className="hero-form-wrapper" id="register">
            <div className="momentum-ticker glass-panel">
              <div className="ticker-label">Event Momentum</div>
              <div className="ticker-numbers">
                 <div className="ticker-new">21</div>
                 <div className="ticker-old" style={{ transform: 'rotate(3deg)' }}>
                   14
                   <div className="ticker-slash"></div>
                 </div>
              </div>
              <div className="ticker-footer">
                 People have signed up so far. <br/>(Updated every Monday)
              </div>
            </div>

            <div className="registration-form glass-panel">
              {isSubmitted ? (
                <div className="success-message text-center" style={{ padding: '2rem 0' }}>
                  <CheckCircle2 size={48} className="check-icon" style={{ margin: '0 auto 1rem' }} />
                  <h3 className="form-title">We got your information!</h3>
                  <p className="form-desc" style={{ marginBottom: 0 }}>
                    We'll be in contact with you very soon! (We're real people, not AI, we'll reach out directly).
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="form-title">Claim Your Spot</h3>
                  <p className="form-desc">Fill out the form and I'll get right back to you with a personal call to let you know how to do that.</p>
                  
                  <form onSubmit={handleSubmit} className="form-fields">
                    <div className="input-group">
                      <label>Full Name</label>
                      <input 
                        type="text" 
                        placeholder="John Doe" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required 
                      />
                    </div>
                    <div className="input-group">
                      <label>Email</label>
                      <input 
                        type="email" 
                        placeholder="john@example.com" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required 
                      />
                    </div>
                    <div className="input-group">
                      <label>Phone Number</label>
                      <input 
                        type="tel" 
                        placeholder="(555) 555-5555" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        required 
                      />
                    </div>
                    <button type="submit" className="cta-button primary">
                      I want to get on that field! <ChevronRight size={20} />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section id="event" className="stats-bar">
        <div className="container stats-grid">
          <div className="stat-item">
             <div className="stat-number">20</div>
             <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-item">
             <div className="stat-number">75</div>
             <div className="stat-label">Guys on the Turf</div>
          </div>
          <div className="stat-item">
             <div className="stat-number">300+</div>
             <div className="stat-label">First-Timers</div>
          </div>
          <div className="stat-item">
             <div className="stat-number">#1</div>
             <div className="stat-label">Epic Performance</div>
          </div>
        </div>
      </section>

      {/* THE PITCH SECTION */}
      <section id="about" className="pitch-section">
        <div className="container pitch-grid">
          <div className="pitch-text">
            <h2>Think you can't sing?</h2>
            <p className="lead-text">
              If you think that you can't sing, it's because you've never had me as a director or sung with my buds.
            </p>
            <p>
              This year, we're looking to put <strong>75 guys</strong> on that turf to do the most epic singing of the national anthem ever done.
            </p>
            <ul className="pitch-benefits">
              <li><CheckCircle2 className="check-icon" /> Professional vocal direction</li>
              <li><CheckCircle2 className="check-icon" /> Sing alongside 75 fellow Nationals fans</li>
            </ul>
          </div>
          <div className="pitch-video-showcase" id="past-performances">
            <div className="action-marquee top">
              <div className="marquee-content">
                 <span className="singer-name">John David Maybury will be singing!</span>
                 <span className="singer-name">Bob Hirsh will be singing!</span>
                 <span className="singer-name">Stanley Marcuss will be singing!</span>
                 <span className="singer-name">Miles Luther will be singing!</span>
                 <span className="singer-name">John David Maybury will be singing!</span>
                 <span className="singer-name">Bob Hirsh will be singing!</span>
                 <span className="singer-name">Stanley Marcuss will be singing!</span>
                 <span className="singer-name">Miles Luther will be singing!</span>
              </div>
            </div>
            
            <div className="pitch-image video-focused" style={{ padding: 0, background: '#000' }}>
              <video 
                src="/performance.mp4" 
                controls 
                controlsList="nodownload"
                style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute', top: 0, left: 0, zIndex: 5 }}
              />
            </div>

            <div className="action-marquee bottom">
              <div className="marquee-content reverse">
                 <span className="singer-name alt-color">John David Maybury will be singing!</span>
                 <span className="singer-name alt-color">Bob Hirsh will be singing!</span>
                 <span className="singer-name alt-color">Stanley Marcuss will be singing!</span>
                 <span className="singer-name alt-color">Miles Luther will be singing!</span>
                 <span className="singer-name alt-color">John David Maybury will be singing!</span>
                 <span className="singer-name alt-color">Bob Hirsh will be singing!</span>
                 <span className="singer-name alt-color">Stanley Marcuss will be singing!</span>
                 <span className="singer-name alt-color">Miles Luther will be singing!</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;

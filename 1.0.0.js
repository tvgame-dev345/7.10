(function() {
  function initTimer() {
    // Check if timer already exists
    if (document.getElementById('neverAgainTimer')) return;

    // Detect language
    const htmlLang = document.documentElement.getAttribute('lang') || 'en';
    const isHebrew = htmlLang.startsWith('he');
    
    // Translations
    const texts = {
      en: {
        days: 'Days',
        hours: 'Hours',
        minutes: 'Min',
        seconds: 'Sec',
        since: 'Since 7.10.23',
        close: 'Close'
      },
      he: {
        days: 'ימים',
        hours: 'שעות',
        minutes: 'דקות',
        seconds: 'שניות',
        since: 'מ-7.10.23',
        close: 'סגור'
      }
    };
    
    const t = isHebrew ? texts.he : texts.en;
    
    // Create styles
    const style = document.createElement('style');
    style.textContent = `
      #neverAgainTimer {
        position: fixed;
        bottom: 20px;
        ${isHebrew ? 'left: 20px;' : 'right: 20px;'}
        background: linear-gradient(180deg, #2F2929 0%, #111 100%);
        border: 2px solid #867F8A;
        border-radius: 8px;
        padding: 12px 16px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        font-family: Arial, sans-serif;
        color: white;
        z-index: 999999;
        direction: ${isHebrew ? 'rtl' : 'ltr'};
        min-width: 280px;
      }
      
      #neverAgainTimer .nat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }
      
      #neverAgainTimer .nat-title {
        font-size: 11px;
        color: #E82900;
        font-weight: 700;
        text-transform: uppercase;
      }
      
      #neverAgainTimer .nat-close {
        background: none;
        border: none;
        color: #999;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        line-height: 1;
      }
      
      #neverAgainTimer .nat-close:hover {
        color: white;
      }
      
      #neverAgainTimer .nat-timer {
        display: flex;
        gap: 8px;
        align-items: center;
        justify-content: center;
      }
      
      #neverAgainTimer .nat-block {
        text-align: center;
      }
      
      #neverAgainTimer .nat-value {
        background: #626060;
        border-radius: 3px;
        padding: 4px 6px;
        font-size: 20px;
        font-weight: 700;
        min-width: 35px;
        margin-bottom: 2px;
      }
      
      #neverAgainTimer .nat-label {
        font-size: 8px;
        color: #AFAFAF;
        text-transform: uppercase;
      }
      
      #neverAgainTimer .nat-dots {
        font-size: 20px;
        color: white;
        font-weight: 300;
        margin: 0 -2px;
      }
      
      @media (max-width: 768px) {
        #neverAgainTimer {
          min-width: 260px;
          padding: 10px 12px;
        }
        
        #neverAgainTimer .nat-value {
          font-size: 18px;
          min-width: 30px;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Check if closed in session
    if (sessionStorage.getItem('neverAgainTimerClosed') === 'true') {
      return;
    }
    
    // Create timer element
    const timer = document.createElement('div');
    timer.id = 'neverAgainTimer';
    timer.innerHTML = `
      <div class="nat-header">
        <div class="nat-title">${t.since}</div>
        <button class="nat-close" aria-label="${t.close}">×</button>
      </div>
      <div class="nat-timer" id="natTimerContent"></div>
    `;
    document.body.appendChild(timer);
    
    // Close button
    timer.querySelector('.nat-close').addEventListener('click', () => {
      timer.remove();
      sessionStorage.setItem('neverAgainTimerClosed', 'true');
    });
    
    // Update timer
    const startDate = new Date('2023-10-07T00:00:00');
    
    function updateTimer() {
      const now = new Date();
      const diff = now - startDate;
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      const content = document.getElementById('natTimerContent');
      if (content) {
        content.innerHTML = `
          <div class="nat-block">
            <div class="nat-value">${days}</div>
            <div class="nat-label">${t.days}</div>
          </div>
          <span class="nat-dots">:</span>
          <div class="nat-block">
            <div class="nat-value">${String(hours).padStart(2, '0')}</div>
            <div class="nat-label">${t.hours}</div>
          </div>
          <span class="nat-dots">:</span>
          <div class="nat-block">
            <div class="nat-value">${String(minutes).padStart(2, '0')}</div>
            <div class="nat-label">${t.minutes}</div>
          </div>
          <span class="nat-dots">:</span>
          <div class="nat-block">
            <div class="nat-value">${String(seconds).padStart(2, '0')}</div>
            <div class="nat-label">${t.seconds}</div>
          </div>
        `;
      }
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
  }
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTimer);
  } else {
    // DOM is already ready
    initTimer();
  }
})();

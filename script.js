/**
 * ANGELA M. OÑATE - WEB PORTFOLIO
 * Multi-Page Interactive JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. THEME TOGGLE (LIGHT / DARK)
  // ==========================================
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const htmlRoot = document.documentElement;

  // Sync theme from storage or system preference
  const storedTheme = localStorage.getItem('angela_portfolio_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
  setTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      showToast(newTheme === 'dark' ? 'Switched to Orchid Night (Dark Mode)' : 'Switched to Powdered Lilac (Light Mode)');
    });
  }

  function setTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem('angela_portfolio_theme', theme);
  }

  // ==========================================
  // 2. MULTI-PAGE ACTIVE NAV STATE & HEADER
  // ==========================================
  const siteHeader = document.getElementById('site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const backToTopBtn = document.getElementById('back-to-top');

  // Determine current page filename
  let currentFile = window.location.pathname.split('/').pop();
  if (!currentFile || currentFile === '/' || currentFile === '') {
    currentFile = 'index.html';
  }

  // Set active link based on current page URL
  navLinks.forEach(link => {
    const href = link.getAttribute('href')?.split('#')[0] || '';
    if (href === currentFile || (currentFile === 'index.html' && (href === '' || href === 'index.html'))) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  mobileNavLinks.forEach(link => {
    const href = link.getAttribute('href')?.split('#')[0] || '';
    if (href === currentFile || (currentFile === 'index.html' && (href === '' || href === 'index.html'))) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Sticky Header & Back-To-Top
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (siteHeader) {
      if (scrollY > 20) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollY > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================
  // 3. MOBILE MENU DRAWER
  // ==========================================
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');

  if (mobileNavToggle && mobileNavDrawer) {
    mobileNavToggle.addEventListener('click', () => {
      const isOpen = mobileNavDrawer.classList.contains('open');
      if (isOpen) {
        closeMobileDrawer();
      } else {
        openMobileDrawer();
      }
    });

    mobileNavDrawer.addEventListener('click', (e) => {
      if (e.target === mobileNavDrawer) {
        closeMobileDrawer();
      }
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileDrawer();
      });
    });
  }

  function openMobileDrawer() {
    mobileNavDrawer.classList.add('open');
    mobileNavDrawer.setAttribute('aria-hidden', 'false');
    mobileNavToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileDrawer() {
    mobileNavDrawer.classList.remove('open');
    mobileNavDrawer.setAttribute('aria-hidden', 'true');
    mobileNavToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  // ==========================================
  // 4. (RESERVED)
  // ==========================================

  // ==========================================
  // 5. SKILLS LIVE SEARCH (skills.html)
  // ==========================================
  const skillsSearchInput = document.getElementById('skills-search-input');
  const skillCategoryCards = document.querySelectorAll('.skill-category-card');

  if (skillsSearchInput) {
    skillsSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();

      skillCategoryCards.forEach(card => {
        let matchingItemsInCard = 0;
        const items = card.querySelectorAll('.skill-item');

        items.forEach(item => {
          const skillName = item.getAttribute('data-skill-name')?.toLowerCase() || '';
          if (!query || skillName.includes(query)) {
            item.style.display = 'flex';
            matchingItemsInCard++;
          } else {
            item.style.display = 'none';
          }
        });

        if (matchingItemsInCard > 0) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // ==========================================
  // 6. INTERACTIVE MODALS (PROJECTS & CERTS)
  // ==========================================
  const detailsModal = document.getElementById('details-modal');
  const modalBody = document.getElementById('modal-body');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  const modalData = {

    'ibm-ba': {
      title: 'Introduction to Business Analysis',
      subtitle: 'IBM / Coursera Credential',
      tags: ['Business Analysis', 'Requirements Elicitation', 'Gap Analysis', 'Stakeholder Management'],
      content: `
        <div>
          <div class="modal-cert-viewer">
            <a href="assets/cert-ibm.jpg" target="_blank" title="Click to view full image in high resolution">
              <img src="assets/cert-ibm.jpg" alt="IBM Introduction to Business Analysis Certificate for Angela Oñate" class="modal-cert-img" loading="lazy">
            </a>
          </div>

          <div class="modal-cert-actions">
            <a href="https://coursera.org/verify/7GK9UQIISPXL" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
              Verify Online at Coursera ↗
            </a>
            <a href="assets/cert-ibm.jpg" target="_blank" class="btn btn-secondary btn-sm">
              Open Full Resolution Image ↗
            </a>
          </div>

          <div class="modal-meta-grid">
            <div class="modal-meta-item">
              <span class="modal-meta-label">Recipient</span>
              <span class="modal-meta-value">Angela Oñate</span>
            </div>
            <div class="modal-meta-item">
              <span class="modal-meta-label">Completion Date</span>
              <span class="modal-meta-value">November 18, 2025</span>
            </div>
            <div class="modal-meta-item">
              <span class="modal-meta-label">Issuing Body</span>
              <span class="modal-meta-value">IBM (Offered via Coursera)</span>
            </div>
            <div class="modal-meta-item">
              <span class="modal-meta-label">Verification Code</span>
              <span class="modal-meta-value"><code>7GK9UQIISPXL</code></span>
            </div>
            <div class="modal-meta-item" style="grid-column: 1 / -1;">
              <span class="modal-meta-label">Authorized Signatory</span>
              <span class="modal-meta-value">Antonio Cangiano, Director, IBM Skills Network</span>
            </div>
          </div>

          <div style="background: var(--bg-canvas-subtle); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.6rem;">Key Competencies Mastered</h4>
            <ul style="padding-left: 1.2rem; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin: 0;">
              <li>Eliciting, analyzing, and documenting stakeholder and business requirements.</li>
              <li>Performing As-Is vs. To-Be gap analysis and feasibility assessments.</li>
              <li>Facilitating cross-functional communications and stakeholder alignment.</li>
              <li>Formulating Software Requirements Specifications (SRS) and project scoping.</li>
            </ul>
          </div>
        </div>
      `
    },

    'ms-excel': {
      title: 'Business Analytics with Excel',
      subtitle: 'Microsoft / Simplilearn SkillUp Credential',
      tags: ['Microsoft Excel', 'Pivot Tables', 'Descriptive Statistics', 'Visual Dashboards'],
      content: `
        <div>
          <div class="modal-cert-viewer">
            <a href="assets/cert-excel.png" target="_blank" title="Click to view full image in high resolution">
              <img src="assets/cert-excel.png" alt="Microsoft Business Analytics with Excel Certificate for Angela M. Oñate" class="modal-cert-img" loading="lazy">
            </a>
          </div>

          <div class="modal-cert-actions">
            <a href="assets/cert-excel.png" target="_blank" class="btn btn-primary btn-sm">
              Open Full Resolution Image ↗
            </a>
            <button type="button" class="btn btn-secondary btn-sm" onclick="navigator.clipboard.writeText('9431320'); showToast('Certificate Code 9431320 copied!');">
              Copy Code: 9431320 📋
            </button>
          </div>

          <div class="modal-meta-grid">
            <div class="modal-meta-item">
              <span class="modal-meta-label">Recipient</span>
              <span class="modal-meta-value">Angela M. Oñate</span>
            </div>
            <div class="modal-meta-item">
              <span class="modal-meta-label">Completion Date</span>
              <span class="modal-meta-value">19th November 2025</span>
            </div>
            <div class="modal-meta-item">
              <span class="modal-meta-label">Issuing Body</span>
              <span class="modal-meta-value">Powered by Microsoft • Simplilearn SkillUp</span>
            </div>
            <div class="modal-meta-item">
              <span class="modal-meta-label">Certificate Code</span>
              <span class="modal-meta-value"><code>9431320</code></span>
            </div>
            <div class="modal-meta-item" style="grid-column: 1 / -1;">
              <span class="modal-meta-label">Authorized Signatory</span>
              <span class="modal-meta-value">Krishna Kumar, CEO, Simplilearn</span>
            </div>
          </div>

          <div style="background: var(--bg-canvas-subtle); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.6rem;">Key Competencies Mastered</h4>
            <ul style="padding-left: 1.2rem; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin: 0;">
              <li>Advanced Excel formulas, logical functions, and multi-variable sorting.</li>
              <li>Pivot Tables, automated calculated fields, and interactive multi-slicers.</li>
              <li>Descriptive statistical modeling, variance analysis, and trend forecasting.</li>
              <li>Designing intuitive executive management reporting dashboards.</li>
            </ul>
          </div>
        </div>
      `
    },

    'databricks-sql': {
      title: 'Get Started with SQL Analytics and BI on Databricks',
      subtitle: 'Databricks / Simplilearn SkillUp Credential',
      tags: ['Databricks', 'SQL Analytics', 'Lakehouse', 'BI Dashboards'],
      content: `
        <div>
          <div class="modal-cert-viewer">
            <a href="assets/cert-databricks.png" target="_blank" title="Click to view full image in high resolution">
              <img src="assets/cert-databricks.png" alt="Databricks SQL Analytics and BI Certificate for Angela M. Oñate" class="modal-cert-img" loading="lazy">
            </a>
          </div>

          <div class="modal-cert-actions">
            <a href="assets/cert-databricks.png" target="_blank" class="btn btn-primary btn-sm">
              Open Full Resolution Image ↗
            </a>
            <button type="button" class="btn btn-secondary btn-sm" onclick="navigator.clipboard.writeText('9434181'); showToast('Certificate Code 9434181 copied!');">
              Copy Code: 9434181 📋
            </button>
          </div>

          <div class="modal-meta-grid">
            <div class="modal-meta-item">
              <span class="modal-meta-label">Recipient</span>
              <span class="modal-meta-value">Angela M. Oñate</span>
            </div>
            <div class="modal-meta-item">
              <span class="modal-meta-label">Completion Date</span>
              <span class="modal-meta-value">20th November 2025</span>
            </div>
            <div class="modal-meta-item">
              <span class="modal-meta-label">Issuing Body</span>
              <span class="modal-meta-value">Databricks • Simplilearn SkillUp</span>
            </div>
            <div class="modal-meta-item">
              <span class="modal-meta-label">Certificate Code</span>
              <span class="modal-meta-value"><code>9434181</code></span>
            </div>
            <div class="modal-meta-item" style="grid-column: 1 / -1;">
              <span class="modal-meta-label">Authorized Signatory</span>
              <span class="modal-meta-value">Krishna Kumar, CEO, Simplilearn</span>
            </div>
          </div>

          <div style="background: var(--bg-canvas-subtle); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.6rem;">Key Competencies Mastered</h4>
            <ul style="padding-left: 1.2rem; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin: 0;">
              <li>Writing robust SQL queries, analytical joins, and window aggregations.</li>
              <li>Databricks Lakehouse architecture fundamentals and data pipeline ingestion.</li>
              <li>Configuring interactive SQL endpoint query visualizations and charts.</li>
              <li>Automating business intelligence workflows for organizational decision making.</li>
            </ul>
          </div>
        </div>
      `
    },

    'cisco-cyber': {
      title: 'Introduction to Cybersecurity',
      subtitle: 'Cisco Networking Academy / DICT-ITU DTC Credential',
      tags: ['Cybersecurity', 'Threat Analysis', 'Data Protection', 'Information Privacy'],
      content: `
        <div>
          <div class="modal-cert-viewer">
            <a href="assets/cert-cisco-cyber.png" target="_blank" title="Click to view full image in high resolution">
              <img src="assets/cert-cisco-cyber.png" alt="Cisco Introduction to Cybersecurity Certificate for Angela Oñate" class="modal-cert-img" loading="lazy">
            </a>
          </div>

          <div class="modal-cert-actions">
            <a href="assets/cert-cisco-cyber.png" target="_blank" class="btn btn-primary btn-sm">
              Open Full Resolution Image ↗
            </a>
            <a href="assets/cert-cisco-cyber.pdf" target="_blank" download class="btn btn-secondary btn-sm">
              Download Official PDF 📄
            </a>
          </div>

          <div class="modal-meta-grid">
            <div class="modal-meta-item">
              <span class="modal-meta-label">Recipient</span>
              <span class="modal-meta-value">Angela Oñate</span>
            </div>
            <div class="modal-meta-item">
              <span class="modal-meta-label">Completion Date</span>
              <span class="modal-meta-value">10 Nov 2025</span>
            </div>
            <div class="modal-meta-item">
              <span class="modal-meta-label">Issuing Body</span>
              <span class="modal-meta-value">Cisco Networking Academy • DICT-ITU DTC</span>
            </div>
            <div class="modal-meta-item">
              <span class="modal-meta-label">Program Initiative</span>
              <span class="modal-meta-value">DICT-ITU Digital Transformation Center</span>
            </div>
            <div class="modal-meta-item" style="grid-column: 1 / -1;">
              <span class="modal-meta-label">Authorized Instructor</span>
              <span class="modal-meta-value">Digital Transformation Center Instructor, DICT-ITU DTC Initiative</span>
            </div>
          </div>

          <div style="background: var(--bg-canvas-subtle); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.6rem;">Key Competencies Mastered</h4>
            <ul style="padding-left: 1.2rem; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin: 0;">
              <li>Identifying cybersecurity threat vectors, malware variations, and social engineering.</li>
              <li>Network defense methodologies, endpoint security, and encryption principles.</li>
              <li>Implementing personal and enterprise confidentiality, integrity, and availability (CIA).</li>
              <li>Compliance with information privacy regulations and legal data handling frameworks.</li>
            </ul>
          </div>
        </div>
      `
    },

    'cisco-ai': {
      title: 'Introduction to Modern AI',
      subtitle: 'Cisco Networking Academy / DICT-ITU DTC Credential',
      tags: ['Modern AI', 'Machine Learning', 'Generative AI', 'Computer Vision'],
      content: `
        <div>
          <div class="modal-cert-viewer">
            <a href="assets/cert-cisco-ai.png" target="_blank" title="Click to view full image in high resolution">
              <img src="assets/cert-cisco-ai.png" alt="Cisco Introduction to Modern AI Certificate for Angela Oñate" class="modal-cert-img" loading="lazy">
            </a>
          </div>

          <div class="modal-cert-actions">
            <a href="assets/cert-cisco-ai.png" target="_blank" class="btn btn-primary btn-sm">
              Open Full Resolution Image ↗
            </a>
            <a href="assets/cert-cisco-ai.pdf" target="_blank" download class="btn btn-secondary btn-sm">
              Download Official PDF 📄
            </a>
          </div>

          <div class="modal-meta-grid">
            <div class="modal-meta-item">
              <span class="modal-meta-label">Recipient</span>
              <span class="modal-meta-value">Angela Oñate</span>
            </div>
            <div class="modal-meta-item">
              <span class="modal-meta-label">Completion Date</span>
              <span class="modal-meta-value">09 Nov 2025</span>
            </div>
            <div class="modal-meta-item">
              <span class="modal-meta-label">Issuing Body</span>
              <span class="modal-meta-value">Cisco Networking Academy • DICT-ITU DTC</span>
            </div>
            <div class="modal-meta-item">
              <span class="modal-meta-label">Program Initiative</span>
              <span class="modal-meta-value">DICT-ITU Digital Transformation Center</span>
            </div>
            <div class="modal-meta-item" style="grid-column: 1 / -1;">
              <span class="modal-meta-label">Authorized Instructor</span>
              <span class="modal-meta-value">Digital Transformation Center Instructor, DICT-ITU DTC Initiative</span>
            </div>
          </div>

          <div style="background: var(--bg-canvas-subtle); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.6rem;">Key Competencies Mastered</h4>
            <ul style="padding-left: 1.2rem; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin: 0;">
              <li>Core concepts of Artificial Intelligence, Machine Learning, and neural networks.</li>
              <li>Natural Language Processing (NLP), Computer Vision, and conversational agents.</li>
              <li>Generative AI architectures, prompt craft techniques, and ethical AI stewardship.</li>
              <li>Assessing organizational applications and AI automation opportunities.</li>
            </ul>
          </div>
        </div>
      `
    }
  };

  document.querySelectorAll('[data-modal]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modalKey = trigger.getAttribute('data-modal');
      openModal(modalKey);
    });
  });

  document.querySelectorAll('[data-cert]').forEach(card => {
    card.addEventListener('click', () => {
      const certKey = card.getAttribute('data-cert');
      openModal(certKey);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const certKey = card.getAttribute('data-cert');
        openModal(certKey);
      }
    });
  });

  function openModal(key) {
    const data = modalData[key];
    if (!data || !detailsModal) return;

    const tagsHtml = (data.tags || []).map(t => `<span class="project-tag">${t}</span>`).join(' ');

    modalBody.innerHTML = `
      <div style="margin-bottom: 1.25rem;">
        <span class="section-tag" style="margin-bottom: 0.5rem;">${data.subtitle || 'Details'}</span>
        <h3 style="font-size: 1.6rem; font-weight: 800; color: var(--text-primary); margin: 0.5rem 0 0.8rem;">${data.title}</h3>
        <div style="display:flex; flex-wrap:wrap; gap:0.4rem; margin-bottom: 1.25rem;">${tagsHtml}</div>
      </div>
      <div class="modal-inner-content">${data.content}</div>
    `;

    detailsModal.showModal();
    document.body.style.overflow = 'hidden';
  }

  if (modalCloseBtn && detailsModal) {
    modalCloseBtn.addEventListener('click', closeModal);
    detailsModal.addEventListener('click', (e) => {
      if (e.target === detailsModal) {
        closeModal();
      }
    });
  }

  function closeModal() {
    if (detailsModal) {
      detailsModal.close();
      document.body.style.overflow = '';
    }
  }

  // Deep linking: auto-open modal if URL hash matches a key (e.g., certificates.html#ibm-ba)
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash && modalData[initialHash]) {
    setTimeout(() => openModal(initialHash), 150);
  }

  // ==========================================
  // 7. RESUME ACTIONS (PRINT & COPY SUMMARY)
  // ==========================================
  const btnPrintResume = document.getElementById('btn-print-resume');
  const btnCopyResumeText = document.getElementById('btn-copy-resume-text');

  if (btnPrintResume) {
    btnPrintResume.addEventListener('click', () => {
      window.print();
    });
  }

  if (btnCopyResumeText) {
    btnCopyResumeText.addEventListener('click', () => {
      const summaryText = `ANGELA M. OÑATE
Aspiring Information Systems Professional
Phone: (+63) 993 386-4528 | Email: amonate.chmsu@gmail.com
Location: Brgy. Zone 5, Talisay City, Negros Occidental 6115

PROFILE:
Aspiring Information Systems professional skilled in project documentation, research papers, and basic UI/UX design, with experience in creating clear documents and user-friendly interfaces.

EDUCATION:
- Carlos Hilado Memorial State University: Bachelor of Science in Information Systems (2023 - 2027)
- Rafael B. Lacson Memorial High School: Senior High School HUMSS (2021 - 2023)
- Rafael B. Lacson Memorial High School: Junior High School (2017 - 2021)
- Talisay South Elementary School (2012 - 2017)

PROFESSIONAL EXPERIENCE:
- Project Manager & Systems Analyst: Human Resource Information System (HRIS), Municipality of E.B. Magalona (Live: https://hris.lsab.online/login)
  Web-based system designed to manage employee records, monitor attendance, and streamline municipal HR processes.
- On-the-Job Trainee (OJT): Business Permits and Licensing Office (BPLO), Talisay City Hall, Talisay City, Negros Occidental. Assisted with document handling, data encoding, and office tasks.

SKILLS:
- Documentation: Research Papers, Reports, System Documentation
- Project Coordination: Planning, Task Coordination, Team Collaboration
- UI/UX & Design Tools: Figma, Wireframing, Prototyping, HCI Principles
- Data & Analytics: Microsoft Excel (Pivots, Analytics), SQL, Databricks BI

CERTIFICATES (Nov 2025):
- Introduction to Business Analysis (IBM / Coursera)
- Business Analytics with Excel (Microsoft / Simplilearn SkillUp)
- SQL Analytics and BI on Databricks (Databricks / Simplilearn SkillUp)
- Introduction to Cybersecurity (Cisco Networking Academy / DICT-ITU)
- Introduction to Modern AI (Cisco Networking Academy / DICT-ITU)`;

      navigator.clipboard.writeText(summaryText).then(() => {
        showToast('Resume summary copied to clipboard!');
      }).catch(() => {
        showToast('Failed to copy. Please manually copy the resume.');
      });
    });
  }

  // ==========================================
  // 8. CLIPBOARD COPY BUTTONS
  // ==========================================
  const copyBtns = document.querySelectorAll('[data-copy]');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: ${textToCopy}`);
        }).catch(() => {
          showToast(`Failed to copy: ${textToCopy}`);
        });
      }
    });
  });

  // ==========================================
  // 9. CONTACT FORM INTERACTIVITY
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');
      const submitBtn = document.getElementById('btn-submit-contact');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        showToast('Please fill out all required fields.');
        return;
      }

      if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
        showToast('Please provide a valid email address.');
        emailInput.focus();
        return;
      }

      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending Message...</span>`;

      setTimeout(() => {
        showToast(`Thank you, ${nameInput.value}! Your message has been sent.`);
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }, 1000);
    });
  }

  // ==========================================
  // 10. TOAST NOTIFICATION SYSTEM
  // ==========================================
  function showToast(message) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>✨</span><span>${message}</span>`;

    toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3500);
  }

  // ==========================================
  // 11. PORTRAIT 3D TILT MICRO-INTERACTION (index.html & about.html)
  // ==========================================
  const portraitWrapper = document.getElementById('portrait-wrapper');
  if (portraitWrapper && window.matchMedia('(pointer: fine)').matches) {
    portraitWrapper.addEventListener('mousemove', (e) => {
      const rect = portraitWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      portraitWrapper.querySelector('.portrait-card').style.transform = 
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    portraitWrapper.addEventListener('mouseleave', () => {
      portraitWrapper.querySelector('.portrait-card').style.transform = 
        'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }
});

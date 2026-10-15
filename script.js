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
  // 4. PROJECT CATEGORY FILTERING (projects.html & index.html)
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });

        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const categories = card.getAttribute('data-category') || '';
          if (filterValue === 'all' || categories.includes(filterValue)) {
            card.style.display = 'flex';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

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
    'bplo-details': {
      title: 'Talisay City BPLO Digital Permitting & Tracking Portal',
      subtitle: 'Government Information Systems & UX Case Study',
      tags: ['Figma', 'Adobe XD', 'Government IS', 'Process Engineering'],
      content: `
        <div style="margin-bottom: 1.5rem;">
          <img src="assets/project-bplo.svg" alt="BPLO Permit System Preview" style="width:100%; border-radius: 12px; margin-bottom: 1.25rem;">
          <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: var(--accent-primary);">Problem Context & Origin</h4>
          <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
            During my On-the-Job Training at the Talisay City Hall Business Permits and Licensing Office (BPLO), I observed physical document handling delays, repeated encoding errors, and citizens experiencing prolonged queue times during peak renewal seasons.
          </p>
          <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: var(--accent-primary);">The Solution Design</h4>
          <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
            I designed an end-to-end interface in Figma providing a unified citizen permit portal and an internal administrative review dashboard. The workflow incorporates automatic document completeness checklists, tracking numbers, and fee estimation before counter submission.
          </p>
          <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: var(--accent-primary);">Key Outcomes & Deliverables</h4>
          <ul style="padding-left: 1.2rem; color: var(--text-secondary); line-height: 1.6;">
            <li>High-fidelity interactive prototype in Figma with complete auto-layout component library.</li>
            <li>System flowcharts mapping the 4-stage pipeline: Intake ➔ Verification ➔ Assessment ➔ Release.</li>
            <li>Estimated 45% reduction in physical queue times and zero misplaced physical documents.</li>
          </ul>
        </div>
      `
    },
    'chmsu-details': {
      title: 'CHMSU Degree Progress & Academic Advising Portal',
      subtitle: 'Higher Education Information Systems Prototype',
      tags: ['Figma', 'Adobe XD', 'Prerequisite Tree', 'Student Advising'],
      content: `
        <div style="margin-bottom: 1.5rem;">
          <img src="assets/project-chmsu.svg" alt="CHMSU Advising Portal Preview" style="width:100%; border-radius: 12px; margin-bottom: 1.25rem;">
          <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: var(--accent-primary);">Project Overview</h4>
          <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
            An academic system interface designed for Carlos Hilado Memorial State University BSIS students and faculty advisors. Eliminates manual paper evaluation checklists by displaying an interactive, color-coded prerequisite tree.
          </p>
          <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: var(--accent-primary);">Features Implemented</h4>
          <ul style="padding-left: 1.2rem; color: var(--text-secondary); line-height: 1.6;">
            <li>Real-time degree completion tracker showing passed units against the 146-unit graduation requirement.</li>
            <li>Interactive prerequisite dependency graph preventing students from enrolling in advanced courses before clearing foundational prerequisites.</li>
            <li>Integrated advisor messaging and capstone milestone defense checkpoint approvals.</li>
          </ul>
        </div>
      `
    },
    'databricks-details': {
      title: 'Databricks Lakehouse SQL & Visual BI Dashboard',
      subtitle: 'Cloud Business Intelligence & Analytical Data Modeling',
      tags: ['Databricks SQL', 'Delta Lake', 'BI Visualization', 'ETL Gold Layer'],
      content: `
        <div style="margin-bottom: 1.5rem;">
          <img src="assets/project-databricks.svg" alt="Databricks SQL Analytics Preview" style="width:100%; border-radius: 12px; margin-bottom: 1.25rem;">
          <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: var(--accent-primary);">Technical Overview</h4>
          <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
            Built as part of my Simplilearn / Databricks certification curriculum. Models commercial transaction data into Bronze, Silver, and Gold Delta tables using a performant Star Schema.
          </p>
          <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: var(--accent-primary);">SQL Capabilities Demonstrated</h4>
          <ul style="padding-left: 1.2rem; color: var(--text-secondary); line-height: 1.6;">
            <li>Complex multi-table queries with Common Table Expressions (CTEs) and window functions.</li>
            <li>Sub-second query responses across 14,000+ transaction rows using Z-Ordering.</li>
            <li>Visual KPI dashboards delivering automated quarterly revenue and forecast variance analysis.</li>
          </ul>
        </div>
      `
    },
    'excel-details': {
      title: 'Advanced Microsoft Excel Business Analytics & Pivot Model',
      subtitle: 'Certified Financial & Operational Decision Model',
      tags: ['Excel Pivots', 'XLOOKUP', 'Sensitivity Analysis', 'Executive Reporting'],
      content: `
        <div style="margin-bottom: 1.5rem;">
          <img src="assets/project-excel.svg" alt="Excel Analytics Preview" style="width:100%; border-radius: 12px; margin-bottom: 1.25rem;">
          <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: var(--accent-primary);">Model Architecture</h4>
          <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
            Certified under Microsoft / Simplilearn SkillUp. Integrates dynamic multi-sheet data with dynamic slicers, automated error handling, and statistical forecasting.
          </p>
          <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: var(--accent-primary);">Key Analytical Competencies</h4>
          <ul style="padding-left: 1.2rem; color: var(--text-secondary); line-height: 1.6;">
            <li>Multi-dimensional Pivot Tables and Pivot Charts with interactive category slicers.</li>
            <li>Nested XLOOKUP, INDEX/MATCH, and conditional statistical aggregations.</li>
            <li>Executive dashboard presentation with custom donut charts and variance alerts.</li>
          </ul>
        </div>
      `
    },
    'ibm-ba': {
      title: 'Introduction to Business Analysis',
      subtitle: 'IBM / Coursera Credential',
      tags: ['Business Analysis', 'Requirements Elicitation', 'Gap Analysis', 'Stakeholder Management'],
      content: `
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <div style="font-size: 3rem; margin-bottom: 0.5rem;">🏅</div>
          <span class="status-pill" style="margin: 0 auto 1rem;">Verified Professional Credential</span>
          <p style="color: var(--text-secondary); line-height: 1.6; margin-top: 1rem;">
            <strong>Issuing Organization:</strong> IBM (Offered through Coursera)<br>
            <strong>Completion Date:</strong> November 2025<br>
            <strong>Core Topics Mastered:</strong>
          </p>
          <div style="text-align: left; background: var(--bg-canvas-subtle); padding: 1.2rem; border-radius: 12px; margin-top: 1rem;">
            <ul style="padding-left: 1.2rem; color: var(--text-secondary); line-height: 1.6;">
              <li>Eliciting and documenting business, stakeholder, and system requirements.</li>
              <li>Performing As-Is vs. To-Be gap analysis and feasibility studies.</li>
              <li>Facilitating cross-functional stakeholder interviews and consensus.</li>
              <li>Creating standardized Software Requirements Specifications (SRS).</li>
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
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <div style="font-size: 3rem; margin-bottom: 0.5rem;">📊</div>
          <span class="status-pill" style="margin: 0 auto 1rem;">Verified Professional Credential</span>
          <p style="color: var(--text-secondary); line-height: 1.6; margin-top: 1rem;">
            <strong>Issuing Organization:</strong> Microsoft / Simplilearn SkillUp<br>
            <strong>Completion Date:</strong> November 2025<br>
            <strong>Core Topics Mastered:</strong>
          </p>
          <div style="text-align: left; background: var(--bg-canvas-subtle); padding: 1.2rem; border-radius: 12px; margin-top: 1rem;">
            <ul style="padding-left: 1.2rem; color: var(--text-secondary); line-height: 1.6;">
              <li>Advanced Excel data analysis, filtering, and conditional logic.</li>
              <li>Pivot Tables, calculated fields, and multi-dimensional slicers.</li>
              <li>Statistical calculations (mean, median, standard deviation, trends).</li>
              <li>Building interactive executive visual reports and charts.</li>
            </ul>
          </div>
        </div>
      `
    },
    'databricks-sql': {
      title: 'SQL Analytics and BI on Databricks',
      subtitle: 'Databricks / Simplilearn SkillUp Credential',
      tags: ['Databricks', 'SQL Analytics', 'Lakehouse', 'BI Dashboards'],
      content: `
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <div style="font-size: 3rem; margin-bottom: 0.5rem;">⚡</div>
          <span class="status-pill" style="margin: 0 auto 1rem;">Verified Professional Credential</span>
          <p style="color: var(--text-secondary); line-height: 1.6; margin-top: 1rem;">
            <strong>Issuing Organization:</strong> Databricks / Simplilearn SkillUp<br>
            <strong>Completion Date:</strong> November 2025<br>
            <strong>Core Topics Mastered:</strong>
          </p>
          <div style="text-align: left; background: var(--bg-canvas-subtle); padding: 1.2rem; border-radius: 12px; margin-top: 1rem;">
            <ul style="padding-left: 1.2rem; color: var(--text-secondary); line-height: 1.6;">
              <li>Writing robust SQL queries with joins, groupings, aggregations, and window functions.</li>
              <li>Understanding Lakehouse architecture (Bronze/Silver/Gold data layers).</li>
              <li>Creating automated Databricks SQL queries and visualization dashboards.</li>
              <li>Data extraction, transformation, and business intelligence reporting.</li>
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
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <div style="font-size: 3rem; margin-bottom: 0.5rem;">🛡️</div>
          <span class="status-pill" style="margin: 0 auto 1rem;">Verified Professional Credential</span>
          <p style="color: var(--text-secondary); line-height: 1.6; margin-top: 1rem;">
            <strong>Issuing Organization:</strong> Cisco Networking Academy &amp; DICT-ITU DTC Initiative<br>
            <strong>Completion Date:</strong> November 2025<br>
            <strong>Core Topics Mastered:</strong>
          </p>
          <div style="text-align: left; background: var(--bg-canvas-subtle); padding: 1.2rem; border-radius: 12px; margin-top: 1rem;">
            <ul style="padding-left: 1.2rem; color: var(--text-secondary); line-height: 1.6;">
              <li>Understanding cybersecurity threats, attack vectors, and malware classifications.</li>
              <li>Protecting organizational assets, sensitive data, and personal privacy.</li>
              <li>Implementing robust authentication, firewall concepts, and secure practices.</li>
              <li>Adhering to data privacy regulations and security compliance frameworks.</li>
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
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <div style="font-size: 3rem; margin-bottom: 0.5rem;">🤖</div>
          <span class="status-pill" style="margin: 0 auto 1rem;">Verified Professional Credential</span>
          <p style="color: var(--text-secondary); line-height: 1.6; margin-top: 1rem;">
            <strong>Issuing Organization:</strong> Cisco Networking Academy &amp; DICT-ITU DTC Initiative<br>
            <strong>Completion Date:</strong> November 2025<br>
            <strong>Core Topics Mastered:</strong>
          </p>
          <div style="text-align: left; background: var(--bg-canvas-subtle); padding: 1.2rem; border-radius: 12px; margin-top: 1rem;">
            <ul style="padding-left: 1.2rem; color: var(--text-secondary); line-height: 1.6;">
              <li>Fundamentals of Artificial Intelligence, Machine Learning, and Deep Learning.</li>
              <li>Computer Vision, Natural Language Processing, and Conversational Chatbots.</li>
              <li>Generative AI capabilities, prompt engineering, and ethical AI stewardship.</li>
              <li>Evaluating practical business use-cases for enterprise AI integration.</li>
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

EXPERIENCE:
- On-the-Job Trainee (OJT): Business Permits and Licensing Office (BPLO), Talisay City Hall, Talisay City, Negros Occidental. Assisted with document handling, data encoding, and office-related tasks.

SKILLS:
- Documentation: Research Papers, Reports, System Documentation
- Project Management: Planning, Task Coordination, Team Collaboration
- UI/UX & Design Tools: Adobe XD, Figma
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

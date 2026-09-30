/* =========================================
   HERO MOTION ENGINE — OCEAN / PORTRAIT
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
  // ===== HERO NAME REVEAL =====
  // Keep the real name as plain text so it can never disappear.
  const heroName = document.getElementById('heroName');
  if (heroName) heroName.setAttribute('aria-label', heroName.textContent.trim());

  const loadingScreen = document.getElementById('loadingScreen');
  const hero = document.getElementById('hero');

  // Keep the original loading screen; no content is changed.
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (loadingScreen) loadingScreen.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }, 1500);
  });

  setTimeout(() => {
    if (loadingScreen) loadingScreen.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }, 5000);

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  }, { passive: true });

  // ===== MOBILE NAV TOGGLE =====
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===== CURSOR GLOW =====
  const cursorGlow = document.getElementById('cursorGlow');
  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    glowX += (mouseX - glowX) * 0.15;
    glowY += (mouseY - glowY) * 0.15;
    cursorGlow.style.left = `${glowX - 10}px`;
    cursorGlow.style.top = `${glowY - 10}px`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hide cursor glow on touch devices
  if ('ontouchstart' in window) {
    cursorGlow.style.display = 'none';
  }

  // ===== SCROLL REVEAL ANIMATIONS =====
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Don't unobserve to allow re-animation if needed
      }
    });
  }, observerOptions);

  // Observe all reveal elements
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-children').forEach(el => {
    revealObserver.observe(el);
  });

  // ===== PARTICLE SYSTEM =====
  const particlesContainer = document.getElementById('particles');
  const particleCount = 30;

  function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const size = Math.random() * 4 + 1;
    const x = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 10;
    const opacity = Math.random() * 0.4 + 0.1;
    
    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}%;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      opacity: ${opacity};
    `;
    
    particlesContainer.appendChild(particle);
  }

  for (let i = 0; i < particleCount; i++) {
    createParticle();
  }

  // ===== ACTIVE NAV LINK HIGHLIGHTING =====
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navAnchors.forEach(anchor => {
      anchor.style.color = '';
      if (anchor.getAttribute('href') === `#${current}`) {
        anchor.style.color = 'var(--gold)';
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ===== WANTED POSTER TILT EFFECT (after intro) =====
  const poster = document.querySelector('.hero-wanted-poster');
  
  if (poster) {
    poster.addEventListener('mousemove', (e) => {
      // Only allow tilt after intro is done
      if (!poster.classList.contains('intro-done')) return;
      
      const rect = poster.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;
      
      poster.style.animation = 'none';
      poster.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    poster.addEventListener('mouseleave', () => {
      if (!poster.classList.contains('intro-done')) return;
      poster.style.transform = '';
      poster.style.transition = 'transform 0.5s ease';
      setTimeout(() => {
        poster.style.transition = '';
        poster.style.animation = 'posterFloat 6s ease-in-out infinite';
      }, 500);
    });
  }

  // ===== PROJECT CARD HOVER EFFECT =====
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.background = `
        radial-gradient(circle at ${x}px ${y}px, rgba(212,168,83,0.06) 0%, transparent 50%),
        rgba(10, 14, 26, 0.8)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.background = 'rgba(10, 14, 26, 0.8)';
    });
  });

  // ===== TECH ITEM HOVER SOUND-LIKE EFFECT =====
  document.querySelectorAll('.tech-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateY(-5px) scale(1.05)';
    });
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
    });
  });

  // ===== TYPING EFFECT FOR HERO TAGLINE =====
  const tagline = document.querySelector('.hero-tagline');
  if (tagline) {
    const text = tagline.textContent;
    tagline.textContent = '';
    tagline.style.opacity = '1';
    tagline.style.animation = 'none';
    
    let charIndex = 0;
    
    function typeChar() {
      if (charIndex < text.length) {
        tagline.textContent += text[charIndex];
        charIndex++;
        setTimeout(typeChar, 50);
      }
    }
    
    // Start typing shortly after loader fades so it is immediately visible
    setTimeout(typeChar, 1000);
  }

  // ===== PARALLAX EFFECT ON HERO =====
  const heroBgFallback = document.querySelector('.hero-bg-fallback');
  
  if (heroBgFallback) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        heroBgFallback.style.transform = `translateY(${scrolled * 0.3}px) scale(1.1)`;
      }
    }, { passive: true });
  }

  // ===== LOGO CLICK → SCROLL TO TOP =====
  const navLogo = document.getElementById('navLogo');
  if (navLogo) {
    navLogo.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== JOURNEY TIMELINE DOT ANIMATION =====
  const journeyDots = document.querySelectorAll('.journey-dot');
  
  const dotObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transform = 'translateX(-50%) scale(1.3)';
        entry.target.style.boxShadow = '0 0 30px rgba(212,168,83,0.6)';
        setTimeout(() => {
          entry.target.style.transform = 'translateX(-50%) scale(1)';
          entry.target.style.boxShadow = '0 0 20px rgba(212,168,83,0.4)';
        }, 500);
      }
    });
  }, { threshold: 0.5 });

  journeyDots.forEach(dot => dotObserver.observe(dot));

  // ===== COUNTER ANIMATION (for bounty-style numbers) =====
  function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.floor(easeProgress * (end - start) + start).toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }

  // ===== FOOTER WORDS PARALLAX =====
  const footerWords = document.querySelector('.footer-words');
  if (footerWords) {
    const words = footerWords.querySelectorAll('span');
    
    window.addEventListener('scroll', () => {
      const rect = footerWords.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const progress = 1 - (rect.top / window.innerHeight);
        words.forEach((word, i) => {
          const offset = (i - 1.5) * progress * 10;
          word.style.transform = `translateX(${offset}px)`;
        });
      }
    }, { passive: true });
  }

  // ===== HERO VIDEO & TRANSPARENT PORTRAIT ENGINE =====
  function initHeroVideos() {
    const bgVideo = document.getElementById('heroBgVideo');
    const heroBgDiv = document.querySelector('.hero-bg');
    const portraitSource = document.getElementById('heroPortraitSourceVideo');
    const portraitCanvas = document.getElementById('heroPortraitCanvas');
    const portraitWrap = document.querySelector('.hero-portrait-wrap');
    const heroSection = document.getElementById('hero');

    // Background video: fade out static fallback once playing
    if (bgVideo && heroBgDiv) {
      bgVideo.addEventListener('playing', () => {
        heroBgDiv.classList.add('video-playing');
      }, { once: true });
      bgVideo.play().catch(() => {});
    }

    // Transparent Portrait WebGL Renderer
    if (portraitSource && portraitCanvas && portraitWrap) {
      let isVisible = true;
      let animFrameId = null;

      function startRenderer() {
        const gl = portraitCanvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
        if (!gl) {
          portraitSource.play().catch(() => {});
          return;
        }

        const vsSource = `
          attribute vec2 a_pos;
          varying vec2 v_texCoord;
          void main() {
            v_texCoord = vec2((a_pos.x + 1.0) * 0.5, 1.0 - (a_pos.y + 1.0) * 0.5);
            gl_Position = vec4(a_pos, 0.0, 1.0);
          }
        `;

        const fsSource = `
          precision mediump float;
          uniform sampler2D u_video;
          varying vec2 v_texCoord;
          void main() {
            vec2 rgbCoord = vec2(v_texCoord.x, v_texCoord.y * 0.5);
            vec2 alphaCoord = vec2(v_texCoord.x, 0.5 + v_texCoord.y * 0.5);
            vec4 color = texture2D(u_video, rgbCoord);
            float alpha = texture2D(u_video, alphaCoord).r;
            gl_FragColor = vec4(color.rgb, alpha);
          }
        `;

        const createShader = (type, src) => {
          const s = gl.createShader(type);
          gl.shaderSource(s, src);
          gl.compileShader(s);
          return s;
        };

        const prog = gl.createProgram();
        gl.attachShader(prog, createShader(gl.VERTEX_SHADER, vsSource));
        gl.attachShader(prog, createShader(gl.FRAGMENT_SHADER, fsSource));
        gl.linkProgram(prog);
        gl.useProgram(prog);

        const posBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
          -1, -1,
           1, -1,
          -1,  1,
          -1,  1,
           1, -1,
           1,  1
        ]), gl.STATIC_DRAW);

        const aPos = gl.getAttribLocation(prog, 'a_pos');
        gl.enableVertexAttribArray(aPos);
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        let hasFadedIn = false;
        function renderLoop() {
          if (isVisible && !portraitSource.paused && !portraitSource.ended && portraitSource.readyState >= 2) {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, portraitSource);
            gl.drawArrays(gl.TRIANGLES, 0, 6);

            if (!hasFadedIn) {
              hasFadedIn = true;
              portraitWrap.classList.add('portrait-video-playing');
            }
          }
          if (isVisible) {
            animFrameId = requestAnimationFrame(renderLoop);
          }
        }

        portraitSource.addEventListener('playing', () => {
          if (!animFrameId) renderLoop();
        });

        portraitSource.play().then(() => {
          renderLoop();
        }).catch(() => {});
      }

      startRenderer();

      // Pause/resume videos when hero scrolls in/out of view (GPU & battery saver)
      if ('IntersectionObserver' in window && heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              isVisible = true;
              if (bgVideo && bgVideo.paused) bgVideo.play().catch(() => {});
              if (portraitSource && portraitSource.paused) portraitSource.play().catch(() => {});
              if (!animFrameId) startRenderer();
            } else {
              isVisible = false;
              if (bgVideo && !bgVideo.paused) bgVideo.pause();
              if (portraitSource && !portraitSource.paused) portraitSource.pause();
              if (animFrameId) {
                cancelAnimationFrame(animFrameId);
                animFrameId = null;
              }
            }
          });
        }, { threshold: 0.05 });
        heroObserver.observe(heroSection);
      }
    }
  }

  initHeroVideos();

  console.log('%c☠️ Welcome to the Grand Line, nakama! ☠️', 
    'color: #d4a853; font-size: 20px; font-family: serif; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);');
});

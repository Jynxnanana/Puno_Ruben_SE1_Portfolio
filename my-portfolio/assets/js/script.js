document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // FEATURE 1: DARK / LIGHT MODE ENGINE
    // ==========================================
    const themeToggleBtn = document.getElementById("theme-toggle");
    const modeIcon = themeToggleBtn.querySelector(".mode-icon");
    
    // Check local storage for previous selection
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "light") {
        document.body.classList.add("light-mode");
        modeIcon.textContent = "☀️";
    }

    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        
        let theme = "dark";
        if (document.body.classList.contains("light-mode")) {
            theme = "light";
            modeIcon.textContent = "☀️";
        } else {
            modeIcon.textContent = "🌙";
        }
        // Save choice to system local storage
        localStorage.setItem("theme", theme);
    });

    // ==========================================
    // FEATURE 2: AUTO TYPEWRITER EFFECT
    // ==========================================
    const words = ["Web Developer", "UI/UX Specialist", "Problem Solver"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingTarget = document.getElementById("typing-text");

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Remove character
            typingTarget.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Add character
            typingTarget.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        // Controlling speeds
        let typeSpeed = isDeleting ? 50 : 100;

        // If word is complete, pause at end
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Wait 2 seconds before deleting
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // Move to next word loop
            typeSpeed = 500; // Small delay before typing next word
        }

        setTimeout(typeEffect, typeSpeed);
    }
    // Start typing routine
    typeEffect();

    // ==========================================
    // FEATURE 3: BACK TO TOP FLOATING ACTION
    // ==========================================
    const backToTopBtn = document.getElementById("back-to-top");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // ==========================================
    // FEATURE 4: DYNAMIC MOUSE GLOW EFFECT
    // ==========================================
    const blob = document.getElementById("blob");

    // Nakikinig ang window sa galaw ng mouse (pointer)
    window.addEventListener("pointermove", (event) => {
        const { clientX, clientY } = event;
        
        // Gumagamit tayo ng Web Animations API para sa 'smooth delay/trailing' effect
        // Imbis na sumunod agad, may konting smooth glide yung glow.
        blob.animate({
            left: `${clientX}px`,
            top: `${clientY}px`
        }, { 
            duration: 3000, 
            fill: "forwards" 
        });
    });
    // ==========================================
    // RESPONSIVE HAMBURGER MENU LOGIC
    // ==========================================
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.getElementById("nav-links");

    mobileMenu.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
        navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach(item => {
        item.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            navLinks.classList.remove("active");
        });
    });

    // ==========================================
    // INTERSECTION OBSERVER (SCROLL DETECTOR)
    // ==========================================
    const sectionsToAnimate = document.querySelectorAll(".animate-on-scroll");
    sectionsToAnimate.forEach((section) => section.classList.add("hidden-element"));

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show-element");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    sectionsToAnimate.forEach(section => observer.observe(section));
});

// ==========================================
    // FEATURE 5: CUSTOM INTERACTIVE CURSOR
    // ==========================================
    const cursorDot = document.querySelector("[data-cursor-dot]");
    const cursorOutline = document.querySelector("[data-cursor-outline]");
    
    // Para lang gumana ang custom cursor sa malalaking screen (Desktop)
    if (window.innerWidth > 768) {
        window.addEventListener("mousemove", function (e) {
            const posX = e.clientX;
            const posY = e.clientY;

            // Mabilis sumunod yung maliit na tuldok
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // May konting smooth delay yung bilog sa labas gamit ang animation
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 150, fill: "forwards" });
        });

        // Hover Effect: Lalaki yung cursor kapag tumapat sa anumang clickables
        const clickables = document.querySelectorAll("a, button, input, textarea, .project-card");
        clickables.forEach(clickable => {
            clickable.addEventListener("mouseover", () => {
                cursorOutline.classList.add("hover-active");
            });
            clickable.addEventListener("mouseleave", () => {
                cursorOutline.classList.remove("hover-active");
            });
        });
    }

    // ==========================================
    // FEATURE 6: SCROLL PROGRESS BAR
    // ==========================================
    const scrollProgress = document.getElementById("scroll-progress");
    
    window.addEventListener("scroll", () => {
        // Kinukuha kung gaano na kalalim ang na-scroll mo vs sa kabuuang haba ng website
        const scrollPx = document.documentElement.scrollTop;
        const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = `${(scrollPx / winHeightPx) * 100}%`;
        
        scrollProgress.style.width = scrolled;
    });

    // ==========================================
    // FEATURE 7: PROJECT FILTER SYSTEM
    // ==========================================
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // Tanggalin ang 'active' class sa lahat ng buttons, at ilagay lang sa kinlik
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            projectCards.forEach(card => {
                if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
                    card.classList.remove("hide-project");
                    card.style.display = "flex";
                    // Simpleng delay para sa smooth fade-in
                    setTimeout(() => { card.style.opacity = "1"; card.style.transform = "scale(1)"; }, 50);
                } else {
                    card.classList.add("hide-project");
                    setTimeout(() => { card.style.display = "none"; }, 300);
                }
            });
        });
    });

    // ==========================================
    // FEATURE 8: 3D TILT EFFECT SA CARDS
    // ==========================================
    const tiltCards = document.querySelectorAll(".tilt-card");
    
    tiltCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position sa loob ng card
            const y = e.clientY - rect.top;  // y position sa loob ng card
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Computations para mag-tilt base sa pwesto ng mouse
            const rotateX = ((y - centerY) / centerY) * -10; // Max 10 degrees tilt
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        // Kapag umalis ang mouse, babalik sa normal
        card.addEventListener("mouseleave", () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // ==========================================
    // FEATURE 9: CINEMATIC PRELOADER
    // ==========================================
    // Maghihintay ng 1.5 seconds bago itago ang preloader (para may cinematic feel)
    setTimeout(() => {
        document.body.classList.add("loaded");
    }, 1500);

    // ==========================================
    // FEATURE 10: LIVE TIMEZONE WIDGET
    // ==========================================
    const liveTimeElement = document.getElementById("live-time");
    function updateTime() {
        // Kumukuha ng current time sa Manila/PH Timezone
        const now = new Date();
        const options = { timeZone: 'Asia/Manila', hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true };
        const phTime = new Intl.DateTimeFormat('en-US', options).format(now);
        if(liveTimeElement) liveTimeElement.textContent = phTime;
    }
    setInterval(updateTime, 1000);
    updateTime(); // Tawagin agad para hindi "Loading..." ang simula

    // ==========================================
    // FEATURE 11: CUSTOM TOAST NOTIFICATIONS
    // ==========================================
    const contactForm = document.getElementById("contactForm");
    const toastBox = document.getElementById("toast-box");

    function showToast(message) {
        const toast = document.createElement("div");
        toast.classList.add("toast");
        toast.innerHTML = `✔️ <span>${message}</span>`;
        toastBox.appendChild(toast);

        // Tatanggalin ang toast after 3 seconds
        setTimeout(() => {
            toast.classList.add("closing");
            toast.addEventListener("animationend", () => { toast.remove(); });
        }, 3000);
    }

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Pinipigilan yung default page reload para cool
            showToast("Message sent successfully!");
            contactForm.reset(); // Lilinisin ang form
        });
    }

    // ==========================================
    // FEATURE 12: DEVELOPER TERMINAL (EASTER EGG)
    // ==========================================
    const terminalModal = document.getElementById("terminal-modal");
    const closeTermBtn = document.getElementById("close-term");
    const termInput = document.getElementById("terminal-input");
    const termBody = document.getElementById("terminal-body");
    const logoTrigger = document.querySelector(".logo");
    let clickCount = 0;

    // Paano buksan: Click the Logo 3 times OR press Alt + T
    logoTrigger.addEventListener("click", () => {
        clickCount++;
        if (clickCount === 3) {
            openTerminal();
            clickCount = 0;
        }
        setTimeout(() => { clickCount = 0; }, 2000); // Reset timer kung mabagal i-click
    });

    document.addEventListener("keydown", (e) => {
        if (e.altKey && e.key.toLowerCase() === 't') {
            openTerminal();
        }
    });

    closeTermBtn.addEventListener("click", closeTerminal);

    function openTerminal() {
        terminalModal.classList.remove("hide-terminal");
        termInput.focus();
    }

    function closeTerminal() {
        terminalModal.classList.add("hide-terminal");
    }

    // Terminal Logic Commands
    termInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const command = termInput.value.trim().toLowerCase();
            if (command) {
                printTermLine(`guest@ruben:~$ ${command}`, "prompt");
                executeCommand(command);
            }
            termInput.value = ""; // Linisin ang tinype
        }
    });

    function printTermLine(text, className = "") {
        const p = document.createElement("p");
        p.className = `term-text ${className}`;
        p.innerHTML = text;
        termBody.appendChild(p);
        termBody.scrollTop = termBody.scrollHeight; // Auto-scroll pababa
    }

    function executeCommand(cmd) {
        switch (cmd) {
            case "help":
                printTermLine("Available commands: <br> - <b>whoami</b>: About the developer <br> - <b>skills</b>: Tech stack <br> - <b>clear</b>: Clear terminal");
                break;
            case "whoami":
                printTermLine("Ruben L. Puno Jr. - A Frontend Wizard from Concepcion, PH.");
                break;
            case "skills":
                printTermLine("HTML, CSS, JS, React, Tailwind, Git... and making things look awesome.");
                break;
            case "clear":
                termBody.innerHTML = "";
                break;
            default:
                printTermLine(`Command not found: ${cmd}. Type 'help' for a list of commands.`, "error");
        }
    }

    // ==========================================
    // FEATURE 13: ANIMATED STATS COUNTER
    // ==========================================
    const statCounters = document.querySelectorAll('.stat-number');
    const speed = 100; // Mas mababa, mas mabilis

    statCounters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            // Compute kung ilang numbers ang idadagdag kada frame
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20); // Ulitin kada 20ms
            } else {
                counter.innerText = target;
            }
        };

        // Maghihintay muna ng 1.5 seconds (para tapos na yung preloader) bago magbilang
        setTimeout(() => {
            updateCount();
        }, 1500); 
    });

    // ==========================================
    // FEATURE 14: TIMELINE SCROLL ANIMATION
    // ==========================================
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Gumagamit tayo ng Intersection Observer para malaman kung nasa screen na yung item
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.2 }); // Mag-t-trigger kapag 20% na ng item ang nakikita sa screen

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
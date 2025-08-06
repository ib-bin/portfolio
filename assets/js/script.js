document.addEventListener('DOMContentLoaded', function () {
    const menu = document.getElementById('menu');
    const navbar = document.querySelector('.navbar');

    // Toggle mobile menu
    menu.addEventListener('click', function () {
        menu.classList.toggle('fa-times');
        navbar.classList.toggle('nav-toggle');
    });

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', handleScroll);

    function handleScroll() {
        menu.classList.remove('fa-times');
        navbar.classList.remove('nav-toggle');

        const scrollTopBtn = document.querySelector('#scroll-top');
        if (window.scrollY > 60) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }

        // Scroll spy
        document.querySelectorAll('section').forEach(section => {
            const height = section.offsetHeight;
            const offset = section.offsetTop - 200;
            const top = window.scrollY;
            const id = section.getAttribute('id');

            if (top > offset && top < offset + height) {
                document.querySelectorAll('.navbar ul li a').forEach(a => {
                    a.classList.remove('active');
                });

                const currentLink = document.querySelector(`.navbar [href="#${id}"]`);
                if (currentLink) currentLink.classList.add('active');
            }
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                window.scrollTo({
                    top: targetEl.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // EmailJS
    emailjs.init("YOUR_PUBLIC_KEY");

    document.getElementById("contact-form").addEventListener("submit", function (e) {
        e.preventDefault();

        emailjs.sendForm("service_id", "template_id", this)
            .then(function () {
                alert("✅ Your message was sent successfully!");
                document.getElementById("contact-form").reset();
            }, function (error) {
                alert("❌ Failed to send message:\n" + JSON.stringify(error));
            });
    });
});

// Visibility change (title and favicon)
document.addEventListener('visibilitychange', function () {
    const favicon = document.getElementById("favicon");
    if (document.visibilityState === "visible") {
        document.title = "Portfolio | ibrahim bin burikan";
        if (favicon) favicon.setAttribute("href", "assets/images/favicon.png");
    } else {
        document.title = "Come Back To Portfolio";
        if (favicon) favicon.setAttribute("href", "assets/images/favhand.png");
    }
});

// Typed.js effect
new Typed(".typing-text", {
    strings: ["Frontend Development", "UI/UX Design", "Responsive Layouts", "Web Development"],
    loop: true,
    typeSpeed: 70,
    backSpeed: 25,
    backDelay: 500,
});

// Fetch skills or projects from JSON
async function fetchData(type = "skills") {
    const response = await fetch(type === "skills" ? "skills.json" : "./projects/projects.json");
    const data = await response.json();
    return data;
}

// Display skills in DOM
function showSkills(skills) {
    const skillsContainer = document.getElementById("skillsContainer");
    if (!skillsContainer) return;

    skillsContainer.innerHTML = skills.map(skill => `
        <div class="bar">
            <div class="info">
                <img src="${skill.icon}" alt="skill" />
                <span>${skill.name}</span>
            </div>
        </div>
    `).join('');
}

// Display projects in DOM
function showProjects(projects) {
    const projectsContainer = document.querySelector("#work .box-container");
    if (!projectsContainer) return;

    let projectHTML = "";
    projects
        .slice(0, 6)
        
        .forEach(project => {
            projectHTML += `
            <div class="box tilt">
                <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
                <div class="content">
                    <div class="tag">
                        <h3>${project.name}</h3>
                    </div>
                    <div class="desc">
                        <p>${project.desc}</p>
                        <div class="btns">
                            <a href="${project.links.view}" class="btn" target="_blank">
                                <i class="fas fa-eye"></i> View
                            </a>
                            <a href="${project.links.code}" class="btn" target="_blank">
                                Code <i class="fas fa-code"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>`;
        });

    projectsContainer.innerHTML = projectHTML;

    // Tilt effect
    VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });

    // ScrollReveal for projects
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });
    srtop.reveal('.work .box', { interval: 200 });
}

// Run fetch for skills and projects
fetchData().then(showSkills).catch(err => console.error("Error loading skills:", err));
fetchData("projects").then(showProjects).catch(err => console.error("Error loading projects:", err));

// ScrollReveal global settings
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

// ScrollReveal for sections
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });
srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });

srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });

srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

srtop.reveal('.education .box', { interval: 200 });
srtop.reveal('.work .box', { interval: 200 });

srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });

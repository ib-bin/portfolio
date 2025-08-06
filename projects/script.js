// When the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Toggle menu icon and navbar on menu click
    document.getElementById('menu').addEventListener('click', function () {
        this.classList.toggle('fa-times');
        document.querySelector('.navbar').classList.toggle('nav-toggle');
    });

    // Remove menu toggles on scroll or page load
    window.addEventListener('scroll', handleScrollOrLoad);
    window.addEventListener('load', handleScrollOrLoad);

    function handleScrollOrLoad() {
        document.getElementById('menu').classList.remove('fa-times');
        document.querySelector('.navbar').classList.remove('nav-toggle');

        // Show or hide scroll-to-top button
        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }
    }
});

// Change page title and favicon when tab visibility changes
document.addEventListener('visibilitychange', function () {
    const favicon = document.getElementById("favicon");

    if (document.visibilityState === "visible") {
        document.title = "Projects | Portfolio ibrahim bin burikan";
        favicon.setAttribute("href", "/assets/images/favicon.png");
    } else {
        document.title = "Come Back To Portfolio";
        favicon.setAttribute("href", "/assets/images/favhand.png");
    }
});

// Fetch project data from JSON file
function getProjects() {
    return fetch("projects.json")
     .then(response => response.json())
     .then(data => data);
}

// Display fetched projects on the page
function showProjects(projects) {
    const projectsContainer = document.querySelector(".work .box-container");
    let projectsHTML = "";

    projects.forEach(project => {
        projectsHTML += `
        <div class="grid-item ${project.category}">
            <div class="box tilt" style="width: 380px; margin: 1rem">
                <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
                <div class="content">
                    <div class="tag">
                        <h3>${project.name}</h3>
                    </div>
                    <div class="desc">
                        <p>${project.desc}</p>
                        <div class="btns">
                            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    });

    projectsContainer.innerHTML = projectsHTML;

    // You can initialize VanillaTilt and ScrollReveal here if needed

    const buttonGroup = document.querySelector('.button-group');
    const buttons = buttonGroup.querySelectorAll('button');

    // Filter project items on button click
    buttonGroup.addEventListener('click', function (e) {
        if (e.target.tagName === 'BUTTON') {
            // Remove 'is-checked' from all buttons
            buttons.forEach(btn => btn.classList.remove('is-checked'));

            // Add 'is-checked' to the clicked button
            e.target.classList.add('is-checked');

            // Get the filter value
            const filterValue = e.target.getAttribute('data-filter');
            const items = document.querySelectorAll('.grid-item');

            // Show/hide items based on filter
            items.forEach(item => {
                if (filterValue === '*' || item.classList.contains(filterValue.slice(1))) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }
    });
}

// Start fetching and displaying projects
getProjects().then(data => {
    showProjects(data);
});

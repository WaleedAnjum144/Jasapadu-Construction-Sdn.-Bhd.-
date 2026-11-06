/* =========================================================
   JASAPADU CONSTRUCTION DEVELOPMENT
   CAREER PAGE - 5 DEPARTMENT TABS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const careerContent = document.querySelector("#career-content");
    const careerTabs = document.querySelectorAll(".jcd-career-tab");

    if (!careerContent || !careerTabs.length) return;


    /* -----------------------------------------------------
       1. DEPARTMENT DATA
    ----------------------------------------------------- */

    const careerDepartments = {

        site: {
            number: "01",
            title: "Site Operations & Construction",
            subtitle: "Building Construction & Civil Engineering",

            image: "asset/career/construction.jpg",

            heading: "Build Your Career on Solid Foundations",

            description:
                "Be part of our construction and site operations teams, contributing to building construction, civil engineering and project execution.",

            responsibilities: [
                "Assist with daily construction site operations.",
                "Coordinate site activities and work schedules.",
                "Monitor project progress and work quality.",
                "Coordinate with engineers, supervisors and contractors.",
                "Follow workplace safety procedures and project requirements."
            ],

            requirements: [
                "Relevant education or experience in construction.",
                "Good communication and teamwork skills.",
                "Ability to work in a site environment.",
                "Good problem-solving and organizational skills.",
                "Commitment to safety and quality standards."
            ]
        },


        engineering: {
            number: "02",
            title: "Mechanical & Electrical",
            subtitle: "Mechanical, Electrical & Technical Works",

            image: "asset/career/mechanical-electrical.jpg",

            heading: "Powering Projects Through Engineering",

            description:
                "Explore opportunities in mechanical and electrical works, technical coordination and engineering support across our projects.",

            responsibilities: [
                "Assist with mechanical and electrical project activities.",
                "Support installation, inspection and maintenance work.",
                "Coordinate with technical teams and site personnel.",
                "Help monitor equipment and project requirements.",
                "Maintain technical records and work documentation."
            ],

            requirements: [
                "Relevant technical education or experience.",
                "Understanding of mechanical or electrical systems.",
                "Ability to read basic technical drawings.",
                "Good teamwork and communication skills.",
                "Commitment to workplace safety and quality."
            ]
        },


        commercial: {
            number: "03",
            title: "Contract & Procurement",
            subtitle: "Commercial Management & Supply Chain",

            image: "asset/career/contract-commercial.jpg",

            heading: "Support Projects Through Smart Coordination",

            description:
                "Contribute to project coordination, contract administration, procurement activities and supplier relationships.",

            responsibilities: [
                "Assist with contract and project documentation.",
                "Coordinate quotations and procurement requests.",
                "Communicate with suppliers and subcontractors.",
                "Monitor purchase orders and delivery schedules.",
                "Maintain records of costs, quotations and project documents."
            ],

            requirements: [
                "Relevant education in business, procurement or a related field.",
                "Good administrative and organizational skills.",
                "Basic understanding of purchasing and documentation.",
                "Good communication and negotiation skills.",
                "Proficiency in Microsoft Office applications."
            ]
        },


        administration: {
            number: "04",
            title: "HR & Administration",
            subtitle: "Human Resources & Office Administration",

            image: "asset/career/hr-administration.jpg",

            heading: "Help Build a Stronger Workplace",

            description:
                "Support our people and daily business operations through human resource coordination, administration and office management.",

            responsibilities: [
                "Assist with employee records and documentation.",
                "Support recruitment and onboarding activities.",
                "Coordinate office administration and daily operations.",
                "Maintain files, reports and internal records.",
                "Assist with staff coordination and communication."
            ],

            requirements: [
                "Relevant education in HR, business or administration.",
                "Good communication and interpersonal skills.",
                "Strong organizational and time-management abilities.",
                "Basic computer and Microsoft Office knowledge.",
                "Ability to handle administrative tasks responsibly."
            ]
        },


        maintenance: {
            number: "05",
            title: "Maintenance & Agriculture",
            subtitle: "Cleaning, Maintenance & Plantation Services",

            image: "asset/career/agriculture.jpg",

            heading: "Keep Workplaces and Environments Running",

            description:
                "Be part of teams supporting cleaning, maintenance, agriculture and plantation-related services.",

            responsibilities: [
                "Support cleaning and maintenance operations.",
                "Assist with plantation and agricultural activities.",
                "Coordinate daily service tasks and work schedules.",
                "Monitor equipment, tools and work materials.",
                "Follow operational procedures and safety requirements."
            ],

            requirements: [
                "Relevant experience in maintenance, cleaning or agriculture is an advantage.",
                "Ability to work independently and as part of a team.",
                "Good communication and practical problem-solving skills.",
                "Willingness to work in different operational environments.",
                "Responsible attitude towards safety and work quality."
            ]
        }

    };


    /* -----------------------------------------------------
       2. RENDER DEPARTMENT CONTENT
    ----------------------------------------------------- */

    // Check icon used in every list item (matches the static HTML markup)
    const checkIcon = '<i class="fa-solid fa-check" aria-hidden="true"></i>';

    function renderDepartment(departmentKey) {

        const department = careerDepartments[departmentKey];

        if (!department) return;

        const responsibilitiesHTML = department.responsibilities
            .map(item => `<li>${checkIcon}<span>${item}</span></li>`)
            .join("");

        const requirementsHTML = department.requirements
            .map(item => `<li>${checkIcon}<span>${item}</span></li>`)
            .join("");

        careerContent.innerHTML = `

            <div class="jcd-career-department">

                <!-- DEPARTMENT BANNER -->
                <div class="jcd-career-banner">

                    <img
                        src="${department.image}"
                        alt="${department.title}"
                        onerror="this.style.display='none'"
                    >

                    <div class="jcd-career-banner-overlay"></div>

                    <div class="jcd-career-banner-text">

                        <span>DEPARTMENT ${department.number}</span>

                        <h2>${department.title}</h2>

                        <p>${department.subtitle}</p>

                    </div>

                </div>


                <!-- DESCRIPTION -->
                <div class="jcd-career-description">

                    <span class="jcd-career-small-title">
                        WORK WITH US
                    </span>

                    <h2>${department.heading}</h2>

                    <p>${department.description}</p>

                </div>


                <!-- RESPONSIBILITIES & REQUIREMENTS -->
                <div class="jcd-career-details">


                    <!-- RESPONSIBILITIES -->
                    <div class="jcd-career-detail-box">

                        <div class="jcd-career-detail-heading">

                            <span class="jcd-career-detail-icon">
                                <i class="fa-solid fa-list-check"></i>
                            </span>

                            <h3>Key Responsibilities</h3>

                        </div>

                        <ul>
                            ${responsibilitiesHTML}
                        </ul>

                    </div>


                    <!-- REQUIREMENTS -->
                    <div class="jcd-career-detail-box">

                        <div class="jcd-career-detail-heading">

                            <span class="jcd-career-detail-icon">
                                <i class="fa-solid fa-user-check"></i>
                            </span>

                            <h3>Candidate Requirements</h3>

                        </div>

                        <ul>
                            ${requirementsHTML}
                        </ul>

                    </div>

                </div>


                <!-- VACANCY STATUS -->
                <div class="jcd-career-vacancy">

                    <div class="jcd-career-vacancy-icon">
                        <i class="fa-solid fa-briefcase"></i>
                    </div>

                    <div class="jcd-career-vacancy-text">

                        <span>CURRENT OPPORTUNITIES</span>

                        <h3>No Current Vacancies Available</h3>

                        <p>
                            There are currently no open positions in this
                            department. You are welcome to submit your resume
                            for future consideration.
                        </p>

                    </div>

                </div>


                <!-- APPLY CTA -->
                <div class="jcd-career-apply">

                    <div>

                        <span>YOUR NEXT CAREER MOVE</span>

                        <h3>Want to Be Part of Our Team?</h3>

                        <p>
                            Send your resume to our recruitment team.
                        </p>

                    </div>

                    <a href="mailto:jasapadufw@gmail.com?subject=${encodeURIComponent(
                        "Job Application - " + department.title
                    )}">

                        Submit Your Resume

                        <i class="fa-solid fa-arrow-right"></i>

                    </a>

                </div>

            </div>

        `;

    }


    /* -----------------------------------------------------
       3. TAB CLICK FUNCTIONALITY
    ----------------------------------------------------- */

    careerTabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

            const departmentKey = this.dataset.department;

            // Remove active class from all tabs
            careerTabs.forEach(function (item) {

                item.classList.remove("active");

                item.setAttribute("aria-selected", "false");

            });


            // Activate clicked tab
            this.classList.add("active");

            this.setAttribute("aria-selected", "true");


            // Render selected department
            renderDepartment(departmentKey);

        });

    });


    /* -----------------------------------------------------
       4. INITIAL DEPARTMENT
    ----------------------------------------------------- */

    renderDepartment("site");

});

document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll("[data-animate]");

    if (!("IntersectionObserver" in window)) {
        items.forEach(el => el.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.style.setProperty("--delay", (el.dataset.delay || 0) + "ms");
                el.classList.add("is-visible");
                observer.unobserve(el);   // animate once only
            }
            // To fade OUT again when leaving the screen, replace the
            // block above with: entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
    }, { threshold: 0.15 });

    items.forEach(el => observer.observe(el));
});
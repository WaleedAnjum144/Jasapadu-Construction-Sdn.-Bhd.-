/* =========================================
   JASAPADU - COMPLETED PROJECTS
   PROJECT DATA + FILTER + SEARCH + MODAL
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const projects = [

        {
            id: "01",
            title: "Floor Surface Preparation, Scania Factory, Shah Alam",
            client: "Richman Builders",
            value: 151696,
            period: "May–Aug 2003",
            category: "industrial",
            categoryName: "Industrial",
            icon: "🏭",
            description:
                "Floor surface preparation works at Scania Factory, Shah Alam.",
            image: ""
        },

        {
            id: "02",
            title: "Pilecap Works, 634-Unit Service Apartment, Pekan Serdang",
            client: "Sonstar Construction",
            value: 1402369.79,
            period: "Jan–Jun 2004",
            category: "residential",
            categoryName: "Residential",
            icon: "🏢",
            description:
                "Pilecap construction works for a 634-unit service apartment development in Pekan Serdang.",
            image: ""
        },

        {
            id: "03",
            title: "Finishes, SIRIM RAMET, Hulu Selangor",
            client: "Richman Builder",
            value: 450000,
            period: "Mar–May 2004",
            category: "industrial",
            categoryName: "Industrial",
            icon: "🏗️",
            description:
                "Finishing works for the SIRIM RAMET project in Hulu Selangor.",
            image: ""
        },

        {
            id: "04",
            title: "Villa Maarof, Sg. Penchala – Piling Works",
            client: "Ganz Build",
            value: 203087.50,
            period: "Jun–Jul 2006",
            category: "residential",
            categoryName: "Residential",
            icon: "🏘️",
            description:
                "Piling works for a residential development consisting of 24 townhouses at Villa Maarof, Sg. Penchala.",
            image: ""
        },

        {
            id: "05",
            title: "Villa Maarof – Building Works",
            client: "Ganz Build",
            value: 2091720,
            period: "Jul 2006–Nov 2007",
            category: "residential",
            categoryName: "Residential",
            icon: "🏠",
            description:
                "Building construction works for the Villa Maarof residential development.",
            image: ""
        },

        {
            id: "06",
            title: "Terrace/Semi-D, Seksyen 30 Shah Alam – Earthworks",
            client: "Benih Bagus",
            value: 195000,
            period: "15 Aug–14 Sep 2007",
            category: "residential",
            categoryName: "Residential",
            icon: "🚜",
            description:
                "Earthworks for a terrace and semi-detached residential development in Seksyen 30, Shah Alam.",
            image: ""
        },

        {
            id: "07",
            title: "Terrace/Semi-D, Seksyen 30 – Building Works",
            client: "Benih Bagus",
            value: 3420300,
            period: "1 Nov 2007–30 Apr 2009",
            category: "residential",
            categoryName: "Residential",
            icon: "🏘️",
            description:
                "Building construction works for the terrace and semi-detached development in Seksyen 30.",
            image: ""
        },

        {
            id: "08",
            title: "Marine Police Base, Lahad Datu – Lightweight Roof Truss",
            client: "Sabaedge",
            value: 744147.90,
            period: "15 Aug 2008–Mar 2010",
            category: "infrastructure",
            categoryName: "Infrastructure",
            icon: "🏛️",
            description:
                "Lightweight roof truss works for the Marine Police Base development in Lahad Datu.",
            image: ""
        },

        {
            id: "09",
            title: "Marine Police Base – Roof Tiles & Accessories",
            client: "Sabaedge",
            value: 217707.80,
            period: "1 Dec 2008–Jul 2010",
            category: "infrastructure",
            categoryName: "Infrastructure",
            icon: "🏗️",
            description:
                "Roof tile and accessories works for the Marine Police Base project.",
            image: ""
        }

    ];

    const grid = document.getElementById("jcdProjectGrid");
    const searchInput = document.getElementById("jcdProjectSearch");
    const filterButtons = document.querySelectorAll(".jcd-filter-btn");
    const noResults = document.getElementById("jcdNoResults");

    const modal = document.getElementById("jcdProjectModal");

    if (!grid || !modal) return;

    let activeFilter = "all";
    let searchTerm = "";

    /* -------------------------------------
       FORMAT CURRENCY
    ------------------------------------- */

    function formatCurrency(value) {

        return "RM " + Number(value).toLocaleString("en-MY", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

    }

    /* -------------------------------------
       RENDER PROJECT CARDS
    ------------------------------------- */

    function renderProjects() {

        const filteredProjects = projects.filter(function (project) {

            const matchesCategory =
                activeFilter === "all" ||
                project.category === activeFilter;

            const searchableText = [
                project.title,
                project.client,
                project.categoryName,
                project.period,
                project.description
            ].join(" ").toLowerCase();

            const matchesSearch =
                searchableText.includes(searchTerm);

            return matchesCategory && matchesSearch;

        });

        grid.innerHTML = filteredProjects.map(function (project) {

            const visual = project.image
                ? `
                    <div class="jcd-project-visual">
                        <img
                            src="${project.image}"
                            alt="${project.title}"
                            loading="lazy"
                        >
                        <span class="jcd-project-number">
                            PROJECT ${project.id}
                        </span>
                    </div>
                `
                : `
                    <div class="jcd-project-visual">
                        <div class="jcd-project-placeholder">
                            <span class="jcd-project-placeholder-icon">
                                ${project.icon}
                            </span>
                            <small>Jasapadu Construction</small>
                        </div>

                        <span class="jcd-project-number">
                            PROJECT ${project.id}
                        </span>
                    </div>
                `;

            return `
                <article class="jcd-project-card">

                    ${visual}

                    <div class="jcd-project-info">

                        <span class="jcd-project-category">
                            ${project.categoryName}
                        </span>

                        <h3>${project.title}</h3>

                        <div class="jcd-project-client">
                            <span>Client</span>
                            <strong>${project.client}</strong>
                        </div>

                        <div class="jcd-project-meta">

                            <div>
                                <span>Contract Value</span>
                                <strong>${formatCurrency(project.value)}</strong>
                            </div>

                            <div>
                                <span>Period</span>
                                <strong>${project.period}</strong>
                            </div>

                        </div>

                        <div class="jcd-project-footer">

                            <button
                                type="button"
                                class="jcd-project-details-btn"
                                data-project-id="${project.id}"
                                aria-label="View details for ${project.title}"
                            >
                                View Project Details
                                <span>→</span>
                            </button>

                        </div>

                    </div>

                </article>
            `;

        }).join("");

        noResults.hidden = filteredProjects.length !== 0;

    }

    /* -------------------------------------
       CATEGORY FILTER
    ------------------------------------- */

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            activeFilter = button.dataset.filter;

            renderProjects();

        });

    });

    /* -------------------------------------
       PROJECT SEARCH
    ------------------------------------- */

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            searchTerm = searchInput.value.trim().toLowerCase();

            renderProjects();

        });

    }

    /* -------------------------------------
       OPEN PROJECT DETAILS
    ------------------------------------- */

    function openProject(projectId) {

        const project = projects.find(function (item) {
            return item.id === projectId;
        });

        if (!project) return;

        document.getElementById("jcdModalTitle").textContent =
            project.title;

        document.getElementById("jcdModalCategory").textContent =
            project.categoryName;

        document.getElementById("jcdModalNumber").textContent =
            "PROJECT " + project.id;

        document.getElementById("jcdModalClient").textContent =
            project.client;

        document.getElementById("jcdModalValue").textContent =
            formatCurrency(project.value);

        document.getElementById("jcdModalPeriod").textContent =
            project.period;

        document.getElementById("jcdModalDescription").textContent =
            project.description;

        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        const closeButton = modal.querySelector(".jcd-modal-close");

        if (closeButton) {
            closeButton.focus();
        }

    }

    /* -------------------------------------
       CLOSE PROJECT DETAILS
    ------------------------------------- */

    function closeProjectModal() {

        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

    }

    /* -------------------------------------
       EVENT DELEGATION
    ------------------------------------- */

    grid.addEventListener("click", function (event) {

        const button = event.target.closest("[data-project-id]");

        if (!button) return;

        openProject(button.dataset.projectId);

    });

    modal.addEventListener("click", function (event) {

        if (event.target.closest("[data-close-modal]")) {
            closeProjectModal();
        }

    });

    /* -------------------------------------
       ESCAPE KEY
    ------------------------------------- */

    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            modal.classList.contains("is-open")
        ) {
            closeProjectModal();
        }

    });

    /* -------------------------------------
       INITIALIZE
    ------------------------------------- */

    renderProjects();

});



/* =========================================
   JASAPADU - WORK GALLERY
   HTML IMAGES + LOAD MORE + LIGHTBOX
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const gallery = document.querySelector(".jcd-gallery-grid");
    const loadButton = document.getElementById("jcdGalleryLoad");
    const loadNote = document.getElementById("jcdGalleryLoadNote");
    const lightbox = document.getElementById("jcdLightbox");

    if (!gallery || !lightbox) return;

    const items = Array.from(
        gallery.querySelectorAll(".jcd-gallery-item")
    );

    const initialImages = 12;
    const imagesPerClick = 8;

    let visibleCount = initialImages;
    let currentIndex = 0;
    let lightboxItems = [];

    const lightboxImage = document.getElementById("jcdLightboxImage");
    const lightboxTitle = document.getElementById("jcdLightboxTitle");
    const lightboxCounter = document.getElementById("jcdLightboxCounter");

    // SHOW IMAGES
    function renderGallery() {

        items.forEach(function (item, index) {
            item.classList.toggle("is-hidden", index >= visibleCount);
        });

        const shown = Math.min(visibleCount, items.length);

        loadNote.textContent =
            `Showing ${shown} of ${items.length} photographs`;

        loadButton.disabled = shown >= items.length;

        lightboxItems = items.slice(0, shown);
    }

    // LOAD MORE
    loadButton.addEventListener("click", function () {

        visibleCount += imagesPerClick;
        renderGallery();

    });

    // OPEN LIGHTBOX
    function openLightbox(index) {

        currentIndex = index;

        const image = lightboxItems[currentIndex].querySelector("img");

        if (!image) return;

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        lightboxTitle.textContent =
            image.alt || "Project photograph";

        lightboxCounter.textContent =
            `${currentIndex + 1} / ${lightboxItems.length}`;

        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";
    }

    // NEXT IMAGE
    function nextImage() {

        if (!lightboxItems.length) return;

        currentIndex =
            (currentIndex + 1) % lightboxItems.length;

        openLightbox(currentIndex);
    }

    // PREVIOUS IMAGE
    function previousImage() {

        if (!lightboxItems.length) return;

        currentIndex =
            (currentIndex - 1 + lightboxItems.length) %
            lightboxItems.length;

        openLightbox(currentIndex);
    }

    // CLOSE LIGHTBOX
    function closeLightbox() {

        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";
        lightboxImage.src = "";
    }

    // GALLERY IMAGE CLICK
    gallery.addEventListener("click", function (event) {

        const item = event.target.closest(".jcd-gallery-item");

        if (!item || item.classList.contains("is-hidden")) return;

        const index = lightboxItems.indexOf(item);

        if (index !== -1) openLightbox(index);
    });

    // KEYBOARD ACCESSIBILITY
    items.forEach(function (item) {

        item.setAttribute("role", "button");
        item.setAttribute("tabindex", "0");

        item.addEventListener("keydown", function (event) {

            if (event.key !== "Enter" && event.key !== " ") return;

            event.preventDefault();

            if (item.classList.contains("is-hidden")) return;

            const index = lightboxItems.indexOf(item);

            if (index !== -1) openLightbox(index);
        });
    });

    // LIGHTBOX BUTTONS
    lightbox.querySelector(".jcd-lightbox-close")
        .addEventListener("click", closeLightbox);

    lightbox.querySelector(".jcd-lightbox-next")
        .addEventListener("click", nextImage);

    lightbox.querySelector(".jcd-lightbox-prev")
        .addEventListener("click", previousImage);

    // CLOSE WHEN CLICKING OUTSIDE IMAGE
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) closeLightbox();
    });

    // KEYBOARD CONTROLS
    document.addEventListener("keydown", function (event) {

        if (!lightbox.classList.contains("is-open")) return;

        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowRight") nextImage();
        if (event.key === "ArrowLeft") previousImage();
    });

    // INITIALIZE
    renderGallery();

});


document.addEventListener("DOMContentLoaded", () => {

    const elements = document.querySelectorAll(`
        [data-reveal],
        .jcd-gallery-heading,
        .jcd-gallery-item,
        .jcd-gallery-load-wrap
    `);

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
            } else {
                entry.target.classList.remove("is-visible");
            }

        });

    }, {
        threshold: 0.15
    });

    elements.forEach(element => observer.observe(element));

});
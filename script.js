
/* =========================================
   JASAPADU CONSTRUCTION DEVELOPMENT
   COMPLETE UPDATED JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       1. STICKY HEADER
    ===================================== */

    const header = document.querySelector(".site-header");

    function updateHeader() {
        if (!header) return;

        header.classList.toggle("scrolled", window.scrollY > 50);
    }

    if (header) {
        window.addEventListener("scroll", updateHeader, { passive: true });
        updateHeader();
    }


    /* =====================================
       2. MOBILE MENU + ABOUT DROPDOWN
    ===================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".main-nav");
    const dropdown = document.querySelector(".nav-item.has-dropdown");
    const dropdownToggle = dropdown?.querySelector(".dropdown-toggle, .nav-link");

    function isMobileMenu() {
        return window.matchMedia("(max-width: 620px)").matches;
    }

    function closeDropdown() {
        if (!dropdown) return;

        dropdown.classList.remove("open");

        if (dropdownToggle) {
            dropdownToggle.setAttribute("aria-expanded", "false");
        }
    }

    function closeMobileMenu() {
        if (!nav || !menuToggle) return;

        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");

        closeDropdown();
    }

    function openDropdown() {
        if (!dropdown) return;

        dropdown.classList.add("open");

        if (dropdownToggle) {
            dropdownToggle.setAttribute("aria-expanded", "true");
        }
    }

    if (menuToggle && nav) {

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.addEventListener("click", function (e) {
            e.preventDefault();

            const isOpen = nav.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));

            if (!isOpen) {
                closeDropdown();
            }
        });

    }

    if (dropdown && dropdownToggle) {

        dropdownToggle.setAttribute("aria-haspopup", "true");
        dropdownToggle.setAttribute("aria-expanded", "false");

        dropdownToggle.addEventListener("click", function (e) {

            // Click behaviour for tablet and mobile
            if (isMobileMenu() || window.matchMedia("(max-width: 1100px)").matches) {

                e.preventDefault();
                e.stopPropagation();

                const isOpen = dropdown.classList.contains("open");

                if (isOpen) {
                    closeDropdown();
                } else {
                    openDropdown();
                }

            }

        });

        // Desktop hover behaviour
        dropdown.addEventListener("mouseenter", function () {

            if (window.matchMedia("(min-width: 1101px) and (hover: hover)").matches) {
                openDropdown();
            }

        });

        dropdown.addEventListener("mouseleave", function () {

            if (window.matchMedia("(min-width: 1101px) and (hover: hover)").matches) {
                closeDropdown();
            }

        });

        // Keyboard accessibility
        dropdown.addEventListener("focusout", function (e) {

            if (
                window.matchMedia("(min-width: 1101px)").matches &&
                !dropdown.contains(e.relatedTarget)
            ) {
                closeDropdown();
            }

        });

    }

    // Close dropdown when clicking outside
    document.addEventListener("click", function (e) {

        if (dropdown && !dropdown.contains(e.target)) {
            closeDropdown();
        }

    });

    // Submenu links close the dropdown and mobile navigation
    if (dropdown) {

        dropdown.querySelectorAll(".nav-dropdown a").forEach(link => {

            link.addEventListener("click", function () {

                closeDropdown();

                if (isMobileMenu()) {
                    closeMobileMenu();
                }

            });

        });

    }

    // Normal navigation links close the mobile menu
    if (nav) {

        nav.querySelectorAll(":scope > a").forEach(link => {

            link.addEventListener("click", function () {

                if (isMobileMenu()) {
                    closeMobileMenu();
                }

            });

        });

    }

    // Reset mobile navigation when switching to desktop
    window.addEventListener("resize", function () {

        if (!isMobileMenu()) {

            if (nav) nav.classList.remove("open");

            if (menuToggle) {
                menuToggle.setAttribute("aria-expanded", "false");
            }

        }

        closeDropdown();

    });



    /* =========================================
       3. HERO PROJECT SLIDER
    ========================================= */

    const hero = document.querySelector(".hero");

    if (hero) {
        const slides = [...hero.querySelectorAll(".hero-slide")];
        const dotsContainer = hero.querySelector(".slider-dots");

        const currentCounter = hero.querySelector(".current-slide");
        const totalCounter = hero.querySelector(".total-slides");

        let currentIndex = 0;
        let autoplay = null;

        if (slides.length && dotsContainer) {

            // CREATE DOTS
            dotsContainer.innerHTML = "";

            slides.forEach((slide, index) => {
                const dot = document.createElement("button");

                dot.type = "button";
                dot.setAttribute(
                    "aria-label",
                    "Show project " + (index + 1)
                );

                dot.addEventListener("click", function () {
                    showSlide(index);
                    restartAutoplay();
                });

                dotsContainer.appendChild(dot);
            });

            const dots = [...dotsContainer.querySelectorAll("button")];

            // TOTAL SLIDES
            if (totalCounter) {
                totalCounter.textContent =
                    String(slides.length).padStart(2, "0");
            }

            // CHANGE SLIDE
            function showSlide(index) {
                currentIndex = (index + slides.length) % slides.length;

                slides.forEach((slide, i) => {
                    slide.classList.toggle("active", i === currentIndex);
                });

                dots.forEach((dot, i) => {
                    dot.classList.toggle("active", i === currentIndex);
                });

                if (currentCounter) {
                    currentCounter.textContent =
                        String(currentIndex + 1).padStart(2, "0");
                }
            }

            // NEXT SLIDE
            function nextSlide() {
                showSlide(currentIndex + 1);
            }

            // AUTOPLAY
            function startAutoplay() {
                clearInterval(autoplay);

                if (slides.length > 1) {
                    autoplay = setInterval(nextSlide, 6000);
                }
            }

            function restartAutoplay() {
                startAutoplay();
            }

            // INITIALIZE
            showSlide(0);
            startAutoplay();

            // PAUSE WHEN MOUSE HOVERS
            hero.addEventListener("mouseenter", function () {
                clearInterval(autoplay);
            });

            hero.addEventListener("mouseleave", function () {
                startAutoplay();
            });
        }
    }


    /* =====================================
       4. STATISTICS COUNTER
    ===================================== */

    const counters = document.querySelectorAll("[data-count]");

    if ("IntersectionObserver" in window && counters.length) {

        const counterObserver = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const element = entry.target;
                const target = Number(element.dataset.count);

                if (!Number.isFinite(target)) {
                    counterObserver.unobserve(element);
                    return;
                }

                const duration = 1400;
                const startTime = performance.now();

                function animateCounter(now) {

                    const progress = Math.min(
                        (now - startTime) / duration,
                        1
                    );

                    const value = Math.floor(
                        target * (1 - Math.pow(1 - progress, 3))
                    );

                    element.textContent = value.toLocaleString();

                    if (progress < 1) {
                        requestAnimationFrame(animateCounter);
                    }

                }

                requestAnimationFrame(animateCounter);
                counterObserver.unobserve(element);

            });

        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));

    }


    /* ===== PROJECTS (JS) ===== */

    /* 1. DATA — [lat, lng]. Slider follows this order. */
    const projects = [
        { name: "Scania Factory", location: "Shah Alam", state: "Selangor", coords: [3.0738, 101.5183], lbl: [-42, -18, "end"], image: "asset/hero images/scania factory.webp" },
        { name: "Service Apartment", location: "Pekan Serdang", state: "Selangor", coords: [2.9840, 101.7160], lbl: [24, -6, "start"], image: " asset/hero images/aprtments Pekan Serdang.jpg" },
        { name: "SIRIM RAMET", location: "Rasa Industrial Area, Hulu Selangor", state: "Selangor", coords: [3.5920, 101.5700], lbl: [24, -18, "start"], image: "asset/hero images/sirim ramet Industrial.jpeg" },
        { name: "Villa Maarof", location: "Sungai Penchala", state: "Kuala Lumpur", coords: [3.1560, 101.6280], lbl: [24, -26, "start"], image: "asset/hero images/villa maarof.jpg" },
        { name: "Yayasan Melaka Office", location: "Bandar Melaka, Melaka Tengah", state: "Melaka", coords: [2.1950, 102.2500], lbl: [-26, 14, "end"], image: "asset/hero images/MENARA-YAYASAN-MELAKA-3.jpg" }
        /* Marine Police Base — location TBC. Add here once confirmed. */
    ];
    const DELAY = 6000;   // ms per location
    /* Projects sharing the same `state` appear together in ONE card (max 4: 1 = large, 2 = side by side, 3 = 2 above + 1 below, 4 = 2x2). */

    /* 2. MAP — traced from the reference map image. Borders = white lines, fill = land shape. */
    const LAND_FILL = "M732,554L730,556L730,564L726,568L728,574L731,576L736,576L738,574L738,565L734,555ZM263,252L262,257L264,259L264,272L262,274L275,276L279,269L282,257L274,251L267,253ZM200,137L200,145L208,148L209,158L214,156L217,157L214,164L219,169L222,165L222,157L232,150L231,142L225,137L223,133L216,139ZM261,106L260,123L258,126L259,130L256,137L257,144L263,157L271,164L272,169L282,187L285,205L284,227L282,228L282,238L286,246L286,262L292,271L292,284L290,291L284,296L284,298L293,316L295,318L299,316L299,322L307,323L308,329L313,332L311,342L314,349L311,352L312,362L308,387L313,395L315,405L321,405L332,414L333,424L324,426L325,439L329,442L336,443L338,451L344,452L352,462L360,466L366,472L367,478L371,486L386,504L389,505L395,512L396,525L399,532L393,536L387,536L387,538L391,540L390,546L395,546L392,552L393,560L396,562L406,563L413,573L450,592L453,598L459,604L461,613L463,611L469,610L473,612L476,617L482,619L490,629L539,651L541,653L541,656L555,669L559,676L572,676L579,680L586,689L593,690L616,704L637,713L643,722L648,738L655,745L659,736L668,733L675,724L684,724L690,721L694,721L706,727L711,726L713,724L714,713L717,714L719,718L719,724L724,728L724,733L732,736L738,736L741,733L745,733L745,726L747,723L743,710L742,701L739,697L739,692L736,688L735,682L732,677L729,677L727,675L726,663L718,651L715,643L709,636L710,628L707,624L706,619L693,605L693,596L690,590L684,585L684,583L677,583L667,578L655,566L646,551L648,516L645,504L645,494L651,482L641,470L634,455L634,452L639,447L639,438L641,431L646,429L644,421L641,416L641,410L648,403L647,399L653,389L653,385L648,370L650,359L648,342L646,337L647,329L610,263L592,244L579,239L557,222L549,211L537,203L521,172L516,167L500,161L493,164L485,158L484,177L469,190L466,205L453,219L450,219L446,214L437,216L434,211L434,206L431,205L428,200L424,199L405,206L397,211L389,213L385,225L381,229L373,232L364,221L360,221L356,216L356,211L360,203L363,200L367,199L369,196L370,177L366,173L366,170L370,167L370,161L368,159L360,160L357,157L354,157L350,161L340,160L338,158L339,150L337,147L336,139L333,136L329,136L328,131L324,131L318,136L314,136L302,132L297,128L286,127L279,121L277,113L273,106Z";
    const BORDER_LINES = "M400,457L398,450L401,448L411,454M559,560L559,557L557,554L554,554L535,541L522,528L506,524M343,421L339,421L335,423M391,538L391,543L395,544M313,359L311,356L311,353L315,347M313,359L317,358M313,359L308,386L311,389L311,392L313,394L314,402L316,404L323,406L332,414L332,420L334,423M285,227L284,226L285,204L283,189L278,181L271,164L265,157M285,227L282,229L282,237L284,240M284,241L286,245L286,261L292,271L291,275L292,285L290,290M403,351L400,343L404,340L404,337L408,332L407,327L413,322L413,314L411,309L413,307L417,286L420,281L421,275L431,265L442,266L447,263L447,248L444,246L438,245L439,235L437,233L437,229L441,224L441,217M303,293L304,296L308,297L313,292L314,289L323,281L324,277L329,273L331,269L338,268L343,263L344,251L347,248L349,248L353,242L353,238L351,234L356,228L357,220M399,543L403,541L403,537L400,535M396,545L393,552L393,559L395,561L406,563L415,573L445,589L450,590M315,346L312,344L311,338L313,335M392,537L398,534M539,206L534,199L521,173L515,167L502,162L499,162L496,165L486,160M649,483L644,498L647,513L647,531L645,547L646,552L653,564L668,580M540,207L547,210L558,223L580,240L590,243L607,260L614,270L625,293L628,296L645,326L649,354L649,363L647,367L652,383L652,391L647,398L647,402L644,404M728,712L721,716M719,716L714,712M220,156L221,166L217,167L214,163L218,156M504,523L493,519L485,521L481,515L477,515L470,509L468,511M713,711L709,703M720,717L719,723L724,728L725,733L730,735L738,735L740,733L745,732L746,718L742,708L741,700L739,698L738,691L733,679L726,674L726,664L708,634L709,627L706,623L706,620L692,604L692,595L684,584L677,583L674,581L669,581M431,450L429,447L430,440L427,435L427,428L425,424L427,413L419,407L418,401L414,398L412,386L410,384L411,380L409,378L403,377L400,374L403,367L402,361L403,353M320,345L316,346M644,404L643,403L633,403L632,404L630,416L632,418L634,433L631,436M644,404L640,412L645,428L640,433L639,446L635,449L634,456L640,469L647,477L649,482M201,138L207,137L211,139L216,139L221,135M217,155L210,157L208,154L208,148L200,144L200,139M465,348L455,338L455,336L452,335L450,337L450,348L444,351L436,358L429,358L422,354L412,356L404,352M285,240L299,240L303,242L304,268L307,290L303,292M432,451L438,458L447,461L454,470L454,476L449,482L449,485L451,488L451,494L449,498L457,508L464,511L468,511M668,582L666,584L667,591L665,596L668,599L667,605L663,605L647,594L637,589L631,590L616,596L609,596L593,589L570,564L560,561M526,603L531,606L541,608L543,610M440,216L437,216L435,214L433,206L425,199L410,204L398,211L389,213L385,225L376,232L372,232L370,228L363,221L357,220M430,452L425,458M535,647L539,643L539,639L533,635L535,632L538,617L543,610M475,613L476,616L481,618L490,628L511,639L531,647L534,647M334,424L327,425L324,427L324,437L330,442L338,443M220,154L225,153L230,150L230,142L223,135M442,216L445,214L450,219L453,219L467,204L467,195L469,190L479,182L485,175L484,169L485,161M543,610L545,610L549,604L549,593L551,590L551,584L559,562M357,220L355,218L355,212L360,202L366,199L369,193L370,178L365,172L366,169L369,167L369,161L367,159L360,160L356,157L350,161L339,160L336,140L334,137L329,136L326,131L318,136L313,136L310,134L304,133L296,128L286,127M655,742L659,734M538,208L526,220L522,226L524,232L523,257L528,262L528,266L526,269L525,285L530,287L537,293L535,307L537,311L537,316L551,323L554,329L554,332M535,648L555,668L557,673L562,677L573,676L578,679L587,689L594,690L615,703L636,712L640,716L644,724L647,736L654,742M660,734L667,733L677,723L685,723L691,720L704,726L710,726L713,723L712,718L713,712M265,156L278,140L285,134L285,128M302,292L299,290L291,291M450,590L451,583L448,559L450,557L461,558L464,555L464,551L469,545L469,541L472,538L471,532L472,524L470,521L470,515L468,511M450,590L453,597L459,603L461,611L469,610L474,612M630,436L623,425L623,423L613,419L608,414L597,409L592,409L588,411L584,410L583,407L585,404L586,393L589,387L595,383L596,374L591,369L581,369L577,365L576,359L579,356L579,348L576,345L564,344L559,341L554,334M399,536L398,542M395,462L390,463L387,458L379,457L375,454L370,454L365,449L361,448L356,449L351,441L338,443M400,533L396,524L394,510L370,483L365,470L353,462L343,451L339,451L337,449L338,443M476,612L484,608L486,605L492,605L495,603M466,348L470,345L471,337L473,335L477,335L479,337L485,337L490,335L491,338L501,349L503,349L509,346L512,348L517,348L522,340L528,340L533,344L538,344L542,341L546,342L548,334L553,333M313,333L313,331L308,328L308,324L306,322L302,322L299,316L294,316L289,308L284,297L290,292M264,156L260,152L257,143L261,107L262,106L265,107L272,106L275,109L278,120L285,127M272,251L276,252L281,257L279,268L275,275L264,273L263,255M437,515L448,518L448,523L446,527L447,529L446,537L438,537L436,535L437,531L433,526L432,521L433,518M440,545L444,547L444,551L441,554L438,553L438,547M732,555L734,556L738,566L738,573L735,576L730,575L727,571L727,567L730,564L730,557";

    /* georeference: pixel = f(lat,lng), calibrated on the traced map (~117.5 px per degree) */
    const px = (lat, lng) => [256 + (lng - 100.10) * 117.7, 105 + (6.70 - lat) * 117.3];

    const svg = document.getElementById("map-svg");
    const NS = "http://www.w3.org/2000/svg";
    const el = (n, a = {}) => { const e = document.createElementNS(NS, n); for (const k in a) e.setAttribute(k, a[k]); return e; };

    /* fill layer is shifted LEFT, white border layer stays on the right (the displaced look) */
    svg.appendChild(el("path", { class: "land-fill", d: LAND_FILL }));
    svg.appendChild(el("path", { class: "land-line", d: BORDER_LINES }));

    /* pins */
    const PIN = "M0,0 C-7,-9 -10,-13 -10,-18 A10,10 0 1 1 10,-18 C10,-13 7,-9 0,0 Z";
    const pinEls = projects.map((p, i) => {
        const [x, y] = px(...p.coords);
        const g = el("g", { class: "pin", transform: `translate(${x.toFixed(1)} ${y.toFixed(1)})`, tabindex: 0, role: "button", "aria-label": `${p.name}, ${p.location}` });
        g.appendChild(el("circle", { class: "pin-hit", cx: 0, cy: -10, r: 16 }));
        g.appendChild(el("circle", { class: "pin-pulse", cx: 0, cy: 0, r: 4 }));
        const s = el("g", { class: "pin-shape" });
        s.appendChild(el("path", { class: "pin-body", d: PIN, transform: "scale(.8)" }));
        s.appendChild(el("circle", { class: "pin-inner", cx: 0, cy: -14.4, r: 4.6 }));
        s.appendChild(el("circle", { class: "pin-dot", cx: 0, cy: -14.4, r: 2.4 }));
        g.appendChild(s);
        const [lx, ly, la] = p.lbl || [18, -6, "start"];
        const lt = el("text", { class: "pin-label", x: lx, y: ly, "text-anchor": la });
        lt.textContent = p.name; g.appendChild(lt);
        const t = el("title"); t.textContent = `${p.name} – ${p.location}`; g.appendChild(t);
        g.addEventListener("click", () => pick(i));
        g.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(i); } });
        return g;
    });
    [...pinEls].sort((a, b) => parseFloat(a.getAttribute("transform").split(" ")[1]) - parseFloat(b.getAttribute("transform").split(" ")[1]))
        .forEach(g => svg.appendChild(g));

    /* 3. SLIDER — one slide per location (state), many projects per slide */
    const groups = [];
    projects.forEach((p, i) => {
        let g = groups.find(x => x.state === p.state);
        if (!g) { g = { state: p.state, items: [] }; groups.push(g); }
        g.items.push(i); p.g = groups.indexOf(g);
    });

    const $ = id => document.getElementById(id);
    const area = $("map-area"), inner = $("card-inner"), bar = $("progress-bar"), dots = $("dots"), grid = $("project-grid");
    const card = area.querySelector(".project-card");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let gi = 0, fi = 0, timer = null, swapT = null;

    groups.forEach((g, i) => {
        const b = document.createElement("button");
        b.type = "button"; b.setAttribute("aria-label", `Show ${g.state} projects`);
        b.onclick = () => go(i, true); dots.appendChild(b);
    });

    function paint() {
        const grp = groups[gi], ids = grp.items.slice(0, 4), n = ids.length;
        $("project-state").textContent = grp.state + " Projects";
        grid.className = "project-grid n" + n;
        grid.innerHTML = "";
        ids.forEach(i => {
            const p = projects[i];
            const it = document.createElement("div");
            it.className = "p-item" + (i === fi ? " focus" : "");
            if (n > 1) {
                it.tabIndex = 0; it.setAttribute("role", "button"); it.onclick = () => pick(i);
                it.onkeydown = e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(i); } };
            }
            const img = document.createElement("div");
            img.className = "p-img";
            if (p.image) img.style.backgroundImage = `url("${p.image}")`; else img.textContent = "Project photo coming soon";
            it.appendChild(img);
            const foot = document.createElement("div");
            foot.className = "p-foot";
            foot.innerHTML = `<div><strong></strong><p></p></div><a href="projects.html" class="read-more" aria-label="Read more about ${p.name}">Read More <span class="rm-ico">›</span></a>`;
            foot.querySelector("strong").textContent = p.name;
            foot.querySelector("p").textContent = n > 1 ? p.location : `${p.location}, ${p.state}`;
            it.appendChild(foot);
            grid.appendChild(it);
        });
        $("count").textContent = `${gi + 1} / ${groups.length}`;
        [...dots.children].forEach((d, i) => d.classList.toggle("on", i === gi));
        pinEls.forEach((g, i) => {
            g.classList.toggle("grouped", projects[i].g === gi);
            g.classList.toggle("active", i === fi);
            if (i === fi) svg.appendChild(g);
        });
        inner.classList.remove("swap");
    }

    function go(g, user, focus) {
        g = (g + groups.length) % groups.length;
        const same = g === gi;
        gi = g; fi = focus !== undefined ? focus : groups[gi].items[0];
        clearTimeout(swapT);
        if (reduce || same) { paint(); }
        else { inner.classList.add("swap"); swapT = setTimeout(paint, 180); }
        if (user) restart(); else runBar();
    }
    const pick = i => go(projects[i].g, true, i);

    function runBar() { bar.classList.remove("run"); void bar.offsetWidth; if (!reduce) bar.classList.add("run"); }
    function restart() { stop(); start(); }
    function start() {
        if (reduce) return;
        if (card.classList.contains("paused")) { bar.classList.remove("run"); return; }
        runBar();
        timer = setInterval(() => go(gi + 1, false), DELAY);
    }
    function stop() { clearInterval(timer); timer = null; }

    $("prev").onclick = () => go(gi - 1, true);
    $("next").onclick = () => go(gi + 1, true);
    card.style.setProperty("--dur", DELAY + "ms");

    /* pause on hover / keyboard focus / hidden tab */
    const pause = () => { stop(); card.classList.add("paused"); };
    const resume = () => { card.classList.remove("paused"); restart(); };
    area.addEventListener("mouseenter", pause);
    area.addEventListener("mouseleave", resume);
    area.addEventListener("focusin", pause);
    area.addEventListener("focusout", resume);
    document.addEventListener("visibilitychange", () => document.hidden ? stop() : restart());

    paint(); start();



    /* =====================================
       7. SCROLL ANIMATIONS
    ===================================== */

    const animatedElements = document.querySelectorAll("[data-animate]");

    if ("IntersectionObserver" in window && animatedElements.length) {

        document.documentElement.classList.add("js-motion");

        const animationObserver = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");
                animationObserver.unobserve(entry.target);

            });

        }, {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        });

        animatedElements.forEach(element => {
            animationObserver.observe(element);
        });

    } else {

        animatedElements.forEach(element => {
            element.classList.add("is-visible");
        });

    }


    /* =====================================
       8. IMAGE ERROR HANDLING
    ===================================== */

    document.querySelectorAll("img").forEach(img => {

        img.addEventListener("error", function () {

            this.classList.add("image-error");

        });

    });


    /* =====================================
       9. FOOTER CURRENT YEAR
    ===================================== */

    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

});


/* =========================================
   10. WEBSITE LOADER
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const loader = document.querySelector(".ktn-loader");
    const percentage = document.getElementById("loading-percent");
    const progressFill = document.getElementById("ktn-progress-fill");

    if (!loader || !percentage || !progressFill) return;

    let progress = 0;
    let pageLoaded = document.readyState === "complete";
    let loaderFinished = false;

    window.addEventListener("load", function () {
        pageLoaded = true;
    });

    const loadingInterval = setInterval(function () {

        if (pageLoaded) {
            progress += 2;
        } else if (progress < 90) {
            progress += 1;
        }

        progress = Math.min(progress, 100);

        percentage.textContent = progress + "%";

        loader.style.setProperty("--progress", progress + "%");
        progressFill.style.width = progress + "%";

        if (progress >= 100 && !loaderFinished) {

            loaderFinished = true;
            clearInterval(loadingInterval);

            setTimeout(function () {

                loader.classList.add("hide-loader");

                setTimeout(function () {
                    loader.remove();
                }, 900);

            }, 800);

        }

    }, 40);

    // Fallback if page load event is delayed
    setTimeout(function () {
        pageLoaded = true;
    }, 12000);

});



/* =========================================================
   TEAM SCROLL ANIMATIONS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const animatedItems = document.querySelectorAll(
        ".director, .team-shot"
    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.15
    });

    animatedItems.forEach(item => {
        observer.observe(item);
    });

});


/* =========================================
   ABOUT + TEAM SCROLL ANIMATIONS
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const animatedItems = document.querySelectorAll(`
        .breadcrumb-inner,
        .about-heading,
        .about-image,
        .about-text,
        .value-card,
        .director,
        .team-shot
    `);

    if (!("IntersectionObserver" in window)) {
        animatedItems.forEach(item => item.classList.add("show"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    });

    animatedItems.forEach(item => {
        observer.observe(item);
    });

});




/* =========================================
   ORGANISATION CHART ANIMATIONS
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const elements = document.querySelectorAll(".org-reveal");

    if (!("IntersectionObserver" in window)) {
        elements.forEach(element => {
            element.classList.add("is-visible");
        });
        return;
    }

    const orgObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("is-visible");

                orgObserver.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
    });

    elements.forEach(element => {
        orgObserver.observe(element);
    });

});



/* =========================================
   JASAPADU MILESTONE ANIMATIONS
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const milestoneItems = document.querySelectorAll(
        "[data-milestone-reveal]"
    );

    // Fallback for browsers without IntersectionObserver
    if (!("IntersectionObserver" in window)) {
        milestoneItems.forEach(item => {
            item.classList.add("is-visible");
        });
        return;
    }

    const milestoneObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    milestoneItems.forEach(item => {
        milestoneObserver.observe(item);
    });

});



/* =========================================
   JASAPADU SERVICES PAGE
   Scroll Reveal Animation
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const revealElements = document.querySelectorAll("[data-reveal]");

    // Show everything if IntersectionObserver is unsupported
    if (!("IntersectionObserver" in window)) {
        revealElements.forEach(function (element) {
            element.classList.add("is-visible");
        });

        return;
    }

    const observer = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -30px 0px"
        }
    );

    revealElements.forEach(function (element) {
        observer.observe(element);
    });

});


/* =========================================
   CLIENTS SCROLL REVEAL
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const revealElements = document.querySelectorAll(
        ".clients-section [data-animate]"
    );

    if (!("IntersectionObserver" in window)) {
        revealElements.forEach(element => {
            element.classList.add("is-visible");
        });
        return;
    }

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

});




/* =========================================
   JASAPADU IMAGE GALLERY LIGHTBOX
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const gallery = document.querySelectorAll("[data-gallery]");
    const lightbox = document.getElementById("galleryLightbox");

    if (!gallery.length || !lightbox) return;

    const image = document.getElementById("lightboxImage");
    const closeBtn = lightbox.querySelector(".gallery-lightbox-close");
    const prevBtn = lightbox.querySelector(".gallery-lightbox-prev");
    const nextBtn = lightbox.querySelector(".gallery-lightbox-next");
    const counter = lightbox.querySelector(".gallery-lightbox-count");

    const images = Array.from(gallery);
    let currentIndex = 0;

    function showImage(index) {

        currentIndex = (index + images.length) % images.length;

        image.src = images[currentIndex].href;

        image.alt =
            images[currentIndex].querySelector("img")?.alt || "Gallery image";

        counter.textContent =
            `${String(currentIndex + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`;
    }

    function openLightbox(index) {

        showImage(index);

        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";

        closeBtn.focus();
    }

    function closeLightbox() {

        lightbox.classList.remove("active");
        document.body.style.overflow = "";

        image.src = "";
    }

    images.forEach((item, index) => {

        item.addEventListener("click", function (event) {

            event.preventDefault();

            openLightbox(index);

        });

    });

    closeBtn.addEventListener("click", closeLightbox);

    prevBtn.addEventListener("click", function () {
        showImage(currentIndex - 1);
    });

    nextBtn.addEventListener("click", function () {
        showImage(currentIndex + 1);
    });

    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });

    document.addEventListener("keydown", function (event) {

        if (!lightbox.classList.contains("active")) return;

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowLeft") {
            showImage(currentIndex - 1);
        }

        if (event.key === "ArrowRight") {
            showImage(currentIndex + 1);
        }

    });

});



/* =====================================
   BACK TO TOP - ALL PAGES
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const backTop = document.querySelector(".back-top");

    if (!backTop) return;

    function updateBackTop() {

        if (window.scrollY > 350) {
            backTop.classList.add("visible");
        } else {
            backTop.classList.remove("visible");
        }

    }

    window.addEventListener("scroll", updateBackTop, {
        passive: true
    });

    updateBackTop();

    backTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});

/* =========================================================
   JASAPADU CONSTRUCTION DEVELOPMENT
   CONTACT PAGE - MAP WITH LOGO PIN
========================================================= */

(function () {

    const mapEl = document.getElementById("jcd-map");

    if (!mapEl) return;

    /* ---- Office details ---------------------------------
       Coordinates are approximate for DPulze, Cyberjaya.
       For the exact spot: open Google Maps, right-click your
       office, click the numbers shown at the top of the menu
       and paste them here (latitude, longitude).
    ------------------------------------------------------- */
    const OFFICE = {
        name: "Jasapadu Construction Development Sdn. Bhd.",
        address: "Level 15 Dpluze Lingkaran Cyber Point Timur<br>Cyber 12, 63000 Cyberjaya, Selangor",
        lat: 2.9213,
        lng: 101.6559,
        zoom: 17,
        logo: "/asset/Jasapadu logo.png"
    };

    const LEAFLET_CSS = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
    const LEAFLET_JS = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";

    function loadCss(href) {
        return new Promise(function (resolve, reject) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = href;
            link.onload = resolve;
            link.onerror = reject;
            document.head.appendChild(link);
        });
    }

    function loadScript(src) {
        return new Promise(function (resolve, reject) {
            const script = document.createElement("script");
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    /* Fallback if the map library cannot load */
    function showFallback() {
        mapEl.innerHTML =
            '<iframe title="Office location" loading="lazy" ' +
            'style="position:absolute;inset:0;width:100%;height:100%;border:0" ' +
            'src="https://www.google.com/maps?q=' +
            encodeURIComponent(OFFICE.name + " Cyberjaya") + '&output=embed"></iframe>';
    }

    function initMap() {

        const map = L.map(mapEl, {
            center: [OFFICE.lat, OFFICE.lng],
            zoom: OFFICE.zoom,
            scrollWheelZoom: false
        });

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
        }).addTo(map);

        /* Blue pin with the Jasapadu logo inside */
        const pinHTML =
            '<div class="jcd-pin">' +
                '<svg viewBox="0 0 56 72" aria-hidden="true">' +
                    '<path d="M28 0C12.5 0 0 12.3 0 27.5 0 47 28 72 28 72s28-25 28-44.5C56 12.3 43.5 0 28 0z" fill="#1c4cba"/>' +
                    '<circle cx="28" cy="27" r="20" fill="#fff"/>' +
                '</svg>' +
                '<img src="' + OFFICE.logo + '" alt="">' +
            '</div>';

        const icon = L.divIcon({
            className: "jcd-pin-icon",
            html: pinHTML,
            iconSize: [56, 72],
            iconAnchor: [28, 72],
            popupAnchor: [0, -66]
        });

        const directions =
            "https://www.google.com/maps/dir/?api=1&destination=" +
            encodeURIComponent("Level 15 Dpluze Lingkaran Cyber Point Timur Cyber 12 63000 Cyberjaya Selangor");

        L.marker([OFFICE.lat, OFFICE.lng], { icon: icon, title: OFFICE.name })
            .addTo(map)
            .bindPopup(
                '<div class="jcd-popup">' +
                    "<strong>" + OFFICE.name + "</strong>" +
                    "<p>" + OFFICE.address + "</p>" +
                    '<a href="' + directions + '" target="_blank" rel="noopener">Get directions</a>' +
                "</div>"
            );

        /* Scroll-zoom only after the visitor clicks the map */
        map.on("click", function () { map.scrollWheelZoom.enable(); });
        map.on("mouseout", function () { map.scrollWheelZoom.disable(); });

        /* Re-measure after the slide-in animation and on resize */
        const refresh = function () { map.invalidateSize(); };
        setTimeout(refresh, 900);
        window.addEventListener("resize", refresh);

        const animated = mapEl.closest("[data-animate]");
        if (animated) animated.addEventListener("transitionend", refresh);
    }

    document.addEventListener("DOMContentLoaded", function () {

        loadCss(LEAFLET_CSS)
            .then(function () { return loadScript(LEAFLET_JS); })
            .then(initMap)
            .catch(showFallback);

    });

})();


/* =========================================================
   JASAPADU CONSTRUCTION DEVELOPMENT
   CONTACT PAGE - ENQUIRY FORM
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("enquiry-form");
    const statusBox = document.getElementById("form-status");

    if (!form) return;

    /* Where enquiries are sent */
    const RECIPIENT = "jasapadufw@gmail.com";


    /* -----------------------------------------------------
       1. VALIDATION RULES
    ----------------------------------------------------- */

    const rules = {
        name: {
            required: "Please enter your name."
        },
        contact: {
            required: "Please enter your contact number.",
            pattern: /^[0-9+()\-\s]{7,20}$/,
            invalid: "Please enter a valid contact number."
        },
        email: {
            required: "Please enter your email address.",
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
            invalid: "Please enter a valid email address."
        },
        subject: {
            required: "Please enter a subject."
        },
        message: {
            required: "Please enter your message."
        }
    };


    function getError(name) {
        const rule = rules[name];
        const field = form.elements[name];

        if (!rule || !field) return "";

        const value = field.value.trim();

        if (!value) return rule.required;

        if (rule.pattern && !rule.pattern.test(value)) return rule.invalid;

        return "";
    }


    function showError(name, message) {
        const field = form.elements[name];
        const wrapper = field.closest(".jcd-field");
        const errorBox = wrapper.querySelector(".jcd-error");

        wrapper.classList.toggle("has-error", Boolean(message));
        field.setAttribute("aria-invalid", message ? "true" : "false");

        if (errorBox) errorBox.textContent = message;
    }


    /* -----------------------------------------------------
       2. LIVE VALIDATION (after the field has been touched)
    ----------------------------------------------------- */

    Object.keys(rules).forEach(function (name) {

        const field = form.elements[name];

        if (!field) return;

        field.addEventListener("blur", function () {
            showError(name, getError(name));
        });

        field.addEventListener("input", function () {
            if (field.closest(".jcd-field").classList.contains("has-error")) {
                showError(name, getError(name));
            }
        });

    });


    /* -----------------------------------------------------
       3. SUBMIT
    ----------------------------------------------------- */

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        statusBox.className = "jcd-form-status";
        statusBox.textContent = "";

        let firstInvalid = null;

        Object.keys(rules).forEach(function (name) {

            const message = getError(name);

            showError(name, message);

            if (message && !firstInvalid) firstInvalid = form.elements[name];

        });

        /* reCAPTCHA check (only runs when the widget has loaded with a valid site key) */
        const captchaError = document.getElementById("captcha-error");
        let captchaOk = true;

        if (captchaError) captchaError.textContent = "";

        if (document.querySelector(".g-recaptcha") &&
            typeof grecaptcha !== "undefined" &&
            grecaptcha.getResponse() === "") {

            captchaOk = false;

            if (captchaError) captchaError.textContent = "Please confirm you are not a robot.";
        }

        if (firstInvalid || !captchaOk) {
            if (firstInvalid) firstInvalid.focus();

            statusBox.className = "jcd-form-status is-error";
            statusBox.textContent = "Please fix the highlighted fields and send again.";

            return;
        }

        const data = {
            salutation: form.elements.salutation.value,
            name: form.elements.name.value.trim(),
            company: form.elements.company.value.trim(),
            contact: form.elements.contact.value.trim(),
            email: form.elements.email.value.trim(),
            subject: form.elements.subject.value.trim(),
            message: form.elements.message.value.trim()
        };

        const body =
            "Name: " + (data.salutation ? data.salutation + " " : "") + data.name + "\n" +
            "Company: " + (data.company || "-") + "\n" +
            "Contact No: " + data.contact + "\n" +
            "Email: " + data.email + "\n\n" +
            data.message;

        const mailto =
            "mailto:" + RECIPIENT +
            "?subject=" + encodeURIComponent("Website Enquiry - " + data.subject) +
            "&body=" + encodeURIComponent(body);

        /* Opens the visitor's email app with the enquiry filled in.
           To send from the server instead, replace this line with a fetch()
           call to your form handler (PHP, Formspree, EmailJS, etc.). */
        window.location.href = mailto;

        statusBox.className = "jcd-form-status is-success";
        statusBox.textContent =
            "Your email app should open with your enquiry ready to send. " +
            "If it does not, please email us directly at " + RECIPIENT + ".";

        form.reset();

        if (typeof grecaptcha !== "undefined" && document.querySelector(".g-recaptcha")) {
            grecaptcha.reset();
        }

    });

});


/* =========================================
   JCD SCROLL REVEAL ANIMATION
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const animatedElements = document.querySelectorAll("[data-animate]");

    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const element = entry.target;
                const delay = element.dataset.delay || 0;

                setTimeout(() => {
                    element.classList.add("is-visible");
                }, Number(delay));

                observer.unobserve(element);
            }

        });

    }, {
        threshold: 0.15
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

});
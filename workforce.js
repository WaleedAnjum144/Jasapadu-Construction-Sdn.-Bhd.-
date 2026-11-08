/* =========================================
   JASAPADU - WORKFORCE PAGE JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const workforcePage = document.querySelector(".jcd-workforce-page");

    if (!workforcePage) return;


    /* 01. WORKFORCE MEMBERS: SEARCH + LOAD MORE (AUTO ON SCROLL) */

    const memberGrid = workforcePage.querySelector(".jcd-member-grid");

    if (memberGrid) {

        const memberCards = Array.from(memberGrid.querySelectorAll(".jcd-member-card"));
        const searchInput = document.getElementById("jcdMemberSearch");
        const countLabel = document.getElementById("jcdMemberCount");
        const emptyMessage = document.getElementById("jcdMemberEmpty");
        const loadMoreButton = document.getElementById("jcdLoadMore");

        const initialCount = 6;
        const batchSize = 3;

        let limit = initialCount;
        let matches = memberCards.slice();
        let loadObserver = null;

        function renderMembers() {

            memberCards.forEach(function (card) {

                const index = matches.indexOf(card);
                const show = index !== -1 && index < limit;

                if (show) {
                    if (card.style.display === "none") {
                        card.style.display = "";
                        card.classList.remove("is-newly-loaded");
                        void card.offsetWidth;
                        card.classList.add("is-visible", "is-newly-loaded");
                    }
                } else {
                    card.style.display = "none";
                }

            });

            const shown = Math.min(limit, matches.length);

            if (countLabel) {
                countLabel.textContent = "Showing " + shown + " of " + matches.length + " members";
            }

            if (emptyMessage) emptyMessage.hidden = matches.length !== 0;
            if (loadMoreButton) loadMoreButton.hidden = shown >= matches.length;

        }

        function loadMore() {

            if (limit >= matches.length) return;

            limit += batchSize;
            renderMembers();

            // Re-check: if the button is still on screen, load the next batch too
            if (loadObserver && loadMoreButton && !loadMoreButton.hidden) {
                loadObserver.unobserve(loadMoreButton);
                loadObserver.observe(loadMoreButton);
            }

        }

        // Search by name or country
        if (searchInput) {

            let searchTimer = null;

            searchInput.addEventListener("input", function () {

                clearTimeout(searchTimer);

                searchTimer = setTimeout(function () {

                    const query = searchInput.value.trim().toLowerCase();

                    matches = memberCards.filter(function (card) {
                        const name = card.querySelector("h3");
                        const country = card.querySelector(".jcd-member-info p");
                        const text = (name ? name.textContent : "") + " " + (country ? country.textContent : "");
                        return text.toLowerCase().indexOf(query) !== -1;
                    });

                    limit = initialCount;
                    renderMembers();

                }, 200);

            });

        }

        if (loadMoreButton) {

            loadMoreButton.addEventListener("click", loadMore);

            // Auto load when the button scrolls into view
            if ("IntersectionObserver" in window) {

                loadObserver = new IntersectionObserver(
                    function (entries) {
                        entries.forEach(function (entry) {
                            if (entry.isIntersecting && !loadMoreButton.hidden) loadMore();
                        });
                    },
                    { root: null, rootMargin: "0px 0px 150px 0px", threshold: 0 }
                );

                loadObserver.observe(loadMoreButton);

            }

        }

        renderMembers();

    }


    /* 02. FADE UP ON SCROLL (RUNS ONCE) */

    const revealElements = workforcePage.querySelectorAll("[data-reveal]:not(.jcd-member-card)");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
        );

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add("is-visible");
        });

    }


    /* 03. WORKFORCE COUNTER */

    const counters = workforcePage.querySelectorAll(".jcd-counter");

    if ("IntersectionObserver" in window) {

        const counterObserver = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) return;

                    const counter = entry.target;
                    const target = parseInt(counter.dataset.count, 10) || 0;
                    const duration = 1800;
                    const startTime = performance.now();

                    function updateCounter(currentTime) {

                        const progress = Math.min((currentTime - startTime) / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 4);

                        counter.textContent = Math.floor(target * eased).toLocaleString();

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target.toLocaleString();
                        }

                    }

                    requestAnimationFrame(updateCounter);

                    observer.unobserve(counter);

                });
            },
            { threshold: 0.5 }
        );

        counters.forEach(function (counter) {
            counterObserver.observe(counter);
        });

    } else {

        counters.forEach(function (counter) {
            counter.textContent = counter.dataset.count || "300";
        });

    }


    /* POPUP ELEMENT REFERENCES (declared ONCE) */

    const certificateModal = document.getElementById("jcdCertificateModal");
    const certificateModalImage = document.getElementById("jcdCertificateModalImage");
    const certificateClose = document.getElementById("jcdCertificateImageClose");
    const certificateButton = document.getElementById("jcdCertificateImageBtn");

    const pdfModal = document.getElementById("jcdPdfModal");
    const pdfFrame = document.getElementById("jcdPdfFrame");
    const pdfTitle = document.getElementById("jcdPdfTitle");
    const pdfDownload = document.getElementById("jcdPdfDownload");
    const pdfClose = document.getElementById("jcdPdfClose");


    /* 04. CARD IMAGE LIGHTBOX (NTSP / CIDB / MASTER / COMPANY CARDS) */

    const docLightbox = document.getElementById("jcdDocLightbox");
    const docLightboxImg = document.getElementById("jcdDocLightboxImg");
    const docLightboxClose = document.getElementById("jcdDocLightboxClose");

    if (docLightbox && docLightboxImg && docLightboxClose) {

        function openDocLightbox(img) {
            docLightboxImg.src = img.currentSrc || img.src;
            docLightboxImg.alt = img.alt || "";
            docLightbox.classList.add("active");
            docLightbox.setAttribute("aria-hidden", "false");
            document.body.classList.add("jcd-lightbox-open");
        }

        function closeDocLightbox() {
            docLightbox.classList.remove("active");
            docLightbox.setAttribute("aria-hidden", "true");
            document.body.classList.remove("jcd-lightbox-open");
        }

        // One listener on the grid, so it also works for cards revealed by "Load more"
        workforcePage.addEventListener("click", function (event) {
            const img = event.target.closest(".jcd-doc img");
            if (img) openDocLightbox(img);
        });

        docLightboxClose.addEventListener("click", closeDocLightbox);

        docLightbox.addEventListener("click", function (event) {
            if (event.target === docLightbox) closeDocLightbox();
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && docLightbox.classList.contains("active")) {
                closeDocLightbox();
            }
        });

    }


    /* 05. PDF POPUP (works for any button with class jcd-open-pdf) */

    if (pdfModal && pdfFrame && pdfTitle && pdfDownload && pdfClose) {

        workforcePage.querySelectorAll(".jcd-open-pdf").forEach(function (button) {

            button.addEventListener("click", function (event) {

                event.preventDefault();

                const rawUrl = this.dataset.pdf;
                const title = this.dataset.title || "Document Preview";

                if (!rawUrl) {
                    console.error("PDF URL is missing from data-pdf.");
                    return;
                }

                const pdfUrl = encodeURI(rawUrl);

                if (certificateModal) certificateModal.classList.remove("active");
                document.body.classList.remove("jcd-certificate-open");

                pdfFrame.src = pdfUrl + "#toolbar=1&navpanes=0";
                pdfTitle.textContent = title;
                pdfDownload.href = pdfUrl;
                pdfDownload.setAttribute("download", title + ".pdf");

                pdfModal.classList.add("active");
                document.body.classList.add("jcd-pdf-open");

            });

        });

        function closePdfModal() {
            pdfModal.classList.remove("active");
            document.body.classList.remove("jcd-pdf-open");
            pdfFrame.src = "about:blank";
        }

        pdfClose.addEventListener("click", closePdfModal);

        pdfModal.addEventListener("click", function (event) {
            if (event.target === pdfModal) closePdfModal();
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && pdfModal.classList.contains("active")) {
                closePdfModal();
            }
        });

    }


    /* 06. CERTIFICATE SLIDER + POPUP (AUTO SCROLL, COUNTER, NEXT / PREV) */

    const certSlides = Array.from(workforcePage.querySelectorAll(".jcd-cert-slide"));
    const certCounter = document.getElementById("jcdCertCounter");
    const certModalCounter = document.getElementById("jcdCertModalCounter");
    const certPrev = document.getElementById("jcdCertPrev");
    const certNext = document.getElementById("jcdCertNext");

    if (
        certificateModal &&
        certificateModalImage &&
        certificateClose &&
        certificateButton &&
        certSlides.length
    ) {

        const autoDelay = 4000;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        let current = 0;
        let timer = null;
        let sliderVisible = false;

        function renderCertificate() {

            certSlides.forEach(function (slide, index) {
                slide.classList.toggle("active", index === current);
            });

            const label = (current + 1) + " / " + certSlides.length;

            if (certCounter) certCounter.textContent = label;
            if (certModalCounter) certModalCounter.textContent = label;

            if (certificateModal.classList.contains("active")) {
                const img = certSlides[current];
                certificateModalImage.src = img.currentSrc || img.src;
                certificateModalImage.alt = img.alt || "SCORE Certificate";
            }

        }

        function goToCertificate(index) {
            current = (index + certSlides.length) % certSlides.length;
            renderCertificate();
        }

        function stopAuto() {
            clearInterval(timer);
            timer = null;
        }

        function startAuto() {
            stopAuto();
            if (certSlides.length < 2 || reduceMotion) return;

            const popupOpen = certificateModal.classList.contains("active");
            if (!sliderVisible && !popupOpen) return;

            timer = setInterval(function () {
                goToCertificate(current + 1);
            }, autoDelay);
        }

        function nextCertificate() {
            goToCertificate(current + 1);
            startAuto();
        }

        function prevCertificate() {
            goToCertificate(current - 1);
            startAuto();
        }

        function openCertificateModal() {

            if (pdfModal) pdfModal.classList.remove("active");
            if (pdfFrame) pdfFrame.src = "about:blank";
            document.body.classList.remove("jcd-pdf-open");

            certificateModal.classList.add("active");
            document.body.classList.add("jcd-certificate-open");

            renderCertificate();
            startAuto();

        }

        function closeCertificateModal() {
            certificateModal.classList.remove("active");
            document.body.classList.remove("jcd-certificate-open");
            certificateModalImage.removeAttribute("src");
            if (sliderVisible) startAuto(); else stopAuto();
        }

        certificateButton.addEventListener("click", function (event) {
            event.preventDefault();
            openCertificateModal();
        });

        certificateButton.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openCertificateModal();
            }
        });

        workforcePage.querySelectorAll("[data-open-cert]").forEach(function (btn) {
            btn.addEventListener("click", function (event) {
                event.preventDefault();
                openCertificateModal();
            });
        });

        if (certNext) certNext.addEventListener("click", nextCertificate);
        if (certPrev) certPrev.addEventListener("click", prevCertificate);

        certificateClose.addEventListener("click", closeCertificateModal);

        certificateModal.addEventListener("click", function (event) {
            if (event.target === certificateModal) closeCertificateModal();
        });

        document.addEventListener("keydown", function (event) {

            if (!certificateModal.classList.contains("active")) return;

            if (event.key === "Escape") closeCertificateModal();
            if (event.key === "ArrowRight") nextCertificate();
            if (event.key === "ArrowLeft") prevCertificate();

        });

        let touchStartX = 0;

        certificateModal.addEventListener("touchstart", function (event) {
            touchStartX = event.changedTouches[0].clientX;
        }, { passive: true });

        certificateModal.addEventListener("touchend", function (event) {

            const diff = event.changedTouches[0].clientX - touchStartX;

            if (Math.abs(diff) < 50) return;

            if (diff < 0) nextCertificate();
            else prevCertificate();

        }, { passive: true });

        certificateButton.addEventListener("mouseenter", stopAuto);
        certificateButton.addEventListener("mouseleave", startAuto);

        const modalContent = certificateModal.querySelector(".jcd-certificate-modal-content");

        if (modalContent) {
            modalContent.addEventListener("mouseenter", stopAuto);
            modalContent.addEventListener("mouseleave", startAuto);
        }

        renderCertificate();

        // Start auto slide only when the user reaches this section
        if ("IntersectionObserver" in window) {

            const sliderObserver = new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        sliderVisible = entry.isIntersecting;

                        if (sliderVisible) {
                            current = 0;
                            renderCertificate();
                            startAuto();
                        } else if (!certificateModal.classList.contains("active")) {
                            stopAuto();
                        }

                    });

                },
                { threshold: 0.4 }
            );

            sliderObserver.observe(certificateButton);

        } else {

            sliderVisible = true;
            startAuto();

        }

    } else {

        console.error("Certificate popup HTML elements are missing.");

    }

});
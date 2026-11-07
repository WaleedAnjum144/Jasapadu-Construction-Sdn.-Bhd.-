
/* =========================================
   JASAPADU - WORKFORCE PAGE JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const workforcePage = document.querySelector(".jcd-workforce-page");

    if (!workforcePage) return;


    /* =====================================
       01. WORKFORCE AUTO LOAD
       FIRST 6, THEN 3 ON SCROLL
    ===================================== */

    const memberGrid = workforcePage.querySelector(".jcd-member-grid");

    if (memberGrid) {

        const memberCards = Array.from(
            memberGrid.querySelectorAll(".jcd-member-card")
        );

        const initialCount = 6;
        const batchSize = 3;

        let visibleCount = Math.min(initialCount, memberCards.length);
        let loading = false;

        // Initial visibility
        memberCards.forEach(function (card, index) {

            if (index < visibleCount) {

                card.style.display = "";
                card.classList.add("is-visible");

            } else {

                card.style.display = "none";
                card.classList.remove("is-visible");

            }

        });


        function revealNextMembers() {

            if (loading || visibleCount >= memberCards.length) return;

            loading = true;

            const nextCount = Math.min(
                visibleCount + batchSize,
                memberCards.length
            );

            for (let i = visibleCount; i < nextCount; i++) {

                const card = memberCards[i];

                card.style.display = "";

                card.classList.remove("is-visible");

                void card.offsetWidth;

                card.classList.add("is-visible");

            }

            visibleCount = nextCount;

            loading = false;

            console.log("Workforce members loaded:", visibleCount);
        }


        // Watch the last visible member
        if ("IntersectionObserver" in window && visibleCount < memberCards.length) {

            const loadObserver = new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (!entry.isIntersecting) return;

                        loadObserver.unobserve(entry.target);

                        revealNextMembers();

                        // Watch the new last visible member
                        if (visibleCount < memberCards.length) {

                            loadObserver.observe(
                                memberCards[visibleCount - 1]
                            );

                        } else {

                            loadObserver.disconnect();

                        }

                    });

                },
                {
                    root: null,
                    rootMargin: "0px 0px 200px 0px",
                    threshold: 0
                }
            );

            loadObserver.observe(memberCards[visibleCount - 1]);

        }

    }


    /* =====================================
       02. FADE UP ON SCROLL - OTHER ELEMENTS
    ===================================== */

    const revealElements = workforcePage.querySelectorAll(
        "[data-reveal]:not(.jcd-member-card)"
    );

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
            {
                threshold: 0.15,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add("is-visible");
        });

    }


    /* =====================================
       03. WORKFORCE COUNTER
    ===================================== */

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

                        const elapsed = currentTime - startTime;

                        const progress = Math.min(elapsed / duration, 1);

                        const easedProgress = 1 - Math.pow(1 - progress, 4);

                        counter.textContent = Math.floor(
                            target * easedProgress
                        ).toLocaleString();

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
            {
                threshold: 0.5
            }
        );

        counters.forEach(function (counter) {
            counterObserver.observe(counter);
        });

    } else {

        counters.forEach(function (counter) {
            counter.textContent = counter.dataset.count || "300";
        });

    }


    /* =====================================
       04. PDF POPUP FUNCTIONALITY
    ===================================== */

    const pdfModal = document.getElementById("jcdPdfModal");
    const pdfFrame = document.getElementById("jcdPdfFrame");
    const pdfTitle = document.getElementById("jcdPdfTitle");
    const pdfDownload = document.getElementById("jcdPdfDownload");
    const pdfClose = document.getElementById("jcdPdfClose");

    if (pdfModal && pdfFrame && pdfTitle && pdfDownload && pdfClose) {

        workforcePage.querySelectorAll(".jcd-open-pdf").forEach(function (button) {

            button.addEventListener("click", function () {

                const pdfUrl = this.dataset.pdf;
                const title = this.dataset.title || "Document Preview";

                if (!pdfUrl) return;

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

            pdfFrame.src = "";

        }

        pdfClose.addEventListener("click", closePdfModal);

        pdfModal.addEventListener("click", function (event) {

            if (event.target === pdfModal) {
                closePdfModal();
            }

        });

        document.addEventListener("keydown", function (event) {

            if (
                event.key === "Escape" &&
                pdfModal.classList.contains("active")
            ) {
                closePdfModal();
            }

        });

    }

});

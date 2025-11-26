// Hiệu ứng scroll mượt, reveal section và nút back-to-top

document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll cho các link nội bộ (#hero, #about, #gallery, #story)
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();
      const headerOffset = 72;
      const elementPosition = targetEl.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    });
  });

  // Reveal on scroll với IntersectionObserver
  const revealEls = document.querySelectorAll(".reveal, .gallery-item, .timeline-item");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealEls.forEach((el) => observer.observe(el));

  // Nút back-to-top
  const backToTopBtn = document.getElementById("backToTop");
  const toggleBackToTop = () => {
    if (!backToTopBtn) return;
    if (window.scrollY > 400) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  };

  window.addEventListener("scroll", toggleBackToTop);

  // Scroll GIF overlay (hiện khi đang cuộn)
  const scrollGifOverlay = document.getElementById("scrollGifOverlay");
  let scrollGifTimeout;

  if (scrollGifOverlay) {
    window.addEventListener(
      "scroll",
      () => {
        scrollGifOverlay.classList.add("visible");

        clearTimeout(scrollGifTimeout);
        scrollGifTimeout = setTimeout(() => {
          scrollGifOverlay.classList.remove("visible");
        }, 400);
      },
      { passive: true }
    );
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Log nhỏ để kiểm tra
  console.log("Friends landing page ready!");

  // ===== Play birthday music on first user interaction =====
  const bgMusic = document.getElementById("bgMusic");
  if (bgMusic) {
    const startMusicOnFirstTouch = () => {
      bgMusic
        .play()
        .catch((err) => {
          console.warn("Không phát được nhạc tự động:", err);
        });

      // Gỡ listener sau lần đầu để không gọi lại nhiều lần
      document.removeEventListener("click", startMusicOnFirstTouch);
      document.removeEventListener("touchstart", startMusicOnFirstTouch);
    };

    document.addEventListener("click", startMusicOnFirstTouch, { once: false });
    document.addEventListener("touchstart", startMusicOnFirstTouch, { once: false });
  }

  // ===== Swap specific images on click (toggle qua lại) =====
  const swappableImages = document.querySelectorAll("img[data-swap-src]");
  swappableImages.forEach((img) => {
    // Lưu src gốc và src swap
    const originalSrc = img.getAttribute("src");
    const swapSrc = img.getAttribute("data-swap-src");
    if (!swapSrc) return;

    img.addEventListener("click", (e) => {
      const currentSrc = img.getAttribute("src");
      // Nếu đang là ảnh gốc thì đổi sang swap, nếu đang là swap thì đổi về gốc
      if (currentSrc === originalSrc) {
        img.setAttribute("src", swapSrc);
      } else {
        img.setAttribute("src", originalSrc);
      }
      e.stopPropagation();
      e.preventDefault?.();
    });
  });
});


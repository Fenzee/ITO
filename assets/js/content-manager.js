/**
 * Content Manager
 * Handles PowerPoint-style slide transitions for different sections
 */

class ContentManager {
  constructor() {
    this.currentSection = "home";
    this.sections = this.initializeSections();

    this.init();
  }

  init() {
    this.createSlideContainer();
    this.attachEventListeners();
  }

  initializeSections() {
    return {
      home: {
        type: "slide",
        element: ".s-hero-simple",
      },
      about: {
        type: "slide",
        title: "Tentang ITO",
        subtitle: "Information Technology Olympiads",
        content: this.getAboutContent(),
      },
      schedule: {
        type: "slide",
        title: "Timeline",
        subtitle: "Check Our Timeline!",
        content: this.getTimelineContent(),
      },
      sponsor: {
        type: "slide",
        title: "Sponsor",
        subtitle: "Our Amazing Sponsors",
        content: this.getSponsorContent(),
      },
      galeri: {
        type: "slide",
        title: "Galeri",
        subtitle: "Gallery of Moments",
        content: this.getGalleryContent(),
      },
      registration: {
        type: "slide",
        title: "Pilih Cabang Lomba",
        subtitle: "Daftarkan dirimu di cabang lomba yang kamu minati!",
        content: this.getRegistrationContent(),
      },
    };
  }

  createSlideContainer() {
    // Create slides for each section
    const slidesHTML = `
            <div class="ppt-slides-container">
                ${Object.keys(this.sections)
                  .map((key) => {
                    const section = this.sections[key];
                    if (key === "home") return ""; // Home is separate hero section

                    return `
                        <div class="ppt-slide" data-slide="${key}">
                            <div class="ppt-slide-content">
                                <div class="ppt-slide-header">
                                    <h1 class="ppt-slide-title">${section.title}</h1>
                                    <p class="ppt-slide-subtitle">${section.subtitle}</p>
                                </div>
                                <div class="ppt-slide-body">
                                    ${section.content}
                                </div>
                            </div>
                        </div>
                    `;
                  })
                  .join("")}
            </div>
        `;

    document.body.insertAdjacentHTML("beforeend", slidesHTML);
  }

  attachEventListeners() {
    // Listen for dock item clicks
    document.addEventListener("dockItemClick", (e) => {
      const { itemId } = e.detail;
      this.handleSectionChange(itemId);
    });

    // Re-initialize GLightbox when the gallery slide is loaded
    document.addEventListener("slideContentLoaded", (e) => {
      if (e.detail.sectionId === "galeri") {
        const lightbox = GLightbox({
          selector: ".glightbox",
        });
      }
    });
  }

  handleSectionChange(sectionId) {
    if (!this.sections[sectionId]) return;

    this.currentSection = sectionId;
    this.showSlide(sectionId);
  }

  showSlide(sectionId) {
    const heroSection = document.querySelector(".s-hero-simple");
    const allSlides = document.querySelectorAll(".ppt-slide");
    const targetSlide = document.querySelector(`[data-slide="${sectionId}"]`);

    if (sectionId === "home") {
      // Show hero, hide all slides
      heroSection.classList.add("active");
      heroSection.classList.remove("slide-out-left");
      allSlides.forEach((slide) => {
        slide.classList.remove("active", "slide-in-right");
        slide.classList.add("slide-out-right");
      });
    } else if (targetSlide) {
      // Hide hero, show target slide
      heroSection.classList.remove("active");
      heroSection.classList.add("slide-out-left");

      allSlides.forEach((slide) => {
        if (slide === targetSlide) {
          slide.classList.add("active", "slide-in-right");
          slide.classList.remove("slide-out-right");
        } else {
          slide.classList.remove("active", "slide-in-right");
          slide.classList.add("slide-out-right");
        }
      });

      // Initialize section components
      setTimeout(() => {
        const event = new CustomEvent("slideContentLoaded", {
          detail: { sectionId },
        });
        document.dispatchEvent(event);

        // Animate content sections
        const activeSlide = document.querySelector(
          `[data-slide="${sectionId}"]`
        );
        if (activeSlide) {
          const contentSections =
            activeSlide.querySelectorAll(".content-section");
          gsap.from(contentSections, {
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 0.8,
            ease: "power3.out",
          });
        }
      }, 300);
    }
  }

  // Content generation methods
  getAboutContent() {
    return `
            <div class="content-section content-animate">
                <h3>Apa itu ITO?</h3>
                <p>Information Technology Olympiads (ITO) adalah sebuah ajang olimpiade yang diselenggarakan oleh SMK Telekomunikasi Darul Ulum Jombang untuk mengasah bakat dan minat siswa-siswi dalam bidang teknologi informasi.</p>
                
                <p>ITO merupakan wadah bagi para pelajar untuk menunjukkan kreativitas, inovasi, dan kemampuan mereka dalam mengembangkan solusi teknologi yang bermanfaat bagi masyarakat.</p>
            </div>
            
            <div class="content-section content-animate">
                <h3>Tujuan ITO</h3>
                <ul style="list-style: none; padding: 0;">
                    <li style="margin-bottom: 12px; padding-left: 25px; position: relative;">
                        <span style="position: absolute; left: 0; color: #ffd700; font-weight: bold;">•</span>
                        Mengembangkan kemampuan siswa dalam bidang teknologi informasi
                        Testing
                    </li>
                    <li style="margin-bottom: 12px; padding-left: 25px; position: relative;">
                        <span style="position: absolute; left: 0; color: #ffd700; font-weight: bold;">•</span>
                        Mendorong kreativitas dan inovasi dalam pembuatan karya teknologi
                    </li>
                    <li style="margin-bottom: 12px; padding-left: 25px; position: relative;">
                        <span style="position: absolute; left: 0; color: #ffd700; font-weight: bold;">•</span>
                        Membangun networking antar pelajar se-Indonesia
                    </li>
                    <li style="margin-bottom: 12px; padding-left: 25px; position: relative;">
                        <span style="position: absolute; left: 0; color: #ffd700; font-weight: bold;">•</span>
                        Memberikan wadah kompetisi yang sehat dan edukatif
                    </li>
                </ul>
            </div>
            
            <div class="content-section content-animate">
                <h3>Siapa yang Bisa Ikut?</h3>
                <p>ITO terbuka untuk seluruh siswa SMP/MTs dan SMA/SMK/MA se-Indonesia yang memiliki minat dan bakat di bidang teknologi informasi.</p>
            </div>
        `;
  }

  getTimelineContent() {
    const timelineData = [
      {
        date: "11 Desember - 18 Januari",
        title: "Pendaftaran",
        description:
          "Pendaftaran akan dibuka pada tanggal 11 Desember 2024 dan ditutup pada tanggal 18 Januari 2025.",
      },
      {
        date: "18 Januari 2025",
        title: "Pengumpulan Karya",
        description:
          "Batas pengumpulan karya adalah tanggal 18 Januari 2025. Diharapkan untuk mengirimkan karya sebelum batas waktu tersebut.",
      },
      {
        date: "25 Januari 2025",
        title: "Pengumuman 6 Besar",
        description:
          "Pada tanggal 25 Januari 2025, akan diumumkan 6 finalis yang akan bersaing untuk memperebutkan juara 1, 2, 3 dan juara harapan.",
      },
      {
        date: "25 Januari - 1 Februari",
        title: "Pengumpulan PPT",
        description:
          "Pengumpulan PPT dibuka setelah pengumuman finalis, dengan batas akhir 1 Februari.",
      },
      {
        date: "2 Februari 2025",
        title: "Closing & Awarding",
        description:
          "Acara penutupan event ITO & Pemberian Tropi dan hadiah kepada para finalis.",
      },
    ];

    return `
            <div class="timeline-container">
                ${timelineData
                  .map(
                    (item) => `
                    <div class="timeline-item">
                        <div class="timeline-date">${item.date}</div>
                        <div class="timeline-title">${item.title}</div>
                        <div class="timeline-description">${item.description}</div>
                    </div>
                `
                  )
                  .join("")}
            </div>
        `;
  }

  getSponsorContent() {
    const sponsors = [
      "client-1.svg",
      "client-2.svg",
      "client-4.svg",
      "client-5.svg",
      "client-6.svg",
    ];

    return `
            <div class="content-section">
                <p style="text-align: center; margin-bottom: 30px;">Terima kasih kepada para sponsor yang telah mendukung acara Information Technology Olympiads 2024.</p>
                <div class="sponsor-grid">
                    ${sponsors
                      .map(
                        (sponsor) => `
                        <div class="sponsor-item">
                            <img src="assets/img/${sponsor}" alt="Sponsor">
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
        `;
  }

  getGalleryContent() {
    const images = Array.from({ length: 10 }, (_, i) => {
      const num = i === 9 ? 10 : i + 1;
      return `Galeri/${num}.JPG`;
    });

    let imageRows = "";
    for (let i = 0; i < images.length; i += 3) {
      imageRows += '<div class="row" style="margin-bottom: 20px;">';
      for (let j = i; j < i + 3 && j < images.length; j++) {
        imageRows += `
                    <div class="col-md-4">
                        <a href="assets/img/${
                          images[j]
                        }" class="gallery-item glightbox" data-gallery="modal-gallery">
                            <img src="assets/img/${images[j]}" alt="Gallery ${
          j + 1
        }" style="width: 100%; height: auto; border-radius: 15px; object-fit: cover; aspect-ratio: 1/1;">
                        </a>
                    </div>
                `;
      }
      imageRows += "</div>";
    }

    return `
            <div class="content-section">
                <p style="text-align: center; margin-bottom: 30px;">Dokumentasi kegiatan Information Technology Olympiads tahun-tahun sebelumnya.</p>
                <div class="container-fluid">
                    ${imageRows}
                </div>
            </div>
        `;
  }

  getRegistrationContent() {
    return `
            <div class="competition-grid">
				<!-- CABANG 1: VIDEO KREATIF -->
				<div class="competition-card" data-aos="fade-up" data-aos-delay="100">
					<div class="competition-icon">
						<i class="fas fa-video" style="color: white;"></i>
					</div>
					<h2>Video Kreatif</h2>
					<p>Tuangkan idemu dalam sebuah video pendek yang kreatif dan inspiratif. Tunjukkan bakatmu dalam storytelling dan sinematografi!</p>
					<div class="button-group">
						<a href="#" class="btn-register">
							<i class="fas fa-user-plus"></i>
							<span>Daftar Sekarang</span>
						</a>
						<a href="
https://docs.google.com/document/d/1FS1BPST3WSl--LGv-N5-KphKQTgW2XCX/edit?usp=drive_link&ouid=103192844235996484755&rtpof=true&sd=true" class="btn-juknis">
							<i class="fas fa-book"></i>
							<span>Panduan Teknis</span>
						</a>
					</div>
				</div>
				
				<!-- CABANG 2: FUTSAL -->
				<div class="competition-card" data-aos="fade-up" data-aos-delay="200">
					<div class="competition-icon">
						<i class="fas fa-futbol" style="color: white;"></i>
					</div>
					<h2>Futsal</h2>
					<p>Bentuk tim terbaikmu dan raih kemenangan di lapangan! Tunjukkan skill, kerjasama, dan sportivitasmu dalam turnamen futsal paling bergengsi.</p>
					<div class="button-group">
						<a href="https://docs.google.com/document/d/1cToRD3tpyjODBCHK2bWKwvCDyKpyhT5a/edit?usp=drive_link&ouid=103192844235996484755&rtpof=true&sd=true" class="btn-register">
							<i class="fas fa-user-plus"></i>
							<span>Daftar Sekarang</span>
						</a>
						<a href="#" class="btn-juknis">
							<i class="fas fa-book"></i>
							<span>Panduan Teknis</span>
						</a>
					</div>
				</div>
				
				<!-- CABANG 3: CERDAS CERMAT INFORMATIKA (CCI) -->
				<div class="competition-card" data-aos="fade-up" data-aos-delay="300">
					<div class="competition-icon">
						<i class="fas fa-brain" style="color: white;"></i>
					</div>
					<h2>Cerdas Cermat Informatika (CCI)</h2>
					<p>Uji wawasan dan pengetahuanmu di bidang informatika. Bersainglah dalam kecepatan dan ketepatan untuk menjadi yang terbaik!</p>
					<div class="button-group">
						<a href="#" class="btn-register">
							<i class="fas fa-user-plus"></i>
							<span>Daftar Sekarang</span>
						</a>
						<a href="https://docs.google.com/document/d/1BSGtrD1ZmsEbgcNbv3rm9oskSNv3ggYn-ozeVLiW2Rw/edit?tab=t.0" class="btn-juknis">
							<i class="fas fa-book"></i>
							<span>Panduan Teknis</span>
						</a>
					</div>
				</div>
			</div>
        `;
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.contentManager = new ContentManager();
  });
} else {
  window.contentManager = new ContentManager();
}

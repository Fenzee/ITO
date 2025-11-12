/**
 * Content Manager
 * Handles PowerPoint-style slide transitions for different sections
 */

class ContentManager {
  constructor() {
    this.currentSection = "home";
    this.sections = this.initializeSections();
    this.sectionOrder = Object.keys(this.sections); // urutan semua section
    this.currentIndex = 0; // index awal ("home")
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
    const slidesHTML = `
      <div class="ppt-slides-container">
        ${Object.keys(this.sections)
          .map((key) => {
            if (key === "home") return "";
            const section = this.sections[key];
            return `
              <div class="ppt-slide" data-slide="${key}" data-loaded="false">
                <div class="ppt-slide-content"></div>
              </div>
            `;
          })
          .join("")}
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", slidesHTML);
  }

  attachEventListeners() {
    document.addEventListener("dockItemClick", (e) => {
      const { itemId } = e.detail;
      this.handleSectionChange(itemId);
    });

    document.addEventListener("slideContentLoaded", (e) => {
      if (e.detail.sectionId === "galeri") {
        const lightbox = GLightbox({ selector: ".glightbox" });
      }
    });
  }

  handleSectionChange(sectionId) {
  if (!this.sections[sectionId]) return;

    const sectionOrder = ["home", "about", "schedule", "sponsor", "galeri", "registration"];
    const currentIndex = sectionOrder.indexOf(this.currentSection);
    const nextIndex = sectionOrder.indexOf(sectionId);

    // Tentukan arah
    const direction = nextIndex > currentIndex ? "down" : "up";

    // 🔥 Update currentSection dulu sebelum transisi
    this.currentSection = sectionId;

    // Lalu jalankan animasi
    this.showSlide(sectionId, direction);
  }


  showSlide(sectionId, direction = "down") {
  const heroSection = document.querySelector(".s-hero-simple");
  const allSlides = document.querySelectorAll(".ppt-slide");
  const targetSlide = document.querySelector(`[data-slide="${sectionId}"]`);
  const currentSlide = document.querySelector('.ppt-slide.active');

  // 🧹 Bersihkan semua class transisi dari semua slide
  allSlides.forEach(slide => {
    slide.classList.remove("slide-in-up", "slide-in-down", "slide-out-up", "slide-out-down");
  });

  // 🏠 Jika ke home
  if (sectionId === "home") {
    heroSection.classList.add("active");
    heroSection.classList.remove("slide-out-up", "slide-out-down");

    if (currentSlide) {
      currentSlide.classList.remove("active", "slide-in-up", "slide-in-down");
      currentSlide.classList.add(direction === "down" ? "slide-out-down" : "slide-out-up");
    }
    this.currentSection = "home";
    return;
  }

  // 🧩 Jika ke slide lain
  heroSection.classList.remove("active");
  heroSection.classList.add(direction === "down" ? "slide-out-up" : "slide-out-down");

  // ✨ Slide aktif sekarang keluar
  if (currentSlide && currentSlide !== targetSlide) {
    currentSlide.classList.remove("active", "slide-in-up", "slide-in-down");
    currentSlide.classList.add(direction === "down" ? "slide-out-up" : "slide-out-down");
  }

  // 🚀 Slide target masuk
  if (targetSlide) {
    targetSlide.classList.remove("slide-out-up", "slide-out-down");
    targetSlide.classList.add("active", direction === "down" ? "slide-in-down" : "slide-in-up");
  }

  // 🔁 Update current section
  this.currentSection = sectionId;

  // 🔄 Lazy-load content (seperti sebelumnya)
  if (targetSlide && targetSlide.dataset.loaded === "false") {
    const section = this.sections[sectionId];
    const contentHTML =
      section.content ||
      this[`get${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}Content`]?.();

    targetSlide.querySelector(".ppt-slide-content").innerHTML = `
      <div class="ppt-slide-header">
        <h1 class="ppt-slide-title">${section.title}</h1>
        <p class="ppt-slide-subtitle">${section.subtitle}</p>
      </div>
      <div class="ppt-slide-body">${contentHTML}</div>
    `;
    targetSlide.dataset.loaded = "true";
  }

  // ✨ Efek fade-in konten
  setTimeout(() => {
    const event = new CustomEvent("slideContentLoaded", { detail: { sectionId } });
    document.dispatchEvent(event);

    const contentSections = targetSlide.querySelectorAll(".content-section");
    gsap.from(contentSections, {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
    });
  }, 300);
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
                        <ul><p style="font-size: 120%;">Create An Interaction
                        </p><span style="position: absolute; color: #ffd700; font-weight: bold; padding-right: 20px;">-</span><li style="padding-left: 25px;"><p>Membuka ruang interaksi positif antar siswa SMP/MTs untuk
menyalurkan bakat, kreativitas, dan kemampuan di bidang olahraga, teknologi, maupun seni.</p></li></ul>
                    </li>

                    <li style="margin-bottom: 12px; padding-left: 25px; position: relative;">
                        <span style="position: absolute; left: 0; color: #ffd700; font-weight: bold;">•</span>
                        <ul><p style="font-size: 120%;">Potential Confidence
                        </p><span style="position: absolute; color: #ffd700; font-weight: bold; padding-right: 20px;">-</span><li style="padding-left: 25px;"><p>Menumbuhkan rasa percaya diri serta membentuk karakter sportivitas, demokrasi dan kerjasama melalui kompetisi yang sehat.</p></li></ul>
                    </li>

                    <li style="margin-bottom: 12px; padding-left: 25px; position: relative;">
                        <span style="position: absolute; left: 0; color: #ffd700; font-weight: bold;">•</span>
                        <ul><p style="font-size: 120%;">School Promotion
                        </p><span style="position: absolute; color: #ffd700; font-weight: bold; padding-right: 20px;">-</span><li style="padding-left: 25px;"><p>Mengenalkan Sekolah SMK Telekomunikasi di hadapan masyarakat luas.</p></li></ul>
                    </li>

                    <li style="margin-bottom: 12px; padding-left: 25px; position: relative;">
                        <span style="position: absolute; left: 0; color: #ffd700; font-weight: bold;">•</span>
                        <ul><p style="font-size: 120%;">Respectful Environment
                        </p><span style="position: absolute; color: #ffd700; font-weight: bold; padding-right: 20px;">-</span><li style="padding-left: 25px;"><p>Mewujudkan suasana kompetisi yang salingmenghargai, sportif, dan membangun inspirasi bagi semua peserta.</p></li></ul>
                    </li>

                </ul>
            </div>
            
            <div class="content-section content-animate">
                <h3>Siapa yang Bisa Ikut?</h3>
                <p>ITO terbuka untuk seluruh siswa SMP/MTs se-Indonesia yang memiliki minat dan bakat di bidang teknologi informasi.</p>
            </div>
        `;
  }

  getTimelineContent() {
    const timelineData = [
      {
        date: "15 Oktober - 26 Desember 2025",
        title: "Pendaftaran",
        description:
          "Periode pendaftaran resmi dibuka! Pastikan Anda mendaftar dan melengkapi semua persyaratan sebelum tanggal 26 Desember 2025 untuk menjadi bagian dari ITO.",
      },
      {
        date: "27 Desember 2025",
        title: "TM Futsal, CCI, Dan Video Kreatif",
        description:
          "Pertemuan teknis (Technical Meeting) untuk cabang Futsal, Cerdas Cermat Informatika (CCI), dan Video Kreatif akan dilaksanakan. Pastikan perwakilan tim hadir untuk memahami peraturan dan mekanisme lomba.",
      },
      {
        date: "3 Januari 2026",
        title: "Opening Futsal",
        description:
          "Turnamen Futsal ITO resmi dimulai! Saksikan tim-tim terbaik beradu strategi dan skill di lapangan untuk memperebutkan gelar juara.",
      },
      {
        date: "15 Januari 2026",
        title: "Opening CCI",
        description:
          "Babak penyisihan Cerdas Cermat Informatika (CCI) dimulai. Uji pengetahuan dan kecepatan Anda dalam menjawab soal-soal seputar dunia IT.",
      },
      {
        date: "25 Januari 2026",
        title: "Pengumpulan Karya Video Kreatif",
        description:
          "Batas akhir pengumpulan karya video kreatif. Pastikan video Anda sudah diunggah dan memenuhi semua kriteria yang ditentukan.",
      },
      {
        date: "28 Januari 2026",
        title: "Grand Final CCI",
        description:
          "Saksikan pertarungan sengit para finalis Cerdas Cermat Informatika untuk memperebutkan gelar juara utama ITO.",
      },
      {
        date: "1 Februari 2026",
        title: "Awards And Grand Closing",
        description:
          "Puncak acara ITO! Pengumuman pemenang, penyerahan penghargaan, dan seremoni penutupan yang meriah untuk seluruh peserta dan panitia.",
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
                <p style="text-align: center; margin-bottom: 30px;">Terima kasih kepada para sponsor yang telah mendukung acara Information Technology Olympiads 2026.</p>
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
    const images = Array.from({ length: 12 }, (_, i) => {
      const num = i === 9 ? 9 : i + 1;
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
						<a href="https://docs.google.com/forms/d/e/1FAIpQLScoXEVhSymfr6fdoFABqlWzTGBkbgztKdTbZSaEsQS7ovmZ8g/viewform?usp=sharing&ouid=116884178347900216836" class="btn-register">
							<i class="fas fa-user-plus"></i>
							<span>Daftar Sekarang</span>
						</a>
						<a href="https://drive.google.com/drive/folders/1sLn3qJgiba5bJr5dyi0jqLYOFrqSpOaH" class="btn-juknis">
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
						<a href="https://docs.google.com/forms/d/e/1FAIpQLScoXEVhSymfr6fdoFABqlWzTGBkbgztKdTbZSaEsQS7ovmZ8g/viewform?usp=sharing&ouid=116884178347900216836" class="btn-register">
							<i class="fas fa-user-plus"></i>
							<span>Daftar Sekarang</span>
						</a>
						<a href="https://drive.google.com/drive/folders/1JbXTYZtlGYc5MaXeo_weItZ3T1SwhnX8" class="btn-juknis">
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
						<a href="https://docs.google.com/forms/d/e/1FAIpQLScoXEVhSymfr6fdoFABqlWzTGBkbgztKdTbZSaEsQS7ovmZ8g/viewform?usp=sharing&ouid=116884178347900216836" class="btn-register">
							<i class="fas fa-user-plus"></i>
							<span>Daftar Sekarang</span>
						</a>
						<a href="https://drive.google.com/drive/folders/1LAYcxKuNJYHg2TP7d36usolEpXEk2Tsk" class="btn-juknis">
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

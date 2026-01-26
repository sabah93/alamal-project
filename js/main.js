  //  المطلوب: Loops + Conditions + DOM Manipulation + Events + jQuery Animations

const featuredLessons = [
  { id: 1, title: "أساسيات الجمع والطرح", subject: "رياضيات", stage: "ابتدائي", desc: "شرح مبسط مع أمثلة قصيرة وتمارين." },
  { id: 2, title: "قراءة وفهم نص", subject: "عربي", stage: "ابتدائي", desc: "خطوات بسيطة لفهم النص واستخراج الأفكار." },
  { id: 3, title: "قواعد الجملة الاسمية", subject: "عربي", stage: "إعدادي", desc: "تعريف + أمثلة + تمارين تطبيقية." },
  { id: 4, title: "المعادلات البسيطة", subject: "رياضيات", stage: "إعدادي", desc: "حل معادلات خطوة بخطوة مع تدريبات." },
  { id: 5, title: "مقدمة في العلوم", subject: "علوم", stage: "ابتدائي", desc: "أفكار علمية بسيطة تناسب المرحلة." },
  { id: 6, title: "English Grammar Basics", subject: "إنجليزي", stage: "إعدادي", desc: "قواعد أساسية مع أمثلة واضحة." }
];

const materials = [
  { subject: "رياضيات", stage: "ابتدائي", type: "PDF", status: "متاح", title: "عمليات الحساب", link: "#" },
  { subject: "عربي", stage: "ابتدائي", type: "Video", status: "متاح", title: "الهمزة بسهولة", link: "#" },
  { subject: "علوم", stage: "ابتدائي", type: "PDF", status: "مكتمل", title: "الحواس الخمس", link: "#" },
  { subject: "إنجليزي", stage: "ابتدائي", type: "Video", status: "متاح", title: "Alphabet", link: "#" },

  { subject: "رياضيات", stage: "إعدادي", type: "PDF", status: "متاح", title: "المعادلات", link: "#" },
  { subject: "عربي", stage: "إعدادي", type: "Video", status: "مكتمل", title: "التمييز", link: "#" },
  { subject: "علوم", stage: "إعدادي", type: "PDF", status: "متاح", title: "الجهاز التنفسي", link: "#" },
  { subject: "إنجليزي", stage: "إعدادي", type: "Video", status: "متاح", title: "Grammar 1", link: "#" }
];

const videos = [
  { title: "فيديو: رياضيات للابتدائي", stage: "ابتدائي", src: "assets/video/Learn Addition.mp4" },
  { title: "فيديو: عربي للابتدائي", stage: "ابتدائي", src: "assets/video/Arabic.mp4" },
  { title: "فيديو: رياضيات للإعدادي", stage: "إعدادي", src: "assets/video/Introduction to algebra.mp4" },
  { title: "فيديو: English للإعدادي", stage: "إعدادي", src: "assets/video/Learn Numbers.mp4" }
];

function typeLabel(type){
  return (type.toLowerCase() === "pdf") ? "PDF" : "Video";
}

function statusBadge(status){
  // Conditions (شرط) لتغيير شكل الحالة
  if(status === "متاح"){
    return `<span class="badge text-bg-success">متاح</span>`;
  } else {
    return `<span class="badge text-bg-secondary">مكتمل</span>`;
  }
}

function renderFeaturedLessons(){
  const container = document.getElementById("featuredLessons");

  // Loops (حلقة) لعرض الدروس
  container.innerHTML = featuredLessons.map(lesson => `
    <div class="col-md-6 col-lg-4">
      <div class="lesson-card">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <div>
            <h6 class="mb-1 fw-bold">${lesson.title}</h6>
            <div class="lesson-meta">${lesson.subject} • ${lesson.stage}</div>
          </div>
          <i class="fa-solid fa-book-open text-primary"></i>
        </div>
        <p class="text-muted small mb-3">${lesson.desc}</p>
        <button class="btn btn-sm btn-primary rounded-pill px-3" onclick="openLesson(${lesson.id})">
          عرض التفاصيل
        </button>
      </div>
    </div>
  `).join("");
}

function openLesson(id){
  // DOM Manipulation: تغيير محتوى المودال حسب الدرس
  const lesson = featuredLessons.find(l => l.id === id);
  document.getElementById("lessonModalTitle").textContent = lesson.title;

  document.getElementById("lessonModalBody").innerHTML = `
    <div class="mb-2"><strong>المادة:</strong> ${lesson.subject}</div>
    <div class="mb-2"><strong>المرحلة:</strong> ${lesson.stage}</div>
    <div class="mb-2"><strong>وصف:</strong> ${lesson.desc}</div>
  `;

  const modal = new bootstrap.Modal(document.getElementById("lessonModal"));
  modal.show();
}

function renderMaterials(){
  const tbody = document.getElementById("materialsBody");
  const search = document.getElementById("searchInput").value.trim().toLowerCase();
  const stage = document.getElementById("stageFilter").value;

  // فلترة بالـ Conditions
  let filtered = materials.filter(item => {
    const matchesStage = (stage === "all") ? true : item.stage === stage;
    const matchesSearch =
      item.subject.toLowerCase().includes(search) ||
      item.title.toLowerCase().includes(search) ||
      item.stage.toLowerCase().includes(search);
    return matchesStage && matchesSearch;
  });

  // عرض النتائج بـ Loop
  tbody.innerHTML = filtered.map((item, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td>${item.subject}</td>
      <td>${item.stage}</td>
      <td><span class="badge text-bg-primary">${typeLabel(item.type)}</span></td>
      <td>${statusBadge(item.status)}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary" onclick="alert('فتح: ${item.title}')">
          عرض
        </button>
      </td>
    </tr>
  `).join("");

  document.getElementById("materialsCount").textContent = `عدد النتائج: ${filtered.length}`;
}

function renderVideoList(){
  const list = document.getElementById("videoList");
  list.innerHTML = videos.map((v, idx) => `
    <button class="btn btn-light text-end d-flex justify-content-between align-items-center"
            onclick="playVideo(${idx})">
      <span class="small">${v.title}</span>
      <span class="badge text-bg-primary">${v.stage}</span>
    </button>
  `).join("");
}

function playVideo(index){
  // DOM Manipulation لتغيير الفيديو
  const v = videos[index];
  document.getElementById("videoTitle").textContent = v.title;
  document.getElementById("videoStage").textContent = v.stage;

  const player = document.getElementById("mainVideo");
  player.pause();
  player.querySelector("source").src = v.src;
  player.load();
  player.play();

  // jQuery Animation (Fade)
  $("#mainVideo").hide().fadeIn(300);
}

function updateStats(){
  document.getElementById("statLessons").textContent = featuredLessons.length;
  document.getElementById("statMaterials").textContent = materials.length;
  document.getElementById("statVideos").textContent = videos.length;
}

function setupEvents(){
  // Events: input/change/click/submit
  document.getElementById("searchInput").addEventListener("input", () => {
    // jQuery Animation (fade) عند تحديث الجدول
    $("#materialsBody").fadeOut(120, function(){
      renderMaterials();
      $("#materialsBody").fadeIn(150);
    });
  });

  document.getElementById("stageFilter").addEventListener("change", () => {
    $("#materialsBody").fadeOut(120, function(){
      renderMaterials();
      $("#materialsBody").fadeIn(150);
    });
  });

  document.getElementById("clearFilters").addEventListener("click", () => {
    document.getElementById("searchInput").value = "";
    document.getElementById("stageFilter").value = "all";
    renderMaterials();
  });

  // إخفاء/إظهار الجدول (jQuery slide)
  document.getElementById("toggleTable").addEventListener("click", () => {
    $(".table-responsive").slideToggle(250);
  });

  // Form Validation
  document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const stage = document.getElementById("stage").value;
    const message = document.getElementById("message").value.trim();

    const alertBox = document.getElementById("formAlert");

    // شروط بسيطة (Student Level)
    if(name.length < 2){
      showAlert("الرجاء إدخال اسم صحيح.", "danger");
      return;
    }
    if(!email.includes("@") || !email.includes(".")){
      showAlert("الرجاء إدخال بريد إلكتروني صحيح.", "danger");
      return;
    }
    if(stage === ""){
      showAlert("الرجاء اختيار المرحلة الدراسية.", "danger");
      return;
    }
    if(message.length < 6){
      showAlert("الرجاء كتابة رسالة أطول قليلاً.", "danger");
      return;
    }

    // نجاح + DOM Manipulation
    showAlert("تم إرسال رسالتك بنجاح ✅ سنقوم بالرد قريبًا.", "success");
    document.getElementById("contactForm").reset();
  });
}

function showAlert(text, type){
  const alertBox = document.getElementById("formAlert");
  alertBox.className = `alert alert-${type}`;
  alertBox.textContent = text;

  // jQuery Animation
  $("#formAlert").hide().slideDown(250);

  // إخفاء تلقائي بعد فترة
  setTimeout(() => {
    $("#formAlert").slideUp(250, () => {
      alertBox.classList.add("d-none");
    });
  }, 2500);

  alertBox.classList.remove("d-none");
}

document.addEventListener("DOMContentLoaded", () => {
  renderFeaturedLessons();
  renderMaterials();
  renderVideoList();
  updateStats();
  setupEvents();
});

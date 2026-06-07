const routeButtons = document.querySelectorAll("[data-route-target]");
const views = Array.from(document.querySelectorAll(".view"));
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const revealItems = document.querySelectorAll(".reveal");
const cursorGlow = document.querySelector(".cursor-glow");
const projectTriggers = document.querySelectorAll(".project-trigger");
const tiltCards = document.querySelectorAll(".tilt-card");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const modalOverlay = document.getElementById("project-modal");
const modalHeader = modalOverlay?.querySelector(".modal-header");
const modalChapter = document.getElementById("modal-chapter");
const modalLabel = document.getElementById("modal-label");
const modalTitle = document.getElementById("modal-title");
const modalObjective = document.getElementById("modal-objective");
const modalProcess = document.getElementById("modal-process");
const modalOpenPdf = document.getElementById("modal-open-pdf");
const modalClose = document.getElementById("modal-close");
const modalDismiss = document.getElementById("modal-dismiss");

const routeMap = new Map(views.map((view) => [view.dataset.route, view]));
const defaultRoute = "intro";
let activeRoute = null;
let previousActiveElement = null;

const projectDetails = {
  "bai-1": {
    chapter: "Chương 1",
    label: "Bài tập 1",
    title: "Thao tác cơ bản với tệp tin và thư mục",
    objective:
      "Rèn luyện kỹ năng tạo, đổi tên, sao chép, di chuyển, xóa tệp tin và thư mục một cách thành thạo trên hệ điều hành.",
    process:
      "Bài làm tập trung vào việc làm quen với cấu trúc lưu trữ số, thực hành sắp xếp thư mục theo logic rõ ràng và thao tác trực tiếp với các tệp tin thường dùng. Qua đó, kỹ năng quản lý dữ liệu cá nhân được hình thành theo hướng gọn gàng, chính xác và tiết kiệm thời gian hơn khi học tập.",
    pdf: "./assets/docs/bai-tap-1.pdf",
    theme: "linear-gradient(135deg, #6f8f57, #9fbc7e)",
  },
  "bai-2": {
    chapter: "Chương 2",
    label: "Bài tập 2",
    title: "Tìm kiếm và đánh giá thông tin học thuật",
    objective:
      "Phát triển kỹ năng tìm kiếm và đánh giá thông tin học thuật từ các nguồn đáng tin cậy.",
    process:
      "Bài tập nhấn mạnh cách lựa chọn từ khóa, khoanh vùng nguồn tài liệu, đối chiếu độ tin cậy và ghi nhận thông tin học thuật theo hướng có kiểm chứng. Nhờ đó, quá trình đọc, chọn lọc và sử dụng tư liệu phục vụ học tập trở nên chặt chẽ và thuyết phục hơn.",
    pdf: "./assets/docs/bai-tap-2.pdf",
    theme: "linear-gradient(135deg, #6f8f57, #9fbc7e)",
  },
  "bai-3": {
    chapter: "Chương 3",
    label: "Bài tập 3",
    title: "Viết prompt hiệu quả cho các tác vụ học tập",
    objective:
      "Phát triển kỹ năng viết câu lệnh hiệu quả để tận dụng tối đa khả năng của các mô hình ngôn ngữ lớn trong học tập.",
    process:
      "Phần thực hiện đi từ việc xác định mục tiêu học tập, mô tả yêu cầu rõ ràng, thêm ngữ cảnh cần thiết cho đến điều chỉnh prompt theo kết quả nhận được. Bài tập giúp nâng cao khả năng giao tiếp với công cụ AI theo cách có cấu trúc, từ đó thu được đầu ra chính xác và hữu ích hơn.",
    pdf: "./assets/docs/bai-tap-3.pdf",
    theme: "linear-gradient(135deg, #6f8f57, #9fbc7e)",
  },
  "bai-4": {
    chapter: "Chương 4",
    label: "Bài tập 4",
    title: "Giao tiếp và hợp tác trong môi trường số",
    objective:
      "Rèn luyện kỹ năng tổ chức và tham gia cuộc họp trực tuyến chuyên nghiệp.",
    process:
      "Bài tập tập trung vào việc thực hành giao tiếp, phối hợp và làm việc hiệu quả trong môi trường số. Nội dung nhấn mạnh cách chuẩn bị trước cuộc họp, trao đổi rõ ràng, phân chia nhiệm vụ hợp lý và duy trì tinh thần hợp tác chuyên nghiệp khi làm việc trực tuyến.",
    pdf: "./assets/docs/bai-tap-4.pdf",
    theme: "linear-gradient(135deg, #6f8f57, #9fbc7e)",
  },
  "bai-5": {
    chapter: "Chương 5",
    label: "Bài tập 5",
    title: "Sử dụng AI tạo sinh để sáng tạo nội dung",
    objective:
      "Thành thạo việc sử dụng các công cụ trí tuệ nhân tạo tạo sinh để hỗ trợ quá trình sáng tạo nội dung số.",
    process:
      "Bài tập triển khai việc dùng AI tạo sinh để hình thành ý tưởng, phát triển bố cục nội dung và tinh chỉnh sản phẩm theo phong cách mong muốn. Trọng tâm nằm ở việc sử dụng công cụ một cách chủ động, biết đặt yêu cầu phù hợp và giữ được dấu ấn cá nhân trong đầu ra cuối cùng.",
    pdf: "./assets/docs/bai-tap-5.pdf",
    theme: "linear-gradient(135deg, #6f8f57, #9fbc7e)",
  },
  "bai-6": {
    chapter: "Chương 6",
    label: "Bài tập 6",
    title: "Báo cáo: Sử dụng AI có trách nhiệm và đạo đức trong học tập và nghiên cứu",
    objective:
      "Phát triển kỹ năng sử dụng trí tuệ nhân tạo có trách nhiệm và đạo đức trong học tập và nghiên cứu.",
    process:
      "Bài báo cáo tập trung vào việc nhận diện giới hạn của AI, ý thức trích dẫn minh bạch, tránh phụ thuộc hoàn toàn vào công cụ và luôn giữ vai trò chủ động của người học. Đây là phần tổng kết quan trọng nhằm bảo đảm công nghệ được sử dụng đúng mục đích, đúng chuẩn mực và có trách nhiệm.",
    pdf: "./assets/docs/bai-tap-6.pdf",
    theme: "linear-gradient(135deg, #6f8f57, #9fbc7e)",
  },
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -8% 0px",
  }
);

function refreshReveals(scope) {
  scope.querySelectorAll(".reveal").forEach((item) => {
    item.classList.remove("in-view");
    revealObserver.unobserve(item);
    revealObserver.observe(item);
  });

  requestAnimationFrame(() => {
    scope.querySelectorAll(".reveal").forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9 && rect.bottom > window.innerHeight * 0.12) {
        item.classList.add("in-view");
      }
    });
  });
}

revealItems.forEach((item) => revealObserver.observe(item));

function updateActiveNav(route) {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.routeTarget === route);
  });
}

function showRoute(route, updateHash = true) {
  const nextRoute = routeMap.has(route) ? route : defaultRoute;

  if (activeRoute === nextRoute && !updateHash) {
    return;
  }

  const render = () => {
    views.forEach((view) => {
      const isActive = view.dataset.route === nextRoute;
      view.classList.toggle("is-active", isActive);
      if (isActive) {
        refreshReveals(view);
      }
    });

    updateActiveNav(nextRoute);
    activeRoute = nextRoute;

    if (updateHash && window.location.hash !== `#${nextRoute}`) {
      window.history.replaceState(null, "", `#${nextRoute}`);
    }
  };

  if (document.startViewTransition && !reducedMotion.matches) {
    document.startViewTransition(render);
  } else {
    render();
  }
}

function openModal(projectId, triggerElement) {
  const project = projectDetails[projectId];
  if (!project || !modalOverlay) {
    return;
  }

  previousActiveElement = triggerElement ?? document.activeElement;
  modalChapter.textContent = project.chapter;
  modalLabel.textContent = project.label;
  modalTitle.textContent = project.title;
  modalObjective.textContent = project.objective;
  modalProcess.textContent = project.process;
  modalOpenPdf.href = project.pdf;
  modalHeader.style.background = project.theme;

  modalOverlay.classList.add("is-open");
  modalOverlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  setTimeout(() => {
    modalClose?.focus();
  }, 50);
}

function closeModal() {
  if (!modalOverlay) {
    return;
  }

  modalOverlay.classList.remove("is-open");
  modalOverlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  if (previousActiveElement instanceof HTMLElement) {
    previousActiveElement.focus();
  }
}

routeButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    if (button.tagName === "A") {
      event.preventDefault();
    }
    showRoute(button.dataset.routeTarget);
  });
});

projectTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    openModal(trigger.dataset.project, trigger);
  });
});

tiltCards.forEach((card) => {
  if (reducedMotion.matches) {
    return;
  }

  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const percentX = (event.clientX - rect.left) / rect.width;
    const percentY = (event.clientY - rect.top) / rect.height;
    const rotateY = (percentX - 0.5) * 14;
    const rotateX = (0.5 - percentY) * 14;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

modalClose?.addEventListener("click", closeModal);
modalDismiss?.addEventListener("click", closeModal);

modalOverlay?.addEventListener("click", (event) => {
  if (event.target === modalOverlay) {
    closeModal();
  }
});

window.addEventListener("hashchange", () => {
  const nextRoute = window.location.hash.replace("#", "");
  if (nextRoute !== activeRoute) {
    showRoute(nextRoute, false);
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modalOverlay?.classList.contains("is-open")) {
    closeModal();
  }
});

window.addEventListener("mousemove", (event) => {
  if (!cursorGlow || reducedMotion.matches) {
    return;
  }

  cursorGlow.style.transform = `translate3d(${event.clientX - 176}px, ${event.clientY - 176}px, 0)`;
});

showRoute(window.location.hash.replace("#", "") || defaultRoute, false);

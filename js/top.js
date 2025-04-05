"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const pagetop = document.querySelector(".js-pagetop");
  const header = document.querySelector(".js-header");
  const mainVisualImage = document.querySelector(".js-mainvis_image");
  const menuButton = document.querySelector('.js-menu-button');
  
  // pageload
  setupMenuToggle(menuButton, header);
  setupSmoothScroll(header);
  
  // calc Scroll
  let lastScrollY = 0;
  window.addEventListener("scroll", function () {
    const scrollPos = window.scrollY;
    requestAnimationFrame(() => {
      showPageTopButton(scrollPos, pagetop);
      toggleFixedHeader(scrollPos, header);
      scaleImageOnScroll(scrollPos, mainVisualImage);
      initFadeAnimation();
    });
    lastScrollY = scrollPos;
  });
});

/**
 * fade Animation
 * Fadeアニメーションの初期化。ページ内の特定要素がスクロール位置に応じてフェードイン
 * @returns {void} 戻り値なし
 */
function initFadeAnimation() {
  const elements = document.querySelectorAll('#top .motion, #top .fade');
  const screenHeight = window.innerHeight;
  const threshold = screenHeight * 0.9;
  
  elements.forEach(function(me) {
    const rect = me.getBoundingClientRect();
    const elementTop = rect.top + window.scrollY;  // 要素の上端位置
    
    if (window.scrollY + threshold > elementTop) {
      me.classList.add('is-show');
    }
  });
}

/**
 * Scroll Top
 * スクロール位置に応じてページトップボタンを表示/非表示
 * @param {number} scrollPos - 現在のスクロール位置
 * @param {HTMLElement} pagetop - ページトップボタンのDOM要素
 * @returns {void} 戻り値なし
 */
function showPageTopButton(scrollPos, pagetop) {
  if (scrollPos > 300) {
    pagetop.classList.add("is-show");
  } else {
    pagetop.classList.remove("is-show");
  }
}

/**
 * Fixed Header
 * スクロール位置に応じてヘッダーを固定表示/非表示
 * @param {number} scrollPos - 現在のスクロール位置
 * @param {HTMLElement} header - ヘッダーのDOM要素
 * @returns {void} 戻り値なし
 */
function toggleFixedHeader(scrollPos, header) {
  if (scrollPos > 50) {
    header.classList.add("header-fixed");
    setTimeout(() => {
      header.classList.add("is-scrollTop");
    }, 300);
  } else {
    header.classList.remove("header-fixed", "is-scrollTop");
  }
}

/**
 * Mainvisual Scaling
 * スクロール位置に応じてメインビジュアル画像をスケール
 * @param {number} scrollPos - 現在のスクロール位置
 * @param {HTMLElement} mainVisualImage - メインビジュアル画像のDOM要素
 * @returns {void} 戻り値なし
 */
function scaleImageOnScroll(scrollPos, mainVisualImage) {
  const scaleValue = Math.max(1, Math.min(1.3, 1 + scrollPos / 2000)); // minimum: 1, maximum: 1.3
  mainVisualImage.style.transform = `scale(${scaleValue})`;
}

/**
 * Menu Toggle
 * メニューボタンのトグルアニメーション
 * @param {HTMLElement} menuButton - メニューボタンのDOM要素
 * @param {HTMLElement} header - ヘッダーのDOM要素
 * @returns {void} 戻り値なし
 */
function setupMenuToggle(menuButton, header) {
  if (menuButton) {
    menuButton.addEventListener('click', () => {
      header.classList.toggle('menu-open');
    });
  }
}

/**
 * Smooth Scroll
 * ページ内のターゲットへスムーススクロール
 * SPでメニューを開いている場合は閉じてスクロール
 * @param {HTMLElement} header - ヘッダーのDOM要素
 * @returns {void} 戻り値なし
 */
function setupSmoothScroll(header) {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();

      const href = this.getAttribute("href");
      const target = document.querySelector(href === "#" || href === "" ? "html" : href);

      if (target) {
        const headerHeight = header ? header.offsetHeight : 0;
        const targetRect = target.getBoundingClientRect();
        window.scrollTo({
          top: window.scrollY + targetRect.top - headerHeight,
          behavior: "smooth"
        });

        if (header.classList.contains("menu-open")) {
          header.classList.remove("menu-open");
        }
      }
    });
  });
}

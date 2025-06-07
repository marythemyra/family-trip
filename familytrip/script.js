// 重慶成都九寨溝8日7夜家族旅行網頁版行程指南 - JavaScript

// 頁面加載完成後執行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化頁面
    initPage();
});

// 初始化頁面
function initPage() {
    // 添加頁面滾動效果
    addScrollEffects();
    
    // 初始化美食輪播
    initFoodSlider();
    
    // 實現圖片懶加載
    lazyLoadImages();
    
    // 添加響應式導航菜單
    setupResponsiveNav();
    
    // 添加返回頂部按鈕
    addBackToTopButton();
    
    // 優化圖片加載
    optimizeImageLoading();
    
    // 添加頁面過渡效果
    addPageTransitions();
}

// 添加頁面滾動效果
function addScrollEffects() {
    // 獲取所有需要添加滾動效果的元素
    const elements = document.querySelectorAll('.card, .day-preview, .itinerary-item');
    
    // 創建Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // 觀察每個元素
    elements.forEach(element => {
        observer.observe(element);
    });
}

// 初始化美食輪播
function initFoodSlider() {
    // 獲取所有輪播容器
    const sliders = document.querySelectorAll('.food-slider-container');
    
    sliders.forEach(slider => {
        // 添加滑動事件
        let isDown = false;
        let startX;
        let scrollLeft;
        
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
        
        // 觸摸設備支持
        slider.addEventListener('touchstart', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.touches[0].pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        
        slider.addEventListener('touchend', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        
        slider.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    });
}

// 實現圖片懶加載
function lazyLoadImages() {
    // 獲取所有圖片
    const images = document.querySelectorAll('img[data-src]');
    
    // 創建Intersection Observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.onload = () => {
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                };
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });
    
    // 觀察每個圖片
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // 對於不支持Intersection Observer的瀏覽器，使用傳統方法
    if (!('IntersectionObserver' in window)) {
        images.forEach(img => {
            img.src = img.dataset.src;
            img.onload = () => {
                img.removeAttribute('data-src');
                img.classList.add('loaded');
            };
        });
    }
}

// 設置響應式導航菜單
function setupResponsiveNav() {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav ul');
    
    // 創建漢堡菜單按鈕
    if (!document.querySelector('.nav-toggle')) {
        const navToggle = document.createElement('button');
        navToggle.className = 'nav-toggle';
        navToggle.innerHTML = '<span></span><span></span><span></span>';
        navToggle.setAttribute('aria-label', '切換導航菜單');
        
        // 添加點擊事件
        navToggle.addEventListener('click', () => {
            nav.classList.toggle('show');
            navToggle.classList.toggle('active');
        });
        
        // 將按鈕添加到頁頭
        header.querySelector('.container').appendChild(navToggle);
        
        // 添加樣式
        const style = document.createElement('style');
        style.textContent = `
            .nav-toggle {
                display: none;
                background: none;
                border: none;
                cursor: pointer;
                padding: 10px;
                z-index: 1000;
            }
            
            .nav-toggle span {
                display: block;
                width: 25px;
                height: 3px;
                margin: 5px 0;
                background-color: white;
                transition: all 0.3s;
            }
            
            .nav-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .nav-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .nav-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -7px);
            }
            
            @media (max-width: 768px) {
                .nav-toggle {
                    display: block;
                }
                
                nav ul {
                    display: none;
                    flex-direction: column;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background-color: var(--header-bg);
                    padding: 20px;
                    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
                    z-index: 999;
                }
                
                nav ul.show {
                    display: flex;
                }
                
                nav ul li {
                    margin: 10px 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// 添加返回頂部按鈕
function addBackToTopButton() {
    // 創建按鈕
    if (!document.querySelector('.back-to-top')) {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopBtn.setAttribute('aria-label', '返回頂部');
        
        // 添加點擊事件
        backToTopBtn.addEventListener('click', scrollToTop);
        
        // 將按鈕添加到頁面
        document.body.appendChild(backToTopBtn);
        
        // 添加樣式
        const style = document.createElement('style');
        style.textContent = `
            .back-to-top {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: var(--primary-color);
                color: white;
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s;
                z-index: 1000;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            }
            
            .back-to-top.show {
                opacity: 1;
                visibility: visible;
            }
            
            .back-to-top:hover {
                background-color: #2980b9;
                transform: translateY(-3px);
            }
            
            @media (max-width: 576px) {
                .back-to-top {
                    width: 40px;
                    height: 40px;
                    bottom: 20px;
                    right: 20px;
                }
            }
        `;
        document.head.appendChild(style);
        
        // 監聽滾動事件
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
    }
}

// 優化圖片加載
function optimizeImageLoading() {
    // 獲取所有圖片
    const images = document.querySelectorAll('img:not([data-src])');
    
    // 添加加載動畫
    images.forEach(img => {
        // 創建包裝容器
        const wrapper = document.createElement('div');
        wrapper.className = 'img-wrapper';
        
        // 獲取父元素
        const parent = img.parentNode;
        
        // 將圖片包裝在容器中
        parent.insertBefore(wrapper, img);
        wrapper.appendChild(img);
        
        // 添加加載指示器
        const loader = document.createElement('div');
        loader.className = 'img-loader';
        wrapper.appendChild(loader);
        
        // 監聽圖片加載完成事件
        img.addEventListener('load', () => {
            wrapper.classList.add('loaded');
            setTimeout(() => {
                loader.remove();
            }, 500);
        });
        
        // 如果圖片已經加載完成
        if (img.complete) {
            wrapper.classList.add('loaded');
            setTimeout(() => {
                loader.remove();
            }, 500);
        }
    });
    
    // 添加樣式
    const style = document.createElement('style');
    style.textContent = `
        .img-wrapper {
            position: relative;
            overflow: hidden;
        }
        
        .img-loader {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity 0.3s;
        }
        
        .img-loader::after {
            content: '';
            width: 30px;
            height: 30px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: var(--primary-color);
            animation: spin 1s linear infinite;
        }
        
        .img-wrapper.loaded .img-loader {
            opacity: 0;
        }
        
        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// 添加頁面過渡效果
function addPageTransitions() {
    // 獲取所有頁面鏈接
    const links = document.querySelectorAll('a[href^="day"], a[href="index.html"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            // 如果是同一頁面，不執行過渡效果
            if (link.href === window.location.href) {
                return;
            }
            
            e.preventDefault();
            
            // 創建過渡效果
            const transition = document.createElement('div');
            transition.className = 'page-transition';
            document.body.appendChild(transition);
            
            // 添加樣式
            const style = document.createElement('style');
            style.textContent = `
                .page-transition {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: var(--primary-color);
                    z-index: 9999;
                    transform: translateY(100%);
                    animation: slideUp 0.5s forwards;
                }
                
                @keyframes slideUp {
                    to {
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
            
            // 延遲跳轉
            setTimeout(() => {
                window.location.href = link.href;
            }, 500);
        });
    });
}

// 切換導航菜單（用於移動設備）
function toggleNav() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('show');
}

// 平滑滾動到頁面頂部
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 檢測設備類型
function isMobileDevice() {
    return (window.innerWidth <= 768) || 
           ('ontouchstart' in window) || 
           (navigator.maxTouchPoints > 0) || 
           (navigator.msMaxTouchPoints > 0);
}

// 優化頁面性能
function optimizePerformance() {
    // 使用requestAnimationFrame進行動畫
    // 延遲加載非關鍵資源
    // 減少DOM操作
}

// 添加頁面加載進度指示器
window.addEventListener('load', () => {
    // 隱藏加載指示器
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.classList.add('loaded');
        setTimeout(() => {
            loader.remove();
        }, 500);
    }
});


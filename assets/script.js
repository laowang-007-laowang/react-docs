
// 搜索功能
function searchDocs() {
  const input = document.getElementById('searchInput');
  const filter = input.value.toLowerCase();
  const docLinks = document.querySelectorAll('.doc-link');
  
  docLinks.forEach(link => {
    const text = link.textContent.toLowerCase();
    const parent = link.closest('.nav-category');
    
    if (text.includes(filter)) {
      link.style.display = 'block';
      if (parent) parent.style.display = 'block';
    } else {
      link.style.display = 'none';
    }
  });
  
  // 隐藏空分类
  const categories = document.querySelectorAll('.nav-category');
  categories.forEach(category => {
    const visibleLinks = category.querySelectorAll('.doc-link[style*="block"]');
    if (visibleLinks.length === 0 && filter !== '') {
      category.style.display = 'none';
    } else {
      category.style.display = 'block';
    }
  });
}

// 切换侧边栏（移动端）
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('mobile-open');
}

// 返回顶部
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// 显示/隐藏返回顶部按钮
function toggleBackToTop() {
  const button = document.getElementById('backToTop');
  if (window.pageYOffset > 300) {
    button.classList.add('visible');
  } else {
    button.classList.remove('visible');
  }
}

// 高亮当前页面链接
function highlightCurrentPage() {
  const currentPath = window.location.pathname;
  const docLinks = document.querySelectorAll('.doc-link');
  
  docLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (currentPath.includes(linkPath) || (currentPath.endsWith('/') && linkPath === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// 平滑滚动到锚点
function smoothScrollToAnchor() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// 复制代码功能
function addCopyButtons() {
  const codeBlocks = document.querySelectorAll('pre code');
  
  codeBlocks.forEach(block => {
    const pre = block.parentElement;
    const button = document.createElement('button');
    button.className = 'copy-btn';
    button.textContent = '复制';
    button.style.cssText = `
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background: rgba(102, 126, 234, 0.1);
      border: 1px solid rgba(102, 126, 234, 0.2);
      color: #667eea;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      cursor: pointer;
      transition: all 0.2s ease;
    `;
    
    pre.style.position = 'relative';
    pre.appendChild(button);
    
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(block.textContent);
        button.textContent = '已复制!';
        button.style.background = 'rgba(34, 197, 94, 0.1)';
        button.style.borderColor = 'rgba(34, 197, 94, 0.2)';
        button.style.color = '#22c55e';
        
        setTimeout(() => {
          button.textContent = '复制';
          button.style.background = 'rgba(102, 126, 234, 0.1)';
          button.style.borderColor = 'rgba(102, 126, 234, 0.2)';
          button.style.color = '#667eea';
        }, 2000);
      } catch (err) {
        console.error('复制失败:', err);
        button.textContent = '复制失败';
      }
    });
  });
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  highlightCurrentPage();
  smoothScrollToAnchor();
  addCopyButtons();
  
  // 监听滚动事件
  window.addEventListener('scroll', toggleBackToTop);
  
  // 监听窗口大小变化
  window.addEventListener('resize', function() {
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth > 768) {
      sidebar.classList.remove('mobile-open');
    }
  });
  
  // 键盘快捷键
  document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K 打开搜索
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      document.getElementById('searchInput').focus();
    }
    
    // ESC 清空搜索
    if (e.key === 'Escape') {
      const searchInput = document.getElementById('searchInput');
      if (searchInput === document.activeElement) {
        searchInput.value = '';
        searchDocs();
        searchInput.blur();
      }
    }
  });
  
  console.log('🎉 React 中文文档加载完成！');
});

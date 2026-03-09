const categoryList = document.querySelector(".category-list");

function checkOverflow() {
  if (categoryList.scrollWidth > categoryList.clientWidth) {
    categoryList.style.justifyContent = "flex-start";
    categoryList.style.gap = "0px";
  } else {
    categoryList.style.justifyContent = "center";
    categoryList.style.gap = "48px";
  }
}

// Page load aur resize dono par check karo
window.addEventListener("load", checkOverflow);
window.addEventListener("resize", checkOverflow);


// Global function for switching categories (called from inline onclick)
function switchCategory(categoryIndex, sectionId) {
  const section = document.getElementById(`CustomCategories-${sectionId}`);
  if (!section) return;
  
  // Get all tabs and categories
  const tabs = section.querySelectorAll('.category-tab');
  const categories = section.querySelectorAll('.custom-categories__category');
  
  if (!tabs.length || !categories.length) return;
  
  // Remove active class from all tabs
  tabs.forEach(tab => {
    tab.classList.remove('active');
    tab.setAttribute('aria-selected', 'false');
  });
  
  // Add active class to clicked tab
  if (tabs[categoryIndex]) {
    tabs[categoryIndex].classList.add('active');
    tabs[categoryIndex].setAttribute('aria-selected', 'true');
  }
  
  // Hide all categories with fade out
  categories.forEach(category => {
    category.style.opacity = '0';
    category.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
      category.classList.remove('active');
    }, 150);
  });
  
  // Show selected category with fade in
  setTimeout(() => {
    if (categories[categoryIndex]) {
      categories[categoryIndex].classList.add('active');
      categories[categoryIndex].style.opacity = '1';
      
      // Add fade-in effect if animations are enabled
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        categories[categoryIndex].style.transform = 'translateY(10px)';
        setTimeout(() => {
          categories[categoryIndex].style.transform = 'translateY(0)';
        }, 10);
      }
    }
  }, 150);
}

// Initialize category functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Add keyboard navigation for each custom categories section
  document.querySelectorAll('.custom-categories').forEach(section => {
    const categoryList = section.querySelector('.category-list');
    if (!categoryList) return;
    
    categoryList.addEventListener('keydown', (e) => {
      const tabs = Array.from(section.querySelectorAll('.category-tab'));
      const activeTab = section.querySelector('.category-tab.active');
      const currentIndex = tabs.indexOf(activeTab);
      const sectionId = section.dataset.id;
      
      let newIndex = currentIndex;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          newIndex = Math.max(0, currentIndex - 1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          newIndex = Math.min(tabs.length - 1, currentIndex + 1);
          break;
        case 'Home':
          e.preventDefault();
          newIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          newIndex = tabs.length - 1;
          break;
        default:
          return;
      }
      
      if (newIndex !== currentIndex && tabs[newIndex]) {
        switchCategory(newIndex, sectionId);
        tabs[newIndex].focus();
      }
    });
  });
});

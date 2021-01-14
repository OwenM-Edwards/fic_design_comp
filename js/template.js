// Scroll back to top of page button.
scrollButton = document.getElementById("scrollBtn");
// Night mode toggle.
const toggleSwitch = document.querySelector('.nightModeCheck input[type="checkbox"]');
const toggleSwitchMobile = document.querySelector('.nightModeCheckMobile input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
   document.documentElement.setAttribute('data-theme', currentTheme);

   if (currentTheme === 'dark') {
      toggleSwitch.checked = true;
      scrollButton.classList.remove('scrollBtnLight');
      scrollButton.classList.add('scrollBtnDark');
   }
}


switchTheme = (e) => {
   if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      scrollButton.classList.remove('scrollBtnLight');
      scrollButton.classList.add('scrollBtnDark');
      localStorage.setItem('theme', 'dark'); //add this
   }
   else {
      document.documentElement.setAttribute('data-theme', 'light');
      scrollButton.classList.remove('scrollBtnDark');
      scrollButton.classList.add('scrollBtnLight');
      localStorage.setItem('theme', 'light'); //add this
   }    
}

toggleSwitch.addEventListener('change', switchTheme, false);
toggleSwitchMobile.addEventListener('change', switchTheme, false);




// Show scroll button when user scrolls down.
window.onscroll = function() {scrollFunction()};
scrollFunction = () => {
   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      scrollButton.style.display = "block";
   }
   else {
      scrollButton.style.display = "none";
   }
}

// On click, scroll to top.
scrollToTop = () => {
   document.body.scrollTop = 0; //Safari
   document.documentElement.scrollTop = 0; //Chrome, FF, IE, Opera.
}

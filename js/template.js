let header = document.getElementById("header");
let landingPage = document.getElementById("landing");
// Scroll back to top of page button.
let scrollButton = document.getElementById("scrollBtn");

// Header fixed/relative switch.
let headerObserver = new IntersectionObserver(
   (entries, observer) => {
      if(header.classList.contains('headerRelative')){
         if(entries[0].intersectionRatio==0){
            header.classList.remove('headerRelative');
            header.classList.add('headerFixed');
            main.classList.remove('mainHeaderRelative');
            main.classList.add('mainHeaderFixed');
         }
      }
      else if(header.classList.contains('headerFixed')) {
         if(entries[0].intersectionRatio>0){
            header.classList.remove('headerFixed');
            header.classList.add('headerRelative');
            main.classList.remove('mainHeaderFixed');
            main.classList.add('mainHeaderRelative');
         }
      }
   },
   {
      root: null,
      rootMargin:'0px',
      threshhold:1
   }
);
headerObserver.observe(landingPage);

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
scrollFunction = () => {
   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      scrollButton.style.display = "block";
   }
   else {
      scrollButton.style.display = "none";
   }
}
window.onscroll = function() {scrollHandler()};
scrollHandler = () => {
   scrollFunction();
}


// On click, scroll to top.
scrollToTop = () => {
   document.body.scrollTop = 0; //Safari
   document.documentElement.scrollTop = 0; //Chrome, FF, IE, Opera.
}


// Loading bounce animation trigger.
loadingBounceA = document.getElementById("loadingBounce-a");
loadingBounceB = document.getElementById("loadingBounce-b");
loadingLanding = document.getElementById("landing-cover");
loadingLogoCover = document.getElementById("landing-logo-cover");

loadingBounce = () => {
   loadingLanding.classList.add('landing-cover-hidden');
   loadingBounceA.classList.add('loadingBounceMoveA');
   loadingBounceB.classList.add('loadingBounceMoveB');
   loadingLogoCover.classList.add('landing-logo-cover-hidden');
}


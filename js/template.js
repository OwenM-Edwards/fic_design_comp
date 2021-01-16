let headerFixed = document.querySelector(".headerFixed");
let landingPage = document.getElementById("landing");
let downIcon = document.getElementById("downIcon");
// Scroll back to top of page button.
let scrollButton = document.getElementById("scrollBtn");

// Set app window size
const appHeight = () => document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);

window.addEventListener('resize', appHeight);
appHeight();

// Header fixed/relative switch.
if(landingPage){
   let headerObserver = new IntersectionObserver(
      (entries, observer) => {
         if(headerFixed.classList.contains('headerFixedHidden')){
            if(entries[0].intersectionRatio==0){
               headerFixed.classList.remove('headerFixedHidden');
               headerFixed.classList.add('headerFixedShown');
            }
         }
         else if(headerFixed.classList.contains('headerFixedShown')) {
            if(entries[0].intersectionRatio>0){
               headerFixed.classList.remove('headerFixedShown');
               headerFixed.classList.add('headerFixedHidden');
            }
         }
      },
      {
         root: null,
         rootMargin:'0px',
         threshhold:0
      }
   );
   headerObserver.observe(landingPage);
}
// Check for stuck header by checking if downicon is in frame 
if(landingPage){
   let iconObserver = new IntersectionObserver(
      (entries, observer) => {
         if(entries[0].intersectionRatio>0){
            headerFixed.classList.remove('headerFixedShown');
            headerFixed.classList.add('headerFixedHidden');
         }
      },
      {
         root: null,
         rootMargin:'0px',
         threshhold:1
      }
   );
   iconObserver.observe(downIcon);
}


// Night mode toggle.
const toggleSwitches = document.querySelectorAll('.nightModeToggle input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
// default to dark if no prior select
if(!currentTheme){
   toggleSwitches.forEach (function(item,index){
      item.checked = true
   })
   scrollButton.classList.remove('scrollBtnLight');
   scrollButton.classList.add('scrollBtnDark');
}
else if (currentTheme) {
   document.documentElement.setAttribute('data-theme', currentTheme);
   if (currentTheme === 'dark') {
      toggleSwitches.forEach (function(item,index){
         item.checked = true
      })
      document.documentElement.setAttribute('data-theme', 'dark');
      scrollButton.classList.remove('scrollBtnLight');
      scrollButton.classList.add('scrollBtnDark');
   }
   else {
      toggleSwitches.forEach (function(item,index){
         item.checked = false
      })
      // toggleSwitchRelative.checked = false;
      // toggleSwitchFixed.checked = false;
      scrollButton.classList.add('scrollBtnLight');
      scrollButton.classList.remove('scrollBtnDark');
   }
}
switchTheme = (e) => {
   console.log('res')
   if (e.target.checked) {
      toggleSwitches.forEach (function(item,index){
         item.checked = true
      })
      document.documentElement.setAttribute('data-theme', 'dark');
      scrollButton.classList.remove('scrollBtnLight');
      scrollButton.classList.add('scrollBtnDark');
      localStorage.setItem('theme', 'dark'); //add this
   }
   else {
      toggleSwitches.forEach (function(item,index){
         item.checked = false
      })
      document.documentElement.setAttribute('data-theme', 'light');
      scrollButton.classList.remove('scrollBtnDark');
      scrollButton.classList.add('scrollBtnLight');
      localStorage.setItem('theme', 'light'); //add this
   }    
}
toggleSwitches.forEach (function(item,index){
   item.addEventListener('change', switchTheme, false);
})


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
loadingLogo = document.getElementById("landing-logo");

loadingBounce = () => {
   loadingLanding.classList.add('landing-cover-hidden');
   loadingBounceA.classList.add('loadingBounceMoveA');
   loadingBounceB.classList.add('loadingBounceMoveB');
   loadingLogoCover.classList.add('landing-logo-cover-hidden');
   loadingLogo.classList.add('landing-logo-colorShift');
}


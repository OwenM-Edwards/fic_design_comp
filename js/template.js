const headerFixed = document.querySelector(".headerFixed");
const landingPage = document.getElementById("landing");
const downIcon = document.querySelector("#downIconContainer");
// Scroll back to top of page button.
const scrollButton = document.getElementById("scrollBtn");

// Set app window size
const appHeight = () => document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);

window.addEventListener('resize', appHeight);
appHeight();




// Header fixed/relative switch.
if(landingPage){
   let headerObserver = new IntersectionObserver(
      (entries, observer) => {
         if(entries[0].intersectionRatio==0){
            headerFixed.classList.remove('headerFixedHidden');
            headerFixed.classList.add('headerFixedShown');
         }
         if(entries[0].intersectionRatio>0){
            headerFixed.classList.remove('headerFixedShown');
            headerFixed.classList.add('headerFixedHidden');
         } 
      },
      {
         root: null,
         rootMargin:'30px',
         threshhold:1
      }
   );
   headerObserver.observe(landingPage);
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
   downIcon.classList.add('downIcon-fadeIn');
   // Hide bounce icons when finished.
   setTimeout(function(){
      loadingBounceA.classList.remove('loadingBounceMoveA');
      loadingBounceB.classList.remove('loadingBounceMoveB');
      loadingBounceA.classList.remove('animation');
      loadingBounceB.classList.remove('animation');
      loadingBounceA.classList.add('loadingBounceHidden');
      loadingBounceB.classList.add('loadingBounceHidden');
   }, 1500 );
   
}

// Mobile menu toggle.
const mobileMenuInputs = document.querySelectorAll("#MobileInputCheckbox");
const mobileMenu = document.getElementById("linksMobile");
//  reset mobile check inputs on reload.
mobileMenuInputs.forEach(function(item, index){
   item.checked = false;
});

mobileMenuToggle = (e) =>{
   if(e.target.checked == true){
      mobileMenuInputs.forEach(function(item, index){
         item.checked = true;
      });
   }
   else {
      mobileMenuInputs.forEach(function(item, index){
         item.checked = false;
      });
   }
   if(!mobileMenu.classList.contains('linkMobileShown')){
      mobileMenu.classList.remove('linkMobileHidden');
      mobileMenu.classList.add('linkMobileShown');
      
   }
   else {
      mobileMenu.classList.remove('linkMobileShown');
      mobileMenu.classList.add('linkMobileHidden');
   }
   
}
// Open mobile menu.
mobileMenuInputs.forEach(function(item, index){
   item.addEventListener('change', mobileMenuToggle);
});


// Controller for text fade in animation.
const fadeInText = document.querySelectorAll('.fade-in-text');
const fadeInHeader = document.querySelectorAll('.fade-in-header');
fadeInHeaderOnce = document.querySelectorAll('.fade-in-header-once');
if(fadeInText){
   fadeInText.forEach(function(item, index){
      let fadeInTextObserver = new IntersectionObserver(
         (entries, observer) => {
            if(entries[0].intersectionRatio==0){
               item.classList.remove('text-fade-in-anim');
            }
            if(entries[0].intersectionRatio>0){
               item.classList.add('text-fade-in-anim');
            } 
         },
         {
            root: null,
            rootMargin:'30px',
            threshhold:1
         }
      );
      fadeInTextObserver.observe(item);
   })
}
if(fadeInHeader){
   fadeInHeader.forEach(function(item, index){
      let fadeInHeaderObserver = new IntersectionObserver(
         (entries, observer) => {
            if(entries[0].intersectionRatio==0){
               item.classList.remove('header-fade-in-anim');
            }
            if(entries[0].intersectionRatio>0){
               item.classList.add('header-fade-in-anim');
            } 
         },
         {
            root: null,
            rootMargin:'30px',
            threshhold:1
         }
      );
      fadeInHeaderObserver.observe(item);
   }) 
}
if(fadeInHeaderOnce){
   fadeInHeaderOnce.forEach(function(item, index){
      let fadeInHeaderOnceObserver = new IntersectionObserver(
         (entries, observer) => {
            if(entries[0].intersectionRatio>0){
               item.classList.add('header-fade-in-anim');
            } 
         },
         {
            root: null,
            rootMargin:'30px',
            threshhold:1
         }
      );
      fadeInHeaderOnceObserver.observe(item);
   }) 
}


// Text carousel animation.
// Array of text.
// Current displayed, previous displayed, next displayed vars.
// Three divs for each.
// Cycle through switching them as you go.
// Vars
// Fixed header, revealed when scrolls past landing page.
const headerFixed = document.querySelector(".header-fixed");
// Index.html landing section.
const landingPage = document.getElementById("landing");
// Index.html Scroll down past landing page.
const downIcon = document.querySelector("#down-icon-container");
// Checkbox to toggle dark mode.
const toggleDarkModeInput = document.querySelectorAll('.night-mode-toggle input[type="checkbox"]');
// Current dark/light mode preference.
let currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
// Toggle dark mode checkbox.
const mobileMenuInputs = document.querySelectorAll("#mobile-input-checkbox");
// The mobile menu.
const mobileMenu = document.getElementById("links-mobile");
// Icons animated for landing page in index.html.
const loadingAnimationIconA = document.getElementById("loading-bounce-a");
const loadingAnimationIconB = document.getElementById("loading-bounce-b");
const loadingLanding = document.getElementById("landing-cover");
const loadingLogoCover = document.getElementById("landing-logo-cover");
const loadingLogo = document.getElementById("landing-logo");
// Classes for fading in h2's and h3's.
const fadeInHeader = document.querySelectorAll('.fade-in-header');
const fadeInHeaderOnce = document.querySelectorAll('.fade-in-header-once');
// Scroll back to top of page button.
const scrollToTopButton = document.getElementById("scroll-to-top-button");

// Set app window size, used to set max-width of content.
const appHeight = () => document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
window.addEventListener('resize', appHeight);
appHeight();


// When user scrolls past landing page, activate the fixed header.
// Uses the header-fixed-hidden & header-fixedShown classes.
// If landing page not present (on subpage, dont activate).
if (landingPage) {
   let headerObserver = new IntersectionObserver(
      (entries, observer) => {
         if (entries[0].intersectionRatio == 0) {
            headerFixed.classList.remove('header-fixed-hidden');
            headerFixed.classList.add('header-fixedShown');
         }
         if (entries[0].intersectionRatio > 0) {
            headerFixed.classList.remove('header-fixedShown');
            headerFixed.classList.add('header-fixed-hidden');
         }
      },
      { root: null, rootMargin: '30px', threshhold: 1 }
   ); headerObserver.observe(landingPage);
}


// Night mode toggle.
// default to dark if no prior select, pulled form local storage.
if (!currentTheme) {
   toggleDarkModeInput.forEach(function (item, index) {
      item.checked = true
   })
   scrollToTopButton.classList.remove('scroll-to-top-buttonLight');
   scrollToTopButton.classList.add('scroll-to-top-buttonDark');
}
else if (currentTheme) {
   document.documentElement.setAttribute('data-theme', currentTheme);
   if (currentTheme === 'dark') {
      toggleDarkModeInput.forEach(function (item, index) {
         item.checked = true
      })
      document.documentElement.setAttribute('data-theme', 'dark');
      scrollToTopButton.classList.remove('scroll-to-top-buttonLight');
      scrollToTopButton.classList.add('scroll-to-top-buttonDark');
   }
   else {
      toggleDarkModeInput.forEach(function (item, index) {
         item.checked = false
      })
      // toggleSwitchRelative.checked = false;
      // toggleSwitchFixed.checked = false;
      scrollToTopButton.classList.add('scroll-to-top-buttonLight');
      scrollToTopButton.classList.remove('scroll-to-top-buttonDark');
   }
}
// Switches theme, called from toggleSwitches.
switchTheme = (e) => {
   if (e.target.checked) {
      toggleDarkModeInput.forEach(function (item, index) {
         item.checked = true
      })
      document.documentElement.setAttribute('data-theme', 'dark');
      scrollToTopButton.classList.remove('scroll-to-top-buttonLight');
      scrollToTopButton.classList.add('scroll-to-top-buttonDark');
      localStorage.setItem('theme', 'dark'); //add this
   }
   else {
      toggleDarkModeInput.forEach(function (item, index) {
         item.checked = false
      })
      document.documentElement.setAttribute('data-theme', 'light');
      scrollToTopButton.classList.remove('scroll-to-top-buttonDark');
      scrollToTopButton.classList.add('scroll-to-top-buttonLight');
      localStorage.setItem('theme', 'light'); //add this
   }
}
toggleDarkModeInput.forEach(function (item, index) {
   item.addEventListener('change', switchTheme, false);
})


// Reveal scroll back to top button when user scrolls down past landing page.
scrollFunction = () => {
   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      scrollToTopButton.style.display = "block";
   }
   else {
      scrollToTopButton.style.display = "none";
   }
}
window.onscroll = function () { scrollFunction() };
// When user click scroll back to top button, scroll them to top of page.
// Fired from the button itself.
scrollToTop = () => {
   document.body.scrollTop = 0; //Safari
   document.documentElement.scrollTop = 0; //Chrome, FF, IE, Opera.
}


// Landing page intro animation.
// Triggered on window load, if landing page present.
if (landingPage) {
   window.onload = function () {
      loadingLanding.classList.add('landing-cover-hidden');
      loadingAnimationIconA.classList.add('loading-bounce-move-a');
      loadingAnimationIconB.classList.add('loading-bounce-move-b');
      loadingLogoCover.classList.add('landing-logo-cover-hidden');
      downIcon.classList.add('down-icon-fade-in');
      // Move animation icons to side of screen, then hide when finished.
      // Hiding prevents window resizing issues.
      setTimeout(function () {
         loadingAnimationIconA.classList.remove('loading-bounce-move-a');
         loadingAnimationIconB.classList.remove('loading-bounce-move-b');
         loadingAnimationIconA.classList.remove('animation');
         loadingAnimationIconB.classList.remove('animation');
         loadingAnimationIconA.classList.add('loading-bounce-hidden');
         loadingAnimationIconB.classList.add('loading-bounce-hidden');
      }, 1500);
   }
}


// Mobile menu.
//  Reset the mobile input checkbox status for reloads. Input taken from localstore instead.
mobileMenuInputs.forEach(function (item, index) {
   item.checked = false;
});
// Toggle mobile menu display.
// Foreach used, as there are several different possible mobile menu inputs - 
// Fixed and relative headers, and the mobile menu.
mobileMenuToggle = (e) => {
   // If input checked, check all other inputs.
   // Then show mobile menu.
   if (e.target.checked == true) {
      mobileMenuInputs.forEach(function (item, index) {
         item.checked = true;
      });
      mobileMenu.classList.remove('mobile-menu-hidden');
      mobileMenu.classList.add('mobile-menu-shown');
   }
   // Else uncheck all other inputs.
   // Then hide mobile menu.
   else {
      mobileMenuInputs.forEach(function (item, index) {
         item.checked = false;
      });
      mobileMenu.classList.remove('mobile-menu-shown');
      mobileMenu.classList.add('mobile-menu-hidden');
   }
}
mobileMenuInputs.forEach(function (item, index) {
   item.addEventListener('change', mobileMenuToggle);
});


// Controller for header fade animations.
// Fade in for h2's and h3's.
if (fadeInHeader) {
   // Fades in the header once within view, then resets when out of view.
   fadeInHeader.forEach(function (item, index) {
      let fadeInHeaderObserver = new IntersectionObserver(
         (entries, observer) => {
            if (entries[0].intersectionRatio == 0) {
               item.classList.remove('header-fade-in-anim');
            }
            if (entries[0].intersectionRatio > 0) {
               item.classList.add('header-fade-in-anim');
            }
         },
         { root: null, rootMargin: '30px', threshhold: 1 }
      );
      fadeInHeaderObserver.observe(item);
   })
}
if (fadeInHeaderOnce) {
   // Fades in the header once within view, does not reset.
   fadeInHeaderOnce.forEach(function (item, index) {
      let fadeInHeaderOnceObserver = new IntersectionObserver(
         (entries, observer) => {
            if (entries[0].intersectionRatio > 0) {
               item.classList.add('header-fade-in-anim');
            }
         },
         { root: null, rootMargin: '30px', threshhold: 1 }
      );
      fadeInHeaderOnceObserver.observe(item);
   })
}

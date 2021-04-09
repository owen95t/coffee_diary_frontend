<template>
 <div id="homepage">
   <div>
     <section class="top">
       <div class="top-container">
         <div class="welcome">
           <h1>WELCOME TO</h1>
         </div>
         <div class="scroll">
           <h1 class="scroll-inner">
             COFFEE DIARY <span class="span-lower">COFFEE DIARY</span> COFFEE DIARY
           </h1>
           <h1><span class="scroll2">COFFEE DIARY COFFEE DIARY <span class="span-italics">COFFEE DIARY</span></span></h1>
         </div>
         <div class="marquee" style="--tw: 50vw; --ad: 2.5s;">
           <span>COFFEE DIARY</span>
         </div>
         <a href="#" v-scroll-to="'#bottom'">
           <div class="scroll-down"></div>
         </a>
       </div>
     </section>
     <section id="bottom" class="bottom">
       <div class="bottom-container">
         <div class="nav">
           <p>Coffee Diary</p>
         </div>
         <div>
           <h1>
             ABOUT
           </h1>
         </div>
         <p class="about-description">Do you love coffee like I do? Do you keep track of your coffee brewing methodologies? You can do that here, with Coffee Diary!</p>
         <div class="">
           <h1>
             <router-link to="/register" class="routerLink">SIGN UP</router-link>
             <span style="padding-left: 0.5em; padding-right: 0.5em">|</span>
             <router-link to="/login" class="routerLink">LOG IN</router-link>
           </h1>
         </div>
       </div>
     </section>
   </div>
 </div>
</template>

<script>
import SmoothScroll from 'smooth-scroll'
export default {
  name: "Home",
  data() {
    return {
      scroll: new SmoothScroll('a[href*="#"]')
    }
  }
}
</script>

<style scoped>


section {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  align-content: center;
  scroll-snap-align: center;
}

h1 {
  font-size: 1.5em;
}

.top {
  background-color: #ffecd1;
  animation: fadeIn 2s;
}

@keyframes fadeIn {
  0% {
    opacity: 0%;
  }
  100% {
    opacity: 100%;
  }
}

.top-container {

}


.bottom {
  background-color: #15616D;
  color: black;
}

.bottom-container {

}



.routerLink {
  text-decoration: none;
  color: black;
}
.routerLink:hover {
  text-decoration: none;
  color: black;
  text-transform: lowercase;
}

.span-lower:hover {
  text-transform: lowercase;
}
.span-italics:hover {
  font-style: italic;
}

.nav {
  position: absolute;
  /* margin-left: auto;
  margin-right: auto; */
  top: 100vh;
  left: 0;
  right: 0;
  text-align: center;
}

.about-description {
  margin-left: 20%;
  margin-right: 20%;
  white-space: break-spaces;
}

.center {
  text-align: center;
}

.scroll-down {
  height: 50px;
  width: 30px;
  border: 2px solid black;
  position: absolute;
  left: 50%;
  bottom: 30px;
  border-radius: 30px;
  cursor: pointer;
}

.scroll-down::before,
.scroll-down::after {
  content: '';
  position: absolute;
  top: 20%;
  left: 50%;
  border: 2px solid black;
  height: 10px;
  width: 10px;
  transform: translate(-50%, -50%) rotate(45deg);
  border-top: transparent;
  border-left: transparent;
}


.marquee {
  margin: 2rem 0;
  font-size: 8vw;
  overflow: hidden;
  width: 100%;
  display: flex;
}


.marquee span {
  display: inline-block;
  white-space: nowrap;
  color: #00112C;
  width: var(--tw);
  text-shadow: var(--tw) 0 currentColor,
  calc(var(--tw) * 2) 0 currentColor,
  calc(var(--tw) * 3) 0 currentColor,
  calc(var(--tw) * 4) 0 currentColor;

  will-change: transform;
  animation: marquee var(--ad) linear infinite;
}


@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}

</style>
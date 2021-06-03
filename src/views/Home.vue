<template>
 <div id="homepage">
   <div>
     <section class="top">
       <div class="top-container">
         <div class="welcome">
           <h1>WELCOME TO</h1>
         </div>
         <div class="welcome">
           <h1>COFFEE DIARY</h1>
         </div>
<!--         <div class="marquee" style="&#45;&#45;tw: 60vw; &#45;&#45;ad: 4.0s;">-->
<!--           <span>COFFEE DIARY</span>-->
<!--         </div>-->
         <a href="#" v-scroll-to="'#bottom'">
           <div class="scroll-down"></div>
         </a>
       </div>
     </section>
     <section id="bottom" class="bottom">
       <div class="bottom-container">
         <div class="nav">
           <p class="bottom-header">Coffee Diary</p>
         </div>

         <div>
           <h1 class="about-header">
             ABOUT
           </h1>
         </div>
         <p class="about-description">Do you love coffee like I do? Do you keep track of your coffee brewing methodologies? You can do that here, with Coffee Diary!</p>
         <div class="bottom-buttons">
           <h1>
             <router-link to="/register" class="routerLink"> SIGN UP </router-link>
           </h1>
           <h1>
             <router-link to="/login" class="routerLink"> LOG IN </router-link>
           </h1>
           <br/>
<!--           <h3>Experimental</h3>-->
<!--           <p>-->
<!--             <router-link to="/dashboard2" class="routerLink">Test Dashboard</router-link>-->
<!--           </p>-->
<!--           <p>-->
<!--             <router-link to="/loginsimple" class="routerLink">LoginSimple</router-link>-->
<!--           </p>-->
<!--           <p>-->
<!--             <router-link to="/registersimple" class="routerLink">RegisterSimple</router-link>-->
<!--           </p>-->
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

/*.welcome {*/
/*  animation: fadeIn 2s;*/
/*}*/
/*@keyframes fadeIn {*/
/*  0% {*/
/*    opacity: 0%;*/
/*  }*/
/*  100% {*/
/*    opacity: 100%;*/
/*  }*/
/*}*/

section {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  align-content: center;
  /*scroll-snap-align: center;*/
}

h1 {
  font-size: 5vw;
}
@media screen and (min-width: 300px) and (max-width: 500px){
  h1 {
    font-size: 10vw;
  }
  .about-description{
    font-size: 5.5vw;
  }
  .about-header {
    font-size: 8vw;
  }
  .routerLink{
    font-size: 8vw;
  }
  .bottom-header{
    font-size: 8vw;
  }
}
@media screen and (min-width: 501px){
  .about-header{
    font-size: 4vw;
  }
  .routerLink{
    font-size: 4vw;
  }
  .bottom-header {

  }
}

.top {
  background-color: #ffecd1;
}


.bottom {
  background-color: #15616D;
  color: black;
}

.bottom-container {
  /*box-sizing: border-box;*/
  /*line-height: normal;*/
}

.span1 {
  font-family: 'Apple Garamond';
}
.span3 {
  font-family: 'Times New Roman';
}
.span4 {
  font-family: 'DIN Alternate';
}

.bottom-buttons {
  font-size: 2rem;
  position: relative;
}


.about-header{
}
.routerLink {
  text-decoration: none;
  color: black;
  white-space: pre;
}
.routerLink:hover {
  text-decoration: none;
  color: black;
  text-transform: lowercase;
  white-space: pre;
  width: initial;

}

/*.span-lower:hover {*/
/*  text-transform: lowercase;*/
/*}*/
.span-italics:hover {
  font-style: italic;
}

.nav {
  position: absolute;
  top: 100vh;
  width: 100%;
  /*left: 50%;*/
  /*right: 0;*/
  /*text-align: center;*/
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
  margin-left: -15px;
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
  font-size: 3em;
  overflow: hidden;
  width: 100vw;
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
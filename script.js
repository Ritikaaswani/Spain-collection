function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
loco();
var t1 = gsap.timeline({
  scrollTrigger:{
    trigger:"#page1",
    scroller:"#main",
    start:"top -50%",
    end:"top -230%",
    pin:true,
    scrub:2,
    markers:true

  }
})
t1.from("#part2",{
  y:100,
   
 })
t1.to("#part2",{
  width:"2000vw",
  duration:0.8
},"anim")

t1.to("#part1",{
  x:-500
  
},"anim")
t1.to("#part3",{
  x:500
  
},"anim")
t1.to("#page1 h1",{
  y:-400,
  duration:0.2
  
},"anim")
t1.from("#page1 h3",{
  y: 400,
  delay:0.25
  
},"anim")
t1.from("#page1 i",{
  y: 400,
  delay:0.25
  
},"anim")



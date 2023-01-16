/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const main = document.querySelector("main");
const navbar = document.querySelector(" header nav");
const navUl = document.querySelector(" header nav #navbar__list");
let heading1 = document.querySelector("h1");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
//typing effect function 
function typing(){let h1Content = "Landing Page";
for (let i = 0; i <= h1Content.length; i++) {
  let k = i;
  let cont =""
  setTimeout(() => {
    cont += h1Content.charAt(k);
    heading1.innerText += cont
                
  }, 200 * (k + 1));
}
};
typing();

// Start add section dinamically
//add button to creat section dynamically
let fragment = document.createDocumentFragment();
let buttonsDiv = document.createElement("div")
buttonsDiv.style.cssText = "margin:0; padding:0;";

let addSectionButton = document.createElement("button")
addSectionButton.innerText = "Add Section"
buttonsDiv.appendChild(addSectionButton);
navbar.prepend(buttonsDiv);
//create section 
function createSection() {
   let sectionz = document.querySelectorAll("section")
  let num = sectionz.length + 1;
  let newSection = document.createElement("section");
  newSection.id = `section${num}`;
  newSection.setAttribute("data-nav", `Section ${num}`);
  newSection.innerHTML = (`<div class="landing__container">
    <h2>Section ${num}</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
      fermentum metus faucibus lectus pharetra dapibus. Suspendisse
      potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget
      lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed
      convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla
      eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam
      nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis
      lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a
      tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus
      vitae elit. Integer nec libero venenatis libero ultricies molestie
      semper in tellus. Sed congue et odio sed euismod.
    </p>

    <p>
      Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar
      gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam.
      Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum
      consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget
      elementum tortor mollis non.
    </p>
  </div>`);
  //add the created section to the navbar
  fragment.appendChild(newSection);
  main.append(fragment);
  function addSectionToList() {
    let createdList = document.createElement("li");
    let createdAnc = document.createElement("a");
    let content = newSection.getAttribute("data-nav");
    createdAnc.setAttribute("href", `#${newSection.id}`);
    createdAnc.classList.add("menu__link");
    createdAnc.innerText = `${content}`;
    createdList.appendChild(createdAnc);
    fragment.appendChild(createdList);
    navUl.append(fragment)
  };
  addSectionToList();
  //activate this section when in the viewport
  activateSection();
  //Make section collapsible
  collapsing(newSection);
}

addSectionButton.addEventListener("click", createSection);

// End add section

// Start Remove section 
//remove button
let removeSectionButton = document.createElement("button")
removeSectionButton.innerText="Remove Section"
buttonsDiv.prepend(removeSectionButton);
//remove section function
function removeSection() {
  removeSectionButton.addEventListener("click", () => {
    let sections= document.querySelectorAll("section")
    sections[sections.length - 1].remove();
//remove section from nav bar
    let lists = document.querySelectorAll("li");
    lists[lists.length - 1].remove();
  });
}
removeSection();
// End Remove section 

/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// build the nav

let sections = document.querySelectorAll("section");
  sections.forEach(section => {
    let createdList = document.createElement("li");
    let createdAnc = document.createElement("a");
    let secId = section.getAttribute("id");
    let content = section.getAttribute("data-nav");
    createdAnc.setAttribute("href", `#${secId}`);
    createdAnc.classList.add("menu__link");
    createdAnc.innerText = `${content}`;
    createdList.appendChild(createdAnc);
    fragment.appendChild(createdList);
    navUl.append(fragment);
  });

//Responsive navbar
let icon = document.querySelector(".icon")
let header = document.querySelector(".page__header");
window.addEventListener("click", (e) => {
  if (e.target === icon) {
    header.classList.add("active-nav");
  } else {
    header.classList.remove("active-nav");
  }
})
// Add class 'active' to section when near top of viewport
// Add class 'active' to navigation items when a section is in the viewport

function activateSection() {
  let sections = document.querySelectorAll("section");
  sections.forEach(section => { 
    let rect = section.getBoundingClientRect();
//check that section in viewport
    if ((rect.top >= 0 &&rect.top <800)
    && ((rect.bottom <= window.innerHeight)
    ||(rect.bottom<= document.documentElement.clientHeight ))
    ) {
//avctivate section in viewport
section.classList.add("your-active-class");
let ide = section.getAttribute("id");
let ele = document.querySelector(`[href="#${ide}"]`);
//avctivate navigation item in viewport
      ele.classList.add("active");
    } else {
      let ide = section.getAttribute("id");
      let ele = document.querySelector(`[href="#${ide}"]`);
      section.classList.remove("your-active-class");
      ele.classList.remove("active");
    }
    
  })
}
document.addEventListener("scroll", activateSection);
activateSection();



// Smooth scrolling throughout the document 
let anchors = document.querySelectorAll("a");
anchors.forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    let id = e.target.getAttribute("href");
    let sec = document.querySelector(id);
    sec.scrollIntoView({ "behavior":"smooth"})
  })
})

/**
 * End Main Functions
 * Begin Events
 * 
*/


//Hide Navbar While Not Scrolling
let pos2 = 0;
function isScrolling() {
  let pos1 = window.scrollY;
  //Show Navbar On Page Load Or We Are In The Top Of The Page
  if (pos1 <= 100) {
    document.querySelector("nav").style.display = "flex";
  ///
  }else if (pos2 === pos1) {
    document.querySelector("nav").style.display = "none";
  } else {
    document.querySelector("nav").style.display = "flex";
  }
    pos2 = pos1;
}

let scrolling = false;
window.addEventListener("scroll", (e) => {
  scrolling = true;
})
setInterval(() => {
  if (scrolling) {
      isScrolling();
      scrolling = false;
      
    } else {
    isScrolling();
    
    }
  },600)

//  Show Navbar When Mouse Cursor At The Top Of The Page
function getMousePosition(e) {
    if (e.clientY <= 55) {
      document.querySelector("nav").style.display = "flex";
    }
}
// window.addEventListener("mousemove", getMousePosition);
window.addEventListener("mouseover", getMousePosition)

  //Start To Up Button
let button = document.createElement("div")
button.style.cssText = "border: 25px solid transparent; border-bottom:25px solid rgb(204 204 17 / 57%);display:none; cursor:pointer; position: fixed; bottom :25px; right:15px"
document.body.appendChild(button);
// Show Button Is Scrolling Down Over 200 
window.addEventListener("scroll", () => {
  if (window.scrollY >= 200) {
    button.style.display = "block"
  } else {
    button.style.display = "none"
  }
});
//Scroll To Top  Onclick
button.addEventListener("click", () => {
  document.documentElement.style.scrollBehavior = "smooth"
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
})
//End To Up Button
//Start collapsing sections 
function collapsing(section) {
  let div = section.querySelector("div")
  let heading = section.querySelector("h2");
  let pgfs = section.querySelectorAll("p");
  let colsBtn = document.createElement("span")
  colsBtn.style.cssText = " margin: 25px; margin-bottom:-5;display:inline-block ;border: 15px solid transparent; border-top:15px solid white; cursor:pointer; float:inline-end"
  heading.appendChild(colsBtn);
  colsBtn.addEventListener("click", () => {
    pgfs.forEach((p) => {
      p.classList.toggle("collapsed");
//make section idle if collapsed
      function idle() {
        section.style.cssText = "min-height: max-content"
        if (p.classList.contains("collapsed")) {
          p.style.display = "none";
          section.classList.remove("your-active-class");
          div.classList.remove(".landing__container")
        } else {
          p.style.display= "block"
          section.classList.add("your-active-class");
          div.classList.add(".landing__container")
        }
      }
      idle();
// make section idle if is collapsed while scrolling
      window.addEventListener("scroll", idle);
    })
  })
}
sections.forEach(collapsing);
window.addEventListener("scroll", )
//End collapsing sections 
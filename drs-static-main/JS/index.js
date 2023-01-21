
const sideNav = document.getElementById("Sidenav");
const navItems =  document.querySelectorAll(".item");
const collapseLogo = document.querySelector(".collapse-logo");
const expandLogo = document.querySelector(".expand-logo");
const docImageDiv = document.querySelector(".doc-profile ");
const docProfile = docImageDiv.firstElementChild;
const mainMenu = navItems[0];
const navItemActive = document.querySelectorAll(".nav-item-active");


mainMenu.style.display = "block";


navItemActive.forEach(function(parent_item){
    
    parent_item.addEventListener("click", function(){
        
        navItemActive.forEach(function(parent_item){
            parent_item.classList.remove("active");   
        })

        parent_item.classList.add("active");
    })
})

function collapseSideNav() { 

    if(mainMenu.style.display == "block"){

        for(var i=0; i<navItems.length; i++){

            navItems[i].style.display = "none";  
        }
        sideNav.style.width = "80px";
        docImageDiv.setAttribute("style" , "width:2em; height:2em");
        docProfile.setAttribute("style" , "width:2em; height:2em");
        collapseLogo.style.display = "block";
        expandLogo.style.display = "none";

    }
    else{
        
        for(var i=0; i<navItems.length; i++){

            navItems[i].style.display = "block";
        }
        sideNav.style.width = "17.25em";
        docImageDiv.setAttribute("style" , "width:5.125em; height:5.125em");
        docProfile.setAttribute("style" , "width:5.125em; height:5.125em");
        collapseLogo.style.display = "none";
        expandLogo.style.display = "block";
    }  

}
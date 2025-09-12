//set variable to store carouselIndex to keep track the index outside function
var carouselIndex = 0;
//starts the function when web page loads
carousel();

function carousel() {
    //get all element with class name carousel-slide and dot
    let x = document.getElementsByClassName("carousel-slide");
    let dots = document.getElementsByClassName("dot");

      // If there are no slides, stop here (avoid JS error)
    if (x.length === 0) {
        console.warn("⚠️ No carousel slides found, skipping carousel()");
        return;
    }

    //loop through the carousel-slide length 
    for (let i = 0; i < x.length; i++) {
        // for each element in carousel-slide we set the display none
        x[i].style.display = "none";
    }
    //increment the carouselIndex variable
    carouselIndex++
    //if carouselIndex bigger than x.length then reset the carouselIndex to 1
    if (carouselIndex > x.length) {
        carouselIndex = 1
    }
    //loop through the dot length
    for (let i = 0; i < dots.length; i++) {
        //for each element in dots we set the classname to empty string ("")
        dots[i].className = dots[i].className.replace(" active", "");
    }
    // so after each increment of carouselIndex we set the value to this
    // line, which x[carouselIndex-1 because the index start at 0]
    // and change the x variable style.display to block 
    x[carouselIndex-1].style.display = "block";
    //add active to dots[carouselIndex variable value]
    dots[carouselIndex-1].className += " active";
    setTimeout(carousel, 2500); //change image every 2 second
}
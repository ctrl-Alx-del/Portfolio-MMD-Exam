var curImg = 1;
var newImg = 0;

curImg = 1; //the current image number
newImg = 0; //the upcoming images number

//hides all other images
document.querySelector("#image2").classList.add("gem");
document.querySelector("#image3").classList.add("gem");
document.querySelector("#image4").classList.add("gem");
document.querySelector("#image5").classList.add("gem");
document.querySelector("#image6").classList.add("gem");


document.querySelector("#next_button").addEventListener("click", nextImage);
document.querySelector("#prev_button").addEventListener("click", prevImage);

function nextImage() {
    //remove eventlisteners
    document.querySelector("#next_button").removeEventListener("click", nextImage);
    //if conditions that make sure the curimg value and newimg value stays in the range 1-6.
    if (curImg < 6) {
        console.log("if current is less than 6, new is current + 1");
        //gives newimg a value that is 1 more than current
        newImg = curImg + 1;
    }

    if (curImg == 6) {
        console.log("if current is 6, new is 1");

        newImg = 1;
    }
    if (curImg > 6) {
        console.log("if current is more than 6, current is 1");

        curImg = 1;
    }
    if (curImg == 0) {
        console.log("if current is 0, current is 6");

        curImg = 6;
    }

    //prints value of current and new img to console
    console.log("next image" + " image before was: " + curImg + " new image is: " + newImg);

    document.querySelector("#image" + newImg).classList.remove("gem"); //unhides the new image
    document.querySelector("#image" + curImg).classList.add("gem"); //hides current image

    document.querySelector("#dot" + curImg).classList.remove("activeDot"); //
    document.querySelector("#dot" + newImg).classList.add("activeDot"); //

    curImg++;
    newImg++;

    document.querySelector("#next_button").addEventListener("click", nextImage);
}


function prevImage() {
    //remove eventlistener
    document.querySelector("#prev_button").removeEventListener("click", prevImage);
    //if conditions that make sure the curimg value and newimg value stays correctly in the range 1-4.
    if (curImg > 1) {
        console.log("if current is more than 1, new is current - 1");
        //sets new img value to 1 less than current image
        newImg = curImg - 1;

    }

    if (curImg == 1) {
        console.log("if current is 1, new is 3");

        newImg = 6;
    }

    if (curImg == 0) {
        console.log("if current is 0, current is 3");

        curImg = 6;
    }
    if (curImg > 6) {
        console.log("if curent is more than 3, current is 1");

        curImg = 1;
    }

    //prints value of current and new img to console
    console.log("prev image function" + " image before was: " + curImg + " new image is: " + newImg);

    document.querySelector("#image" + newImg).classList.remove("gem"); //unhides the new image
    document.querySelector("#image" + curImg).classList.add("gem"); //hides current image

    document.querySelector("#dot" + curImg).classList.remove("activeDot"); //removes active dot class from previos
    document.querySelector("#dot" + newImg).classList.add("activeDot"); //adds active doc class to new img

    newImg--;

    curImg--;

    //adds  eventlistener again
    document.querySelector("#prev_button").addEventListener("click", prevImage);
}

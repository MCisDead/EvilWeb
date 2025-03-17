
// const score = document.getElementById("score");
let canvas;
let context;
let height = window.innerHeight;
let width = height * 1.4;

let canvasOffsetX;
let canvasOffsetY;

// bread
let bread = new Image();
bread.width = 250;
bread.height = 250;
let breadCookTime;

// toaster
let toaster = new Image();
toaster.width = 450;
toaster.height = 450;
let isBreadInToaster;
let isBreadCooking;
let isBreadBurnt;

// fire
let fire = new Image();

// plate
let plate = new Image;
plate.width = 450;
plate.height = 450;
let plateX;
let plateY;
let isBreadInPlate;

// mouse
let isCarryingBread;
let mouseOffsetX;
let mouseOffsetY;

// kitchen
let kitchen = new Image();

window.onload = function (){
    // window.requestAnimationFrame(gameLoop);
    init();
    setInterval(gameLoop, 60) // ~16.67 FPS
} // window.onload

function init() {
    canvas = document.getElementById('canvas');

    canvasOffsetY = 110;
    canvasOffsetX = 50;

    canvas.width = width;
    canvas.height = height;
    console.log(width + " " + height);

    context = canvas.getContext('2d');

    // text
    context.font = "48px serif";

    bread.src = "images/bread1.png";
    breadX = 100;
    breadY = 100;
    breadCookTime = 5;

    toaster.src = "images/toasterup.png";
    toasterX = 550;
    toasterY = 300;
    isBreadInToaster = false;
    isBreadCooking = false;
    isBreadBurnt = false;

    plate.src = "images/plate.webp";
    plateX = 30;
    plateY = 350;
    isBreadInPlate = false;

    fire.src = "images/fire.webp";

    isCarryingBread = false; 

    breadRating = 1;

    kitchen.src = "images/kitchen.png"
    kitchen.width = width + 200;
    kitchen.height = height;
    
} // init

function gameLoop() {
    // score.innerText++;
    // let randomColor = Math.random() > 0.5? '#ff8080' : '#0099b0';
    // context.fillStyle = randomColor;
    // context.fillRect(100, 50, 200, 175);  
    context.drawImage(kitchen, 0, 0, kitchen.width, kitchen.height);

    context.drawImage(plate, plateX, plateY, plate.width, plate.height);

    context.drawImage(bread, breadX, breadY, bread.width, bread.height);

    context.drawImage(toaster, toasterX, toasterY, toaster.width, toaster.height);

    if (isBreadCooking && !isBreadBurnt) {
        if (breadCookTime < 79) {
            breadCookTime++;
            console.log("cooktime: " + breadCookTime);
            
            breadRating = (parseInt(breadCookTime / 20) + 1);
            bread.src = "images/bread" + breadRating + ".png";
        } else {
            bread.src = "images/bread5.png";
            isBreadBurnt = true;
        } // else
    } else if (isBreadBurnt) {
        context.drawImage(fire, toasterX, toasterY - 50, 400, 456);
    } // else if
    
    if (isBreadInPlate) {
        if (breadRating == 3) {
            context.fillStyle = "#00FF00";
            context.fillText("NOT EVIL", plateX + 120, plateY - 30);
        } else {
            context.fillStyle = "#FF0000";
            context.fillText("EVIL", plateX + 150, plateY - 20);
        }
    }

} // gameLoop

// grab bread if mouse is colliding with bread
function grabBread() {

    // detect collision of mouse and image
    if (checkBreadMouseCollision()) {
        mouseOffsetX = breadX - mouseX;
        mouseOffsetY = breadY - mouseY;
        isCarryingBread = true;
    } // if
} // grabBread

function checkBreadMouseCollision() {
    return mouseX > breadX && mouseX < breadX + bread.width && mouseY > breadY && mouseY < breadY + bread.height;
} // checkMouseBreadCollision

function checkBreadToasterCollision() {
    return breadX + bread.width > toasterX + 160 && breadX < toasterX + toaster.width - 160 && breadY + bread.height > toasterY + 90 && toasterY + toaster.height - 80 > breadY;
} // checkMouseBreadCollision

function checkMouseToasterCollision() {
    return mouseX > toasterX && mouseX < toasterX + toaster.width && mouseY > toasterY + 120 && mouseY < toasterY + toaster.height;
} // checkMouseBreadCollision

function checkBreadPlateCollision() {
    return breadX + bread.width > plateX + 180 && breadX < plateX + plate.width - 180 && breadY + bread.height > plateY + 170 && plateY + plate.height - 80 > breadY;
} // checkBreadPlateCollision

function resetGame() {
    bread.src = "images/bread1.png";
    breadX = 100;
    breadY = 100;
    breadCookTime = 5;

    toaster.src = "images/toasterup.png";
    toasterX = 550;
    toasterY = 300;
    isBreadInToaster = false;
    isBreadCooking = false;
    isBreadBurnt = false;

    isBreadInPlate = false;

    isCarryingBread = false; 

    breadRating = 1;
}

// mouse down
document.addEventListener("mousedown", (event) => {
    mouseX = event.clientX - canvasOffsetX;
    mouseY = event.clientY - canvasOffsetY;

    console.log(mouseX + " " + mouseY);

    if (isBreadInToaster && checkMouseToasterCollision()) {
        if (isBreadCooking) {
            isBreadCooking = false;
            breadY -= 100;
            toaster.src = "images/toasterup.png";
        } else {
            isBreadCooking = true;
            breadY += 100;
            toaster.src = "images/toasterdown.png";
        } // else
    } else if (!isBreadCooking){    
        grabBread();
    } // else if
});

// mouse up
document.addEventListener("mouseup", (event) => {
    isCarryingBread = false;
});

document.addEventListener("mousemove", (event) => {
    if (isCarryingBread) {

        // handle X movement
        let newX = event.clientX - canvasOffsetX + mouseOffsetX;
        if (newX < 0) {
            newX = 0;
        } else if (newX + bread.width > width) {
            newX = width - bread.width;
        } // if

        // handle Y movememt
        let newY = event.clientY - canvasOffsetY + mouseOffsetY;
        if (newY < 0) {
            newY = 0;
        } else if (newY + bread.height > height) {
            newY = height - bread.height;
        } // if

        breadX = newX;
        breadY = newY;

        if (checkBreadToasterCollision()) {
            breadX = toasterX + 80;
            breadY = toasterY - 80;
            isBreadInToaster = true;
            isBreadInPlate = false;
        } else if (checkBreadPlateCollision()) {
            breadX = plateX + 100;
            breadY = plateY;
            isBreadInToaster = false;
            isBreadInPlate = true;
        } else {
            isBreadInToaster = false;
            isBreadInPlate = false;
        } // else
        
    } // if
})
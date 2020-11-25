/**
 *  Multiple Lines Comment
 */
const initGame = () => {
    console.log("Init Game"); // Single Line Comment    
    const images = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png"];
    const play = document.querySelector('#play');
    const init = document.querySelector('.init'); // we need to hide this element
    const game = document.querySelector('.game'); // we need to show this element
    const cards = document.querySelectorAll('.card');
    const points = document.querySelector('.score-points');


    let usedImages = []; // this is an array of used images 
    let newImages = []; // this is an array of new images (a, b)
    let totalImages = 0;
    let selections = [];

    play.addEventListener("click", () => {
        init.style.display = "none";
        game.style.display = "block";
    });

    const randNumber = (arr) => { // we need generate a random number to show the image in different positions
        return Math.floor(Math.random() * arr.length);
    }

    const generateCards = (images) => {
        let r = randNumber(images);
        if (usedImages.indexOf(r) === -1) {
            usedImages.push(r);
            newImages.push(images[r]);
            totalImages++;
        }

        if (totalImages < images.length) {
            return generateCards(images);
        }
    };

    for (let i = 0; i < 2; i++) {
        usedImages = [];
        totalImages = 0;
        generateCards(images);
    }

    const assignCards = () => {
        newImages.forEach((image, index) => {
            let img = document.querySelector(`#m${index}`);
            img.src = "./img/" + image;
        });
    }
    assignCards();

    cards.forEach((card) => {
        card.addEventListener("click", selectCard);
    });

    const compareSeleccionts = () => {
        const [img1, img2] = selections; // destructuring array selections
        if (img1.src === img2.src) {
            img1.parentNode.removeEventListener("click", selectCard);
            img2.parentNode.removeEventListener("click", selectCard);
            selections = [];
        } else {
            setTimeout(() => {
                img1.parentNode.classList.remove('active');
                img2.parentNode.classList.remove('active');
                img1.parentNode.addEventListener("click", selectCard);
                img2.parentNode.addEventListener("click", selectCard);
                selections = [];
            }, 500);
        }
    }

    function selectCard(e) {
        const card = e.target;
        if (
            selections.length < 2 &&
            selections.indexOf(card.childNodes[1]) === -1
        ) {
            card.classList.add('active');
            selections.push(card.childNodes[1]);
        }
        console.log("A card has been click and this current selection", selections);

        if (selections.length === 2) {
            compareSeleccionts();
        }

    }
}

initGame();
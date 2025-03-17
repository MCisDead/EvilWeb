
/* WARNING: EVERYTHING BELOW IS CLARISSE'S COOKED OLD CODE */

let gridElem;
let contentElem;
let sideElem;
let spread;
let cardDrawn; // number of card that user flipped (eg 0 for fool, 1 for magician, etc)
let flippedString; // string containing IDs of flipped cards
let takenString; // string containing all cards gone from the deck (because they were dealt)
let cardPairs = new Array(26); // cards (25 spaces on grid) and assigned value (tarot card)

let openBtn;
let closeBtn;
let modal;

window.onload = function() {
    gridElem = document.getElementById("grid");
    contentElem = document.getElementById("content");
    sideElem = document.getElementById("side");
    flippedString = "";
    takenString = "";

    openBtn = document.getElementById("openModal");
    closeBtn = document.getElementById("closeModal");

   
    
}

document.addEventListener("click", function(event) {
    // 25% chance to trigger a modal pop-up
    if (Math.floor(Math.random() * 4) === 2) {
        let randomIndex = Math.floor(Math.random() * 9); // Choose a random modal (0-8)
        let modal = document.getElementById(`modal${randomIndex + 1}`); // Get modal element

        if (modal) {
            openModal(modal); // Open modal if it exists
        } else {
            console.warn(`Modal modal${randomIndex + 1} not found.`);
        }
    }
});





function openModal(modal){
    modal.classList.add("open");
    let yo = document.getElementsByClassName("yo");
    yo.innerHTML = "<img src='cards/single" + Math.floor(Math.random() * (3 - 0) + 0) + ".jpg' alt='sexy single in your area' id='sexySingle'>";
    
}

function closeModal(modal){
    modal.classList.remove("open");
}


function openPopup() {
    document.getElementById("popup").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}


// clears the grid and fills the content div based on spread choice
// 1 = aphrodite's temple
// 2 = celtic cross
// 3 = three card spread
// 4 = classic ten card draw
// 5 = one card
// 6 = yearly summary (prediction for each month)
// 7 = days of the week spread
function startTarot(input){

    // set the global variable to input
    spread = input;

    // clear the grid
    gridElem.style.display = "none";

    // make the content visible
    contentElem.style.display = "grid";

    // make the side visible
    sideElem.style.display = "block";
    
    // set the spread
    switch(spread){
        case 1:
            document.getElementById("c2").classList.add("on");
            document.getElementById("c3").classList.add("on");
            document.getElementById("c4").classList.add("on");
            document.getElementById("c7").classList.add("on");
            document.getElementById("c8").classList.add("on");
            document.getElementById("c9").classList.add("on");
            document.getElementById("c12").classList.add("on");
            document.getElementById("c14").classList.add("on");
            break;
        case 2:
            document.getElementById("c5").classList.add("on");
            document.getElementById("c8").classList.add("on");
            document.getElementById("c10").classList.add("on");
            document.getElementById("c11").classList.add("on");
            document.getElementById("c12").classList.add("on");
            document.getElementById("c13").classList.add("on");
            document.getElementById("c14").classList.add("on");
            document.getElementById("c18").classList.add("on");
            document.getElementById("c20").classList.add("on");
            document.getElementById("c25").classList.add("on");
            break;
        case 3:
            document.getElementById("c7").classList.add("on");
            document.getElementById("c8").classList.add("on");
            document.getElementById("c9").classList.add("on");
            break;
        case 4:
            document.getElementById("c1").classList.add("on");
            document.getElementById("c2").classList.add("on");
            document.getElementById("c3").classList.add("on");
            document.getElementById("c4").classList.add("on");
            document.getElementById("c5").classList.add("on");
            document.getElementById("c6").classList.add("on");
            document.getElementById("c7").classList.add("on");
            document.getElementById("c8").classList.add("on");
            document.getElementById("c9").classList.add("on");
            document.getElementById("c10").classList.add("on");
            break;
        case 5:
            document.getElementById("c8").classList.add("on");
            break;
        case 6:
            document.getElementById("c2").classList.add("on");
            document.getElementById("c3").classList.add("on");
            document.getElementById("c4").classList.add("on");
            document.getElementById("c7").classList.add("on");
            document.getElementById("c8").classList.add("on");
            document.getElementById("c9").classList.add("on");
            document.getElementById("c12").classList.add("on");
            document.getElementById("c13").classList.add("on");
            document.getElementById("c14").classList.add("on");
            document.getElementById("c17").classList.add("on");
            document.getElementById("c18").classList.add("on");
            document.getElementById("c19").classList.add("on");
            break;
        case 7:
            document.getElementById("c1").classList.add("on");
            document.getElementById("c2").classList.add("on");
            document.getElementById("c3").classList.add("on");
            document.getElementById("c4").classList.add("on");
            document.getElementById("c5").classList.add("on");
            document.getElementById("c9").classList.add("on");
            document.getElementById("c10").classList.add("on");
            break;

    } // spread switch

} // startTarot


// when user clicks on card, if it is visible, it flips and shows contents
function flipCard(cardID){
    

    // figure out if the card is showing
    if(document.getElementById(cardID).className == "card on"){

        // if the card hasn't been flipped, flip it
        if(!flippedString.includes(cardID)){ 

            // give card a value, making it so that there are no repeats
            while(true){
                // generate card value
                cardDrawn = Math.floor(Math.random() * (13 - 0) + 0);

                // if card does not have value in takenString, break from loop
                if(!takenString.includes("a" + cardDrawn + "z")){
                    break;
                }

            } // while

            // add card to takenString so other cards won't be repeats
            takenString += "a" + cardDrawn + "z"; // "a" and "z" are seperators between numbers

            // card needs to show image
            document.getElementById(cardID).style.backgroundImage = "url('cards/" + cardDrawn + ".png')";
            
            // tell game that card has been flipped
            flippedString += cardID;

            // store value of card with flipped card
            cardPairs[cardID.slice(1)] = cardDrawn;

        }

        /*
        // figure out what the card is in the spread
        if(spread == 1){
            switch(cardID){
                case "c2":sideElem.innerHTML = "Your thoughts and mind<br>";break;
                case "c3":sideElem.innerHTML = "The Future of the Relationship<br>";break;
                case "c4":sideElem.innerHTML = "Your partner's thoughts and mind<br>";break;
                case "c7":sideElem.innerHTML = "Your feelings and heart<br>";break;
                case "c8":sideElem.innerHTML = "Advice for the Relationship<br>";break;
                case "c9":sideElem.innerHTML = "Your partner's feelings and heart<br>";break;
                case "c12":sideElem.innerHTML = "Your attraction, desires, and intentions<br>";break;
                case "c14":sideElem.innerHTML = "Your partner's attraction, desires, and intentions<br>";break;
            } // switch
        } else if(spread == 2){
            
        } 
        else{

        }*/

        sideElem.innerHTML = "";
        // figure out which card value it is with cardPairs array
        switch(cardPairs[cardID.slice(1)]){
            case 0:
                console.log("fool");
                sideElem.innerHTML += "Jschlatt's arrival in your reading signals a seismic shift, a sudden '99' moment that shatters expectations. Expect the unexpected, a chaotic eruption that echoes the wild days of SMPLive and the dramatic twists of Dream SMP. This card represents a force of unfiltered, often irreverent, truth, like a rogue monkey ball bouncing through your carefully constructed plans. Jschlatt's presence is a reminder that life is a chaotic 'Minecraft server,' full of unexpected turns and 'carson' moments. Embrace the chaos, but remember to maintain a 'business' level of control. Sometimes, a little bit of '1999' is exactly what you need to shake things up, or cause a great deal of destruction."
                break;
            case 1:
                console.log("magician");
                sideElem.innerHTML += "Keanu Reeves in your reading signifies a period of quiet strength, grounded wisdom, and unexpected grace. This card represents resilience in the face of adversity, a compassionate spirit, and the ability to find inner peace amidst chaos. Keanu Reeves' presence reminds you that true strength lies in compassionate, alpha resilience. Embrace your inner strength, cultivate kindness, and navigate life's challenges with grace, while remaining locked in on your path. Remember, even the most formidable heroes carry a gentle heart, and a focused mind.";
                break;
            case 2:
                console.log("high priestess");
                sideElem.innerHTML += "The Sana Surge hits your reading like a double shot of espresso mixed with pure, unadulterated chaos. Prepare for a hyper-focused coding session, a deep dive into obscure fandom lore, and a relentless barrage of witty banter. This card embodies the raw, unbridled energy of a caffeine-addicted, sleep-deprived coding genius, who also happens to be a master of the lesbian denial arts and a polyamorous Mormon wife collector.The Sana Surge reminds you that life is meant to be lived with passion, humor, and a healthy dose of caffeine. Embrace the chaos, celebrate your quirks, and never underestimate the power of a coding genius with a serious wife-collecting habit.";
                break;
            case 3:
                console.log("empress");
                sideElem.innerHTML += "Fred represents unexpected heroism, courage in the face of adversity, and the power of love in all its forms, specifically homosexual love. This card signifies a time of liberation, where courage and compassion triumph over prejudice and fear, and where a leader's true self is celebrated. Embrace your true self, draw strength from all aspects of your life, and remember that love, in all its forms, conquers all. Importantly, this card highlights that a happy and fulfilling life is absolutely possible, even with the experience of divorced parents. Your path is unique, and you are capable of extraordinary things.";
                break;
            case 4:
                console.log("emperor");
                sideElem.innerHTML += "This card speaks to the complex interplay of aging, memory, and identity, particularly for an older gay man navigating a world that may not always fully understand or accept him. The Disoriented Ascent reminds us that aging is a multifaceted journey, and that navigating the complexities of life and identity requires ongoing resilience and self-acceptance. This card encourages us to approach these moments with compassion, understanding, and a willingness to offer support, while honoring the unique experiences and challenges faced by LGBTQ+ elders.";
                break;
            case 5:
                console.log("emperor");
                sideElem.innerHTML += "Behold! The Gigachad has manifested in your reading. This is not merely a card; it's a cosmic declaration of unadulterated sigma energy. Prepare for a surge of absolute rizz and the raw, unfiltered essence of chaditude. This card transcends mere confidence; it's the embodiment of unironic basedness. The Gigachad reminds you that within you lies the potential for peak performance. But remember, even Gigachads must wield their power responsibly. Don't let the drip corrupt your soul. Stay based, but stay real.";
                break;
            case 6:
                sideElem.innerHTML += "The Luke Fan Paradox represents the delightful contradiction of a coding genius who defies easy categorization. It signifies a blend of intellectual prowess, playful chaos, and a unique approach to relationships. This card embodies the energy of someone who can simultaneously dominate a chess game, code a complex algorithm, and 'rizz up' the entire student body, all while insisting he's not gay.";
                break;
            case 7:
                sideElem.innerHTML += "Clarisse embodies a vibrant paradox: a fusion of unbridled joy, intense focus, and undeniable allure. This card signifies a person who dances between worlds, seamlessly blending academic rigor with a contagious enthusiasm for life. She's a whirlwind of creativity, coding prowess, and humanities insights, all wrapped in an aura of irresistible charm. Despite the 'try-hard' label, she thrives on genuine connections and radiates an infectious happiness";
                break;
            case 8:
                sideElem.innerHTML += "Mamon embodies the boundless energy of the online world, a fusion of artistic brilliance, coding mastery, and unapologetic fandom. This card signifies a person who thrives in the digital realm, seamlessly blending artistic expression with technical prowess. She's a whirlwind of creativity, coding complex Java games, crafting stunning digital art, and diving deep into the worlds of yuri and yaoi. Her energy is infectious, her knowledge vast, and her spirit uninhibited. She  reminds us that the online world is a vibrant and creative space, full of passionate individuals and boundless possibilities. Embrace your fandoms, celebrate your creativity, and never be afraid to express your true self, even if it means asking your math teacher about yaoi.";
                break;
            case 9:
                sideElem.innerHTML += "Trump represents a moment of unexpected playfulness, a blurring of lines between public image and private persona, perhaps even a glimpse into the 'meow meow boy' within. It signifies a potential for both charm and awkwardness, a disruption of expected norms within 'America,' and a glimpse behind the carefully constructed facade of power. He reminds us that even those in positions of power, even in 'America,' are human, with their own quirks and vulnerabilities. It urges us to find balance between seriousness and playfulness, and to embrace the unexpected moments that life brings, and to consider the effect that the inner 'meow meow boy,' and all of the 'bromances' and displays of 'sexiness' has on national perception.";
                break;
            case 10:
                sideElem.innerHTML += "The Gifted card features a swirling vortex of pages, ink, and glowing energy as literary figures step from the shadows. A balance of chaos and order hangs in the air—where words are both weapons and salvation. The characters, cloaked in mystery and bound by fate, stand at the crossroads of morality, justice, and survival. Their abilities, woven from the fabric of literature itself, symbolize the power of creativity, intellect, and the weight of destiny. A figure with piercing eyes stands at the center, torn between light and dark, holding an open book that radiates unseen power. Behind them, opposing forces—one of ruthless authority, the other of rebellious freedom—pull at the threads of their fate. The card hums with the energy of conflict, alliances, and the unrelenting force of a story yet to be written.";
                break;
            case 11:
                sideElem.innerHTML += "The Puppy signifies a moment of gentle but firm redirection. It represents a need to halt current actions, reassess your path, and acknowledge a potential boundary. This card embodies the innocent yet resolute energy of a small puppy saying 'stop,' reminding you that even the gentlest of forces can demand a pause";
                break;
            case 12:
                sideElem.innerHTML += "The Solitary Star card depicts a delicate yet androgynous figure bathed in soft, golden light. Their hair falls in wisps around their face, their eyes sharp yet distant, always watching but never fully present. Books, unfinished puzzles, and scattered thoughts hover in the air around them, symbols of a mind that races beyond the limits of ordinary understanding.  \n At their side, a warm presence—gentle yet unwavering. A maternal figure, both protector and guide, stands behind them like a quiet guardian star. She is the only one who understands the unspoken, the only one who speaks the same language of silence and thought. Despite their brilliance, the world remains a puzzle they have no interest in solving. Social cues slip past them like water through fingers, yet their mind dances through intricate theories and untapped potential. A single step beyond their comfort zone feels like stepping into a storm—so they retreat, content in the orbit of their one true connection.";
                break;
        } // switch

        




    } // if card is showing

} // flipCard

// detect if a number is evil (even # of ones in binary form)
function originalisNumEvil() {
    let input = document.getElementById("evil-num-input");
    let result = document.getElementById("isNumEvilResult");

    // check if number
    if (isNaN(parseInt(input.value))) {
        result.innerHTML = "wtf?";
        
        result.style = "background-color:gray";
        return; 
    } // if
    
    num = parseFloat(input.value);

    // disallow negatives
    if (num < 0) {
        result.innerHTML = "not evil";
        
        result.style = "background-color:green";
        return; 
    } // if
    
    // disallow decimals
    if (num % 1 != 0) {
        result.innerHTML = "wtf?";
        
        result.style = "background-color:gray";
        return; 
    } // if

    // compute binary and count number of ones
    // if even number of ones, number is evil
    let powerTwo = 2
    let numOfOnes = 0;

    if (num == 13 || num == 666 || num == 4) {
        result.style = "background-color:red";
        result.innerHTML = "evil";
        return;
    }
    while (num > 0) {

        if (num % powerTwo != 0) {
            numOfOnes++;
            num -= powerTwo / 2;
        } // if

        powerTwo *= 2;

    } // while

    if (numOfOnes % 2 == 0) {
        result.style = "background-color:red";
        result.innerHTML = "evil";
    } else {
        result.style = "background-color:green";
        result.innerHTML = "not evil";    
    } // else

} // originalisNumEvil


function isNumEvil() {
    let input = document.getElementById("evil-num-input");
    let result = document.getElementById("isNumEvilResult");
    let num = parseFloat(input.value);

    // Remove all result classes before applying new one
    result.classList.remove("evil-num-wtfresult", "evil-num-notevilresult", "evil-num-evilresult");

    // Check if input is a number
    if (isNaN(num)) {
        result.innerHTML = "wtf?";
        result.classList.add("evil-num-wtfresult");
        result.style="display:block";
        return;
    }

    // Disallow negatives
    if (num < 0) {
        result.innerHTML = "not evil";
        result.classList.add("evil-num-notevilresult");
        result.style="display:block";
        return;
    }

    // Disallow decimals
    if (num % 1 !== 0) {
        result.innerHTML = "wtf?";
        result.classList.add("evil-num-wtfresult");
        result.style="display:block";
        return;
    }

    // Special evil numbers
    if ([13, 666, 4].includes(num)) {
        result.innerHTML = "evil";
        result.classList.add("evil-num-evilresult");
        result.style="display:block";
        return;
    }

    // Compute binary and count number of ones
    let binary = num.toString(2);
    let numOfOnes = [...binary].filter(bit => bit === '1').length;

    if (numOfOnes % 2 === 0) {
        result.innerHTML = "evil";
        result.classList.add("evil-num-evilresult");
        result.style="display:block";
    } else {
        result.innerHTML = "not evil";
        result.classList.add("evil-num-notevilresult");
        result.style="display:block";
    }
}/*isnumevil*/



// Global model variable
let globalModel;

// Fixed loadModel with error handling
async function loadModel() {
    try {
        const model = await tf.loadLayersModel('output.json');
        console.log('Model loaded');
        return model;
    } catch (error) {
        console.error('Error loading model:', error);
        throw error;
    }
}

async function GetChatGPT(userMessage) {
    
    const typingIndicator = addTypingIndicator();
    
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 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" 
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [
                    { 
                        role: "system", 
                        content: "You are an evil being who gives snarky, sarcastic, and stupid responses while not really being helpful." 
                    },
                    { 
                        role: "user", 
                        content: userMessage 
                    }
                ],
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        
        typingIndicator.remove();
        
        addMessage(aiResponse, false);
    } catch (error) {
        console.error("Error:", error);
        typingIndicator.remove();
        addMessage("Sorry, I encountered an error. Please try again.", false);
    }
}

function addTypingIndicator() {
    const chatContainer = document.getElementById('chatBotOutput');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai-message typing-indicator';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    chatContainer.appendChild(typingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    return typingDiv;
}

function addMessage(text, isUser) {
    const chatContainer = document.getElementById('chatBotOutput');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <img src="${isUser ? 'things/userIcon.jpg' : 'things/evilBot.jpg'}" 
            alt="${isUser ? 'User' : 'Evil Bot'}">
        </div>
        <div class="message-content">${text}</div>
    `;
    chatContainer.appendChild(messageDiv);   
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Initialize model on page load
(async () => {
    try {
        globalModel = await loadModel();
    } catch (error) {
        console.error('Failed to initialize model:', error);
    }
})();

// Fixed event listener
document.getElementById('upload').addEventListener('change', function(event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    
    reader.onload = function() {
        let img = document.getElementById('inputImage');
        img.src = reader.result;
        img.onload = async function() {
            try {
                let prediction = await classifyImage(img, globalModel);
                document.getElementById('result').innerText = `Prediction: ${prediction}`;
            } catch (error) {
                console.error('Error classifying image:', error);
            }
        };
    };
    
    reader.readAsDataURL(file);
});


async function loadModel() {
    const model = await tf.loadLayersModel('output.json'); // Adjust path if needed
    console.log('Model loaded');
    return model;
}

async function classifyImage(imageElement, model) {
    let tensor = tf.browser.fromPixels(imageElement)
        .resizeNearestNeighbor([224, 224]) // Resize to match model input
        .toFloat()
        .expandDims();

    let predictions = await model.predict(tensor).data();
    console.log(predictions);
}

// Usage example
(async () => {
    let model = await loadModel();
    let image = document.getElementById('inputImage'); // Image element
    classifyImage(image, model);
})();

document.getElementById('upload').addEventListener('change', function(event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    
    reader.onload = function() {
        let img = document.getElementById('inputImage');
        img.src = reader.result;
        img.onload = async function() {
            let prediction = await classifyImage(img, model);
            document.getElementById('result').innerText = `Prediction: ${prediction}`;
            alert(prediction);
        };
    };
    
    reader.readAsDataURL(file);
});


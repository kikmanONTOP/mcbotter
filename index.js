// https://github.com/kikmanONTOP/mcbotter
// read the readme file!
const mineflayer = require('mineflayer');

function generateRandomName() {
    const adjectives = ['Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple', 'Pink', 'Black', 'White', 'Silver', 'Gold', 'Diamond', 'Emerald'];
    const nouns = ['Wolf', 'Cat', 'Tiger', 'Lion', 'Bear', 'Elephant', 'Giraffe', 'Rhino', 'Penguin', 'Kangaroo', 'Dolphin', 'Shark', 'Octopus', 'Dragon'];

    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

    return `${randomAdjective}${randomNoun}${Math.floor(Math.random() * 1000)}`;
}

function generateRandomPassword(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
}

function createPlayer(bot) {
    let isSendingMessages = false;
    let isJumping = false;

    bot.once('spawn', () => {
        console.log(`${bot.username} joined sucefully`);
        const password = generateRandomPassword(10);
        bot.chat(`/register ${password}`); // if server want 2* password put another ${password}
    });

    bot.on('playerJoined', (player) => {
        console.log(`${player.username} joined to ${bot.username}.`);
    });


    bot.on('chat', (username, message) => {
        if (message === 'zprava') {
            isSendingMessages = true;
            sendMessages();
        } else if (message === 'staci') {
            isSendingMessages = false;
        } else if (message === 'skakej') {
            isJumping = true;
            bot.setControlState('jump', true);
        } else if (message === 'neskakej') {
            isJumping = false;
            bot.setControlState('jump', false);
        }
    });

    function sendMessages() {
        let messageCount = 0;
        const messageInterval = setInterval(() => {
            if (isSendingMessages && messageCount < 500) {
                bot.chat(`LOOOL ${messageCount + 1} ${generateRandomWord()}`);
                messageCount++;
            } else {
                clearInterval(messageInterval);
            }
        }, 2000); // cooldown between messages you can edit, but be careful if server has anti spam (cooldown is 2s now)
    }

    function generateRandomWord() {
        const words = ['Wow', 'Amazing', 'Incredible', 'Fantastic', 'Awesome', 'Unbelievable', 'Super', 'Great'];
        return words[Math.floor(Math.random() * words.length)];
    }
}

const numBots = 1; // how many bots will join your server you can edit it
const botUsernames = new Set();
const cooldownBetweenBots = 5 * 1000; // cooldown is 5s between join you can edit it

for (let i = 0; i < numBots; i++) {
    setTimeout(() => {
        let botUsername = generateRandomName();
        while (botUsernames.has(botUsername)) {
            botUsername = generateRandomName();
        }
        botUsernames.add(botUsername);

        const bot = mineflayer.createBot({
            host: 'here ip', // replace it with ip adress of server
            port: here port, // replace it with port of server
            username: botUsername,
        });

        createPlayer(bot);
    }, i * cooldownBetweenBots);
}

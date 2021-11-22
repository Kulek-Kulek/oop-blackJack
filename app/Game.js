import { Deck } from './Deck.js';
import { Player } from './Player.js';
import { Table } from './Table.js';
import { UI } from './UI.js';
import { Message } from './Message.js';

class Game {
    constructor({ player, table, hitButton, standButton, playerPoints, dealerPoints, messageBox, messageText, section, playAgainButton }) {
        this.player = player;
        this.dealer = new Player('Croupier')
        this.table = table;
        this.deck = new Deck();
        this.deck.shuffle();
        this.hitButton = hitButton;
        this.standButton = standButton;
        this.playAgainButton = playAgainButton;
        this.playerPoints = playerPoints;
        this.dealerPoints = dealerPoints;
        this.messageBox = messageBox;
        this.messageText = messageText;
        this.section = section;
    }

    run() {
        this.hitButton.addEventListener('click', e => this.hitCrad());
        this.standButton.addEventListener('click', e => this.dealerPlays());
        this.playAgainButton.addEventListener('click', () => location.reload());
        this.dealCards();
    }

    hitCrad() {
        const card = this.deck.pickOneCard();
        this.player.hand.addCard(card);
        this.table.showPlayerCards(card);
        this.playerPoints.textContent = this.player.calculatePoints();
        if (this.player.points > 21) this.endGame();
    }

    dealerPlays() {
        while (this.dealer.points <= this.player.points &&
            this.dealer.points <= 21 &&
            this.player.points <= 21) {
            const card = this.deck.pickOneCard();
            this.dealer.hand.addCard(card);
            this.table.showDealerCards(card);
            this.dealerPoints.textContent = this.dealer.calculatePoints();
        }

        this.endGame();
    }

    dealCards() {
        for (let n = 0; n < 2; n++) {
            let card1 = this.deck.pickOneCard();
            this.player.hand.addCard(card1);
            this.table.showPlayerCards(card1);

            let card2 = this.deck.pickOneCard();
            this.dealer.hand.addCard(card2);
            this.table.showDealerCards(card2);
        }

        this.playerPoints.textContent = this.player.calculatePoints();
        this.dealerPoints.textContent = this.dealer.calculatePoints();
    }

    endGame() {
        this.hitButton.removeEventListener('click', e => this.hitButton());
        this.standButton.removeEventListener('click', e => this.dealerPlays());

        this.hitButton.disabled = true;
        this.standButton.disabled = true;
        this.hitButton.classList.add('pointer-hide');
        this.standButton.classList.add('pointer-hide');

        if (this.dealer.points < 21 && this.dealer.points === this.player.points) {
            this.messageText.setText('REMIS');
            this.messageBox.show();
            this.section.classList.add('dark');
            return;
        }

        if (this.player.points > 21) {
            this.messageText.setText('Wygrywa Krupier');
            this.messageBox.show();
            this.section.classList.add('dark');
            return;
        }

        if (this.dealer.points > 21) {
            this.messageText.setText('Gratulacje - wygrywasz!');
            this.messageBox.show();
            this.section.classList.add('dark');
            return
        }

        if (this.player.points < this.dealer.points) {
            this.messageText.setText('Wygrywa Krupier');
            this.messageBox.show();
            this.section.classList.add('dark');
            return
        }
    }
}

const player = new Player('Kris');
const ui = new UI;
const table = new Table(
    ui.getElement('#playersCards'),
    ui.getElement('#dealersCards')
);

const game = new Game({
    player,
    table,
    hitButton: ui.getElement('#hit'),
    standButton: ui.getElement('#stand'),
    playAgainButton: ui.getElement('#message__btn'),
    dealerPoints: ui.getElement('#dealerPoints'),
    playerPoints: ui.getElement('#playerPoints'),
    messageBox: new Message(ui.getElement('#message')),
    messageText: new Message(ui.getElement('#message__text')),
    section: ui.getElement('body')
});

game.run();
export class Table {
    constructor(playerCards, dealerCards) {
        this.playerCards = playerCards;
        this.dealerCards = dealerCards;
    }

    showPlayerCards(card) {
        this.playerCards.appendChild(card.render());
    }

    showDealerCards(card) {
        this.dealerCards.appendChild(card.render());
    }
}
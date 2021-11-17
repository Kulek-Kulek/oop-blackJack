import { Weights, Types, Card } from './Card.js';


export class Deck {
    cards = [];
    constructor() {
        // Types.forEach(type =>
        //     Weights.forEach(weight =>
        //         this.cards.push(new Card(weight, type)))
        // );

        for (let type of Types) {
            for (let weight of Weights) {
                this.cards.push(new Card(weight, type))
            }
        }
    }

    shuffle() {
        // for (let i = this.cards.length - 1; i > 0; i--) {
        //     const temporary = this.cards[i];
        //     const shuffledCardIndex = Math.floor(Math.random() * i);
        //     this.cards[i] = this.cards[shuffledCardIndex];
        //     this.cards[shuffledCardIndex] = temporary;
        // }

        for (let i in this.cards) {
            const temporary = this.cards[i];
            const shuffledCardIndex = Math.floor(Math.random() * i);
            this.cards[i] = this.cards[shuffledCardIndex];
            this.cards[shuffledCardIndex] = temporary;
        }
        return this.cards;
    }
}
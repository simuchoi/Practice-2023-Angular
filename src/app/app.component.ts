import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';

export interface Card {
  title: string;
  description: string;
  image: string;
  abv: string;
  price: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit, AfterViewInit{

  @ViewChild("prev") public prevButton!:ElementRef<HTMLAnchorElement>;

  public cards: Card[] = [
    {
      title: 'This.Is.Lager',
      description: 'Belgian Imperial Stout aged on toasted coconut and cacao. The Belgian yeast strain introduces',
      image: '/assets/pics/bottle5.png',
      abv: 'abv: 12.5',
      price: '$69.99'
    },
    {
      title: 'AB:05',
      description: 'Belgian Imperial Stout aged on toasted coconut and cacao. The Belgian yeast strain introduces a whole new dimension to the',
      image: '/assets/pics/bottle1.png',
      abv: 'abv: 13.5',
      price: '$79.99'
    },
    {
      title: 'Candy Kaiser',
      description: 'Coffee is a brewed drink prepared from roasted coffee beans, the seeds of berries from certain Coffea species.',
      image: '/assets/pics/bottle2.png',
      abv: 'abv: 14.5',
      price: '$89.99'
    },
    {
      title: 'Vagabond Pilsher',
      description: 'Coffee is a brewed drink prepared from roasted coffee beans, the seeds of berries from certain Coffea species.',
      image: '/assets/pics/bottle3.png',
      abv: 'abv: 15.5',
      price: '$99.99'
    },
    {
      title: 'Dog G',
      description: 'Coffee is a brewed drink prepared from roasted coffee beans, the seeds of berries from certain Coffea species.',
      image: '/assets/pics/bottle4.png',
      abv: 'abv: 16.5',
      price: '$109.99'
    },
  ];

  public filteredCards: Card[] = [];

  public inputText: string = '';
  
  public counter:number = 0;

  public ngOnInit(): void {
    this.filterCards();
  }

  public ngAfterViewInit(): void {

  }
  
  public filterCards (): void {
    if (this.counter === 0) {
      this.filteredCards = this.cards;
    } else {
      this.filteredCards = [...this.cards.slice(this.counter), ...this.cards.slice(0, this.counter)];
    }
  }

  public onNext (): void {
    if (this.counter + 1 <= this.cards.length-1) {
      this.counter++;
    } else {
      this.counter = 0;
    }
    console.log(this.counter);
    this.filterCards();
  }

  public onPrev (): void {
    if (this.counter - 1 < 0) {
      this.counter = this.cards.length-1;
    } else {
      this.counter--;
    }
    console.log(this.counter);
    this.filterCards();
  }

  public onSearch(inputValue: string): void {
    fetch("https://api.punkapi.com/v2/beers?beer_name=" + inputValue)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("");
      })
      .then((data) => {
        if (data && data.length > 0) {
          const updatedCards: Card[] = data.slice(0, 10).map((beer: any) => {
            const img = beer.image_url;
            const name = beer.name;
            const description = beer.description;
            const abv = beer.abv;
            const price = 69.99;
  
            return {
              title: name,
              description: description,
              image: img,
              abv: 'abv: ' + abv,
              price: '$' + price.toFixed(2)
            };
          });
  
          this.cards = updatedCards;
          this.filterCards();
        } else {
          const img = '/assets/pics/NoProduct.png';
          const name = 'name';
          const description = 'description';
          const abv = 'none';
          const price = ' ____';
  
          const updatedCards: Card[] = Array(5).fill({
            title: name,
            description: description,
            image: img,
            abv: 'abv: ' + abv,
            price: '$' + price
          });
  
          this.cards = updatedCards;
          this.filterCards();
        }
      });
  }  
}

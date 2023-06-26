import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';

export interface Card {
  title: string;
  description: string;
  image: string;
  id: string;
  price: string;
}

export interface MainCard extends Card {
  admin: boolean;
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
      id: 'abv: 12.5',
      price: '$69.99'
    },
    {
      title: 'AB:05',
      description: 'Belgian Imperial Stout aged on toasted coconut and cacao. The Belgian yeast strain introduces a whole new dimension to the',
      image: '/assets/pics/bottle1.png',
      id: 'abv: 13.5',
      price: '$79.99'
    },
    {
      title: 'Candy Kaiser',
      description: 'Coffee is a brewed drink prepared from roasted coffee beans, the seeds of berries from certain Coffea species.',
      image: '/assets/pics/bottle2.png',
      id: 'abv: 14.5',
      price: '$89.99'
    },
    {
      title: 'Vagabond Pilsher',
      description: 'Coffee is a brewed drink prepared from roasted coffee beans, the seeds of berries from certain Coffea species.',
      image: '/assets/pics/bottle3.png',
      id: 'abv: 15.5',
      price: '$99.99'
    },
    {
      title: 'Dog G',
      description: 'Coffee is a brewed drink prepared from roasted coffee beans, the seeds of berries from certain Coffea species.',
      image: '/assets/pics/bottle4.png',
      id: 'abv: 16.5',
      price: '$109.99'
    },
  ];

  public filteredCards: Card[] = [];
  public counter:number = 0;

  public ngAfterViewInit(): void {
  }

  public ngOnInit(): void {
    this.filterCards();
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
    this.filterCards();
  }

  public onPrev (): void {
    if (this.counter - 1 < 0) {
      this.counter = this.cards.length-1;
    } else {
      this.counter--;
    }
    this.filterCards();
  }
}
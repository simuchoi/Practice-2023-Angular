import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit{

  @ViewChild("prev") public prevButton!:ElementRef<HTMLElement>;

  public counter:number = 0;
  public cards:number = 4;

  public ngAfterViewInit(): void {
    console.log(this.prevButton);
    this.abc();
    
    fromEvent<PointerEvent>(this.prevButton.nativeElement,"click").subscribe((event) => {
      console.log(event);
    })
  }

  public onNext (): void {
    if (this.counter + 1 <= this.cards) {
      this.counter++;
    } else {
      this.counter = 0;
    }
  }

  public onPrev (): void {
    if (this.counter - 1 < 0) {
      this.counter = this.cards;
    } else {
      this.counter--;
    }
  }

  public abc (): void { 
    console.log("abc");
  }
}
import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Directive({
  selector: '[imageSrc]',
  standalone: true
})
export class ImageSrcDirective implements OnChanges {
  @Input() imageSrc: string | undefined | null = null;

  constructor(
    private el: ElementRef<HTMLImageElement>,
    private http: HttpClient
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['imageSrc'] && this.imageSrc) {
      this.fetchImage(this.imageSrc);
    }
  }

  private fetchImage(url: string): void {
    this.http.get<{ imageBase64?: string }>(url)
      .pipe(
        catchError((error) => {
          console.error('Error fetching image:', error);
          return throwError(() => error);
        })
      )
      .subscribe(response => {
        if (response.imageBase64) {
          this.el.nativeElement.src = `data:image/jpeg;base64,${response.imageBase64}`;
        } else {
          this.el.nativeElement.src = '';
        }
      });
  }
}
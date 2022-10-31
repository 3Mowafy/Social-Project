import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { StoryService } from 'src/app/services/story.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css'],
})
export class StoryComponent implements OnInit {
  file = '';
  allStories: any;
  storyForm = new FormGroup({
    content: new FormControl(),
  });
  constructor(public _story: StoryService) {}

  ngOnInit(): void {
    this.showStories();
  }

  carouuselOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };

  addstoryImg(event: any) {
    this.file = event.target.files[0];
  }

  addStory() {
    const form: any = this.storyForm.value.content;
    const upload = new FormData();
    upload.append('content', form);
    upload.append('img', this.file);
    this._story.addStory(upload).subscribe((res) => {
      this.storyForm.reset();
      this.file = '';
      this.ngOnInit();
      console.log(res);
    });
  }

  showStories() {
    this._story.showStory().subscribe((res) => {
      this.allStories = res.data;
      console.log(this.allStories);
    });
  }
}

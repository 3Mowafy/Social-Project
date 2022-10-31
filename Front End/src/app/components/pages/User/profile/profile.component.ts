import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/interfaces/post';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileInfo: any;
  file = '';
  hidden = false;
  allPosts: any[] = [];
  isLike = [];
  counter: any;
  isShow = false;
  addPost = new FormGroup({
    content: new FormControl(' '),
  });
  addcomment = new FormGroup({
    comment: new FormControl(' '),
  });
  constructor(public _data: AuthService, public _posts: PostsService) {}
  ngOnInit(): void {
    this.profile();
    this.showMyPosts();
  }
  addpostImg(event: any) {
    this.file = event.target.files[0] || '';
  }

  addCommentImg(event: any) {
    this.file = event.target.files[0] || '';
  }

  postAdded() {
    const form: any = this.addPost.value.content;
    const upload = new FormData();
    upload.append('content', form);
    upload.append('img', this.file);
    this._posts.addPost(upload).subscribe(() => {
      this.addPost.reset();
      this.file = '';
      this.ngOnInit();
    });
  }

  commentAdded(id: any) {
    const formcomment: any = this.addcomment.value.comment;
    const upload = new FormData();
    upload.append('comment', formcomment);
    upload.append('img', this.file);
    this._posts.addComment(id, upload).subscribe(() => {
      this.addcomment.reset();
      this.file = '';
      this.ngOnInit();
    });
  }

  deletePost(id: any) {
    this._posts.removePost(id).subscribe(() => {
      this.ngOnInit();
    });
  }

  addRemoveLike(id: any) {
    this._posts.addRemoveLike(id).subscribe((res) => {
      this.isLike = res.data.likes;
      this.counter = this.isLike.length;
      this.showMyPosts();
    });
  }
  profile() {
    this._data.profile().subscribe(
      (res) => {
        this._data.isLoggedIn = true;
        this._data.userData = res.data;
        this.profileInfo = this._data.userData;
      },
      () => {
        this._data.isLoggedIn = false;
        this._data.userData = null;
      }
    );
  }

  showMyPosts() {
    this._posts.myPosts().subscribe(
      (res) => {
        this.allPosts = res.data;
      },
      () => {},
      () => {
        this.allPosts.forEach((p) => {
          this._data.singleUser(p.userId).subscribe((res) => {
            p.user = res.data;
            p.comments.forEach((e: any, i: any) => {
              this._data.singleUser(e.userId).subscribe((el) => {
                p.comments[i].usercomment = el.data;
              });
            });
          });
        });
      }
    );
  }
}

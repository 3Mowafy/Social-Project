import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/interfaces/post';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  commentId: any;
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
  constructor(public _posts: PostsService, public _auth: AuthService) {}

  ngOnInit(): void {
    this.showPosts();
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

  showPosts() {
    this._posts.posts().subscribe(
      (res) => {
        this.allPosts = res.data.postsData;
        this.isShow = true;
      },
      () => {},
      () => {
        this.allPosts.forEach((p) => {
          this._auth.singleUser(p.userId).subscribe((res) => {
            p.user = res.data;
            p.comments.forEach((e: any, i: any) => {
              this._auth.singleUser(e.userId).subscribe((el) => {
                p.comments[i].usercomment = el.data;
              });
            });
          });
        });
      }
    );
  }

  commentAdded(id: any) {
    const formcomment: any = this.addcomment.value.comment;
    const upload = new FormData();
    upload.append('comment', formcomment);
    upload.append('img', this.file);
    this._posts.addComment(id, upload).subscribe((res) => {
      this.commentId = res.data.userId;
      this.addcomment.reset();
      this.file = '';
      this.showPosts();
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
      this.showPosts();
    });
  }
}

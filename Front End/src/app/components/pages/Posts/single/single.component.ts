import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/interfaces/post';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css'],
})
export class SingleComponent implements OnInit {
  file = '';
  post: any;
  user = null;
  isLike = [];
  counter: any;
  addcomment = new FormGroup({
    comment: new FormControl(' '),
  });
  constructor(
    public _posts: PostsService,
    private route: ActivatedRoute,
    public _auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.showPost();
  }

  showPost() {
    let id = this.route.snapshot.params['id'];
    return this._posts.singlePost(id).subscribe((res) => {
      this.post = res.data;
      this._auth.singleUser(this.post.userId).subscribe((res) => {
        this.user = res.data;
      });
      this.post.comments.forEach((e: any, i: any) => {
        this._auth.singleUser(e.userId).subscribe((el) => {
          this.post.comments[i].usercomment = el.data;
        });
      });
    });
  }

  deletePost(id: any) {
    this._posts.removePost(id).subscribe(() => {
      this.ngOnInit();
      this.router.navigateByUrl('/');
    });
  }

  addRemoveLike(id: any) {
    this._posts.addRemoveLike(id).subscribe((res) => {
      this.isLike = res.data.likes;
      this.counter = this.isLike.length;
      this.showPost();
    });
  }

  addCommentImg(event: any) {
    this.file = event.target.files[0] || '';
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
}

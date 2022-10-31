import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  post: any;
  file = '';
  editPost = new FormGroup({
    content: new FormControl(''),
  });
  constructor(
    public _auth: AuthService,
    private _data: PostsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.showSingle();
  }

  showSingle() {
    let id = this.route.snapshot.params['id'];
    this._data.singlePost(id).subscribe((res) => (this.post = res.data));
  }

  addpostImg(event: any) {
    this.file = event.target.files[0];
  }

  editPostMethod() {
    let id = this.route.snapshot.params['id'];
    const form = this.editPost.value.content || this.post.content;
    const upload = new FormData();
    upload.append('content', form);
    upload.append('img', this.file);
    this._data.editPost(id, upload).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}

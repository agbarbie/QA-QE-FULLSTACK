import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../interfaces/post';
import { Post } from '../interfaces/post';
import { Comment } from '../interfaces/post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent  implements OnInit {
  users: User[] = [];
  posts: Post[] = [];
  comments: Comment[] = [];
  
  selectedUserId: number = 1;
  selectedPostId: number | null = null;

  constructor(private PostService: PostService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.PostService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      this.loadUserPosts();
    });
  }

  loadUserPosts() {
    this.PostService.getPostsByUserId(this.selectedUserId).subscribe(posts => {
      this.posts = posts;
      if (posts.length) {
        this.selectedPostId = posts[0].id;
        this.loadPostComments();
      }
    });
  }

  onUserSelect() {
    this.loadUserPosts();
  }

  onPostSelect() {
    this.loadPostComments();
  }

  loadPostComments() {
    if (this.selectedPostId) {
      this.PostService.getCommentsByPostId(this.selectedPostId).subscribe(comments => {
        this.comments = comments;
      });
    }
  }
}
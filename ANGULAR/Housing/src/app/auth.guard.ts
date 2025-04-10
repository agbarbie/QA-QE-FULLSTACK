import { CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import { PostService } from './post.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(PostService)
  const router = inject (Router)

  if(auth.getPosts()){
    return true 
  }
  router.navigate([])
  return true;
};

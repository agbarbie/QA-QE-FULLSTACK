import { Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path:"",
        component:HomeComponent,
    },
    {
        path:"post",
        component:PostComponent,
    },
    {
        path:"login",
        component:LoginComponent,
    }


];



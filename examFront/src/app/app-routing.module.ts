import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { AdminGuard } from './guard/admin.guard';
import { LoginGuard } from './guard/login.guard';
import { UserGuard } from './guard/user.guard';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminhomeComponent } from './pages/admin/adminhome/adminhome.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { UpdateCategoryComponent } from './pages/admin/update-category/update-category.component';
import { UpdateProfileComponent } from './pages/admin/update-profile/update-profile.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { StartTestComponent } from './pages/user/start-test/start-test.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { ViewAllQuestionsComponent } from './pages/admin/view-all-questions/view-all-questions.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'signup', component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate: [LoginGuard],
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
    children:[
      {
        path: '',
        component: AdminhomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'update-profile/:id',
        component: UpdateProfileComponent,
      },
      {
        path:'categories',
        component: ViewCategoriesComponent,
      },
      {
        path:'add-category',
        component: AddCategoryComponent,
      },
      {
        path: 'update-category/:id',
        component: UpdateCategoryComponent,
      },
      {
        path:'quizzes',
        component: ViewQuizzesComponent,
      },
      {
        path:'questions',
        component: ViewAllQuestionsComponent,
      },
      {
        path:'add-quiz',
        component: AddQuizComponent,
      },
      {
        path:'update-quiz/:quizId',
        component: UpdateQuizComponent,
      },
      {
        path: 'view-questions/:quizId/:title',
        component: ViewQuizQuestionsComponent,
      },
      {
        path:'add-question/:quizId/:title',
        component: AddQuestionComponent,
      },
      {
        path: 'update-question/:questionId',
        component: UpdateQuestionComponent,
      },


    ],
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [UserGuard],
    children:[
      {
        path: 'profile',
        component: UserProfileComponent,
      },
      {
        path:':cateId',
        component:LoadQuizComponent,
      },
      {
        path: 'instructions/:quizId',
        component:InstructionsComponent,
      },

    ]
    
  },

  {
    path: 'start-test/:quizId',
    component: StartTestComponent,
    canActivate: [UserGuard],
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

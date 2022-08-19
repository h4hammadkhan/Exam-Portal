import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthInterceptorProviders } from './services/auth.interceptor';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminhomeComponent } from './pages/admin/adminhome/adminhome.component';
import {ProfileComponent } from './pages/profile/profile.component'
import {MatTableModule} from '@angular/material/table';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component'
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component'
import { CKEditorModule } from '@ckeditor/ckeditor5-angular'
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component'
import { UpdateCategoryComponent } from './pages/admin/update-category/update-category.component'
import { UpdateProfileComponent } from './pages/admin/update-profile/update-profile.component'
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component'
import { SidebarComponent as userSidebar } from './pages/user/sidebar/sidebar.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component'


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    SidebarComponent,
    AdminDashboardComponent,
    AdminhomeComponent,
    ProfileComponent,
    ViewCategoriesComponent,
    AddCategoryComponent,
    ViewQuizzesComponent,
    AddQuizComponent,
    UpdateQuizComponent,
    ViewQuizQuestionsComponent,
    NotFoundComponent,
    AddQuestionComponent,
    UpdateQuestionComponent,
    UpdateCategoryComponent,
    UpdateProfileComponent,
    UserDashboardComponent,
    userSidebar,
    LoadQuizComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule,
    CKEditorModule,

    

  ],
  providers: [AuthInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

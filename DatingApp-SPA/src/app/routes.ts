// 60. Setting up routing in Angular
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
// 83. Creating Member Cards to display on our Member list page
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
// 63. Protecting our routes with a route guard
import { AuthGuard } from './_guards/auth.guard';
// 87. Creating the Member Detailed View component class
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
// 90. Using Route Resolvers to retrieve data
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
// 94. Creating a Member Edit Component
import { MemberEditComponent } from './members/member-edit/member-edit.component';
// 94. Creating a Member Edit Component
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
// 97. Adding a CanDeactivate route guard
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

// 63. Protecting our routes with a route guard
// 64. Protecting multiple routes with a single route guard using dummy routes
// 90. Using Route Resolvers to retrieve data
export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'members', component: MemberListComponent,
                              resolve: {users: MemberListResolver}},
            {path: 'members/:id', component: MemberDetailComponent,
                              resolve: {user: MemberDetailResolver}},
            {path: 'member/edit', component: MemberEditComponent,
                              resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChangesGuard]},
            {path: 'messages', component: MessagesComponent},
            {path: 'lists', component: ListsComponent},
        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'},
];


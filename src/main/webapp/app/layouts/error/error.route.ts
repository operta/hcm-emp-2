import { Routes } from '@angular/router';

import { ErrorComponent } from './error.component';

export const errorRoute: Routes = [
    {
        path: 'error',
        component: ErrorComponent,
        data: {
            authorities: [],
            pageTitle: 'error.title'
        },
    },
    {
        path: 'accessdenied',
        component: ErrorComponent,
        data: {
            authorities: [],
            pageTitle: 'error.title',
            error403: true
        },
    },
    {
        path: '404',
        component: ErrorComponent,
        data: {
            authorities: [],
            error404: true,
            pageTitle: 'error.title'
        }
    }
];

import {accessControlGuard} from '../../shared/guards/access-control-guard';

export const surveyRoutes = [
  {
    path: 'survey-builder/list',
    loadComponent: () => import('../survey/containers/survey-builders/list/list')
      .then(m => m.List),
    data: {
      role: 'ADMIN'
    },
    canActivate: [accessControlGuard]
  },
  {
    path: 'survey-builder/create',
    loadComponent: () => import('../survey/containers/survey-builders/form/form')
      .then(m => m.Form),
    data: {
      role: 'ADMIN'
    },
    canActivate: [accessControlGuard]
  },
  {
    path: 'survey-builder/edit/:id',
    loadComponent: () => import('../survey/containers/survey-builders/form/form')
      .then(m => m.Form),
    data: {
      role: 'ADMIN'
    },
    canActivate: [accessControlGuard]
  },
  {
    path: 'survey-consumer/survey-list',
    loadComponent: () => import('../survey/containers/survey-consumers/submittable-survey-list/submittable-survey-list')
      .then(m => m.SubmittableSurveyList),
    data: {
      role: 'OFFICER'
    },
    canActivate: [accessControlGuard]
  },
  {
    path: 'survey-consumer/submission-list',
    loadComponent: () => import('../survey/containers/survey-consumers/submission-list/submission-list')
      .then(m => m.SubmissionList),
    data: {
      role: 'ADMIN'
    },
    canActivate: [accessControlGuard]
  },
  {
    path: 'survey-consumer/attend-survey/:id',
    loadComponent: () => import('../survey/containers/survey-consumers/submission-form/submission-form')
      .then(m => m.SubmissionForm),
    data: {
      role: 'OFFICER'
    },
    canActivate: [accessControlGuard]
  }
];

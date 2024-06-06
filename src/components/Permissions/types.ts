export type RolesKeys = 'owner' | 'admin' | 'member' | 'readOnly';

export type SectionKeys =
  | 'project'
  | 'storage'
  | 'site'
  | 'fleekFunctions'
  | 'ipns'
  | 'billing'
  | 'applicationCredentials'
  | 'team';

export type FeatureKeys =
  | { editName: boolean; editAvatar: boolean; deleteProject: boolean }
  | {
      editSettings: boolean;
      uploadContent: boolean;
      editContentName: boolean;
      deleteContent: boolean;
      getInformation: boolean;
      viewContentList: boolean;
    }
  | {
      createSite: boolean;
      deploySite: boolean;
      viewSiteOverview: boolean;
      viewBuildSettings: boolean;
      editBuildSettings: boolean;
      viewEnvVariables: boolean;
      editEnvVariables: boolean;
      viewDeployments: boolean;
      viewAnalytics: boolean;
      editSiteName: boolean;
      editSiteSlug: boolean;
      editSiteAvatar: boolean;
      purgeCache: boolean;
      deleteSite: boolean;
      andAndVerifyDomain: boolean;
      changePrimaryDomain: boolean;
      deleteDomain: boolean;
      addAndVerifyEns: boolean;
      deleteEns: boolean;
      addGitIntegration: boolean;
      removeGitIntegration: boolean;
    }
  | {
      createFunction: boolean;
      editSettings: boolean;
      viewOverview: boolean;
      deployFunction: boolean;
      deleteFunction: boolean;
    }
  | { create: boolean; publish: boolean; delete: boolean; view: boolean }
  | { viewBilling: boolean; editBilling: boolean }
  | { view: boolean; create: boolean; edit: boolean }
  | {
      invite: boolean;
      changePermissions: boolean;
      assignOwner: boolean;
      deleteMember: boolean;
    }
  | { editName: boolean; editAvatar: boolean; deleteProject: boolean }
  | {
      editSettings: boolean;
      uploadContent: boolean;
      editContentName: boolean;
      deleteContent: boolean;
      getInformation: boolean;
      viewContentList: boolean;
    }
  | {
      createSite: boolean;
      deploySite: boolean;
      viewSiteOverview: boolean;
      viewBuildSettings: boolean;
      editBuildSettings: boolean;
      viewEnvVariables: boolean;
      editEnvVariables: boolean;
      viewDeployments: boolean;
      viewAnalytics: boolean;
      editSiteName: boolean;
      editSiteSlug: boolean;
      editSiteAvatar: boolean;
      purgeCache: boolean;
      deleteSite: boolean;
      andAndVerifyDomain: boolean;
      changePrimaryDomain: boolean;
      deleteDomain: boolean;
      addAndVerifyEns: boolean;
      deleteEns: boolean;
      addGitIntegration: boolean;
      removeGitIntegration: boolean;
    }
  | {
      createFunction: boolean;
      editSettings: boolean;
      viewOverview: boolean;
      deployFunction: boolean;
      deleteFunction: boolean;
    }
  | { create: boolean; publish: boolean; delete: boolean; view: boolean }
  | { viewBilling: boolean; editBilling: boolean }
  | { view: boolean; create: boolean; edit: boolean }
  | {
      invite: boolean;
      changePermissions: boolean;
      assignOwner: boolean;
      deleteMember: boolean;
    };

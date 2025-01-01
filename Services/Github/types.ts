export interface Contributor {
  login: string;
  name?: string;
  avatar_url: string;
}

export interface Repo {
  name: string;
  owner?: string;
  html_url: string;
  description: string;
  contributors_url: string;
  contributors?: Contributor[];
  creation_date?: string;
  slug?: string;
}

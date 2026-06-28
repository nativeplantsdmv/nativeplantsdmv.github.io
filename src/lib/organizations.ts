export interface Organization {
  name: string;
  url: string;
  sub?: string;
  subUrl?: string;
}

export const organizations: Organization[] = [
  {
    name: 'Wild Ones',
    url: 'https://wildones.org',
    sub: 'Local chapter',
    subUrl: 'https://nationscapitalregion.wildones.org/',
  },
  { name: 'Maryland Native Plant Society', url: 'https://mdflora.org' },
  { name: 'Friends of Native Trees in Takoma (FONTT)', url: 'https://fontt.org/' },
  { name: 'Virginia Native Plant Society', url: 'https://vnps.org/' },
];
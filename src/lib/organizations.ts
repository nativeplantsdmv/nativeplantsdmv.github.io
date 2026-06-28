export interface Organization {
  name: string;
  url: string;
  /* Label for a sub-link (with subUrl), or plain-text footnote if subUrl is absent. */
  sub?: string;
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
  { name: 'Virginia Native Plant Society', url: 'https://vnps.org/', sub: 'All 50 states have a native plant society' },
];
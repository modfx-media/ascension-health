/** Drafts with scheduled publish. Autosave stays off. */
export const collectionVersions = {
  drafts: {
    autosave: false,
    schedulePublish: true,
  },
  maxPerDoc: 50,
} as const;

export const globalVersions = {
  drafts: {
    autosave: false,
    schedulePublish: true,
  },
  max: 50,
} as const;

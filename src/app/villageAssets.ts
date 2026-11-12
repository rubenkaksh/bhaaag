// Everything only Cloud Village needs, behind one dynamic import (main.ts) so the level JSON and
// the cloud-sea renderer stay out of the initial chunk of every other mode.
import villageText from '../../content/levels/village.json?raw';
import { VILLAGE_CLOUD_TOP_Y, buildCloudBanks, buildCloudSea } from '../adapters/render/cloudSea';

export const village = { villageText, VILLAGE_CLOUD_TOP_Y, buildCloudBanks, buildCloudSea };
export type VillageAssets = typeof village;

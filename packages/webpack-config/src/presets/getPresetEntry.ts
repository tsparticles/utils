import { getEntry } from '../common/getEntry.js';

const getPresetEntry = (name: string, bundle: boolean): unknown => {
    return getEntry("preset", name, bundle);
};

export { getPresetEntry };

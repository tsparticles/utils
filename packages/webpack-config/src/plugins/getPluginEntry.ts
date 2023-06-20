import { getEntry } from '../common/getEntry.js';

const getPluginEntry = (name: string, bundle: boolean): unknown => {
    return getEntry("plugin", name, bundle);
};

export { getPluginEntry };

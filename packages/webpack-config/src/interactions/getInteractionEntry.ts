import { getEntry } from '../common/getEntry.js';

const getInteractionEntry = (name: string, bundle: boolean): unknown => {
    return getEntry("interaction", name, bundle);
};

export { getInteractionEntry };

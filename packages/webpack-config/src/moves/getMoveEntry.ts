import { getEntry } from "../common/getEntry.js";

const getMoveEntry = (name: string, bundle: boolean): unknown => {
    return getEntry("move", name, bundle);
};

export { getMoveEntry };

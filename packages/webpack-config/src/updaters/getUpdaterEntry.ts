import { getEntry } from "../common/getEntry.js";

const getUpdaterEntry = (name: string, bundle: boolean): unknown => {
    return getEntry("updater", name, bundle);
};

export { getUpdaterEntry };

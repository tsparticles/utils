import { getEntry } from "../common/getEntry.js";

const getPathEntry = (name: string, bundle: boolean): unknown => {
    return getEntry("path", name, bundle);
};

export { getPathEntry };

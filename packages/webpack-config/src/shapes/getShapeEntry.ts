import { getEntry } from "../common/getEntry.js";

const getShapeEntry = (name: string, bundle: boolean): unknown => {
    return getEntry("shape", name, bundle);
};

export { getShapeEntry };

import { getEntry } from "../common/getEntry";

const skipFirstDotPosition = 1,
    getFixedName = (name: string): string =>
        name && name.startsWith(".") ? name.substring(skipFirstDotPosition) : name || "",
    getBundleEntry = (name: string, bundle: boolean): unknown => getEntry("", getFixedName(name), bundle);

export { getBundleEntry };

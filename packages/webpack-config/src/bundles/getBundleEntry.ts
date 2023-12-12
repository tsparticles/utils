import { getEntry } from "../common/getEntry";

const getFixedName = (name: string): string => (name && name.startsWith(".") ? name.substring(1) : name || "");

const getBundleEntry = (name: string, bundle: boolean): unknown => getEntry("", getFixedName(name), bundle);

export { getBundleEntry };

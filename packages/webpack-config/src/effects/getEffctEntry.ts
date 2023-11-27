import { getEntry } from "../common/getEntry";

const getEffectEntry = (name: string, bundle: boolean): unknown => {
    return getEntry("effect", name, bundle);
};

export { getEffectEntry };

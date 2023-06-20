import { getEntry } from "../common/getEntry.js";

const getTemplateEntry = (name: string, bundle: boolean): unknown => {
    return getEntry("template", name, bundle);
};

export { getTemplateEntry };

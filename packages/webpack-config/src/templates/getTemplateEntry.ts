import { getEntry } from "../common/getEntry";

const getTemplateEntry = (name: string, bundle: boolean): unknown => {
    return getEntry("template", name, bundle);
};

export { getTemplateEntry };

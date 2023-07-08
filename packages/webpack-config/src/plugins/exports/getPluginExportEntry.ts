import { getPluginEntry } from "../getPluginEntry";

const getPluginExportEntry = (name: string, bundle: boolean): unknown => {
    return getPluginEntry(`export.${name}`, bundle);
};

export { getPluginExportEntry };

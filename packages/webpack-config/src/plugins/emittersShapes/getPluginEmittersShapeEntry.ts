import { getPluginEntry } from "../getPluginEntry";

const getPluginEmittersShapeEntry = (name: string, bundle: boolean): unknown => {
    return getPluginEntry(`emitters.shape.${name}`, bundle);
};

export { getPluginEmittersShapeEntry };

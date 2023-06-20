import { getEntry } from "../../common/getEntry.js";

const getInteractionParticlesEntry = (name: string, bundle: boolean): unknown => {
    return getEntry("interaction.particles", name, bundle);
};

export { getInteractionParticlesEntry };

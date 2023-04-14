import type { Engine } from "tsparticles-engine";
import { options } from "./options";

export function loadTemplatePreset(engine: Engine): void {
    // TODO: additional modules must be loaded here

    engine.addPreset("#template#", options);
}

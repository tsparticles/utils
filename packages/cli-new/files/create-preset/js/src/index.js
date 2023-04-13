import { options } from "./options.js";

export function loadTemplatePreset(engine) {
    // TODO: additional modules must be loaded here

    engine.addPreset("#template#", options);
}

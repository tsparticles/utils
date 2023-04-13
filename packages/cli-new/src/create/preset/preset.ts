#!/usr/bin/env node
import { Command } from "commander";
import { createJavaScriptTemplate } from "./create-preset-js";
import { createTypeScriptTemplate } from "./create-preset-ts";
import { execSync } from "child_process";

const presetCommand = new Command("preset");

presetCommand.description("Create a new tsParticles preset");
presetCommand.argument("<name>", "Preset name");
presetCommand.argument("<description>", "Preset description");
presetCommand.option("-ts, --typescript", "Use TypeScript");
presetCommand.action(async (name: string, description: string) => {
    const options = presetCommand.opts();

    let repoUrl: string;

    try {
        repoUrl = execSync("git config --get remote.origin.url").toString();
    } catch {
        repoUrl = "";
    }

    if (options.typescript) {
        createTypeScriptTemplate(name, description, repoUrl);
    } else {
        createJavaScriptTemplate(name, description, repoUrl);
    }
});

export { presetCommand };

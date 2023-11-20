import type { ExternalData } from "./ExternalData";

const getParticleExternal = (name: string): unknown => {
    const res = {} as Record<string, unknown>;

    res[name] = {
        commonjs: name,
        commonjs2: name,
        amd: name,
        root: "window",
    };

    return res;
};

const getParticleExternals = (...names: string[]): unknown[] => {
    return [
        ...names.map(name => getParticleExternal(name)),
        function ({ request }: { request: string }, cb: (err?: Error | null, data?: unknown) => void): void {
            if (/^@tsparticles\//.test(request)) {
                cb(null, getParticleExternal(request));

                return;
            }

            cb();
        },
    ];
};

interface ExternalsParams {
    additionalExternals?: ExternalData[];
    bundle?: boolean;
}

const transformExternal = (external: ExternalData): unknown => {
    return {
        [external.name]: external.data,
    };
};

const getExternals = (params: ExternalsParams): unknown[] => {
    const { additionalExternals, bundle } = params,
        externals = additionalExternals ?? [];

    if (bundle) {
        return [...externals.filter(t => !t.bundle).map(transformExternal)];
    }

    return [
        ...externals.map(transformExternal),
        ...getParticleExternals(
            "tsparticles-all",
            "tsparticles-basic",
            "tsparticles",
            "tsparticles-particles.js",
            "tsparticles-slim",
            "tsparticles-editor",
            "tsparticles-engine",
            "tsparticles-interaction-light",
            "tsparticles-interaction-external-attract",
            "tsparticles-interaction-external-bounce",
            "tsparticles-interaction-external-bubble",
            "tsparticles-interaction-external-connect",
            "tsparticles-interaction-external-grab",
            "tsparticles-interaction-external-pause",
            "tsparticles-interaction-external-push",
            "tsparticles-interaction-external-remove",
            "tsparticles-interaction-external-repulse",
            "tsparticles-interaction-external-slow",
            "tsparticles-interaction-external-trail",
            "tsparticles-interaction-particles-attract",
            "tsparticles-interaction-particles-collisions",
            "tsparticles-interaction-particles-links",
            "tsparticles-interaction-particles-repulse",
            "tsparticles-move-base",
            "tsparticles-move-parallax",
            "tsparticles-path-curves",
            "tsparticles-path-perlin-noise",
            "tsparticles-path-polygon",
            "tsparticles-path-simplex-noise",
            "tsparticles-path-svg",
            "tsparticles-plugin-absorbers",
            "tsparticles-plugin-canvas-mask",
            "tsparticles-plugin-emitters",
            "tsparticles-plugin-hsv-color",
            "tsparticles-plugin-infection",
            "tsparticles-plugin-motion",
            "tsparticles-plugin-polygon-mask",
            "tsparticles-plugin-sounds",
            "tsparticles-plugin-easing-back",
            "tsparticles-plugin-easing-circ",
            "tsparticles-plugin-easing-cubic",
            "tsparticles-plugin-easing-expo",
            "tsparticles-plugin-easing-quad",
            "tsparticles-plugin-easing-quart",
            "tsparticles-plugin-easing-quint",
            "tsparticles-plugin-easing-sine",
            "tsparticles-plugin-export-image",
            "tsparticles-plugin-export-json",
            "tsparticles-plugin-export-video",
            "tsparticles-preset-big-circles",
            "tsparticles-preset-bubbles",
            "tsparticles-preset-confetti",
            "tsparticles-preset-fire",
            "tsparticles-preset-firefly",
            "tsparticles-preset-fireworks",
            "tsparticles-preset-fountain",
            "tsparticles-preset-links",
            "tsparticles-preset-sea-anemone",
            "tsparticles-preset-snow",
            "tsparticles-preset-stars",
            "tsparticles-preset-triangles",
            "tsparticles-shape-arrow",
            "tsparticles-shape-bubble",
            "tsparticles-shape-cards",
            "tsparticles-shape-circle",
            "tsparticles-shape-cog",
            "tsparticles-shape-heart",
            "tsparticles-shape-image",
            "tsparticles-shape-line",
            "tsparticles-shape-multiline-text",
            "tsparticles-shape-path",
            "tsparticles-shape-polygon",
            "tsparticles-shape-ribbon",
            "tsparticles-shape-rounded-polygon",
            "tsparticles-shape-rounded-rect",
            "tsparticles-shape-spiral",
            "tsparticles-shape-square",
            "tsparticles-shape-star",
            "tsparticles-shape-text",
            "tsparticles-updater-angle",
            "tsparticles-updater-color",
            "tsparticles-updater-destroy",
            "tsparticles-updater-gradient",
            "tsparticles-updater-life",
            "tsparticles-updater-opacity",
            "tsparticles-updater-orbit",
            "tsparticles-updater-out-modes",
            "tsparticles-updater-roll",
            "tsparticles-updater-rotate",
            "tsparticles-updater-size",
            "tsparticles-updater-stroke-color",
            "tsparticles-updater-tilt",
            "tsparticles-updater-twinkle",
            "tsparticles-updater-wobble",
            "tsparticles-demo-configs",
        ),
    ];
};

export { getExternals };

import fs from "fs-extra";
import klaw from "klaw";
import path from "path";

export async function buildDistFiles(basePath: string): Promise<boolean> {
    try {
        const pkgInfo = await import(path.join(basePath, "package.json")),
            libPackage = path.join(basePath, "package.dist.json"),
            distPath = path.join(basePath, pkgInfo.publishConfig?.directory || "dist");

        const data = await fs.readFile(libPackage),
            text = data.toString(),
            libObj = JSON.parse(text);

        libObj.version = pkgInfo.version;

        if (pkgInfo.dependencies) {
            libObj.dependencies = JSON.parse(JSON.stringify(pkgInfo.dependencies).replaceAll("workspace:", ""));
        } else if (pkgInfo.peerDependencies) {
            libObj.peerDependencies = JSON.parse(JSON.stringify(pkgInfo.peerDependencies).replaceAll("workspace:", ""));
        }

        fs.writeFileSync(libPackage, JSON.stringify(libObj, undefined, 2), "utf8");

        console.log(`package.dist.json updated successfully to version ${pkgInfo.version}`);

        const rootFilesToCopy = [
            "LICENSE",
            "README.md",
            {
                source: "package.dist.json",
                destination: "package.json",
            },
        ];

        for (const file of rootFilesToCopy) {
            const src = path.join(basePath, typeof file === "string" ? file : file.source),
                dest = path.join(distPath, typeof file === "string" ? file : file.destination);

            fs.copyFileSync(src, dest);
        }

        const scriptsPath = path.join(basePath, "scripts"),
            distScriptsPath = path.join(distPath, "scripts");

        if (fs.existsSync(scriptsPath) && !fs.existsSync(distScriptsPath)) {
            fs.mkdirSync(distScriptsPath);

            const installPath = path.join(scriptsPath, "install.js");

            if (fs.existsSync(installPath)) {
                fs.copyFileSync(installPath, path.join(distScriptsPath, "install.js"));
            }
        }

        for await (const file of klaw(distPath)) {
            if (file.stats.isDirectory()) {
                continue;
            }

            const contents = await fs.readFile(file.path, "utf8");

            await fs.writeFile(file.path, contents.replaceAll("__VERSION__", `"${pkgInfo.version}"`), "utf8");
        }

        return true;
    } catch (e) {
        console.error(e);

        return false;
    }
}

import path from "path";
import rimraf from "rimraf";

export async function clearDist(basePath: string): Promise<boolean> {
    try {
        await rimraf(path.join(basePath, "dist"));

        return true;
    } catch (e) {
        console.error(e);

        return false;
    }
}

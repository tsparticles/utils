interface IEntryParams {
    bundle: boolean;
    format: string;
    min: boolean;
    name?: string;
}

const getEntry = (data: IEntryParams): unknown => {
    const { bundle, format, min, name } = data,
        fileName = bundle ? "bundle" : "index",
        fixFormat = format ? `.${format}` : "",
        fixName = name ? `.${name}` : "",
        fixMin = min ? ".min" : "",
        obj = {} as Record<string, string>;

    obj[`tsparticles${fixFormat}${fixName}${fixMin}`] = `./dist/browser/${fileName}.js`;

    return obj;
};

export { getEntry };

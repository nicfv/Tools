import webpack from 'webpack';

webpack({
    mode: 'production',
    entry: './src/index.ts',
    module: {
        rules: [
            { test: /\.ts$/, use: 'ts-loader' },
        ],
    },
    resolve: {
        extensions: ['.ts', '...'],
    },
}, (err, stats) => {
    if (err) {
        console.error(err.message)
        process.exitCode = 1;
        return;
    }
    if (stats.hasErrors()) {
        for (const error of stats.compilation.errors) {
            console.error(error.message);
        }
        process.exitCode = 1;
        return;
    }
    if (stats.hasWarnings()) {
        for (const warn of stats.compilation.warnings) {
            console.warn(warn.message);
        }
    }
    console.info(`Compiled in ${stats.endTime - stats.startTime}ms.`);
});
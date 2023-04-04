module.exports = {
    default: [
        "--require src/step_definitions/**/*.step.ts",
        "--require-module ts-node/register",
        "--publish-quiet",
    ].join(" "),
};
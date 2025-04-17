module.exports = {
    default: {
        requireModule: ['ts-node/register', 'tsconfig-paths/register'],
        paths: ['./tests/features/*.feature'],
        require: [
            './core/set-up/cucumberHooks.ts',
            './tests/features/step_definitions/steps.ts',
            './core/configuration/parameterTypes.ts',
        ],
        strict: true,
        parallel: 3,
    },
};
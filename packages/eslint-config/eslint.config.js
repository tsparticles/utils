module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
    },
    plugins: [ "@stylistic", "@typescript-eslint", "jsdoc", "eslint-plugin-tsdoc" ],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/stylistic",
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
        "plugin:jsdoc/recommended-typescript",
        "plugin:prettier/recommended",
        "prettier",
    ],
    rules: {
        "@stylistic/comma-spacing": [ "error" ],
        "@stylistic/quote-props": [ "error", "as-needed" ],
        "@stylistic/space-in-parens": [ "error", "never" ],
        "@stylistic/spaced-comment": [ "error", "always", {
            block: {
                balanced: true
            }
        } ],
        "@stylistic/arrow-spacing": "error",
        "@stylistic/arrow-parens": [ "error", "as-needed" ],
        "@stylistic/quotes": [ "error", "double", {
            allowTemplateLiterals: true,
            avoidEscape: true
        } ],
        "@stylistic/semi": [ "error", "always" ],
        "@stylistic/space-before-blocks": "error",
        "@stylistic/space-infix-ops": "error",
        "@stylistic/keyword-spacing": "error",
        "@stylistic/no-extra-semi": "error",

        "@typescript-eslint/ban-types": "warn",
        "@typescript-eslint/consistent-generic-constructors": [ "error", "constructor" ],
        "@typescript-eslint/consistent-type-exports": [ "error" ],
        "@typescript-eslint/consistent-type-imports": [ "error" ],
        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/explicit-member-accessibility": [ "error", {
            accessibility: "no-public"
        } ],
        "@typescript-eslint/no-explicit-any": "error", //"@typescript-eslint/no-extra-parens": [ "error" ],
        "@typescript-eslint/no-inferrable-types": "error",
        "@typescript-eslint/member-ordering": [ "error", {
            default: {
                memberTypes: [// Index signature
                    "signature",

                    // Fields
                    "public-static-field", "protected-static-field", "private-static-field",

                    "public-decorated-field", "protected-decorated-field", "private-decorated-field",

                    "public-instance-field", "protected-instance-field", "private-instance-field",

                    "public-abstract-field", "protected-abstract-field",

                    "public-field", "protected-field", "private-field",

                    "static-field", "instance-field", "abstract-field",

                    "decorated-field",

                    "field",

                    // Constructors
                    "public-constructor", "protected-constructor", "private-constructor",

                    "constructor",

                    // Getters & Setters
                    [ "public-static-get", "public-static-set" ], [ "protected-static-get", "protected-static-set" ], [ "private-static-get", "private-static-set" ],

                    [ "public-decorated-get", "public-decorated-set" ], [ "protected-decorated-get", "protected-decorated-set" ], [ "private-decorated-get", "private-decorated-set" ],

                    [ "public-instance-get", "public-instance-set" ], [ "protected-instance-get", "protected-instance-set" ], [ "private-instance-get", "private-instance-set" ],

                    [ "public-abstract-get", "public-abstract-set" ], [ "protected-abstract-get", "protected-abstract-set" ],

                    [ "public-get", "public-set" ], [ "protected-get", "protected-set" ], [ "private-get", "private-set" ],

                    [ "static-get", "static-set" ], [ "instance-get", "instance-set" ], [ "abstract-get", "abstract-set" ],

                    [ "decorated-get", "decorated-set" ],

                    [ "get", "set" ],

                    // Methods
                    "public-static-method", "protected-static-method", "private-static-method",

                    "public-decorated-method", "protected-decorated-method", "private-decorated-method",

                    "public-instance-method", "protected-instance-method", "private-instance-method",

                    "public-abstract-method", "protected-abstract-method",

                    "public-method", "protected-method", "private-method",

                    "static-method", "instance-method", "abstract-method",

                    "decorated-method",

                    "method" ], order: "alphabetically"
            }
        } ],
        "@typescript-eslint/no-unnecessary-type-arguments": "error",
        "@typescript-eslint/no-unnecessary-type-assertion": "error",
        "@typescript-eslint/no-unused-vars": [ "error", {
            argsIgnorePattern: "^_",
            caughtErrorsIgnorePattern: "^_",
            destructuredArrayIgnorePattern: "^_",
            varsIgnorePattern: "^_"
        } ],
        "@typescript-eslint/no-var-requires": "error",
        "@typescript-eslint/prefer-readonly": [ "error" ],
        "@typescript-eslint/no-magic-numbers": [ "error", { ignoreEnums: true, ignoreNumericLiteralTypes: true } ],
        "@typescript-eslint/no-unused-expressions": "error",
        "@typescript-eslint/no-throw-literal": "error",
        "@typescript-eslint/no-empty-function": "error",
        "@typescript-eslint/no-useless-constructor": "error",

        "no-console": "error",
        "sort-imports": [ "error", {
            allowSeparatedGroups: false,
            ignoreCase: false,
            ignoreDeclarationSort: false,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: [ "none", "all", "multiple", "single" ]
        } ],
        "tsdoc/syntax": "warn",
        "no-nested-ternary": "error",
        "no-unneeded-ternary": "error",
        "no-var": "error",
        "prefer-const": "error",
        "prefer-object-spread": "error",
        "prefer-template": "error",
        "yoda": [ "error", "never", {
            exceptRange: true
        } ],
        "no-duplicate-imports": "error",
        "no-useless-rename": "error",
        "no-useless-return": "error",
        "no-useless-computed-key": "error",
        "no-useless-concat": "error",
        "no-useless-escape": "error",
        "constructor-super": "error",
        "no-this-before-super": "error",
        "no-duplicate-case": "error",
        "no-empty": "error",
        "no-func-assign": "error",
        "no-irregular-whitespace": "error",
        "no-unexpected-multiline": "error",
        "no-unreachable": "error",
        "valid-typeof": "error",
        "no-unsafe-finally": "error",
        "no-case-declarations": "error",
        "no-empty-pattern": "error",
        "no-extra-boolean-cast": "error",
        "no-inner-declarations": "error",
        "no-prototype-builtins": "error",
        "no-self-assign": "error",
        "no-unused-labels": "error",
        "no-useless-catch": "error",
        "no-useless-constructor": "off",
        "no-empty-function": "off",
        "no-throw-literal": "off",
        "no-unused-expressions": "off",
        "no-magic-numbers": "off",
    }
};

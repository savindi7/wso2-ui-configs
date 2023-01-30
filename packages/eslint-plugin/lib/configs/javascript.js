/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * @fileoverview ESLint config to be used in JavaScript based projects.
 */

module.exports = {
  extends: ['plugin:@wso2/core', 'airbnb-base'],
  rules: {
    // This is a stricter rule. We can move it to the `strict` config and allow known places where dev-dependencies would be imported.
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-extraneous-dependencies.md
    'import/no-extraneous-dependencies': 'off',
    // Bit harsh rule, some developers will like to have consistent exports in a module.
    // If there are a mixture of export types, the imports will look ugly.
    // https://github.com/import-js/eslint-plugin-import/blob/v2.26.0/docs/rules/prefer-default-export.md
    'import/prefer-default-export': 'off',
    // Disallow specified names in exports.
    // https://eslint.org/docs/rules/no-restricted-exports
    // FIXME: In Airbnb ruleset, `default` is also restricted which disallows `export { default } from` syntax.
    // There's a tracker (https://github.com/eslint/eslint/issues/15617) and a WIP PR to give first class support to bypass.
    // Until then, allowing `default` syntax.
    // Config is copied from https://github.com/airbnb/javascript/blob/f3d3a07/packages/eslint-config-airbnb-base/rules/es6.js#L65.
    'no-restricted-exports': [
      'error',
      {
        restrictedNamedExports: [
          'then', // this will cause tons of confusion when your module is dynamically `import()`ed, and will break in most node ESM versions
        ],
      },
    ],
    // Enforces sorting object properties in alphabetical order for readability.
    // https://eslint.org/docs/latest/rules/sort-keys
    'sort-keys': ['error', 'asc', {caseSensitive: true, minKeys: 2, natural: false}],
  },
};

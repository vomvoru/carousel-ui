module.exports = {
    'extends': 'airbnb',
    "parser": "babel-eslint",
    'plugins': [
        'import'
    ],
    'env': {
        'browser': true
    },
    'rules':{
        'indent':[
            'error', 
            2
        ],
        'import/no-extraneous-dependencies': [
            'error',
            {
                'devDependencies': true
            }
        ],
        "import/extensions": [
            'error',
            'ignorePackages',
            {
                'ts': 'never',
                'tsx': 'never',
                'js' : 'never',
                'jsx': 'never'
            }
        ],
        'semi': ['error', 'never'],
        'max-statements': ['warn', 20, { 'ignoreTopLevelFunctions': true }],
        'complexity': ['warn', 10],
        'no-param-reassign': 'warn',
        'no-use-before-define': 'off',
        'max-len': ['warn', 80, 0, {
            'ignoreUrls': true,
            'ignoreComments': false,
            'ignoreRegExpLiterals': true,
            'ignoreStrings': true,
            'ignoreTemplateLiterals': true,
        }],
        'no-multiple-empty-lines': ['error', {
            'max': 2,
            'maxBOF': 0,
            'maxEOF': 0
        }],
        'no-return-await': 'off',
        'func-style': ['warn', 'expression'],
        'react/prefer-es6-class': ['error', 'always'],
        'no-underscore-dangle': 'off',
        'react/prefer-stateless-function': ['off', { 'ignorePureComponents': true }],
        // 'react/prop-types': ['error', { 'skipUndeclared': true }],
        'react/jsx-filename-extension': [1, { 'extensions': ['.tsx', '.jsx'] }],
    }
};
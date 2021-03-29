# Next - bnb

## 20210317

# project config

```
yarn add next react react-dom
yarn add -D typescript @types/react @types/node @types/react-dom
```

package.json

```json
// package.json

...
"scripts": {
    "next": "next build",
    "dev": "next dev",
    "start": "next start"
},
...
```

eslint --init

```
How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · airbnb
✔ What format do you want your config file to be in? · JavaScript
```

.eslintrc

```js
// .eslintrc

module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["airbnb"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    quotes: ["error", "double"],
    "@typescript-eslint/quotes": ["error", "double"],
    "no-unused-vars": "off",
    "spaced-comment": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "jsx-a11y/control-has-associated-label": "off",
    "react/no-array-index-key": "off",
    "comma-dangle": "off",
    "arrow-body-style": "off",
    "react/no-unescaped-entities": "off",
    "react/prop-types": "off",
    "object-curly-newline": "off",
    "react/jsx-one-expression-per-line": "off",
    "implicit-arrow-linebreak": "off",
    "no-shadow": "off",
    "operator-linebreak": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "global-require": "off",
    "no-use-before-define": "off",
    "import/prefer-default-export": "off",
    "no-param-reassign": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "no-invalid-css": "off",
    "no-confusing-arrow": "off",
    "react/jsx-curly-newline": "off",
    indent: "off",
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".tsx"] },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts"],
      },
    },
  },
};
```

tsconfig  
-> yarn dev -> create tsconfig

```js
// tsconfig.json

...
    "strict":true
...
```

<br>

# project style

```
yarn add styled-components babel-plugins-styled-comopnents
yarn add @types/styled-components -D
```

\_document.tsx  
->styled-components ssr지원  
->global style 적용  
->babel 설정 필요

```ts
// ./pages/_document.tsx

import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Noto+Sans:400,700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,700&display=swap&subset=korean"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

```json
// .babelrc

{
  "presets": ["next/babel"],
  "plugins": [["styled-components", { "ssr": true }]]
}
```

styled-reset

```
yarn add styled-reset
```

```js
// ./styles/GlobalStyle.tsx

import reset from "styled-reset";
import { createGlobalStyle, css } from "styled-components";
import palette from "./palette";

const globalStyle = css`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    font-family: Noto Sans, Noto Sans KR;
    color: ${palette.black};
  }
`;

const GlobalStyle = createGlobalStyle`
    ${globalStyle};
`;

export default GlobalStyle;
```

global color

```js
// ./styles/palette.js

export default {
    ...
    amaranth: "#E51E53",
    orange: "#fc642d",
    ...
  };

```

```ts
// ./pages/_app.tsx

import { AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
};

export default app;
```

---

## 20210318

### React Portal

```jsx
ReactDom.createPortal(children, container);
```

첫 번째 인자로 리액트 컴포넌트를 받고  
두 번째 인자로 리액트 컴포넌트를 넣을 DOM을 받게 된다.

-여기서는 \_app.tsx에 #root-modal div를 하나 만들어주고  
ModalPortal에서 ref로 DOM을 지정해준다.

```tsx
useEffect(() => {
  setMounted(true);
  if (document) {
    const dom = document.querySelector("#root-modal");
    ref.current = dom;
  }
}, []);
```

---

## 20210323

### role

```
Visible, non-interactive elements with click handlers must have at least one keyboard listener.
```

역할 설정을 해줘야 함  
role = "presentation" 설정

https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md#how-do-i-resolve-this-error

---

### React.InputHTMLAttributes

```ts
interface IProps extends React.InputHTMLAttributes<HTMLInputElement>
```

input태그가 가지는 속성들에 대한 타입

---

### styled-component

<>(제네릭)을 사용하여 styled-component의 props에 타입을 추가 할 수 있다.

```ts
const Conatainer = styled.div<{ iconExist: boolean }>`
  ...
    padding: ${({ iconExist }) => (iconExist ? " 0 44px 0 11px" : " 0 11px")};
  ...
`;
```

---

## 20210324

### 재사용 컴포넌트

```ts
...
interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<IProps> = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};
...
```

props를 다양하게 받을 수 있다  
Container는 styled-component이며 위의 코드는 button을 상속

---

## 20210325

### bcrypt

```json
yarn add bcrypt
yarn add @types/bcryptjs -D
```

hashSync("string",salt)으로 암호호를 해싱  
compareSync("string",해시된 문자)를 통해 값이 일치하는지 확인  
salt -> 특별한 값 암호에 추가되는 값

---

### JWT

```json
yarn add jsonwebtoken
yarn add @types/jsonwebtoken
```

JWT(json web token)  
전자 서명된 URL로 이용할 수 있는 문자만 구성된 JSON  
토큰을 생성하기 위해서는 암호화할 값과 secret키(?)가 필요하다.  
secret키는 인증 관련된 값이라 따로 보관하는게 좋음(환경변수)

생성된 토큰을 브라우저의 쿠키에 저장하려면 헤더에 set-Cookie설정을 해줘야 함

---

## 20210329

redux

```ts
yarn add next-redux-wrapper @reduxjs/toolkit react-redux redux
yarn add @types/react-redux
```

---

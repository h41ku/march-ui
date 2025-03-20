# march-ui

Lightweight UI-kit for [Mithril.js](https://mithril.js.org/)

## Install

```sh
npm install --save-dev march-ui
```

## Usage

Type minimal `index.html` file:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
    <link rel="stylesheet" href="./dist/index.css"/>
</head>
<body>
    <main id="app"></main>
    <script src="./dist/index.js"></script>
</body>
</html>
```

Type `index.css` file:

```css
.example {
    width: max-content;
    margin: 2em auto;
}
```

Type `index.jsx` file:

```js
import UI from 'march-ui/UI'
import Button from 'march-ui/Button'
import './index.css'

// make a little application
const App = () => {
    let isClicked = false
    const sayHello = () => { isClicked = true }
    return {
        view() {
            return (
                <UI>
                    <div class="example">
                        {isClicked && <h1>Hello, World!</h1>}
                        {!isClicked && <Button onclick={sayHello} title="Say Hello"/>}
                    </div>
                </UI>
            )
        }
    }
}

// mount application
m.mount(document.getElementById('app'), App)
```

Transpile `index.jsx` into `dist/index.js` and `dist/index.css` files,
for example, using `esbuild`:

```sh
npm install --save-dev esbuild
npx esbuild index.jsx --bundle --minify --outdir=dist --jsx-factory=m --jsx-fragment='"["'
```

Now open `index.html` in your favorite browser.

## Components

- `UI`
- `Icon`
- `Button`
- `TextField`
- `ContextMenu`
- `MenuItem`
- `Splitter`
- `ThemeToggler`
- `Form`
- `Notice`
- `Tabs`
- `Tab`

## License

MIT

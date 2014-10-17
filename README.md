
# animator-js



## IMPORTANT !

This library will work only in latest browser which area compatible with animation-keyframes 


## Setup files

Include jquery and animator.js at the bottom of the body.

```html
    <script src="bower_components/jquery/dist/jquery.js"></script>
    <script src="animator.js"></script>
</body>
```

Create a simple element on the page and assign it a class or an id

```html
<body>
    <div class="logo"></div>
```

Define the graphic style of the element

```html
<style>
    .logo {
        position          : absolute ;
        width             : 100px ;
        height            : 100px ;
        background-color  : red ;
    }
</style>
```

## Start animating !!

Ready to code! Right after the animator.js inclusion line.

```js
var logo = new Animator( ".logo", "classNameForThisAnimation", ) ;

```




## License

MIT

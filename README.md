
# animator-js



## IMPORTANT

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
        position                    :   absolute ;
        width                       :   100px ;
        height                      :   100px ;
        background-color            :   red ;
        -webkit-transform-origin    :   50% 50% ;
        -moz-transform-origin       :   50% 50% ;
        -o-transform-origin         :   50% 50% ;
        -ms-transform-origin        :   50% 50% ;
        transform-origin            :   50% 50% ;
    }
</style>
```

## Start animating

Ready to code! Right after the animator.js inclusion line.

```js
var logo = new Animator( ".logo", "classNameForThisAnimation" ) ;

// initialize to starting values 
// className, left, top, rotation, scale, opacity, duration, easing
logo.animate( ".logo", 0, 0, 0, 1, 1, 0, 'ease-in-out' ) ; 

// move logo to right for 300px rotate it 90 degrees, scale it to double in 5 seconds. 
logo.animate( ".logo", 300, 0, 90, 2, 1, 5, 'ease-in-out' ) ; 
```




## License



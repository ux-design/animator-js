
# animator-js



This library will work only in latest browser which are compatible with animation-keyframes feature 


## Setup files

Include jquery and animator.js at the bottom of the body.

```html
    <script src="jquery.js"></script>
    <script src="animator.js"></script>
</body>
```

Create a simple element on the page and assign it a class or an id

```html
<body>
    <div class="logo"></div>
```

Define the graphic style of the element and the transform-origin as well

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

## Start coding

Right after the animator.js script, write :

```js
/* Animator.$$.addAnimation( targetElement, className, x, y, r, s, o, blur, time, easing ) ; */
Animator.$$.addAnimation( '.logo', 'move', 200, 200, 10, 1, 1, -1, 2.2, 'linear' ) ;
```
This line will create a simple class named "myMoveClass0" which will translate x by 200 pixels, 
y by 200 pixels, rotate by 10 degrees clockwise, scale to 100% (1), set opacity to 1 and remove any blur effect (-1),
the transition will be 2200 milliseconds (2.2) long with the desired easing.

## Multiple animations

If you want to add multiple animations to the Queue just add other lines

```js
Animator.$$.addAnimation( '.logo', 'move', 200, 100, 60, 1, 1, -1, 1.5, 'ease-in-out' ) ;
Animator.$$.addAnimation( '.logo', 'move', 100, 100, 90, 1, 1, -1, 2, 'ease-in-out' ) ;
...
```

## Ready to run the Queue of animations!

Just verify that the Queue were injected to the style node and run it!
```js
if( Animator.$$.inject() ) Animator.$$.begin() ;
```

## License


Copyright (c) 2014 Andrea Mazzilli ( http://design-ux.co.uk )

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


# animator-js



This library will work only in latest browser which are compatible with animation-keyframes feature 


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

## Start animating!

Right after the animator.js script, write :

```js
Animator.$$.addAnimation( '.logo', 'myMoveClass', 200, 200, 10, 1, 1, -1, 2.2, 'ease-in-out' ) ;
```
This line will create a simple class named "myMoveClass0" which will translate x by 200 pixels, 
y by 200 pixels, rotate by 10 degrees clockwise, scale to 100% (1), remove any blur effect (-1),
the transition will be 2200 milliseconds (2.2) long and the last paramenter is the easing.



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

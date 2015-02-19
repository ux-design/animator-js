/*
 * Copyright (c) 2014 Andrea Mazzilli ( http://design-ux.co.uk )
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */


var Animator = Animator || {} ;

Animator.$$ = ( function () {

    "use strict" ;

    var __animator__runtimeCSS = [] 

    ,   __queue__ = [] // Animations Queue

    ,   __queueTemp__ = [] // Temporary Animations Queue

    ,   __injections__ = "" // Injectable Css3 Rules (of Temporary Animations Queue)

    ,   __pref__

    ,   browserIsCompatible = function () {

        var agent = navigator.userAgent
        ,   name
        ,   nameLen
        ,   b
        ,   v ;

        if ( agent.match( /MSIE 10/i ) || 
            agent.match( /like Gecko/i ) || 
            agent.match( /iPad/i ) || 
            agent.match( /iPhone/i ) || 
            agent.match( /iPod/i ) ) {
            return true ;
        }

        name = "Chrome" ;
        if ( agent.match( /Chrome/i ) ) {
            nameLen = name.length ;
            b = agent.indexOf( name ) ;
            v = agent.substring( nameLen + b + 1, nameLen + b + 3 ) ;
            v = v.replace( ".", "" ) ;
            if( v >= 4 ) return true
        }

        name = "Firefox" ;
        if ( agent.match( /Firefox/i ) ) {
            nameLen = name.length ;
            b = agent.indexOf( name ) ;
            v = agent.substring( nameLen + b + 1, nameLen + b + 3 ) ;
            v = v.replace( ".", "" ) ;
            if( v >= 17 ) return true
        }

        name = "Version" ;
        if ( agent.match( /Safari/i ) ) {
            nameLen = name.length ;
            b = agent.indexOf( name ) ;
            v = agent.substring( nameLen + b + 1, nameLen + b + 3 ) ;
            v = v.replace( ".", "" ) ;
            if( v >= 4 ) return true
        }

        return false
    }

    ,   css3Prefix = function () { // set the browser's css3 prefix

        var a = 0
        ,   prefix
        ,   d = document.body.style ;
        if ( 'transform' in d )            { a ++ ; prefix = '' ;            } ; 
        if ( '-webkit-transform' in d )    { a ++ ; prefix = '-webkit-' ;    } ; 
        if ( '-moz-transform' in d )       { a ++ ; prefix = '-moz-' ;       } ; 
        if ( '-o-transform' in d )         { a ++ ; prefix = '-o-' ;         } ; 
        if ( '-ms-transform' in d )        { a ++ ; prefix = '-ms-' ;        } ; 
        if ( a > 0 ) { a = 1 ; }

        return prefix

    }

    ,   currentTargetElement = ""

    ,   targetSetup = function ( el ) { // convert element's attributes in styles

        $( el ).attr( { 

              'left'        : $( el ).position().left
            , 'top'         : $( el ).position().top
            , 'rotation'    : 0
            , 'scale'       : 1
            , 'opacity'     : $( el ).css( 'opacity' )
            , 'blur'        : 0 

        } ) ;

        return true
    }

    ,   addAnimation = function ( targetElement, css3Class, x, y, r, s, o, blur, start, duration, ease ) { 

        if ( this.currentTargetElement != targetElement ) targetSetup( targetElement ) ;

        var len = __queue__.length ;

        __queue__.push( { 

                id              :   len
            ,   targetElement   :   targetElement
            ,   css3Class       :   css3Class
            ,   x               :   x
            ,   y               :   y
            ,   r               :   r
            ,   s               :   s
            ,   o               :   o
            ,   blur            :   blur
            ,   start           :   start
            ,   duration        :   duration
            ,   ease            :   ease

        } ) ;

        __queueTemp__.push( { 

                id              :   len
            ,   targetElement   :   targetElement
            ,   css3Class       :   css3Class
            ,   x               :   x
            ,   y               :   y
            ,   r               :   r
            ,   s               :   s
            ,   o               :   o
            ,   blur            :   blur
            ,   start           :   start
            ,   duration        :   duration
            ,   ease            :   ease

        } ) ;

        var el = $( targetElement ).get( 0 ).attributes 
        ,   currX = el[ 'left' ].value
        ,   currY = el[ 'top' ].value
        ,   currR = el[ 'rotation' ].value
        ,   currS = el[ 'scale' ].value
        ,   currO = el[ 'opacity' ].value
        ,   currB = el[ 'blur' ].value ;

        if ( blur != -1 ) {

            var blurFilterFrom = __pref__ + 'filter: blur(' + currB + 'px);'
            ,   blurFilterTo = __pref__ + 'filter: blur(' + blur + 'px);' ;

        } else {

            var blurFilterFrom = ''
            ,   blurFilterTo = '' ;

        }

        var name = css3Class + len ;

        __injections__ += '@' + __pref__ + 'keyframes ' + name + '{\n to{ opacity: ' + o + ' ; ' + __pref__ + 'transform: translateX(' + x + 'px) translateY(' + y + 'px) rotate(' + r + 'deg) scale(' + s + '); ' + blurFilterTo + ' }\n}\n.' + name + '{' + __pref__ + 'animation-name:' + name + ';' + __pref__ + 'animation-duration:' + duration + 's;    ' + __pref__ + 'animation-fill-mode: both; ' + __pref__ + 'animation-timing-function: ' + ease + ';}\n\n' ;

    }

    ,   inject = function () {

        $( 'style' ).append( __injections__ ) ;
        __injections__ = '' ;

        return true

    }

    ,   addClass = function ( ii ) {

        $( ii.targetElement ).addClass( ii.css3Class + ii.id ) ;

        $( ii.targetElement ).attr( { 
                'left'      : ii.x
            ,   'top'       : ii.y
            ,   'rotation'  : ii.r
            ,   'scale'     : ii.s
            ,   'opacity'   : ii.o
            ,   'blur'      : ii.blur
        } ) ;

    }

    ,   removeClass = function ( ii ) {

        $( ii.targetElement ).removeClass( ii.css3Class + ii.id ) ;
        $( ii.targetElement ).css( __pref__ + 'transform', 'translateX(' + ii.x + 'px) translateY(' + ii.y + 'px) scale(' + ii.s + ', ' + ii.s + ') rotate(' + ii.r + 'deg)' ) ;
        $( ii.targetElement ).css( __pref__ + 'filter', 'blur(' + ii.blur + 'px)' ) ;
        $( ii.targetElement ).css( 'opacity', ii.o ) ;
        console.log( ii.targ );

    }

    ,   begin = function () {

        for ( var i = 0, delay = 0, cueStart = 0 ; i < __queueTemp__.length ; ++i ) {

            var ii = __queueTemp__[ i ] ;
            cueStart = delay + ii.duration ;
            delay += ii.duration ;
            if ( ii.start >= 0 ) cueStart = ii.start ;

            ( function( ii, cueStart ) { 
                setTimeout( function () { addClass( ii ) ; }, cueStart * 1000 ) ; 
            } ) ( ii, cueStart ) ;
            ( function( ii, cueStart ) { 
                setTimeout( function () { removeClass( ii ) ; }, ( cueStart * 1000 ) + ( ii.duration * 1000 ) ) ; 
            } ) ( ii, cueStart ) ;
        }

    }

    if ( !__pref__ ) __pref__ = css3Prefix( ) ;

    /*
     * PUBLIC API
     */

    return {

            isActive            :   browserIsCompatible()
        ,   addAnimation        :   addAnimation
        ,   inject              :   inject
        ,   begin               :   begin
        /* test-code */
        ,   css3Prefix          :   css3Prefix
        /* end-test-code */
    }

} () ) ;
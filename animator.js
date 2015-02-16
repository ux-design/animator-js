/*

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

*/


"use strict" ;


var __browserIsCompatible__ = function () {
    var agent = navigator.userAgent
    ,   name
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

if ( __browserIsCompatible__() ) {

    /*
    ADD ARRAY METHOD TO FIND SUBSTRING IN ARRAY
    


    Array.prototype.containsSubString = function( text ){
        for ( var i = 0; i < this.length; ++i )
        {
            if ( this[i].toString().indexOf( text ) != -1 )
                return i;
        }
        return -1;
    }

    */


    var __animator__runtimeCSS = [];

    var __pref__;

    var __css3Prefix__ = function () {
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


    var Animator = function ( target, elemClass ) { 
        var me = this ;
        me.target = target ;
        me.ID = 0 ;
        me.elemClass = elemClass ;
        me.prevDelay = 0 ;
        me.animations = [] ;
        me.cssRules = "" ;
        me.init() ;
    }


    Animator.prototype.init = function () {
        if ( !__pref__ ) __pref__ = __css3Prefix__( ) ;
        if ( !__animator__runtimeCSS[ 0 ] ) __animator__runtimeCSS[ 0 ] = $( 'style' ).text( ) ;
        if ( this.targetSetup() ) {
            Animator.prototype.totInstances ++ ;
            this.ID = this.totInstances;
            return true
        }
    }


    Animator.prototype.targetSetup = function () {
        var el = this.target ;
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


    Animator.prototype.animate = function ( target, x, y, r, s, o, blur, duration, ease ) {
        var me = this
        ,   name = me.elemClass + me.animations.length
        ,   delay = me.prevDelay
        ,   el = $( target ).get(0).attributes 
        ,   currX = el[ 'left' ].value
        ,   currY = el[ 'top' ].value
        ,   currR = el[ 'rotation' ].value
        ,   currS = el[ 'scale' ].value
        ,   currO = el[ 'opacity' ].value
        ,   currB = el[ 'blur' ].value
        ,   ease = ease ;

        if( blur != -1 ){
            var blurFilterFrom = __pref__ + 'filter: blur(' + currB + 'px);'
            ,   blurFilterTo = __pref__ + 'filter: blur(' + blur + 'px);' ;
        }else{
            var blurFilterFrom = ''
            ,   blurFilterTo = '' ;
        }

        $( target ).attr( {
                'left'      : x 
            ,   'top'       : y 
            ,   'rotation'  : r 
            ,   'scale'     : s 
            ,   'opacity'   : o 
            ,   'blur'      : blur
        } ) ;

        if ( me.create( name, '@' + __pref__ + 'keyframes ' + name + '{from{ opacity: ' + currO + ' ; ' + __pref__ + 'transform: translateX(' + currX + 'px) translateY(' + currY + 'px) rotate(' + currR + 'deg) scale(' + currS + '); }to{ opacity: ' + o + ' ; ' + __pref__ + 'transform: translateX(' + x + 'px) translateY(' + y + 'px) rotate(' + r + 'deg) scale(' + s + '); ' + blurFilterTo + ' }}.' + name + '{' + __pref__ + 'animation-name:' + name + ';' + __pref__ + 'animation-duration:' + duration + 's;    ' + __pref__ + 'animation-fill-mode: both; ' + __pref__ + 'animation-timing-function: ' + ease + ';}' )) {
            setTimeout( function() {

                $( target ).addClass( name ) ;

                $( target ).attr( { 
                        'left'      : x
                    ,   'top'       : y
                    ,   'rotation'  : r
                    ,   'scale'     : s
                    ,   'opacity'   : o
                    ,   'blur'      : blur
                } ) ;
            }, delay * 1000 ) ;

            setTimeout( function() {
                $( target ).removeClass( name ) ;
                $( target ).css( __pref__ + 'transform', 'translateX(' + x + 'px) translateY(' + y + 'px) scale(' + s + ', ' + s + ') rotate(' + r + 'deg)' ) ;
                if( blurFilterTo != '' ){
                    $( target ).css( __pref__ + 'filter', 'blur(' + blur + 'px)' ) ;
                }
                $( target ).css( 'opacity', o ) ;
            }, ( delay * 1000 ) + ( duration * 1000 ) ) ;
        }
        me.prevDelay += duration ;
    }


    Animator.prototype.create = function ( elemClass, value ) { 
        this.animations.push({'name':elemClass, 'value':value + '\n\n'} ) ;
        if ( this.update() )
        {
            return true
        }
    }

    /*

    Animator.prototype.clear = function () {
        this.animations = [];
        $( 'style' ).text(__animator__runtimeCSS[ 0 ] ) ;
        return true;
    }


    Animator.prototype.clean = function ( name ) {
        var css3 = $( 'style' ).text() ;
        var idToRemove = __animator__runtimeCSS.containsSubString( name ) ;
        var stringToRemove = __animator__runtimeCSS[ idToRemove ] ;
        css3 = css3.replace( stringToRemove, '' ) ;
        $( 'style' ).text( css3 );
        __animator__runtimeCSS.splice( idToRemove );
    }

    */

    Animator.prototype.update = function () {
        var styles = "", css3 = "";
        for( var x = 0 ; x < this.animations.length ; x += 1 )
        {
            styles += this.animations[ x ].value ;
        }
        __animator__runtimeCSS[ this.ID ] = styles ;
        for( var y = 0 ; y < __animator__runtimeCSS.length ; y += 1 )
        {
            css3 += __animator__runtimeCSS[ y ] ;
        }
        $( 'style' ).text( css3 ) ;
        return true
    }


    Animator.prototype.totInstances = 0 ;

} else {
    console.log( "\n####################################################################################\n#  Sorry! This browser is not supported! Try to update or change to a good one ;)  #\n####################################################################################" ) ;
}

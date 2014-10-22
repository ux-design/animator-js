"use strict"


var browserIsCompatible = function () {
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
        b = agent.indexOf( name ) ;
        v = agent.substring( name.length + b + 1, name.length + b + 3 ) ;
        v = v.replace( ".", "" ) ;
        if( v >= 4 ) return true ;
    }

    name = "Firefox" ;
    if ( agent.match( /Firefox/i ) ) {
        b = agent.indexOf( name ) ;
        v = agent.substring( name.length + b + 1, name.length + b + 3 ) ;
        v = v.replace( ".", "" ) ;
        if( v >= 17 ) return true ;
    }
    name = "Version" ;
    if ( agent.match( /Safari/i ) ) {
        b = agent.indexOf( name ) ;
        v = agent.substring( name.length + b + 1, name.length + b + 3 ) ;
        v = v.replace( ".", "" ) ;
        if( v >= 4 ) return true ;
    }
    return false ;
}

if ( browserIsCompatible() ) {

    /*
    ADD ARRAY MOTHOD TO FIND SUSTRING IN ARRAY
    


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

    var css3Prefix = function () {
        var a = 0, prefix ;
        if ( 'transform' in document.body.style )            { a ++ ; prefix = '' ;            } ; 
        if ( '-webkit-transform' in document.body.style )    { a ++ ; prefix = '-webkit-' ;    } ; 
        if ( '-moz-transform' in document.body.style )       { a ++ ; prefix = '-moz-' ;       } ; 
        if ( '-o-transform' in document.body.style)          { a ++ ; prefix = '-o-' ;         } ; 
        if ( '-ms-transform' in document.body.style)         { a ++ ; prefix = '-ms-' ;        } ; 
        if ( a > 0 ) { a = 1 ; }
        return prefix ; 
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
        if ( !__pref__ ) {
            __pref__ = css3Prefix( ) ;
        }
        if ( !__animator__runtimeCSS[ 0 ] ) {
            __animator__runtimeCSS[ 0 ] = $( 'style' ).text( ) ;
        }
        if ( this.targetSetup() ) {
            Animator.prototype.totInstances ++ ;
            this.ID = this.totInstances;
            return true;
        };
    }


    Animator.prototype.targetSetup = function () {
        var me = this ;
        $( me.target ).attr( 'left', $( me.target ).position().left ) ;
        $( me.target ).attr( 'top', $( me.target ).position().top ) ;
        $( me.target ).attr( 'scale', 1 ) ;
        $( me.target ).attr( 'rotation', 0 ) ;
        $( me.target ).attr( 'opacity', $( me.target ).css( 'opacity' ) ) ;
        return true;
    }


    Animator.prototype.animate = function ( target, x, y, r, s, o, duration, ease ) {
        var me = this ;
        var name = me.elemClass + me.animations.length ;
        var delay = me.prevDelay;
        var currX = $( target ).attr( 'left' ) ;
        var currY = $( target ).attr( 'top' ) ;
        var currR = $( target ).attr( 'rotation' ) ;
        var currS = $( target ).attr( 'scale' ) ;
        var currO = $( target ).attr( 'opacity' ) ;
        var ease = ease ;
        $( target ).attr( 'left', x ) ;
        $( target ).attr( 'top', y ) ;
        $( target ).attr( 'rotation', r ) ;
        $( target ).attr( 'scale', s ) ;
        $( target ).attr( 'opacity', o ) ;
        if ( me.create( name, '@' + __pref__ + 'keyframes ' + name + '{from{ opacity: ' + currO + ' ; ' + __pref__ + 'transform: translateX( ' + currX + 'px ) translateY( ' + currY + 'px ) rotate( ' + currR + 'deg) scale( ' + currS + ') }to{ opacity: ' + o + ' ; ' + __pref__ + 'transform: translateX( ' + x + 'px ) translateY( ' + y + 'px ) rotate( ' + r + 'deg) scale( ' + s + ') }}.' + name + '{' + __pref__ + 'animation-name:' + name + ';' + __pref__ + 'animation-duration:' + duration + 's;    ' + __pref__ + 'animation-fill-mode: both; ' + __pref__ + 'animation-timing-function: ' + ease + ';}' )) {
            setTimeout( function() {
                $( target ).addClass( name ) ;
                $( target ).attr( 'left', x ) ;
                $( target ).attr( 'top', y ) ;
                $( target ).attr( 'rotation', r ) ;
                $( target ).attr( 'scale', s ) ;
                $( target ).attr( 'opacity', o ) ;
            }, delay * 1000 ) ;

            setTimeout( function() {
                $( target ).removeClass( name ) ;
                $( target ).css( __pref__ + 'transform', 'translateX(' + x + 'px) translateY(' + y + 'px) scale(' + s + ', ' + s + ') rotate(' + r + 'deg)' ) ;
                $( target ).css( 'opacity', o ) ;
            }, ( delay * 1000 ) + ( duration * 1000 ) ) ;
        }
        me.prevDelay += duration ;
    }


    Animator.prototype.create = function ( elemClass, value ) { 
        this.animations.push({'name':elemClass, 'value':value + '\n\n'} ) ;
        if ( this.update() )
        {
            return true;
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
        return true ;
    }


    Animator.prototype.totInstances = 0 ;

} else {
    console.log( "\n####################################################################################\n#  Sorry! This browser is not supported! Try to update or change to a good one ;)  #\n####################################################################################" ) ;
}

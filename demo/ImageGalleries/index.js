main();

function main() {
    var data = data;
    addPhotos();
}

// 1.翻转控制
function turn( elem ) {
    var cls = elem.className;
    var n = elem.id.split( '_' )[ 1 ];
    var elem_nav = g( '#nav_' + n );

    if ( !/photo\-center/.test( cls ) ) {
        return rsort( n );
    }

    if ( /photo\-front/.test( cls ) ) {
        cls = cls.replace( /photo\-front/, 'photo-back' );
        elem_nav.className += ' i-back';
    } else {
        cls = cls.replace( /photo\-back/, 'photo-front' );
        elem_nav.className = elem_nav.className.replace( /\s*i\-back\s*/, ' ' );
    }

    return elem.className = cls;
}

// 2.改写模版

// 3.通用函数
function g( selector ) {
    var method = selector.substr( 0, 1 ) == '.' ? 'getElementsByClassName' : 'getElementById';
    return document[ method ]( selector.substr( 1 ) );
}

// 4.输出所有的海报
function addPhotos() {
    var ele = g( '#wrap' );
    var template = ele.innerHTML;
    var html = [];
    var nav = [];

    for ( s in data ) {
        var _html = template
            .replace( 'my-src', 'src' )
            .replace( '{{index}}', s )
            .replace( '{{img}}', data[ s ].img )
            .replace( '{{caption}}', data[ s ].caption )
            .replace( '{{desc}}', data[ s ].desc );

        html.push( _html );
        nav.push( '<span id="nav_' + s + '" class="i" onclick="turn(g(\'#photo_' + s + '\'))"></span>' );
    }
    html.push( '<div class="nav">' + nav.join( '' ) + '</div>' );
    ele.innerHTML = html.join( '' );
    rsort( random( [ 0, data.length - 1 ] ) );
}

// 5.排序海报
function rsort( n ) {
    var _photo = g( '.photo' );
    var photos = [];

    for ( var s = 0; s < _photo.length; s++ ) {
        _photo[ s ].className = _photo[ s ].className.replace( /\s*photo\-center\s*/, ' ' );
        _photo[ s ].className = _photo[ s ].className.replace( /\s*photo\-front\s*/, ' ' );
        _photo[ s ].className = _photo[ s ].className.replace( /\s*photo\-back\s*/, ' ' );
        _photo[ s ].className += ' photo-front';

        _photo[ s ].style.left = '';
        _photo[ s ].style.top = '';
        _photo[ s ].style[ '-webkit-transform' ] = 'rotate(0deg) scale(1.3)';

        photos.push( _photo[ s ] );
    }

    // var photo-center = g( '#photo_' + n );
    var photo_center = photos.splice( n, 1 )[ 0 ];
    photo_center.className += ' photo-center';

    // 把海报分为左、右区域
    var photos_left = photos.splice( 0, Math.ceil( photos.length / 2 ) );
    var photos_right = photos;

    var ranges = range();

    for ( s in photos_left ) {
        var photo = photos_left[ s ];
        // photo.style.left = random( ranges.left.x ) + 'px';
        // photo.style.top = random( ranges.left.y ) + 'px';

        photo.style[ '-webkit-transform' ] = 'translate3d('+random( [-600, 600] )+'px,'+random( [-300, 300] )+'px, 0px) rotate(' + random( [ -150, 150 ] ) + 'deg) scale(1)';
    }
    for ( s in photos_right ) {
        var photo = photos_right[ s ];
        // photo.style.left = random( ranges.right.x ) + 'px';
        // photo.style.top = random( ranges.right.y ) + 'px';

        photo.style[ '-webkit-transform' ] = 'translate3d('+random( [-600, 600] )+'px,'+random( [-300, 300] )+'px, 0px) rotate(' + random( [ -150, 150 ] ) + 'deg) scale(1)';
    }
    
    // 控制按钮处理
    var navs = g( '.i' );
    for ( var s = 0; s < navs.length; s++ ) {
        navs[ s ].className = 'i';
    }
    g( '#nav_' + n ).className += ' i-current ';
}

// 6.随机生成一个取值范围，random(min, max);
function random( range ) {
    var min = Math.min( range[ 0 ], range[ 1 ] );
    var max = Math.max( range[ 0 ], range[ 1 ] );
    var diff = max - min; // 差值
    return Math.ceil( Math.random() * diff ) + min;
}

// 7.计算左右分区的范围 { left:{ x: [min, max], y:[]}, right: {}}
function range() {
    var range = {
        left: {
            x: [],
            y: []
        },
        right: {
            x: [],
            y: []
        }
    }

    var wrap = {
        w: g( '#wrap' ).clientWidth,
        h: g( '#wrap' ).clientHeight
    }
    var photo = {
        w: g( '.photo' )[ 0 ].clientWidth,
        h: g( '.photo' )[ 0 ].clientHeight
    }

    // range.wrap = wrap;
    // range.photo = photo;
    console.log()
    range.left.x = [ 0 - photo.w, ( wrap.w - photo.w ) / 2 ];
    range.left.y = [ 0 - photo.h, wrap.h ];

    range.right.x = [ wrap.w / 2 + photo.w / 2, wrap.w + photo.w ];
    range.right.y = range.left.y;

    return range;
}

// 8.计算圆形分区的范围
function circleRange() {
    
}

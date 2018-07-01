export const mycanvas = () => {
    let c;

    let ctx;

    let xsize = 16.5;
    let ysize = 25;
    let cw = 10;
    let ch = 10;
    let printchr = 'X';
    let cells = [];

    this.initialize = function() {
        c = document.getElementById("myCanvas");
        ctx = c.getContext("2d");
        ctx.font = "30px Consolas";         
    };

    function isEmpty(obj) {
        return ! obj || Object.keys(obj).length === 0;
    }

    const Point = (x,y) => {
        return {
            x,
            y
        }
    }


    this.action = function({cmd, x1, y1, x2, y2, x, y, c, w, h } = {}) {
        if (x1 > x2)
            throw new Error('x1 cannot be more than x2');
        if (y1 > y2)
            throw new Error('y1 cannot be more than y2');

        switch (cmd) {
            case 'C':
                create(w, h);
                break;  

            case 'L':
                line(x1, y1, x2, y2);
                break;

            case 'R':
                rectangle(x1, y1, x2, y2);
                break;  

            case 'B':
                block(x, y, c);
                break;

            case 'Q':
                //window.close();
                // Quit is unimplemented
                break;


            default:
                throw new Error('unknown command');
        }
        
    }



    function create(w, h) {
        c.width = w * xsize ;
        c.height = h * ysize ;
        ctx.font = "30px Consolas"; 
        cw = w;
        ch = h;
    }


    function line(x1, y1, x2, y2) {

        if (y1 === y2)
            hline(y1, x1, x2) ;
        else if  (x1 === x2)
            vline(x1, y1, y2) ;
        else
            throw new Error('Either x axis should be same or y axis should be same');

    }

    function hline(y1, x1, x2) {

        for (let index = x1; index <= x2; index++) {
            point(index, y1);

        
        }    
    }

    function vline(x1, y1, y2) {
        for (let index = y1; index <= y2; index++) {
            point(x1, index);

        }
    }

    function point(x, y, c) {
            if (x < 1)
                throw new Error('x axis cannot be less than 1');
            else if (x > cw)
                throw new Error('x axis cannot be more than the canvas width ' + cw);
            else if (y < 1)
                throw new Error('y axis cannot be less than 1');
            else if (y > ch)
                throw new Error('y axis cannot be more than the canvas height ' + ch);


            ctx.fillText( c || printchr ,    (x * xsize) ,     (y *ysize) ); 
            let p = new Point(x, y);
            cells.push(p);
    }

    function rectangle(x1, y1, x2, y2) {
        hline(y1, x1, x2);
        hline(y2, x1, x2);
        vline(x1, y1+1, y2-1);
        vline(x2, y1+1, y2-1);
    }

    function block(x, y, c) {

        function up(y) {
            if (1 === y) return;
            y--;
            block(x, y, c);
        }

        function down(y) {
            if (ch === y) return;
            y++;
            block(x, y, c);
        }

        function left(x) {
            if (1 === x) return;
            x--;
            block(x, y, c);
        }

        function right(x) {
            if (cw === x) return;
            x++;
            block(x, y, c);
        }    
        
        let found = cells.filter(e => e.x === x && e.y === y);
        if (isEmpty(found)) {
            point(x, y, c);
            let upy = y;
            let downy = y;
            let leftx = x;
            let rightx = x;
            up(upy);
            down(downy);
            left(leftx);
            right(rightx);
        }

    }

    return this;



};
let me = mycanvas();
me.initialize();


me.action({
    cmd : 'C', 
    w : 20, 
    h : 4
});


me.action({
    cmd : 'L', 
    x1 : 1, 
    y1 : 2,
    x2 : 6, 
    y2 : 2
});

me.action({
    cmd : 'L', 
    x1 : 6, 
    y1 : 3,
    x2 : 6, 
    y2 : 4
});

me.action({
    cmd : 'R', 
    x1 : 14, 
    y1 : 1,
    x2 : 18, 
    y2 : 3
});

me.action({
    cmd : 'B', 
    x : 10, 
    y : 3,
    c : 'o'
});

me.action({
    cmd : 'Q'
});


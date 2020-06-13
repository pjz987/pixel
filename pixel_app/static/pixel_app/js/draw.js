var colorDiv = {
    props: ['color'],
    template: `<div class="swatch" :id="color.id" :style="styling" @click="$emit('choose-active-color', color)">
    </div>`,
    computed: {
        styling: function() {
            return {
                background: this.color,
            };
        },
    },
};

var app = new Vue({
    el: '#app',

    data: {
        activeColor: 'white',
        pixelsString: '',
        increment: 50,
    },

    computed: {
        colors: function() {
            return JSON.parse(document.querySelector('#colors').textContent).colors;
        },
        gridArr: function() {
            console.log('gridarr')
            let inc = parseInt(this.increment)
            // let inc = 50
            let gridArr = []
            let cnv = document.querySelector('canvas');
            for(let x=0; x<cnv.width; x+=inc) {
                for (let y=0; y<cnv.height; y+=inc) {
                    let gridObj = {
                        x: x,
                        y: y,
                        color: 'white'
                    };
                    gridArr.push(gridObj);
                };
            };
            return gridArr
        }
    },

    mounted() {
        let cnv = document.querySelector('canvas');
        let ctx = cnv.getContext('2d');
        this.ctx = ctx;
        this.w = cnv.width;
        this.h = cnv.height;
        this.ctx.clearRect(0, 0, this.w, this.h);
        this.stroke();
        // this.gridArr = []
    },

    components: {
        'color-div': colorDiv,
    },

    methods: {
        fill: function() {
            this.ctx.clearRect(0, 0, this.w, this.h);
            this.ctx.fillStyle = this.activeColor;
            this.ctx.fillRect(0, 0, this.w, this.h);
            this.stroke();
        },

        stroke: function() {
            // this.ctx.clearRect(0, 0, this.w, this.h)
            let inc = parseInt(this.increment)

            for (let x=inc; x<this.w; x+=inc) {
                this.ctx.beginPath();
                this.ctx.moveTo(x, 0);
                this.ctx.lineTo(x, this.h);
                this.ctx.stroke();
            };
            for (let y=inc; y<this.h; y+=inc) {
                this.ctx.beginPath();
                this.ctx.moveTo(0, y);
                this.ctx.lineTo(this.w, y);
                this.ctx.stroke();
            };
        },

        testFunc: function(color) {
            console.log(color)
        },

        chooseActiveColor: function(color) {
            console.log(color)
            this.activeColor = color;
        },

        alertXY: function(event) {
            console.log(event.offsetX, event.offsetY);
        },

        colorPixel: function(event) {
            console.log(this.gridArr)
            let inc = parseInt(this.increment)
            console.log(event)
            let x = event.offsetX;
            let y = event.offsetY;
            console.log(x, y)
            for (let i=0; i<this.gridArr.length; i++) {
                // console.log(i)
                let pixel = this.gridArr[i];
                console.log(pixel)
                if (x >= pixel.x
                    && x < pixel.x + inc
                    && y >= pixel.y
                    && y < pixel.y + inc) {
                    pixel.color = this.activeColor;
                    console.log(this.gridArr)
                    // console.log(this.activeColor)
                    break
                };
            };
            this.fillPixels();
            this.pixelsString = JSON.stringify(this.gridArr);
        },

        fillPixels: function() {
            // console.log('hey')
            this.ctx.clearRect(0, 0, this.w, this.h);
            let inc = parseInt(this.increment)
            for (let i=0; i<this.gridArr.length; i++) {
                let pixel = this.gridArr[i];
                if (pixel.color) {
                    this.ctx.fillStyle = pixel.color;
                    this.ctx.fillRect(pixel.x, pixel.y, inc, inc);
                    // console.log(pixel.color)
                }
            };
            this.stroke();  
        },

        // makeGridArr: function() {
        //     let newGridArr = []
        //     let cnv = document.querySelector('canvas');
        //     for(let x=0; x<cnv.width; x+=this.increment) {
        //         for (let y=0; y< cnv.height; y+=this.increment) {
        //             let gridObj = {
        //                 x: x,
        //                 y: y,
        //                 color: 'white'
        //             };
        //             newGridArr.push(gridObj);
        //         };
        //     };
        //     this.gridArr = newGridArr;
        // },

        // changeInc: function() {
        //     // this.makeGridArr();
        //     this.stroke();
        // }
    },
});
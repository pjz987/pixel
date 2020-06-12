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
    },

    computed: {
        colors: function() {
            return JSON.parse(document.querySelector('#colors').textContent).colors;
        },
        gridArr: function() {
            let gridArr = []
            let cnv = document.querySelector('canvas');
            for(let x=0; x<cnv.width; x+=50) {
                for (let y=0; y< cnv.height; y+=50) {
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
            for (let x=50; x<this.w; x+=50) {
                this.ctx.beginPath();
                this.ctx.moveTo(x, 0);
                this.ctx.lineTo(x, this.h);
                this.ctx.stroke();
            };
            for (let y=50; y<this.h; y+=50) {
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
            let x = event.offsetX;
            let y = event.offsetY;
            for (let i=0; i<this.gridArr.length; i++) {
                let pixel = this.gridArr[i];
                if (x >= pixel.x
                    && x < pixel.x + 50
                    && y >= pixel.y
                    && y < pixel.y + 50) {
                    pixel.color = this.activeColor;
                    break
                };
            };
            this.fillPixels();
            this.pixelsString = JSON.stringify(this.gridArr);
        },
        fillPixels: function() {
            for (let i=0; i<this.gridArr.length; i++) {
                let pixel = this.gridArr[i];
                if (pixel.color) {
                    this.ctx.fillStyle = pixel.color;
                    this.ctx.fillRect(pixel.x, pixel.y, 50, 50);
                }
            };
            this.stroke();  
        },
    },
});
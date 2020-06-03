// let ctx = document.querySelector('canvas').getContext('2d');
let w = 500;
let h = 500;

var colorDiv = {
    props: ['color'],
    template: `<div>
        <span>
        {{ color }}
        </span>
        <div class="swatch" :id="color.id" :background="color" :style="styling">
        <input :name="color.id" :value="color">
        </input>
        </div>
    </div>`,
    computed: {
        styling: function() {
            return {
                background: this.color,
            }
        },
    },
};

var app = new Vue({

    el: '#app',

    data: {
        color: 'color',
        colors: [],
    },

    components: {
        'color-div': colorDiv,
    },

    methods: {
        colorCanvas: function() {
            // this.ctx.fillStyle = this.color;
            // this.ctx.fillRect(0, 0, w, h);
            if (this.colors.includes(this.color) == false) {
                this.colors.push(this.color);
                this.colorPattern();
            };
        },

        saveColor: function() {
        },

        colorPattern: function() {
            this.ctx.clearRect(0, 0, this.w, this.h);
            for (let y=0; y<this.h; y+=25) {
                for (let x=0; x<this.w; x+=25) {
                    let color = this.colors[Math.floor(Math.random() * this.colors.length)];
                    this.ctx.fillStyle = color;
                    this.ctx.beginPath();
                    this.ctx.fillRect(x, y, 25, 25);
                };
            };
        },
    },

    mounted() {
        let cnv = document.querySelector('canvas');
        let ctx = cnv.getContext('2d');
        this.ctx = ctx;
        this.w = cnv.width;
        this.h = cnv.height;
    }

});

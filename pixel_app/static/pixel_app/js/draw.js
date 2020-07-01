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
        increment: 5,
        drawing: false,
        quadrant: 0,
        // inPixels: JSON.parse(document.querySelector('#pixels_str').textContent),
    },

    computed: {
        colors: function() {
            return JSON.parse(document.querySelector('#colors').textContent).colors;
        },

        inPixels: function() {
            return JSON.parse(document.querySelector('#pixels_str').textContent);
        },

        tempArr: function() {
            let inc = parseInt(this.increment);
            if (this.quadrant) {
                inc *= 2;
            }
            let tempArr = [];
            for (let x=0; x<this.w; x+=inc) {
                for (let y=0; y<this.h; y+=inc) {
                    let tempObj = {
                        x: x,
                        y: y,
                    };
                    tempArr.push(tempObj);
                };
            };
            return tempArr;
        },
    },

    mounted() {
        let cnv = document.querySelector('canvas');
        let ctx = cnv.getContext('2d');
        this.ctx = ctx;
        this.w = cnv.width;
        this.h = cnv.height;
        this.ctx.clearRect(0, 0, this.w, this.h);
        this.stroke();
        // this.inPixels = JSON.parse(document.querySelector('#pixels_str').textContent)

        // this.inPixels = JSON.parse(document.querySelector('#pixels_str').textContent);

        if (this.inPixels) {
            console.log('abc')
            console.log(this.inPixels)
            this.gridArr = this.inPixels.pixels;
        } else {
            console.log('123')
            let inc = parseInt(this.increment)
            // let inc = 50
            let gridArr = []
            let cnv = document.querySelector('canvas');
            for(let x=0; x<cnv.width; x+=inc) {
                for (let y=0; y<cnv.height; y+=inc) {
                    let q;
                    if (y < this.h / 2) {
                        if (x >= this.w / 2) {
                            q = 1;
                        } else {
                            q = 2;
                        };
                    } else {
                        if (x < this.w / 2) {
                            q = 3;
                        } else {
                            q = 4;
                        };
                    };
                    let gridObj = {
                        x: x,
                        y: y,
                        // color: 'black',
                        color: 'white',
                        q: q,
                    };
                    if (gridObj.q === 1) {
                        gridObj.qX = (gridObj.x - this.w / 2) * 2;
                        gridObj.qY = gridObj.y * 2;
                    } else if (gridObj.q === 2) {
                        gridObj.qX = gridObj.x * 2;
                        gridObj.qY = gridObj.y * 2;
                    } else if (gridObj.q === 3) {
                        gridObj.qX = gridObj.x * 2;
                        gridObj.qY = (gridObj.y - this.h / 2) * 2;
                    } else if (gridObj.q === 4) {
                        gridObj.qX = (gridObj.x - this.w / 2) * 2;
                        gridObj.qY = (gridObj.y - this.h / 2) * 2;
                    }
                    gridArr.push(gridObj);
                };
            };
            this.gridArr = gridArr
        };

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
            let inc = parseInt(this.increment);
            if (this.quadrant) {
                inc *= 2;
            };
            // this.ctx.strokeStyle = 'white';

            this.ctx.lineWidth = 0.5;

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

            // // six circles
            // for (let i=0; i<6; i++) {
            //     this.ctx.beginPath();
            //     if (!(this.quadrant)) {
            //         this.ctx.arc(250, 250, 250 - i * 40, 0, 2*Math.PI);
            //     } else {
            //         if (this.quadrant === 1) {
            //             this.ctx.arc(0, 500, 500 - i * 80, 0, 2*Math.PI);
            //         } else if (this.quadrant === 2) {
            //             this.ctx.arc(500, 500, 500 - i * 80, 0, 2*Math.PI);
            //         } else if (this.quadrant === 3) {
            //             this.ctx.arc(500, 0, 500 - i * 80, 0, 2*Math.PI);
            //         } else if (this.quadrant === 4) {
            //             this.ctx.arc(0, 0, 500 - i * 80, 0, 2*Math.PI);
            //         }
            //     }
            //     this.ctx.stroke();
            // }

            // // horiz rule
            // let ruleArrHor = [
            //     (1/3) * this.h,
            //     (2/3) * this.h,
            // ];
            // for (let i=0; i<ruleArrHor.length; i++) {
            //     this.ctx.beginPath();
            //     this.ctx.moveTo(0, ruleArrHor[i]);
            //     this.ctx.lineTo(this.w, ruleArrHor[i]);
            //     this.ctx.stroke();
            // }

            // // vert rule
            // let ruleArrVert = [
            //     (1/6) * this.w,
            //     (2/6) * this.w,
            //     (3/6) * this.w,
            //     (4/6) * this.w,
            //     (5/6) * this.w,
            // ];
            // for (let i=0; i<ruleArrVert.length; i++) {
            //     this.ctx.beginPath();
            //     this.ctx.moveTo(ruleArrVert[i], 0);
            //     this.ctx.lineTo(ruleArrVert[i], this.h);
            //     this.ctx.stroke();
            // }

            // // four circles
            // let circArr = [
            //     {x: 127, y: 345, r: 123},
            //     {x: 234, y: 123, r: 87},
            //     {x: 343, y: 356, r: 134},
            //     {x: 394, y: 89, r: 45},
            // ]
            // for (let i=0; i<circArr.length; i++) {
            //     let circ = circArr[i];
            //     this.ctx.beginPath();
            //     this.ctx.arc(circ.x, circ.y, circ.r, 0, 2*Math.PI);
            //     this.ctx.stroke();
            // }

            // // one circle
            // this.ctx.beginPath();
            // this.ctx.arc(250, 250, 200, 0, 2*Math.PI);
            // this.ctx.stroke();

            // // drawing a circle for practice
            // for(let i=1; i<8; i++) {
            //     this.ctx.beginPath();
            //     this.ctx.arc(250, 250, 250*(i/7), 0, 2*Math.PI);
            //     this.ctx.stroke();
            // };

            // // rainbow here
            // for(let i=0; i<7; i++) {
            //     console.log(i)
            //     this.ctx.beginPath();
            //     this.ctx.arc(250, 625, 500 - i * 20, 0, 2*Math.PI);
            //     this.ctx.stroke();
            // };

            // // mountain landscape
            // let mountArr = [[125, 195], [375, 195]]
            // for (let i=0; i<mountArr.length; i++) {
            //     let x = mountArr[i][0];
            //     let y = mountArr[i][1];
            //     // console.log(mountArr[i])
            //     // console.log('mountain', x, y)
            //     this.ctx.beginPath();
            //     this.ctx.moveTo(x, y);
            //     this.ctx.lineTo(x - Math.abs(y - this.h), this.h);
            //     this.ctx.lineTo(x + Math.abs(y - this.h), this.h);
            //     this.ctx.closePath();
            //     this.ctx.stroke();

            //     this.ctx.beginPath();
            //     this.ctx.moveTo(x - 50, y + 50);
            //     this.ctx.lineTo(x + 50, y + 50);
            //     this.ctx.stroke();

            // }

            // this.ctx.beginPath();
            // this.ctx.arc(275, 225, 75, 0, 2*Math.PI);
            // this.ctx.stroke();

            // for (let i=0; i<100; i++) {
            //     let x = Math.random()*this.w
            //     let y = Math.random()*320
            //     this.ctx.beginPath();
            //     this.ctx.arc(x, y, 5, 0, 2*Math.PI);
            //     this.ctx.stroke();
            // }

            // // rainbow arc
            // for (let i=0; i<8; i++) {
            //     this.ctx.beginPath();
            //     this.ctx.arc(500, 500, 500 - i*20, 0, 2*Math.PI);
            //     this.ctx.stroke();
            // }

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
            if (this.drawing === true) {
                let inc = parseInt(this.increment)
                let x = event.offsetX;
                let y = event.offsetY;
                for (let i=0; i<this.gridArr.length; i++) {
                    let pixel = this.gridArr[i];
                    if (x >= pixel.x
                        && x < pixel.x + inc
                        && y >= pixel.y
                        && y < pixel.y + inc) {
                        pixel.color = this.activeColor;
                        // break
                    };
                };
                this.fillPixels();
                this.pixelsString = JSON.stringify(this.gridArr);
            }
        },

        colorPixel2: function(event) {
            if (this.drawing === true) {
                let inc = parseInt(this.increment);
                if (this.quadrant) {
                    inc *= 2;
                };
                let eventX = event.offsetX;
                let eventY = event.offsetY;

                for (let i=0; i<this.tempArr.length; i++) {
                    let tempPixel = this.tempArr[i];
                    if (eventX >= tempPixel.x
                        && eventX < tempPixel.x + inc
                        && eventY >= tempPixel.y
                        && eventY < tempPixel.y + inc) {

                            for (let j=0; j<this.gridArr.length; j++) {
                                let pixel = this.gridArr[j];
                                if (!(this.quadrant)) {
                                    if (pixel.x >= tempPixel.x
                                        && pixel.x < tempPixel.x + inc
                                        && pixel.y >= tempPixel.y
                                        && pixel.y < tempPixel.y + inc) {
                                            pixel.color = this.activeColor;
                                        };
                                } else {
                                    if (pixel.q === this.quadrant) {
                                        if (pixel.qX >= tempPixel.x
                                            && pixel.qX < tempPixel.x + inc
                                            && pixel.qY >= tempPixel.y
                                            && pixel.qY < tempPixel.y + inc) {
                                                pixel.color = this.activeColor;
                                            };
    
                                    }
                                };
                            };
                            break
                        };
                };
                this.fillPixels2();
                this.pixelsString = JSON.stringify(this.gridArr);
            };
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

        fillPixels2: function() {
            this.ctx.clearRect(0, 0, this.w, this.h);
            let inc = parseInt(this.increment);
            if (this.quadrant) {
                inc *= 2;
            }
            // console.log(inc)

            for (let i=0; i<this.gridArr.length; i++) {
                let pixel = this.gridArr[i];
                this.ctx.fillStyle = pixel.color;

                if (!(this.quadrant)) {
                    this.ctx.fillRect(pixel.x, pixel.y, inc, inc);

                } else {
                    // inc *= 2;
                    if (this.quadrant === pixel.q) {
                        this.ctx.fillRect(pixel.qX, pixel.qY, inc, inc)
                    };
                    
                    // if (this.quadrant === 1 && pixel.q === 1) {
                    //     this.ctx.fillRect((pixel.x - (this.w / 2)) * 2, pixel.y * 2, inc, inc);

                    // } else if (this.quadrant === 2 && pixel.q === 2) {
                    //     this.ctx.fillRect(pixel.x*2, pixel.y*2, inc, inc);
                    // } else if (this.quadrant === 3 && pixel.q === 3) {
                    //     this.ctx.fillRect(pixel.x*2, (pixel.y - this.h / 2) *2, inc, inc);
                    // } else if (this.quadrant === 4 && pixel.q === 4) {
                    //     this.ctx.fillRect((pixel.x - this.w/2)*2, (pixel.y - this.h/2)*2, inc, inc);
                    // };
                };
            };
            this.stroke();
        },

        wheelTest: function(e) {
            e.preventDefault();
            // console.log(e.offsetY)
            // console.log('wheel');
            // console.log(e.deltaY);
            // console.log(e)
            let x = e.offsetX;
            let y = e.offsetY;
            if (e.deltaY < 0) {
                if (x >= this.w / 2
                    && y <= this.h / 2) {
                        this.quadrant = 1;
                } else if (x <= this.w / 2
                    && y <= this.h / 2) {
                        this.quadrant = 2;
                } else if (x <= this.w / 2
                    && y >= this.h / 2) {
                        this.quadrant = 3;
                } else if (x >= this.w / 2
                    && y>= this.h / 2) {
                        this.quadrant = 4;
                };
            } else {
                this.quadrant = 0;
            };
            console.log(this.quadrant);
            this.fillPixels2();
        },
    },
});
<template>
  <div class="circle-progress">
    <canvas id="bg">当前浏览器不支持Canvas组件，请更换浏览器重试</canvas>
    <canvas id="circle">当前浏览器不支持Canvas组件，请更换浏览器重试</canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ctx: null,
      ctxBG: null,
      ratio: 1,
      startAngle: 1.5 * Math.PI, // 开始弧度
      xAngle: 6 * (Math.PI / 180), // 偏移角度量
      tmpAngle: 1.5 * Math.PI
    };
  },
  props: {
    // 进度圆环尺寸
    diameter: {
      type: Number,
      default: 200,
      validator: value => value > 0
    },
    // 线条宽度
    lineWidth: {
      type: Number,
      default: 10,
      validator: value => value > 0
    },
    // 进度值
    percent: {
      type: Number,
      default: 0.6
    },
    fontSize: {
      type: Number,
      default: 60
    },
    // 线条颜色
    strokeStyle: {
      type: String,
      default: "#87db48"
    },
    // 背景色
    bgStrokeStyle: {
      type: String,
      default: "rgba(0, 0, 0, .05)"
    },
    lineCap: {
      type: String,
      default: "round"
    },
    text: {
      type: String,
      default: ""
    }
  },
  computed: {
    // 元素中心
    r() {
      return this.diameter / 2;
    },
    // 圆半径
    cR() {
      return this.r - this.lineWidth / 2;
    },
    // 结束弧度
    endAngle() {
      return this.startAngle + 2 * Math.PI * this.percent;
    }
  },
  watch: {
    percent(nVal, oVal) {
      if (nVal === 0) this.tmpAngle = 1.5 * Math.PI;
      if (nVal !== oVal) this.drawCircle();
    }
  },
  mounted() {
    // 绘制背景圆环
    this.drawBGCircle();
    // 绘制进度
    let canvas = document.getElementById("circle");
    this.ctx = canvas.getContext("2d");
    this.ratio = this.getPixelRatio(this.ctx);
    canvas.width = this.diameter * this.ratio;
    canvas.height = this.diameter * this.ratio;
    this.ctx.scale(this.ratio, this.ratio);
    this.drawCircle();
  },
  methods: {
    // 绘制背景圆环
    drawBGCircle() {
      let canvasBG = document.getElementById("bg");
      this.ctxBG = canvasBG.getContext("2d");
      this.ratio = this.getPixelRatio(this.ctxBG);
      canvasBG.width = this.diameter * this.ratio;
      canvasBG.height = this.diameter * this.ratio;
      this.ctxBG.scale(this.ratio, this.ratio);

      this.ctxBG.beginPath();
      this.ctxBG.lineWidth = this.lineWidth;
      this.ctxBG.strokeStyle = this.bgStrokeStyle;
      this.ctxBG.lineCap = this.lineCap;
      this.ctxBG.arc(this.r, this.r, this.cR, 0, Math.PI * 2);
      this.ctxBG.stroke();
      this.ctxBG.closePath();
    },
    // 渲染进度
    drawCircle() {
      if (this.tmpAngle >= this.endAngle) {
        return;
      } else if (this.tmpAngle + this.xAngle > this.endAngle) {
        this.tmpAngle = this.endAngle;
      } else {
        this.tmpAngle += this.xAngle;
      }
      this.ctx.clearRect(0, 0, this.diameter, this.diameter);

      // 画圈
      this.ctx.beginPath();
      this.ctx.lineWidth = this.lineWidth;
      this.ctx.strokeStyle = this.strokeStyle;
      this.ctx.lineCap = this.lineCap;
      this.ctx.arc(this.r, this.r, this.cR, this.startAngle, this.tmpAngle);
      this.ctx.stroke();
      this.ctx.closePath();

      // 写字
      this.ctx.fillStyle = this.strokeStyle;
      this.ctx.font =
        "300 " + this.fontSize + "px Helvetica Neue, Helvetica, sans-serif";
      this.ctx.textAlign = "center";
      this.ctx.fillText(this.text, this.r, this.r + this.fontSize / 3);

      requestAnimationFrame(this.drawCircle);
    },
    // polyfill 提供了这个方法用来获取设备的 pixel ratio
    getPixelRatio(context) {
      let backingStore =
        context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio ||
        1;
      return (window.devicePixelRatio || 1) / backingStore;
    }
  }
};
</script>

<style lang="less" scoped>
.circle-progress {
  position: relative;
  #circle {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>

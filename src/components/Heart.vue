<template>
<div id="heart" class="row header">
  <div class="heart-container" :class="[enabled ? enabledClass : disabledClass]">
    <div class="mask"></div>
    <canvas ref="canvas" id="canvas" width="206" height="180" @click="clickOnCanvas($event)">
    </canvas>
  </div>
</div>
</template>

<script>
// import config from '../components/Config';
import router from '../router';
import store from '../store';

export default {
  name: 'heart',
  props: ['value', 'size', 'enabled'],
  data() {
    return {
      isActive: false,
      activeClass: 'show',
      hideClass: 'hide',
      parts: [],
      selection: null,
      enabledClass: '',
      disabledClass: 'changeValue',
    };
  },
  computed: {
    emotion() {
      return store.state.emotion;
    },
  },
  beforeCreate() {
    if (!store.state.isLogged) {
      router.push('/login');
    }
  },
  beforeMount() {},
  mounted() {
    this.drawImageFromWebUrl(require('../assets/fill.png'));
    const reverse = 100 - this.$props.value;
    store.commit('ADD_EMOTION_VALUE', this.$props.value);
    store.commit('ADD_REVERSEDID_VALUE', reverse);

    const clickedHeight = Math.round((reverse * 180) / 100);
    const canvas = this.$refs.canvas;
    const img = new Image();
    img.addEventListener('load', () => {
      // The image can be drawn from any source
      canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, 0);

      const ctx = canvas.getContext('2d');
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, '#9c6fd5');
      grad.addColorStop(1, '#d853a8');
      ctx.fillStyle = grad;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillRect(0, clickedHeight, canvas.width, canvas.height);
    });
    img.setAttribute('src', require('../assets/fill.png'));
  },
  methods: {
    clickOnCanvas(e) {
      const canvas = this.$refs.canvas;
      const eventLocation = this.getEventLocation(canvas, e);
      // let coord = `x=${eventLocation.x}, y=${eventLocation.y}`;

      const context = canvas.getContext('2d');
      const pixelData = context.getImageData(eventLocation.x, eventLocation.y, 1, 1).data;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillRect(0, eventLocation.y, canvas.width, canvas.height);
      // If transparency on the image

      const fullHeight = canvas.height;
      const clickedHeight = eventLocation.y;

      const number = Math.round((clickedHeight * 100) / fullHeight);
      const reverseId = 100 - number;
      store.commit('ADD_EMOTION_VALUE', reverseId);
      store.commit('ADD_REVERSEDID_VALUE', number);


      // if ((pixelData[0] === 0) &&
      //   (pixelData[1] === 0) &&
      //   (pixelData[2] === 0) &&
      //   (pixelData[3] === 0)) {
      //   coord += ' (Transparent color detected, cannot be converted to HEX)';
      // }

      // const hex =
      // `#${(`000000${this.rgbToHex(pixelData[0], pixelData[1], pixelData[2])}`).slice(-6)}`;
      // Draw the color and coordinates.
      // document.getElementById('status').innerHTML = coord;
      // document.getElementById('color').style.backgroundColor = hex;
    },
    getElementPosition(obj) {
      let curleft = 0;
      let curtop = 0;
      if (obj.offsetParent) {
        do {
          curleft += obj.offsetLeft;
          curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return {
          x: curleft,
          y: curtop,
        };
      }
      return undefined;
    },
    getEventLocation(element, event) {
      const pos = this.getElementPosition(element);

      return {
        x: (event.pageX - pos.x),
        y: (event.pageY - pos.y),
      };
    },
    rgbToHex(r, g, b) {
      if (r > 255 || g > 255 || b > 255) {
        throw 'Invalid color component';
      }
      return ((r << 16) | (g << 8) | b).toString(16);
    },
    drawImageFromWebUrl(sourceurl) {
      const img = new Image();
      const canvas = this.$refs.canvas;
      img.addEventListener('load', () => {
        // The image can be drawn from any source
        canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, 0);
        const ctx = canvas.getContext('2d');
        const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grad.addColorStop(0, '#9c6fd5');
        grad.addColorStop(1, '#d853a8');
        ctx.fillStyle = grad;
      });
      img.setAttribute('src', sourceurl);
    },
  },
};
</script>

<style lang="scss" scoped>
.show {
    display: inline-block;
}

.hide {
    display: none;
}

.part {
    display: block;
}

.changeValue {
    pointer-events: none;
}

// NEW HEART

.heart-container {
    width: 206px;
    height: 180px;
    position: relative;
    margin: 0 auto;
}

.mask {
    z-index: 1;
    background-image: url("../assets/mask3.png");
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
}

#canvas {
    z-index: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
</style>

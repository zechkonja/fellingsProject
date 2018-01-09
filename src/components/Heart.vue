<template>
<div id="heart" class="row header">
  <div class="heart-container" :class="[enabled ? enabledClass : disabledClass] + ' ' + 'size'+size">
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
      ongoingTouches: [],
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
    this.startup();

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
    startup() {
      const canvas = this.$refs.canvas;
      canvas.addEventListener('touchstart', (evt) => {
        evt.preventDefault();
        const el = this.$refs.canvas;
        const ctx = el.getContext('2d');
        const touches = evt.changedTouches;

        for (let i = 0; i < touches.length; i = +1) {
          this.ongoingTouches.push(this.copyTouch(touches[i]));
          let exactHeight = touches[i].pageY - el.height - 20;
          if (exactHeight < 0) {
            exactHeight = 0;
          } else if (exactHeight > 180) {
            exactHeight = 180;
          }

          ctx.clearRect(0, 0, el.width, el.height);
          ctx.fillRect(0, exactHeight, el.width, el.height);

          const fullHeight = el.height;
          const clickedHeight = exactHeight;

          const number = Math.round((clickedHeight * 100) / fullHeight);
          const reverseId = 100 - number;
          store.commit('ADD_EMOTION_VALUE', reverseId);
          store.commit('ADD_REVERSEDID_VALUE', number);
        }
      }, false);

      canvas.addEventListener('touchend', (evt) => {
        evt.preventDefault();
        const el = this.$refs.canvas;
        const ctx = el.getContext('2d');
        const touches = evt.changedTouches;

        for (let i = 0; i < touches.length; i = +1) {
          const idx = this.ongoingTouchIndexById(touches[i].identifier);
          if (idx >= 0) {
            let exactHeight = touches[i].pageY - el.height - 20;
            if (exactHeight < 0) {
              exactHeight = 0;
            } else if (exactHeight > 180) {
              exactHeight = 180;
            }

            ctx.clearRect(0, 0, el.width, el.height);
            ctx.fillRect(0, exactHeight, el.width, el.height);

            const fullHeight = el.height;
            const clickedHeight = exactHeight;

            const number = Math.round((clickedHeight * 100) / fullHeight);
            const reverseId = 100 - number;
            store.commit('ADD_EMOTION_VALUE', reverseId);
            store.commit('ADD_REVERSEDID_VALUE', number);
            this.ongoingTouches.splice(idx, 1);
          } else {
            this.log('can not figure out which touch to end');
          }
        }
      });

      canvas.addEventListener('touchcancel', (evt) => {
        evt.preventDefault();
        const touches = evt.changedTouches;
        for (let i = 0; i < touches.length; i = +1) {
          const idx = this.ongoingTouchIndexById(touches[i].identifier);
          this.ongoingTouches.splice(idx, 1);
        }
      });

      canvas.addEventListener('touchmove', (evt) => {
        evt.preventDefault();
        const el = this.$refs.canvas;
        const ctx = el.getContext('2d');
        const touches = evt.changedTouches;

        for (let i = 0; i < touches.length; i = +1) {
          const idx = this.ongoingTouchIndexById(touches[i].identifier);

          if (idx >= 0) {
            let exactHeight = touches[i].pageY - el.height - 20;
            if (exactHeight < 0) {
              exactHeight = 0;
            } else if (exactHeight > 180) {
              exactHeight = 180;
            }

            ctx.clearRect(0, 0, el.width, el.height);
            ctx.fillRect(0, exactHeight, el.width, el.height);

            const fullHeight = el.height;
            const clickedHeight = exactHeight;

            const number = Math.round((clickedHeight * 100) / fullHeight);
            const reverseId = 100 - number;
            store.commit('ADD_EMOTION_VALUE', reverseId);
            store.commit('ADD_REVERSEDID_VALUE', number);

            this.ongoingTouches.splice(idx, 1, this.copyTouch(touches[i]));
          } else {
            this.log("can't figure out which touch to continue");
          }
        }
      });
    },
    copyTouch(touch) {
      return {
        identifier: touch.identifier,
        pageX: touch.pageX,
        pageY: touch.pageY,
      };
    },
    ongoingTouchIndexById(idToFind) {
      for (let i = 0; i < this.ongoingTouches.length; i = +1) {
        const id = this.ongoingTouches[i].identifier;

        if (id === idToFind) {
          return i;
        }
      }
      return -1;
    },
    log(msg) {
      console.log(msg);
    },
    clickOnCanvas(e) {
      const canvas = this.$refs.canvas;
      const eventLocation = this.getEventLocation(canvas, e);

      const context = canvas.getContext('2d');
      const pixelData = context.getImageData(eventLocation.x, eventLocation.y, 1, 1).data;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillRect(0, eventLocation.y, canvas.width, canvas.height);

      const fullHeight = canvas.height;
      const clickedHeight = eventLocation.y;

      const number = Math.round((clickedHeight * 100) / fullHeight);
      const reverseId = 100 - number;
      store.commit('ADD_EMOTION_VALUE', reverseId);
      store.commit('ADD_REVERSEDID_VALUE', number);
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

.size30 {
    zoom: 0.3;
    -moz-transform: scale(0.3);
}

.size50 {
    zoom: 0.5;
    -moz-transform: scale(0.5);
}

.size100 {
    zoom: 1;
    -moz-transform: scale(1);
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

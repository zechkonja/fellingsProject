<template>
<div id="heart" class="row header">
  <svg :style="'width: '+size+'%; height:' + size +'%;'" version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200.000000 176.000000" preserveAspectRatio="xMidYMid meet">
 <foreignObject width="100%" height="100%">
           <div id="parts" :class="[enabled ? enabledClass : disabledClass]">
             <div v-for="part in parts" :class="'part empty'+part.id" @click="clickOnLine(part.id, part.reversedId, $event.target)"></div>
           </div>
</foreignObject>
<g transform="translate(0.000000,176.000000) scale(0.100000,-0.100000)"
fill="#dbb2d3" stroke="none">
<path d="M455 1749 c-193 -17 -361 -162 -426 -369 -29 -94 -29 -292 1 -380 76
-226 233 -399 777 -853 180 -150 191 -157 230 -132 34 23 404 341 553 476 219
200 346 374 390 539 20 75 15 274 -9 350 -53 167 -169 291 -325 349 -84 31
-257 32 -339 1 -102 -38 -213 -134 -274 -237 -14 -24 -26 -43 -28 -43 -1 0
-18 24 -38 54 -72 109 -191 202 -297 234 -47 14 -131 18 -215 11z m235 -39
c113 -45 211 -133 284 -254 l32 -53 29 56 c40 76 165 199 236 233 351 168 730
-121 706 -537 -12 -201 -112 -374 -343 -595 -146 -140 -613 -540 -630 -540
-15 0 -202 153 -434 354 -259 224 -439 429 -498 566 -140 327 16 697 331 785
74 21 216 14 287 -15z"/>
</g>
</svg>
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
      inverseIdHeart: this.$props.value,
      selection: null,
      enabledClass: '',
      disabledClass: 'changeValue'
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
  beforeMount() {
    this.createParts();
  },
  mounted() {
    const reverse = 100 - this.$props.value;
    this.clickOnLine(reverse, this.$props.value, this.$el.querySelector('.empty' + reverse));
  },
  methods: {
    createParts() {
      const count = 100;
      for (let i = 1; i <= count; i++) {
        this.parts.push({
          id: i,
          urlShow: `../assets/images/filled/part_${i}.png`,
          urlHide: `../assets/images/empty/empty_${i}.png`,
        });
      }
      let counter = 100;
      this.parts.forEach((item) => {
        item.reversedId = counter;
        counter--;
      });
    },
    clickOnLine(number, reverseId, elem) {
      this.nextUntil(elem, '.part:last-child', number);
      this.showCurrent(elem, number, reverseId);
      this.previousUntil(elem, '.part:first-child', number);
    },
    showCurrent(elem, number, reverseId) {
      elem.classList.add(`part${number}`);
      store.commit('ADD_EMOTION_VALUE', reverseId);
      store.commit('ADD_REVERSEDID_VALUE', number);
    },
    nextUntil(elem, selector, number) {
      // Setup siblings array
      const siblings = [];
      // matches() polyfill
      if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
      }
      // Get the next sibling element
      elem = elem.nextElementSibling;
      // As long as a sibling exists
      while (elem) {
        number++;
        // console.log(elem);
        elem.classList.add(`part${number}`);
        // If we've reached our match, bail
        if (elem.matches(selector)) break;
        // Otherwise, push it to the siblings array
        siblings.push(elem);
        // Get the next sibling element
        elem = elem.nextElementSibling;
      }
      return siblings;
    },
    previousUntil(elem, selector, number) {
      // Setup siblings array
      const siblings = [];
      // matches() polyfill
      if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
      }
      // Get the next sibling element
      elem = elem.previousElementSibling;

      // As long as a sibling exists
      while (elem) {
        number--;
        // console.log(elem);
        elem.classList.remove(`part${number}`);
        // If we've reached our match, bail
        if (elem.matches(selector)) break;
        // Otherwise, push it to the siblings array
        siblings.push(elem);
        // Get the next sibling element
        elem = elem.previousElementSibling;
      }
      return siblings;
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

$total-columns: 100;

@for $i from $total-columns through 1 {
    .empty#{$i} {
        background-image: url("../assets/images/empty/empty_#{$i}.png");
        width: 200px;
        height: 1.76px;
    }
}

@for $i from $total-columns through 1 {
    .part#{$i} {
        visibility: visible;
        background-image: url("../assets/images/filled/part_#{$i}.png");
        width: 200px;
        height: 1.76px;
    }
}

.changeValue {
    pointer-events: none;
}
</style>

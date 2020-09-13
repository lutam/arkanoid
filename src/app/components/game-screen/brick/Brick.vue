<template>
  <div
    ref="brick"
    v-if="available"
    :style="{
      top: `${height * top}px`,
      left: `${left * 100/9}%`,
      height: `${height}px`,
    }"
    :class="{focused, unbreakable: type === 2}"
    class="brick"
  />
</template>

<style lang="scss" scoped>
@import './src/assets/scss/vars';

.brick {
  background: $ark-green;
  box-sizing: border-box;
  position: absolute;
  border: $border-style;
  flex: 0 0 calc(100%/9);
  max-width: calc(100%/9);
  width: calc(100%/9);

  &.unbreakable {
    background: yellow;
  }
  &.focused{
    box-shadow: $focus-shadow;
  }
}

</style>

<script type="text/javascript">
import { ballSize } from '../../../data/sizes';

export default {
  name: 'Brick',
  props: {
    top: {
      type: Number,
      required: true,
    },
    type: {
      type: Number,
      required: true,
    },
    left: {
      type: Number,
      required: true,
    },
    maxHeight: {
      type: Number,
      required: true,
    },
    available: {
      type: Number,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    xRange: { min: undefined, max: undefined },
    yRange: { min: undefined, max: undefined },
    focused: false,
  }),
  computed: {
    hit() {
      return (
        (
          this.$store.state.ball.x <= this.xRange.max
              && this.$store.state.ball.x >= this.xRange.min
        ) && (
          this.$store.state.ball.y <= this.yRange.max
              && this.$store.state.ball.y >= this.yRange.min
        )
      );
    },
    height() {
      return this.maxHeight * 0.05;
    },
  },
  watch: {
    hit() {
      if (this.hit && this.available) {
        if (this.type === 1) {
          this.focused = true;
          setTimeout(() => {
            if (this.focused) {
              this.focused = false;
              this.$store.dispatch('game/hitBrick', this.index);
            }
          }, 100);
        }
        this.$store.dispatch('ball/setBallSpeed', {
          vx: this.$store.state.ball.vx,
          vy: -1 * this.$store.state.ball.vy,
        });
      }
    },
  },
  mounted() {
    if (this.$refs !== undefined && this.$refs.brick !== undefined) {
      this.xRange.min = this.$refs.brick.clientWidth * (this.left - 4.5);
      this.xRange.max = this.$refs.brick.clientWidth * (this.left - 3.5);
      this.yRange.max = this.maxHeight - this.height * this.top - ballSize.width;
      this.yRange.min = this.maxHeight - this.height * (1 + this.top) - ballSize.width;
    }
  },
};
</script>

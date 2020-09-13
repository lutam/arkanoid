<template>
  <div
    id="track"
    ref="track"
  >
    <div :style="{left: `calc(50% - ${(platformWidth - ballRadius)/2}px)`}">
      <div
        id="platform"
        :style="{
          left: `${$store.state.platform.x}px`,
          width: `${platformWidth}px`
        }"
      >
        <div
          v-for="index in 16"
          :key="index"
          :style="{width: `${platformWidth / 16}px`}"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import 'src/assets/scss/vars';

#track {
  position: relative;
  left: 0;
  height: $platform-height;
  top: 0;
  width: 100%;

  > div {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;

    #platform {
      border-radius: $border-radius;
      background: $ark-blue;
      height: 100%;
      position: relative;
      div {
        float: left;
        height: 100%;
      }
    }
  }
}
</style>

<script type="text/javascript">
import { ballSize, platformSize } from '../../../data/sizes';

export default {
  name: 'Platform',
  props: {
    impact: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    platformWidth: platformSize.width,
    ballRadius: ballSize.width,
    timer: undefined,
  }),
  watch: {
    impact() {
      if (this.impact) {
        this.makeBallBounce();
      }
    },
  },
  mounted() {
    document.addEventListener('keydown', this.keyDownListener);
    document.addEventListener('keyup', this.keyUpListener);
  },
  beforeDestroy() {
    clearInterval(this.timer);
    document.removeEventListener('keydown', this.keyDownListener);
    document.removeEventListener('keyup', this.keyUpListener);
  },
  methods: {
    keyUpListener(e) {
      if (this.$store.state.game.isRunning && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        this.changeSpeed(0);
        clearInterval(this.timer);

        setTimeout(() => {
          if (this.vx === 0) {
            this.changeSpeed(0);
          }
        }, 1000);
      }
    },
    keyDownListener(e) {
      if (this.$store.state.game.isRunning && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        if (this.$store.state.platform.vx === 0) {
          this.movePlatform(e.key === 'ArrowLeft');
          this.timer = setInterval(() => this.movePlatform(e.key === 'ArrowLeft'), 50);
        }
      }
    },
    movePlatform(goLeft) {
      this.changePosition(goLeft);
      this.changeSpeed(goLeft ? -1 : 1);
    },
    changePosition(goLeft) {
      if (this.$refs !== undefined && this.$refs.track !== undefined) {
        const maxWidth = this.$refs.track.clientWidth / 2;
        const oldX = this.$store.state.platform.x;
        let x = oldX;
        if (goLeft && Math.abs(x) <= maxWidth) {
          x -= Math.min(50, maxWidth - this.platformWidth / 2 + x);
        } else if (!goLeft && x < maxWidth) {
          x += Math.min(50, maxWidth - this.platformWidth / 2 - x);
        }
        if (x !== oldX) {
          this.$store.dispatch('platform/setPlatformPosition', { x });
        }
      }
    },
    changeSpeed(vx) {
      this.$store.dispatch('platform/setPlatformSpeed', { vx });
    },
    makeBallBounce() {
      const vy = -1 * this.$store.state.ball.vy;
      const platformVx = this.$store.state.platform.vx;
      const directionVx = this.$store.state.platform.vx !== 0 ? (Math.abs(platformVx) / platformVx) : 0;
      const vx = platformVx !== 0 ? directionVx * Math.abs(this.platformArea()) : this.$store.state.ball.vx;
      this.$store.dispatch('ball/setBallSpeed', { vx, vy });
    },
    platformArea() {
      for (let n = 0; n < 4; n++) {
        const areaWidth = platformSize.width / 16;
        const areasLimits = [1, 3, 6, 8];
        const speedBoost = [2, 1.6, 1.3, 1];
        if (
          (
            this.$store.state.ball.x
              <= this.$store.state.platform.xRange.max - (areasLimits[n - 1] || 0) * areaWidth
                && this.$store.state.ball.x
              > this.$store.state.platform.xRange.max - areasLimits[n] * areaWidth
          )
      || (
        this.$store.state.ball.x
        >= this.$store.state.platform.xRange.min + (areasLimits[n - 1] || 0) * areaWidth
          && this.$store.state.ball.x
        < this.$store.state.platform.xRange.min + areasLimits[n] * areaWidth
      )
        ) {
          return speedBoost[n];
        }
      }

      return 1;
    },
  },
};
</script>

<template>
  <div
    :style="{
      transform: `translate(${$store.state.ball.x}px, ${-1 * $store.state.ball.y - ballWidth/2}px)`,
      width: `${ballWidth}px`,
      height: `${ballWidth}px`,
    }"
    class="game-ball"
  />
</template>

<style lang="scss" scoped>
@import './src/assets/scss/vars';

.game-ball {
  background: $ark-red;
  border-radius: 50%;
  position: absolute;
}

</style>

<script type="text/javascript">
import { ballSize } from '../../../data/sizes';

export default {
  name: 'Ball',
  props: {
    maxHeight: {
      type: Number,
      default: 0,
    },
    maxWidth: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    ballWidth: ballSize.width,
    gameClock: false,
    clockInterval: 10,
  }),
  mounted() {
    this.$store.subscribe((m) => {
      if (m.type.includes('SetBallSpeed')) {
        this.changePosition();
      } else if (m.type.includes('TogglePause')) {
        this.togglePause();
      }
    });
  },
  methods: {
    togglePause() {
      if (!this.$store.state.game.isPaused) {
        this.gameClock = setInterval(() => {
          this.changePosition();
          this.changeSpeed();
        }, this.clockInterval);
      } else {
        clearInterval(this.gameClock);
        this.gameClock = false;
      }
    },
    changePosition() {
      const speedModule = 5;
      const oldPositions = { x: this.$store.state.ball.x, y: this.$store.state.ball.y };
      const positions = { ...oldPositions };
      if (this.$store.state.ball.vx > 0) {
        positions.x += Math.min(
          this.$store.state.ball.vx * speedModule,
          this.maxWidth - this.ballWidth / 2 - positions.x,
        );
      } else if (this.$store.state.ball.vx < 0) {
        positions.x -= Math.min(
          -1 * this.$store.state.ball.vx * speedModule,
          this.maxWidth - this.ballWidth / 2 + positions.x,
        );
      }
      if (this.$store.state.ball.vy > 0) {
        positions.y += Math.min(
          this.$store.state.ball.vy * speedModule,
          this.maxHeight - this.ballWidth / 2 - positions.y,
        );
      } else {
        positions.y -= Math.min(
          -1 * this.$store.state.ball.vy * speedModule,
          positions.y + this.ballWidth / 2,
        );
      }
      if (oldPositions.x !== positions.x || oldPositions.y !== positions.y) {
        this.$store.dispatch('ball/setBallPosition', positions);
      }
    },
    changeSpeed() {
      const oldSpeed = { vx: this.$store.state.ball.vx, vy: this.$store.state.ball.vy };
      const speed = { ...oldSpeed };
      if (this.$store.state.ball.yRange.max >= this.maxHeight) {
        speed.vy *= -1;
      } if (Math.abs(this.$store.state.ball.x) + this.ballWidth / 2 === this.maxWidth) {
        speed.vx *= -1;
      }

      if (oldSpeed.vx !== speed.vx || oldSpeed.vy !== speed.vy) {
        this.$store.dispatch('ball/setBallSpeed', speed);
      }
    },

  },
};
</script>

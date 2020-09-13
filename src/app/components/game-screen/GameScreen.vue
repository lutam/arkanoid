<template>
  <div id="game-screen">
    <div id="game-board">
      <div
        id="frame"
        ref="frame"
        :style="{top: `calc(100% - ${ballRadius/2}px)`}"
      >
        <div
          :style="{
            top: `calc(-100% + ${ballRadius}px)`,
            left: `calc(-50% + ${ballRadius}px)`,
            width: `calc(100% - ${2*ballRadius}px)`
          }"
          v-if="$store.state.game.bricks"
          class="bricks"
        >
          <brick
            v-if="maxHeight !== undefined"
            v-for="(brick, index) in $store.state.game.bricks"
            :key="index"
            :index="index"
            :left="brick.left"
            :top="brick.top"
            :type="brick.type"
            :max-height="maxHeight"
            :available="brick.available"
          />
        </div>
        <ball
          v-if="maxHeight !== undefined"
          :max-height="maxHeight"
          :max-width="maxWidth"
        />
      </div>
    </div>
    <platform
      v-if="$store.state.platform.x !== undefined"
      :impact="ballHasHitPlatform"
    />
  </div>
</template>

<style lang="scss" scoped>
@import 'src/assets/scss/vars';
#game-screen {
  height: calc(100vh - #{$footer-height + $status-height});
  width: 100%;
  margin-top: 0;
  border: $border-style;
  border-radius: $border-radius;
  padding-bottom: 2rem;
  box-sizing: border-box;

  #game-board {
    height: calc(100% - #{$platform-height});
    width: 100%;
    left: 0;
    top: 0;
    position: relative;

    #frame {
      position: relative;
      width: 100%;
      height: 100%;
      left: 50%;

      .bricks {
        position: absolute;
        display: flex;
        flex-wrap: wrap;
      }
    }
  }

}

</style>

<script type="text/javascript">
import Platform from './platform/Platform.vue';
import Ball from './ball/Ball.vue';
import { ballSize } from '../../data/sizes';
import Brick from './brick/Brick.vue';

export default {
  name: 'GameScreen',
  components: {
    Brick,
    Ball,
    Platform,
  },
  data: () => ({
    maxHeight: undefined,
    maxWidth: undefined,
    ballRadius: ballSize.width,
  }),
  computed: {
    ballHasHitPlatform() {
      const platformRange = this.$store.state.platform.xRange;
      const ballXRange = this.$store.state.ball.xRange;
      const movingBouncingRightLimit = platformRange.max + 80;
      const movingBouncingLeftLimit = platformRange.min - 80;

      return (
        this.ballHasReachedTheBottom()
          && (ballXRange.min <= movingBouncingRightLimit && ballXRange.max >= movingBouncingLeftLimit)
      );
    },
  },
  mounted() {
    this.$store.subscribe((m) => {
      if (m.type.includes('SetBallPosition')) {
        if (this.ballHasBeenMissed()) {
          this.$store.dispatch('game/stopGame');
        }
      }
    });

    if (this.$refs !== undefined && this.$refs.frame !== undefined) {
      this.maxHeight = this.$refs.frame.clientHeight;
      this.maxWidth = this.$refs.frame.clientWidth / 2;
    }
  },
  methods: {
    ballHasReachedTheBottom() {
      const { yRange, vy } = this.$store.state.ball;
      return vy < 0 && yRange.min === -1 * this.ballRadius;
    },
    ballHasBeenMissed() {
      return !!(!this.ballHasHitPlatform && this.ballHasReachedTheBottom());
    },
  },
};
</script>

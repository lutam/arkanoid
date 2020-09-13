<template>
  <div id="status">
    <div class="level">
      Level {{ $store.state.game.level }}
    </div>
    <div class="time">
      {{ formattedTimeLeft }}
    </div>
    <div class="lifes">
      <div
        v-for="life of $store.state.game.lives"
        :key="life"
      />
    </div>
  </div>
</template>

<style lang="scss">
@import 'src/assets/scss/vars';

#status {
  width: 100%;
  height: $status-height;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.2rem;
    font-weight: bold;

    .level{
      width: 6rem;
    }
    .time {
      border: $border-style;
      border-radius: $border-radius;
      padding: 0.5rem 1rem;
    }
    .lifes {
      display: flex;
      justify-content: flex-end;
      width: 6rem;
      > div {
        background: $ark-red;
        width: 1.5rem;
        height: 1.5rem;
        margin-left: 0.5rem;
        border-radius: 50%;

      }
    }
}
</style>

<script type="text/javascript">
export default {
  name: 'Status',
  data: () => ({
    timeLeft: 120,
    timer: undefined,
  }),
  computed: {
    formattedTimeLeft() {
      const minutes = Math.floor(this.timeLeft / 60);
      const seconds = this.timeLeft - minutes * 60;
      return `0${minutes}:${seconds > 9 ? seconds : `0${seconds}`}`;
    },
  },
  watch: {
    timeLeft() {
      if (this.timeLeft === 0) {
        this.$store.dispatch('game/toggleMessage', 'time_out');
      }
    },
  },
  mounted() {
    this.$store.subscribe((m) => {
      if (m.type.includes('IncrementLevel') || m.type.includes('ResetGame')) {
        this.timeLeft = 120;
      }
      if (m.type.includes('TogglePause')) {
        if (this.timer === undefined) {
          this.timeLeft -= 1;
          this.timer = setInterval(() => { this.timeLeft -= 1; }, 1000);
        } else {
          clearInterval(this.timer);
          this.timer = undefined;
        }
      }
    });
  },

};
</script>

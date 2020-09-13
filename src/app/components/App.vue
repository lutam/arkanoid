<template>
  <div id="app">
    <message-modal
      v-if="messageShown !== undefined"
      :message="{messageShown}"
    />
    <pause-layer v-if="messageShown === undefined && $store.state.game.isPaused && $store.state.game.isRunning" />
    <start-layer
      v-if="firstTimePlaying"
      @close="firstTimePlaying = false"
    />
    <div id="game">
      <status />
      <game-screen />
    </div>
    <footer class="centered">
      <h1>__ARKANOID__</h1>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
@import 'src/assets/scss/vars';

#app {
  width: 100vw;
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;

  #game {
    width: 70vw;
    margin-left: 15vw;
    @include media-breakpoint-down(lg) {
      width: 80vw;
      margin-left: 10vw;
    }
    @include media-breakpoint-down(md) {
      width: 90vw;
      margin-left: 5vw;
    }
    @include media-breakpoint-down(sm) {
      width: calc(100% - 2rem);
      margin-left: 1rem;
    }
  }

  footer {
    height: $footer-height;
  }
}

</style>

<script type="text/javascript">
import GameScreen from './game-screen/GameScreen.vue';
import MessageModal from './layers/message-modal/MessageModal.vue';
import Status from './status/Status.vue';
import PauseLayer from './layers/pause-layer/PauseLayer.vue';
import StartLayer from './layers/start-layer/StartLayer.vue';

export default {
  name: 'App',
  components: {
    StartLayer,
    PauseLayer,
    Status,
    MessageModal,
    GameScreen,
  },
  data: () => ({
    firstTimePlaying: true,
  }),
  computed: {
    messageShown() {
      return this.$store.state.game.messages.find((m) => m.showed);
    },
  },
  mounted() {
    document.addEventListener('keydown', (e) => {
      const gameDisabledByMessage = this.messageShown !== undefined;
      if (e.key === ' ' && !gameDisabledByMessage && !this.firstTimePlaying) {
        if (!this.$store.state.game.isRunning) {
          this.$store.dispatch('game/startGame');
        } else {
          this.$store.dispatch('game/togglePause');
        }
      }
    });
  },
};
</script>

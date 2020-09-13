<template>
  <div
    class="overlay"
  >
    <div
      id="message-modal"
    >
      <div>
        <p class="title">
          {{ messageText.title }}
        </p>
        <p class="description">
          {{ messageText.description }}
        </p>
        <p class="points">
          Score: {{ $store.state.game.points }}
        </p>
      </div>
      <button
        @click="$store.dispatch(messageText.action)"
        :class="{active}"
        class="btn-green"
      >
        {{ messageText.button }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import 'src/assets/scss/vars';
 #message-modal {
    background: $ark-dark-blue;
    padding: 2rem;
    border: $border-style;
    border-radius: $border-radius;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

   @include media-breakpoint-down(md){
     height: 100%;
     padding-top: 4rem;
     padding-bottom: 4rem;
   }

    p {
      padding-left: 8rem;
      padding-right: 8rem;
      &.title {
        font-size: 2.8rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
        text-align: center;
      }
      &.description {
        text-align: center;
        font-size: 1.5rem;
        margin-bottom: 3rem;
      }
      &.points {
        text-align: center;
        font-size: 1.1rem;
        margin-bottom: 2rem;
      }
    }
 }
</style>

<script type="text/javascript">

export default {
  name: 'MessageModal',
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    active: undefined,
  }),
  computed: {
    messageText() {
      const messages = {
        game_over: {
          title: 'Game Over', description: 'No more lives', button: 'PLAY AGAIN', action: 'game/newGame',
        },
        time_out: {
          title: 'Game Over', description: 'Time\'s up', button: 'PLAY AGAIN', action: 'game/newGame',
        },
        level_completed: {
          title: 'Level completed', button: 'NEXT LEVEL', action: 'game/nextLevel',
        },
        game_won: {
          title: 'Congratulations', description: 'You have finished the game', button: 'PLAY AGAIN', action: 'game/newGame',
        },
      };
      return messages[this.message.messageShown.code];
    },
  },
  mounted() {
    document.addEventListener('keydown', this.spaceListener);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.spaceListener);
  },
  methods: {
    spaceListener(e) {
      if (e.key === ' ' && this.message !== undefined) {
        this.active = 'active';
        setTimeout(() => {
          this.$store.dispatch(this.messageText.action);
        }, 100);
      }
    },
  },

};
</script>

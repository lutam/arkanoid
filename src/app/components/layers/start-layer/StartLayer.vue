<template>
  <div
    id="start-layer"
    class="centered"
  >
    <div>
      <h2>START GAME</h2>
      <button
        id="pause"
        @click="$emit('close')"
      />
      <p>
        Press <span>SPACEBAR</span> to start game and <span>LEFT/RIGHT</span> arrows to move
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import 'src/assets/scss/vars';

#start-layer {
  position: absolute;
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
  height: calc(100vh - #{$footer-height});
  top: 0;
  left: 0;
  background: $ark-dark-blue;
  z-index: 9;

  > div {
    display: flex;
align-items: center;
    flex-direction: column;
    text-align: center;

    h2 {
      font-size: 2rem;
      margin-bottom: 3rem;
    }
    p {
      margin-top: 4rem;
      line-height: 1.8rem;
      span {
        color: $ark-red;
        font-weight: bold;
      }
    }
  }

  button {
      background: transparent;
      border: transparent;
      border-radius: 0;
      width: 0;
    cursor: pointer;
      height: 0;
      border-top: 60px solid transparent;
      border-bottom: 60px solid transparent;
      border-left: 100px solid $ark-white;
    &:hover{
      opacity: 0.7;
    }
  }
}

</style>

<script type="text/javascript">

export default {
  name: 'StartLayer',
  mounted() {
    document.addEventListener('keydown', this.spaceListener);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.spaceListener);
  },
  methods: {
    spaceListener(e) {
      if (e.key === ' ') {
        setTimeout(() => {
          this.$emit('close');
        }, 100);
      }
    },
  },
};
</script>
